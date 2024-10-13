<template>
  <Transition name="toast">
    <div
      v-if="isVisible"
      class="fixed top-4 right-4 p-4 bg-white dark:bg-gray-800 border text-black dark:text-white border-gray-700/20 dark:border-gray-700 rounded-lg shadow-xs max-w-sm w-full transition-colors duration-200 ease-in-out"
    >
      {{ message }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  message: string;
  duration?: number;
}>();

const isVisible = ref(false);

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      isVisible.value = true;
      setTimeout(() => {
        isVisible.value = false;
      }, props.duration || 3000);
    }
  }
);
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
