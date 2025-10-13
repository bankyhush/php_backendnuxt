<template>
  <main class="container mx-auto px-4 py-6 space-y-8">
    <!-- Chart + Trading Form -->
    <section class="flex flex-col lg:flex-row gap-6">
      <!-- Chart -->
      <div
        class="w-full lg:w-2/3 bg-white dark:bg-[#202020] p-4 rounded-xl shadow-md"
      >
        <div
          class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4"
        >
          <h2 class="text-xl font-semibold text-left dark:text-white">
            Live Chart - {{ selectedAsset.coin_name }}
          </h2>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600 dark:text-gray-400"
              >Current Price:</span
            >
            <span class="font-semibold text-green-600"
              >${{ selectedAsset.coin_rate?.toLocaleString() }}</span
            >
          </div>
        </div>
        <div class="aspect-video">
          <iframe
            id="chartFrame"
            class="w-full h-[450px] rounded"
            frameborder="0"
            :src="`https://www.tradingview.com/widgetembed/?frameElementId=tradingview-widget&symbol=BINANCE:${
              selectedAsset.symbol || 'BTCUSDT'
            }&interval=15&theme=${isDark ? 'dark' : 'light'}`"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Buy/Sell Form -->
      <div
        class="w-full lg:w-1/3 bg-white dark:bg-[#202020] p-4 rounded-xl shadow-md"
      >
        <div class="flex border-b mb-4">
          <!-- <button
            class="w-1/2 py-2 text-center border-blue-600 text-blue-600 font-semibold dark:text-blue-400"
          >
            Trades
          </button> -->
        </div>

        <form class="space-y-4" @submit.prevent="placeOrder">
          <!-- Trade Type Toggle -->
          <div class="grid grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              @click="tradeData.trade_type = 'BUY'"
              :class="[
                'py-3 rounded-lg font-semibold transition',
                tradeData.trade_type === 'BUY'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
              ]"
            >
              BUY
            </button>
            <button
              type="button"
              @click="tradeData.trade_type = 'SELL'"
              :class="[
                'py-3 rounded-lg font-semibold transition',
                tradeData.trade_type === 'SELL'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
              ]"
            >
              SELL
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300"
              >Amount</label
            >
            <input
              type="number"
              v-model="tradeData.amount"
              step="0.0001"
              class="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#2a2a2a] dark:text-white"
              placeholder="Enter amount"
              required
            />
            <div
              class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1"
            >
              <span
                >Available:
                {{ selectedAssetBalance?.available_balance || 0 }}</span
              >
              <span>USD Value: ${{ (tradeData.amount * 1).toFixed(2) }}</span>
            </div>
          </div>

          <!-- Asset Dropdown (Selects the base currency/coin you're trading with) -->
          <div class="relative">
            <label class="block text-sm font-medium mb-1 dark:text-gray-300"
              >Select Asset</label
            >
            <div
              @click="toggleAssetDropdown"
              class="cursor-pointer w-full border border-gray-300 dark:border-gray-600 rounded p-2 flex items-center justify-between hover:border-blue-400 transition dark:bg-[#2a2a2a]"
            >
              <div class="flex items-center gap-2">
                <img
                  :src="selectedAsset.photo"
                  :alt="selectedAsset.coin_name"
                  class="w-5 h-5 rounded-full"
                  @error="handleImageError"
                />
                <span class="dark:text-white">{{
                  selectedAsset.coin_name
                }}</span>
              </div>
              <svg
                class="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>

            <div
              v-show="assetDropdownOpen"
              class="absolute z-20 mt-1 w-full bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded shadow-lg max-h-60 overflow-auto"
            >
              <div
                v-for="asset in availableAssets"
                :key="asset.coin_id"
                @click="selectAsset(asset)"
                class="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition"
              >
                <img
                  :src="asset.photo"
                  :alt="asset.coin_name"
                  class="w-5 h-5 rounded-full"
                  @error="handleImageError"
                />
                <span class="dark:text-white">{{ asset.coin_name }}</span>
                <span class="text-xs text-gray-500 ml-auto"
                  >${{ asset.coin_rate?.toLocaleString() }}</span
                >
              </div>
            </div>
          </div>

          <!-- Trade Spot Dropdown (Selects the trading pair/instrument) -->
          <div class="relative">
            <label class="block text-sm font-medium mb-1 dark:text-gray-300"
              >Trade Spot</label
            >
            <div
              @click="toggleSpotDropdown"
              class="cursor-pointer w-full border border-gray-300 dark:border-gray-600 rounded p-2 flex items-center justify-between hover:border-blue-400 transition dark:bg-[#2a2a2a]"
            >
              <div class="flex items-center gap-2">
                <img
                  :src="selectedTradingSpot.photo"
                  :alt="selectedTradingSpot.coin_name"
                  class="w-5 h-5 rounded-full"
                  @error="handleImageError"
                />
                <span class="dark:text-white">{{
                  selectedTradingSpot.coin_name
                }}</span>
              </div>
              <svg
                class="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>

            <div
              v-show="spotDropdownOpen"
              class="absolute z-20 mt-1 w-full bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded shadow-lg max-h-60 overflow-auto"
            >
              <div
                v-for="spot in tradingSpots"
                :key="spot.coin_id"
                @click="selectTradingSpot(spot)"
                class="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition"
              >
                <img
                  :src="spot.photo"
                  :alt="spot.coin_name"
                  class="w-5 h-5 rounded-full"
                  @error="handleImageError"
                />
                <span class="dark:text-white">{{ spot.coin_name }}</span>
                <span class="text-xs text-gray-500 ml-auto"
                  >${{ spot.coin_rate?.toLocaleString() }}</span
                >
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300"
                >SL (Stop Loss)</label
              >
              <input
                type="number"
                v-model="tradeData.sl"
                step="0.01"
                class="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#2a2a2a] dark:text-white"
                placeholder="Optional"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300"
                >TP (Take Profit)</label
              >
              <input
                type="number"
                v-model="tradeData.tp"
                step="0.01"
                class="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#2a2a2a] dark:text-white"
                placeholder="Optional"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300"
              >Market Type</label
            >
            <select
              v-model="tradeData.market_type"
              class="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#2a2a2a] dark:text-white"
              required
            >
              <option value="" disabled>Select</option>
              <option value="Spot">Spot</option>
              <option value="Futures">Futures</option>
              <option value="Margin">Margin</option>
            </select>
          </div>

          <!-- Leverage (for Futures) -->
          <div v-if="tradeData.market_type === 'Futures'">
            <label class="block text-sm font-medium mb-1 dark:text-gray-300"
              >Leverage</label
            >
            <select
              v-model="tradeData.leverage"
              class="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-[#2a2a2a] dark:text-white"
            >
              <option value="1">1x</option>
              <option value="5">5x</option>
              <option value="10">10x</option>
              <option value="20">20x</option>
              <option value="50">50x</option>
            </select>
          </div>

          <!-- Success/Error Messages -->
          <div
            v-if="successMessage"
            class="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg"
          >
            {{ successMessage }}
          </div>

          <div
            v-if="errorMessage"
            class="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg"
          >
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="isPlacingOrder"
            :class="[
              'cursor-pointer w-full py-3 rounded font-semibold transition flex items-center justify-center',
              tradeData.trade_type === 'BUY'
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white',
              isPlacingOrder ? 'opacity-50 cursor-not-allowed' : '',
            ]"
          >
            <Icon
              v-if="isPlacingOrder"
              name="lucide:loader-2"
              class="animate-spin w-4 h-4 mr-2"
            />
            {{
              isPlacingOrder
                ? "Placing Order..."
                : `${tradeData.trade_type} ${selectedTradingSpot.coin_name} (${tradeData.market_type})`
            }}
          </button>
        </form>
      </div>
    </section>

    <!-- Order History -->
    <section
      class="bg-white dark:bg-[#202020] p-6 rounded-xl shadow-md overflow-x-auto"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold dark:text-white">Trade History</h2>
        <button
          @click="fetchTradeHistory"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2"
        >
          <Icon name="lucide:refresh-cw" class="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div v-if="loadingHistory" class="text-center py-8">
        <Icon
          name="lucide:loader-2"
          class="animate-spin w-8 h-8 mx-auto text-blue-500"
        />
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          Loading trade history...
        </p>
      </div>

      <table
        v-else
        class="min-w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg"
      >
        <thead
          class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold"
        >
          <tr>
            <th class="px-4 py-3">Symbol</th>
            <th class="px-4 py-3">Type</th>
            <th class="px-4 py-3">Volume</th>
            <th class="px-4 py-3">S/L</th>
            <th class="px-4 py-3">T/P</th>
            <th class="px-4 py-3">Market</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody
          class="text-gray-700 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <tr v-if="tradeHistory.length === 0">
            <td colspan="8" class="px-4 py-6 text-center text-gray-400">
              No trading history found.
            </td>
          </tr>
          <tr
            v-for="trade in tradeHistory"
            :key="trade.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="font-medium">{{ trade.symbol }}</span>
              </div>
            </td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  trade.type === 'BUY'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                ]"
              >
                {{ trade.type }}
              </span>
            </td>
            <td class="px-4 py-3">{{ trade.volume }}</td>
            <td class="px-4 py-3">{{ trade.sl || "-" }}</td>
            <td class="px-4 py-3">{{ trade.tp || "-" }}</td>
            <td class="px-4 py-3">{{ trade.status }}</td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  trade.trade_result?.includes('PENDING')
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    : trade.trade_result?.includes('WIN')
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                ]"
              >
                {{ trade.trade_result || "PENDING" }}
              </span>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              {{ formatDate(trade.created_at) }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

import { onMounted, ref, computed } from "vue";

const config = useRuntimeConfig();
const isDark = ref(false);

// Reactive data
const availableAssets = ref([]);
const tradingSpots = ref([]);
const tradeHistory = ref([]);
const loadingHistory = ref(false);
const isPlacingOrder = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

// Dropdown states
const assetDropdownOpen = ref(false);
const spotDropdownOpen = ref(false);

// Trade form data
const tradeData = ref({
  amount: "",
  coin_id: "",
  coin_name: "",
  trading_spot: "",
  trade_type: "BUY",
  market_type: "Spot",
  sl: null,
  tp: null,
  leverage: 1,
});

// Selected assets
const selectedAsset = ref({
  coin_id: "",
  coin_name: "Select Asset",
  coin_rate: 0,
  photo: "/stake/default.png",
  symbol: "",
});

const selectedTradingSpot = ref({
  coin_id: "",
  coin_name: "Select Trading Spot",
  coin_rate: 0,
  photo: "/stake/default.png",
  symbol: "",
});

// Computed properties
const selectedAssetBalance = computed(() => {
  return availableAssets.value.find(
    (asset) => asset.coin_id === selectedAsset.value.coin_id
  );
});

// Methods
const handleImageError = (event) => {
  event.target.src = "/stake/default.png";
};

const toggleAssetDropdown = () => {
  assetDropdownOpen.value = !assetDropdownOpen.value;
  spotDropdownOpen.value = false;
};

const toggleSpotDropdown = () => {
  spotDropdownOpen.value = !spotDropdownOpen.value;
  assetDropdownOpen.value = false;
};

const selectAsset = (asset) => {
  selectedAsset.value = asset;
  tradeData.value.coin_id = asset.coin_id;
  tradeData.value.coin_name = asset.coin_name;
  assetDropdownOpen.value = false;

  // FIXED: Update chart when Select Asset changes
  updateChart(asset);
};

const selectTradingSpot = (spot) => {
  selectedTradingSpot.value = spot;
  tradeData.value.trading_spot = spot.coin_name;
  spotDropdownOpen.value = false;

  // REMOVED: Chart update from Trade Spot
  // The chart should only update when Select Asset changes
};

const updateChart = (asset) => {
  // Generate symbol for the chart based on the selected asset
  // For TradingView, we need a proper trading pair format
  let symbol;

  if (asset.coin_code) {
    // If asset has a coin_code (like BTC, ETH), use it for the pair
    symbol = `${asset.coin_code}USDT`;
  } else if (asset.coin_name) {
    // Extract first 3-4 letters for crypto symbols
    const code = asset.coin_name.substring(0, 3).toUpperCase();
    symbol = `${code}USDT`;
  } else {
    symbol = "BTCUSDT"; // Fallback
  }

  selectedAsset.value.symbol = symbol;
  console.log("Updating chart for:", symbol);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const clearMessages = () => {
  setTimeout(() => {
    successMessage.value = "";
    errorMessage.value = "";
  }, 5000);
};

// API Calls
const fetchAvailableAssets = async () => {
  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/usdtcoin.php`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      availableAssets.value = response.data;
      if (response.data.length > 0) {
        selectAsset(response.data[0]);
      }
    }
  } catch (err) {
    console.error("Failed to fetch assets:", err);
    errorMessage.value = "Failed to load assets";
    clearMessages();
  }
};

const fetchTradingSpots = async () => {
  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/dummy-coins.php`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      tradingSpots.value = response.data;
      if (response.data.length > 0) {
        selectTradingSpot(response.data[0]);
      }
    }
  } catch (err) {
    // console.error("Failed to fetch trading spots:", err);
  }
};

const fetchTradeHistory = async () => {
  loadingHistory.value = true;
  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/trade_history.php`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      tradeHistory.value = response.data;
    }
  } catch (err) {
    //console.error("Failed to fetch trade history:", err);
    errorMessage.value = "Failed to load trade history";
    clearMessages();
  } finally {
    loadingHistory.value = false;
  }
};

const placeOrder = async () => {
  if (
    !tradeData.value.amount ||
    !tradeData.value.coin_id ||
    !tradeData.value.trading_spot
  ) {
    errorMessage.value = "Please fill all required fields";
    clearMessages();
    return;
  }

  isPlacingOrder.value = true;
  errorMessage.value = "";

  try {
    console.log("Sending trade data:", tradeData.value);

    // Prepare the request data exactly as you want it
    const requestData = {
      amount: parseFloat(tradeData.value.amount),
      coin_id: parseInt(tradeData.value.coin_id),
      coin_name: tradeData.value.coin_name,
      trading_spot: tradeData.value.trading_spot,
      trade_type: tradeData.value.trade_type,
      market_type: tradeData.value.market_type,
    };

    // Add optional fields only if they exist
    if (tradeData.value.sl) {
      requestData.sl = parseFloat(tradeData.value.sl);
    }
    if (tradeData.value.tp) {
      requestData.tp = parseFloat(tradeData.value.tp);
    }
    if (tradeData.value.leverage) {
      requestData.leverage = parseInt(tradeData.value.leverage);
    }

    console.log("Final request data:", requestData);

    const response = await fetch(
      `${config.public.apiBase}/user/trade-now.php`,
      {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    //console.log("Response status:", response.status);

    const responseText = await response.text();
    //console.log("Raw response text:", responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", parseError);
      throw new Error(`Server returned: ${responseText}`);
    }

    //  console.log("Parsed response data:", responseData);

    if (responseData.success) {
      successMessage.value = `Trade placed successfully!`;

      // Reset form
      tradeData.value.amount = "";
      tradeData.value.sl = null;
      tradeData.value.tp = null;

      // Refresh data
      await fetchTradeHistory();
      await fetchAvailableAssets();
    } else {
      throw new Error(responseData.message || "Unknown server error");
    }
  } catch (err) {
    console.error("Full error object:", err);

    let errorMsg = "Failed to place trade";
    if (err?.message) {
      errorMsg = err.message;
    }

    errorMessage.value = errorMsg;
    console.error("Final error message:", errorMsg);
  } finally {
    isPlacingOrder.value = false;
    clearMessages();
  }
};

// Initialize
onMounted(() => {
  fetchAvailableAssets();
  fetchTradingSpots();
  fetchTradeHistory();

  // Detect dark mode
  isDark.value = document.documentElement.classList.contains("dark");
});
</script>
