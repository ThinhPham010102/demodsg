<template>
    <div>
      <h1>Items</h1>
      <div v-if="loading">Loading...</div>
      <ul v-else>
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      </ul>
      <div v-if="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
  import api from '../api'; // Adjust the path according to your project structure
  
  export default {
    name: 'ItemList',
    data() {
      return {
        items: [],
        loading: false,
        error: null
      };
    },
    created() {
      this.fetchItems();
    },
    methods: {
      async fetchItems() {
        this.loading = true;
        this.error = null;
        try {
          const response = await api.getItems();
          this.items = response.data;
        } catch (error) {
          this.error = 'Failed to load items';
          console.error('Error fetching items:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  