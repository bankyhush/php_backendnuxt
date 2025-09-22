<script setup>
definePageMeta({
  layout: "admin",
});

const user = inject("authUser");
const config = useRuntimeConfig();

// State
const users = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const deleteLoading = ref(false);
const message = ref({ type: "", text: "" });

// Fetch users function
const fetchUsers = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (searchQuery.value) {
      params.append("search", searchQuery.value);
    }

    const res = await $fetch(
      `${config.public.apiBase}/admin/get-all-users.php?${params}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      users.value = res.users;
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to load users" };
  }
  loading.value = false;
};

// Search with debounce
let searchTimeout;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(fetchUsers, 300);
};

// Delete user function
const deleteUser = async (userId, userName) => {
  if (
    !confirm(
      `Are you sure you want to delete user "${userName}"? This action cannot be undone.`
    )
  ) {
    return;
  }

  deleteLoading.value = true;
  try {
    const res = await $fetch(`${config.public.apiBase}/admin/delete-user.php`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      message.value = { type: "success", text: res.message };
      await fetchUsers(); // Refresh the list
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to delete user" };
  }
  deleteLoading.value = false;
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Load users on component mount
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 overflow-hidden">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">User Management</h1>
      <div class="text-gray-300 font-bold text-2xl">
        Total Users: ({{ users.length }})
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
            placeholder="Search users by name or email..."
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="text-gray-300 mt-2">Loading users...</p>
      </div>

      <div v-else-if="users.length === 0" class="p-8 text-center">
        <p class="text-gray-300">No users found</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                User
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Joined
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
              v-for="userItem in users"
              :key="userItem.id"
              class="hover:bg-gray-750"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-white">
                    {{ userItem.fullname }}
                  </div>
                  <div class="text-sm text-gray-300">{{ userItem.email }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs rounded-full',
                    userItem.role === 'admin'
                      ? 'bg-purple-500 text-white'
                      : 'bg-blue-500 text-white',
                  ]"
                >
                  {{ userItem.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {{ formatDate(userItem.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <NuxtLink
                    :to="`/wp-admin/users/${userItem.id}`"
                    class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="deleteUser(userItem.id, userItem.fullname)"
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
