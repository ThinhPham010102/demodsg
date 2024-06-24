<template>
    <q-layout>
        <q-page-container>
            <q-page class="q-pa-md" style="background-color: aliceblue;">
                <div
                    class="q-table__container q-table--cell-separator column no-wrap q-table__card q-table--bordered q-table--dense q-table--no-wrap q-pa-sm">
                    <div class="header">
                        <div class="title">DANH SÁCH PHÔNG</div>
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

                        <template v-slot:body-cell-status="props">
                            <q-td :props="props">
                                <q-badge
                                    :class="{ 'active': props.row.status === 'Active', 'inactive': props.row.status === 'Inactive' }">
                                    {{ props.row.status }}
                                </q-badge>
                            </q-td>
                        </template>

                    </q-table>
                    <q-btn icon="add" label="Thêm Mới" color="secondary" @click="openAddModal" class="add-button" />
                </div>
            </q-page>
        </q-page-container>

        <!-- Add Modal -->
        <q-dialog v-model="addModal" full-width position="top">

            <q-card class="row">
                <q-card-section>
                    <div class="text-h4" style="color: blue;">THÊM MỚI PHÔNG</div>
                </q-card-section>
                <q-card-section>
                    <q-list class="row">

                        <!-- mÃ PHÔNG -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select dense v-model="newRow.Code_form" label="MÃ PHÔNG *" label-color="blue"
                                    @filter="filter_Code" :options="list_Code" lazy-rules behavior="menu"
                                    :rules="['Vui Lòng Chọn Kho']" use-input use-chips
                                    @new-value="addNewName"></q-select>
                            </q-item-section>
                        </q-item>
                        <!-- Phông -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select dense v-model="newRow.Storage_form" label="TÊN PHÔNG *" label-color="blue"
                                    @filter="filter_Storage" :options="list_Storage" lazy-rules behavior="menu"
                                    :rules="['Vui Lòng Chọn Kho']" use-input use-chips
                                    @new-value="addNewName"></q-select>
                            </q-item-section>
                        </q-item>



                        <!-- DATE -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-input v-model="newRow.date" label="NGÀY TẠO" label-color="blue" lazy-rules :rules="[
                                    (val) => (val && val.length > 0) || 'Không được để trống',
                                ]"></q-input>
                            </q-item-section>
                        </q-item>

                        <!-- TRẠNG THÁI -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select dense v-model="newRow.status" label="TRẠNG THÁI*" label-color="blue"
                                    @filter="filter_status" :options="list_status" lazy-rules behavior="menu"
                                    :rules="['Vui Lòng Chọn Kho']" use-input use-chips
                                    @new-value="addNewName"></q-select>
                            </q-item-section>
                        </q-item>
                    </q-list>


                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Hủy" icon="cancel" push type="reset" color="deep-orange"
                        class="q-ml-sm text-capitalize" v-close-popup />
                    <q-btn flat label="Thêm" type="submit" push icon="save" class="text-capitalize" color="secondary"
                        @click="addNewRow" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Edit Modal -->
        <q-dialog v-model="editModal" full-width position="top">
            <q-card class="row">
                <q-card-section>
                    <div class="text-h4" style="color: blue;">CHỈNH SỬA PHÔNG</div>
                </q-card-section>
                <q-card-section>
                    <q-list class="row">

                        <!-- mÃ PHÔNG -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select dense v-model="editedRow.Code_form" label="MÃ PHÔNG *" label-color="blue"
                                    @filter="filter_Code" :options="list_Code" lazy-rules behavior="menu"
                                    :rules="['Vui Lòng Chọn Kho']" use-input use-chips
                                    @new-value="editNewName"></q-select>
                            </q-item-section>
                        </q-item>
                        <!-- Phông -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select dense v-model="editedRow.Storage_form" label="TÊN PHÔNG *" label-color="blue"
                                    @filter="filter_Storage" :options="list_Storage" lazy-rules behavior="menu"
                                    :rules="['Vui Lòng Chọn Kho']" use-input use-chips
                                    @new-value="editNewName"></q-select>
                            </q-item-section>
                        </q-item>



                        <!-- DATE -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-input v-model="editedRow.date" label="NGÀY TẠO" label-color="blue" lazy-rules :rules="[
                                    (val) => (val && val.length > 0) || 'Không được để trống',
                                ]"></q-input>
                            </q-item-section>
                        </q-item>

                        <!-- TRẠNG THÁI -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select dense v-model="editedRow.status" label="TRẠNG THÁI*" label-color="blue"
                                    @filter="filter_status" :options="list_status" lazy-rules behavior="menu"
                                    :rules="['Vui Lòng Chọn Kho']" use-input use-chips
                                    @new-value="editNewName"></q-select>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>

                <q-card-actions align="right" style="top: 10%;">
                    <q-btn flat label="Hủy" icon="cancel" push type="reset" color="deep-orange"
                        class="q-ml-sm text-capitalize" v-close-popup />
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
        <!-- Details Modal -->
        <q-dialog v-model="detailsModal" full-width position="top">
            <q-card>
                <q-card-section>
                    <div class="text-h4" style="color: blue;">{{ detailsRow.Code_form }}</div>
                </q-card-section>
                <q-card-section style="font-size: larger;">

                    <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <q-item-section>
                            <div><strong>TÊN PHÔNG:</strong> {{ detailsRow.Storage_form }}</div>
                        </q-item-section>
                    </q-item>
                    <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <q-item-section>
                            <div><strong>NGÀY TẠO:</strong> {{ detailsRow.date }}</div>

                        </q-item-section>
                    </q-item>
                    <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <q-item-section>
                            <div><strong>TRẠNG THÁI:</strong> {{ detailsRow.status }}</div>

                        </q-item-section>
                    </q-item>

                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Đóng" color="red" v-close-popup />
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
                Code_form: '',
                Storage_form: '',
                date: '',
                status: '',
                actions: '',

            },

            editedRow: {
                id: null,
                Code_form: '',
                Storage_form: '',
                date: '',
                status: '',
                actions: '',
            },
            list_Code: ["NhomDakNong", "NhomDakLak", "NhomKienGiang", "NhomNhaTrang", "NhomQuangNam",],
            list_Storage: ["Phông Lưu Trữ Công ty Nhôm Đăk Nông - TKV ", "Phông Lưu Trữ Công ty ", "Phông Lưu Trữ Công ty ", "Phông Lưu Trữ Công ty ", "Phông Lưu Trữ Công ty ",],
            list_status: ["Active", "Inactive",],

            columns: [
                {
                    name: 'stt',

                    label: 'STT',
                    align: 'center',
                    field: 'stt'

                },

                { name: 'Code_form', label: 'MÃ', align: 'center', field: 'Code_form' },
                { name: 'Storage_form', label: 'TÊN PHÔNG', align: 'center', field: 'Storage_form' },
                { name: 'date', label: 'NGÀY TẠO', align: 'center', field: 'date' },
                { name: 'status', label: 'TRẠNG THÁI', align: 'center', field: 'status' },
                { name: 'actions', label: 'THAO TÁC', align: 'center', field: 'actions' }
            ],
            rows: [
                {
                    id: 1,
                    stt: 1,
                    Code_form: 'NhomDaKNong',
                    Storage_form: 'Phông Lưu Trữ Công ty Nhôm Đăk Nông - TKV',
                    date: '19/12/2022',
                    status: 'Active',
                    actions: ''
                },
                {
                    id: 2,
                    stt: 2,
                    Code_form: 'NhomQuangNam',
                    Storage_form: 'Phông Lưu Trữ Công ty Quang Nam',
                    date: '11/1/2021',
                    status: 'Inactive',
                    actions: ''
                },
                {
                    id: 3,
                    stt: 3,
                    Code_form: 'NhomDăKLak',
                    Storage_form: 'Phông Lưu Trữ Công ty Nhôm DakLak',
                    date: '9/6/2015',
                    status: 'Inactive',
                    actions: ''
                },
                {
                    id: 4,
                    stt: 4,
                    Code_form: 'NhomNhaTrang',
                    Storage_form: 'Phông Lưu Trữ Công ty Nha Trang',
                    date: '4/4/2024',
                    status: 'null',
                    actions: ''
                },
                {
                    id: 5,
                    stt: 4,
                    Code_form: 'NhomKienGiang',
                    Storage_form: 'Phông Lưu Trữ Công ty Kien Giang',
                    date: '13/3/2013',
                    status: 'Inactive',
                    actions: ''
                },

            ],

        };
    },
    computed: {
        filteredRows() {
            if (!this.searchQuery) {
                return this.rows;
            }
            const query = this.searchQuery.toLowerCase();
            return this.rows.filter(
                (row) =>
                    row.Code_form.toLowerCase().includes(query) ||
                    row.Storage_form.toLowerCase().includes(query) ||
                    row.date.toLowerCase().includes(query) ||
                    row.status.toLowerCase().includes(query)
            );
        },
    },
    methods: {
        openAddModal() {
            this.newRow = {
                id: null,
                Code_form: "",
                Storage_form: "",
                date: "",
                status: "",
            };
            this.addModal = true;
        },
        addNewRow() {
            if (this.newRow.Code_form && this.newRow.Storage_form && this.newRow.date && this.newRow.status) {
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
        showDetails(row) {
            this.detailsRow = { ...row }
            this.detailsModal = true
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
                title: row.Code_form,
                text: row.Storage_form,
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



.add-button {
    position: fixed;
    bottom: 1em;
    right: 1em;
}

.title {
    font-size: 30px;
}

/* Màu cho trạng thái Active */
.q-badge.active {
    background-color: green;
    color: white;
}

/* Màu cho trạng thái Inactive */
.q-badge.inactive {
    background-color: red;
    color: white;
}
</style>