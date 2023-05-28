<template>
  <div class="stack__list">
    <div class="stack__item" v-for="stack of list" :key="stack.id">
      <img :src="stack.image" :alt="stack.title" v-if="typeof stack.image == 'string'" />
      <h3>{{ stack.title }}</h3>
    </div>
  </div>
</template>



<script setup lang="ts">
import { IStack } from '~/types/IStack';
const props = defineProps<{ list: IStack[] }>()
</script>
