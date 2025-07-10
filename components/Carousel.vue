<template>
  <div class="flex items-center relative px-2 mx-auto max-w-full">
    <!-- Navigation Left Button -->
    <button
      class="absolute top-1/2 -translate-y-1/2 -left-8 w-8 h-16 rounded-lg bg-gray-800/80 hover:bg-gray-700/90 flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-sm"
      @click="scrollLeft"
      aria-label="Previous matches"
    >
      <ChevronLeft class="text-white h-5 w-5" />
    </button>

    <!-- Carousel -->
    <div
      ref="carousel"
      class="flex overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x gap-3 py-2 w-full scrollbar-none"
    >
      <div
        v-for="match in matches"
        :key="match.id"
        class="flex-none snap-start w-[280px] h-[180px] rounded-2xl overflow-hidden relative transition-all border-2 border-yellow-400"
        :style="{
          'background-image': `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${match.bg}) `,
          'background-size': 'cover',
          'background-position': 'center',
        }"
      >
        <!-- Content container -->
        <div class="relative z-10 h-full flex flex-col justify-between">
          <!-- 🔥 HOT Flame Badge in Top-Right -->
          <div class="w-full h-full">
            <div class="absolute top-0 right-0 z-50">
              <div
                class="relative flex items-center justify-center w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 border border-yellow-300 rounded-bl-2xl shadow-sm overflow-hidden"
              >
                <!-- GIF as background layer -->
              </div>
              <div class="relative bottom-6 -right-1">
                <div>
                  <img
                    src="/icons/Flame.gif"
                    alt="hot flame"
                    class="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                </div>
                <!-- Text on top of GIF -->
                <div>
                  <span
                    class="relative text-[10px] font-extrabold text-red-600 uppercase tracking-wide z-10"
                    style="-webkit-text-stroke: 0.6px gold"
                  >
                    HOT
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- Soccer Icon (Moving) -->
          <div class="absolute bottom-[60px] left-2 z-20">
            <img
              src="/icons/baseketball.png"
              alt="soccer ball"
              class="h-10 w-10 animate-spin-slow"
            />
          </div>

          <!-- Bottom Tab Section -->
          <div>
            <!-- Grid Layout -->
            <div
              class="absolute bottom-0 left-0 right-0 rounded-lg border-yellow-500 bg-gradient-to-t from-[#fdc33c] to-[#fed77d]"
            >
              <div class="grid grid-cols-12 gap-2 items-center pt-2 px-4">
                <!-- LEFT COLUMN: 3x2 inner grid -->
                <div class="col-span-8">
                  <div class="grid grid-cols-3 grid-rows-2 items-center">
                    <!-- Top Row -->
                    <div class="flex items-center justify-start">
                      <span class="text-xs text-gray-800 font-semibold">
                        Team A
                      </span>
                    </div>

                    <div class="flex items-center justify-center">
                      <span class="text-sm font-bold text-black">VS</span>
                    </div>

                    <div class="flex items-center justify-end">
                      <span
                        class="text-xs text-gray-800 font-semibold text-right"
                      >
                        Team B
                      </span>
                    </div>

                    <!-- Bottom Row -->
                    <div></div>
                    <div class="flex items-center justify-center w-full">
                      <span
                        class="absolute w-full text-xs text-black font-semibold text-center whitespace-nowrap"
                      >
                        BLV NONAME
                      </span>
                    </div>

                    <div></div>
                  </div>
                </div>

                <!-- RIGHT COLUMN: LIVE / BELL -->
                <div class="col-span-4 flex align-middle justify-end">
                  <div class="relative pb-2">
                    <div v-if="match.isLive" class="pb-2 pt-1 pl-3">
                      <div
                        class="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-b from-red-500 to-red-700 text-white rounded-sm text-[12px] tracking-wide border-red-600/50 relative"
                      >
                        <span class="relative flex h-2 w-2">
                          <span
                            class="animate-ping absolute h-full w-full rounded-full bg-white opacity-75"
                          ></span>
                          <span class="relative rounded-sm w-4 bg-white"></span>
                        </span>
                        <span class="relative">LIVE</span>
                      </div>
                    </div>
                    <button
                      v-else
                      @click.stop="toggleNotification(match.id)"
                      class="w-10 h-10 rounded-sm transition-all focus:outline-none flex flex-col items-center justify-center"
                      :class="{
                        'bg-gradient-to-b from-yellow-400 to-yellow-600 border-yellow-500/50 shadow-inner':
                          notificationStates[match.id],
                        'bg-gradient-to-b from-gray-700 to-gray-900 border-gray-600/50 hover:from-gray-600 hover:to-gray-800':
                          !notificationStates[match.id],
                      }"
                    >
                      <div
                        class="absolute inset-0 rounded-l"
                        :class="{
                          'bg-gradient-to-b from-white/20 to-transparent':
                            notificationStates[match.id],
                          'bg-gradient-to-b from-white/10 to-transparent':
                            !notificationStates[match.id],
                        }"
                      ></div>
                      <Bell
                        class="h-3 w-3 mb-0.5 relative z-10"
                        :class="{
                          'text-gray-900': notificationStates[match.id],
                          'text-yellow-400': !notificationStates[match.id],
                        }"
                      />
                      <span
                        class="text-[10px] font-medium relative z-10"
                        :class="{
                          'text-gray-900': notificationStates[match.id],
                          'text-yellow-400': !notificationStates[match.id],
                        }"
                      >
                        {{ notificationStates[match.id] ? "ON" : "OFF" }}
                      </span>
                      <span
                        v-if="!notificationStates[match.id]"
                        class="absolute top-1 right-1 flex h-2.5 w-2.5 z-10"
                      >
                        <span
                          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"
                        ></span>
                        <span
                          class="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"
                        ></span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Right Button -->
    <button
      class="absolute top-1/2 -translate-y-1/2 -right-8 w-8 h-16 rounded-lg bg-gray-800/80 hover:bg-gray-700/90 flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-sm"
      @click="scrollRight"
      aria-label="Next matches"
    >
      <ChevronRight class="text-white h-5 w-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Flame, Bell } from "lucide-vue-next";
import type { Match } from "../types/data";
import { ref, onMounted } from "vue";

const props = defineProps<{
  matches: Match[];
}>();

const carousel = ref<HTMLElement | null>(null);
const notificationStates = ref<Record<string, boolean>>({});

// Initialize notification states from localStorage
onMounted(() => {
  props.matches.forEach((match) => {
    const savedState = localStorage.getItem(`notification-${match.id}`);
    if (savedState !== null) {
      notificationStates.value[match.id] = savedState === "true";
    } else {
      notificationStates.value[match.id] = false; // Default to OFF
    }
  });
});

const toggleNotification = (matchId: string) => {
  notificationStates.value[matchId] = !notificationStates.value[matchId];
  // Save to localStorage
  localStorage.setItem(
    `notification-${matchId}`,
    notificationStates.value[matchId].toString()
  );
};

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: -320, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 320, behavior: "smooth" });
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
</script>
<style>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

/* Ensure text doesn't overflow */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
</style>
