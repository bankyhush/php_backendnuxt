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
  plan_name: "",
  plan_des: "",
  min_ins: "",
  max_ins: "",
  days_duration: "",
  daily_interest_rate: "",
  status: "active",
});

// Fetch plan details
const fetchPlan = async () => {
  loading.value = true;
  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/plan-single.php?id=${planId}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      const plan = res.plan;
      form.value = {
        plan_name: plan.plan_name,
        plan_des: plan.plan_des,
        min_ins: plan.min_ins,
        max_ins: plan.max_ins,
        days_duration: plan.days_duration,
        daily_interest_rate: plan.daily_interest_rate,
        status: plan.status,
      };
    } else {
      message.value = { type: "error", text: "Trading plan not found" };
    }
  } catch (error) {
    message.value = {
      type: "error",
      text: "Failed to load trading plan details",
    };
    router.push("/wp-admin/plans");
  }
  loading.value = false;
};

// Update plan
const updatePlan = async () => {
  // Basic form validation
  if (!form.value.plan_name || !form.value.plan_des) {
    message.value = {
      type: "error",
      text: "Plan name and description are required",
    };
    return;
  }

  saving.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(`${config.public.apiBase}/admin/plan-update.php`, {
      method: "POST",
      body: JSON.stringify({
        id: parseInt(planId),
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
        router.push("/wp-admin/plans");
      }, 2000);
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to update trading plan" };
  }

  saving.value = false;
};

// Reset form to original values
const resetForm = () => {
  fetchPlan();
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
        to="/wp-admin/plans"
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
        Back to Trading Plans
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white">Edit Trading Plan</h1>
      <p class="text-gray-400 mt-2">
        Update trading plan information and settings
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
                for="plan_name"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Plan Name *
              </label>
              <input
                id="plan_name"
                v-model="form.plan_name"
                type="text"
                required
                placeholder="e.g., Beginner Package, Premium Plan"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div class="md:col-span-2">
              <label
                for="plan_des"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Plan Description *
              </label>
              <textarea
                id="plan_des"
                v-model="form.plan_des"
                required
                rows="4"
                placeholder="Describe this trading plan in detail..."
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
              ></textarea>
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
                for="min_ins"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Minimum Investment
              </label>
              <input
                id="min_ins"
                v-model.number="form.min_ins"
                type="number"
                placeholder="e.g., $100, €500, 1000 USD"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">
                Enter the minimum investment amount
              </p>
            </div>

            <div>
              <label
                for="max_ins"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Maximum Investment
              </label>
              <input
                id="max_ins"
                v-model.number="form.max_ins"
                type="number"
                placeholder="e.g., $5000, €10000, 50000 USD"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">
                Enter the maximum investment amount
              </p>
            </div>
          </div>
        </div>

        <!-- Duration & Returns -->
        <div class="space-y-6">
          <h2
            class="text-xl font-semibold text-white pb-2 border-b border-gray-700"
          >
            Duration & Returns
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="days_duration"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Duration (Days)
              </label>
              <input
                id="days_duration"
                v-model="form.days_duration"
                type="text"
                placeholder="e.g., 30, 90, 180, 365"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">Plan duration in days</p>
            </div>

            <div>
              <label
                for="daily_interest_rate"
                class="block text-sm font-medium text-gray-300 mb-2"
              >
                Daily Interest Rate
              </label>
              <input
                id="daily_interest_rate"
                v-model.number="form.daily_interest_rate"
                type="number"
                placeholder="e.g., 1.5%, 2.0%, 3.5% daily"
                class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">
                Daily interest rate percentage
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
                <option value="active">
                  🟢 Active - Plan is available for investment
                </option>
                <option value="inactive">
                  🔴 Inactive - Plan is not available
                </option>
              </select>
              <p class="text-xs text-gray-400 mt-1">
                Control plan availability
              </p>
            </div>
          </div>
        </div>

        <!-- Plan Summary Preview -->
        <div class="bg-gray-900/30 rounded-lg p-6 border border-gray-700">
          <h3 class="text-lg font-semibold text-white mb-4">
            Plan Summary Preview
          </h3>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm"
          >
            <div class="text-center p-3 bg-gray-800 rounded-lg">
              <div class="text-gray-400">Plan Name</div>
              <div class="text-white font-medium truncate">
                {{ form.plan_name || "Not set" }}
              </div>
            </div>
            <div class="text-center p-3 bg-gray-800 rounded-lg">
              <div class="text-gray-400">Investment Range</div>
              <div class="text-white font-medium">
                {{ form.min_ins || "N/A" }} Min -
                {{ form.max_ins || "N/A" }} Max
              </div>
            </div>
            <div class="text-center p-3 bg-gray-800 rounded-lg">
              <div class="text-gray-400">Duration</div>
              <div class="text-white font-medium">
                {{ form.days_duration || "N/A" }}
              </div>
            </div>
            <div class="text-center p-3 bg-gray-800 rounded-lg">
              <div class="text-gray-400">Daily Interest</div>
              <div class="text-white font-medium">
                {{ form.daily_interest_rate || "N/A" }}%
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
            <span v-else>💾 Update Trading Plan</span>
          </button>

          <NuxtLink
            to="/wp-admin/plans"
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
