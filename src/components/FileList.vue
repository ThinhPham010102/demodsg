<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title>Danh sách hồ sơ</q-toolbar-title>
      <q-btn icon="add" label="Thêm Mới" @click="openAddDialog" />
    </q-toolbar>

    <q-input v-model="searchQuery" label="Tìm kiếm" outlined>
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-table :rows="filteredFiles" :columns="columns" row-key="id" />

    <q-dialog v-model="isAddDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Thêm Hồ Sơ Mới</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newFile.title" label="Tiêu đề hồ sơ" />
          <q-input v-model="newFile.documentTime" label="Thời gian tài liệu" />
          <q-input
            v-model="newFile.retentionPeriod"
            label="Thời hạn bảo quản"
          />
          <q-input v-model="newFile.pages" label="Số tờ/Số trang" />
          <q-input v-model="newFile.storageUnit" label="Đơn vị phụ lưu" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Hủy" v-close-popup />
          <q-btn flat label="Lưu" color="primary" @click="addFile" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      isAddDialogOpen: false,
      newFile: {
        title: "",
        documentTime: "",
        retentionPeriod: "",
        pages: "",
        storageUnit: "",
      },
      files: [
        {
          id: 1,
          title: "Hồ sơ bổ sung 3 tháng đầu năm 2020",
          documentTime: "01/01/2020 - 31/03/2020",
          retentionPeriod: "10 năm",
          pages: "10 / 20",
          storageUnit: "Phòng kế hoạch tổng hợp",
        },
        {
          id: 2,
          title: "Hồ sơ bổ sung 6 tháng đầu năm 2020",
          documentTime: "01/07/2020 - 30/12/2020",
          retentionPeriod: "10 năm",
          pages: "10 / 20",
          storageUnit: "Phòng kế hoạch tổng hợp",
        },
      ],
    };
  },
  computed: {
    filteredFiles() {
      return this.files.filter((file) =>
        file.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    columns() {
      return [
        {
          name: "title",
          label: "Tiêu đề hồ sơ",
          field: "title",
          align: "left",
        },
        {
          name: "documentTime",
          label: "Thời gian tài liệu",
          field: "documentTime",
          align: "left",
        },
        {
          name: "retentionPeriod",
          label: "Thời hạn bảo quản",
          field: "retentionPeriod",
          align: "left",
        },
        {
          name: "pages",
          label: "Số tờ/Số trang",
          field: "pages",
          align: "left",
        },
        {
          name: "storageUnit",
          label: "Đơn vị phụ lưu",
          field: "storageUnit",
          align: "left",
        },
      ];
    },
  },
  methods: {
    openAddDialog() {
      this.isAddDialogOpen = true;
    },
    addFile() {
      const newId = this.files.length + 1;
      this.files.push({ ...this.newFile, id: newId });
      this.isAddDialogOpen = false;
      this.newFile = {
        title: "",
        documentTime: "",
        retentionPeriod: "",
        pages: "",
        storageUnit: "",
      };
    },
  },
};
</script>

<style scoped>
.q-page {
  padding: 16px;
}

.q-toolbar {
  margin-bottom: 16px;
}
</style>
