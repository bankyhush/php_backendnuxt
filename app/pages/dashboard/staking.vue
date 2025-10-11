<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Staking Plans</h1>

    <!-- Loading State -->
    <div v-if="loading" class="mb-4">
      <div class="animate-pulse">
        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
        <div
          v-for="n in 3"
          :key="n"
          class="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"
        ></div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg"
    >
      {{ error }}
      <button
        @click="fetchStakingPlans"
        class="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Search input -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or coin..."
          class="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      <!-- No Results -->
      <div v-if="filteredPlans.length === 0" class="text-center py-8">
        <Icon
          name="lucide:search"
          class="w-12 h-12 text-gray-400 mx-auto mb-4"
        />
        <p class="text-gray-500 dark:text-gray-400">
          No staking plans found matching your search.
        </p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table
          class="min-w-full bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden"
        >
          <thead
            class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <tr>
              <th class="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th class="px-6 py-3 text-left text-sm font-medium">Coin</th>
              <th class="px-6 py-3 text-left text-sm font-medium">APY</th>
              <th class="px-6 py-3 text-left text-sm font-medium">
                Lock Period
              </th>
              <th class="px-6 py-3 text-left text-sm font-medium">
                Minimum Amount
              </th>
              <th class="px-6 py-3 text-left text-sm font-medium">Type</th>
              <th class="px-6 py-3 text-left text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="plan in filteredPlans"
              :key="plan.id"
              class="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                <div class="flex items-center space-x-3">
                  <img
                    :src="plan.coin_photo"
                    :alt="plan.coin"
                    class="w-8 h-8 rounded-full object-cover"
                    @error="handleImageError"
                  />
                  <span>{{ plan.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                <div class="flex items-center space-x-2">
                  <span>{{ plan.coin }}</span>
                  <span v-if="plan.coin_name" class="text-xs text-gray-500">
                    ({{ plan.coin_name }})
                  </span>
                </div>
              </td>
              <td
                class="px-6 py-4 text-sm text-green-600 dark:text-green-400 font-semibold"
              >
                {{ plan.percent }}%
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                {{ plan.lock_period }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                ${{ plan.min_amount.toLocaleString() }}
                <span
                  v-if="plan.max_amount"
                  class="text-xs text-gray-500 block"
                >
                  Max: ${{ plan.max_amount.toLocaleString() }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    plan.type === 'Locked'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                  ]"
                >
                  {{ plan.type }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button
                  @click="stakeNow(plan)"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="isStaking"
                >
                  <Icon
                    v-if="isStaking && stakingPlanId === plan.id"
                    name="lucide:loader-2"
                    class="animate-spin w-4 h-4 mr-1 inline"
                  />
                  {{
                    isStaking && stakingPlanId === plan.id
                      ? "Processing..."
                      : "Stake Now"
                  }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Total Count -->
      <div class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {{ filteredPlans.length }} of {{ plans.length }} staking plans
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});

import { onMounted, ref, computed } from "vue";

const config = useRuntimeConfig();

// Reactive data
const plans = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");
const isStaking = ref(false);
const stakingPlanId = ref(null);

// Filter plans based on search
const filteredPlans = computed(() => {
  if (!searchQuery.value) return plans.value;

  const q = searchQuery.value.toLowerCase();
  return plans.value.filter(
    (plan) =>
      plan.name.toLowerCase().includes(q) ||
      plan.coin.toLowerCase().includes(q) ||
      (plan.coin_name && plan.coin_name.toLowerCase().includes(q))
  );
});

// Handle image errors
const handleImageError = (event) => {
  event.target.src = "/coins/default.png";
};

// Fetch staking plans from API
const fetchStakingPlans = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch(
      `${config.public.apiBase}/user/staking-plans.php`,
      {
        credentials: "include",
      }
    );

    if (response.success) {
      plans.value = response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    error.value =
      err?.data?.message || err?.message || "Failed to load staking plans";
  } finally {
    loading.value = false;
  }
};

// Stake now function
const stakeNow = async (plan) => {
  isStaking.value = true;
  stakingPlanId.value = plan.id;

  try {
    // Here you would call your stake API
    console.log("Staking plan:", plan);

    // Example API call (you'll need to create this endpoint)
    // const response = await $fetch(`${config.public.apiBase}/user/stake-now.php`, {
    //   method: "POST",
    //   body: {
    //     plan_id: plan.id,
    //     amount: plan.min_amount
    //   },
    //   credentials: "include"
    // });

    // Show success message
    // useToast().success(`Successfully started staking ${plan.name}!`);
  } catch (err) {
    console.error("Staking error:", err);
    // useToast().error("Failed to start staking. Please try again.");
  } finally {
    isStaking.value = false;
    stakingPlanId.value = null;
  }
};

// Initialize
onMounted(() => {
  fetchStakingPlans();
});
</script>

<style scoped>
/* Optional: Customize scrollbar on mobile */
::-webkit-scrollbar {
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 6px;
}
</style>
