<template>
  <div class="pb-[50px]">
    <HeroHeader />
  </div>

  <div
    class="min-h-screen flex flex-col bg-white dark:bg-[#171717] dark:text-white"
  >
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
            powerful trading tools and a self-custody wallet.
          </p>
          <div
            class="hidden bg-zinc-900 max-w-2xl rounded-3xl overflow-hidden border border-zinc-800 md:block"
          >
            <img
              src="/images/f4.webp"
              alt="Trading Chart Preview"
              height="340"
              width="300"
              class="mx-auto"
            />
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div
        class="bg-white dark:bg-[#202020] dark:text-white w-full -mt-10 md:w-1/2 p-8 md:p-16 flex flex-col"
      >
        <div
          class="max-w-md mx-auto md:mx-0 md:mr-auto flex-1 flex flex-col justify-center"
        >
          <h1 class="text-4xl font-bold mb-10 text-black dark:text-white">
            Log in
          </h1>

          <!-- Tabs -->
          <div class="w-full">
            <div class="grid grid-cols-3 mb-10">
              <button
                :class="[
                  'py-2 mr-3 whitespace-nowrap',
                  currentTab === 'email'
                    ? 'border-b-2 dark:border-cyan-500 rounded-none shadow-none dark:text-cyan-400'
                    : '',
                  'cursor-pointer',
                ]"
                @click="currentTab = 'email'"
              >
                Email / Sub-account
              </button>
              <button
                :class="[
                  'hidden md:block py-2 ml-5 whitespace-nowrap',
                  currentTab === 'qr'
                    ? 'border-b-2 dark:border-cyan-500 rounded-none shadow-none dark:text-cyan-400'
                    : '',
                  'cursor-pointer',
                ]"
                @click="currentTab = 'qr'"
              >
                QR code
              </button>
            </div>

            <!-- Email Login -->
            <div v-if="currentTab === 'email'">
              <form
                class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg dark:bg-zinc-800"
                @submit.prevent="loginHandler"
              >
                <!-- Success Message -->
                <div
                  v-if="successMessage"
                  class="mb-4 p-3 text-green-700 bg-green-100 rounded text-sm"
                >
                  <UAlert
                    color="success"
                    variant="subtle"
                    title="Welcome back!"
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
                    title="Login Failed"
                    :description="errorMessage"
                    icon="i-lucide-terminal"
                  />
                </div>
                <!-- Email Field -->
                <div class="mb-5 relative">
                  <Icon
                    name="lucide:mail"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Email or Sub-account"
                    v-model="email"
                    required
                    class="w-full pl-10 pr-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <!-- Password Field -->
                <div class="mb-5 relative">
                  <Icon
                    name="lucide:lock"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Password"
                    v-model="password"
                    required
                    class="w-full pl-10 pr-10 py-1.5 rounded-md border border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <Icon
                      :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                    />
                  </button>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="min-h-[40px] cursor-pointer mb-5 w-full bg-black dark:bg-white dark:text-black text-white hover:shadow-lg py-1.5 rounded-md disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                  <template v-if="isLoading">
                    <Icon
                      name="gg:spinner-two-alt"
                      class="animate-spin text-2xl mx-auto"
                    />
                  </template>
                  <template v-else> Next </template>
                </button>
                <div class="text-center">
                  <NuxtLink
                    to="/request"
                    class="text-zinc-800 dark:text-gray-100 font-mono"
                  >
                    Trouble signing in? Reset your password
                  </NuxtLink>
                </div>
              </form>

              <!-- Sign up Link -->
              <div class="mt-6 text-center">
                <p class="text-gray-600">
                  Don't have an account?
                  <NuxtLink
                    to="/register"
                    class="text-black dark:text-gray-400 font-medium"
                    >Sign up</NuxtLink
                  >
                </p>
              </div>
            </div>

            <!-- QR Login -->
            <div v-else-if="currentTab === 'qr'">
              <div class="mb-6 flex justify-center">
                <div
                  class="w-40 h-40 bg-gray-100 rounded-md flex items-center justify-center"
                >
                  <img
                    src="/clips/br.webp"
                    alt="QR Code"
                    width="160"
                    height="160"
                  />
                </div>
                <div class="ml-4">
                  <video class="w-40 h-40" autoplay muted playsinline>
                    <source src="/clips/sc.mp4" type="video/mp4" />
                    Video not supported
                  </video>
                </div>
              </div>
              <div class="mt-6 text-center">
                <p class="text-gray-600 dark:text-gray-400">
                  Don't have an account?
                  <NuxtLink
                    to="/register"
                    class="text-black dark:text-gray-400 font-medium"
                    >Sign up</NuxtLink
                  >
                </p>
              </div>
            </div>
          </div>

          <!-- reCAPTCHA Footer -->
          <div class="mt-8 text-center text-sm text-gray-500">
            <p>
              This site is protected by Google reCAPTCHA to ensure you’re not a
              bot.
              <NuxtLink
                to="/privacy"
                class="text-black dark:text-gray-400 underline"
              >
                Learn more
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const config = useRuntimeConfig();

const currentTab = ref("email");
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const email = ref("");
const password = ref("");

const loginHandler = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  isLoading.value = true;

  try {
    const res = await $fetch(`${config.public.apiBase}/auth/login.php`, {
      method: "POST",
      body: JSON.stringify({ email: email.value, password: password.value }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.success) {
      successMessage.value = "Login successful. Redirecting...";

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
        // navigateTo("/dashboard");
      }, 2000); // Show success message before redirecting
    } else {
      errorMessage.value = res.message || "Login failed";
    }
  } catch (err) {
    errorMessage.value =
      err?.data?.message || err?.message || "Login failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
