<script setup>
definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();

// State
const copytraders = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const deleteLoading = ref(false);
const message = ref({ type: "", text: "" });

// Fetch copytraders function
const fetchCopytraders = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (searchQuery.value) {
      params.append("search", searchQuery.value);
    }

    const res = await $fetch(
      `${config.public.apiBase}/admin/copytrader-list.php?${params}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      copytraders.value = res.copytraders;
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to load copytraders" };
  }
  loading.value = false;
};

// Search with debounce
let searchTimeout;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(fetchCopytraders, 300);
};

// Delete copytrader function
const deleteCopytrader = async (copytraderId, copytraderName) => {
  if (
    !confirm(
      `Are you sure you want to delete copytrader "${copytraderName}"? This action cannot be undone.`
    )
  ) {
    return;
  }

  deleteLoading.value = true;
  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/copytrader-delete.php`,
      {
        method: "POST",
        body: JSON.stringify({ id: copytraderId }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.success) {
      message.value = { type: "success", text: res.message };
      await fetchCopytraders(); // Refresh the list
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to delete copytrader" };
  }
  deleteLoading.value = false;
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Get status badge class
const getStatusClass = (status) => {
  return status === "active" ? "bg-green-500" : "bg-red-500";
};

// Load copytraders on component mount
onMounted(() => {
  fetchCopytraders();
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">CopyTraders Management</h1>
      <div class="flex gap-4">
        <div class="text-gray-300">Total: {{ copytraders.length }}</div>
        <NuxtLink
          to="/wp-admin/copytrader/create"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          + Add New
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
          : 'bg-red-500 text-white',
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
            placeholder="Search copytraders by name or strategy..."
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Copytraders Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="text-gray-300 mt-2">Loading copytraders...</p>
      </div>

      <div v-else-if="copytraders.length === 0" class="p-8 text-center">
        <p class="text-gray-300">No copytraders found</p>
        <NuxtLink
          to="/wp-admin/copytrader/create"
          class="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Create First Copytrader
        </NuxtLink>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Copytrader
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Stats
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Performance
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Created
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
              v-for="ct in copytraders"
              :key="ct.id"
              class="hover:bg-gray-750"
            >
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div v-if="ct.photo" class="h-10 w-10 flex-shrink-0">
                    <img
                      class="h-10 w-10 rounded-full"
                      :src="ct.photo"
                      :alt="ct.name"
                    />
                  </div>
                  <div
                    v-else
                    class="h-10 w-10 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white font-medium">{{
                      ct.name.charAt(0)
                    }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-white">
                      {{ ct.name }}
                    </div>
                    <div class="text-sm text-gray-300">Rank: {{ ct.rank }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-300">
                  <div>Trades: {{ ct.notrades }}</div>
                  <div>Copiers: {{ ct.nocopiers }}</div>
                  <div>Wins: {{ ct.nowins }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm">
                  <div class="text-green-400">Profit: {{ ct.profit }}</div>
                  <div class="text-red-400">Loss: {{ ct.loss }}</div>
                  <div class="text-gray-300">
                    Commission: {{ formatCurrency(ct.commision) }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs rounded-full text-white',
                    getStatusClass(ct.status),
                  ]"
                >
                  {{ ct.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {{ formatDate(ct.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <NuxtLink
                    :to="`/wp-admin/copytrader/${ct.id}`"
                    class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="deleteCopytrader(ct.id, ct.name)"
                    :disabled="deleteLoading"
                    class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
