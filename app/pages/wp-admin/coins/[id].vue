<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const coinId = route.params.id;
const loading = ref(true);
const saving = ref(false);
const message = ref({ type: "", text: "" });

// Form data
const form = ref({
  coin_name: "",
  coin_title: "",
  coin_rate: 0,
  photo: "",
  with_min: "",
  with_max: "",
  with_instructions: "",
  deposit_instructions: "",
  deposit_address: "Please contact support for wallet address",
  percent: "",
  coin_visible: "true",
  type: "",
});

// Common cryptocurrency types
const coinTypes = ["Stocks", "Crypto", "Meme"];

// Fetch coin details
const fetchCoin = async () => {
  loading.value = true;
  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/coin-single.php?id=${coinId}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      const coin = res.coin;
      form.value = {
        coin_name: coin.coin_name,
        coin_title: coin.coin_title,
        coin_rate: coin.coin_rate,
        photo: coin.photo,
        with_min: coin.with_min,
        with_max: coin.with_max,
        with_instructions: coin.with_instructions,
        deposit_instructions: coin.deposit_instructions,
        deposit_address: coin.deposit_address,
        percent: coin.percent,
        coin_visible: coin.coin_visible,
        type: coin.type || "",
      };
    } else {
      message.value = { type: "error", text: "Coin not found" };
    }
  } catch (error) {
    message.value = {
      type: "error",
      text: "Failed to load coin details",
    };
    router.push("/wp-admin/coins");
  }
  loading.value = false;
};

// Update coin
const updateCoin = async () => {
  // Basic form validation
  if (
    !form.value.coin_name ||
    !form.value.coin_title ||
    form.value.coin_rate <= 0
  ) {
    message.value = {
      type: "error",
      text: "Coin name, title, and rate are required",
    };
    return;
  }

  saving.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(`${config.public.apiBase}/admin/coin-update.php`, {
      method: "POST",
      body: JSON.stringify({
        coin_id: parseInt(coinId),
        ...form.value,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      message.value = { type: "success", text: res.message };
      // Redirect back to list after 2 seconds
      setTimeout(() => {
        router.push("/wp-admin/coins");
      }, 2000);
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to update coin" };
  }

  saving.value = false;
};

// Fetch current price from API
const fetchCurrentPrice = async () => {
  if (!form.value.coin_name) {
    message.value = { type: "error", text: "Please enter coin name first" };
    return;
  }

  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/coin-autoprice.php`,
      {
        credentials: "include",
      }
    );

    if (res.success && res.updated) {
      // Refetch the coin data to get updated price
      await fetchCoin();
      message.value = { type: "success", text: "Price updated successfully" };
    } else {
      message.value = { type: "info", text: "Price is already up to date" };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to fetch current price" };
  }
};

// Reset form to original values
const resetForm = () => {
  fetchCoin();
};

// Format currency for display
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount);
};

// Load coin data on component mount
onMounted(() => {
  fetchCoin();
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <NuxtLink
        to="/wp-admin/coins"
        class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4"
      >
        <svg
          class="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Coins
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white">Edit Cryptocurrency</h1>
      <p class="text-gray-400 mt-2">Update coin information and settings</p>
    </div>

    <!-- Message Alert -->
    <div
      v-if="message.text"
      :class="[
        'p-4 rounded-lg mb-6 transition-all duration-300',
        message.type === 'success'
          ? 'bg-green-500/20 border border-green-500 text-green-400'
          : message.type === 'error'
          ? 'bg-red-500/20 border border-red-500 text-red-400'
          : 'bg-blue-500/20 border border-blue-500 text-blue-400',
      ]"
    >
      <div class="flex items-center">
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="message.type === 'success'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {{ message.text }}
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-gray-800 rounded-xl p-8 text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"
      ></div>
      <p class="text-gray-300 text-lg">Loading coin details...</p>
    </div>

    <!-- Main Form -->
    <div
      v-else
      class="bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
    >
      <form @submit.prevent="updateCoin" class="p-6 space-y-8">
        <!-- Coin Preview -->
        <div class="bg-gray-900/30 rounded-lg p-6 border border-gray-700">
          <h3 class="text-lg font-semibold text-white mb-4">Coin Preview</h3>
          <div class="flex items-center gap-4">
            <div v-if="form.photo" class="h-16 w-16 flex-shrink-0">
              <img
                class="h-16 w-16 rounded-full object-cover"
                :src="form.photo"
                :alt="form.coin_name"
                @error="(e) => (e.target.style.display = 'none')"
              />
            </div>
            <div
              v-else
              class="h-16 w-16 flex-shrink-0 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-xl font-bold">{{
                form.coin_name?.charAt(0)
              }}</span>
            </div>
            <div class="flex-1">
              <div class="text-2xl font-bold text-white">
                {{ form.coin_name }}
              </div>
              <div class="text-gray-300">{{ form.coin_title }}</div>
              <div class="text-green-400 font-semibold text-lg">
                {{ formatCurrency(form.coin_rate) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Basic Information -->
        <div class="space-y-6">
          <h2
            class="text-xl font-semibold text-white pb-2 border-b border-gray-700"
          >
            Basic Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="coin_name"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Coin Symbol *
              </label>
              <input
                id="coin_name"
                v-model="form.coin_name"
                type="text"
                required
                placeholder="e.g., BTC, ETH, USDT"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                for="coin_title"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Coin Title *
              </label>
              <input
                id="coin_title"
                v-model="form.coin_title"
                type="text"
                required
                placeholder="e.g., Bitcoin, Ethereum, Tether"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                for="coin_rate"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Current Price (USD) *
              </label>
              <div class="flex gap-2">
                <input
                  id="coin_rate"
                  v-model.number="form.coin_rate"
                  type="number"
                  step="0.001"
                  required
                  min="0"
                  placeholder="e.g., 45000.00"
                  class="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  @click="fetchCurrentPrice"
                  class="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  🔄 Fetch Live Price
                </button>
              </div>
              <p class="text-xs text-gray-400 mt-1">
                Current market price in USD
              </p>
            </div>

            <div>
              <label
                for="type"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Coin Type
              </label>
              <select
                id="type"
                v-model="form.type"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select type</option>
                <option
                  v-for="coinType in coinTypes"
                  :key="coinType"
                  :value="coinType"
                >
                  {{ coinType }}
                </option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label
                for="photo"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Coin Icon URL
              </label>
              <input
                id="photo"
                v-model="form.photo"
                type="url"
                placeholder="https://example.com/bitcoin.png"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">URL to coin icon image</p>
            </div>
          </div>
        </div>

        <!-- Withdrawal Settings -->
        <div class="space-y-6">
          <h2
            class="text-xl font-semibold text-white pb-2 border-b border-gray-700"
          >
            Withdrawal Settings
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="with_min"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Minimum Withdrawal
              </label>
              <input
                id="with_min"
                v-model.number="form.with_min"
                type="number"
                placeholder="e.g., 0.001"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">
                Minimum amount for withdrawal
              </p>
            </div>

            <div>
              <label
                for="with_max"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Maximum Withdrawal
              </label>
              <input
                id="with_max"
                v-model.number="form.with_max"
                type="number"
                placeholder="e.g., 1000"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">
                Maximum amount for withdrawal
              </p>
            </div>

            <div class="md:col-span-2">
              <label
                for="with_instructions"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Withdrawal Instructions
              </label>
              <textarea
                id="with_instructions"
                v-model="form.with_instructions"
                rows="3"
                placeholder="Instructions for withdrawing this coin..."
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
              ></textarea>
              <p class="text-xs text-gray-400 mt-1">
                Instructions shown to users during withdrawal
              </p>
            </div>
          </div>
        </div>

        <!-- Deposit Settings -->
        <div class="space-y-6">
          <h2
            class="text-xl font-semibold text-white pb-2 border-b border-gray-700"
          >
            Deposit Settings
          </h2>

          <div class="grid grid-cols-1 gap-6">
            <div>
              <label
                for="deposit_instructions"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Deposit Instructions
              </label>
              <textarea
                id="deposit_instructions"
                v-model="form.deposit_instructions"
                rows="3"
                placeholder="Instructions for depositing this coin..."
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
              ></textarea>
              <p class="text-xs text-gray-400 mt-1">
                Instructions shown to users during deposit
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="deposit_address"
                  class="block text-sm font-medium text-gray-300 mb-2"
                >
                  Deposit Address
                </label>
                <input
                  id="deposit_address"
                  v-model="form.deposit_address"
                  type="text"
                  placeholder="Wallet address for deposits"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p class="text-xs text-gray-400 mt-1">
                  Wallet address for user deposits
                </p>
              </div>

              <div>
                <label
                  for="percent"
                  class="block text-sm font-medium text-gray-300 mb-2"
                >
                  Transaction Fee (%)
                </label>
                <input
                  id="percent"
                  v-model="form.percent"
                  type="text"
                  placeholder="e.g., 0.1%"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p class="text-xs text-gray-400 mt-1">
                  Transaction fee percentage
                </p>
              </div>
            </div>

            <div>
              <label
                for="coin_visible"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Visibility
              </label>
              <select
                id="coin_visible"
                v-model="form.coin_visible"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="true">
                  ✅ Visible - Users can see and use this coin
                </option>
                <option value="false">
                  ❌ Hidden - Users cannot see this coin
                </option>
              </select>
              <p class="text-xs text-gray-400 mt-1">
                Control coin visibility to users
              </p>
            </div>
          </div>
        </div>

        <!-- Message Alert -->
        <div
          v-if="message.text"
          :class="[
            'p-4 rounded-lg mb-6 transition-all duration-300',
            message.type === 'success'
              ? 'bg-green-500/20 border border-green-500 text-green-400'
              : message.type === 'error'
              ? 'bg-red-500/20 border border-red-500 text-red-400'
              : 'bg-blue-500/20 border border-blue-500 text-blue-400',
          ]"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="message.type === 'success'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ message.text }}
          </div>
        </div>

        <!-- Submit Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700"
        >
          <button
            type="submit"
            :disabled="saving"
            class="cursor-pointer flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
          >
            <span v-if="saving" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating Coin...
            </span>
            <span v-else>💾 Update Coin</span>
          </button>

          <NuxtLink
            to="/wp-admin/coins"
            class="px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-center font-semibold"
          >
            Cancel
          </NuxtLink>

          <button
            type="button"
            @click="resetForm"
            class="cursor-pointer px-8 py-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-center font-semibold"
          >
            🔄 Reset Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions for all interactive elements */
input,
select,
textarea,
button {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Gradient border effect on focus */
input:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading button animation */
button:disabled {
  opacity: 0.7;
  transform: scale(0.98);
}
</style>
