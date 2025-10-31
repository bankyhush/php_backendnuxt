<template>
  <main>
    <div class="pb-[2px]">
      <HeroHeader />
    </div>

    <div class="bg-white text-black dark:bg-black dark:text-white">
      <!-- Hero Section -->
      <section class="overflow-x-hidden">
        <section>
          <div class="mt-6 pb-24 pt-5 md:pb-32 lg:pb-56 lg:pt-44">
            <div
              class="mx-auto flex max-w-6xl flex-col items-center px-6 lg:flex-row lg:items-start lg:justify-between"
            >
              <!-- Text content -->
              <div class="max-w-xl text-center lg:text-left lg:w-1/2">
                <h1
                  class="mt-8 text-balance text-5xl font-medium md:text-6xl xl:text-7xl"
                >
                  Trade Smarter,<br />Invest Better
                </h1>
                <p class="mt-6 text-lg text-pretty">
                  Access global markets with institutional-grade trading tools.
                  Trade stocks, gold, crypto, and more with competitive pricing
                  and advanced security.
                </p>

                <div
                  class="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
                >
                  <Button
                    size="lg"
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md has-[&gt;svg]:px-4 px-5 text-base"
                  >
                    <NuxtLink to="/login">
                      <span class="text-nowrap">Start Trading</span>
                    </NuxtLink>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-1 border-gray-500 text-black shadow-xs hover:bg-primary/30 h-10 rounded-md has-[&gt;svg]:px-4 px-5 text-base dark:text-white"
                  >
                    <NuxtLink to="/register">
                      <span class="text-nowrap">Request a demo</span>
                    </NuxtLink>
                  </Button>
                </div>
              </div>

              <!-- Responsive video -->
              <div class="mt-6 w-full max-w-lg mb-10 lg:mb-0 lg:w-1/2">
                <video
                  class="w-full h-[400px] object-contain rounded-lg shadow-lg bg-black dark:mix-blend-lighten dark:invert-0"
                  style="visibility: visible"
                  autoplay
                  loop
                  muted
                  playsinline
                  aria-label="Animation of the NS product in action"
                  role="Image"
                >
                  <source src="/clips/EA.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        <!-- Live Market Ticker -->
        <section class="bg-background pb-1 md:pb-3">
          <div class="group relative m-auto max-w-6xl px-6">
            <div class="flex flex-col items-center md:flex-row">
              <div class="relative py-2 md:w-[calc(100%-11rem)]">
                <LiveMarketTicker />

                <!-- Blurs and gradients -->
                <div
                  class="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"
                ></div>
                <div
                  class="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"
                ></div>
                <ProgressiveBlur
                  class="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  :blurIntensity="1"
                />
                <ProgressiveBlur
                  class="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  :blurIntensity="1"
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      <!-- Gold Trading Section -->
      <section
        class="py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/10 dark:via-amber-900/10 dark:to-orange-900/10"
      >
        <div class="container mx-auto max-w-6xl px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="lg:order-2">
              <div class="relative">
                <img
                  src="https://images.unsplash.com/photo-1580094687196-cbc2bdab67e4?auto=format&fit=crop&w=1000&q=80"
                  class="rounded-3xl shadow-2xl w-full h-96 object-cover"
                  alt="Gold bullion and trading"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-yellow-600/20 to-transparent rounded-3xl"
                ></div>
                <!-- Floating price card -->
                <div
                  class="absolute top-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-yellow-200"
                >
                  <div class="text-center">
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Live Gold
                    </div>
                    <div class="text-2xl font-bold text-yellow-600">
                      $1,950.25
                    </div>
                    <div class="text-sm text-green-600 font-semibold">
                      +0.8%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:order-1">
              <div
                class="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clip-rule="evenodd"
                  />
                </svg>
                Precious Metals
              </div>
              <h2
                class="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"
              >
                Trade Gold & Silver
              </h2>
              <p
                class="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
              >
                Diversify your portfolio with physical gold and silver. Hedge
                against inflation and market volatility with the world's most
                trusted precious metals.
              </p>

              <div class="grid grid-cols-2 gap-4 mb-8">
                <div
                  class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-yellow-200 dark:border-yellow-800"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center"
                    >
                      <span class="text-yellow-600 font-bold text-sm">XAU</span>
                    </div>
                    <div>
                      <div class="font-semibold text-yellow-600">Gold</div>
                      <div class="text-2xl font-bold">$1,950.25</div>
                    </div>
                  </div>
                  <div class="text-green-600 font-semibold">+0.8% Today</div>
                </div>

                <div
                  class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
                    >
                      <span
                        class="text-gray-600 dark:text-gray-300 font-bold text-sm"
                        >XAG</span
                      >
                    </div>
                    <div>
                      <div
                        class="font-semibold text-gray-600 dark:text-gray-400"
                      >
                        Silver
                      </div>
                      <div class="text-2xl font-bold">$23.45</div>
                    </div>
                  </div>
                  <div class="text-green-600 font-semibold">+1.2% Today</div>
                </div>
              </div>

              <div class="flex flex-wrap gap-4">
                <!-- ANY BUTTON HERE -->
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stocks Trading Section -->
      <section
        class="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10"
      >
        <div class="container mx-auto max-w-6xl px-6">
          <div class="text-center mb-16">
            <div
              class="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <svg
                class="w-4 h-4"
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
              Equity Markets
            </div>
            <h2
              class="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Global Stock Markets
            </h2>
            <p
              class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Trade thousands of stocks from major exchanges worldwide with
              competitive commissions and real-time data.
            </p>
          </div>

          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
          >
            <div>
              <div
                class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-blue-800"
              >
                <h3
                  class="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
                >
                  Major Exchanges
                </h3>
                <div class="space-y-4">
                  <div
                    class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"
                      >
                        <span class="text-white font-bold text-sm">NY</span>
                      </div>
                      <span class="font-semibold">NYSE</span>
                    </div>
                    <span class="text-green-600 font-bold">Live</span>
                  </div>
                  <div
                    class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center"
                      >
                        <span class="text-white font-bold text-sm">NQ</span>
                      </div>
                      <span class="font-semibold">NASDAQ</span>
                    </div>
                    <span class="text-green-600 font-bold">Live</span>
                  </div>
                  <div
                    class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center"
                      >
                        <span class="text-white font-bold text-sm">LN</span>
                      </div>
                      <span class="font-semibold">LSE</span>
                    </div>
                    <span class="text-green-600 font-bold">Live</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1000&q=80"
                class="rounded-3xl shadow-2xl w-full h-96 object-cover"
                alt="Stock market trading"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent rounded-3xl"
              ></div>
            </div>
          </div>

          <!-- Popular Stocks Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              v-for="stock in popularStocks"
              :key="stock.symbol"
              class="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 group"
            >
              <div
                class="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform"
              >
                {{ stock.symbol }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {{ stock.name }}
              </div>
              <div
                class="text-lg font-semibold"
                :class="stock.change >= 0 ? 'text-green-600' : 'text-red-600'"
              >
                {{ stock.change >= 0 ? "+" : "" }}{{ stock.change }}%
              </div>
              <div
                class="text-2xl font-bold text-gray-900 dark:text-white mt-2"
              >
                {{ stock.price }}
              </div>
              <div
                class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3"
              >
                <div
                  class="bg-green-500 h-2 rounded-full"
                  :style="{ width: stock.volume + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <div class="text-center mt-12">
            <!-- <button
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Explore All Stocks
            </button> -->
          </div>
        </div>
      </section>

      <!-- Crypto Section -->
      <PopularCryptos />

      <!-- Multi-Asset Platform Section -->
      <section
        class="flex flex-col items-center justify-center w-full px-6 py-20 bg-gradient-to-br from-gray-50 to-white dark:from-[#171717] dark:to-black"
      >
        <div class="max-w-4xl text-center space-y-8">
          <div
            class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium"
          >
            <svg
              class="w-5 h-5"
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
            All Markets, One Platform
          </div>
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
          >
            Unified Trading Experience
          </h1>

          <p
            class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
          >
            <i>
              From stocks and gold to cryptocurrencies and forex, trade all
              major asset classes on a single, unified platform. Professional
              tools for every type of investor.
            </i>
          </p>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div class="text-center p-4">
              <div
                class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3"
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div class="font-semibold text-gray-900 dark:text-white">
                Stocks
              </div>
            </div>
            <div class="text-center p-4">
              <div
                class="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3"
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
              <div class="font-semibold text-gray-900 dark:text-white">
                Gold
              </div>
            </div>
            <div class="text-center p-4">
              <div
                class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3"
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div class="font-semibold text-gray-900 dark:text-white">
                Crypto
              </div>
            </div>
            <div class="text-center p-4">
              <div
                class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3"
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div class="font-semibold text-gray-900 dark:text-white">
                Forex
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Feature section -->
      <section class="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
        <div class="@container mx-auto max-w-5xl px-6">
          <div class="text-center">
            <h2 class="text-balance text-4xl font-semibold lg:text-5xl">
              Built for Serious Traders
            </h2>
            <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Institutional-grade tools and features designed for optimal
              trading performance.
            </p>
          </div>
          <div
            class="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16"
          >
            <div
              data-slot="card"
              class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-gray-200 border-1 dark:border-[#32302F] py-6 shadow-sm group shadow-zinc-950/5 hover:shadow-xl transition-all duration-300"
            >
              <div
                data-slot="card-header"
                class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-3"
              >
                <div
                  class="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
                >
                  <div
                    aria-hidden="true"
                    class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
                  ></div>
                  <div
                    aria-hidden="true"
                    class="bg-radial to-background absolute inset-0 from-transparent to-75%"
                  ></div>
                  <div
                    class="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-zap size-6"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h3 class="mt-6 font-medium">Lightning Execution</h3>
              </div>
              <div data-slot="card-content" class="px-6">
                <p class="text-sm">
                  Sub-millisecond order execution with 99.99% uptime across all
                  asset classes.
                </p>
              </div>
            </div>
            <div
              data-slot="card"
              class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-gray-200 border-1 dark:border-[#32302F] py-6 shadow-sm group shadow-zinc-950/5 hover:shadow-xl transition-all duration-300"
            >
              <div
                data-slot="card-header"
                class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-3"
              >
                <div
                  class="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
                >
                  <div
                    aria-hidden="true"
                    class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
                  ></div>
                  <div
                    aria-hidden="true"
                    class="bg-radial to-background absolute inset-0 from-transparent to-75%"
                  ></div>
                  <div
                    class="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-settings2 lucide-settings-2 size-6"
                      aria-hidden="true"
                    >
                      <path d="M20 7h-9"></path>
                      <path d="M14 17H5"></path>
                      <circle cx="17" cy="17" r="3"></circle>
                      <circle cx="7" cy="7" r="3"></circle>
                    </svg>
                  </div>
                </div>
                <h3 class="mt-6 font-medium">Advanced Charting</h3>
              </div>
              <div data-slot="card-content" class="px-6">
                <p class="mt-3 text-sm">
                  Professional charting tools with 100+ indicators and drawing
                  tools for all markets.
                </p>
              </div>
            </div>
            <div
              data-slot="card"
              class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border-gray-200 border-1 dark:border-[#32302F] py-6 shadow-sm group shadow-zinc-950/5 hover:shadow-xl transition-all duration-300"
            >
              <div
                data-slot="card-header"
                class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-3"
              >
                <div
                  class="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]"
                >
                  <div
                    aria-hidden="true"
                    class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
                  ></div>
                  <div
                    aria-hidden="true"
                    class="bg-radial to-background absolute inset-0 from-transparent to-75%"
                  ></div>
                  <div
                    class="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-sparkles size-6"
                      aria-hidden="true"
                    >
                      <path
                        d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
                      ></path>
                      <path d="M20 3v4"></path>
                      <path d="M22 5h-4"></path>
                      <path d="M4 17v2"></path>
                      <path d="M5 18H3"></path>
                    </svg>
                  </div>
                </div>
                <h3 class="mt-6 font-medium">Portfolio Margin</h3>
              </div>
              <div data-slot="card-content" class="px-6">
                <p class="mt-3 text-sm">
                  Cross-margin capabilities and portfolio margin for
                  sophisticated trading strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Rest of your existing sections... -->
      <!-- Eco Section, Start Section, FAQ Section, etc. -->

      <HeroFooter />
    </div>
  </main>
</template>

<script>
export default {
  name: "TradingPlatform",
  data() {
    return {
      popularStocks: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: "$182.63",
          change: 2.3,
          volume: 85,
        },
        {
          symbol: "TSLA",
          name: "Tesla Inc.",
          price: "$245.60",
          change: -1.2,
          volume: 72,
        },
        {
          symbol: "MSFT",
          name: "Microsoft",
          price: "$378.45",
          change: 0.8,
          volume: 68,
        },
        {
          symbol: "AMZN",
          name: "Amazon",
          price: "$152.30",
          change: 1.5,
          volume: 79,
        },
      ],
    };
  },
};
</script>
