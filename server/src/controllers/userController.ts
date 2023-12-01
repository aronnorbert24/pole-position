import { Request, Response } from 'express'
import userService from '../services/userService'

import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body

      const foundUser = await userService.findUserByUsername(username)

      if (!foundUser) {
        return res.status(409).send('Incorrect username, please try again.')
      }

      if (compareSync(password, foundUser.password)) {
        return res.status(200).json(foundUser)
      }
      return res.status(401).send('Incorrect password, please try again')
    } catch (error) {
      console.error(error)
      return res.status(500).send('Login failed. Please check your input, and try again.')
    }
  }
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, userPicture } = req.body
      const duplicateUser = await userService.findUserByUsername(username)
      const duplicateEmail = await userService.findUserByEmail(email)

      // check if the email has been used before
      if (duplicateUser) {
        return res.status(400).send('A user with that username already exists.')
      }
      if (duplicateEmail) {
        return res.status(400).send('A user with that email already exists.')
      }
      // hash user password
      const salt = genSaltSync(10)
      const newPassword = hashSync(password, salt)
      // Create object with the properties
      const newUser = {
        username: username,
        email: email,
        password: newPassword,
        userPicture: userPicture
      }
      // save data to the database
      const savedUser = await userService.register(newUser)
      return res.status(201).json(savedUser)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Registration failed. Please check your input and try again.')
    }
  }
}

export default new UserController()