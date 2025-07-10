<template>
  <div class="flex items-center space-x-4">
    <!-- Game Icons Group -->
    <div v-if="user" class="flex items-center space-x-3">
      <!-- Notification Bell with Badge -->
      <button class="relative group">
        <div
          class="p-1.5 rounded-md bg-gray-800/80 group-hover:bg-yellow-900/30 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span
            v-if="unreadCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-2 w-2 flex items-center justify-center border border-yellow-400 shadow-sm"
          >
            {{ unreadCount }}
          </span>
        </div>
        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all"
        ></div>
      </button>

      <!-- Calendar with Streak -->
      <button class="relative group">
        <div
          class="p-1.5 rounded-md bg-gray-800/80 group-hover:bg-yellow-900/30 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span
            class="absolute -bottom-1 -right-1 bg-yellow-500 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-yellow-400 shadow-sm"
          >
            {{ streakDays }}
          </span>
        </div>
        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all"
        ></div>
      </button>

      <!-- Messages/Inbox -->
      <button class="relative group">
        <div
          class="p-1.5 rounded-md bg-gray-800/80 group-hover:bg-yellow-900/30 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all"
        ></div>
      </button>
    </div>

    <!-- Auth Buttons - Game Style -->
    <div v-if="!user" class="flex items-center space-x-3">
      <button
        @click="navigateTo('/auth/signup')"
        class="px-4 py-1.5 rounded-md text-xs font-bold tracking-wide bg-gradient-to-b from-yellow-500 to-yellow-600 text-black shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 border-b-2 border-yellow-700 hover:border-yellow-600"
      >
        JOIN NOW
      </button>
      <button
        @click="navigateTo('/auth/login')"
        class="px-4 py-1.5 rounded-md text-xs font-bold tracking-wide bg-gradient-to-b from-gray-800 to-black text-yellow-400 shadow-lg hover:from-gray-700 hover:to-gray-900 transition-all transform hover:scale-105 border-b-2 border-yellow-700 hover:border-yellow-600"
      >
        LOGIN
      </button>
    </div>

    <!-- User Profile - RPG Style -->
    <div v-else class="flex items-center space-x-3">
      <!-- Profile Avatar with Level -->
      <div
        class="relative group"
        @mouseenter="showDropdown = true"
        @mouseleave="delayHideDropdown"
      >
        <div
          class="relative p-0.5 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-600 to-yellow-800 animate-glow"
        >
          <div class="relative bg-gray-900 rounded-full p-px">
            <img
              v-if="user.photoURL"
              :src="user.photoURL"
              class="w-9 h-9 rounded-full object-cover border border-gray-800"
              alt="Profile"
            />
            <div
              v-else
              class="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center"
            >
              <span class="text-yellow-400 text-sm font-bold">{{
                userInitials
              }}</span>
            </div>
            <!-- Level Badge -->
            <div
              class="absolute -bottom-1 -right-1 bg-gradient-to-b from-yellow-400 to-yellow-600 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-gray-900 shadow-lg"
            >
              {{ userLevel }}
            </div>
          </div>
        </div>

        <!-- Dropdown Menu -->
        <div
          v-show="showDropdown"
          class="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50 border border-yellow-500/30"
          @mouseenter="showDropdown = true"
          @mouseleave="showDropdown = false"
        >
          <div class="py-1">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-200 hover:bg-yellow-900/30 hover:text-yellow-400 transition-colors"
            >
              Profile
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-200 hover:bg-yellow-900/30 hover:text-yellow-400 transition-colors"
            >
              Settings
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-200 hover:bg-yellow-900/30 hover:text-yellow-400 transition-colors"
            >
              Messages
            </a>
          </div>
          <div class="border-t border-gray-700">
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composible/useAuth";
import { ref, computed } from "vue";

const { user, logout } = useAuth();

// Game stats - replace with real data
const unreadCount = ref(3);
const streakDays = ref(7);
const userLevel = ref(15);
const xpCurrent = ref(1250);
const xpNextLevel = ref(2000);
const xpPercent = computed(() =>
  Math.round((xpCurrent.value / xpNextLevel.value) * 100)
);

// Dropdown state
const showDropdown = ref(false);
let hideTimeout: number;

const delayHideDropdown = () => {
  hideTimeout = setTimeout(() => {
    showDropdown.value = false;
  }, 30000); // 300ms delay before hiding
};

const cancelHide = () => {
  clearTimeout(hideTimeout);
};

// Compute user initials for placeholder
const userInitials = computed(() => {
  if (!user.value?.displayName && !user.value?.email) return "?";
  const name = user.value.displayName || user.value.email;
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
});
</script>

<style>
/* Glowing animation for premium effect */
.animate-glow {
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px rgba(245, 158, 11, 0.5);
  }
  to {
    box-shadow:
      0 0 10px rgba(245, 158, 11, 0.8),
      0 0 20px rgba(245, 158, 11, 0.3);
  }
}
</style>
