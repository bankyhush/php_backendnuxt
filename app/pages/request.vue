<template>
  <div class="pb-[50px]">
    <HeroHeader />
  </div>

  <div class="min-h-screen flex flex-col bg-white dark:bg-[#171717]">
    <div class="flex flex-col md:flex-row flex-1">
      <!-- Left Side -->
      <div
        class="bg-black text-white w-full md:w-1/2 p-8 md:p-16 flex flex-col"
      >
        <div
          class="hidden max-w-md mx-auto md:mx-0 md:ml-auto flex-1 md:flex flex-col justify-center"
        >
          <h1 class="text-4xl md:text-3xl font-bold mb-6">
            Trade with confidence
          </h1>
          <p class="text-lg text-gray-300 mb-12">
            Trusted by millions, delivering the fastest trade execution, with
            powerful trading tools.
          </p>
          <div
            class="hidden bg-zinc-900 max-w-2xl rounded-3xl overflow-hidden border border-zinc-800 md:block"
          >
            <div class="text-center">
              <img
                src="/images/f4.webp"
                alt="Trading Chart"
                height="340"
                width="300"
                class="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div
        class="bg-white dark:bg-[#202020] w-full -mt-6 md:w-1/2 p-8 md:p-16 flex flex-col"
      >
        <div
          class="max-w-md mx-auto md:mx-0 md:mr-auto flex-1 flex flex-col justify-center"
        >
          <h1 class="text-2xl font-bold text-black dark:text-white mb-2">
            Reset your password
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="mb-4 p-3 text-green-700 bg-green-100 rounded text-sm"
          >
            <UAlert
              color="success"
              variant="subtle"
              :description="successMessage"
              icon="i-lucide-check-circle"
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="mb-4 p-3 text-red-700 bg-red-100 rounded text-sm"
          >
            <UAlert
              color="error"
              variant="subtle"
              :description="errorMessage"
              icon="i-lucide-x-circle"
            />
          </div>

          <form @submit.prevent="requestReset" class="space-y-6">
            <!-- Email -->
            <div class="relative">
              <Icon
                name="lucide:mail"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                placeholder="Email address"
                v-model="email"
                :disabled="loading"
                class="w-full pl-10 pr-3 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="min-h-[40px] cursor-pointer w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <template v-if="loading">
                <Icon name="gg:spinner-two-alt" class="animate-spin mx-auto" />
              </template>
              <template v-else>Send Reset Link</template>
            </button>
          </form>

          <div class="text-center mt-6">
            <nuxt-link to="/login" class="text-primary hover:underline"
              >Back to login</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const email = ref("");
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const requestReset = async () => {
  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await $fetch(
      `${config.public.apiBase}/auth/request-reset.php`,
      {
        method: "POST",
        body: { email: email.value },
        credentials: "include",
      }
    );

    if (response.success) {
      successMessage.value = response.message;
      email.value = "";
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    errorMessage.value =
      err?.data?.message || err?.message || "Failed to send reset link";
  } finally {
    loading.value = false;
  }
};
</script>
