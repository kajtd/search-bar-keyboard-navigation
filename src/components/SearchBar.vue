<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-16 px-4 z-50"
    >
      <div
        class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
      >
        <div class="p-3 border-b border-gray-200 dark:border-gray-700">
          <div class="relative">
            <SearchIcon
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
              v-model="searchQuery"
              ref="searchInput"
              placeholder="Search articles..."
              class="w-full bg-transparent text-gray-900 dark:text-white text-base rounded-md pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              @input="searchArticles"
              @keyup.down.prevent="navigateList('down')"
              @keyup.up.prevent="navigateList('up')"
              @keydown.enter.prevent="selectArticle()"
            />
          </div>
        </div>
        <div
          ref="scrollContainer"
          class="max-h-[60vh] overflow-y-auto scroll-smooth"
        >
          <template
            v-for="(group, groupName) in groupedArticles"
            :key="groupName"
          >
            <div
              v-if="group.length > 0"
              class="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50"
            >
              {{ groupName }}
            </div>
            <ul>
              <li
                v-for="(article, index) in group"
                :key="article.id"
                :class="[
                  'px-3 py-2 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700',
                  {
                    'bg-gray-100 dark:bg-gray-700':
                      selectedIndex === getFlatIndex(groupName, index),
                  },
                  `article-entry-${article.id}`,
                ]"
                @click="selectArticle(article)"
                @mouseover="selectedIndex = getFlatIndex(groupName, index)"
              >
                <div class="flex items-center space-x-3">
                  <ArticleIcon class="text-gray-400 w-4 h-4 flex-shrink-0" />
                  <div class="flex-grow min-w-0">
                    <span
                      class="text-gray-900 dark:text-white font-medium text-sm block truncate"
                    >
                      {{ article.title }}
                    </span>
                    <p
                      class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate"
                    >
                      {{ article.content }}
                    </p>
                  </div>
                  <span
                    class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0"
                  >
                    {{ getReadableDate(article.createdAt) }}
                  </span>
                </div>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import type { Article } from "@/types/Article";
import { getReadableDate } from "@/utils/util";
import { fetchArticles } from "../../data/articles.ts";
import SearchIcon from "@/components/Icons/SearchIcon.vue";
import ArticleIcon from "@/components/Icons/ArticleIcon.vue";

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "select", article: Article): void;
}>();

const searchQuery = ref("");
const selectedIndex = ref(0);
const searchInput = ref<HTMLInputElement | null>(null);
const articles = ref<Article[]>([]);
const scrollContainer = ref<HTMLDivElement | null>(null);
const currentPage = ref(0);
const isLoading = ref(false);
const hasMore = ref(true);

const loadMoreArticles = async () => {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;
  const newArticles = fetchArticles(currentPage.value);

  if (newArticles.length === 0) {
    hasMore.value = false;
  } else {
    articles.value.push(...newArticles);
    currentPage.value++;
  }

  isLoading.value = false;
};

const filteredArticles = computed(() =>
  searchQuery.value
    ? articles.value.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    : articles.value
);

const groupedArticles = computed(() => {
  const groups: Record<string, Article[]> = {
    Today: [],
    "Past Week": [],
    "Past Month": [],
    Older: [],
  };

  filteredArticles.value.forEach((article) => {
    const diffDays = getDaysSinceCreation(article.createdAt);
    if (diffDays === 0) groups["Today"].push(article);
    else if (diffDays < 7) groups["Past Week"].push(article);
    else if (diffDays < 30) groups["Past Month"].push(article);
    else groups["Older"].push(article);
  });
  return groups;
});

const flattenedArticles = computed(() =>
  Object.values(groupedArticles.value).flat()
);

const getDaysSinceCreation = (createdAt: string): number => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  return Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );
};

const getFlatIndex = (groupName: string, localIndex: number): number => {
  let flatIndex = 0;
  for (const [name, group] of Object.entries(groupedArticles.value)) {
    if (name === groupName) return flatIndex + localIndex;
    flatIndex += group.length;
  }
  return 0;
};

const searchArticles = () => {
  selectedIndex.value = 0;
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = 0;
  }
};

const selectArticle = (article?: Article) => {
  const selectedArticle =
    article || flattenedArticles.value[selectedIndex.value];
  if (selectedArticle) {
    emit("select", selectedArticle);
    emit("close");
  }
};

const navigateList = (direction: "up" | "down") => {
  const totalItems = flattenedArticles.value.length;
  if (totalItems === 0) return;

  selectedIndex.value =
    direction === "down"
      ? (selectedIndex.value + 1) % totalItems
      : Math.max(0, selectedIndex.value - 1);

  nextTick(() => {
    const selectedElement = scrollContainer.value?.querySelector(
      `.article-entry-${flattenedArticles.value[selectedIndex.value].id}`
    ) as HTMLElement;

    if (selectedElement && scrollContainer.value) {
      selectedElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  });
};

watch(selectedIndex, () => {
  if (selectedIndex.value === flattenedArticles.value.length - 1) {
    loadMoreArticles();
  }
});

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      loadMoreArticles();
      searchQuery.value = "";
      selectedIndex.value = 0;
      nextTick(() => searchInput.value?.focus());
    }
  }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
  height: 50px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
}
</style>
