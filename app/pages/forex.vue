<template>
  <main>
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Hero Section -->
      <section
        class="overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900"
      >
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-5xl font-bold tracking-tight md:text-6xl">
                Forex Trading
              </h1>
              <p
                class="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                Trade the world's largest financial market with tight spreads,
                deep liquidity, and 24/5 access to global currency pairs.
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <button
                  class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
                >
                  Trade Forex
                </button>
                <button
                  class="border border-gray-600 dark:border-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  View Live Rates
                </button>
              </div>
            </div>
            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1591696205602-2f950c417dad?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-2xl w-full h-80 object-cover"
                alt="Forex trading global markets"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Major Pairs -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-6">Major Currency Pairs</h2>
            <p
              class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Trade the most popular forex pairs with competitive spreads and
              instant execution.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 text-center"
            >
              <div class="text-2xl font-bold text-green-600 mb-2">EUR/USD</div>
              <p class="text-gray-600 dark:text-gray-300">Euro / US Dollar</p>
              <div class="mt-2 text-sm text-gray-500">Spread: 0.8 pips</div>
            </div>
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 text-center"
            >
              <div class="text-2xl font-bold text-blue-600 mb-2">GBP/USD</div>
              <p class="text-gray-600 dark:text-gray-300">
                British Pound / US Dollar
              </p>
              <div class="mt-2 text-sm text-gray-500">Spread: 1.2 pips</div>
            </div>
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 text-center"
            >
              <div class="text-2xl font-bold text-purple-600 mb-2">USD/JPY</div>
              <p class="text-gray-600 dark:text-gray-300">
                US Dollar / Japanese Yen
              </p>
              <div class="mt-2 text-sm text-gray-500">Spread: 0.9 pips</div>
            </div>
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 text-center"
            >
              <div class="text-2xl font-bold text-red-600 mb-2">AUD/USD</div>
              <p class="text-gray-600 dark:text-gray-300">
                Australian Dollar / US Dollar
              </p>
              <div class="mt-2 text-sm text-gray-500">Spread: 1.1 pips</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trading Features -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-xl w-full h-96 object-cover"
                alt="Forex trading platform"
              />
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-4xl font-bold mb-8">
                Why Trade Forex with Fotmob?
              </h2>
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold mb-2">
                      Competitive Spreads
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Tight spreads starting from 0.8 pips on major pairs.
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold mb-2">Deep Liquidity</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Access to multiple liquidity providers for optimal
                      pricing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-4xl font-bold mb-6">Trade Forex 24/5</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Access global currency markets anytime with our advanced trading
            platform.
          </p>
          <button
            class="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
          >
            Start Forex Trading
          </button>
        </div>
      </section>

      <HeroFooter />
    </div>
  </main>
</template>
