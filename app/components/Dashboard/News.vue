<template>
  <div class="bg-white dark:bg-[#202020] rounded-xl shadow-sm p-2">
    <!-- Header -->

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse space-y-4">
      <div
        v-for="n in 3"
        :key="n"
        class="border border-gray-200 dark:border-[#303030] rounded-lg p-4"
      >
        <div class="h-4 bg-gray-200 dark:bg-[#202020] rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-200 dark:bg-[#202020] rounded w-1/2 mb-3"></div>
        <div
          class="h-3 bg-gray-200 dark:bg-[#202020] rounded w-full mb-1"
        ></div>
        <div class="h-3 bg-gray-200 dark:bg-[#202020] rounded w-5/6"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <Icon
        name="lucide:alert-circle"
        class="w-8 h-8 text-red-500 mx-auto mb-2"
      />
      <p class="text-red-500 text-sm">
        Please try refreshing the page, or come back later. If the problem
        persists, contact our support team.
      </p>
      <button
        @click="fetchNews"
        class="mt-2 text-blue-500 hover:text-blue-600 text-sm"
      >
        Try Again
      </button>
    </div>

    <!-- No News -->
    <div v-else-if="news.length === 0" class="text-center py-8">
      <Icon
        name="lucide:newspaper"
        class="w-8 h-8 text-gray-400 mx-auto mb-2"
      />
      <p class="text-sm text-gray-500 dark:text-gray-400">
        No news articles found.
      </p>
    </div>

    <!-- News List -->
    <div v-else class="space-y-4">
      <div
        v-for="item in news"
        :key="item.id"
        class="border border-gray-200 dark:border-[#303030] rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
        @click="openNews(item)"
      >
        <div class="flex items-start space-x-4">
          <!-- News Image -->
          <div v-if="item.photo" class="flex-shrink-0">
            <img
              :src="item.photo"
              :alt="item.title"
              class="w-16 h-16 object-cover rounded-lg"
            />
          </div>

          <div class="flex-1 min-w-0">
            <!-- Title and Type -->
            <div class="flex items-center space-x-2 mb-2">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white truncate"
              >
                {{ item.title }}
              </h3>
              <span
                v-if="item.type"
                class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {{ item.type }}
              </span>
            </div>

            <!-- Content Preview -->
            <p
              class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3"
            >
              {{ truncateContent(item.content, 120) }}
            </p>

            <!-- Meta Information -->
            <div
              class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400"
            >
              <div class="flex items-center space-x-3">
                <span v-if="item.author" class="flex items-center">
                  <Icon name="lucide:user" class="w-3 h-3 mr-1" />
                  {{ item.author }}
                </span>
                <span class="flex items-center">
                  <Icon name="lucide:calendar" class="w-3 h-3 mr-1" />
                  {{ formatDate(item.date) }}
                </span>
              </div>

              <button
                @click.stop="openNews(item)"
                class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
              >
                Read more
                <Icon name="lucide:arrow-right" class="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="!loading && pagination.total_pages > 1"
      class="flex justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-[#303030]"
    >
      <div class="text-sm text-gray-500 dark:text-gray-400">
        Showing {{ news.length }} of {{ pagination.total_items }} articles
      </div>
      <div class="flex space-x-2">
        <button
          @click="changePage(pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
          class="px-3 py-1 rounded border border-gray-300 dark:border-[#303030] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#303030] transition-colors"
        >
          Previous
        </button>
        <span class="px-3 py-1 text-sm">
          Page {{ pagination.current_page }} of {{ pagination.total_pages }}
        </span>
        <button
          @click="changePage(pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.total_pages"
          class="px-3 py-1 rounded border border-gray-300 dark:border-[#303030] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-[#303030] transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

// Reactive data
const news = ref([]);
const loading = ref(true);
const error = ref("");
const selectedType = ref("");

// Pagination
const pagination = ref({
  current_page: 1,
  total_pages: 1,
  total_items: 0,
  items_per_page: 5,
});

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Truncate content for preview
const truncateContent = (content, length) => {
  if (!content) return "";
  if (content.length <= length) return content;
  return content.substring(0, length) + "...";
};

// Open news item
const openNews = (item) => {
  if (item.mylink) {
    window.open(item.mylink, "_blank");
  } else {
    // Fallback: show modal or detail page
    console.log("Opening news:", item);
  }
};

// Change page
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.total_pages) {
    pagination.value.current_page = page;
    fetchNews();
  }
};

// Fetch news from API
const fetchNews = async () => {
  loading.value = true;
  error.value = "";

  try {
    const params = new URLSearchParams({
      page: pagination.value.current_page.toString(),
      limit: pagination.value.items_per_page.toString(),
    });

    // Add type filter if selected
    if (selectedType.value) {
      params.append("type", selectedType.value);
    }

    const response = await $fetch(
      `${config.public.apiBase}/user/news.php?${params}`
    );

    if (response.success) {
      news.value = response.data.news;
      pagination.value = response.data.pagination;
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    error.value = err?.data?.message || err?.message || "Failed to load news";
    news.value = [];
  } finally {
    loading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
