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
            powerful trading tools and a self-custody wallet.
          </p>
          <div
            class="hidden bg-zinc-900 max-w-2xl rounded-3xl overflow-hidden border border-zinc-800 md:block"
          >
            <div class="text-center">
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
      </div>

      <!-- Right Side -->
      <div
        class="bg-white dark:bg-[#202020] w-full -mt-6 md:w-1/2 p-8 md:p-16 flex flex-col"
      >
        <div
          class="max-w-md mx-auto md:mx-0 md:mr-auto flex-1 flex flex-col justify-center"
        >
          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="mb-4 p-3 text-green-700 bg-green-100 rounded text-sm"
          >
            <UAlert
              color="success"
              variant="subtle"
              title="Success!"
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
              title="Verification Failed"
              :description="errorMessage"
              icon="i-lucide-x-circle"
            />
          </div>

          <!-- Loading Spinner -->
          <div
            v-if="loading"
            class="flex flex-col items-center justify-center mt-8"
          >
            <Icon
              name="gg:spinner-two-alt"
              class="animate-spin text-6xl text-center text-black dark:text-white mb-4"
            />
            <p class="text-gray-600 dark:text-gray-300">
              Verifying your account...
            </p>
          </div>

          <!-- Manual Verification Option (if automatic fails) -->
          <div v-if="showManualVerification" class="mt-6 p-4 border rounded-lg">
            <h3 class="font-bold mb-2">Manual Verification</h3>
            <p class="text-sm mb-3">
              If automatic verification failed, enter the code sent to your
              email:
            </p>
            <div class="flex space-x-2 mb-3">
              <input
                v-for="n in 6"
                :key="n"
                v-model="manualCode[n - 1]"
                @input="handleManualInput(n, $event)"
                type="text"
                maxlength="1"
                class="w-10 h-10 text-center border rounded"
              />
            </div>
            <button
              @click="submitManualVerification"
              class="bg-black text-white px-4 py-2 rounded"
            >
              Verify Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const config = useRuntimeConfig();
const route = useRoute();

const successMessage = ref("");
const errorMessage = ref("");
const loading = ref(true);
const showManualVerification = ref(false);
const manualCode = ref(Array(6).fill(""));

onMounted(async () => {
  const email = route.query.email;
  const code = route.query.code;

  // Validate parameters
  if (!email || !code) {
    errorMessage.value =
      "Invalid verification link. Please check your email for the correct link.";
    loading.value = false;
    showManualVerification.value = true;
    return;
  }

  // Auto-verify using the link parameters
  await verifyAccount(email, code);
});

const verifyAccount = async (email, code) => {
  try {
    loading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    // Use $fetch instead of useFetch for better error handling
    const response = await $fetch(
      `${config.public.apiBase}/auth/verify.php?email=${encodeURIComponent(
        email
      )}&code=${encodeURIComponent(code)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.success) {
      successMessage.value = response.message;

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigateTo("/login");
      }, 3000);
    } else {
      errorMessage.value =
        response.message || "Verification failed. Please try again.";
      showManualVerification.value = true;
    }
  } catch (error) {
    console.error("Verification error:", error);
    errorMessage.value =
      "Network error. Please check your connection and try again.";
    showManualVerification.value = true;
  } finally {
    loading.value = false;
  }
};

const handleManualInput = (index, event) => {
  const value = event.target.value;

  // Only allow numbers
  if (value && !/^\d$/.test(value)) {
    manualCode.value[index - 1] = "";
    return;
  }

  // Auto-submit when all 6 digits are entered
  if (
    manualCode.value.every((digit) => digit !== "") &&
    manualCode.value.length === 6
  ) {
    submitManualVerification();
  }
};

const submitManualVerification = async () => {
  const code = manualCode.value.join("");
  const email = route.query.email;

  if (!email) {
    errorMessage.value =
      "Please use the original verification link from your email.";
    return;
  }

  if (code.length !== 6) {
    errorMessage.value = "Please enter a valid 6-digit code.";
    return;
  }

  await verifyAccount(email, code);
};
</script>
