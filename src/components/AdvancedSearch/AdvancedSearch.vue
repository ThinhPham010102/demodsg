<template>
  <q-dialog v-model="searchDialog" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="row items-center">
        <q-input
          v-model="searchTerm"
          label="Tìm kiếm"
          outlined
          dense
          @keyup.enter="performSearch"
        />
      </q-card-section>
      <q-card-section>
        <!-- Thêm các tiêu chí tìm kiếm nâng cao ở đây -->
        <q-input v-model="category" label="Danh mục" outlined dense />
        <q-input v-model="dateRange" label="Khoảng thời gian" outlined dense />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Đóng" color="primary" v-close-popup />
        <q-btn flat label="Tìm kiếm" color="primary" @click="performSearch" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const searchDialog = ref(false);
const searchTerm = ref("");
const category = ref("");
const dateRange = ref("");

const performSearch = () => {
  console.log("Search Term:", searchTerm.value);
  console.log("Category:", category.value);
  console.log("Date Range:", dateRange.value);
  // Xử lý logic tìm kiếm tại đây
};
</script>

<style scoped>
/* Thêm các kiểu dáng tùy chỉnh nếu cần */
</style>
