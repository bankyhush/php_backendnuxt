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
          <h2 class="text-xl font-semibold mb-2">Error Loading Deposit Page</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">{{ error }}</p>
          <button
            @click="fetchCoinData"
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
            <div class="space-y-6">
              <!-- Coin (disabled select mimic) -->
              <div>
                <label class="block mb-2">Selected Coin</label>
                <div
                  class="flex items-center space-x-3 bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-md p-3 text-sm cursor-not-allowed"
                >
                  <img
                    v-if="coinData?.photo"
                    :src="coinData.photo"
                    :alt="coinData.coin_name"
                    class="w-6 h-6 rounded-full object-contain"
                  />
                  <div
                    v-else
                    class="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs"
                  >
                    {{ coinData?.coin_name?.charAt(0) || "?" }}
                  </div>
                  <span class="font-medium">{{ coinData?.coin_name }}</span>
                  <span class="text-gray-500"
                    >({{ coinData?.coin_title }})</span
                  >
                </div>
              </div>

              <!-- Network -->
              <div>
                <label class="block mb-2">Select Network</label>
                <select
                  class="w-full bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] rounded-md p-3 text-sm"
                >
                  <option :value="coinData?.coin_name">
                    {{ coinData?.coin_name }} Network
                  </option>
                </select>
                <p class="text-sm text-gray-500 mt-2">
                  Make sure the network you choose for the deposit matches the
                  withdrawal network or your assets may be lost.
                </p>
              </div>

              <!-- Wallet Address -->
              <div>
                <label class="block mb-2">Deposit Address</label>
                <div class="flex">
                  <input
                    type="text"
                    :value="
                      coinData?.deposit_address ||
                      'Please contact support for wallet address'
                    "
                    readonly
                    class="w-full bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] rounded-l-md p-3 text-sm"
                  />
                  <div class="flex">
                    <button
                      @click="handleCopyAddress"
                      class="cursor-pointer bg-white dark:bg-[#0a0a0a] border border-l-0 border-gray-300 dark:border-[#333] p-3 relative"
                    >
                      <Icon
                        v-if="copySuccess"
                        name="lucide:check"
                        class="w-5 h-5 text-green-500"
                      />
                      <Icon
                        v-else
                        name="lucide:copy"
                        class="w-5 h-5 text-gray-400"
                      />

                      <div
                        v-if="copySuccess"
                        class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap"
                      >
                        Copied!
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Confirmation Info -->
              <div class="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div>
                  <label class="block mb-2">Expected Arrival</label>
                  <p class="text-sm">1 network confirmation</p>
                </div>
                <div>
                  <label class="block mb-2">Coin</label>
                  <p class="text-sm">Only send {{ coinData?.coin_name }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-2 gap-6">
                <div>
                  <label class="block mb-2">Minimum Deposit</label>
                  <p class="text-sm">
                    {{ coinData?.with_min || "No minimum" }}
                  </p>
                </div>

                <div>
                  <label class="block mb-2">Maximum Deposit</label>
                  <p class="text-sm">
                    {{ coinData?.with_max || "No maximum" }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Payment section -->
            <div class="mt-6 mb-6">
              <div class="bg-gray-200 dark:bg-[#202020] rounded-lg p-6">
                <h2 class="text-lg font-semibold mb-4">Verify Payment</h2>

                <!-- Success Message -->
                <div
                  v-if="submitSuccess"
                  class="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md"
                >
                  Payment verification submitted successfully! Our team will
                  review it shortly.
                </div>

                <p v-if="submitError" class="text-red-600 text-sm mb-4">
                  {{ submitError }}
                </p>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                  <div>
                    <label class="block mb-2 text-sm">Amount (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      v-model="amount"
                      class="w-full bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] rounded-md p-3 text-sm"
                      placeholder="Enter amount in USD"
                      required
                      min="0.01"
                    />
                  </div>

                  <div>
                    <label class="block mb-2 text-sm">Upload Photo Proof</label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      @change="handlePhotoUpload"
                      class="w-full bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#333] rounded-md p-3 text-sm"
                      required
                    />
                    <p class="text-xs text-gray-500 mt-1">
                      Upload screenshot of transaction confirmation (JPG, PNG,
                      PDF)
                    </p>
                  </div>

                  <button
                    type="submit"
                    :disabled="submitLoading"
                    class="cursor-pointer w-full bg-black dark:bg-white dark:text-black text-white rounded-md py-3 flex items-center justify-center hover:bg-zinc-800 dark:hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Icon
                      v-if="submitLoading"
                      name="lucide:loader-2"
                      class="animate-spin w-5 h-5 mr-2"
                    />
                    <Icon v-else name="lucide:upload" class="mr-2" />
                    {{ submitLoading ? "Submitting..." : "Verify Payment" }}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Help Section -->
          <div class="bg-gray-100 dark:bg-background/50 rounded-lg p-6">
            <h2 class="text-sm font-medium border-b pb-4 mb-4">
              Facing Deposit Issues?
            </h2>
            <ul
              class="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <li>
                Ensure the selected network matches your sending platform.
              </li>
              <li>Double check the wallet address before sending.</li>
              <li>Reach out to support if funds don't arrive in 1 hour.</li>
              <li>Keep your transaction hash for verification.</li>
              <li>
                Minimum deposit: {{ coinData?.with_min || "None specified" }}
              </li>
              <li>
                Maximum deposit:
                {{ coinData?.with_max || "None specified" }}
              </li>
            </ul>

            <!-- Current Balance -->
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

// Get coin ID from route parameters
const coinId = route.params.id;

// Reactive data
const coinData = ref(null);
const loading = ref(true);
const error = ref("");
const copySuccess = ref(false);
const amount = ref("");
const photoFile = ref(null);
const submitLoading = ref(false);
const submitError = ref("");
const submitSuccess = ref(false);

// Format numbers
const formatNumber = (num, precision = 2) => {
  if (num === 0) return "0." + "0".repeat(precision);
  if (num < 0.000001) return num.toExponential(4);
  if (num < 0.001) return num.toFixed(6);
  if (num < 1) return num.toFixed(precision);
  if (num < 1000) return num.toFixed(precision);
  return num.toLocaleString("en-US", { maximumFractionDigits: precision });
};

// Copy address to clipboard
const handleCopyAddress = () => {
  const address =
    coinData.value?.deposit_address ||
    "Please contact support for wallet address";
  navigator.clipboard.writeText(address);
  copySuccess.value = true;
  setTimeout(() => (copySuccess.value = false), 2000);
};

// Handle photo upload
const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      submitError.value = "File size must be less than 5MB";
      event.target.value = "";
      return;
    }
    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    if (!validTypes.includes(file.type)) {
      submitError.value = "Please upload JPG, PNG, GIF, or PDF files only";
      event.target.value = "";
      return;
    }
    photoFile.value = file;
    submitError.value = "";
  }
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
      err?.data?.message || err?.message || "Failed to load coin data";
    coinData.value = null;

    navigateTo("/dashboard");
  } finally {
    loading.value = false;
  }
};

// Handle form submission
const handleSubmit = async () => {
  submitLoading.value = true;
  submitError.value = "";
  submitSuccess.value = false;

  try {
    // Validate amount
    if (!amount.value || parseFloat(amount.value) <= 0) {
      throw new Error("Please enter a valid amount");
    }

    if (!photoFile.value) {
      throw new Error("Please upload proof photo");
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("coin_id", coinId);
    formData.append("amount", amount.value);
    formData.append("photo_proof", photoFile.value);

    const response = await $fetch(
      `${config.public.apiBase}/user/verify-payment.php`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (response.success) {
      submitSuccess.value = true;
      // Reset form
      amount.value = "";
      photoFile.value = null;
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      // Hide success message after 5 seconds
      setTimeout(() => {
        submitSuccess.value = false;
      }, 5000);
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    submitError.value =
      err?.data?.message ||
      err?.message ||
      "Failed to submit payment verification";
  } finally {
    submitLoading.value = false;
  }
};

// Fetch data when component mounts
onMounted(() => {
  fetchCoinData();
});
</script>
