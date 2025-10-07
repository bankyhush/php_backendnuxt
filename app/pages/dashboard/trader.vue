<template>
  <div class="bg-white dark:bg-[#151414] min-h-screen p-8 mb-20">
    <div class="max-w-7xl mx-auto">
      <!-- Title and Search -->
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4"
      >
        <h1 class="text-3xl font-bold text-white">Top Copy Traders</h1>

        <!-- Search Filter -->
        <div class="w-full lg:w-64">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search traders..."
              class="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Icon
              name="lucide:search"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-gray-800 rounded-2xl p-6 animate-pulse"
        >
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-700 rounded w-32"></div>
              <div class="h-3 bg-gray-700 rounded w-20"></div>
            </div>
          </div>
          <div class="h-20 bg-gray-700 rounded mb-4"></div>
          <div class="grid grid-cols-3 gap-2">
            <div v-for="m in 3" :key="m" class="space-y-1">
              <div class="h-4 bg-gray-700 rounded"></div>
              <div class="h-3 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <Icon
          name="lucide:alert-circle"
          class="w-16 h-16 text-red-500 mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold text-white mb-2">
          Error Loading Traders
        </h2>
        <p class="text-gray-400 mb-4">{{ error }}</p>
        <button
          @click="fetchTraders"
          class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Current Trader Info -->

      <!-- 🟢 Featured Trader Singleton Card -->
      <div
        v-if="currentTrader"
        class="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-[#014115] dark:to-[#1c2918] rounded-3xl p-8 mb-10 shadow-xl text-white relative overflow-hidden"
      >
        <div class="flex flex-col sm:flex-row justify-between items-center">
          <div class="flex items-center space-x-4 mb-6 sm:mb-0">
            <img
              :src="currentTrader.photo || '/traders/current.jpg'"
              :alt="currentTrader.name"
              class="w-16 h-16 rounded-full border-4 border-white"
            />
            <div>
              <h2 class="text-2xl font-bold relative inline-block">
                {{ currentTrader.current_trader }}
                <img
                  :src="'/traders/v.png'"
                  alt="Verified"
                  class="absolute top-2 -right-7 h-5 w-5"
                />
              </h2>

              <p class="text-sm opacity-80">Trade in progress...</p>
            </div>
          </div>
          <button
            class="bg-white text-green-700 hover:bg-gray-200 font-semibold px-6 py-2 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Current Trader
          </button>
        </div>

        <!-- Performance GIF -->

        <div class="grid grid-cols-4 text-center mt-6 text-sm">
          <div>
            <p class="text-xl font-semibold">{{ currentTrader.copiers }}</p>
            <p>Copy Traders</p>
          </div>
          <div>
            <p
              :class="[
                'text-xl font-semibold',
                currentTrader.trade_status === 'active'
                  ? 'text-green-400'
                  : 'text-yellow-400',
              ]"
            >
              {{ currentTrader.trade_status }}
            </p>
            <p>Status</p>
          </div>
          <div>
            <p class="text-xl font-semibold">{{ currentTrader.win_rate }}</p>
            <p>Winning Trades</p>
          </div>
          <div>
            <p class="text-xl font-semibold">
              ${{ currentTrader.trader_profit }}
            </p>
            <p>Total Profit</p>
          </div>
        </div>

        <div class="absolute right-6 bottom-6 opacity-10 text-7xl font-bold">
          <!--  Water mark -->
          Current Trader
        </div>
      </div>
      <!-- 🔁 Trader Grid List -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        <div
          v-for="trader in filteredTraders"
          :key="trader.id"
          class="bg-white text-dark dark:bg-[#111] dark:text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition duration-300 border border-zinc-300 dark:border-[#222]"
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <img
                :src="trader.photo || '/traders/default.png'"
                :alt="trader.name"
                class="w-12 h-12 rounded-full border-2 border-green-500"
              />
              <div>
                <h2 class="text-lg font-semibold">
                  {{ trader.name }}
                </h2>
                <p class="text-sm">Rank: #{{ trader.rank }}</p>
              </div>
            </div>

            <button
              @click="copyTrader(trader)"
              :disabled="isCopying"
              class="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-1.5 rounded-full font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon
                v-if="isCopying"
                name="lucide:loader-2"
                class="animate-spin w-3 h-3 mr-1"
              />
              {{ isCopying ? "..." : "Copy Now" }}
            </button>
          </div>

          <!-- Strategy Description -->
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {{ trader.strategy_desc }}
          </p>

          <!-- Performance GIF -->
          <div
            class="h-20 mb-6 bg-gray-100 dark:bg-[#222] rounded-lg overflow-hidden"
          >
            <img
              src="/traders/tr.png"
              alt="Performance Chart"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Metrics -->
          <div class="grid grid-cols-4 text-center text-sm gap-y-2">
            <div>
              <p class="font-semibold text-base">{{ trader.nocopiers }}</p>
              <p class="text-xs">Copiers</p>
            </div>
            <div>
              <p class="font-semibold text-base">{{ trader.notrades }}</p>
              <p class="text-xs">Total Trades</p>
            </div>
            <div>
              <p class="font-semibold text-base">{{ trader.nowins }}</p>
              <p class="text-xs">Wins</p>
            </div>
            <div>
              <p class="font-semibold text-base">{{ trader.profit }}%</p>
              <p class="text-xs">Profit</p>
            </div>
          </div>

          <!-- Status Badge -->
          <div class="mt-4 flex justify-between items-center">
            <span
              :class="[
                'inline-block text-xs font-medium px-3 py-1 rounded-full capitalize',
                trader.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
              ]"
            >
              {{ trader.status }}
            </span>
            <span class="text-xs text-gray-500">
              Commission: ${{ trader.commision }}
            </span>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div
        v-if="!loading && filteredTraders.length === 0"
        class="text-center py-12"
      >
        <Icon
          name="lucide:search"
          class="w-16 h-16 text-gray-400 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold text-white mb-2">No Traders Found</h3>
        <p class="text-gray-400">No traders match your search criteria.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

import { onMounted, ref, computed } from "vue";

const config = useRuntimeConfig();

// Reactive data
const traders = ref([]);
const currentTrader = ref(null);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");
const isCopying = ref(false);
const copyError = ref("");
const copySuccess = ref("");

// Computed properties
const filteredTraders = computed(() => {
  if (!searchQuery.value) return traders.value;

  const query = searchQuery.value.toLowerCase();
  return traders.value.filter(
    (trader) =>
      trader.name.toLowerCase().includes(query) ||
      (trader.strategy_desc &&
        trader.strategy_desc.toLowerCase().includes(query))
  );
});

const featuredTrader = computed(() => {
  return traders.value.length > 0 ? traders.value[0] : null;
});

// Format numbers
const formatNumber = (num) => {
  if (!num) return "0.00";
  return parseFloat(num).toFixed(2);
};

// Fetch traders from API
const fetchTraders = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/copytrader-list.php`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      traders.value = response.data;
      await fetchCurrentTrader();
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    error.value =
      err?.data?.message || err?.message || "Failed to load traders";
  } finally {
    loading.value = false;
  }
};

// Fetch current trader from user table
const fetchCurrentTrader = async () => {
  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/current-trader.php`,
      {
        credentials: "include",
      }
    );

    if (response.success && response.data) {
      currentTrader.value = response.data;
    }
  } catch (err) {
    console.error("Failed to fetch current trader:", err);
  }
};

// Copy trader function

// Initialize
onMounted(() => {
  fetchTraders();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
