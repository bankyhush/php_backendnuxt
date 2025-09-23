<script setup>
definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();

// State
const plans = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const deleteLoading = ref(false);
const message = ref({ type: "", text: "" });

// Fetch plans function
const fetchPlans = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (searchQuery.value) {
      params.append("search", searchQuery.value);
    }

    const res = await $fetch(
      `${config.public.apiBase}/admin/plan-list.php?${params}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      plans.value = res.plans;
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to load trading plans" };
  }
  loading.value = false;
};

// Search with debounce
let searchTimeout;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(fetchPlans, 300);
};

// Delete plan function
const deletePlan = async (planId, planName) => {
  if (
    !confirm(
      `Are you sure you want to delete trading plan "${planName}"? This action cannot be undone.`
    )
  ) {
    return;
  }

  deleteLoading.value = true;
  try {
    const res = await $fetch(`${config.public.apiBase}/admin/plan-delete.php`, {
      method: "POST",
      body: JSON.stringify({ id: planId }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      message.value = { type: "success", text: res.message };
      await fetchPlans(); // Refresh the list
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to delete trading plan" };
  }
  deleteLoading.value = false;
};

// Get status badge class
const getStatusClass = (status) => {
  return status === "active" ? "bg-green-500" : "bg-red-500";
};

// Format currency/amount
const formatAmount = (amount) => {
  if (!amount) return "Not set";
  return amount.includes("$") ? amount : `$${amount}`;
};

// Load plans on component mount
onMounted(() => {
  fetchPlans();
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">Trading Plans Management</h1>
      <div class="flex gap-4">
        <div class="text-gray-300">Total Plans: {{ plans.length }}</div>
        <NuxtLink
          to="/wp-admin/plans/create"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          + Add New Plan
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
            placeholder="Search plans by name or description..."
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Plans Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="text-gray-300 mt-2">Loading trading plans...</p>
      </div>

      <div v-else-if="plans.length === 0" class="p-8 text-center">
        <p class="text-gray-300">No trading plans found</p>
        <NuxtLink
          to="/wp-admin/plans/create"
          class="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Create First Plan
        </NuxtLink>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Plan Details
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Investment Range
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Duration & Returns
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="plan in plans" :key="plan.id" class="hover:bg-gray-750">
              <td class="px-6 py-4">
                <div>
                  <div class="text-sm font-medium text-white">
                    {{ plan.plan_name }}
                  </div>
                  <div class="text-sm text-gray-300 mt-1">
                    {{ plan.plan_des }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-300">
                  <div>Min: {{ formatAmount(plan.min_ins) }}</div>
                  <div>Max: {{ formatAmount(plan.max_ins) }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-300">
                  <div>Duration: {{ plan.days_duration || "N/A" }}</div>
                  <div>
                    Daily Interest: {{ plan.daily_interest_rate || "N/A" }}%
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs rounded-full text-white',
                    getStatusClass(plan.status),
                  ]"
                >
                  {{ plan.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <NuxtLink
                    :to="`/wp-admin/plans/${plan.id}`"
                    class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="deletePlan(plan.id, plan.plan_name)"
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
  </div>
</template>
