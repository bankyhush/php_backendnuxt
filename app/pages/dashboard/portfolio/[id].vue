<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-[#171717] py-10 px-4 text-gray-900 dark:text-gray-100 mb-14"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Loading Skeleton with 800ms delay -->
      <div v-if="loading" class="animate-pulse">
        <!-- Back Button Skeleton -->
        <div class="mb-6">
          <div class="h-6 w-24 bg-gray-200 dark:bg-[#171717] rounded"></div>
        </div>

        <!-- Header Skeleton -->
        <div class="mb-8 flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gray-200 dark:bg-[#171717] rounded-full"
          ></div>
          <div>
            <div
              class="h-6 w-32 bg-gray-200 dark:bg-[#171717] rounded mb-2"
            ></div>
            <div class="h-4 w-24 bg-gray-200 dark:bg-[#171717] rounded"></div>
          </div>
        </div>

        <!-- Portfolio Value Skeleton -->
        <div class="bg-white dark:bg-[#202020] rounded-xl shadow-sm p-6 mb-8">
          <div
            class="h-4 w-32 bg-gray-200 dark:bg-[#171717] rounded mb-4"
          ></div>
          <div
            class="h-8 w-40 bg-gray-200 dark:bg-[#171717] rounded mb-2"
          ></div>
          <div class="h-4 w-48 bg-gray-200 dark:bg-[#171717] rounded"></div>
        </div>

        <!-- Actions Skeleton -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div
            v-for="n in 4"
            :key="n"
            class="h-12 bg-gray-200 dark:bg-[#171717] rounded-lg"
          ></div>
        </div>

        <!-- Main Content Skeleton -->
        <div class="grid lg:grid-cols-3 gap-6">
          <!-- Asset Summary Skeleton -->
          <div
            class="lg:col-span-2 bg-white dark:bg-[#202020] p-6 rounded-xl shadow-sm"
          >
            <div
              class="h-6 w-32 bg-gray-200 dark:bg-[#171717] rounded mb-4"
            ></div>
            <div class="space-y-2">
              <div class="h-4 w-48 bg-gray-200 dark:bg-[#171717] rounded"></div>
              <div class="h-4 w-40 bg-gray-200 dark:bg-[#171717] rounded"></div>
            </div>
          </div>

          <!-- Allocation Skeleton -->
          <div class="bg-white dark:bg-[#202020] p-6 rounded-xl shadow-sm">
            <div
              class="h-6 w-24 bg-gray-200 dark:bg-[#171717] rounded mb-4"
            ></div>
            <div
              class="h-3 w-full bg-gray-200 dark:bg-[#171717] rounded mb-4"
            ></div>
            <div class="space-y-2">
              <div
                class="h-4 w-full bg-gray-200 dark:bg-[#171717] rounded"
              ></div>
              <div
                class="h-4 w-full bg-gray-200 dark:bg-[#171717] rounded"
              ></div>
              <div
                class="h-4 w-full bg-gray-200 dark:bg-[#171717] rounded"
              ></div>
            </div>
          </div>
        </div>

        <!-- Tabs Skeleton -->
        <div class="mt-10">
          <div class="flex gap-6 mb-6">
            <div
              v-for="n in 2"
              :key="n"
              class="h-6 w-24 bg-gray-200 dark:bg-[#171717] rounded"
            ></div>
          </div>
          <div
            class="bg-white dark:bg-[#202020] p-6 rounded-xl shadow-sm h-64"
          ></div>
        </div>
      </div>

      <!-- Content when data is loaded -->
      <div v-else-if="coinData">
        <!-- Back Button -->

        <!-- HEADER -->
        <div class="mb-8 flex items-center space-x-3">
          <img
            v-if="coinData.photo"
            :src="coinData.photo"
            :alt="`${coinData.coin_name} logo`"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div
            v-else
            class="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg"
          >
            {{ coinData.coin_name?.charAt(0) ?? "?" }}
          </div>
          <div>
            <h1 class="text-xl font-semibold">{{ coinData.coin_name }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400 uppercase">
              {{ coinData.coin_title }}
            </p>
          </div>
        </div>

        <!-- PORTFOLIO VALUE -->
        <div class="bg-white dark:bg-[#202020] rounded-xl shadow-sm p-6 mb-8">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-sm text-gray-500 dark:text-gray-400">
              Total Portfolio
            </h2>
          </div>
          <div class="flex items-end space-x-2">
            <h1 class="text-3xl font-bold">
              ${{ formatNumber(coinData.total_balance) }}
            </h1>
          </div>
          <div class="text-sm mt-1">
            <span class="text-orange-600 dark:text-orange-500 font-medium">
              ~ {{ formatNumber(coinData.total_value) }}
              {{ coinData.coin_name }}
            </span>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <NuxtLink
            :to="`/dashboard/deposit/${coinId}`"
            class="cursor-pointer flex items-center justify-center bg-white dark:bg-[#202020] rounded-lg border border-gray-300 dark:border-[#303030] py-3 text-sm font-medium hover:shadow transition"
          >
            <Icon
              name="lucide:download"
              class="mr-2 text-gray-600 dark:text-gray-300"
            />
            Deposit
          </NuxtLink>

          <NuxtLink
            :to="`/dashboard/withdraw/${coinId}`"
            class="cursor-pointer flex items-center justify-center bg-white dark:bg-[#202020] rounded-lg border border-gray-300 dark:border-[#303030] py-3 text-sm font-medium hover:shadow transition"
          >
            <Icon
              name="lucide:upload"
              class="mr-2 text-gray-600 dark:text-gray-300"
            />
            Withdraw
          </NuxtLink>

          <NuxtLink
            to="/dashboard/convert"
            class="cursor-pointer flex items-center justify-center bg-white dark:bg-[#202020] rounded-lg border border-gray-300 dark:border-[#303030] py-3 text-sm font-medium hover:shadow transition"
          >
            <Icon
              name="lucide:bar-chart"
              class="mr-2 text-gray-600 dark:text-gray-300"
            />
            Convert
          </NuxtLink>

          <NuxtLink
            to="/support"
            class="cursor-pointer flex items-center justify-center bg-white dark:bg-[#202020] rounded-lg border border-gray-300 dark:border-[#303030] py-3 text-sm font-medium hover:shadow transition"
          >
            <Icon
              name="lucide:bell"
              class="mr-2 text-gray-600 dark:text-gray-300"
            />
            Support
          </NuxtLink>
        </div>

        <!-- MAIN CONTENT -->
        <div class="grid lg:grid-cols-3 gap-6">
          <!-- Asset Summary -->
          <div
            class="lg:col-span-2 bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-[#303030]"
          >
            <h3
              class="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100 tracking-wide"
            >
              Asset Summary
            </h3>

            <div class="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
              <!-- Available Balance -->
              <div
                class="p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-[#303030] bg-gray-50 dark:bg-[#2a2a2a] hover:shadow-md transition"
              >
                <div
                  class="text-[13px] sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Available
                </div>
                <div
                  class="text-base sm:text-xl font-semibold text-green-500 dark:text-green-400"
                >
                  ${{ formatNumber(coinData.available_balance, 2) }}
                </div>
                <div
                  class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400"
                >
                  {{ formatNumber(coinData.available_value) }}
                  {{ coinData.coin_name }}
                </div>
              </div>

              <!-- On Order -->
              <div
                class="p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-[#303030] bg-gray-50 dark:bg-[#2a2a2a] hover:shadow-md transition"
              >
                <div
                  class="text-[13px] sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  On Order
                </div>
                <div
                  class="text-base sm:text-xl font-semibold text-red-500 dark:text-red-400"
                >
                  ${{ formatNumber(coinData.on_order_balance, 2) }}
                </div>
                <div
                  class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400"
                >
                  {{ formatNumber(coinData.on_order_value) }}
                  {{ coinData.coin_name }}
                </div>
              </div>

              <!-- Staked -->
              <div
                class="p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-[#303030] bg-gray-50 dark:bg-[#2a2a2a] hover:shadow-md transition"
              >
                <div
                  class="text-[13px] sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Staked
                </div>
                <div
                  class="text-base sm:text-xl font-semibold text-yellow-500 dark:text-yellow-400"
                >
                  ${{ formatNumber(coinData.staked_balance, 2) }}
                </div>
                <div
                  class="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400"
                >
                  {{ formatNumber(coinData.staked_value) }}
                  {{ coinData.coin_name }}
                </div>
              </div>

              <!-- Spot Price -->
              <div
                class="p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-[#303030] bg-gray-50 dark:bg-[#2a2a2a] hover:shadow-md transition"
              >
                <div
                  class="text-[13px] sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Spot Price
                </div>
                <div
                  class="text-base sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  ${{ formatNumber(coinData.coin_rate) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Allocation -->
          <div class="bg-white dark:bg-[#202020] p-6 rounded-xl shadow-sm">
            <h3 class="text-lg font-semibold mb-4">Allocation</h3>

            <!-- Pie Chart Visualization -->
            <div class="relative w-32 h-32 mx-auto mb-4">
              <svg width="128" height="128" viewBox="0 0 42 42" class="donut">
                <!-- Available Balance -->
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#10B981"
                  stroke-width="3"
                  :stroke-dasharray="`${availablePercentage} ${
                    100 - availablePercentage
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
                  :stroke-dasharray="`${onOrderPercentage} ${
                    100 - onOrderPercentage
                  }`"
                  :stroke-dashoffset="25 - availablePercentage"
                />
                <!-- Staked Balance -->
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#8B5CF6"
                  stroke-width="3"
                  :stroke-dasharray="`${stakedPercentage} ${
                    100 - stakedPercentage
                  }`"
                  :stroke-dashoffset="
                    25 - (availablePercentage + onOrderPercentage)
                  "
                />
              </svg>
            </div>

            <div class="space-y-2">
              <div
                class="flex justify-between text-sm text-gray-700 dark:text-gray-300"
              >
                <span class="flex items-center">
                  <div class="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  Available
                </span>
                <span>{{ availablePercentage.toFixed(1) }}%</span>
              </div>
              <div
                class="flex justify-between text-sm text-gray-700 dark:text-gray-300"
              >
                <span class="flex items-center">
                  <div class="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  On Order
                </span>
                <span>{{ onOrderPercentage.toFixed(1) }}%</span>
              </div>
              <div
                class="flex justify-between text-sm text-gray-700 dark:text-gray-300"
              >
                <span class="flex items-center">
                  <div class="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                  Staked
                </span>
                <span>{{ stakedPercentage.toFixed(1) }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- TABS -->
        <div class="mt-10">
          <div
            class="flex gap-6 border-b border-gray-300 dark:border-[#303030] pb-2 mb-6"
          >
            <button
              v-for="tab in ['history', 'about']"
              :key="tab"
              @click="activeTab = tab"
              :class="[
                'text-sm font-medium pb-2',
                activeTab === tab
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400',
              ]"
            >
              {{ tab === "history" ? "Recent History" : "About Coin" }}
            </button>
          </div>

          <template v-if="activeTab === 'history'">
            <!-- Search -->
            <div class="relative mb-4 max-w-md">
              <input
                type="text"
                placeholder="Search transaction type..."
                class="w-full border border-gray-300 dark:border-[#303030] px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-[#202020] dark:text-gray-100"
                v-model="searchTerm"
              />
              <Icon
                name="lucide:search"
                class="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
              />
            </div>

            <!-- Transactions -->
            <div class="bg-white dark:bg-[#202020] p-6 rounded-xl shadow-sm">
              <h3
                class="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100"
              >
                Recent Transactions
              </h3>
              <p
                v-if="filteredTransactions.length === 0"
                class="text-sm text-gray-500 dark:text-gray-400"
              >
                No transactions found.
              </p>
              <div v-else class="space-y-3">
                <div
                  v-for="transaction in filteredTransactions"
                  :key="transaction.id"
                  class="flex items-center justify-between p-3 border border-gray-200 dark:border-[#303030] rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center"
                    >
                      <Icon
                        :name="getTransactionIcon(transaction.type)"
                        class="w-4 h-4"
                      />
                    </div>
                    <div>
                      <div class="font-medium capitalize">
                        {{ transaction.type }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ formatDate(transaction.createdAt) }}
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div
                      :class="[
                        'font-medium',
                        transaction.amount >= 0
                          ? 'text-green-600'
                          : 'text-red-600',
                      ]"
                    >
                      {{ transaction.amount >= 0 ? "+" : ""
                      }}{{ formatNumber(transaction.amount) }}
                      {{ coinData.coin_name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ transaction.status }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="bg-white dark:bg-[#202020] p-6 rounded-xl shadow-sm">
              <h3
                class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100"
              >
                About {{ coinData.coin_name }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ coinData.deposit_instructions }}
              </p>
            </div>
          </template>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-20">
        <Icon
          name="lucide:alert-circle"
          class="w-16 h-16 text-red-500 mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">Error Loading Portfolio</h2>
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
const coinData = ref(null);
const loading = ref(true);
const error = ref("");
const activeTab = ref("history");
const searchTerm = ref("");

// Computed percentages for pie chart
const availablePercentage = computed(() => {
  if (!coinData.value || coinData.value.total_balance === 0) return 0;
  return (
    (coinData.value.available_balance / coinData.value.total_balance) * 100
  );
});

const onOrderPercentage = computed(() => {
  if (!coinData.value || coinData.value.total_balance === 0) return 0;
  return (coinData.value.on_order_balance / coinData.value.total_balance) * 100;
});

const stakedPercentage = computed(() => {
  if (!coinData.value || coinData.value.total_balance === 0) return 0;
  return (coinData.value.staked_balance / coinData.value.total_balance) * 100;
});

// Mock transactions data (replace with API call)
const transactions = ref([
  {
    id: 1,
    type: "deposit",
    amount: 0.5,
    status: "Completed",
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 2,
    type: "stake",
    amount: -0.2,
    status: "Processing",
    createdAt: new Date(Date.now() - 172800000),
  },
  {
    id: 3,
    type: "trade",
    amount: 0.1,
    status: "Completed",
    createdAt: new Date(Date.now() - 259200000),
  },
]);

const filteredTransactions = computed(() => {
  if (!searchTerm.value) return transactions.value;
  return transactions.value.filter(
    (t) =>
      t.type.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      t.status.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// Format numbers
const formatNumber = (num, precision = 2) => {
  if (num === 0) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  if (num < 1000) return num.toFixed(precision);
  return num.toLocaleString("en-US", { maximumFractionDigits: precision });
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Get transaction icon
const getTransactionIcon = (type) => {
  const icons = {
    deposit: "lucide:download",
    withdraw: "lucide:upload",
    stake: "lucide:lock",
    trade: "lucide:arrow-up-down",
    convert: "lucide:refresh-cw",
  };
  return icons[type] || "lucide:circle";
};

// Navigate back
const goBack = () => {
  router.push("/dashboard");
};

// Fetch coin details from API
const fetchCoinDetails = async () => {
  loading.value = true;
  error.value = "";

  try {
    // Add 800ms delay to show skeleton
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = await $fetch(
      `${config.public.apiBase}/user/portfolio.php?coin_id=${coinId}`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      coinData.value = response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    error.value =
      err?.data?.message || err?.message || "Failed to load portfolio details";
    coinData.value = null;
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
  animation: donut-fill 1.5s ease-out;
}

@keyframes donut-fill {
  from {
    stroke-dasharray: 0 100;
  }
}
</style>
