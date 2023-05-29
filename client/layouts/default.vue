<template>
  <div>
    <button class="sound btn" @click="play">
      <img :src="played ? sound_on : sound_off" alt="" />
    </button>
    <NuxtPage />
  </div>
</template>



<script setup lang="ts">
import '@/assets/scss/app.scss'
import sound_on from "@/assets/source/sound-on.svg";
import sound_off from "@/assets/source/sound-off.svg";
import sound_bg from "@/assets/source/bg_sound.mp3";
const played = ref(false);
const bg_audio = ref();
const play = () => {
  played.value = !played.value;

  useClick()

  if (bg_audio.value) {
    bg_audio.value.pause();
  }

  if (played.value) {
    bg_audio.value = new Audio(sound_bg);
    bg_audio.value.play();
    bg_audio.value.addEventListener("ended", function (this: any) {
      this.currentTime = 0;
      this.play();
    });
  }
}
</script>