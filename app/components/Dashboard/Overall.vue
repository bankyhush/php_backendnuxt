<template>
  <div
    class="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl dark:bg-[#202020] dark:text-gray-50"
  >
    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="flex items-center mb-2">
        <div class="h-4 bg-gray-200 dark:bg-[#303030] rounded w-32"></div>
      </div>
      <div class="flex items-baseline mb-1">
        <div class="h-8 bg-gray-200 dark:bg-[#303030] rounded w-40 mr-2"></div>
        <div class="h-4 bg-gray-200 dark:bg-[#303030] rounded w-12"></div>
      </div>
      <div class="mb-8">
        <div class="h-4 bg-gray-200 dark:bg-[#303030] rounded w-48"></div>
      </div>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="n in 4"
          :key="n"
          class="h-10 bg-gray-200 dark:bg-[#303030] rounded w-24"
        ></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-4">
      <Icon
        name="lucide:alert-circle"
        class="w-6 h-6 text-red-500 mx-auto mb-2"
      />
      <p class="text-red-500 text-sm">Error: Try again later</p>
      <button
        @click="fetchBalances"
        class="mt-2 text-blue-500 hover:text-blue-600 text-sm"
      >
        Retry
      </button>
    </div>

    <!-- Data Loaded -->
    <div v-else>
      <div class="flex items-center mb-2">
        <h2 class="text-sm text-[#beb8b8] mr-2">Estimated total value</h2>
        <!-- Optional: Icon -->
      </div>

      <div class="flex items-baseline mb-1">
        <h1 class="text-3xl font-bold mr-2">
          ${{ formatNumber(balances.total_value) }}
        </h1>
        <span class="text-[#beb8b8] text-sm">USD</span>
        <!-- Overall total coin balance -->
      </div>

      <div class="mb-8 text-sm">
        <span class="mr-1">Available's W/L:</span>
        <span class="text-green-500">
          ${{ formatNumber(balances.available_value) }}
          <!-- Overall total coin available balance -->
          <span class="text-red-500"
            ><!-- Overall total coin on_order balance -->
            (-${{ formatNumber(balances.on_order_value) }})</span
          >
        </span>
      </div>

      <div class="flex flex-wrap gap-2 rounded-lg">
        <!-- Button 1 -->
        <NuxtLink to="/dashboard/deposit/1" class="w-[30%] sm:w-auto">
          <button
            class="cursor-pointer flex items-center gap-1 justify-center w-full bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
          >
            <Icon name="fluent-mdl2:add-to" width="2048" height="2048" />
            Deposit
          </button>
        </NuxtLink>

        <!-- Button 2 -->
        <NuxtLink to="/dashboard/transfer/" class="w-[30%] sm:w-auto">
          <button
            class="cursor-pointer flex items-center gap-1 justify-center w-full bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
          >
            <Icon
              name="solar:round-transfer-diagonal-broken"
              width="24"
              height="24"
            />
            Transfer
          </button>
        </NuxtLink>

        <!-- Button 3 -->
        <NuxtLink to="/dashboard/withdraw/1" class="w-[30%] sm:w-auto">
          <button
            class="cursor-pointer flex items-center gap-1 justify-center w-full bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
          >
            <Icon name="icons8:minus" width="32" height="32" />
            Withdraw
          </button>
        </NuxtLink>

        <!-- Button 4 (Hidden on mobile) -->
        <NuxtLink to="/dashboard/trade" class="hidden sm:block sm:w-auto">
          <button
            class="cursor-pointer flex items-center gap-1 justify-center bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
          >
            <Icon name="hugeicons:coins-swap" width="24" height="24" />
            Trade
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

// Reactive data
const balances = ref({
  total_value: 0,
  available_value: 0,
  on_order_value: 0,
  staked_value: 0,
});
const loading = ref(true);
const error = ref("");

// Format numbers
const formatNumber = (num) => {
  if (num === 0) return "0.00";
  if (num < 0.01) return num.toFixed(4);
  if (num < 1) return num.toFixed(3);
  if (num < 1000) return num.toFixed(2);
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

// Fetch overall balances from API
const fetchBalances = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/overall-balances.php`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      balances.value = response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    error.value =
      err?.data?.message || err?.message || "Failed to load balances";
    // Set default values on error
    balances.value = {
      total_value: 0,
      available_value: 0,
      on_order_value: 0,
      staked_value: 0,
    };
  } finally {
    loading.value = false;
  }
};

// Auto-refresh balances every 30 seconds
let refreshInterval;

onMounted(() => {
  fetchBalances();

  // Set up auto-refresh
  refreshInterval = setInterval(() => {
    if (!loading.value) {
      fetchBalances();
    }
  }, 80000);
});

onBeforeUnmount(() => {
  clearInterval(refreshInterval);
});
</script>
