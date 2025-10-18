<template>
  <main>
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Hero Section -->
      <section
        class="overflow-hidden py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-blue-900"
      >
        <div class="container mx-auto max-w-7xl px-6 text-center">
          <div class="max-w-4xl mx-auto">
            <h1
              class="text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl"
            >
              Powerful Trading
              <span
                class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >Features</span
              >
            </h1>
            <p
              class="mt-8 text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              Experience institutional-grade trading tools, advanced charting,
              and cutting-edge technology designed for both beginners and
              professional traders.
            </p>
            <div class="mt-12 flex flex-wrap justify-center gap-6">
              <button
                class="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/80 transition transform hover:scale-105 shadow-lg"
              >
                Start Trading Now
              </button>
              <button
                class="border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition transform hover:scale-105"
              >
                Watch Platform Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Trading Platforms -->
      <section class="py-24 bg-white dark:bg-black">
        <div class="container mx-auto max-w-7xl px-6">
          <div class="text-center mb-20">
            <h2 class="text-5xl font-bold mb-6">
              Multi-Platform Trading Experience
            </h2>
            <p
              class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Trade seamlessly across all your devices with synchronized
              accounts and real-time data.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Web Platform -->
            <div
              class="group relative bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500"
            >
              <div
                class="absolute -top-6 left-8 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm"
              >
                Most Popular
              </div>
              <div class="text-center mb-8">
                <div
                  class="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg
                    class="w-10 h-10 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 class="text-3xl font-bold mb-4">Web Platform</h3>
                <p class="text-gray-600 dark:text-gray-300 text-lg">
                  Full-featured browser-based trading with advanced tools and
                  real-time analytics.
                </p>
              </div>
              <ul class="space-y-4 text-left">
                <li
                  class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <svg
                    class="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Advanced charting with 100+ indicators
                </li>
                <li
                  class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <svg
                    class="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  One-click trading execution
                </li>
                <li
                  class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <svg
                    class="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Customizable workspace layouts
                </li>
              </ul>
            </div>

            <!-- Mobile App -->
            <div
              class="group relative bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500"
            >
              <div class="text-center mb-8">
                <div
                  class="bg-green-100 dark:bg-green-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg
                    class="w-10 h-10 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 class="text-3xl font-bold mb-4">Mobile App</h3>
                <p class="text-gray-600 dark:text-gray-300 text-lg">
                  Trade on the go with our award-winning mobile application for
                  iOS and Android.
                </p>
              </div>
              <ul class="space-y-4 text-left">
                <li
                  class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <svg
                    class="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Touch-optimized trading interface
                </li>
                <li
                  class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <svg
                    class="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Push notifications for price alerts
                </li>
                <li
                  class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <svg
                    class="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Biometric authentication security
                </li>
              </ul>
            </div>

            <!-- Desktop App -->
            <div
              class="group relative bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500"
            >
              <div class="text-center mb-8">
                <div
                  class="bg-purple-100 dark:bg-purple-900/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                >
                  <svg
                    class="w-10 h-10 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 class="text-3xl font-bold mb-4">Desktop Pro</h3>
                <p class="text-gray-600 dark:text-gray-300 text-lg">
                  High-performance desktop application for professional traders
                  and institutions.
                </p>
              </div>
              <ul class="space-y-4 text-left">
                <li
                  class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <svg
                    class="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Ultra-low latency execution
                </li>
                <li
                  class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <svg
                    class="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Advanced order types and algorithms
                </li>
                <li
                  class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <svg
                    class="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Multi-monitor support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Advanced Charting -->
      <section class="py-24 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-7xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="text-5xl font-bold mb-8">
                Professional Charting Tools
              </h2>
              <p
                class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Access industry-leading charting technology with over 100
                technical indicators, drawing tools, and customizable timeframes
                for comprehensive market analysis.
              </p>

              <div class="space-y-6">
                <div class="flex items-start gap-6">
                  <div class="bg-blue-600 text-white rounded-2xl p-4 mt-1">
                    <svg
                      class="w-6 h-6"
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
                    <h4 class="text-2xl font-semibold mb-3">
                      100+ Technical Indicators
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      From classic MACD and RSI to proprietary indicators,
                      everything you need for technical analysis.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-6">
                  <div class="bg-green-600 text-white rounded-2xl p-4 mt-1">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-2xl font-semibold mb-3">
                      Advanced Drawing Tools
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Fibonacci retracements, trend lines, channels, and custom
                      pattern recognition tools.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-6">
                  <div class="bg-purple-600 text-white rounded-2xl p-4 mt-1">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-2xl font-semibold mb-3">
                      Multiple Timeframes
                    </h4>
                    <p class="text-gray-600 dark:text-gray-300">
                      Analyze markets from tick data to monthly charts with
                      synchronized multi-timeframe analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80"
                class="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
                alt="Advanced trading charts and analytics"
              />
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trading Tools -->
      <section class="py-24 bg-white dark:bg-black">
        <div class="container mx-auto max-w-7xl px-6">
          <div class="text-center mb-20">
            <h2 class="text-5xl font-bold mb-6">Advanced Trading Tools</h2>
            <p
              class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Professional-grade tools that give you the edge in today's
              fast-moving markets.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              class="group text-center p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div
                class="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 dark:group-hover:bg-red-900/50"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Lightning Execution</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Sub-millisecond order execution with 99.99% uptime and direct
                market access.
              </p>
            </div>

            <div
              class="group text-center p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div
                class="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50"
              >
                <svg
                  class="w-8 h-8 text-blue-600 dark:text-blue-400"
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
              <h3 class="text-2xl font-semibold mb-4">Risk Management</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Advanced risk controls including stop losses, take profits, and
                trailing stops.
              </p>
            </div>

            <div
              class="group text-center p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div
                class="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-900/50"
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Market Depth</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Real-time Level 2 market data showing order book depth and
                liquidity.
              </p>
            </div>

            <div
              class="group text-center p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div
                class="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50"
              >
                <svg
                  class="w-8 h-8 text-purple-600 dark:text-purple-400"
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
              <h3 class="text-2xl font-semibold mb-4">Portfolio Analytics</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Comprehensive portfolio analysis with performance metrics and
                risk assessment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Security Features -->
      <section
        class="py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white"
      >
        <div class="container mx-auto max-w-7xl px-6">
          <div class="text-center mb-20">
            <h2 class="text-5xl font-bold mb-6">Enterprise-Grade Security</h2>
            <p class="text-xl text-blue-200 max-w-3xl mx-auto">
              Your assets and data are protected by institutional-level security
              infrastructure.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1563013541-2d0acd5b32b9?auto=format&fit=crop&w=1200&q=80"
                class="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                alt="Advanced security infrastructure"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-3xl"
              ></div>
            </div>

            <div class="space-y-8">
              <div class="flex items-start gap-6">
                <div class="bg-white/20 rounded-2xl p-4 mt-1 backdrop-blur-sm">
                  <svg
                    class="w-8 h-8 text-white"
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
                  <h3 class="text-3xl font-semibold mb-4">
                    Cold Storage Vaults
                  </h3>
                  <p class="text-blue-200 text-lg">
                    95% of digital assets stored in geographically distributed,
                    access-controlled cold storage facilities with multiple
                    authentication layers.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-6">
                <div class="bg-white/20 rounded-2xl p-4 mt-1 backdrop-blur-sm">
                  <svg
                    class="w-8 h-8 text-white"
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
                  <h3 class="text-3xl font-semibold mb-4">
                    Multi-Signature Protection
                  </h3>
                  <p class="text-blue-200 text-lg">
                    All critical transactions require multiple authorized
                    approvals, eliminating single points of failure and ensuring
                    collective responsibility.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-6">
                <div class="bg-white/20 rounded-2xl p-4 mt-1 backdrop-blur-sm">
                  <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-3xl font-semibold mb-4">
                    24/7 Security Monitoring
                  </h3>
                  <p class="text-blue-200 text-lg">
                    Round-the-clock security operations center with automated
                    threat detection and immediate incident response protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Integration & API -->
      <section class="py-24 bg-white dark:bg-black">
        <div class="container mx-auto max-w-7xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="text-5xl font-bold mb-8">
                Developer API & Integrations
              </h2>
              <p
                class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Build custom trading applications, automate strategies, and
                integrate with your existing systems using our comprehensive
                REST API and WebSocket feeds.
              </p>

              <div class="space-y-6">
                <div class="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-6">
                  <h4 class="text-2xl font-semibold mb-3">REST API</h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Programmatic access to account management, trading
                    operations, and market data with comprehensive documentation
                    and SDKs.
                  </p>
                </div>

                <div class="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-6">
                  <h4 class="text-2xl font-semibold mb-3">WebSocket Feeds</h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Real-time market data streams with low latency and high
                    frequency updates for professional trading applications.
                  </p>
                </div>

                <div class="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-6">
                  <h4 class="text-2xl font-semibold mb-3">FIX Protocol</h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Industry-standard FIX protocol support for institutional
                    clients and algorithmic trading systems.
                  </p>
                </div>
              </div>
            </div>

            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80"
                class="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
                alt="Developer API and code integration"
              />
              <div
                class="absolute inset-0 bg-gradient-to-l from-blue-600/10 to-purple-600/10 rounded-3xl"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Education & Support -->
      <section class="py-24 bg-gray-50 dark:bg-[#171717]">
        <div class="container mx-auto max-w-7xl px-6">
          <div class="text-center mb-20">
            <h2 class="text-5xl font-bold mb-6">Education & Support</h2>
            <p
              class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Comprehensive learning resources and dedicated support to help you
              succeed in your trading journey.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              class="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 hover:shadow-2xl transition-all"
            >
              <div
                class="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              >
                <svg
                  class="w-8 h-8 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Trading Academy</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Comprehensive courses from beginner to advanced levels, covering
                technical analysis, risk management, and trading psychology.
              </p>
              <button class="text-primary font-semibold hover:underline">
                Explore Courses
              </button>
            </div>

            <div
              class="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 hover:shadow-2xl transition-all"
            >
              <div
                class="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
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
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">24/7 Support</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Round-the-clock customer support via live chat, email, and phone
                with average response times under 2 minutes.
              </p>
              <button class="text-primary font-semibold hover:underline">
                Get Support
              </button>
            </div>

            <div
              class="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 hover:shadow-2xl transition-all"
            >
              <div
                class="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              >
                <svg
                  class="w-8 h-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Market Analysis</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Daily market insights, technical analysis reports, and economic
                calendar to keep you informed about market movements.
              </p>
              <button class="text-primary font-semibold hover:underline">
                Read Analysis
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section
        class="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white"
      >
        <div class="container mx-auto max-w-6xl px-6 text-center">
          <h2 class="text-5xl font-bold mb-8">
            Ready to Experience Professional Trading?
          </h2>
          <p class="text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Join millions of traders worldwide who trust Fotmob for their
            trading needs. Get started today and unlock the full potential of
            our advanced trading platform.
          </p>
          <div class="flex flex-wrap justify-center gap-6">
            <button
              class="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl text-lg"
            >
              Start Trading Now
            </button>
            <button
              class="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/10 transition transform hover:scale-105 text-lg"
            >
              Schedule Demo
            </button>
          </div>
          <p class="mt-8 text-blue-200">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <HeroFooter />
    </div>
  </main>
</template>

<script>
export default {
  name: "FeaturesPage",
  head() {
    return {
      title: "Advanced Trading Features - Fotmob",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Discover Fotmob's professional trading features including advanced charting, multi-platform access, enterprise security, and powerful trading tools.",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Custom animations and styles can be added here */
</style>
