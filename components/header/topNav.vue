<template>
  <div class="bg-gradient-to-r from-yellow-600 to-yellow-500 w-full">
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
              @mouseenter="activeDropdown = item.name"
              @mouseleave="activeDropdown = null"
            />
          </div>
          <div class="flex items-center space-x-4">
            <CurrencySelector />
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import NavDropdown from "./dropDownMenu.vue";
import CurrencySelector from "./coins.vue";
import AuthButtons from "./auth.vue";

defineProps({
  navigation: Array,
  activeDropdown: String,
});
</script>
