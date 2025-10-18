<template>
  <main>
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Hero Section -->
      <section
        class="overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-blue-900"
      >
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-5xl font-bold tracking-tight md:text-6xl">
                Stock Trading
              </h1>
              <p
                class="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                Trade thousands of global stocks with competitive pricing,
                advanced tools, and institutional-grade execution. Build your
                portfolio with confidence.
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <button
                  class="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
                >
                  Start Trading Stocks
                </button>
                <button
                  class="border border-gray-600 dark:border-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Explore Markets
                </button>
              </div>
            </div>
            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-2xl w-full h-80 object-cover"
                alt="Stock market trading dashboard"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Market Overview -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold mb-6">Global Stock Markets</h2>
            <p
              class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Access major exchanges worldwide with real-time data and seamless
              execution.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 text-center"
            >
              <div class="text-2xl font-bold text-green-600 mb-2">NYSE</div>
              <p class="text-gray-600 dark:text-gray-300">
                New York Stock Exchange
              </p>
            </div>
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 text-center"
            >
              <div class="text-2xl font-bold text-blue-600 mb-2">NASDAQ</div>
              <p class="text-gray-600 dark:text-gray-300">
                Technology & Growth Stocks
              </p>
            </div>
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 text-center"
            >
              <div class="text-2xl font-bold text-purple-600 mb-2">LSE</div>
              <p class="text-gray-600 dark:text-gray-300">
                London Stock Exchange
              </p>
            </div>
            <div
              class="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 text-center"
            >
              <div class="text-2xl font-bold text-red-600 mb-2">TSE</div>
              <p class="text-gray-600 dark:text-gray-300">
                Tokyo Stock Exchange
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="py-20 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-4xl font-bold mb-8">Advanced Trading Tools</h2>
              <div class="space-y-6">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold mb-2">Real-time Charts</h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Advanced charting tools with technical indicators and
                      drawing capabilities.
                    </p>
                  </div>
                </div>

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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold mb-2">
                      Lightning Execution
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Sub-millisecond order execution with direct market access.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80"
                class="rounded-2xl shadow-xl w-full h-96 object-cover"
                alt="Advanced trading interface"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-20 bg-white dark:bg-black">
        <div class="container mx-auto max-w-4xl px-6 text-center">
          <h2 class="text-4xl font-bold mb-6">Start Trading Stocks Today</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join millions of investors building their wealth through stock
            trading.
          </p>
          <button
            class="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/80 transition"
          >
            Open Trading Account
          </button>
        </div>
      </section>

      <HeroFooter />
    </div>
  </main>
</template>
