<script setup>
// This page automatically gets auth protection from the layout
definePageMeta({
  layout: "user",
});

// Inject the user data provided by the layout
const user = inject("authUser");
const config = useRuntimeConfig();

// Reactive data
const formData = ref({
  certificate_type: "",
  front_file: null,
  back_file: null,
});

const previews = ref({
  front: null,
  back: null,
});

const loading = ref(false);
const message = ref({ type: "", text: "" });

// Handle file selection with preview
const handleFileSelect = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type and size
  const validTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxSize = 4 * 1024 * 1024; // 4MB

  if (!validTypes.includes(file.type)) {
    message.value = {
      type: "error",
      text: "Please select JPG, PNG, or PDF files only",
    };
    event.target.value = "";
    return;
  }

  if (file.size > maxSize) {
    message.value = { type: "error", text: "File size must be less than 4MB" };
    event.target.value = "";
    return;
  }

  formData.value[`${type}_file`] = file;

  // Create preview for images
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previews.value[type] = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    previews.value[type] = null;
  }

  message.value = { type: "", text: "" };
};

// Submit KYC form
const submitKYC = async () => {
  if (!formData.value.certificate_type) {
    message.value = { type: "error", text: "Please select certificate type" };
    return;
  }

  if (!formData.value.front_file || !formData.value.back_file) {
    message.value = {
      type: "error",
      text: "Please upload both front and back documents",
    };
    return;
  }

  loading.value = true;
  message.value = { type: "", text: "" };

  try {
    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append("certificate_type", formData.value.certificate_type);
    submitData.append("front_file", formData.value.front_file);
    submitData.append("back_file", formData.value.back_file);

    const response = await $fetch(
      `${config.public.apiBase}/user/kyc_update.php`,
      {
        method: "POST",
        body: submitData,
        credentials: "include",
      }
    );

    if (response.success) {
      message.value = { type: "success", text: response.message };

      // Reset form on success
      formData.value = {
        certificate_type: "",
        front_file: null,
        back_file: null,
      };
      previews.value = { front: null, back: null };

      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => (input.value = ""));

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigateTo("/profile");
      }, 3000);
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    message.value = {
      type: "error",
      text:
        err?.data?.message || err?.message || "Failed to submit KYC documents",
    };
  } finally {
    loading.value = false;
  }
};

// Clear preview
const clearPreview = (type) => {
  previews.value[type] = null;
  formData.value[`${type}_file`] = null;
  const input = document.querySelector(`input[name="${type}File"]`);
  if (input) input.value = "";
};
</script>

<template>
  <div
    class="max-w-3xl mx-auto px-6 py-12 min-h-screen bg-gray-50 text-black dark:bg-background/50"
  >
    <div
      class="bg-white rounded-xl shadow-md p-8 space-y-8 dark:bg-[#202020] dark:text-white"
    >
      <h1 class="text-3xl font-bold">Identity Verification</h1>
      <p class="text-gray-600 dark:text-white">
        Please upload the required documents to verify your identity. Ensure all
        images are clear and legible.
      </p>

      <div
        class="text-sm bg-yellow-50 py-3 px-4 rounded-md text-yellow-800 border border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700"
      >
        <b>Documents required:</b>
        <ul class="list-disc ml-6 mt-2">
          <li>Front of ID</li>
          <li>Back of ID</li>
        </ul>
        <p class="mt-2">
          Only JPG, PNG, or PDF files under 4MB each are accepted.
        </p>
      </div>

      <!-- Success/Error Message -->
      <div
        v-if="message.text"
        :class="[
          message.type === 'success'
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
          'p-3 rounded-md text-sm border',
        ]"
      >
        {{ message.text }}
      </div>

      <form @submit.prevent="submitKYC" class="space-y-6">
        <!-- Certificate Type -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Certificate Type
          </label>
          <select
            v-model="formData.certificate_type"
            required
            class="w-full border border-gray-300 rounded-md p-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="">-- Select Certificate Type --</option>
            <option value="passport">Passport</option>
            <option value="national_id">National ID</option>
            <option value="driver_license">Driver's License</option>
            <option value="voter_card">Voter Card</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Front ID -->
          <div
            class="border border-gray-300 rounded-md p-4 dark:border-gray-600"
          >
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-white mb-2"
            >
              Upload Front of ID
            </label>

            <!-- Preview -->
            <div v-if="previews.front" class="relative mb-2">
              <img
                :src="previews.front"
                alt="Front ID preview"
                class="w-full h-48 object-contain rounded border"
              />
              <button
                type="button"
                @click="clearPreview('front')"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>

            <!-- Placeholder -->
            <div
              v-else
              class="w-full h-48 bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-300 text-sm mb-2 rounded border-2 border-dashed"
            >
              <div class="text-center">
                <Icon name="lucide:upload" class="w-8 h-8 mx-auto mb-2" />
                <span>Front ID Preview</span>
              </div>
            </div>

            <input
              type="file"
              name="frontFile"
              accept="image/jpeg,image/png,application/pdf"
              @change="(e) => handleFileSelect(e, 'front')"
              class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:text-white"
            />
          </div>

          <!-- Back ID -->
          <div
            class="border border-gray-300 rounded-md p-4 dark:border-gray-600"
          >
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-white mb-2"
            >
              Upload Back of ID
            </label>

            <!-- Preview -->
            <div v-if="previews.back" class="relative mb-2">
              <img
                :src="previews.back"
                alt="Back ID preview"
                class="w-full h-48 object-contain rounded border"
              />
              <button
                type="button"
                @click="clearPreview('back')"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>

            <!-- Placeholder -->
            <div
              v-else
              class="w-full h-48 bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-300 text-sm mb-2 rounded border-2 border-dashed"
            >
              <div class="text-center">
                <Icon name="lucide:upload" class="w-8 h-8 mx-auto mb-2" />
                <span>Back ID Preview</span>
              </div>
            </div>

            <input
              type="file"
              name="backFile"
              accept="image/jpeg,image/png,application/pdf"
              @change="(e) => handleFileSelect(e, 'back')"
              class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:text-white"
            />
          </div>
        </div>

        <div class="text-right">
          <button
            type="submit"
            :disabled="loading"
            class="flex justify-center items-center gap-1 cursor-pointer bg-[#202020] text-white font-medium py-2 px-6 rounded-md dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="hugeicons:security-lock" width="24" height="24" />
            <span v-if="loading">Processing...</span>
            <span v-else>Submit Verification</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
