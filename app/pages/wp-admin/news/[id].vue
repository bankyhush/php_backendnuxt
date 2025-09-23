<script setup>
definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const newsId = route.params.id;
const loading = ref(true);
const saving = ref(false);
const message = ref({ type: "", text: "" });

// Form data
const form = ref({
  title: "",
  content: "",
  author: "",
  type: "",
  mylink: "",
  photo: "",
});

// Common news types
const newsTypes = [
  "Breaking News",
  "Market Update",
  "Company News",
  "Trading Tips",
  "Economic Report",
  "Technology",
  "Cryptocurrency",
  "Forex",
  "Stocks",
  "Analysis",
];

// Fetch news details
const fetchNews = async () => {
  loading.value = true;
  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/news-single.php?id=${newsId}`,
      {
        credentials: "include",
      }
    );

    if (res.success) {
      const news = res.news;
      form.value = {
        title: news.title,
        content: news.content,
        author: news.author,
        type: news.type,
        mylink: news.mylink,
        photo: news.photo,
      };
    } else {
      message.value = { type: "error", text: "News article not found" };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to load news details" };
    router.push("/wp-admin/news");
  }
  loading.value = false;
};

// Update news
const updateNews = async () => {
  // Basic form validation
  if (
    !form.value.title ||
    !form.value.content ||
    !form.value.author ||
    !form.value.type
  ) {
    message.value = {
      type: "error",
      text: "Title, content, author, and type are required",
    };
    return;
  }

  saving.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(`${config.public.apiBase}/admin/news-update.php`, {
      method: "POST",
      body: JSON.stringify({
        id: parseInt(newsId),
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
        router.push("/wp-admin/news");
      }, 2000);
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to update news article" };
  }

  saving.value = false;
};

// Load news data on component mount
onMounted(() => {
  fetchNews();
});
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <NuxtLink
        to="/wp-admin/news"
        class="text-blue-400 hover:text-blue-300 flex items-center gap-2"
      >
        ← Back to News
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white mt-2">Edit News Article</h1>
    </div>

    <div v-if="loading" class="text-center p-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"
      ></div>
      <p class="text-gray-300 mt-2">Loading news details...</p>
    </div>

    <div v-else class="bg-gray-800 rounded-lg p-6">
      <form @submit.prevent="updateNews" class="space-y-6">
        <!-- Same form structure as create.vue -->
        <!-- Basic Information -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">
            Article Information
          </h2>
          <div class="space-y-4">
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Title *</label
              >
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                for="content"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Content *</label
              >
              <textarea
                id="content"
                v-model="form.content"
                required
                rows="6"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="author"
                  class="block text-sm font-medium text-gray-300 mb-2"
                  >Author *</label
                >
                <input
                  id="author"
                  v-model="form.author"
                  type="text"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  for="type"
                  class="block text-sm font-medium text-gray-300 mb-2"
                  >Type *</label
                >
                <select
                  id="type"
                  v-model="form.type"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select news type</option>
                  <option
                    v-for="newsType in newsTypes"
                    :key="newsType"
                    :value="newsType"
                  >
                    {{ newsType }}
                  </option>
                  <option value="other">Other</option>
                </select>
                <input
                  v-if="form.type === 'other'"
                  v-model="form.type"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Media & Links -->
        <div>
          <h2 class="text-xl font-semibold text-white mb-4">Media & Links</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="photo"
                class="block text-sm font-medium text-gray-300 mb-2"
                >Photo URL</label
              >
              <input
                id="photo"
                v-model="form.photo"
                type="url"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <br />

              <img
                :src="form.photo"
                v-if="form.photo"
                class="w-20 h-20 mt-4 mb-4"
              />
            </div>

            <div>
              <label
                for="mylink"
                class="block text-sm font-medium text-gray-300 mb-2"
                >External Link</label
              >
              <input
                id="mylink"
                v-model="form.mylink"
                type="url"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
            :disabled="saving"
            class="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {{ saving ? "Updating..." : "Update News Article" }}
          </button>

          <NuxtLink
            to="/wp-admin/news"
            class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
