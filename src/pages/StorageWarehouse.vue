<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md" style="background-color: aliceblue;">
        <div
          class="q-table__container q-table--cell-separator column no-wrap q-table__card q-table--bordered q-table--dense q-table--no-wrap q-pa-sm">
          <div class="header">
            <div class="title">DANH SÁCH KHO</div>
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
            <template v-slot:body-cell-active="props">
              <q-td :props="props">
                <q-badge :color="props.row.active.color">
                  {{ props.row.active }}
                </q-badge>
              </q-td>
            </template>
          </q-table>
          <q-btn icon="add" label="Thêm Mới" color="secondary" @click="openAddModal" class="add-button" />
        </div>
      </q-page>
    </q-page-container>

    <!-- Add Modal -->
    <q-dialog v-model="AddModal" full-width position="top">
      <q-card class="row">
        <q-card-section>
          <div class="text-h4" style="color: blue;">THÊM MỚI KHO</div>
        </q-card-section>
        <q-card-section>
          <q-list class="row">
            <!-- Tên hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="newRow.warehouseCode" label=" MÃ KHO" label-color="blue" @filter="filter_Code"
                  :options="list_Code" lazy-rules :rules="['Không được để trống']" use-input use-chips
                  @new-value="addNewName"></q-select>
              </q-item-section>
            </q-item>
            <!-- Tòa nhà -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="newRow.warehouseName" label="TÒA_KHO NHÀ" label-color="blue" @filter="filter_Ware"
                  :options="list_Ware" lazy-rules :rules="['Không được để trống']" use-input use-chips
                  @new-value="addNewName"></q-select>
              </q-item-section>
            </q-item>
            <!-- Địa chỉ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="newRow.addressed" label="ĐỊA CHỈ" label-color="blue" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Không được để trống',
                ]"></q-input>
              </q-item-section>
            </q-item>
            <!-- Ngày tạo -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="newRow.createdDate" label="NGÀY TẠO" label-color="blue" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Không được để trống',
                ]"></q-input>
              </q-item-section>
            </q-item>
            <!-- Quốc gia -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="newRow.nation" label="QUỐC GIA" label-color="blue" @filter="filter_Nation"
                  :options="list_Nation" lazy-rules :rules="['Không được để trống']" use-input use-chips
                  @new-value="addNewName"></q-select>
              </q-item-section>
            </q-item>
            <!-- Tỉnh/Thành phố -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="newRow.province" label="TỈNH/THÀNH PHỐ" label-color="blue" @filter="filter_Province"
                  :options="list_Province" lazy-rules :rules="['Không được để trống']" use-input use-chips
                  @new-value="addNewName"></q-select>
              </q-item-section>
            </q-item>
            <!-- Quận/Huyện -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="newRow.district" label="QUẬN/HUYỆN" label-color="blue" @filter="filter_District"
                  :options="list_District" lazy-rules :rules="['Không được để trống']" use-input use-chips
                  @new-value="addNewName"></q-select>
              </q-item-section>
            </q-item>
            <!-- Phường/Xã -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="newRow.ward" label="PHƯỜNG/XÃ" label-color="blue" @filter="filter_Ward"
                  :options="list_Ward" lazy-rules :rules="['Không được để trống']" use-input use-chips
                  @new-value="addNewName"></q-select>
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
      <q-card class="row">
        <q-card-section>
          <div class="text-h4" style="color: blue;">CHỈNH SỬA KHO</div>
        </q-card-section>
        <q-card-section>
          <q-list class="row">
            <!-- Tên hồ sơ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="editedRow.warehouseCode" label="Tên" @filter="filter_Code" :options="list_Code"
                  lazy-rules :rules="['Không được để trống']" use-input use-chips @new-value="editNewName" />
              </q-item-section>
            </q-item>
            <!-- Tòa nhà -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="editedRow.warehouseName" label="Tòa Nhà" @filter="filter_Ware" :options="list_Ware"
                  lazy-rules :rules="['Không được để trống']" use-input use-chips @new-value="editNewName" />
              </q-item-section>
            </q-item>
            <!-- Địa chỉ -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="editedRow.addressed" label="Địa Chỉ" />
              </q-item-section>
            </q-item>
            <!-- Ngày tạo -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="editedRow.createdDate" label="Ngày Tạo" />
              </q-item-section>
            </q-item>
            <!-- Quốc gia -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="editedRow.nation" label="QUỐC GIA" @filter="filter_Nation" :options="list_Nation"
                  lazy-rules :rules="['Không được để trống']" use-input use-chips @new-value="editNewName" />
              </q-item-section>
            </q-item>
            <!-- Tỉnh/Thành phố -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="editedRow.province" label="TỈNH/THÀNH PHỐ" @filter="filter_Province"
                  :options="list_Province" lazy-rules :rules="['Không được để trống']" use-input use-chips
                  @new-value="editNewName" />
              </q-item-section>
            </q-item>
            <!-- Quận/Huyện -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="editedRow.district" label="QUẬN/HUYỆN" @filter="filter_District"
                  :options="list_District" lazy-rules :rules="['Không được để trống']" use-input use-chips
                  @new-value="editNewName" />
              </q-item-section>
            </q-item>
            <!-- Phường/Xã -->
            <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select v-model="editedRow.ward" label="PHƯỜNG/XÃ" @filter="filter_Ward" :options="list_Ward"
                  lazy-rules :rules="['Không được để trống']" use-input use-chips @new-value="editNewName" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Hủy" icon="cancel" push type="reset" color="deep-orange" class="q-ml-sm text-capitalize"
            v-close-popup />
          <q-btn flat label="Lưu" type="submit" push icon="save" class="text-capitalize" color="secondary"
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
    <!-- Details Modal -->
    <q-dialog v-model="detailsModal" full-width position="top">
      <q-card>
        <q-card-section>
          <div class="text-h4" style="color: blue;">{{ detailsRow.warehouseCode }}</div>
        </q-card-section>
        <q-card-section style="font-size: larger;">

          <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <div><strong>Tòa Nhà:</strong> {{ detailsRow.warehouseName }}</div>
            </q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <div><strong>Địa Chỉ:</strong> {{ detailsRow.addressed }}</div>

            </q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <div><strong>Ngày Tạo:</strong> {{ detailsRow.createdDate }}</div>

            </q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <div><strong>Phường/Xã:</strong> {{ detailsRow.ward }}</div>

            </q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <div><strong>Quận/Huyện:</strong> {{ detailsRow.district }}</div>

            </q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <div><strong>Tỉnh/Thành Phố:</strong> {{ detailsRow.province }}</div>

            </q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <div><strong>Quốc Gia:</strong> {{ detailsRow.nation }}</div>

            </q-item-section>
          </q-item>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Đóng" type="cancel" push icon="cancel" class="text-capitalize" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';

export default {

  data() {
    return {
      searchQuery: '',
      AddModal: false,
      editModal: false,
      deleteModal: false,
      Catalog_form: '',
      detailsModal: false,
      selected: ref([]),
      rowToDelete: null,

      newRow: {
        id: null,
        warehouseCode: '',
        warehouseName: '',
        addressed: '',
        createdDate: '',
        nation: '',
        province: '',
        district: '',
        ward: ''
      },

      editedRow: {
        id: null,
        warehouseCode: '',
        warehouseName: '',
        addressed: '',
        createdDate: '',
        nation: '',
        province: '',
        district: '',
        ward: ''
      },
      detailsRow: {
        id: null,
        warehouseCode: '',
        warehouseName: '',
        addressed: '',
        createdDate: '',
        nation: '',
        province: '',
        district: '',
        ward: ''
      },
      list_Code: ["001", "002", "003", "004", "005"],
      list_Ware: ["Khu Vực 1", "Khu Vực 2", "Khu Vực 3", "Khu Vực 4", "Khu Vực 5"],
      list_Ward: ["Tân Chánh Hiệp", "Tân Thới Hiệp", "Hiệp Bình Phước	", "An Phú	", "Tân Chánh Hiệp"],
      list_District: ["Quận 12", "Quận Thủ Đức	", "Quận 2", "Quận 3", "Quận 1"],
      list_Province: ["Hồ Chí Minh", "Hà Nội", "Quãng Nam", "Đắk Nông", "Đắk Lắk"],
      list_Nation: ["Việt Nam", "Trung Quốc", "Đức", "Mỹ", "Nhật Bản"],

      columns: [
        {
          name: 'stt',

          label: 'STT',
          align: 'center',
          field: 'stt'

        },

        { name: 'warehouseCode', label: 'TÊN HỒ SƠ', align: 'center', field: 'warehouseCode' },
        { name: 'warehouseName', label: 'TÒA_KHO NHÀ', align: 'center', field: 'warehouseName' },
        { name: 'addressed', label: 'ĐỊA CHỈ', align: 'center', field: 'addressed' },
        { name: 'createdDate', label: 'NGÀY TẠO', align: 'center', field: 'createdDate' },
        { name: 'active', label: 'TRẠNG THÁI', align: 'center', field: 'active' },
        { name: 'ward', align: 'left', label: 'Phường/Xã', field: 'ward' },
        { name: 'district', align: 'left', label: 'Quận/Huyện', field: 'district' },
        { name: 'province', align: 'left', label: 'Tỉnh/Thành Phố', field: 'province' },
        { name: 'nation', align: 'left', label: 'Quốc Gia', field: 'nation' },
        { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
      ],
      rows: []

    }
  },
  computed: {
    filteredRows() {
      if (!this.searchQuery) {
        return this.rows;
      }
      const query = this.searchQuery.toLowerCase();
      return this.rows.filter(
        (row) =>
          row.warehouseCode.toLowerCase().includes(query) ||
          row.warehouseName.toLowerCase().includes(query) ||
          row.addressed.toLowerCase().includes(query) ||
          row.createdDate.toLowerCase().includes(query) ||
          row.ward.toLowerCase().includes(query) ||
          row.district.toLowerCase().includes(query) ||
          row.province.toLowerCase().includes(query) ||
          row.nation.toLowerCase().includes(query) ||
          row.active.toLowerCase().includes(query)
      );
    },
  },
  mounted() {

    this.callCreateAPI();
  },
  methods: {
    openAddModal() {
      this.newRow = { id: null, warehouseName: '', warehouseCode: '', addressed: '', createdDate: '', ward: '', district: '', province: '', nation: '', active: "Mới" };
      this.AddModal = true;
    },
    addNewRow() {
      if (this.newRow.warehouseCode && this.newRow.warehouseName && this.newRow.addressed && this.newRow.createdDate && this.newRow.ward && this.newRow.district && this.newRow.province && this.newRow.nation) {
        this.newRow.id = this.rows.length + 1;
        this.newRow.stt = this.rows.length + 1;
        this.rows.push({ ...this.newRow });
        this.AddModal = false;
      }
    },
    async callCreateAPI() {
      try {
        const apiUrl = 'https://sohodmsapi.azurewebsites.net/api/StorageWarehouse/Search';

        // Dữ liệu giả để gửi đi
        const requestData = {
          query: ''
        };
        //  Gọi Token 
        const headers = {
          'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1OTVxWUVRcDJVTm1BRmlHekt0M3ciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3MTkxOTI2NTQsImV4cCI6MTcxOTE5NjI1NCwiaXNzIjoiaHR0cHM6Ly9zb2hvZG1zLWlkcy5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6IlNPSE9ETVMuQVBJIiwiY2xpZW50X2lkIjoicm8uY2xpZW50Iiwic3ViIjoiZjRiNDk0ZTQtYzU5Ni00NGVlLTgyMTYtZTVkZmEzZWQ4Y2U2IiwiYXV0aF90aW1lIjoxNzE5MTkyNjU0LCJpZHAiOiJsb2NhbCIsInJvbCI6IkFkbWluIiwidW4iOiJnaWFoYW8iLCJlbWFpbCI6Im5oaWV1Z2lhaGFvMjAwMUBnbWFpbC5jb20iLCJwaG9uZW51bWJlciI6IjEyMzQ1Njc4OTEwIiwiZW1wbG95ZWVpZCI6IjE5IiwicGVybWlzc2lvbiI6IltdIiwicm9sZSI6IkFkbWluIiwic2NvcGUiOlsiZnVsbF9hY2Nlc3MiLCJyZWFkX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.DFJdPSzqe-sNVgyyazq8uF6dxhhfjXbVilIoX_DBGWNToqxDtWzB2SiwdmqQVbrxCwhk-MYZbnIgAlj6yOLeXmQ2cBn81QFKZ-wqBifiu5NWdvP-xdxfKe2h4PCLAkTYOtRo6UbFII4gGAhB3tFxblP6zO6p-SmAjKyXijmANuLhIkjDhsUQ0bnBcQZsyvZtfdYSeisj_eFBk4hUU_DZ5yD275GoP_BwjAbsnaGyuIWM-iDP4U8KtZ67EFwDyQj_i0SXEcg7UK1SsIgnBdgBEYZUn4xO0vCQcYQpImzGMxpLWE26OaK91C7x1jSdS9GCFIq26CILCH742jeoYaDzlw`,
          'Content-Type': 'application/json'
        };

        const response = await axios.get(apiUrl, {
          headers: headers,
          params: requestData
        });
        this.rows = response.data.map((item, index) => ({
          id: item.id,
          stt: index,
          warehouseCode: item.warehouseCode,
          warehouseName: item.warehouseName,
          addressed: item.addressed,
          createdDate: item.createdDate,
          ward: item.ward,
          district: item.district,
          province: item.province,
          nation: item.nation,
          active: item.active,
          actions: ''
        }));
        console.log('Response from API:', response.data);
      } catch (error) {
        console.error('Error calling API:', error.response);
        // Xử lý lỗi ở đây nếu cần
      }
    },

    openEditModal(row) {
      this.editedRow = { ...row };
      this.editModal = true;
    },
    showDetails(row) {
      this.detailsRow = { ...row }
      this.detailsModal = true
    },
    saveEdit() {
      const index = this.rows.findIndex(row => row.id === this.editedRow.id);
      if (index !== -1) {
        this.rows.splice(index.this.editedRow);
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
    deleteRow() {
      const index = this.rows.findIndex(row => row.id === this.rowToDelete.id);
      if (index !== -1) {
        this.rows.splice(index, 1);
      }
      this.deleteModal = false;
    },

    filter_Code(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.list_Code = ["001"
          , "002",
          "003",
          "004",
          "005"].filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
      });
    },
    filter_Ware(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.list_Code = ["Hồ sơ test Chuyên viên Lễ Tân"
          , "Hồ sơ test Chuyên Kế Toán",
          "Hồ sơ test Chuyên viên Số Hóa",
          "Hồ sơ test Chuyên viên IT",
          "Hồ sơ test Chuyên viên Marketing"].filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
      });
    },
    filter_Ward(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.list_Ward = ["Tân Chánh Hiệp"
          , "Tân Thới Hiệp	",
          "Hiệp Bình Phước	",
          "An Phú	",
          "An Khánh"].filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
      });
    },
    filter_District(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.list_District = ["Quận 3"
          , "Quận 9",
          "Quận Thủ Đức",
          "Quận 2",
          "Quận 12"].filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
      });
    },
    filter_Province(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.list_Province = ["Hồ Chí Minh"
          , "Hà Nội",
          "Quãng Nam",
          "Đắk Lắk",
          "Lào Cai"].filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
      });
    },
    filter_Nation(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.list_Nation = ["Việt Nam"
          , "Trung Quốc",
          "Đức",
          "Nhật Bản",
          "Hàn Quốc"].filter(
            v => v.toLowerCase().indexOf(needle) > -1
          );
      });
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
