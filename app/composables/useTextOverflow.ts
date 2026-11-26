import { ref } from "vue";

export const useTextOverflow = () => {
  const textRef = ref<HTMLElement | null>(null);
  const isOverflowing = ref(false);

  const measure = () => {
    const node = textRef.value;
    isOverflowing.value = Boolean(node) && node!.scrollWidth > node!.clientWidth;
  };

  return { textRef, isOverflowing, measure };
};
