<script setup>
definePageMeta({ layout: "admin" });

import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();

const copytraderId = route.params.id;

// form with all fields from Create
const form = ref({
  name: "",
  photo: "",
  notrades: "",
  nocopiers: "",
  status: "",
  nowins: "",
  rank: "",
  strategy_desc: "",
  noloss: "",
  profit: "",
  loss: "",
  edate: "",
  commision: "",
});

const loading = ref(false);
const message = ref({ type: "", text: "" });

// Load existing data to fill form
onMounted(async () => {
  if (!copytraderId) {
    message.value = { type: "error", text: "Missing copytrader ID" };
    return;
  }
  loading.value = true;
  try {
    const res = await $fetch(
      `${config.public.apiBase}/admin/copytrader-single.php?id=${copytraderId}`,
      {
        credentials: "include",
      }
    );

    if (res && res.success && res.copytrader) {
      const ct = res.copytrader; 
      form.value = {
        name: ct.name ?? "",
        photo: ct.photo ?? "",
        notrades: ct.notrades ?? "",
        nocopiers: ct.nocopiers ?? "",
        status: ct.status ?? "active",
        nowins: ct.nowins ?? "",
        rank: ct.rank ?? "",
        strategy_desc: ct.strategy_desc ?? "",
        noloss: ct.noloss ?? "",
        profit: ct.profit ?? "",
        loss: ct.loss ?? "",
        edate: ct.edate ?? "",
        commision: ct.commision ?? "",
      };
    } else {
      message.value = { type: "error", text: "Copytrader data not found." };
    }
  } catch (error) {
    router.push("/wp-admin/copytrader");
    message.value = { type: "error", text: "Failed to load data" };
  } finally {
    loading.value = false;
  }
});

// Submit updated data
const updateCopytrader = async () => {
  loading.value = true;
  message.value = { type: "", text: "" };
  try {
    const payload = {
      ...form.value,
      id: copytraderId,
      commision: parseInt(form.value.commision || 0),
    };
    const res = await $fetch(
      `${config.public.apiBase}/admin/copytrader-update.php`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.success) {
      message.value = { type: "success", text: res.message };
      setTimeout(() => router.push("/wp-admin/copytrader"), 2000);
    } else {
      message.value = { type: "error", text: res.message || "Update failed." };
    }
  } catch (error) {
    message.value = { type: "error", text: "Something went wrong." };
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <NuxtLink to="/wp-admin/copytrader" class="text-blue-400 hover:text-blue-300 flex items-center gap-2">
        ← Back to Copytraders
      </NuxtLink>
      <h1 class="text-3xl font-bold text-white mt-2">Edit Copytrader</h1>
    </div>

    <!-- Message Alert -->
    <div
      v-if="message.text"
      :class="[
        'p-4 rounded-md mb-6',
        message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
      ]"
    >
      {{ message.text }}
    </div>

    <div class="bg-gray-800 rounded-lg p-6">
      <form @submit.prevent="updateCopytrader" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="md:col-span-2">
          <h2 class="text-xl font-semibold text-white mb-4">Basic Information</h2>
        </div>

        <div class="md:col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Name *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="md:col-span-2">
          <label for="photo" class="block text-sm font-medium text-gray-300 mb-2">Photo URL</label>
          <p class="text-sm text-gray-400 mb-2">
            Upload your image to one of the free image hosts below, then paste the image **direct URL** (ends in .jpg, .png, etc):
            <ul class="list-disc list-inside text-blue-400 mt-1 space-y-1">
              <li><a href="https://imgbb.com/" target="_blank" rel="noopener" class="hover:underline">imgbb.com</a></li>
              <li><a href="https://postimages.org/" target="_blank" rel="noopener" class="hover:underline">postimages.org</a></li>
              <li><a href="https://imgur.com/upload" target="_blank" rel="noopener" class="hover:underline">Imgur (free dev)</a></li>
            </ul>
          </p>
          <br/>
        <img :src="form.photo" v-if="form.photo" class="w-20 h-20 mb-5" />

          <input
            id="photo"
            v-model="form.photo"
            type="url"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://i.imgur.com/Q2Gp1B3.png"
          />
        </div>

        <div class="md:col-span-2">
          <label for="strategy_desc" class="block text-sm font-medium text-gray-300 mb-2">Strategy Description *</label>
          <textarea
            id="strategy_desc"
            v-model="form.strategy_desc"
            required
            rows="3"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Statistics -->
        <div class="md:col-span-2">
          <h2 class="text-xl font-semibold text-white mb-4">Statistics</h2>
        </div>

        <div>
          <label for="notrades" class="block text-sm font-medium text-gray-300 mb-2">Number of Trades</label>
          <input
            id="notrades"
            v-model="form.notrades"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="nocopiers" class="block text-sm font-medium text-gray-300 mb-2">Number of Copiers</label>
          <input
            id="nocopiers"
            v-model="form.nocopiers"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="nowins" class="block text-sm font-medium text-gray-300 mb-2">Number of Wins</label>
          <input
            id="nowins"
            v-model="form.nowins"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="noloss" class="block text-sm font-medium text-gray-300 mb-2">Number of Loss</label>
          <input
            id="noloss"
            v-model="form.noloss"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Performance -->
        <div class="md:col-span-2">
          <h2 class="text-xl font-semibold text-white mb-4">Performance</h2>
        </div>

        <div>
          <label for="profit" class="block text-sm font-medium text-gray-300 mb-2">Profit ($)</label>
          <input
            id="profit"
            v-model="form.profit"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="loss" class="block text-sm font-medium text-gray-300 mb-2">Loss ($)</label>
          <input
            id="loss"
            v-model="form.loss"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="rank" class="block text-sm font-medium text-gray-300 mb-2">Rank</label>
          <input
            id="rank"
            v-model="form.rank"
            type="text"
            required
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="commision" class="block text-sm font-medium text-gray-300 mb-2">Commission (%)</label>
          <input
            id="commision"
            v-model.number="form.commision"
            type="number"
            step="1"
            required
            min="0"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Settings -->
        <div class="md:col-span-2">
          <h2 class="text-xl font-semibold text-white mb-4">Settings</h2>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-300 mb-2">Status</label>
          <select
            id="status"
            v-model="form.status"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label for="edate" class="block text-sm font-medium text-gray-300 mb-2">Expiration Date</label>
          <input
            id="edate"
            v-model="form.edate"
            type="text"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

         <!-- Message Alert -->
    <div
      v-if="message.text"
      :class="[
        'p-4 rounded-md mb-6',
        message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
      ]"
    >
      {{ message.text }}
    </div>

        <div class="md:col-span-2 flex gap-4 pt-6 border-t border-gray-700">
          <button
            type="submit"
            :disabled="loading"
            class="cursor-pointer px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {{ loading ? "Updating..." : "Update Copytrader" }}
          </button>

          <NuxtLink
            to="/wp-admin/copytrader"
            class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
