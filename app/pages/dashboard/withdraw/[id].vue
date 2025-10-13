<template>
  <div
    class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-background/50 dark:text-gray-50 mb-14"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Loading Skeleton -->
      <div v-if="loading" class="animate-pulse">
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
        <div class="flex flex-col lg:flex-row gap-8">
          <div
            class="flex-1 rounded-xl shadow-lg p-8 space-y-8 bg-white dark:bg-gray-900"
          >
            <div v-for="n in 4" :key="n" class="space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          </div>
          <div
            class="w-full lg:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
          >
            <div
              class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"
            ></div>
            <div
              v-for="n in 4"
              :key="n"
              class="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"
            ></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <Icon
          name="lucide:alert-circle"
          class="w-16 h-16 text-red-500 mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">
          Error Loading Withdrawal Page
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Please try refreshing the page, or come back later. If the problem
          persists, contact our support team.
        </p>
        <button
          @click="fetchCoinData"
          class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Try Again
        </button>
      </div>

      <!-- Content -->
      <div v-else>
        <h1 class="text-3xl font-bold mb-6">Withdraw Funds</h1>

        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Left Column: Form -->
            <div
              class="flex-1 rounded-xl shadow-lg p-6 lg:p-8 space-y-8 dark:bg-[#202020] dark:text-gray-50"
            >
              <!-- Step 1 -->
              <div>
                <h2 class="text-lg font-medium mb-2">Select Cryptocurrency</h2>
                <div
                  class="flex items-center space-x-3 bg-gray-100 dark:bg-[#171717] border border-gray-300 dark:border-[#303030] rounded-lg p-3"
                >
                  <img
                    v-if="coinData?.photo"
                    :src="coinData.photo"
                    :alt="coinData.coin_name"
                    class="w-8 h-8 rounded-full object-contain"
                  />
                  <div
                    v-else
                    class="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold"
                  >
                    {{ coinData?.coin_name?.charAt(0) || "?" }}
                  </div>
                  <div>
                    <div class="font-semibold">{{ coinData?.coin_name }}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      {{ coinData?.coin_title }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div>
                <h2 class="text-lg font-medium mb-2">Set Destination</h2>
                <div
                  class="mb-4 flex space-x-4 border-b border-gray-200 dark:border-[#303030]"
                >
                  <button
                    class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400"
                    disabled
                  >
                    <Icon name="lucide:send" class="w-4 h-4" />
                    On-Chain Withdrawal
                  </button>
                </div>

                <!-- Network -->
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Network
                  </label>
                  <select
                    class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 capitalize dark:bg-[#171717] dark:text-gray-50 dark:border-[#303030]"
                    disabled
                  >
                    <option :value="coinData?.coin_name">
                      {{ coinData?.coin_name }} Network
                    </option>
                  </select>
                </div>

                <!-- Address -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Withdrawal Address
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter destination address"
                    v-model="withdrawalAddress"
                    required
                    class="w-full p-3 rounded-lg border border-gray-300 dark:border-[#303030] focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#171717] dark:text-gray-50"
                  />
                  <p
                    v-if="!withdrawalAddress"
                    class="text-sm text-red-500 mt-1 dark:text-red-400"
                  >
                    Please enter a valid {{ coinData?.coin_name }} address
                  </p>
                </div>
              </div>

              <!-- Step 3: Amount -->
              <div>
                <label
                  class="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Amount to Withdraw ($)
                </label>
                <input
                  type="number"
                  v-model="withdrawalAmount"
                  :min="coinData?.with_min || 0"
                  :max="coinData?.available_balance"
                  step="0.000001"
                  placeholder="0.00"
                  required
                  class="w-full p-3 rounded-lg border border-gray-300 dark:border-[#303030] focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#171717] dark:text-gray-50"
                />
                <div
                  class="flex justify-between text-sm text-gray-500 mt-2 dark:text-gray-400"
                >
                  <span>
                    Available: ${{
                      formatNumber(coinData?.available_balance || 0)
                    }}
                    {{ coinData?.coin_name }}
                  </span>
                </div>
              </div>

              <!-- Error Message -->
              <div
                v-if="submitError"
                class="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg"
              >
                Please try refreshing the page, or come back later. If the
                problem persists, contact our support team.
              </div>

              <!-- Success Message -->
              <div
                v-if="submitSuccess"
                class="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg"
              >
                Withdrawal submitted successfully!
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isLoading || !withdrawalAddress || !withdrawalAmount"
                :class="[
                  'min-h-[40px] whitespace-nowrap cursor-pointer flex items-center justify-center w-48 px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                  isLoading
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200',
                ]"
              >
                <Icon
                  v-if="isLoading"
                  name="lucide:loader-2"
                  class="animate-spin w-5 h-5 mr-2"
                />
                <Icon v-else name="lucide:send" class="w-5 h-5 mr-2" />
                {{ isLoading ? "Processing..." : "Withdraw Funds" }}
              </button>
            </div>

            <!-- Right Column: FAQ -->
            <div class="w-full lg:w-96 space-y-6">
              <div
                class="bg-white rounded-xl shadow-lg p-6 dark:bg-[#171717] dark:text-gray-50"
              >
                <h2 class="text-xl font-bold mb-4">Withdrawal Information</h2>
                <div class="space-y-4 text-sm">
                  <div>
                    <strong class="text-gray-900 dark:text-gray-50"
                      >Current Rate:</strong
                    >
                    <p class="mt-1 text-gray-600 dark:text-gray-400">
                      1 {{ coinData?.coin_name }} = ${{
                        formatNumber(coinData?.coin_rate || 0)
                      }}
                    </p>
                  </div>

                  <div v-if="coinData?.with_instructions">
                    <strong class="text-gray-900 dark:text-gray-50"
                      >Withdrawal Instructions:</strong
                    >
                    <p
                      class="mt-1 text-gray-600 dark:text-gray-400 whitespace-pre-line"
                    >
                      {{ coinData.with_instructions }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="bg-white rounded-xl shadow-lg p-6 dark:bg-[#171717] dark:text-gray-50"
              >
                <h2 class="text-xl font-bold mb-4">FAQ</h2>
                <ul class="space-y-4 text-sm">
                  <li>
                    <strong class="text-gray-900 dark:text-gray-50">
                      How do I make a withdrawal?
                    </strong>
                    <p class="mt-1 text-gray-600 dark:text-gray-400">
                      Select your cryptocurrency, enter a valid network address,
                      specify the amount, and click "Withdraw Funds."
                    </p>
                  </li>
                  <li>
                    <strong class="text-gray-900 dark:text-gray-50">
                      Why have I not received my withdrawal?
                    </strong>
                    <p class="mt-1 text-gray-600 dark:text-gray-400">
                      Delays may occur due to network congestion. Contact
                      support if it exceeds 24 hours.
                    </p>
                  </li>
                  <li>
                    <strong class="text-gray-900 dark:text-gray-50">
                      Can I cancel a withdrawal?
                    </strong>
                    <p class="mt-1 text-gray-600 dark:text-gray-400">
                      No, withdrawals cannot be canceled once processed.
                    </p>
                  </li>
                  <li>
                    <strong class="text-gray-900 dark:text-gray-50">
                      Is there a minimum withdrawal amount?
                    </strong>
                    <p class="mt-1 text-gray-600 dark:text-gray-400">
                      Minimum: {{ coinData?.with_min || "Not specified" }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
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

// Get coin ID from route parameters
const coinId = route.params.id;

// Reactive data
const coinData = ref(null);
const loading = ref(true);
const error = ref("");
const withdrawalAddress = ref("");
const withdrawalAmount = ref("");
const isLoading = ref(false);
const submitError = ref("");
const submitSuccess = ref(false);
const transactionId = ref("");

// Format numbers
const formatNumber = (num, precision = 6) => {
  if (num === 0) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  return num.toFixed(2);
};

// Fetch coin data from API
const fetchCoinData = async () => {
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
      coinData.value = response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    error.value =
      // err?.data?.message || err?.message || "Failed to load coin data";
      navigateTo("/dashboard");
    coinData.value = null;
  } finally {
    loading.value = false;
  }
};

// Handle form submission
const handleSubmit = async () => {
  isLoading.value = true;
  submitError.value = "";
  submitSuccess.value = false;

  try {
    // Validate inputs
    if (!withdrawalAddress.value.trim()) {
      throw new Error("Please enter a valid withdrawal address");
    }

    if (!withdrawalAmount.value || parseFloat(withdrawalAmount.value) <= 0) {
      throw new Error("Please enter a valid withdrawal amount");
    }

    const amount = parseFloat(withdrawalAmount.value);

    // Check minimum withdrawal
    if (
      coinData.value?.with_min &&
      amount < parseFloat(coinData.value.with_min)
    ) {
      throw new Error(
        `Minimum withdrawal amount is ${coinData.value.with_min} ${coinData.value.coin_name}`
      );
    }

    // Check maximum withdrawal
    if (
      coinData.value?.with_max &&
      amount > parseFloat(coinData.value.with_max)
    ) {
      throw new Error(
        `Maximum withdrawal amount is ${coinData.value.with_max} ${coinData.value.coin_name}`
      );
    }

    // Check available balance
    if (amount > coinData.value.available_balance) {
      throw new Error("Insufficient balance for withdrawal");
    }

    // Submit withdrawal
    const response = await $fetch(
      `${config.public.apiBase}/user/withdrawal-payment.php`,
      {
        method: "POST",
        body: {
          coin_id: coinId,
          amount: amount,
          address: withdrawalAddress.value,
        },
        credentials: "include",
      }
    );

    if (response.success) {
      submitSuccess.value = true;
      transactionId.value = response.transaction_id;

      // Reset form
      withdrawalAddress.value = "";
      withdrawalAmount.value = "";

      // Refresh coin data to update balance
      await fetchCoinData();
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    submitError.value =
      err?.data?.message || err?.message || "Failed to process withdrawal";
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchCoinData();
});
</script>
