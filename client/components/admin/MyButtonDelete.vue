<template>
  <button @click="destroy()"
    class="inline-flex px-5 py-3 text-white bg-red-600 hover:bg-purple-700 focus:bg-red-700 rounded-md "
    type="submit">Удалить</button>
</template>



<script setup>
const emits = defineEmits(['destroy'])

const destroy = (id) => {
  let res = confirm('Вы уверены что хотите удалить?')
  if (!res) {
    return
  }

  emits('destroy', true)
}
</script>