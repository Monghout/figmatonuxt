<template>
  <header class="bg-black font-sans">
    <nav class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20 text-sm text-gray-300">
        <div class="text-white text-2xl font-bold">LOGO</div>

        <div class="hidden md:flex items-center space-x-2">
          <div
            v-for="item in navigation"
            :key="item.name"
            class="relative group"
            @mouseleave="activeDropdown = null"
          >
            <button
              @mouseenter="activeDropdown = item.name"
              class="px-4 py-2 flex items-center space-x-1 rounded-t-md hover:text-white hover:bg-gradient-to-t from-yellow-500/20 to-transparent"
              :class="{
                'text-white bg-gradient-to-t from-yellow-500/20 to-transparent':
                  activeDropdown === item.name,
              }"
            >
              <span>{{ item.name }}</span>
              <svg
                v-if="item.children"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <div
              v-if="item.children && activeDropdown === item.name"
              class="absolute top-full left-0 bg-[#0F0F0F] border-t-2 border-yellow-500 shadow-lg rounded-b-md w-40 z-20"
            >
              <ul>
                <li v-for="child in item.children" :key="child.name">
                  <a
                    :href="child.href"
                    class="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black"
                  >
                    {{ child.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3 text-gray-400">
            <a href="#" class="hover:text-white">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                ></path>
              </svg>
            </a>
            <a href="#" class="hover:text-white">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 8a6 6 0 00-12 0v1h-2a2 2 0 00-2 2v4a2 2 0 002 2h2v-3a6 6 0 1112 0v3h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2V8z"
                ></path>
              </svg>
            </a>
          </div>

          <div class="relative" @mouseleave="currencyOpen = false">
            <button
              @mouseenter="currencyOpen = true"
              class="flex items-center space-x-1 px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <span class="text-yellow-400 font-semibold">1000</span>
              <svg
                class="w-4 h-4 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
            <div
              v-if="currencyOpen"
              class="absolute top-full right-0 mt-2 bg-[#0F0F0F] border-t-2 border-yellow-500 shadow-lg rounded-md w-36 z-20"
            >
              <ul>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black"
                    >10.000</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black"
                    >20.000</a
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="relative" @mouseleave="accountOpen = false">
            <button
              @mouseenter="accountOpen = true"
              class="flex items-center space-x-2"
            >
              <span class="font-semibold">TRUNG TÂM TÀI KHOẢN</span>
              <div
                class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold"
              >
                V
              </div>
            </button>
            <div
              v-if="accountOpen"
              class="absolute top-full right-0 mt-2 bg-[#0F0F0F] border-t-2 border-yellow-500 shadow-lg rounded-md w-48 z-20"
            >
              <ul>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black"
                    >Nhiệm Vụ</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black"
                    >Ví Của Bạn</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black"
                    >Lịch Sử Giao Dịch</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-3 text-sm text-gray-300 hover:bg-yellow-500 hover:text-black"
                    >Thoát Tài Khoản</a
                  >
                </li>
              </ul>
            </div>
          </div>

          <div>
            <select
              class="bg-gray-800 border-none text-white text-sm rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option>Tiếng Việt</option>
              <option>English</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

// State to manage which dropdown is currently active
const activeDropdown = ref(null);
const accountOpen = ref(false);
const currencyOpen = ref(false);

// Navigation data structure
const navigation = ref([
  {
    name: "LỊCH TRỰC TIẾP",
    href: "#",
    children: [
      { name: "BÓNG ĐÁ", href: "#" },
      { name: "DUA B", href: "#" },
      { name: "E-SPORTS", href: "#" },
      { name: "CASINO", href: "#" },
    ],
  },
  { name: "LỊCH THI ĐẤU", href: "#" },
  { name: "TỶ LỆ KÈO", href: "#" },
  { name: "KẾT QUẢ", href: "#" },
  { name: "PHÒNG CHAT", href: "#" },
  { name: "TIN TỨC", href: "#" },
]);
</script>

<style scoped>
/* Scoped styles for this component */
/* You can add custom styles here if needed, but Tailwind handles most of it. */
/* For example, a custom background gradient for the header if a solid color isn't enough */
header {
  background-color: #050505;
  /* A more complex background from the image might look like this: */
  /* background-image: linear-gradient(to bottom, #1a1a1a, #050505); */
  border-bottom: 3px solid #333;
}
</style>
