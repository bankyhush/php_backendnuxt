<script setup>
definePageMeta({
  layout: "admin",
});

const router = useRouter();
const config = useRuntimeConfig();

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

const loading = ref(false);
const message = ref({ type: "", text: "" });

// Create trading plan
const createPlan = async () => {
  // Basic form validation
  if (!form.value.plan_name || !form.value.plan_des) {
    message.value = {
      type: "error",
      text: "Plan name and description are required",
    };
    return;
  }

  loading.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(`${config.public.apiBase}/admin/plan-create.php`, {
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
        plan_name: "",
        plan_des: "",
        min_ins: "",
        max_ins: "",
        days_duration: "",
        daily_interest_rate: "",
        status: "active",
      };

      // Redirect to list after 2 seconds
      setTimeout(() => {
        router.push("/wp-admin/plans");
      }, 2000);
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to create trading plan" };
  }

  loading.value = false;
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <NuxtLink
        to="/wp-admin/plans"
        class="text-blue-400 hover:text-blue-300 flex items-center gap-2"
      >
        ← Back to Trading Plans
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white mt-2">
        Create New Trading Plan
      </h1>
    </div>

    <div class="bg-gray-800 rounded-lg p-6">
      <form @submit.prevent="createPlan" class="space-y-6">
        <!-- Basic Information -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">
            Plan Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label
                for="plan_name"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Plan Name *</label
              >
              <input
                id="plan_name"
                v-model="form.plan_name"
                type="text"
                required
                placeholder="e.g., Beginner Package, Premium Plan"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="md:col-span-2">
              <label
                for="plan_des"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Plan Description *</label
              >
              <textarea
                id="plan_des"
                v-model="form.plan_des"
                required
                rows="3"
                placeholder="Describe this trading plan..."
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Investment Details -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">
            Investment Details
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="min_ins"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Minimum Investment</label
              >
              <input
                id="min_ins"
                v-model.number="form.min_ins"
                type="number"
                placeholder="e.g., $100 or 100 USD"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="max_ins"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Maximum Investment</label
              >
              <input
                id="max_ins"
                v-model.number="form.max_ins"
                type="number"
                placeholder="e.g., $5000 or 5000 USD"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Duration & Returns -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">
            Duration & Returns
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="days_duration"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Duration (Days)</label
              >
              <input
                id="days_duration"
                v-model="form.days_duration"
                type="text"
                placeholder="e.g., 30 days, 90 days"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="daily_interest_rate"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Daily Interest Rate</label
              >
              <input
                id="daily_interest_rate"
                v-model.number="form.daily_interest_rate"
                type="number"
                placeholder="e.g., 1.5%, 2.0% daily"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
                >Status</label
              >
              <select
                id="status"
                v-model="form.status"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
            {{ loading ? "Creating..." : "Create Plan" }}
          </button>

          <NuxtLink
            to="/wp-admin/plans"
            class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
