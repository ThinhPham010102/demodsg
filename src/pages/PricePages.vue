<template>
    <q-layout>
        <q-page-container>
            <q-page class="q-pa-md" style="background-color: aliceblue;">
                <div
                    class="q-table__container q-table--cell-separator column no-wrap q-table__card q-table--bordered q-table--dense q-table--no-wrap q-pa-sm">
                    <div class="header">
                        <div class="title">DANH SÁCH GIÁ</div>
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
                        <template v-slot:body-cell-status="props">
                            <q-td :props="props">
                                <q-badge :color="props.row.status.color">
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
                    <div class="text-h4" style="color: blue;">THÊM MỚI GIÁ</div>
                </q-card-section>

                <q-card-section>
                    <q-list class="row">

                        <!--GIÁ-->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select v-model="newRow.Price_form" label="TÊN GIÁ" label-color="blue"
                                    @filter="filter_Price" :options="list_Price" lazy-rules
                                    :rules="['Không được để trống']" use-input use-chips
                                    @new-value="addNewName"></q-select>
                            </q-item-section>
                        </q-item>

                        <!-- KHO TÒA NHÀ -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select v-model="newRow.warehouse_form" label="KHO_TÒA NHÀ" label-color="blue"
                                    @filter="filter_Ware" :options="list_Ware" lazy-rules
                                    :rules="['Không được để trống']" use-input use-chips
                                    @new-value="addNewName"></q-select>
                            </q-item-section>
                        </q-item>

                        <!-- TẦNG -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select v-model="newRow.Floor_form" label="TÊN TẦNG" label-color="blue"
                                    @filter="filter_Floor" :options="list_Floor" lazy-rules
                                    :rules="['Không được để trống']" use-input use-chips
                                    @new-value="addNewName"></q-select>
                            </q-item-section>
                        </q-item>

                        <!-- Phòng -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select v-model="newRow.Room_form" label="MÃ PHÒNG" label-color="blue"
                                    @filter="filter_Room" :options="list_Room" lazy-rules
                                    :rules="['Không được để trống']" use-input use-chips
                                    @new-value="addNewName"></q-select>
                            </q-item-section>
                        </q-item>
                        <!-- TỦ KỆ -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select v-model="newRow.Shelf_form" label="TÊN TỦ/KỆ" label-color="blue"
                                    @filter="filter_Shelf" :options="list_Shelf" lazy-rules
                                    :rules="['Không được để trống']" use-input use-chips
                                    @new-value="addNewName"></q-select>
                            </q-item-section>
                        </q-item>
                        <!-- NGÀY TẠO -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-input v-model="newRow.date" label=" NGÀY TẠO" label-color="blue" lazy-rules :rules="[
                                    (val) => (val && val.length > 0) || 'Không được để trống',
                                ]"></q-input>
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
                    <div class="text-h4" style="color: blue;">CHỈNH SỬA GIÁ</div>
                </q-card-section>
                <q-card-section>
                    <q-list class="row">

                        <!--GIÁ-->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select v-model="editedRow.Price_form" label="TÊN GIÁ" label-color="blue"
                                    @filter="filter_Price" :options="list_Price" lazy-rules
                                    :rules="['Không được để trống']" use-input use-chips
                                    @new-value="editNewName"></q-select>
                            </q-item-section>
                        </q-item>
                        <!-- Tiêu đề hồ sơ -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select v-model="editedRow.Shelf_form" label="TÊN KỆ" label-color="blue"
                                    @filter="filter_Shelf" :options="list_Shelf" lazy-rules
                                    :rules="['Không được để trống']" use-input use-chips
                                    @new-value="editNewName"></q-select>
                            </q-item-section>
                        </q-item>
                        <!-- Thông tin hồ sơ -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select v-model="editedRow.warehouse_form" label="KHO_TÒA NHÀ" label-color="blue"
                                    @filter="filter_Ware" :options="list_Ware" lazy-rules
                                    :rules="['Không được để trống']" use-input use-chips
                                    @new-value="editNewName"></q-select>
                            </q-item-section>
                        </q-item>

                        <!-- Thông tin hồ sơ -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select dense v-model="editedRow.Floor_form" label="TẦNG *" label-color="blue"
                                    @filter="filter_Floor" :options="list_Floor" lazy-rules behavior="menu"
                                    :rules="['Vui Lòng Chọn Tầng']" use-input use-chips
                                    @new-value="editNewName"></q-select>
                            </q-item-section>
                        </q-item>
                        <!-- Phòng -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-select v-model="editedRow.Room_form" label="MÃ PHÒNG" label-color="blue"
                                    @filter="filter_Room" :options="list_Room" lazy-rules
                                    :rules="['Không được để trống']" use-input use-chips
                                    @new-value="editNewName"></q-select>
                            </q-item-section>
                        </q-item>
                        <!-- Thông tin hồ sơ -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-input v-model="editedRow.text" label="Tên Kệ" />
                            </q-item-section>
                        </q-item>
                        <!-- Thông tin hồ sơ -->
                        <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <q-item-section>
                                <q-input v-model="editedRow.date" label="Ngày Tạo" />
                            </q-item-section>
                        </q-item>


                    </q-list>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Hủy" icon="cancel" push type="reset" color="deep-orange"
                        class="q-ml-sm text-capitalize" v-close-popup />
                    <q-btn flat label="Thêm" type="submit" push icon="save" class="text-capitalize" color="secondary"
                        @click="saveEdit" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- Details Modal -->
        <q-dialog v-model="detailsModal" full-width position="top">
            <q-card>
                <q-card-section>
                    <div class="text-h4" style="color: blue;">{{ detailsRow.Price_form }}</div>
                </q-card-section>
                <q-card-section style="font-size: larger;">

                    <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <q-item-section>
                            <div><strong>KHO_TÒA NHÀ:</strong> {{ detailsRow.warehouse_form }}</div>
                        </q-item-section>
                    </q-item>
                    <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <q-item-section>
                            <div><strong>TẦNG:</strong> {{ detailsRow.Floor_form }}</div>

                        </q-item-section>
                    </q-item>
                    <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <q-item-section>
                            <div><strong>TÊN PHÒNG:</strong> {{ detailsRow.Room_form }}</div>

                        </q-item-section>
                    </q-item>

                    <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <q-item-section>
                            <div><strong>TÊN TỦ/KỆ:</strong> {{ detailsRow.Shelf_form }}</div>

                        </q-item-section>
                    </q-item>
                    <q-item class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <q-item-section>
                            <div><strong>NGÀY TẠO:</strong> {{ detailsRow.date }}</div>

                        </q-item-section>
                    </q-item>

                </q-card-section>
                <q-card-actions align="right">
                    <q-btn flat label="Đóng" color="red" v-close-popup />
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
                Price_form: '',
                warehouse_form: '',
                warehouse_form: '',
                Room_form: '',
                Shelf_form: '',
                date: '',
                status: '',
                actions: ''
            },
            editedRow: {
                id: null,
                Price_form: '',
                warehouse_form: '',
                Floor_form: '',
                Room_form: '',
                Shelf_form: '',
                date: '',
                status: '',
                actions: ''
            },
            list_Floor: ["Tầng 1", "Tầng 2", "Tầng 3", "Tầng 4", "Tầng 5",],
            list_Ware: ["Khu Vực 1", "Khu Vực 2", "Khu Vực 3", "Khu Vực 4", "Khu Vực 5"],
            list_Price: ["Giá 01", "Giá 02", "Giá 03", "Giá 04", "Giá 05",],
            list_Shelf: ["Kệ Số 1", "Kệ Số 2", "Kệ Số 3", "Kệ Số 4", "Kệ Số 5"],
            list_Room: ["P01", "P02", "P03", "P04", "P05"],

            columns: [
                {
                    name: 'stt',
                    label: 'STT',
                    align: 'center', field: 'stt',

                },

                {
                    name: 'Price_form',
                    label: 'TÊN GIÁ',
                    align: 'center',
                    field: 'Price_form'
                },

                { name: 'warehouse_form', label: 'KHO_TÒA NHÀ', align: 'center', field: 'warehouse_form' },
                { name: 'Floor_form', label: 'TẦNG', align: 'center', field: 'Floor_form' },
                { name: 'Room_form', label: 'PHÒNG', align: 'center', field: 'Room_form' },

                { name: 'Shelf_form', label: 'TÊN KỆ', align: 'center', field: 'Shelf_form' },
                { name: 'date', label: 'NGÀY TẠO', align: 'center', field: 'date' },
                { name: 'status', label: 'TRẠNG THÁI', align: 'center', field: 'status' },
                { name: 'actions', label: 'THAO TÁC', align: 'center', field: 'actions' }
            ],
            rows: [
                {
                    id: 1,
                    stt: 1,
                    Price_form: 'Giá 01',
                    warehouse_form: 'Khu Vực 1',
                    Floor_form: '1',
                    Room_form: 'P01',
                    Shelf_form: 'Kệ số 1',
                    date: '19/12/2022',
                    status: 'Mới',
                    actions: ''
                },
                {
                    id: 2,
                    stt: 2,
                    Price_form: 'Giá 02',
                    warehouse_form: 'Khu Vực 2',
                    Floor_form: '2',
                    Room_form: 'P02',

                    Shelf_form: 'Kệ số 1',
                    date: '19/13/2022',
                    status: 'Mới',
                    actions: ''
                }, {
                    id: 3,
                    stt: 3,
                    Price_form: 'Giá 03',
                    warehouse_form: 'Khu Vực 3',
                    Floor_form: '3',
                    Room_form: 'P03',

                    Shelf_form: 'Kệ số 1',
                    date: '19/12/2025',
                    status: 'Mới',
                    actions: ''
                }, {
                    id: 4,
                    stt: 4,
                    Price_form: 'Giá 04',
                    warehouse_form: 'Khu Vực 4',
                    Room_form: 'P04',
                    Floor_form: '4',
                    Shelf_form: 'Kệ số 1',
                    date: '1/1/2012',
                    status: 'Mới',
                    actions: ''
                }, {
                    id: 5,
                    stt: 5,
                    Price_form: 'Giá 05',
                    warehouse_form: 'Khu Vực 5',
                    Room_form: 'P05',
                    Floor_form: '5',
                    Shelf_form: 'Kệ số 1',
                    date: '19/9/2022',
                    status: 'Mới',
                    actions: ''
                },
            ]
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
                    row.Floor_form.toLowerCase().includes(query) ||
                    row.Shelf_form.toLowerCase().includes(query) ||
                    row.warehouse_form.toLowerCase().includes(query) ||
                    row.Price_form.toLowerCase().includes(query) ||
                    row.date.toLowerCase().includes(query) ||
                    row.status.toLowerCase().includes(query)
            );
        },
    },
    methods: {
        openAddModal() {
            this.newRow = { id: null, Price_form: '', Floor_form: '', warehouse_form: '', Shelf_form: '', date: '', status: 'Mới' };
            this.addModal = true;
        },
        addNewRow() {
            if (this.newRow.warehouse_form && this.newRow.Price_form && this.newRow.Floor_form && this.newRow.date && this.newRow.Price_form && this.newRow.Room_form) {
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