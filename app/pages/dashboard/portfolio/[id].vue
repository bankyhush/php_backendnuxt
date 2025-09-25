<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#171717] py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <div class="mb-6">
        <button
          @click="goBack"
          class="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Icon name="lucide:arrow-left" class="w-5 h-5 mr-2" />
          Back to Assets
        </button>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="animate-pulse">
        <div class="bg-white dark:bg-[#202020] rounded-xl shadow-lg p-6 mb-6">
          <div class="flex items-center space-x-4 mb-6">
            <div
              class="w-12 h-12 bg-gray-200 dark:bg-[#303030] rounded-full"
            ></div>
            <div>
              <div
                class="h-6 bg-gray-200 dark:bg-[#303030] rounded w-32 mb-2"
              ></div>
              <div class="h-4 bg-gray-200 dark:bg-[#303030] rounded w-24"></div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="n in 4"
              :key="n"
              class="bg-gray-100 dark:bg-[#303030] rounded-lg p-4"
            >
              <div
                class="h-4 bg-gray-200 dark:bg-[#404040] rounded w-3/4 mb-2"
              ></div>
              <div
                class="h-6 bg-gray-200 dark:bg-[#404040] rounded w-1/2"
              ></div>
            </div>
          </div>
        </div>

        <!-- Chart Skeleton -->
        <div class="bg-white dark:bg-[#202020] rounded-xl shadow-lg p-6">
          <div class="h-64 bg-gray-200 dark:bg-[#303030] rounded"></div>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-white dark:bg-[#202020] rounded-xl shadow-lg p-8 text-center"
      >
        <Icon
          name="lucide:alert-circle"
          class="w-16 h-16 text-red-500 mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading Portfolio
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Please try refreshing the page, or come back later. If the problem
          persists, contact our support team.
        </p>
        <button
          @click="fetchCoinDetails"
          class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Coin Details -->
      <div v-else-if="coin" class="space-y-6">
        <!-- Header Card -->
        <div class="bg-white dark:bg-[#202020] rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div
                v-if="coin.photo"
                class="w-12 h-12 rounded-full overflow-hidden"
              >
                <img
                  :src="coin.photo"
                  :alt="coin.coin_name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-[#23292F] text-white"
              >
                {{ coin.coin_name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ coin.coin_title }}
                </h1>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ coin.coin_name }} • ${{ formatNumber(coin.coin_rate) }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">
                ${{ formatNumber(coin.total_value) }}
              </div>
              <div class="text-gray-600 dark:text-gray-300">Total Value</div>
            </div>
          </div>
        </div>

        <!-- Balance Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Available Balance -->
          <div class="bg-white dark:bg-[#202020] rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Available
              </h3>
              <Icon name="lucide:wallet" class="w-6 h-6 text-green-500" />
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {{ formatNumber(coin.available_balance, 6) }}
            </div>
            <div class="text-lg text-gray-600 dark:text-gray-300">
              ${{ formatNumber(coin.available_balance * coin.coin_rate) }}
            </div>
            <div class="mt-3 text-sm text-green-500">Ready to trade</div>
          </div>

          <!-- On Order Balance -->
          <div class="bg-white dark:bg-[#202020] rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                On Order
              </h3>
              <Icon name="lucide:shopping-cart" class="w-6 h-6 text-blue-500" />
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {{ formatNumber(coin.on_order_balance, 6) }}
            </div>
            <div class="text-lg text-gray-600 dark:text-gray-300">
              ${{ formatNumber(coin.on_order_balance * coin.coin_rate) }}
            </div>
            <div class="mt-3 text-sm text-blue-500">In active orders</div>
          </div>

          <!-- Staked Balance -->
          <div class="bg-white dark:bg-[#202020] rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Staked
              </h3>
              <Icon name="lucide:lock" class="w-6 h-6 text-purple-500" />
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {{ formatNumber(coin.staked_balance, 6) }}
            </div>
            <div class="text-lg text-gray-600 dark:text-gray-300">
              ${{ formatNumber(coin.staked_balance * coin.coin_rate) }}
            </div>
            <div class="mt-3 text-sm text-purple-500">Earning rewards</div>
          </div>

          <!-- Total Balance -->
          <div class="bg-white dark:bg-[#202020] rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Total
              </h3>
              <Icon name="lucide:pie-chart" class="w-6 h-6 text-orange-500" />
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {{ formatNumber(coin.total_balance, 6) }}
            </div>
            <div class="text-lg text-gray-600 dark:text-gray-300">
              ${{ formatNumber(coin.total_value) }}
            </div>
            <div class="mt-3 text-sm text-orange-500">All holdings</div>
          </div>
        </div>

        <!-- Chart and Additional Info -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Balance Distribution Chart -->
          <div
            class="lg:col-span-2 bg-white dark:bg-[#202020] rounded-xl shadow-lg p-6"
          >
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Balance Distribution
            </h3>
            <div class="h-64 flex items-center justify-center">
              <div class="text-center">
                <div class="relative w-48 h-48 mx-auto mb-4">
                  <!-- Pie Chart Visualization -->
                  <svg
                    width="200"
                    height="200"
                    viewBox="0 0 42 42"
                    class="donut"
                  >
                    <!-- Available Balance -->
                    <circle
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke="#10B981"
                      stroke-width="3"
                      :stroke-dasharray="`${
                        (coin.available_balance / coin.total_balance) * 100
                      } ${
                        100 -
                        (coin.available_balance / coin.total_balance) * 100
                      }`"
                      stroke-dashoffset="25"
                    />
                    <!-- On Order Balance -->
                    <circle
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke="#3B82F6"
                      stroke-width="3"
                      :stroke-dasharray="`${
                        (coin.on_order_balance / coin.total_balance) * 100
                      } ${
                        100 - (coin.on_order_balance / coin.total_balance) * 100
                      }`"
                      :stroke-dashoffset="
                        25 - (coin.available_balance / coin.total_balance) * 100
                      "
                    />
                    <!-- Staked Balance -->
                    <circle
                      cx="21"
                      cy="21"
                      r="15.915"
                      fill="transparent"
                      stroke="#8B5CF6"
                      stroke-width="3"
                      :stroke-dasharray="`${
                        (coin.staked_balance / coin.total_balance) * 100
                      } ${
                        100 - (coin.staked_balance / coin.total_balance) * 100
                      }`"
                      :stroke-dashoffset="
                        25 -
                        ((coin.available_balance + coin.on_order_balance) /
                          coin.total_balance) *
                          100
                      "
                    />
                  </svg>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-center space-x-2">
                    <div class="w-3 h-3 bg-green-500 rounded"></div>
                    <span class="text-sm"
                      >Available:
                      {{
                        (
                          (coin.available_balance / coin.total_balance) *
                          100
                        ).toFixed(1)
                      }}%</span
                    >
                  </div>
                  <div class="flex items-center justify-center space-x-2">
                    <div class="w-3 h-3 bg-blue-500 rounded"></div>
                    <span class="text-sm"
                      >On Order:
                      {{
                        (
                          (coin.on_order_balance / coin.total_balance) *
                          100
                        ).toFixed(1)
                      }}%</span
                    >
                  </div>
                  <div class="flex items-center justify-center space-x-2">
                    <div class="w-3 h-3 bg-purple-500 rounded"></div>
                    <span class="text-sm"
                      >Staked:
                      {{
                        (
                          (coin.staked_balance / coin.total_balance) *
                          100
                        ).toFixed(1)
                      }}%</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white dark:bg-[#202020] rounded-xl shadow-lg p-6">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
            >
              Quick Actions
            </h3>
            <div class="space-y-3">
              <button
                @click="navigateToTrade('buy')"
                class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="lucide:plus" class="w-4 h-4" />
                <span>Buy {{ coin.coin_name }}</span>
              </button>
              <button
                @click="navigateToTrade('sell')"
                class="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="lucide:minus" class="w-4 h-4" />
                <span>Sell {{ coin.coin_name }}</span>
              </button>
              <button
                @click="navigateToStake"
                class="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="lucide:lock" class="w-4 h-4" />
                <span>Stake {{ coin.coin_name }}</span>
              </button>
              <button
                @click="navigateToTransfer"
                class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Icon name="lucide:send" class="w-4 h-4" />
                <span>Transfer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

// Get coin ID from route parameters
const coinId = route.params.id;

// Reactive data
const coin = ref(null);
const loading = ref(true);
const error = ref("");

// Format numbers
const formatNumber = (num, precision = 2) => {
  if (num === 0) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  if (num < 1000) return num.toFixed(precision);
  return num.toLocaleString("en-US", { maximumFractionDigits: precision });
};

// Navigate back to assets
const goBack = () => {
  router.push("/dashboard");
};

// Navigation functions for quick actions
const navigateToTrade = (action) => {
  router.push(`/dashboard/trade?coin=${coin.value.coin_id}&action=${action}`);
};

const navigateToStake = () => {
  router.push(`/dashboard/stake?coin=${coin.value.coin_id}`);
};

const navigateToTransfer = () => {
  router.push(`/dashboard/transfer?coin=${coin.value.coin_id}`);
};

// Fetch coin details from API
const fetchCoinDetails = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/portfolio.php?coin_id=${coinId}`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      coin.value = response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    error.value =
      err?.data?.message || err?.message || "Failed to load portfolio details";
    coin.value = null;
  } finally {
    loading.value = false;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchCoinDetails();
});
</script>

<style scoped>
.donut {
  animation: donut-fill 2s ease-out;
}

@keyframes donut-fill {
  from {
    stroke-dasharray: 0 100;
  }
}
</style>
