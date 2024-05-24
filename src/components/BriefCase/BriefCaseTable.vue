<template>
  <div>
    <q-table
      ref="BriefCaseTable"
      :rows="localDatas"
      :columns="columns"
      :row-key="(row) => row.BriefCaseId"
      selection="multiple"
      @update:selected="SelectChange"
      separator="cell"
      bordered
      :visible-columns="visibleColumns"
      :filter="filter"
      :title="title"
      virtual-scroll
      :dense="dense"
      :size="$q.screen.lt.sm ? 'sm' : 'md'"
      :grid="$q.screen.xs"
      v-model:selected="selected"
    >
      <template #top-right="{}">
        <q-input
          :dense="$q.screen.lt.md"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
          debounce="300"
          class="q-mr-sm"
          v-model="filter"
          placeholder="Tìm kiếm"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          label="Thêm mới"
          color="secondary"
          v-if="viewCreate"
          :dense="$q.screen.lt.md"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
          class="float-right q-mr-sm text-capitalize shadow-3"
          icon="add"
          @click="createBriefCaseClick"
        />
        <q-btn
          label="Xuất file"
          color="purple"
          v-if="viewExport"
          :dense="$q.screen.lt.md"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
          class="float-right q-mr-sm text-capitalize shadow-3"
          icon="add"
        />
      </template>
      <template #body-cell-RangeDate="{ props }">
        <q-td :props="props">
          <span>{{ formattedDate(props.row.StartDate) }}</span> -
          <span>{{ formattedDate(props.row.EndDate) }}</span>
        </q-td>
      </template>
      <template #body-cell-NumPageImage="{ props }">
        <q-td :props="props">
          <span>{{ props.row.NumPage }}</span> /
          <span>{{ props.row.NumImage }}</span>
        </q-td>
      </template>
      <template #body-cell-Status="{ props }">
        <q-td :props="props">
          <q-badge :color="props.row.Status.Color">
            {{ props.row.Status.Name }}
          </q-badge>
        </q-td>
      </template>
      <template v-if="viewActionColumn" #body-cell-Action="{ props }">
        <q-td :props="props">
          <q-btn
            v-if="viewInfo"
            @click="infoClick(props.row)"
            icon="info"
            size="sm"
            class="q-ml-sm"
            flat
            dense
          />
          <q-btn
            v-if="viewEdit"
            @click="editClick(props.row)"
            icon="edit"
            size="sm"
            class="q-ml-sm"
            flat
            dense
          />
          <q-btn
            v-if="viewDelete"
            @click="OpenDeleteConfirm(props.row)"
            icon="delete"
            size="sm"
            class="q-ml-sm"
            flat
            dense
          />
          <q-btn
            v-if="viewCancel"
            @click="CancelClick(props.row)"
            icon="cancel"
            size="sm"
            class="q-ml-sm"
            flat
            dense
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row bg-teal text-white items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <div>
            <span class="q-ml-sm">Bạn muốn thực hiện xóa hồ sơ?</span>
            <br />
            <span class="q-ml-sm" style="font-weight: bold">{{
              BriefCaseNameDelete
            }}</span>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn icon="cancel" label="Hủy" color="primary" v-close-popup />
          <q-btn
            :disabled="!BriefCaseIdDelete"
            icon="delete"
            label="Xóa"
            color="red"
            @click="deleteClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      persistent
      class="col-lg-12"
      v-model="dialogAdd"
      position="top"
      :no-focus="dialogAdd"
    >
      <brief-case-add
        ref="BriefCase_Add"
        :form_Data="briefCase_data"
        @close="dialogAdd = false"
        @create="AddOrUpdateBriefCase($event)"
      />
    </q-dialog>
  </div>
</template>
<script>
import { ref, watch, computed } from "vue";
import { date } from "quasar";

export default {
  props: {
    datas: Array,
    viewCreate: { default: true, type: Boolean },
    viewEdit: { default: true, type: Boolean },
    viewCancel: { default: true, type: Boolean },
    viewDelete: { default: true, type: Boolean },
    viewExport: { default: true, type: Boolean },
    viewInfo: { default: true, type: Boolean },
    viewActionColumn: { default: true, type: Boolean },
    processType: { default: "", type: String },
    title: { default: "Danh sách hồ sơ", type: String },
  },
  name: "BriefCaseTable",
  components: {
    BriefCaseAdd: () => import("components/BriefCase/BriefCaseAdd"),
  },
  setup(props, { emit }) {
    const filter = ref("");
    const BriefCaseNameDelete = ref("");
    const BriefCaseIdDelete = ref("");
    const briefCase_data = ref("");
    const dialogAdd = ref(false);
    const confirmDelete = ref(false);
    const selected = ref([]);
    const localDatas = ref([...props.datas]);

    watch(
      () => props.datas,
      (newDatas) => {
        localDatas.value = [...newDatas];
        formatIndex();
      },
      { immediate: true }
    );

    const dense = computed(() => {
      if (props.processType === "destroy_expired") return true;
      return $q.screen.lt.md;
    });

    const visibleColumns = ref([
      "FileNotation",
      "Title",
      "RangeDate",
      "Maintenance",
      "NumPageImage",
      "DepositoryName",
      "Classify",
      "Description",
      "Status",
      "Action",
    ]);

    const columns = ref([
      {
        name: "index",
        label: "#",
        field: "index",
      },
      {
        name: "desc",
        required: true,
        label: "Số ký hiệu hồ sơ",
        align: "left",
        field: (row) => row.FileNotation,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Title",
        align: "left",
        label: "Tiêu đề hồ sơ",
        field: "Title",
      },
      {
        name: "RangeDate",
        align: "left",
        label: "Thời gian tài liệu",
        field: "RangeDate",
      },
      {
        name: "Maintenance",
        align: "left",
        label: "Thời hạn bảo quản",
        field: (row) => row.Maintenance.label,
      },
      {
        name: "NumPageImage",
        align: "left",
        label: "Số tờ/ Số trang",
        field: "NumPageImage",
      },
      {
        name: "DepositoryName",
        align: "left",
        label: "Đơn vị nộp lưu",
        field: "DepositoryName",
      },
      {
        name: "Classify",
        align: "left",
        label: "Phân loại",
        field: "Classify",
      },
      {
        name: "Description",
        align: "left",
        label: "Ghi chú",
        field: "Description",
      },
      {
        name: "Status",
        align: "center",
        label: "Trạng thái",
        field: "Status",
      },
      {
        name: "Action",
        label: "Thao tác",
        field: "Action",
        style: "width: 100px !important",
        sortable: false,
        align: "center",
      },
    ]);

    const formatIndex = () => {
      localDatas.value.forEach((row, index) => {
        row.index = index + 1;
      });
    };

    const formattedDate = (dateString) => {
      try {
        return date.formatDate(dateString, "DD/MM/YYYY");
      } catch {
        return "";
      }
    };

    const createBriefCaseClick = () => {
      briefCase_data.value = "";
      dialogAdd.value = true;
    };

    const closeDialogAddClick = () => {
      briefCase_data.value = "";
      dialogAdd.value = false;
    };

    const SelectChange = (details) => {
      emit("selectChange", details);
    };

    const methods = {
      clearSelection() {
        this.$refs.BriefCaseTable.clearSelection();
      },
      SelectChange,
      formatIndex,
      formattedDate,
      createBriefCaseClick,
      closeDialogAddClick,
      editClick(data) {
        briefCase_data.value = { ...data };
        dialogAdd.value = true;
      },
      infoClick(data) {
        console.log(data);
        emit("infoData", { ...data });
      },
      OpenDeleteConfirm(data) {
        console.log(data);
        // Handle opening delete confirmation
      },
      CancelClick(data) {
        localDatas.value = localDatas.value.filter(
          (item) => item.BriefCaseId !== data.BriefCaseId
        );
        emit("update:datas", localDatas.value);
      },
      deleteClick() {
        localDatas.value = localDatas.value.filter(
          (item) => item.PlanId !== BriefCaseIdDelete.value
        );
        confirmDelete.value = false;
        emit("update:datas", localDatas.value);
      },
      UpdateStatus(data) {
        localDatas.value.forEach((item, index) => {
          if (item.BriefCaseId === data.BriefCaseId) {
            item.Status = data.Status;
          }
        });
        emit("update:datas", localDatas.value);
      },
      AddOrUpdateBriefCase(data) {
        if (!data.IsNew) {
          localDatas.value.forEach((item, index) => {
            if (item.BriefCaseId === data.BriefCaseId) {
              localDatas.value[index] = { ...data };
            }
          });
        } else {
          data.BriefCaseId = 100;
          data.Status = { Name: "Mới", Color: "green" };
          localDatas.value = [data, ...localDatas.value];
          formatIndex();
        }
        emit("update:datas", localDatas.value);
        closeDialogAddClick();
      },
    };

    return {
      filter,
      BriefCaseNameDelete,
      BriefCaseIdDelete,
      briefCase_data,
      dialogAdd,
      confirmDelete,
      selected,
      localDatas,
      visibleColumns,
      columns,
      dense,
      ...methods,
    };
  },
};
</script>
