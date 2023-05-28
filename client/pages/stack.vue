<template>
  <div class="stack">
    <div class="container">
      <div class="stack__title">
        <h1>My Stack</h1>
      </div>
      <StackList :list="stacks" />
      <div class="stack__buttons">
        <UiMyButton title="Back" type="nuxt-link" link="/" />
        <UiMyButton title="See more on github" type="link" link="https://github.com/olegtemek" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useStackStore } from '@/store/stack';
import { IStack } from '~/types/IStack';
await useStackStore().fetchAll()

const stacks: ComputedRef<IStack[]> = (computed(() => {
  return useStackStore().getStacks
}))
</script>