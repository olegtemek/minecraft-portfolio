<template>
  <div class="form-group mb-6">
    <h3>{{ props.title }}</h3>


    <textarea :placeholder="props.title" class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        h-[150px]
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" :value="props.modelValue"
      @input="modelEmit"></textarea>
  </div>
</template>



<script setup>
const props = defineProps({
  title: String,
  modelValue: String
})

const emits = defineEmits(['update:modelValue'])

const modelEmit = (e) => {
  emits('update:modelValue', e.target.value)
}

</script>
