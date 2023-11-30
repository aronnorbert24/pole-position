<template>
    <div class="ml-auto mr-auto mt-6 flex justify-between px-40 phone:w-fit phone:px-4">
      <label :for="property">{{ label }}</label>
      <input
        v-model="updatedValue"
        :type="type"
        :name="property"
        :id="property"
        @input="liveUpdate"
        class="rounded-lg bg-slate-100 indent-2 outline-black phone:w-7/12"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useUserStore } from '../../stores/UserStore'
  import { debounce } from '../../helpers/helper.ts' 
  interface Props {
    property: string
    type: string
    label: string
    modelValue: string
  }
  
  const props = defineProps<Props>()
  
  const { updateProperty } = useUserStore()
  
  const liveUpdate = ref(debounce(update, 300))

  function update() {
    updateProperty(props.property, updatedValue.value)
  }
  
  const updatedValue = ref('')
  </script>