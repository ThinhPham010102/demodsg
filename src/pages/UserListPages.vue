<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md" style="background-color: aliceblue;">
        <div
          class="q-table__container q-table--cell-separator column no-wrap q-table__card q-table--bordered q-table--dense q-table--no-wrap q-pa-sm">
          <div class="header">
            <div class="title">DANH SÁCH VĂN BẢN </div>
            <div class="search">
              <q-input round outlined v-model="searchQuery" placeholder="từ khóa tìm kiếm....">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <div class="record-count">{{ filteredRows.length }} bản ghi</div>
            </div>
          </div>
          <q-table :table-header-style="{ color: 'red' }" :rows="filteredRows" :columns="columns" row-key="id"
            selection="multiple" v-model:selected="selected" flat dense>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn flat icon="edit" @click="openEditModal(props.row)" />
                <q-btn flat icon="share" @click="shareRow(props.row)" />
                <q-btn flat icon="info" @click="showDetails(props.row)" />

                <q-btn flat icon="delete" color="negative" @click="confirmDelete(props.row)" />
              </q-td>
            </template>
          </q-table>
          <q-btn icon="add" label="Thêm Mới" color="secondary" @click="openAddModal" class="add-button" />
        </div>
      </q-page>
    </q-page-container>

    <!-- Add Modal -->
    <q-dialog v-model="addModal" full-width position="top">
      <q-card>
        <q-card-section>
          <div class="text-h4" style="color: blue;">THÊM MỚI VĂN BẢN</div>
        </q-card-section>

        <q-card-section>
          <q-list class="row">
            <!-- tiêu đề hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="newRow.content" label="TRÍCH YẾU NỘI DUNG" label-color="blue" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Không được để trống',
                ]"></q-input>
              </q-item-section>
            </q-item>

            <!-- thông tin hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="newRow.title" label="THÔNG TIN VĂN BẢN" label-color="blue" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Không được để trống',
                ]"></q-input>
              </q-item-section>
            </q-item>

            <!-- thông tin hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="newRow.info" label="THÔNG TIN HỒ SƠ" label-color="blue" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Không được để trống',
                ]"></q-input>
              </q-item-section>
            </q-item>
          </q-list>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Hủy" icon="cancel" push type="reset" color="deep-orange" class="q-ml-sm text-capitalize"
            v-close-popup />
          <q-btn flat label="Thêm" type="submit" push icon="save" class="text-capitalize" color="secondary"
            @click="addNewRow" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Edit Modal -->
    <q-dialog v-model="editModal" full-width position="top">
      <q-card>
        <q-card-section>
          <div class="text-h4" style="color: blue;">CHỈNH SỬA VĂN BẢN</div>
        </q-card-section>
        <q-card-section>
          <q-list class="row">
            <!-- Tiêu đề hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="editedRow.content" label="TRÍCH YẾU NỘI DUNG" />
              </q-item-section>
            </q-item>
            <!-- Thông tin hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="editedRow.title" label="THÔNG TIN VĂN BẢN" />
              </q-item-section>
            </q-item>

            <!-- Thông tin hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="editedRow.info" label="THÔNG TIN HỒ SƠ" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Hủy" icon="cancel" push type="reset" color="deep-orange" class="q-ml-sm text-capitalize"
            v-close-popup />
          <q-btn flat label="Thêm" type="submit" push icon="save" class="text-capitalize" color="secondary"
            @click="saveEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation Modal -->
    <q-dialog v-model="deleteModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Xác nhận xóa</div>
        </q-card-section>
        <q-card-section>
          Bạn có chắc chắn muốn xóa hồ sơ này không?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Hủy" color="negative" v-close-popup />
          <q-btn flat label="Xóa" color="positive" @click="deleteRow" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DETAIL MODAL -->

    <q-dialog v-model="detailsModal" full-width position="top">
      <q-card>
        <q-card-section>
          <div class="text-h4" style="color: blue">{{ detailsRow.title }}</div>
        </q-card-section>
        <q-card-section>

          <q-card-section style="font-size: larger;">

            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <div><strong>TRÍCH YẾU NỘI DUNG:</strong> {{ detailsRow.content }}</div>
              </q-item-section>
            </q-item>
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <div><strong>THÔNG TIN VĂN BẢN:</strong> {{ detailsRow.title }}</div>

              </q-item-section>
            </q-item>
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <div><strong>THÔNG TIN HỒ SƠ:</strong> {{ detailsRow.info }}</div>

              </q-item-section>
            </q-item>

          </q-card-section>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Đóng" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>

</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      searchQuery: '',
      addModal: false,
      editModal: false,
      deleteModal: false,
      detailsModal: false,

      selected: ref([]),

      newRow: {
        id: null,
        content: '',
        title: '',
        info: ''

        // startDate: '',
        // endDate: ''
      },
      editedRow: {
        id: null,
        content: '',
        title: '',
        info: ''
        // startDate: '',
        // endDate: ''
      },
      // rowToDelete: null,
      // proxyDate: '',

      columns: [
        { name: 'stt', label: 'STT', align: 'center', field: 'stt' },
        { name: 'content', label: 'Trích Yếu Nội Dung', align: 'center', field: 'content' },
        { name: 'title', label: 'Thông Tin Văn Bản', align: 'center', field: 'title' },
        { name: 'info', label: 'Thông Tin Hồ Sơ', align: 'center', field: 'info' },
        { name: 'actions', label: 'Thao tác', align: 'center', field: 'actions' }
      ],
      rows: [
        {
          id: 1,
          stt: 1,
          content: 'Nhật kí thi công hạng mục D16',
          title: 'Mã định danh văn bản:Nhom DakNong.425.2091.1',
          info: 'Nhật kí thi công hạn mục D16 hạn mục',
          actions: ''
        },

        {
          id: 2,
          stt: 2,
          content: 'Nhật kí thi công hạng mục D16',
          title: 'Mã định danh văn bản:Nhom DakNong.425.2091.1',
          info: 'Nhật kí thi công hạn mục D16 hạn mục',
          actions: ''
        },

        {
          id: 3,
          stt: 3,
          content: 'Nhật kí thi công hạng mục D10',
          title: 'Mã định danh văn bản:Nhom DakNong.425.2091.1',
          info: 'Nhật kí thi công hạn mục D16 hạn mục',
          actions: ''
        },

        {
          id: 4,
          stt: 4,
          content: 'Nhật kí thi công hạng mục D11',
          title: 'Mã định danh văn bản:Nhom DakNong.425.2091.1',
          info: 'Nhật kí thi công hạn mục D16 hạn mục',
          actions: ''
        },

        {
          id: 5,
          stt: 5,
          content: 'Nhật kí thi công hạng mục D12',
          title: 'Mã định danh văn bản:Nhom DakNong.425.2091.1',
          info: 'Nhật kí thi công hạn mục D16 hạn mục',
          actions: ''
        },

        {
          id: 6,
          stt: 6,
          content: 'Nhật kí thi công hạng mục D13',
          title: 'Mã định danh văn bản:Nhom DakNong.425.2091.1',
          info: 'Nhật kí thi công hạn mục D16 hạn mục',
          actions: ''
        },

        {
          id: 7,
          stt: 7,
          content: 'Nhật kí thi công hạng mục D14',
          title: 'Mã định danh văn bản:Nhom DakNong.425.2091.1',
          info: 'Nhật kí thi công hạn mục D16 hạn mục',
          actions: ''
        },

        {
          id: 8,
          stt: 8,
          content: 'Nhật kí thi công hạng mục D15',
          title: 'Mã định danh văn bản:Nhom DakNong.425.2091.1',
          info: 'Nhật kí thi công hạn mục D16 hạn mục',
          actions: ''
        },
      ]
    }
  },
  computed: {
    filteredRows() {
      return this.rows.filter(row => row.content.includes(this.searchQuery));
    }
  },
  methods: {
    openAddModal() {
      this.newRow = { id: null, content: '', title: '', info: '' };
      this.addModal = true;
    },
    addNewRow() {
      if (this.newRow.title && this.newRow.info && this.newRow.startDate && this.newRow.endDate) {
        this.newRow.id = this.rows.length + 1;
        this.newRow.stt = this.rows.length + 1;
        this.rows.push({ ...this.newRow });
        this.addModal = false;
      }
    },
    openEditModal(row) {
      this.editedRow = { ...row };
      this.editModal = true;
    },
    saveEdit() {
      const index = this.rows.findIndex(row => row.id === this.editedRow.id);
      if (index !== -1) {
        this.rows[index] = { ...this.editedRow };
      }
      this.editModal = false;
    },
    shareRow(row) {
      const shareData = {
        title: row.title,
        text: row.info,
        url: window.location.href
      };
      try {
        navigator.share(shareData).then(() => {
          console.log('Shared successfully');
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    },
    confirmDelete(row) {
      this.rowToDelete = row;
      this.deleteModal = true;
    },
    showDetails(row) {
      this.detailsRow = { ...row }
      this.detailsModal = true
    },
    deleteRow() {
      const index = this.rows.findIndex(row => row.id === this.rowToDelete.id);
      if (index !== -1) {
        this.rows.splice(index, 1);
      }
      this.deleteModal = false;
    },
    // updateProxyDate(type, dateType) {
    //   if (type === 'new') {
    //     this.proxyDate = dateType === 'start' ? this.newRow.startDate : this.newRow.endDate;
    //   } else if (type === 'edit') {
    //     this.proxyDate = dateType === 'start' ? this.editedRow.startDate : this.editedRow.endDate;
    //   }
    // },
    // updateNewRowStartDate(value) {
    //   this.newRow.startDate = value;
    // },
    // updateNewRowEndDate(value) {
    //   this.newRow.endDate = value;
    // },
    // updateEditedRowStartDate(value) {
    //   this.editedRow.startDate = value;
    // },
    // updateEditedRowEndDate(value) {
    //   this.editedRow.endDate = value;
    // },
    // confirmDate(type, dateType) {
    //   if (type === 'new') {
    //     if (dateType === 'start') {
    //       this.newRow.startDate = this.proxyDate;
    //     } else {
    //       this.newRow.endDate = this.proxyDate;
    //     }
    //   } else if (type === 'edit') {
    //     if (dateType === 'start') {
    //       this.editedRow.startDate = this.proxyDate;
    //     } else {
    //       this.editedRow.endDate = this.proxyDate;
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
.q-layout {
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.5em;
  font-weight: bold;
}

.search {
  display: flex;
  align-items: center;
}

.search .q-input {
  margin-right: 1em;
}

.record-count {
  font-size: 1.2em;
  font-weight: bold;
}

.document-list {
  background: white;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.q-table {
  margin-top: 1em;
}

.add-button {
  position: fixed;
  bottom: 1em;
  right: 1em;
}

.title {
  font-size: 30px;
}
</style>
