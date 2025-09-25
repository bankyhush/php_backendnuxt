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
      <p class="text-red-500 text-sm">{{ error }}</p>
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
        <Icon name="lucide:info" class="w-4 h-4 text-[#beb8b8]" />
      </div>

      <div class="flex items-baseline mb-1">
        <h1 class="text-3xl font-bold mr-2">
          ${{ formatNumber(balances.total_value) }}
        </h1>
        <span class="text-[#beb8b8] text-sm">USD</span>
      </div>

      <div class="mb-8 text-sm">
        <span class="mr-1">Balances:</span>
        <span class="text-green-500">
          ${{ formatNumber(balances.available_value) }}
          <!-- Available Balance -->
          <span class="text-red-500 ml-2">
            <!-- On Order Balance -->
            (${{ formatNumber(balances.on_order_value) }} on order)
          </span>
        </span>
      </div>

      <!-- Detailed Breakdown (Optional - can be hidden/show on click) -->
      <div class="mb-4 p-3 bg-gray-50 dark:bg-[#303030] rounded-lg text-xs">
        <div class="grid grid-cols-3 gap-2 text-center">
          <div>
            <div class="text-[#beb8b8]">Available</div>
            <div class="font-medium">
              ${{ formatNumber(balances.available_value) }}
            </div>
          </div>
          <div>
            <div class="text-[#beb8b8]">On Order</div>
            <div class="font-medium">
              ${{ formatNumber(balances.on_order_value) }}
            </div>
          </div>
          <div>
            <div class="text-[#beb8b8]">Staked</div>
            <div class="font-medium">
              ${{ formatNumber(balances.staked_value) }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-wrap gap-2 rounded-lg text-center justify-center items-center"
      >
        <NuxtLink to="/dashboard/deposit/1">
          <button
            class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
          >
            Deposit
          </button>
        </NuxtLink>

        <NuxtLink to="/dashboard/convert">
          <button
            class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
          >
            transfer
          </button>
        </NuxtLink>

        <NuxtLink to="/dashboard/withdraw/1">
          <button
            class="cursor-pointer bg-white text-black border border-gray-300 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors dark:bg-[#303030] dark:text-white dark:border-[#303030] dark:hover:border-gray-500"
          >
            Withdraw
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
  }, 30000);
});

onBeforeUnmount(() => {
  clearInterval(refreshInterval);
});
</script>
