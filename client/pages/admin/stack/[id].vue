<template>
  <div>

    <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div class="mr-6">
        <h1 class="text-4xl font-semibold mb-2">Редактировать стек</h1>
      </div>
    </div>


    <section class="w-full">

      <AdminMyInput title="Заголовок" v-model="stack.title" />

      <AdminMyInputImage title="Изображение" v-model="stack.image" />

      <AdminMyButton title="Изменить" @click="save" />

    </section>

  </div>
</template>



<script setup>
definePageMeta({
  layout: 'admin'
})
import { useStackStore } from '~/store/stack';

const route = useRoute();

await useStackStore().fetchOne(route.params.id)
const stack = computed(() => {
  return useStackStore().getStack
})

const save = () => {
  const validate = useValidate(stack.value).validate(['title', 'image'])
  if (!validate) {
    return
  }

  useStackStore().update(stack.value, stack.value.id)

}


</script>