<script setup>
definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();

// State
const news = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const deleteLoading = ref(false);
const message = ref({ type: "", text: "" });

// Fetch news function
const fetchNews = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    if (searchQuery.value) {
      params.append("search", searchQuery.value);
    }

    const res = await $fetch(
      `${config.public.apiBase}/admin/news-list.php?${params}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      news.value = res.news;
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to load news" };
  }
  loading.value = false;
};

// Search with debounce
let searchTimeout;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(fetchNews, 300);
};

// Delete news function
const deleteNews = async (newsId, newsTitle) => {
  if (
    !confirm(
      `Are you sure you want to delete news "${newsTitle}"? This action cannot be undone.`
    )
  ) {
    return;
  }

  deleteLoading.value = true;
  try {
    const res = await $fetch(`${config.public.apiBase}/admin/news-delete.php`, {
      method: "POST",
      body: JSON.stringify({ id: newsId }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      message.value = { type: "success", text: res.message };
      await fetchNews(); // Refresh the list
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to delete news" };
  }
  deleteLoading.value = false;
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

// Truncate content for preview
const truncateContent = (content, length = 100) => {
  if (!content) return "";
  return content.length > length
    ? content.substring(0, length) + "..."
    : content;
};

// Load news on component mount
onMounted(() => {
  fetchNews();
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">News Management</h1>
      <div class="flex gap-4">
        <div class="text-gray-300">Total News: {{ news.length }}</div>
        <NuxtLink
          to="/wp-admin/news/create"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          + Add New News
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
            placeholder="Search news by title, content, or author..."
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- News Table -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="text-gray-300 mt-2">Loading news...</p>
      </div>

      <div v-else-if="news.length === 0" class="p-8 text-center">
        <p class="text-gray-300">No news articles found</p>
        <NuxtLink
          to="/wp-admin/news/create"
          class="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Create First News Article
        </NuxtLink>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                News Article
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Author & Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Media
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700">
            <tr v-for="item in news" :key="item.id" class="hover:bg-gray-750">
              <td class="px-6 py-4">
                <div>
                  <div class="text-sm font-medium text-white">
                    {{ truncateContent(item.title, 10) }}
                  </div>
                  <div class="text-sm text-gray-300 mt-1">
                    {{ truncateContent(item.content, 10) }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-300">
                  <div class="font-medium">{{ item.author }}</div>
                  <div
                    class="text-xs bg-blue-500 text-white px-2 py-1 rounded-full inline-block mt-1"
                  >
                    {{ item.type }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-300 space-y-1">
                  <div v-if="item.photo" class="flex items-center">
                    <span class="text-green-400">📷 Has Photo</span>
                  </div>
                  <div v-else class="text-gray-500">No Photo</div>
                  <div v-if="item.mylink" class="flex items-center">
                    <span class="text-blue-400">🔗 Has Link</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {{ formatDate(item.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <NuxtLink
                    :to="`/wp-admin/news/${item.id}`"
                    class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="deleteNews(item.id, item.title)"
                    :disabled="deleteLoading"
                    class="cursor-pointer px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
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
