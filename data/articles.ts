import { Article } from "@/types/Article";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);
const lastMonth = new Date(today);
lastMonth.setMonth(lastMonth.getMonth() - 1);
const older = new Date(today);
older.setFullYear(older.getFullYear() - 1);

const articlesData: Article[] = [
  {
    id: "1",
    title: "Vue 3 Composition API: A Deep Dive",
    content:
      "Explore the power of Vue 3's Composition API and how it can improve your component logic organization...",
    createdAt: today.toISOString(),
  },
  {
    id: "2",
    title: "TypeScript Best Practices in 2024",
    content:
      "Learn about the latest TypeScript best practices to enhance your code quality and developer experience...",
    createdAt: yesterday.toISOString(),
  },
  {
    id: "3",
    title: "Building Responsive Layouts with Tailwind CSS",
    content:
      "Discover how to create beautiful, responsive layouts quickly using Tailwind CSS utility classes...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "4",
    title: "State Management in Vue 3: Pinia vs Vuex",
    content:
      "Compare Pinia and Vuex for state management in Vue 3 applications and learn which one might be best for your project...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "5",
    title: "Optimizing Vue 3 Performance",
    content:
      "Learn techniques to optimize your Vue 3 application's performance, from computed properties to virtual scrolling...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "6",
    title: "Custom Vue Directives: Extending Vue's Capabilities",
    content:
      "Explore how to create and use custom directives in Vue to add unique functionality to your components...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "7",
    title: "Mastering TypeScript Generics",
    content:
      "Dive deep into TypeScript generics and learn how to write more flexible and reusable code...",
    createdAt: older.toISOString(),
  },
  {
    id: "8",
    title: "Vue 3 Teleport: Creating Modals and Tooltips",
    content:
      "Learn how to use Vue 3's Teleport feature to create modals, tooltips, and other floating elements...",
    createdAt: older.toISOString(),
  },
  {
    id: "9",
    title: "Unit Testing Vue Components with Vitest",
    content:
      "Explore best practices for unit testing Vue components using Vitest, a fast and feature-rich testing framework...",
    createdAt: older.toISOString(),
  },
  {
    id: "10",
    title: "Accessibility in Vue: Building Inclusive Web Apps",
    content:
      "Learn how to make your Vue applications more accessible and inclusive for all users...",
    createdAt: older.toISOString(),
  },
];

export default articlesData;
