import UserModel, { User } from '../models/User'

class UserService {
  async findUserByUsername(username: string) {
    return UserModel.findOne({ username })
  }

  async register(data: User) {
    const newUser = new UserModel({
      username: data.username,
      password: data.password,
      email: data.email,
      userPicture: data.userPicture,
    })

    const savedUser = await newUser.save()

    return savedUser
  }
}

export default new UserService()