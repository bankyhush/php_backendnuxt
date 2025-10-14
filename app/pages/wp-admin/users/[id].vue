<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const userId = route.params.id;
const user = ref(null);
const loading = ref(true);
const saving = ref(false);
const message = ref({ type: "", text: "" });

// Form data
const form = ref({
  fullname: "",
  email: "",
  role: "user",
});

// Fetch user details
const fetchUser = async () => {
  loading.value = true;
  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/get-user.php?id=${userId}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      user.value = res.user;
      form.value = {
        fullname: res.user.fullname,
        email: res.user.email,
        role: res.user.role,
      };
    } else {
      message.value = { type: "error", text: "User not found" };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to load user details" };
    router.push("/wp-admin/users");
  }
  loading.value = false;
};

// Update user
const updateUser = async () => {
  saving.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(`${config.public.apiBase}/admin/update-user.php`, {
      method: "POST",
      body: JSON.stringify({
        id: parseInt(userId),
        ...form.value,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      message.value = { type: "success", text: res.message };
      // Redirect back to users list after 2 seconds
      setTimeout(() => {
        router.push("/wp-admin/users");
      }, 2000);
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to update user" };
  }

  saving.value = false;
};

// Load user data on component mount
onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-6">
      <NuxtLink
        to="/wp-admin/users"
        class="text-blue-400 hover:text-blue-300 flex items-center gap-2"
      >
        ← Back to Users
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white mt-2">Edit User</h1>
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

    <div v-if="loading" class="text-center p-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
      ></div>
      <p class="text-gray-300 mt-2">Loading user details...</p>
    </div>

    <div v-else class="bg-gray-800 rounded-lg p-6">
      <form @submit.prevent="updateUser" class="space-y-6">
        <div>
          <label
            for="fullname"
            class="block text-sm font-medium text-gray-300 mb-2"
          >
            Full Name
          </label>
          <input
            id="fullname"
            v-model="form.fullname"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            for="role"
            class="block text-sm font-medium text-gray-300 mb-2"
          >
            Role
          </label>
          <select
            id="role"
            v-model="form.role"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            readonly
          >
            <option value="user">User</option>
          </select>
        </div>

        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            :disabled="saving"
            class="whitespace-nowrap cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {{ saving ? "Saving..." : "Update User" }}
          </button>

          <NuxtLink
            to="/wp-admin/users"
            class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </NuxtLink>
        </div>
      </form>
    </div>

    <div
      class="mb-6 p-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4"
    >
      <button
        type="submit"
        class="cursor-pointer px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Manage History
      </button>

      <button
        type="submit"
        class="cursor-pointer px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Create History
      </button>

      <button
        type="submit"
        class="cursor-pointer px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Credit & Debit Balances
      </button>

      <button
        type="submit"
        class="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Manage Trade Records
      </button>

      <button
        type="submit"
        class="cursor-pointer px-6 py-2 bg-fuchsia-800 text-white rounded-md hover:bg-fuchsia-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Create Trade Records
      </button>

      <button
        type="submit"
        class="cursor-pointer px-6 py-2 bg-pink-700 text-white rounded-md hover:bg-pink-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Stake History
      </button>

      <button
        type="submit"
        class="cursor-pointer px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Investment History
      </button>

      <button
        type="submit"
        class="cursor-pointer px-6 py-2 bg-lime-700 text-white rounded-md hover:bg-lime-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Send Email
      </button>

      <button
        type="submit"
        class="cursor-pointer px-6 py-2 bg-rose-700 text-white rounded-md hover:bg-rose-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Convert Order & Stake & Available Balances
      </button>
    </div>
  </div>
</template>
