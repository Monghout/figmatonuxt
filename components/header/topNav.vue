<template>
  <div
    class="w-full bg-gradient-to-r from-yellow-200 via-yellow-200 to-yellow-400"
  >
    <nav class="container">
      <div class="flex h-12">
        <div class="w-1/5"></div>
        <div class="flex items-center justify-between w-full text-sm">
          <div class="flex items-center pl-24 space-x-1">
            <NavDropdown
              v-for="item in navigation"
              :key="item.name"
              :item="item"
              :active-dropdown="activeDropdown"
              @set-active-dropdown="setActiveDropdown"
            />
          </div>
          <div class="flex items-center space-x-4 bg-black rounded-full px-2">
            <CurrencySelector />
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavDropdown from "./dropDownMenu.vue";
import CurrencySelector from "./coins.vue";
import AuthButtons from "./auth.vue";

const props = defineProps({
  navigation: Array,
});

const activeDropdown = ref(null);

const setActiveDropdown = (name) => {
  activeDropdown.value = name;
};
</script>
