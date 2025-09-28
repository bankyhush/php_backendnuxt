<template>
  <div
    class="bg-white dark:bg-[#171717] bg-opacity-50 flex items-center justify-center p-4 mt-14 mb-20"
  >
    <div
      class="bg-white dark:bg-[#202020] rounded-2xl p-6 w-full max-w-xl mx-auto shadow-xl"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          Currency Swap
        </h2>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading" class="animate-pulse">
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
          <div class="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="flex justify-center">
            <div
              class="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"
            ></div>
          </div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
          <div class="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-4">
        <Icon
          name="lucide:alert-circle"
          class="w-8 h-8 text-red-500 mx-auto mb-2"
        />
        <p class="text-red-600 dark:text-red-400 text-sm">
          Please try refreshing the page, or come back later. If the problem
          persists, contact our support team.
        </p>
        <button
          @click="fetchUserCoins"
          class="mt-2 text-blue-600 dark:text-blue-400 text-sm hover:underline"
        >
          Try Again
        </button>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- From Section -->
        <div class="mb-4">
          <label
            class="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300"
            >From</label
          >
          <div
            class="bg-gray-50 dark:bg-[#303030] rounded-xl p-4 border border-gray-200 dark:border-[#100f0f]"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <!-- Coin Icon -->
                <div
                  v-if="sourceCoin?.photo"
                  class="w-8 h-8 rounded-full overflow-hidden"
                >
                  <img
                    :src="sourceCoin.photo"
                    :alt="sourceCoin.coin_name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  {{ sourceCoin?.coin_name?.charAt(0) || "?" }}
                </div>

                <!-- Source Coin Select -->
                <div class="relative flex items-center">
                  <select
                    v-model="sourceCoinId"
                    @change="onSourceCoinChange"
                    class="appearance-none pl-3 pr-8 py-1 px-5 rounded-lg bg-white dark:bg-[#202020] text-gray-900 dark:text-gray-100 text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-32"
                  >
                    <option value="">Select Coin</option>
                    <option
                      v-for="coin in userCoins"
                      :key="coin.coin_id"
                      :value="coin.coin_id"
                      :disabled="coin.coin_id === targetCoinId"
                    >
                      {{ coin.coin_name }} ({{
                        formatNumber(coin.available_balance)
                      }})
                    </option>
                  </select>
                  <!-- Custom Arrow -->
                  <div
                    class="pointer-events-none absolute right-2 top-1.5 text-gray-400 dark:text-gray-300"
                  >
                    ▼
                  </div>
                </div>
              </div>

              <!-- Input amount -->
              <div class="text-right flex-1 ml-4">
                <input
                  type="number"
                  v-model="swapAmount"
                  :placeholder="`0.00 ${sourceCoin?.coin_name || ''}`"
                  :max="sourceCoin?.available_balance || 0"
                  step="0.000001"
                  min="0"
                  @input="calculateTargetAmount"
                  class="bg-transparent text-right text-lg font-semibold w-full outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                />
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Available:
                  {{ formatNumber(sourceCoin?.available_balance || 0) }}
                  {{ sourceCoin?.coin_name || "" }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Swap Icon -->
        <div class="flex justify-center mb-4">
          <button
            @click="swapCoins"
            class="bg-gray-100 dark:bg-[#171717] rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-[#252525] transition-colors"
            :disabled="!sourceCoinId || !targetCoinId"
          >
            <svg
              class="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>

        <!-- To Section -->
        <div class="mb-6">
          <label
            class="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-200"
            >To</label
          >
          <div
            class="bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 rounded-xl p-4 border-1 border-blue-400"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <!-- Coin Icon -->
                <div
                  v-if="targetCoin?.photo"
                  class="w-8 h-8 rounded-full overflow-hidden"
                >
                  <img
                    :src="targetCoin.photo"
                    :alt="targetCoin.coin_name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div
                  v-else
                  class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  {{ targetCoin?.coin_name?.charAt(0) || "?" }}
                </div>

                <!-- Target Coin Select -->
                <div class="text-gray-900 dark:text-white text-sm font-medium">
                  <div class="relative flex items-center">
                    <select
                      v-model="targetCoinId"
                      @change="onTargetCoinChange"
                      class="appearance-none pl-3 pr-8 py-1 px-5 rounded-lg bg-white dark:bg-[#202020] text-gray-900 dark:text-gray-100 text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-32"
                    >
                      <option value="">Select Coin</option>
                      <option
                        v-for="coin in allCoins"
                        :key="coin.coin_id"
                        :value="coin.coin_id"
                        :disabled="coin.coin_id === sourceCoinId"
                      >
                        {{ coin.coin_name }}
                      </option>
                    </select>
                    <!-- Custom Arrow -->
                    <div
                      class="pointer-events-none absolute right-2 top-1.5 text-gray-400 dark:text-gray-300"
                    >
                      ▼
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-right flex-1 ml-4">
                <div
                  class="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  {{ formatNumber(calculatedTargetAmount) }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  (~${{ formatNumber(calculatedUsdValue) }})
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Price Details -->
        <div v-if="sourceCoin && targetCoin" class="space-y-3 mb-6">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Price</span>
            <div class="text-right">
              <span class="text-sm font-medium text-gray-900 dark:text-white"
                >1 {{ sourceCoin.coin_name }} =
                {{ formatNumber(exchangeRate) }}
                {{ targetCoin.coin_name }}</span
              >
              <span class="text-sm text-gray-500 dark:text-gray-400 ml-1"
                >(~${{ formatNumber(sourceCoin.coin_rate) }})</span
              >
            </div>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400"
              >Minimum received</span
            >
            <div class="text-right">
              <span class="text-sm font-medium text-gray-900 dark:text-white"
                >{{ formatNumber(calculatedTargetAmount * 0.99) }}
                {{ targetCoin.coin_name }}</span
              >
              <span class="text-sm text-gray-500 dark:text-gray-400 ml-1"
                >(~${{ formatNumber(calculatedUsdValue * 0.99) }})</span
              >
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="submitError"
          class="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm"
        >
          {{ submitError }}
        </div>

        <!-- Success Message -->
        <div
          v-if="submitSuccess"
          class="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm"
        >
          Swap completed successfully!
        </div>

        <!-- Disclaimer -->
        <p
          v-if="sourceCoin && targetCoin"
          class="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed"
        >
          End price is an estimate. You will receive at least
          {{ formatNumber(calculatedTargetAmount * 0.99) }}
          {{ targetCoin.coin_name }} (~${{
            formatNumber(calculatedUsdValue * 0.99)
          }}) or the transaction will be refunded.
        </p>

        <!-- Convert Button -->
        <button
          @click="handleSwap"
          :disabled="!isFormValid || isLoading"
          :class="[
            'cursor-pointer w-full font-medium py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-2',
            isFormValid && !isLoading
              ? 'bg-black hover:bg-zinc-700 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white transform hover:scale-[1.02]'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed',
          ]"
        >
          <Icon
            v-if="isLoading"
            name="lucide:loader-2"
            class="animate-spin w-5 h-5"
          />
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          <span>{{ isLoading ? "Processing..." : "Convert" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

const user = inject("authUser");
const config = useRuntimeConfig();

// Reactive data
const userCoins = ref([]); // User's coins (including zero balances)
const allCoins = ref([]); // All available coins for target selection
const sourceCoinId = ref("");
const targetCoinId = ref("");
const swapAmount = ref("");
const sourceCoin = ref(null);
const targetCoin = ref(null);
const loading = ref(true);
const error = ref("");
const isLoading = ref(false);
const submitError = ref("");
const submitSuccess = ref(false);

// Computed properties
const calculatedTargetAmount = computed(() => {
  if (!sourceCoin.value || !targetCoin.value || !swapAmount.value) return 0;

  const sourceUsdValue =
    parseFloat(swapAmount.value) * parseFloat(sourceCoin.value.coin_rate);
  return sourceUsdValue / parseFloat(targetCoin.value.coin_rate);
});

const calculatedUsdValue = computed(() => {
  if (!sourceCoin.value || !swapAmount.value) return 0;
  return parseFloat(swapAmount.value) * parseFloat(sourceCoin.value.coin_rate);
});

const exchangeRate = computed(() => {
  if (!sourceCoin.value || !targetCoin.value) return 0;
  return (
    parseFloat(targetCoin.value.coin_rate) /
    parseFloat(sourceCoin.value.coin_rate)
  );
});

const isFormValid = computed(() => {
  return (
    sourceCoinId.value &&
    targetCoinId.value &&
    swapAmount.value &&
    parseFloat(swapAmount.value) > 0 &&
    sourceCoin.value &&
    parseFloat(swapAmount.value) <=
      parseFloat(sourceCoin.value.available_balance)
  );
});

// Format numbers
const formatNumber = (num, precision = 6) => {
  if (!num || isNaN(num)) return "0." + "0".repeat(precision);
  if (num === 0) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  return num.toFixed(2);
};

// Fetch user's coins with balances
const fetchUserCoins = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/allcoins.php`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      if (Array.isArray(response.data)) {
        // ✅ Show all coins (even with 0 balance)
        userCoins.value = response.data.filter((coin) => coin && coin.coin_id);
      } else if (response.data && response.data.coin_id) {
        userCoins.value = [response.data];
      } else {
        userCoins.value = [];
      }

      // Fallback to all coins if empty
      if (userCoins.value.length === 0) {
        await fetchAllCoins();
      } else {
        allCoins.value = [...userCoins.value];
      }

      // ✅ Optional: auto-select first coin
      if (userCoins.value.length > 0) {
        sourceCoinId.value = userCoins.value[0].coin_id;
        onSourceCoinChange();
      }
    } else {
      throw new Error(response.message || "Failed to load portfolio");
    }
  } catch (err) {
    error.value = err?.data?.message || err?.message || "Failed to load coins";
    console.error("Error fetching user coins:", err);

    // Try to fetch all coins as fallback
    await fetchAllCoins();
  } finally {
    loading.value = false;
  }
};

// Fetch all available coins (fallback)
const fetchAllCoins = async () => {
  try {
    const response = await $fetch(`${config.public.apiBase}/allcoins.php`, {
      credentials: "include",
    });

    if (response.success && Array.isArray(response.data)) {
      allCoins.value = response.data.filter(
        (coin) => coin && coin.coin_id && coin.coin_visible === "true"
      );
      userCoins.value = allCoins.value;
    }
  } catch (err) {
    console.error("Error fetching all coins:", err);
    error.value = "Unable to load coins data";
  }
};

// Calculate target amount when inputs change
const calculateTargetAmount = () => {
  // Calculation handled by computed properties
};

// Swap source and target coins
const swapCoins = () => {
  const temp = sourceCoinId.value;
  sourceCoinId.value = targetCoinId.value;
  targetCoinId.value = temp;

  onSourceCoinChange();
  onTargetCoinChange();
};

// Handle source coin change
const onSourceCoinChange = () => {
  sourceCoin.value = userCoins.value.find(
    (coin) => coin.coin_id == sourceCoinId.value
  );
  swapAmount.value = "";
};

// Handle target coin change
const onTargetCoinChange = () => {
  targetCoin.value = allCoins.value.find(
    (coin) => coin.coin_id == targetCoinId.value
  );
};

// Handle swap submission
const handleSwap = async () => {
  if (!isFormValid.value) return;

  isLoading.value = true;
  submitError.value = "";
  submitSuccess.value = false;

  try {
    const response = await $fetch(`${config.public.apiBase}/user/swap.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_coin: parseInt(sourceCoinId.value),
        target_coin: parseInt(targetCoinId.value),
        swap_amount: parseFloat(swapAmount.value),
      }),
      credentials: "include",
    });

    if (response.success) {
      submitSuccess.value = true;

      // Reset form
      swapAmount.value = "";
      sourceCoinId.value = "";
      targetCoinId.value = "";
      sourceCoin.value = null;
      targetCoin.value = null;

      // Refresh data
      await fetchUserCoins();

      // Hide success after 5s
      setTimeout(() => {
        submitSuccess.value = false;
      }, 5000);
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    submitError.value =
      err?.data?.message || err?.message || "Failed to process swap";
    console.error("Swap error:", err);
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchUserCoins();
});
</script>
