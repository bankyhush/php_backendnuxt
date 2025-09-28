<template>
  <div>
    <div
      class="min-h-screen mb-20 p-4 md:p-8 bg-white dark:bg-[#171717] text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Loading Skeleton -->
        <div v-if="loading" class="animate-pulse">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div
              class="lg:col-span-2 bg-gray-100 dark:bg-background/50 rounded-lg p-6 space-y-6"
            >
              <div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"
                ></div>
                <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"
                ></div>
                <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div>
                <div
                  class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"
                ></div>
                <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
            <div class="bg-gray-100 dark:bg-background/50 rounded-lg p-6">
              <div
                class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"
              ></div>
              <div class="space-y-2">
                <div
                  class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"
                ></div>
                <div
                  class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"
                ></div>
                <div
                  class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"
                ></div>
              </div>
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
            Error Loading Transfer Page
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Server down, try again
          </p>
          <button
            @click="fetchUserCoins"
            class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        </div>

        <!-- Content -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Section -->
          <div
            class="lg:col-span-2 bg-gray-100 dark:bg-background/50 rounded-lg p-6"
          >
            <form @submit.prevent="handleTransfer">
              <div class="space-y-6">
                <!-- Coin Selection -->
                <div>
                  <label class="block mb-2 text-sm font-medium"
                    >Select Coin</label
                  >
                  <div class="flex items-center space-x-3">
                    <div
                      v-if="selectedCoin?.photo"
                      class="w-8 h-8 rounded-full overflow-hidden"
                    >
                      <img
                        :src="selectedCoin.photo"
                        :alt="selectedCoin.coin_name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      v-else
                      class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    >
                      {{ selectedCoin?.coin_name?.charAt(0) || "?" }}
                    </div>
                    <select
                      v-model="selectedCoinId"
                      @change="onCoinChange"
                      class="flex-1 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-md p-3 text-sm"
                      required
                    >
                      <option value="">Select a coin</option>
                      <option
                        v-for="coin in userCoins"
                        :key="coin.coin_id"
                        :value="coin.coin_id"
                        :disabled="coin.available_balance <= 0"
                      >
                        {{ coin.coin_name }} (Available:
                        {{ formatNumber(coin.available_balance) }})
                      </option>
                    </select>
                  </div>
                  <p class="text-sm text-gray-500 mt-2" v-if="selectedCoin">
                    Available Balance:
                    {{ formatNumber(selectedCoin.available_balance) }}
                    {{ selectedCoin.coin_name }}
                  </p>
                </div>

                <!-- Amount -->
                <div>
                  <label class="block mb-2 text-sm font-medium"
                    >Amount ($)</label
                  >
                  <input
                    type="number"
                    v-model="transferAmount"
                    :placeholder="`0.00`"
                    :max="selectedCoin?.available_balance || 0"
                    step="0.000001"
                    min="0"
                    required
                    class="w-full bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] rounded-md p-3 text-sm"
                  />
                  <p class="text-sm text-gray-500 mt-2">
                    Enter the amount you want to transfer
                  </p>
                </div>

                <!-- Wallet Address -->
                <div>
                  <label class="block mb-2 text-sm font-medium"
                    >Recipient Wallet Address</label
                  >
                  <div class="flex">
                    <input
                      type="text"
                      v-model="recipientAddress"
                      placeholder="Enter valid recipient wallet address"
                      required
                      class="w-full bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] rounded-md p-3 text-sm"
                    />
                  </div>
                  <p class="text-sm text-gray-500 mt-2">
                    Enter the recipient's wallet address
                  </p>
                </div>

                <!-- Transfer Details -->
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                >
                  <div>
                    <label
                      class="block mb-2 text-sm font-medium text-blue-700 dark:text-blue-300"
                      >Transfer Type</label
                    >
                    <p class="text-sm">Internal Transfer</p>
                  </div>
                  <div>
                    <label
                      class="block mb-2 text-sm font-medium text-blue-700 dark:text-blue-300"
                      >Status</label
                    >
                    <p class="text-sm">Instant</p>
                  </div>
                </div>

                <!-- Error Message -->
                <div
                  v-if="submitError"
                  class="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm"
                >
                  {{ submitError }}
                </div>

                <!-- Success Message -->
                <div
                  v-if="submitSuccess"
                  class="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm"
                >
                  Transfer completed successfully!
                </div>
              </div>

              <!-- Transfer Button -->
              <div class="mt-6">
                <div class="bg-gray-200 dark:bg-[#202020] rounded-lg p-6">
                  <button
                    type="submit"
                    :disabled="!isFormValid || isLoading"
                    :class="[
                      'cursor-pointer w-full rounded-md py-3 flex items-center justify-center transition-colors font-medium',
                      isFormValid && !isLoading
                        ? 'bg-black dark:bg-white dark:text-black text-white hover:bg-zinc-800 dark:hover:bg-gray-100'
                        : 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed',
                    ]"
                  >
                    <Icon
                      v-if="isLoading"
                      name="lucide:loader-2"
                      class="animate-spin w-5 h-5 mr-2"
                    />
                    <Icon v-else name="lucide:send" class="w-5 h-5 mr-2" />
                    {{ isLoading ? "Processing..." : "Transfer Funds" }}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Help Section -->
          <div class="bg-gray-100 dark:bg-background/50 rounded-lg p-6">
            <h2 class="text-lg font-semibold border-b pb-4 mb-4">
              Transfer Information
            </h2>
            <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li class="flex items-start">
                <Icon
                  name="lucide:info"
                  class="w-4 h-4 mr-2 mt-0.5 text-blue-500"
                />
                <span>Transfers are instant and free</span>
              </li>
              <li class="flex items-start">
                <Icon
                  name="lucide:shield"
                  class="w-4 h-4 mr-2 mt-0.5 text-green-500"
                />
                <span>Double-check the recipient address</span>
              </li>
              <li class="flex items-start">
                <Icon
                  name="lucide:clock"
                  class="w-4 h-4 mr-2 mt-0.5 text-orange-500"
                />
                <span>Transfers cannot be reversed</span>
              </li>
              <li class="flex items-start">
                <Icon
                  name="lucide:user-check"
                  class="w-4 h-4 mr-2 mt-0.5 text-purple-500"
                />
                <span>Ensure recipient uses same platform</span>
              </li>
            </ul>

            <!-- Current Balance Summary -->
            <div class="mt-6 p-4 bg-white dark:bg-[#1a1a1a] rounded-lg">
              <h3 class="text-sm font-medium mb-3">Your Balances</h3>
              <div class="space-y-2 max-h-60 overflow-y-auto">
                <div
                  v-for="coin in userCoins.filter(
                    (c) => c.available_balance > 0
                  )"
                  :key="coin.coin_id"
                  class="flex justify-between items-center text-xs p-2 hover:bg-gray-50 dark:hover:bg-[#252525] rounded"
                >
                  <div class="flex items-center space-x-2">
                    <div
                      v-if="coin.photo"
                      class="w-6 h-6 rounded-full overflow-hidden"
                    >
                      <img
                        :src="coin.photo"
                        :alt="coin.coin_name"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <span class="font-medium">{{ coin.coin_name }}</span>
                  </div>
                  <span class="text-gray-600 dark:text-gray-400">
                    {{ formatNumber(coin.available_balance) }}
                  </span>
                </div>
                <div
                  v-if="
                    userCoins.filter((c) => c.available_balance > 0).length ===
                    0
                  "
                  class="text-center text-gray-500 text-xs py-4"
                >
                  No available balances
                </div>
              </div>
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

// Reactive data
const userCoins = ref([]);
const selectedCoinId = ref("");
const selectedCoin = ref(null);
const transferAmount = ref("");
const recipientAddress = ref("");
const loading = ref(true);
const error = ref("");
const isLoading = ref(false);
const submitError = ref("");
const submitSuccess = ref(false);
const successData = ref(null);

// Computed properties
const isFormValid = computed(() => {
  return (
    selectedCoinId.value &&
    transferAmount.value &&
    parseFloat(transferAmount.value) > 0 &&
    selectedCoin.value &&
    parseFloat(transferAmount.value) <=
      parseFloat(selectedCoin.value.available_balance) &&
    recipientAddress.value.trim().length > 0
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

    if (response.success && Array.isArray(response.data)) {
      userCoins.value = response.data.filter((coin) => coin && coin.coin_id);
    } else {
      throw new Error(response.message || "Failed to load coins");
    }
  } catch (err) {
    error.value =
      err?.data?.message || err?.message || "Failed to load coins data";
    console.error("Error fetching user coins:", err);
  } finally {
    loading.value = false;
  }
};

// Handle coin selection change
const onCoinChange = () => {
  selectedCoin.value = userCoins.value.find(
    (coin) => coin.coin_id == selectedCoinId.value
  );
  transferAmount.value = "";
};

// Handle transfer submission
const handleTransfer = async () => {
  if (!isFormValid.value) return;

  isLoading.value = true;
  submitError.value = "";
  submitSuccess.value = false;
  successData.value = null;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/transfercoin.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coin_id: parseInt(selectedCoinId.value),
          amount: parseFloat(transferAmount.value),
          wallet_address: recipientAddress.value.trim(),
        }),
        credentials: "include",
      }
    );

    if (response.success) {
      submitSuccess.value = true;
      successData.value = response.data;

      // Reset form
      transferAmount.value = "";
      recipientAddress.value = "";
      selectedCoinId.value = "";
      selectedCoin.value = null;

      // Refresh coin data
      await fetchUserCoins();

      // Hide success message after 5 seconds
      setTimeout(() => {
        submitSuccess.value = false;
      }, 5000);
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    submitError.value =
      err?.data?.message || err?.message || "Failed to process transfer";
    console.error("Transfer error:", err);
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchUserCoins();
});
</script>
