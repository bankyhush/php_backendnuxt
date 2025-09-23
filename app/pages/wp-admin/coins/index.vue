<script setup>
definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();

// State
const coins = ref([]);
const loading = ref(true);
const updatingPrices = ref(false);
const searchQuery = ref("");
const deleteLoading = ref(false);
const message = ref({ type: "", text: "" });

// Fetch coins function
const fetchCoins = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (searchQuery.value) {
      params.append("search", searchQuery.value);
    }

    const res = await $fetch(
      `${config.public.apiBase}/admin/coin-list.php?${params}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      coins.value = res.coins;
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to load coins" };
  }
  loading.value = false;
};

// Update prices function
const updatePrices = async () => {
  updatingPrices.value = true;
  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/coin-autoprice.php`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      if (res.updated) {
        message.value = { type: "success", text: res.message };
        await fetchCoins(); // Refresh the list
      } else {
        message.value = { type: "info", text: "Prices are up to date" };
      }

      if (res.errors && res.errors.length > 0) {
        console.error("Price update errors:", res.errors);
      }
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to update prices" };
  }
  updatingPrices.value = false;
};

// Auto-update prices every 30 seconds
let priceUpdateInterval;
onMounted(() => {
  fetchCoins();
  priceUpdateInterval = setInterval(updatePrices, 30000); // 30 seconds
});

onUnmounted(() => {
  if (priceUpdateInterval) {
    clearInterval(priceUpdateInterval);
  }
});

// Search with debounce
let searchTimeout;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(fetchCoins, 300);
};

// Delete coin function
const deleteCoin = async (coinId, coinName) => {
  if (
    !confirm(
      `Are you sure you want to delete coin "${coinName}"? This will also delete all user balances for this coin.`
    )
  ) {
    return;
  }

  deleteLoading.value = true;
  try {
    const res = await $fetch(`${config.public.apiBase}/admin/coin-delete.php`, {
      method: "POST",
      body: JSON.stringify({ coin_id: coinId }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      message.value = { type: "success", text: res.message };
      await fetchCoins(); // Refresh the list
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to delete coin" };
  }
  deleteLoading.value = false;
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount);
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get status badge class
const getStatusClass = (status) => {
  return status === "true" ? "bg-green-500" : "bg-red-500";
};

// Truncate text
const truncateText = (text, length = 50) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">Coin Management</h1>
      <div class="flex gap-4">
        <div class="text-gray-300">Total Coins: {{ coins.length }}</div>
        <button
          @click="updatePrices"
          :disabled="updatingPrices"
          class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {{ updatingPrices ? "Updating..." : "🔄 Update Prices" }}
        </button>
        <NuxtLink
          to="/wp-admin/coins/create"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          + Add New Coin
        </NuxtLink>
      </div>
    </div>

    <!-- Message Alert -->
    <div
      v-if="message.text"
      :class="[
        'p-4 rounded-md mb-6',
        message.type === 'success'
          ? 'bg-green-500 text-white'
          : message.type === 'error'
          ? 'bg-red-500 text-white'
          : 'bg-blue-500 text-white',
      ]"
    >
      {{ message.text }}
    </div>

    <!-- Search Box -->
    <div class="bg-gray-800 rounded-lg p-6 mb-6">
      <div class="flex gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search coins by name or title..."
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Coins Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="text-gray-300 mt-2">Loading coins...</p>
      </div>

      <div v-else-if="coins.length === 0" class="p-8 text-center">
        <p class="text-gray-300">No coins found</p>
        <NuxtLink
          to="/wp-admin/coins/create"
          class="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Add First Coin
        </NuxtLink>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Coin
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Price & Info
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Withdrawal Limits
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Last Updated
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr
              v-for="coin in coins"
              :key="coin.coin_id"
              class="hover:bg-gray-750"
            >
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div v-if="coin.photo" class="h-10 w-10 flex-shrink-0">
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      :src="coin.photo"
                      :alt="coin.coin_name"
                      @error="(e) => (e.target.style.display = 'none')"
                    />
                  </div>
                  <div
                    v-else
                    class="h-10 w-10 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white font-medium">{{
                      coin.coin_name.charAt(0)
                    }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-white">
                      {{ coin.coin_name }}
                    </div>
                    <div class="text-sm text-gray-300">
                      {{ coin.coin_title }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-300">
                  <div class="text-green-400 font-semibold">
                    {{ formatCurrency(coin.coin_rate) }}
                  </div>
                  <div class="text-xs mt-1">Type: {{ coin.type || "N/A" }}</div>
                  <div class="text-xs">Fee: {{ coin.percent || "N/A" }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-300">
                  <div>Min: {{ coin.with_min || "N/A" }}</div>
                  <div>Max: {{ coin.with_max || "N/A" }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs rounded-full text-white',
                    getStatusClass(coin.coin_visible),
                  ]"
                >
                  {{ coin.coin_visible === "true" ? "Visible" : "Hidden" }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {{ formatDate(coin.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <NuxtLink
                    :to="`/wp-admin/coins/edit/${coin.coin_id}`"
                    class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="deleteCoin(coin.coin_id, coin.coin_name)"
                    :disabled="deleteLoading"
                    class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
                  >
                    {{ deleteLoading ? "Deleting..." : "Delete" }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Auto-update indicator -->
    <div class="mt-4 text-center">
      <p class="text-xs text-gray-400">Prices auto-update every 30 seconds</p>
    </div>
  </div>
</template>
