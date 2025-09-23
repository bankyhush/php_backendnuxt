<script setup>
definePageMeta({
  layout: "admin",
});

const router = useRouter();
const config = useRuntimeConfig();

// Form data
const form = ref({
  title: "",
  content: "",
  author: "",
  type: "",
  mylink: "",
  photo: "",
});

const loading = ref(false);
const message = ref({ type: "", text: "" });

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

// Create news
const createNews = async () => {
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

  loading.value = true;
  message.value = { type: "", text: "" };

  try {
    const res = await $fetch(`${config.public.apiBase}/admin/news-create.php`, {
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
        title: "",
        content: "",
        author: "",
        type: "",
        mylink: "",
        photo: "",
      };

      // Redirect to list after 2 seconds
      setTimeout(() => {
        router.push("/wp-admin/news");
      }, 2000);
    } else {
      message.value = { type: "error", text: res.message };
    }
  } catch (error) {
    message.value = { type: "error", text: "Failed to create news article" };
  }

  loading.value = false;
};
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
      <h1 class="text-3xl font-bold text-white mt-2">
        Create New News Article
      </h1>
    </div>

    <div class="bg-gray-800 rounded-lg p-6">
      <form @submit.prevent="createNews" class="space-y-6">
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
                placeholder="Enter news title"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="Write the news content here..."
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  placeholder="Author name"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  placeholder="Specify type"
                  class="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
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
                required
                type="url"
                placeholder="https://example.com/photo.jpg"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-400 mt-1">
                External image URL for the news article
              </p>
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
                required
                placeholder="https://example.com/full-article"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p class="text-xs text-gray-400 mt-1">
                Link to full article (optional)
              </p>
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div v-if="form.photo" class="bg-gray-900/50 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-white mb-2">Photo Preview</h3>
          <img
            :src="form.photo"
            :alt="form.title"
            class="max-w-full h-48 object-cover rounded-md"
            @error="(e) => (e.target.style.display = 'none')"
          />
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
            {{ loading ? "Creating..." : "Create News Article" }}
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
