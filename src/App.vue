<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
  >
    <div
      @keydown.slash.prevent="openSearchBar"
      @keydown.esc="closeSearchBar"
      class="h-screen flex flex-col items-center justify-center p-4"
    >
      <p class="text-2xl text-gray-800 dark:text-white mb-4 mt-auto">
        Hit '/' to open the search bar
      </p>
      <div class="flex items-center space-x-3 mt-auto">
        <span class="text-gray-700 dark:text-gray-300 text-xs">Light</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="isDarkMode"
            class="sr-only peer"
            @change="updateDarkMode"
          />
          <div
            class="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-pink-400"
          ></div>
        </label>
        <span class="text-gray-700 dark:text-gray-300 text-xs">Dark</span>
      </div>
      <SearchBar
        :is-open="isSearchBarOpen"
        @close="closeSearchBar"
        @select="handleArticleSelect"
      />
      <ToastAlert :message="toastMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import ToastAlert from "@/components/ToastAlert.vue";
import type { Article } from "@/types/Article";

const isSearchBarOpen = ref(false);
const isDarkMode = ref(false);
const toastMessage = ref("");

const openSearchBar = () => {
  isSearchBarOpen.value = true;
};

const closeSearchBar = () => {
  isSearchBarOpen.value = false;
};

const handleArticleSelect = (article: Article) => {
  console.log("Selected article:", article);
  toastMessage.value = `Selected: ${article.title}`;
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  updateDarkMode();
};

const updateDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "/" && !isSearchBarOpen.value) {
    event.preventDefault();
    openSearchBar();
  } else if (event.key === "Escape" && isSearchBarOpen.value) {
    closeSearchBar();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  const savedTheme = localStorage.getItem("theme");
  const systemDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  isDarkMode.value = savedTheme === "dark" || (!savedTheme && systemDarkMode);
  updateDarkMode();
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

watch(
  () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  (isDark) => {
    if (!localStorage.getItem("theme")) {
      isDarkMode.value = isDark;
      updateDarkMode();
    }
  }
);
</script>
