<template>
  <div id="app">
    <router-view />
    <!-- Persistent Theme Toggle -->
    <div class="theme-toggle">
      <label>
        <input type="checkbox" v-model="isDark" @change="toggleTheme" />
        <i :class="isDark ? 'icon-moon' : 'icon-sun'"></i>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDark: true, // Default to dark mode
    };
  },
  methods: {
    toggleTheme() {
      const newTheme = this.isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    },
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.isDark = savedTheme === 'dark';
  },
};
</script>