<template>
  <main>
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Hero Section -->
      <section
        class="overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-orange-900"
      >
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-5xl font-bold tracking-tight md:text-6xl">
                Crypto Trading
              </h1>
              <p
                class="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                Trade hundreds of cryptocurrencies with advanced security, low
                fees, and institutional-grade trading tools.
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <button
                  class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
                >
                  Trade Crypto
                </button>
                <button
                  class="border border-gray-600 dark:border-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  View All Coins
                </button>
              </div>
            </div>
            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-2xl w-full h-80 object-cover"
                alt="Cryptocurrency trading"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Cryptos -->
      <PopularCryptos />

      <!-- Security Features -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-4xl font-bold mb-8">Secure Crypto Trading</h2>
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div
                    class="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 mt-1"
                  >
                    <svg
                      class="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold mb-2">Cold Storage</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      95% of assets stored in secure offline cold wallets.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                    class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mt-1"
                  >
                    <svg
                      class="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold mb-2">
                      Insurance Protection
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Comprehensive insurance coverage for digital assets.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-xl w-full h-96 object-cover"
                alt="Crypto security"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-4xl font-bold mb-6">Join the Crypto Revolution</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start trading cryptocurrencies with confidence and security.
          </p>
          <button
            class="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
          >
            Get Started with Crypto
          </button>
        </div>
      </section>

      <HeroFooter />
    </div>
  </main>
</template>
