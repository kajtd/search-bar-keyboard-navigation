import type { Article } from "@/types/Article";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);
const lastMonth = new Date(today);
lastMonth.setMonth(lastMonth.getMonth() - 1);
const older = new Date(today);
older.setFullYear(older.getFullYear() - 1);

const BATCH_SIZE = 10;

export const fetchArticles = (page: number): Article[] => {
  const sortedArticles = articlesData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const start = page * BATCH_SIZE;
  const end = start + BATCH_SIZE;
  return sortedArticles.slice(start, end);
};

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
  {
    id: "11",
    title: "Getting Started with React Hooks",
    content:
      "Learn how to use React Hooks to manage state and side effects in functional components...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "12",
    title: "CSS Grid Layout: A Comprehensive Guide",
    content:
      "Master CSS Grid Layout to create complex, responsive layouts with ease...",
    createdAt: yesterday.toISOString(),
  },
  {
    id: "13",
    title: "JavaScript ES6+: Features You Should Know",
    content:
      "Explore the most useful features introduced in ECMAScript 6 and beyond...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "14",
    title: "Web Performance Optimization Techniques",
    content:
      "Discover strategies to improve your website's loading speed and overall performance...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "15",
    title: "Introduction to GraphQL",
    content:
      "Learn the basics of GraphQL and how it differs from traditional REST APIs...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "16",
    title: "Responsive Web Design: Beyond Media Queries",
    content:
      "Explore advanced techniques for creating responsive web designs that go beyond traditional media queries...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "17",
    title: "Progressive Web Apps: The Future of Web Development",
    content:
      "Discover how to build Progressive Web Apps that offer native-like experiences on the web...",
    createdAt: older.toISOString(),
  },
  {
    id: "18",
    title: "Mastering CSS Flexbox",
    content:
      "Deep dive into CSS Flexbox and learn how to create flexible, responsive layouts...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "19",
    title: "Node.js Best Practices for Production",
    content:
      "Learn essential best practices for deploying and maintaining Node.js applications in production...",
    createdAt: yesterday.toISOString(),
  },
  {
    id: "20",
    title: "Web Accessibility: WCAG 2.1 Guidelines Explained",
    content:
      "Understand and implement WCAG 2.1 guidelines to make your web applications accessible to all users...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "21",
    title: "Serverless Architecture: Pros and Cons",
    content:
      "Explore the advantages and challenges of adopting serverless architecture for your web applications...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "22",
    title: "Web Security: Protecting Against Common Vulnerabilities",
    content:
      "Learn how to identify and mitigate common web security vulnerabilities in your applications...",
    createdAt: older.toISOString(),
  },
  {
    id: "23",
    title: "Micro Frontends: Scaling Frontend Development",
    content:
      "Discover the micro frontends architecture and how it can help scale large frontend applications...",
    createdAt: older.toISOString(),
  },
  {
    id: "24",
    title: "WebAssembly: Bringing Native Performance to the Web",
    content:
      "Explore WebAssembly and its potential to revolutionize web application performance...",
    createdAt: yesterday.toISOString(),
  },
  {
    id: "25",
    title: "Headless CMS: Decoupling Content from Presentation",
    content:
      "Learn about headless CMS architecture and its benefits for modern web development...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "26",
    title: "Web Components: Building Reusable UI Elements",
    content:
      "Discover how to create and use Web Components to build reusable, framework-agnostic UI elements...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "27",
    title: "GraphQL vs REST: Choosing the Right API Architecture",
    content:
      "Compare GraphQL and REST API architectures to determine the best fit for your project...",
    createdAt: older.toISOString(),
  },
  {
    id: "28",
    title: "Optimizing Images for the Web",
    content:
      "Learn techniques to optimize images for faster loading and better user experience on the web...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "29",
    title: "CSS-in-JS: Styling in the Age of Components",
    content:
      "Explore CSS-in-JS solutions and their impact on component-based web development...",
    createdAt: yesterday.toISOString(),
  },
  {
    id: "30",
    title: "Web Animations API: Creating Smooth Animations with JavaScript",
    content:
      "Learn how to use the Web Animations API to create performant animations in your web applications...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "31",
    title: "JAMstack: Modern Web Development Architecture",
    content:
      "Discover the JAMstack architecture and its benefits for building fast, secure websites...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "32",
    title: "Web Fonts: Best Practices for Performance and Aesthetics",
    content:
      "Learn how to effectively use web fonts while maintaining good performance and design...",
    createdAt: older.toISOString(),
  },
  {
    id: "33",
    title: "Server-Side Rendering vs. Static Site Generation",
    content:
      "Compare server-side rendering and static site generation approaches for web applications...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "34",
    title: "Web Workers: Bringing Multithreading to the Browser",
    content:
      "Explore how to use Web Workers to run background tasks and improve web application performance...",
    createdAt: yesterday.toISOString(),
  },
  {
    id: "35",
    title: "CSS Custom Properties: Enhancing Your Stylesheets",
    content:
      "Learn how to leverage CSS Custom Properties (variables) to create more maintainable stylesheets...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "36",
    title: "OAuth 2.0 and OpenID Connect: Securing Your Web Apps",
    content:
      "Understand OAuth 2.0 and OpenID Connect protocols for implementing secure authentication in web applications...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "37",
    title: "Micro-interactions: Enhancing User Experience",
    content:
      "Discover how to implement micro-interactions to improve user engagement and feedback in web interfaces...",
    createdAt: older.toISOString(),
  },
  {
    id: "38",
    title: "WebSockets: Real-time Communication in Web Apps",
    content:
      "Learn how to implement WebSockets for real-time, bidirectional communication in your web applications...",
    createdAt: today.toISOString(),
  },
  {
    id: "39",
    title: "A11y: Making Your Web Apps More Accessible",
    content:
      "Explore techniques and best practices for improving the accessibility of your web applications...",
    createdAt: yesterday.toISOString(),
  },
  {
    id: "40",
    title: "Web Components vs. Framework Components",
    content:
      "Compare native Web Components with framework-specific components and learn when to use each...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "41",
    title: "CSS Houdini: Extending the Power of CSS",
    content:
      "Discover CSS Houdini APIs and how they allow developers to extend CSS capabilities...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "42",
    title: "Offline-First Web Apps with Service Workers",
    content:
      "Learn how to build offline-first web applications using Service Workers and other modern web technologies...",
    createdAt: older.toISOString(),
  },
  {
    id: "43",
    title: "Web Vitals: Measuring and Optimizing Core Web Vitals",
    content:
      "Understand Core Web Vitals metrics and how to optimize your web pages to improve user experience...",
    createdAt: today.toISOString(),
  },
  {
    id: "44",
    title: "CSS Containment: Improving Rendering Performance",
    content:
      "Explore the CSS Containment specification and how it can be used to optimize rendering performance...",
    createdAt: yesterday.toISOString(),
  },
  {
    id: "45",
    title: "WebXR: Building Immersive Experiences on the Web",
    content:
      "Discover how to create augmented and virtual reality experiences using the WebXR Device API...",
    createdAt: lastWeek.toISOString(),
  },
  {
    id: "46",
    title: "Web Bluetooth: Connecting to Bluetooth Devices from the Browser",
    content:
      "Learn how to use the Web Bluetooth API to connect and interact with Bluetooth devices from web applications...",
    createdAt: lastMonth.toISOString(),
  },
  {
    id: "47",
    title: "CSS Subgrid: Enhancing Grid Layouts",
    content:
      "Explore the CSS Subgrid feature and how it can improve nested grid layouts in web design...",
    createdAt: older.toISOString(),
  },
  {
    id: "48",
    title: "Web Monetization: Alternative Revenue Models for Web Content",
    content:
      "Discover the Web Monetization API and how it enables new ways to monetize web content...",
    createdAt: today.toISOString(),
  },
  {
    id: "49",
    title: "HTTP/3: The Future of Web Protocol",
    content:
      "Learn about HTTP/3, its benefits, and how it improves web performance and security...",
    createdAt: yesterday.toISOString(),
  },
  {
    id: "50",
    title: "The Future of Web Development: Trends to Watch",
    content:
      "Explore emerging technologies and methodologies shaping the future of web development...",
    createdAt: lastWeek.toISOString(),
  },
];
