<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const planId = route.params.id;
const loading = ref(true);
const saving = ref(false);
const message = ref({ type: "", text: "" });

// Form data
const form = ref({
  title: "",
  coin: "",
  apy: "",
  lock_period: "",
  minimum_amount: "",
  maximum_amount: "",
  type: "Locked",
  status: "true",
});

// Common cryptocurrencies
const popularCoins = [
  "BTC",
  "ETH",
  "USDT",
  "USDC",
  "BNB",
  "XRP",
  "ADA",
  "SOL",
  "DOT",
  "MATIC",
  "LTC",
  "DOGE",
  "AVAX",
  "LINK",
  "ATOM",
  "XLM",
  "BCH",
  "ETC",
  "XMR",
  "TRX",
];

// Fetch plan details
const fetchPlan = async () => {
  loading.value = true;
  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/staking-single.php?id=${planId}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      const plan = res.plan;
      form.value = {
        title: plan.title,
        coin: plan.coin,
        apy: plan.apy,
        lock_period: plan.lock_period,
        minimum_amount: plan.minimum_amount,
        maximum_amount: plan.maximum_amount,
        type: plan.type,
        status: plan.status,
      };
    } else {
      message.value = { type: "error", text: "Staking plan not found" };
    }
  } catch (error) {
    message.value = {
      type: "error",
      text: "Failed to load staking plan details",
    };
    router.push("/wp-admin/staking");
  }
  loading.value = false;
};

// Update plan
const updatePlan = async () => {
  // Basic form validation
  if (
    !form.value.title ||
    !form.value.coin ||
    !form.value.apy ||
    form.value.lock_period <= 0
  ) {
    message.value = {
      type: "error",
      text: "Title, coin, APY, and lock period are required",
    };
    return;
  }

  saving.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/staking-update.php`,
      {
        method: "POST",
        body: JSON.stringify({
          id: parseInt(planId),
          ...form.value,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.success) {
      message.value = { type: "success", text: res.message };
      // Redirect back to list after 2 seconds
      setTimeout(() => {
        router.push("/wp-admin/staking");
      }, 2000);
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to update staking plan" };
  }

  saving.value = false;
};

// Reset form to original values
const resetForm = () => {
  fetchPlan();
};

// Format amount for display
const formatAmount = (amount) => {
  if (!amount) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(amount);
};

// Load plan data on component mount
onMounted(() => {
  fetchPlan();
});
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <NuxtLink
        to="/wp-admin/staking"
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
        Back to Staking Plans
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white">Edit Staking Plan</h1>
      <p class="text-gray-400 mt-2">
        Update staking plan information and terms
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-gray-800 rounded-xl p-8 text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"
      ></div>
      <p class="text-gray-300 text-lg">Loading plan details...</p>
    </div>

    <!-- Main Form -->
    <div
      v-else
      class="bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
    >
      <form @submit.prevent="updatePlan" class="p-6 space-y-8">
        <!-- Plan Information -->
        <div class="space-y-6">
          <h2
            class="text-xl font-semibold text-white pb-2 border-b border-gray-700"
          >
            Plan Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label
                for="title"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Plan Title *
              </label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                placeholder="e.g., Bitcoin Staking, Ethereum Flexible Savings"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                for="coin"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Cryptocurrency *
              </label>
              <select
                id="coin"
                v-model="form.coin"
                required
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select cryptocurrency</option>
                <option v-for="coin in popularCoins" :key="coin" :value="coin">
                  {{ coin }}
                </option>
                <option value="other">Other</option>
              </select>
              <input
                v-if="form.coin === 'other'"
                v-model="form.coin"
                type="text"
                placeholder="Enter cryptocurrency symbol"
                class="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all mt-2"
              />
            </div>

            <div>
              <label
                for="apy"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                APY (Annual Percentage Yield) *
              </label>
              <input
                id="apy"
                v-model="form.apy"
                type="text"
                required
                placeholder="e.g., 5.25%, 12.5%"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">Annual Percentage Yield</p>
            </div>
          </div>
        </div>

        <!-- Staking Terms -->
        <div class="space-y-6">
          <h2
            class="text-xl font-semibold text-white pb-2 border-b border-gray-700"
          >
            Staking Terms
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="lock_period"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Lock Period (Days) *
              </label>
              <input
                id="lock_period"
                v-model.number="form.lock_period"
                type="number"
                required
                min="1"
                placeholder="e.g., 30, 90, 365"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">
                Number of days funds will be locked
              </p>
            </div>

            <div>
              <label
                for="type"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Staking Type
              </label>
              <select
                id="type"
                v-model="form.type"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Locked">🔒 Locked Staking</option>
                <option value="Flexible">🔄 Flexible Staking</option>
              </select>
              <p class="text-xs text-gray-400 mt-1">
                {{
                  form.type === "Locked"
                    ? "Funds are locked for the entire period"
                    : "Funds can be withdrawn anytime"
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Investment Range -->
        <div class="space-y-6">
          <h2
            class="text-xl font-semibold text-white pb-2 border-b border-gray-700"
          >
            Investment Range
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="minimum_amount"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Minimum Amount ({{ form.coin || "Coin" }})
              </label>
              <input
                id="minimum_amount"
                v-model.number="form.minimum_amount"
                type="number"
                step="0.00000001"
                min="0"
                placeholder="e.g., 0.001"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">
                Minimum amount required to stake
              </p>
            </div>

            <div>
              <label
                for="maximum_amount"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Maximum Amount ({{ form.coin || "Coin" }})
              </label>
              <input
                id="maximum_amount"
                v-model="form.maximum_amount"
                type="text"
                placeholder="e.g., 1000 or leave empty for unlimited"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">
                Maximum allowed amount (empty = unlimited)
              </p>
            </div>
          </div>
        </div>

        <!-- Plan Settings -->
        <div class="space-y-6">
          <h2
            class="text-xl font-semibold text-white pb-2 border-b border-gray-700"
          >
            Plan Settings
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="status"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Plan Status
              </label>
              <select
                id="status"
                v-model="form.status"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="true">✅ Active - Available for staking</option>
                <option value="false">❌ Inactive - Not available</option>
              </select>
              <p class="text-xs text-gray-400 mt-1">
                Control plan availability to users
              </p>
            </div>
          </div>
        </div>

        <!-- Plan Summary Preview -->
        <div class="bg-gray-900/30 rounded-lg p-6 border border-gray-700">
          <h3 class="text-lg font-semibold text-white mb-4">
            Plan Summary Preview
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div class="text-center p-3 bg-gray-800 rounded-lg">
              <div class="text-gray-400">Cryptocurrency</div>
              <div class="text-yellow-400 font-medium">
                {{ form.coin || "Not set" }}
              </div>
            </div>
            <div class="text-center p-3 bg-gray-800 rounded-lg">
              <div class="text-gray-400">APY</div>
              <div class="text-green-400 font-medium">
                {{ form.apy || "Not set" }}
              </div>
            </div>
            <div class="text-center p-3 bg-gray-800 rounded-lg">
              <div class="text-gray-400">Lock Period</div>
              <div class="text-white font-medium">
                {{ form.lock_period || "0" }} days
              </div>
            </div>
            <div class="text-center p-3 bg-gray-800 rounded-lg">
              <div class="text-gray-400">Staking Type</div>
              <div class="text-blue-400 font-medium">{{ form.type }}</div>
            </div>
            <div class="text-center p-3 bg-gray-800 rounded-lg md:col-span-2">
              <div class="text-gray-400">Investment Range</div>
              <div class="text-white font-medium">
                {{ formatAmount(form.minimum_amount) }} -
                {{ form.maximum_amount || "Unlimited" }} {{ form.coin }}
              </div>
            </div>
            <div class="text-center p-3 bg-gray-800 rounded-lg md:col-span-2">
              <div class="text-gray-400">Status</div>
              <div
                :class="[
                  'font-medium',
                  form.status === 'true' ? 'text-green-400' : 'text-red-400',
                ]"
              >
                {{ form.status === "true" ? "Active" : "Inactive" }}
              </div>
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
              : 'bg-red-500/20 border border-red-500 text-red-400',
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
              Updating Plan...
            </span>
            <span v-else>💾 Update Staking Plan</span>
          </button>

          <NuxtLink
            to="/wp-admin/staking"
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
