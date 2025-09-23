<script setup>
definePageMeta({
  layout: "admin",
});

const router = useRouter();
const config = useRuntimeConfig();

// Form data
const form = ref({
  title: "",
  coin: "",
  apy: "",
  lock_period: 30,
  minimum_amount: "",
  maximum_amount: "",
  type: "Locked",
  status: "true",
});

const loading = ref(false);
const message = ref({ type: "", text: "" });

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

// Create staking plan
const createPlan = async () => {
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

  loading.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/staking-create.php`,
      {
        method: "POST",
        body: JSON.stringify(form.value),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.success) {
      message.value = { type: "success", text: res.message };
      // Reset form
      form.value = {
        title: "",
        coin: "",
        apy: "",
        lock_period: 30,
        minimum_amount: 0.0,
        maximum_amount: "",
        type: "Locked",
        status: "true",
      };

      // Redirect to list after 2 seconds
      setTimeout(() => {
        router.push("/wp-admin/staking");
      }, 2000);
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to create staking plan" };
  }

  loading.value = false;
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <NuxtLink
        to="/wp-admin/staking"
        class="text-blue-400 hover:text-blue-300 flex items-center gap-2"
      >
        ← Back to Staking Plans
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white mt-2">
        Create New Staking Plan
      </h1>
    </div>

    <div class="bg-gray-800 rounded-lg p-6">
      <form @submit.prevent="createPlan" class="space-y-6">
        <!-- Basic Information -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">
            Staking Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label
                for="title"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Staking Title *</label
              >
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                placeholder="e.g., Bitcoin Staking, Ethereum Flexible Savings"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="coin"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Cryptocurrency *</label
              >
              <select
                id="coin"
                v-model="form.coin"
                required
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
            </div>

            <div>
              <label
                for="apy"
                class="block text-sm font-medium text-gray-300 mb-2"
                >APY (Annual Percentage Yield) *</label
              >
              <input
                id="apy"
                v-model.number="form.apy"
                type="number"
                required
                placeholder="e.g., 5.25%, 12.5%"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Lock Period & Type -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">Staking Terms</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="lock_period"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Lock Period (Days) *</label
              >
              <input
                id="lock_period"
                v-model.number="form.lock_period"
                type="number"
                step="0.00000001"
                required
                min="1"
                placeholder="e.g., 30, 90, 365"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="type"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Staking Type</label
              >
              <select
                id="type"
                v-model="form.type"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Locked">🔒 Locked Staking</option>
                <option value="Flexible">🔄 Flexible Staking</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Investment Range -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">
            Investment Range
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="minimum_amount"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Minimum Amount ({{ form.coin || "Coin" }})</label
              >
              <input
                id="minimum_amount"
                v-model.number="form.minimum_amount"
                type="number"
                step="0.00000001"
                required
                min="0"
                placeholder="e.g., 0.001"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="maximum_amount"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Maximum Amount ({{ form.coin || "Coin" }})</label
              >
              <input
                id="maximum_amount"
                v-model.number="form.maximum_amount"
                type="number"
                placeholder="e.g., 1000 or Unlimited"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-400 mt-1">
                Leave empty for unlimited
              </p>
            </div>
          </div>
        </div>

        <!-- Settings -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">Settings</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="status"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Staking Status</label
              >
              <select
                id="status"
                v-model="form.status"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">✅ Active - Available for staking</option>
                <option value="false">❌ Inactive - Not available</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Plan Summary -->
        <div class="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <h3 class="text-lg font-semibold text-white mb-3">Plan Summary</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div class="text-gray-400">Coin</div>
              <div class="text-yellow-400 font-medium">
                {{ form.coin || "Not set" }}
              </div>
            </div>
            <div>
              <div class="text-gray-400">APY</div>
              <div class="text-green-400 font-medium">
                {{ form.apy || "Not set" }}
              </div>
            </div>
            <div>
              <div class="text-gray-400">Lock Period</div>
              <div class="text-white font-medium">
                {{ form.lock_period }} days
              </div>
            </div>
            <div>
              <div class="text-gray-400">Type</div>
              <div class="text-blue-400 font-medium">{{ form.type }}</div>
            </div>
          </div>
        </div>

        <!-- Message Alert -->
        <div
          v-if="message.text"
          :class="[
            'p-4 rounded-md mb-6',
            message.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white',
          ]"
        >
          {{ message.text }}
        </div>

        <!-- Submit Buttons -->
        <div class="flex gap-4 pt-6 border-t border-gray-700">
          <button
            type="submit"
            :disabled="loading"
            class="cursor-pointer px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {{ loading ? "Creating..." : "Create Staking Plan" }}
          </button>

          <NuxtLink
            to="/wp-admin/staking"
            class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
