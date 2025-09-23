<script setup>
definePageMeta({
  layout: "admin",
});

const router = useRouter();
const config = useRuntimeConfig();

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

const loading = ref(false);
const message = ref({ type: "", text: "" });
const fetchingPrice = ref(false);

// Common cryptocurrency types
const coinTypes = ["Stocks", "Crypto", "Meme"];

// CoinGecko ID mapping for popular cryptocurrencies
const coinGeckoMapping = {
  // Bitcoin
  bitcoin: "bitcoin",
  btc: "bitcoin",

  // Ethereum
  ethereum: "ethereum",
  eth: "ethereum",

  // Stablecoins
  tether: "tether",
  usdt: "tether",
  "usd-coin": "usd-coin",
  usdc: "usd-coin",
  "binance-usd": "binance-usd",
  busd: "binance-usd",

  // Major cryptocurrencies
  binancecoin: "binancecoin",
  bnb: "binancecoin",
  ripple: "ripple",
  xrp: "ripple",
  cardano: "cardano",
  ada: "cardano",
  solana: "solana",
  sol: "solana",
  polkadot: "polkadot",
  dot: "polkadot",
  dogecoin: "dogecoin",
  doge: "dogecoin",
  "matic-network": "matic-network",
  matic: "matic-network",
  litecoin: "litecoin",
  ltc: "litecoin",
  chainlink: "chainlink",
  link: "chainlink",
  "avalanche-2": "avalanche-2",
  avax: "avalanche-2",
};

// Create coin
const createCoin = async () => {
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

  loading.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(`${config.public.apiBase}/admin/coin-create.php`, {
      method: "POST",
      body: JSON.stringify(form.value),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      message.value = { type: "success", text: res.message };
      // Reset form
      form.value = {
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
      };

      // Redirect to list after 2 seconds
      setTimeout(() => {
        router.push("/wp-admin/coins");
      }, 2000);
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to create coin" };
  }

  loading.value = false;
};

// Fetch current price from CoinGecko API
const fetchCurrentPrice = async () => {
  if (!form.value.coin_title) {
    message.value = {
      type: "error",
      text: "Please enter coin title first (must match CoinGecko ID)",
    };
    return;
  }

  fetchingPrice.value = true;
  message.value = { type: "", text: "" };

  try {
    // Convert coin title to lowercase for matching
    const coinId = form.value.coin_title.toLowerCase().trim();

    // Try to find the CoinGecko ID
    const geckoId = coinGeckoMapping[coinId] || coinId;

    console.log("Fetching price for:", geckoId);

    // CoinGecko API endpoint
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
      geckoId
    )}&vs_currencies=usd`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data[geckoId] && data[geckoId].usd) {
      const price = data[geckoId].usd;
      form.value.coin_rate = parseFloat(price);
      message.value = {
        type: "success",
        text: `Successfully fetched current price: $${price.toLocaleString()}`,
      };

      // Auto-fill coin name if empty
      if (!form.value.coin_name) {
        form.value.coin_name = form.value.coin_title.toUpperCase();
      }

      // Auto-fill photo URL if empty
    } else {
      throw new Error("Coin not found or price data unavailable");
    }
  } catch (error) {
    console.error("Price fetch error:", error);

    // Fallback to manual entry suggestion
    message.value = {
      type: "error",
      text: `Failed to fetch price: ${error.message}. Please check that the coin title matches the CoinGecko ID exactly.`,
    };

    // Provide helpful suggestions
    if (error.message.includes("not found")) {
      message.value.text += `\n\nCommon CoinGecko IDs: bitcoin, ethereum, tether, binancecoin, ripple, cardano, solana, dogecoin`;
    }
  } finally {
    fetchingPrice.value = false;
  }
};

// Helper function to search for coins (optional enhancement)
const searchCoinGecko = async (query) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.coins || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <NuxtLink
        to="/wp-admin/coins"
        class="text-blue-400 hover:text-blue-300 flex items-center gap-2"
      >
        ← Back to Coins
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white mt-2">Add New Cryptocurrency</h1>
    </div>

    <!-- Message Alert -->
    <div
      v-if="message.text"
      :class="[
        'p-4 rounded-md mb-6 whitespace-pre-line',
        message.type === 'success'
          ? 'bg-green-500 text-white'
          : message.type === 'error'
          ? 'bg-red-500 text-white'
          : 'bg-blue-500 text-white',
      ]"
    >
      {{ message.text }}
    </div>

    <div class="bg-gray-800 rounded-lg p-6">
      <form @submit.prevent="createCoin" class="space-y-6">
        <!-- Basic Information -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">
            Basic Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="coin_name"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Coin Symbol *</label
              >
              <input
                id="coin_name"
                v-model="form.coin_name"
                type="text"
                required
                placeholder="e.g., BTC, ETH, USDT"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="coin_title"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Coin Title (CoinGecko ID) *</label
              >

              <a
                href="https://api.coingecko.com/api/v3/coins/list"
                target="_blank"
                class="font-bold text-green-400 hover:text-green-300 underline"
                >GET LISTED COINS DETAILS ON COINGECKO</a
              >
              <br />

              <span class="text-red-400 text-sm">
                Make sure the coin title matches the CoinGecko ID exactly (e.g.,
                "bitcoin", "ethereum", "tether")
              </span>

              <br />
              <input
                id="coin_title"
                v-model="form.coin_title"
                type="text"
                required
                placeholder="e.g., bitcoin, ethereum, tether"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
              />
            </div>

            <div>
              <label
                for="coin_rate"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Current Price (USD) *</label
              >
              <div class="flex gap-2">
                <input
                  id="coin_rate"
                  v-model.number="form.coin_rate"
                  type="number"
                  step="0.001"
                  required
                  min="0"
                  placeholder="e.g., 45000.00"
                  class="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  @click="fetchCurrentPrice"
                  :disabled="fetchingPrice || !form.coin_title"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {{ fetchingPrice ? "Fetching..." : "💰 Fetch Price" }}
                </button>
              </div>
              <p class="text-xs text-gray-400 mt-1">
                Enter CoinGecko ID above first, then click Fetch Price
              </p>
            </div>

            <div>
              <label
                for="type"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Coin Type</label
              >
              <select
                id="type"
                v-model="form.type"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                >Coin Icon URL</label
              >
              <input
                id="photo"
                v-model="form.photo"
                type="url"
                placeholder="https://example.com/bitcoin.png"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <!-- Preview -->
              <div v-if="form.photo" class="bg-gray-900/50 rounded-lg p-4 mt-2">
                <h3 class="text-lg font-semibold text-white mb-2">
                  Photo Preview
                </h3>
                <img
                  :src="form.photo"
                  :alt="form.coin_title"
                  class="max-w-full h-32 object-contain rounded-md"
                  @error="(e) => (e.target.style.display = 'none')"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Rest of your form remains the same -->
        <!-- Withdrawal Settings -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">
            Withdrawal Settings
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="with_min"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Minimum Withdrawal</label
              >
              <input
                id="with_min"
                v-model.number="form.with_min"
                type="number"
                step="0.00000001"
                placeholder="e.g., 0.001"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="with_max"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Maximum Withdrawal</label
              >
              <input
                id="with_max"
                v-model.number="form.with_max"
                type="number"
                step="0.00000001"
                placeholder="e.g., 1000"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="md:col-span-2">
              <label
                for="with_instructions"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Withdrawal Instructions</label
              >
              <textarea
                id="with_instructions"
                v-model="form.with_instructions"
                rows="3"
                placeholder="Instructions for withdrawing this coin..."
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Deposit Settings -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">
            Deposit Settings
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label
                for="deposit_instructions"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Deposit Instructions</label
              >
              <textarea
                id="deposit_instructions"
                v-model="form.deposit_instructions"
                rows="3"
                placeholder="Instructions for depositing this coin..."
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label
                for="deposit_address"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Deposit Address</label
              >
              <input
                id="deposit_address"
                v-model="form.deposit_address"
                type="text"
                placeholder="Wallet address for deposits"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="percent"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Transaction Fee (%)</label
              >
              <input
                id="percent"
                v-model="form.percent"
                type="text"
                placeholder="e.g., 0.1%"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="coin_visible"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Visibility</label
              >
              <select
                id="coin_visible"
                v-model="form.coin_visible"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="true">Visible to users</option>
                <option value="false">Hidden from users</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Message Alert -->
        <div
          v-if="message.text"
          :class="[
            'p-4 rounded-md mb-6 whitespace-pre-line',
            message.type === 'success'
              ? 'bg-green-500 text-white'
              : message.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white',
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
            {{ loading ? "Creating..." : "Create Coin" }}
          </button>

          <NuxtLink
            to="/wp-admin/coins"
            class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
