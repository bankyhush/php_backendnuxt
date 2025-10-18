<template>
  <main>
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Hero Section -->
      <section
        class="overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-900 dark:to-yellow-900"
      >
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-5xl font-bold tracking-tight md:text-6xl">
                Commodities Trading
              </h1>
              <p
                class="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                Diversify your portfolio with precious metals, energy, and
                agricultural commodities. Trade global markets with competitive
                margins.
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <button
                  class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
                >
                  Trade Commodities
                </button>
                <button
                  class="border border-gray-600 dark:border-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Market Analysis
                </button>
              </div>
            </div>
            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1596436883447-4b4ce3e9a5e9?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-2xl w-full h-80 object-cover"
                alt="Commodities trading gold and oil"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Commodity Categories -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-6">Trade Major Commodities</h2>
            <p
              class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Access diverse commodity markets including precious metals,
              energy, and agricultural products.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div
                class="bg-yellow-100 dark:bg-yellow-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Precious Metals</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Gold, Silver, Platinum, and Palladium with secure storage
                options.
              </p>
            </div>

            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div
                class="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-8 h-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Energy</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Crude Oil, Natural Gas, and other energy commodities.
              </p>
            </div>

            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div
                class="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Agriculture</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Wheat, Corn, Soybeans, Coffee, and other soft commodities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-4xl font-bold mb-6">Diversify with Commodities</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Hedge against inflation and market volatility with physical
            commodities.
          </p>
          <button
            class="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
          >
            Start Trading Commodities
          </button>
        </div>
      </section>

      <HeroFooter />
    </div>
  </main>
</template>
