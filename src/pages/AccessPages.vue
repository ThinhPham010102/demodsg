<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md" style="background-color: aliceblue;">
        <div class="document-list">
          <div class="header">
            <div class="title">DANH SÁCH PHÂN QUYỀN</div>
            <div class="search">
              <q-input round outlined v-model="searchQuery" placeholder="từ khóa tìm kiếm....">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <div class="record-count">{{ filteredRows.length }} bản ghi</div>
            </div>
          </div>
          <q-table :rows="filteredRows" :table-header-style="{ color: 'red' }" :columns="columns" row-key="id"
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
          <q-btn icon="add" label="Thêm Mới" color="primary" @click="openAddModal" class="add-button" />
        </div>
      </q-page>
    </q-page-container>

    <!-- Add Modal -->
    <q-dialog v-model="addModal" full-width position="top">
      <q-card class="row">
        <q-card-section>
          <div class="text-h4" style="color: blue;">THÊM MỚI NGƯỜI DÙNG</div>
        </q-card-section>
        <q-card-section>
          <q-list class="row">
            <!-- tiêu đề hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="newPermission.name" label="TÊN NGƯỜI DÙNG" label-color="blue" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Không được để trống',
                ]"></q-input>
              </q-item-section>
            </q-item>

            <!-- thông tin hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="newPermission.description" label="PHÂN QUYỀN" label-color="blue" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Không được để trống',
                ]"></q-input>
              </q-item-section>
            </q-item>

            <!-- thông tin hồ sơ -->

            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="newPermission.date" label="NGÀY TẠO" label-color="blue" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Không được để trống',
                ]"></q-input>
              </q-item-section>
            </q-item>

            <!-- thông tin hồ sơ -->

            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="newPermission.status" label="TRẠNG THÁI" label-color="blue" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Không được để trống',
                ]"></q-input>
              </q-item-section>
            </q-item>
            <!-- ----------------------------------------------------  -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-checkbox v-model="newPermission.permissions.storageEdit" label="Quyền Chỉnh Sửa Kho"></q-checkbox>
              </q-item-section>
            </q-item>

            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-checkbox v-model="newPermission.permissions.textEdit" label="Quyền Chỉnh Văn Bản"></q-checkbox>
              </q-item-section>
            </q-item>

            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-checkbox v-model="newPermission.permissions.fileEdit" label="Quyền Chỉnh Sửa Tài Liệu"></q-checkbox>
              </q-item-section>
            </q-item>

            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-checkbox v-model="newPermission.permissions.roomEdit" label="Quyền Chỉnh Sửa Phòng"></q-checkbox>
              </q-item-section>
            </q-item>
          </q-list>




          <q-toggle v-model="newPermission.active" label="Hoạt Động" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Hủy" color="negative" v-close-popup />
          <q-btn flat label="Thêm" color="positive" @click="addNewPermission" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <!-- Edit Modal -->
    <q-dialog v-model="editModal" full-width position="top">
      <q-card class="row">
        <q-card-section>
          <div class="text-h4" style="color: blue;">CHỈNH SỬA DANH SÁCH NGƯỜI DÙNG</div>
        </q-card-section>
        <q-card-section>



          <q-list class="row" style="padding-bottom: 100px; padding-top:10px; padding-left: 20px; ">

            <!-- Thông tin hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="editedRow.title" label="TÊN NGƯỜI DÙNG" />
              </q-item-section>
            </q-item>

            <!-- Thông tin hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="editedRow.access" label="PHÂN QUYỀN" />
              </q-item-section>
            </q-item>
            <!-- Thông tin hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="editedRow.date" label="NGÀY TẠO" />
              </q-item-section>
            </q-item>


            <!-- Thông tin hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="editedRow.status" label="TRẠNG THÁI" />
              </q-item-section>
            </q-item>
          </q-list>





        </q-card-section>
        <q-card-actions align="right" style="padding-top: 200px; padding-left: 450px;">
          <q-btn flat label="Hủy" color="negative" v-close-popup />
          <q-btn flat label="Lưu" color="positive" @click="saveEdit" />
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
    <!-- Details Modal -->
    <q-dialog v-model="detailsModal" full-width position="top">
      <q-card>
        <q-card-section>
          <div class="text-h4" style="color: blue;">{{ detailsRow.title }}</div>
        </q-card-section>
        <q-card-section>
          <div><strong>STT:</strong> {{ detailsRow.id }}</div>
          <div><strong>TÊN NGƯỜI DÙNG:</strong> {{ detailsRow.title }}</div>
          <div><strong>PHÂN QUYỀN:</strong> {{ detailsRow.access }}</div>
          <div><strong>NGÀY TẠO:</strong> {{ detailsRow.date }}</div>
          <div><strong>TRẠNG THÁI:</strong> {{ detailsRow.status }}</div>
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

      newPermission: {
        name: '',
        description: '',
        permissions: {
          roomEdit: false,
          fileEdit: false,
          textEdit: false,
          storageEdit: false,
        },
        active: true,
      },
      editedRow: {
        id: null,
        title: '',
        access: '',
        date: '',
        status: '',
      },
      rowToDelete: null,
      proxyDate: '',
      columns: [
        { name: 'stt', label: 'STT', align: 'center', field: 'stt' },
        { name: 'title', label: 'TÊN NGƯỜI DÙNG', align: 'center', field: 'title' },
        { name: 'access', label: 'PHÂN QUYÊN', align: 'center', field: 'access' },
        { name: 'date', label: 'NGÀY TẠO', align: 'center', field: 'date' },
        { name: 'status', label: 'TRẠNG THÁI', align: 'center', field: 'status' },
        { name: 'actions', label: 'THAO TÁC', align: 'center', field: 'actions' },
      ],
      rows: [
        {
          id: 1,
          stt: 1,
          title: 'User-1',
          access: 'Cán Bộ Nhập Liệu',
          date: '19/02/2021',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 2,
          stt: 2,
          title: 'User-2',
          access: 'Quản Trị Viên',
          date: '19/02/2022',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 3,
          stt: 3,
          title: 'User-3',
          access: 'Cán Bộ Nhập Liệu',
          date: '12/03/2021',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 4,
          stt: 4,
          title: 'User-4',
          access: 'Cán Bộ Viên Chức',
          date: '19/02/2023',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 5,
          stt: 5,
          title: 'User-5',
          access: 'Cán Bộ ',
          date: '19/02/2021',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 6,
          stt: 6,
          title: 'User-6',
          access: 'Cán Bộ Nhập Liệu',
          date: '19/02/2021',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 7,
          stt: 7,
          title: 'User-7',
          access: 'Cán Bộ Nhập Liệu',
          date: '19/02/2024',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 8,
          stt: 8,
          title: 'User-8',
          access: 'Cán Bộ Nhập Liệu',
          date: '19/02/2021',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 9,
          stt: 9,
          title: 'User-9',
          access: 'Cán Bộ Nhập Liệu',
          date: '19/02/2021',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 10,
          stt: 10,
          title: 'User-10',
          access: 'Cán Bộ Nhập Liệu',
          date: '19/02/2021',
          status: 'Hoạt Động',
          actions: '',
        },
        {
          id: 11,
          stt: 11,
          title: 'User-11',
          access: 'Cán Bộ Nhập Liệu',
          date: '19/02/2021',
          status: 'Hoạt Động',
          actions: '',
        },
      ],
    }
  },
  computed: {
    filteredRows() {
      return this.rows.filter((row) => row.title.includes(this.searchQuery))
    },
  },
  methods: {
    openAddModal() {
      this.newPermission = {
        name: '',
        description: '',
        permissions: {
          roomEdit: false,
          fileEdit: false,
          textEdit: false,
          storageEdit: false,
        },
        active: true,
      }
      this.addModal = true
    },
    addNewPermission() {
      if (this.newPermission.name && this.newPermission.description) {
        const newPermissionWithId = {
          ...this.newPermission,
          id: this.rows.length + 1,
          stt: this.rows.length + 1,
        }
        this.rows.push(newPermissionWithId)

      }
      this.addModal = false
    },
    openEditModal(row) {
      this.editedRow = { ...row }
      this.editModal = true
    },
    showDetails(row) {
      this.detailsRow = { ...row }
      this.detailsModal = true
    },
    saveEdit() {
      const index = this.rows.findIndex((row) => row.id === this.editedRow.id)
      if (index !== -1) {
        this.rows[index] = { ...this.editedRow }
      }
      this.editModal = false
    },
    shareRow(row) {
      const shareData = {
        title: row.title,
        text: row.info,
        url: window.location.href,
      }
      try {
        navigator.share(shareData).then(() => {
          console.log('Shared successfully');
        });
      } catch (err) {
        console.error('Error sharing:', err)
      }
    },
    confirmDelete(row) {
      this.rowToDelete = row
      this.deleteModal = true
    },
    deleteRow() {
      const index = this.rows.findIndex((row) => row.id === this.rowToDelete.id)
      if (index !== -1) {
        this.rows.splice(index, 1)
      }
      this.deleteModal = false
    },
    updateProxyDate(type, dateType) {
      if (type === 'new') {
        this.proxyDate = dateType === 'start' ? this.newRow.startDate : this.newRow.endDate
      } else if (type === 'edit') {
        this.proxyDate = dateType === 'start' ? this.editedRow.startDate : this.editedRow.endDate
      }
    },
    updateNewRowStartDate(value) {
      this.newRow.startDate = value
    },
    updateNewRowEndDate(value) {
      this.newRow.endDate = value
    },
    updateEditedRowStartDate(value) {
      this.editedRow.startDate = value
    },
    updateEditedRowEndDate(value) {
      this.editedRow.endDate = value
    },
    confirmDate(type, dateType) {
      if (type === 'new') {
        if (dateType === 'start') {
          this.newRow.startDate = this.proxyDate
        } else if (dateType === 'end') {
          this.newRow.endDate = this.proxyDate
        }
      } else if (type === 'edit') {
        if (dateType === 'start') {
          this.editedRow.startDate = this.proxyDate
        } else if (dateType === 'end') {
          this.editedRow.endDate = this.proxyDate
        }
      }
      this.proxyDate = ''
    },
    cancelDate() {
      this.proxyDate = ''
    },
  },
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



.add-button {
  position: fixed;
  bottom: 1em;
  right: 1em;
}

.title {
  font-size: 30px;
}
</style>