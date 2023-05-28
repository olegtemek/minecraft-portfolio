<template>
  <div>

    <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
      <div class="mr-6">
        <h1 class="text-4xl font-semibold mb-2">Добавить стек</h1>
      </div>
    </div>



    <section class="w-full">

      <AdminMyInput title="Заголовок" v-model="stack.title" />

      <AdminMyInputImage title="Изображение" v-model="stack.image" />

      <AdminMyButton title="Сохранить" @click="save" />

    </section>

  </div>
</template>



<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

import { useStackStore } from '@/store/stack';
import { IStack } from '~/types/IStack';

const stack: Ref<IStack> = ref({
  title: "",
  image: ""
})


const save = () => {
  const validate = useValidate(stack.value).validate(['title', 'image'])
  if (!validate) {
    return
  }

  useStackStore().create(stack.value)
}
</script>