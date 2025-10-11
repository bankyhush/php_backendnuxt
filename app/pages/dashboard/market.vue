<template>
  <div
    class="w-full max-w-5xl mx-auto p-6 bg-white text-black dark:bg-[#202020] dark:text-gray-200 rounded-2xl mb-20"
  >
    <!-- Header -->
    <div class="text-xl sm:text-2xl font-bold text-center mb-3">
      Crypto Market Capitalization
    </div>
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or symbol"
        class="w-full sm:w-64 px-4 py-2 text-sm rounded-md dark:bg-zinc-900 dark:text-white border border-zinc-700 focus:outline-none focus:border-yellow-500"
      />
    </div>

    <!-- Loading Skeleton -->
    <div
      v-if="loading && filteredCryptos.length === 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="bg-zinc-800 p-6 rounded-lg flex flex-col items-center"
      >
        <div class="h-12 w-12 bg-zinc-700 rounded-full mb-4"></div>
        <div class="h-5 w-16 bg-zinc-700 rounded mb-2"></div>
        <div class="h-4 w-24 bg-zinc-700 rounded mb-4"></div>
        <div class="h-6 w-28 bg-zinc-700 rounded mb-2"></div>
        <div class="h-5 w-16 bg-zinc-700 rounded"></div>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-else-if="error"
      class="bg-red-800/20 text-red-100 p-4 rounded-md text-center"
    >
      <p>{{ error }}</p>
      <button
        @click="fetchCryptoData"
        class="mt-3 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm"
      >
        Try Again
      </button>
    </div>

    <!-- Coin List -->
    <div v-else>
      <div class="flex flex-col divide-y divide-zinc-300 dark:divide-zinc-700">
        <div
          v-for="crypto in paginatedCryptos"
          :key="crypto.id"
          class="flex items-center justify-between cursor-pointer dark:hover:bg-zinc-800 px-4 py-3 rounded transition"
          @click="openModal(crypto.id)"
        >
          <!-- Left: Icon + Name -->
          <div class="flex items-center space-x-3 w-1/3">
            <img
              :src="crypto.image"
              :alt="crypto.name"
              width="32"
              height="32"
              class="rounded-full"
            />
            <div>
              <div class="font-semibold uppercase">{{ crypto.symbol }}</div>
              <div class="text-sm text-zinc-400">{{ crypto.name }}</div>
            </div>
          </div>

          <!-- Middle: Price -->
          <div class="w-1/3 text-right font-semibold text-lg">
            {{ formatPrice(crypto.current_price) }}
          </div>

          <!-- Right: Change -->
          <div
            class="w-1/3 text-right font-medium"
            :class="
              crypto.price_change_percentage_24h >= 0
                ? 'text-green-500'
                : 'text-red-500'
            "
          >
            {{ crypto.price_change_percentage_24h >= 0 ? "+" : ""
            }}{{ formatChange(crypto.price_change_percentage_24h) }}%
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8 space-x-2">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-4 py-2 text-sm rounded-md border transition',
            currentPage === page
              ? 'bg-yellow-500 text-black font-bold border-yellow-500'
              : 'bg-zinc-800 text-gray-200  hover:bg-zinc-700 border-zinc-700',
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>

  <!-- Coin Detail Modal -->
  <transition name="fade">
    <div
      v-if="showModal && coinDetail"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      @click.self="closeModal"
    >
      <div
        class="bg-gray-200 text-zinc-900 dark:bg-zinc-900 dark:text-gray-100 w-full max-w-2xl p-6 rounded-xl shadow-xl relative overflow-y-auto max-h-[90vh]"
      >
        <button
          @click="closeModal"
          class="cursor-pointer absolute top-4 right-4 text-gray-400 hover: text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <div class="mb-4">
          <h2 class="text-2xl font-bold">
            {{ coinDetail.name }} ({{ coinDetail.symbol.toUpperCase() }})
          </h2>
          <p class="text-sm text-zinc-400 mt-1">
            {{ coinDetail.description?.en?.slice(0, 200)
            }}<span v-if="coinDetail.description?.en?.length > 200">...</span>
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-300"
        >
          <div><strong>Rank:</strong> {{ coinDetail.market_cap_rank }}</div>
          <div>
            <strong>Market Cap:</strong> ${{
              coinDetail.market_data.market_cap.usd.toLocaleString()
            }}
          </div>
          <div>
            <strong>Dominance:</strong>
            {{
              coinDetail.market_data.market_cap_percentage?.toFixed?.(2) ||
              "N/A"
            }}%
          </div>
          <div>
            <strong>Circulating Supply:</strong>
            {{ coinDetail.market_data.circulating_supply.toLocaleString() }}
          </div>
          <div>
            <strong>Total Supply:</strong>
            {{ coinDetail.market_data.total_supply?.toLocaleString() || "N/A" }}
          </div>
          <div>
            <strong>Max Supply:</strong>
            {{ coinDetail.market_data.max_supply?.toLocaleString() || "N/A" }}
          </div>
          <div>
            <strong>All-Time High:</strong> ${{
              coinDetail.market_data.ath.usd.toLocaleString()
            }}
          </div>
          <div>
            <strong>All-Time Low:</strong> ${{
              coinDetail.market_data.atl.usd.toLocaleString()
            }}
          </div>
          <div>
            <strong>Genesis Date:</strong>
            {{ coinDetail.genesis_date || "Unknown" }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
definePageMeta({ layout: "user" });

import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const cryptos = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 15;

const fetchCryptoData = async () => {
  try {
    loading.value = true;
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch cryptocurrency data");
    }
    const data = await res.json();
    cryptos.value = data;
    error.value = null;
  } catch (err) {
    error.value = "Failed to load cryptocurrency data. Please try again later.";
  } finally {
    loading.value = false;
  }
};

let intervalId;

onMounted(() => {
  fetchCryptoData();
  intervalId = setInterval(fetchCryptoData, 60000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

// Computed: Filtered cryptos
const filteredCryptos = computed(() => {
  if (!searchQuery.value) return cryptos.value;
  const query = searchQuery.value.toLowerCase();
  return cryptos.value.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.symbol.toLowerCase().includes(query)
  );
});

// Computed: Paginated cryptos
const totalPages = computed(() =>
  Math.ceil(filteredCryptos.value.length / itemsPerPage)
);

const paginatedCryptos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredCryptos.value.slice(start, start + itemsPerPage);
});

// Helpers
const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

const formatChange = (change) => change.toFixed(2);

const showModal = ref(false);
const coinDetail = ref(null);

const openModal = async (coinId) => {
  showModal.value = true;
  coinDetail.value = null;

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    if (!res.ok) throw new Error("Failed to fetch coin details");

    coinDetail.value = await res.json();
  } catch (err) {
    console.error("Coin detail fetch error:", err);
    showModal.value = false;
  }
};

const closeModal = () => {
  showModal.value = false;
  coinDetail.value = null;
};
</script>
