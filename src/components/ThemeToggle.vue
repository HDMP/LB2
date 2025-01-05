<template>
    <div class="theme-toggle">
      <label>
        <input type="checkbox" v-model="isDark" @change="toggleTheme" />
        {{ themeLabel }}
      </label>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDark: localStorage.getItem('theme') === 'dark', // Check saved theme
      };
    },
    computed: {
      themeLabel() {
        return this.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      },
    },
    methods: {
      toggleTheme() {
        const newTheme = this.isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      },
    },
    mounted() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.isDark = savedTheme === 'dark';
    },
  };
  </script>
  
  <style scoped>
  .theme-toggle {
    margin-bottom: 20px;
  }
  
  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
  }
  
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  </style>
  