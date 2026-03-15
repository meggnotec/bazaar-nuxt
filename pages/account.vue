<template>
  <div>
    <HeroAlt title="My Account" subtitle="Manage your profile, orders, and preferences" />

    <section class="section">
      <div class="container-custom max-w-4xl">
        <!-- Auth tabs -->
        <div v-if="!isLoggedIn" id="auth-section">
          <div class="flex border-b border-surface-200 dark:border-surface-700 mb-8">
            <button
              type="button"
              class="px-6 py-3 font-heading font-semibold text-sm border-b-2 transition-colors"
              :class="authTab === 'login'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'"
              @click="authTab = 'login'"
            >
              Sign In
            </button>
            <button
              type="button"
              class="px-6 py-3 font-heading font-semibold text-sm border-b-2 transition-colors"
              :class="authTab === 'register'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'"
              @click="authTab = 'register'"
            >
              Register
            </button>
          </div>

          <!-- Login form -->
          <div v-show="authTab === 'login'" class="max-w-md mx-auto">
            <form class="space-y-4" novalidate @submit.prevent="handleLogin">
              <div>
                <label for="login-email" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Email</label>
                <input type="email" id="login-email" class="input" placeholder="you@example.com" />
              </div>
              <div>
                <label for="login-password" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Password</label>
                <input type="password" id="login-password" class="input" placeholder="••••••••" />
              </div>
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
                  <input type="checkbox" class="rounded border-surface-300" /> Remember me
                </label>
                <a href="#" class="text-sm text-primary-500 hover:text-primary-600">Forgot password?</a>
              </div>
              <button type="submit" class="btn-primary w-full">Sign In</button>
            </form>
          </div>

          <!-- Register form -->
          <div v-show="authTab === 'register'" class="max-w-md mx-auto">
            <form class="space-y-4" novalidate @submit.prevent="handleLogin">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="reg-first" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">First Name</label>
                  <input type="text" id="reg-first" class="input" />
                </div>
                <div>
                  <label for="reg-last" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Last Name</label>
                  <input type="text" id="reg-last" class="input" />
                </div>
              </div>
              <div>
                <label for="reg-email" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Email</label>
                <input type="email" id="reg-email" class="input" />
              </div>
              <div>
                <label for="reg-password" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Password</label>
                <input type="password" id="reg-password" class="input" />
              </div>
              <button type="submit" class="btn-primary w-full">Create Account</button>
            </form>
          </div>
        </div>

        <!-- Dashboard (shown after mock login) -->
        <div v-else>
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-xl font-heading font-bold text-surface-900 dark:text-white">Welcome back!</h2>
            <button type="button" class="text-sm text-surface-500 hover:text-red-500" @click="handleLogout">Sign Out</button>
          </div>

          <!-- Dashboard tabs -->
          <div class="flex border-b border-surface-200 dark:border-surface-700 mb-8 overflow-x-auto">
            <button
              v-for="tab in dashTabs"
              :key="tab.id"
              type="button"
              class="px-4 py-3 font-heading font-semibold text-sm border-b-2 whitespace-nowrap transition-colors"
              :class="dashTab === tab.id
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-surface-500 hover:text-surface-700'"
              @click="dashTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Orders -->
          <div v-show="dashTab === 'orders'">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-surface-200 dark:border-surface-700 text-start">
                    <th class="py-3 font-heading font-semibold text-surface-900 dark:text-white">Order</th>
                    <th class="py-3 font-heading font-semibold text-surface-900 dark:text-white">Date</th>
                    <th class="py-3 font-heading font-semibold text-surface-900 dark:text-white">Status</th>
                    <th class="py-3 font-heading font-semibold text-surface-900 dark:text-white text-end">Total</th>
                  </tr>
                </thead>
                <tbody class="text-surface-600 dark:text-surface-400">
                  <tr class="border-b border-surface-100 dark:border-surface-800">
                    <td class="py-3">#BZ-1042</td>
                    <td class="py-3">Mar 5, 2026</td>
                    <td class="py-3"><span class="badge-new text-[10px]">Delivered</span></td>
                    <td class="py-3 text-end font-semibold">$247.00</td>
                  </tr>
                  <tr class="border-b border-surface-100 dark:border-surface-800">
                    <td class="py-3">#BZ-1038</td>
                    <td class="py-3">Feb 18, 2026</td>
                    <td class="py-3"><span class="badge bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300 text-[10px]">Shipped</span></td>
                    <td class="py-3 text-end font-semibold">$129.00</td>
                  </tr>
                  <tr>
                    <td class="py-3">#BZ-1025</td>
                    <td class="py-3">Jan 30, 2026</td>
                    <td class="py-3"><span class="badge-new text-[10px]">Delivered</span></td>
                    <td class="py-3 text-end font-semibold">$389.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Addresses -->
          <div v-show="dashTab === 'addresses'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="rounded-xl border border-surface-200 dark:border-surface-700 p-4">
                <div class="flex items-start justify-between mb-2">
                  <span class="badge-primary text-[10px]">Default</span>
                  <button type="button" class="text-sm text-primary-500 hover:text-primary-600">Edit</button>
                </div>
                <p class="text-surface-900 dark:text-white font-medium">Jane Doe</p>
                <p class="text-sm text-surface-600 dark:text-surface-400">123 Fashion Ave<br />New York, NY 10001<br />United States</p>
              </div>
              <div class="rounded-xl border-2 border-dashed border-surface-300 dark:border-surface-600 p-4 flex items-center justify-center">
                <button type="button" class="text-sm text-primary-500 hover:text-primary-600 font-medium">+ Add New Address</button>
              </div>
            </div>
          </div>

          <!-- Settings -->
          <div v-show="dashTab === 'settings'" class="max-w-md">
            <form class="space-y-4" novalidate @submit.prevent>
              <div>
                <label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Name</label>
                <input type="text" class="input" value="Jane Doe" />
              </div>
              <div>
                <label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Email</label>
                <input type="email" class="input" value="jane@example.com" />
              </div>
              <div>
                <label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Phone</label>
                <input type="tel" class="input" value="+1 (555) 123-4567" />
              </div>
              <button type="button" class="btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useBazaarSEO({
  title: 'Account',
  description: 'Manage your Bazaar Studio account.',
});

const isLoggedIn = ref(false);
const authTab = ref<'login' | 'register'>('login');
const dashTab = ref('orders');

const dashTabs = [
  { id: 'orders', label: 'Orders' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'settings', label: 'Settings' },
];

function handleLogin() {
  isLoggedIn.value = true;
}

function handleLogout() {
  isLoggedIn.value = false;
  authTab.value = 'login';
  dashTab.value = 'orders';
}
</script>
