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
      class="flex overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x gap-4 py-2 w-full scrollbar-none px-2"
    >
      <div
        v-for="match in matches"
        :key="match.id"
        class="flex-none snap-start w-[300px] h-[220px] rounded-2xl overflow-hidden relative transition-all shadow-lg hover:shadow-xl hover:-translate-y-1.5 group border-2 border-yellow-400"
        :style="{
          'background-image': `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${match.bg})`,
          'background-size': 'cover',
          'background-position': 'center',
        }"
      >
        <!-- Content container -->
        <div class="relative z-10 h-full flex flex-col justify-between p-2">
          <!-- Top Row -->
          <div class="flex justify-between items-center w-full">
            <!-- Hot Tag - Updated to match border color -->
            <div
              class="flex items-center px-5 py-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-md border border-yellow-300"
            >
              <Flame class="h-3.5 w-3.5 text-white" />
              <span class="text-xs font-bold text-white tracking-wide"
                >Hot</span
              >
            </div>

            <!-- Notification Badge -->
            <div class="absolute top-2 right-2 z-30">
              <div
                v-if="match.isLive"
                class="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-b from-red-500 to-red-700 text-white rounded-full text-xs font-bold tracking-wide shadow-md border border-red-600/50 relative"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full"
                ></div>
                <span class="relative flex h-2 w-2 z-10">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-white"
                  ></span>
                </span>
                <span class="relative z-10">LIVE NOW</span>
              </div>
              <button
                v-else
                @click.stop="toggleNotification(match.id)"
                class="w-12 h-12 p-2 rounded-xl transition-all focus:outline-none flex flex-col items-center justify-center relative border shadow-md"
                :class="{
                  'bg-gradient-to-b from-yellow-400 to-yellow-600 border-yellow-500/50 shadow-inner':
                    notificationStates[match.id],
                  'bg-gradient-to-b from-gray-700 to-gray-900 border-gray-600/50 hover:from-gray-600 hover:to-gray-800':
                    !notificationStates[match.id],
                }"
              >
                <div
                  class="absolute inset-0 rounded-xl"
                  :class="{
                    'bg-gradient-to-b from-white/20 to-transparent':
                      notificationStates[match.id],
                    'bg-gradient-to-b from-white/10 to-transparent':
                      !notificationStates[match.id],
                  }"
                ></div>
                <Bell
                  class="h-4 w-4 mb-0.5 relative z-10"
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

          <!-- Match Content -->

          <!-- Bottom Tab Section -->
          <div
            class="absolute bottom-0 left-0 right-0 rounded-r-xl border-t border-yellow-500 bg-gradient-to-t from-[#ffbe28] via-[#FFC052FF]/80 to-[#ffc641] backdrop-blur-md"
          >
            <div>
              <div class="absolute -top-7"></div>
              <div>
                <div class="absolute -top-5">
                  <div
                    class="bg-gradient-to-t from-[#fbc64b] to-[#ffc94b] backdrop-blur-md rounded-tr-xl p-0.5 border-t-2 border-yellow-500"
                  >
                    <span
                      class="text-[10px] text-gray-800 text-center line-clamp-2 font-bold px-4"
                    >
                      {{ match.league }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Grid Layout -->
            <div class="grid grid-cols-12 gap-1 items-center pt-2 px-2">
              <!-- Team A Column -->
              <div class="col-span-5 flex items-center justify-start space-x-2">
                <img
                  :src="match.teamALogo"
                  :alt="match.teamA"
                  class="h-10 w-10 object-contain"
                />
                <span
                  class="text-[10px] text-gray-800 leading-tight break-words font-semibold max-w-[55px]"
                >
                  {{ match.teamA }}
                </span>
              </div>

              <!-- VS / Time Column -->
              <div
                class="col-span-2 flex flex-col items-center justify-center space-y-1"
              >
                <span class="text-sm font-bold text-gray-800">VS</span>
                <span
                  class="text-[10px] font-medium text-white bg-gray-800 px-2 py-0.5 rounded-md shadow"
                >
                  {{ match.time }}
                </span>
              </div>

              <!-- Team B Column -->
              <div class="col-span-5 flex items-center justify-end space-x-2">
                <span
                  class="text-[10px] text-gray-800 leading-tight text-right break-words font-semibold max-w-[55px]"
                >
                  {{ match.teamB }}
                </span>
                <img
                  :src="match.teamBLogo"
                  :alt="match.teamB"
                  class="h-10 w-10 object-contain"
                />
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
</style>
