<script setup>
definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();
const message = ref({ type: "", text: "" });
const loading = ref(false);

const form = ref({
  current_password: "",
  new_password: "",
  new_email: "",
});

const updateCredentials = async () => {
  message.value = { type: "", text: "" };
  loading.value = true;

  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/admin-security.php`,
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
      // Clear form inputs
      form.value.new_password = "";
      form.value.current_password = "";
      form.value.new_email = "";
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = {
      type: "error",
      text: "Update failed. Please try again.",
    };
  }

  loading.value = false;
};
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-white">Security Settings</h1>
      <p class="text-gray-400 mt-1">Update your admin email or password</p>
    </div>

    <!-- Alert -->
    <div
      v-if="message.text"
      :class="[
        message.type === 'success' ? 'bg-green-500' : 'bg-red-500',
        'p-4 rounded-md text-white mb-6',
      ]"
    >
      {{ message.text }}
    </div>

    <!-- Form -->
    <div class="bg-gray-800 p-6 rounded-lg shadow-md">
      <form @submit.prevent="updateCredentials" class="space-y-4">
        <!-- New Email -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">
            New Email (optional)
          </label>
          <input
            type="email"
            v-model="form.new_email"
            placeholder="admin@example.com"
            class="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Current Password -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">
            Current Password *
          </label>
          <input
            type="password"
            v-model="form.current_password"
            required
            class="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- New Password -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">
            New Password *
          </label>
          <input
            type="password"
            v-model="form.new_password"
            required
            placeholder="Leave blank to keep current"
            class="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="cursor-pointer w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {{ loading ? "Saving..." : "Update Credentials" }}
        </button>
      </form>
    </div>
  </div>
</template>
