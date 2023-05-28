<template>
  <a class="minebtn" v-if="props.type == 'link'" :href="props.link" target="_blank" @click="click">{{ props.title }}</a>
  <nuxt-link class="minebtn" @click="click" :to="props.link" v-else-if="props.type == 'nuxt-link'">{{ props.title
  }}</nuxt-link>
  <button v-else @click="click" class="minebtn">{{ props.text }}</button>
</template>


<script setup lang="ts">

const props = defineProps({
  link: {
    type: String,
    default: '/'
  },
  text: String,
  type: {
    type: [String],
    default: "button",
  },
  title: [String],
});

const click = () => {
  useClick()
};
</script>

