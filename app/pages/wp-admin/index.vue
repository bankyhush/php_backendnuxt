<script setup>
definePageMeta({
  layout: "admin",
});

import { ref, onMounted } from "vue";

const config = useRuntimeConfig();
const stats = ref({
  users: 0,
  coins: 0,
  copytrader: 0,
  staking_plans: 0,
  tradingplans: 0,
  news: 0,
});
const loading = ref(false);

const fetchStats = async () => {
  loading.value = true;
  try {
    const res = await $fetch(`${config.public.apiBase}/admin/admin-stats.php`, {
      credentials: "include",
    });
    if (res.success) {
      stats.value = res.stats;
    }
  } catch (err) {
    console.error("Error fetching stats:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStats);
</script>

<template>
  <div>
    <div class="flex-1 flex flex-col">
      <main class="flex-1 p-6 lg:p-8">
        <h1 class="text-3xl font-bold text-primary mb-6">Dashboard Overview</h1>

        <div v-if="loading">Loading...</div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <!-- Users -->
          <div
            class="bg-white p-6 rounded-lg shadow-custom hover:shadow-lg transition-shadow duration-200"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-800">Users</h3>
              <span class="text-accent">👤</span>
            </div>
            <p class="text-3xl font-bold text-primary mt-2">
              {{ stats.users }}
            </p>
            <p class="text-secondary text-sm">Total registered users</p>
          </div>

          <!-- Coins -->
          <div
            class="bg-white p-6 rounded-lg shadow-custom hover:shadow-lg transition-shadow duration-200"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-800">Coins</h3>
              <span class="text-accent">🪙</span>
            </div>
            <p class="text-3xl font-bold text-primary mt-2">
              {{ stats.coins }}
            </p>
            <p class="text-secondary text-sm">Total coins</p>
          </div>

          <!-- Copytrader -->
          <div
            class="bg-white p-6 rounded-lg shadow-custom hover:shadow-lg transition-shadow duration-200"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-800">Copytrader</h3>
              <span class="text-accent">📈</span>
            </div>
            <p class="text-3xl font-bold text-primary mt-2">
              {{ stats.copytrader }}
            </p>
            <p class="text-secondary text-sm">Total copytraders</p>
          </div>

          <!-- Staking Plans -->
          <div
            class="bg-white p-6 rounded-lg shadow-custom hover:shadow-lg transition-shadow duration-200"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-800">Staking Plans</h3>
              <span class="text-accent">💹</span>
            </div>
            <p class="text-3xl font-bold text-primary mt-2">
              {{ stats.staking_plans }}
            </p>
            <p class="text-secondary text-sm">Total staking plans</p>
          </div>

          <!-- Trading Plans -->
          <div
            class="bg-white p-6 rounded-lg shadow-custom hover:shadow-lg transition-shadow duration-200"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-800">Trading Plans</h3>
              <span class="text-accent">📊</span>
            </div>
            <p class="text-3xl font-bold text-primary mt-2">
              {{ stats.tradingplans }}
            </p>
            <p class="text-secondary text-sm">Total trading plans</p>
          </div>

          <!-- News -->
          <div
            class="bg-white p-6 rounded-lg shadow-custom hover:shadow-lg transition-shadow duration-200"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-800">News</h3>
              <span class="text-accent">📰</span>
            </div>
            <p class="text-3xl font-bold text-primary mt-2">{{ stats.news }}</p>
            <p class="text-secondary text-sm">Total news articles</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
