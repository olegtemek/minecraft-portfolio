import soundClick from "@/assets/source/click.mp3";
export const useClick = () => {
  let click_sound = new Audio(soundClick);
  click_sound.currentTime = 0.3;
  click_sound.play();
};
