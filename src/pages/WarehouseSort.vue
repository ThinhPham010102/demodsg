<template>
  <div class="q-gutter-md">
    <div class="row q-pa-sm">
      <q-btn
        label="Chọn hồ sơ"
        @click="onDrawerSelectBriefCase"
        icon="fact_check"
        class="q-ml-sm text-capitalize"
        color="green"
        :dense="$q.screen.lt.md"
        :size="$q.screen.lt.sm ? 'sm' : 'md'"
      />
    </div>
    <Warehouse-Select-Sort @submit="onSubmit"></Warehouse-Select-Sort>
    <q-card>
      <brief-case-table
        :viewCreate="false"
        :viewExport="false"
        title="Danh sách hồ sơ đã chọn"
        processType="warehouse_selected"
        :datas="briefCaseDatas"
        @infoData="infoData($event)"
      ></brief-case-table>
    </q-card>
    <q-drawer
      v-model="drawerSelectBriefCase"
      bordered
      :width="autoDrawerWidth"
      side="right"
      behavior="mobile"
      overlay
      no-swipe-close
      no-swipe-open
      no-swipe-backdrop
    >
      <brief-case-table
        ref="BriefTableSelect"
        :viewCreate="false"
        :viewExport="false"
        @selectChange="selectedBriedCaseExpireChange"
        processType="warehouse_sort"
        :datas="briefCaseExpireDatas"
        @infoData="infoData($event)"
      ></brief-case-table>
      <q-card-actions align="center">
        <q-btn
          label="Chọn hồ sơ"
          @click="selectBriefCaseClick"
          icon="fact_check"
          class="q-ml-sm text-capitalize"
          color="green"
          :dense="$q.screen.lt.md"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
        />
        <q-btn
          v-if="!$q.screen.lt.md"
          icon="cancel"
          :dense="$q.screen.lt.md"
          :size="$q.screen.lt.sm ? 'sm' : 'md'"
          label="Đóng"
          color="red"
          @click="drawerSelectBriefCase = !drawerSelectBriefCase"
        />
      </q-card-actions>
      <q-separator />
    </q-drawer>
  </div>
</template>

<script>
import { date } from "quasar";
export default {
  components: {
    WarehouseSelectSort: () =>
      import("components/WareHouse/WarehouseSelectSoft.vue"),
    BriefCaseTable: () => import("components/BriefCase/BriefCaseTable.vue"),
  },
  props: {
    value: {},
    viewEdit: {
      default: true,
      type: Boolean,
    },
    viewApprove: {
      default: true,
      type: Boolean,
    },
    viewSendApprove: {
      default: true,
      type: Boolean,
    },
    viewReject: {
      default: true,
      type: Boolean,
    },
    processType: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      selectedBriedCaseExpire: [],
      drawerSelectBriefCase: false,
      titleApprove: "",
      contentApprove: "",
      confirmSendApprove: false,
      confirmReject: false,
      title: "Chi tiết quyết định",
      accept: false,
      Destroy_Info: "",
      briefCase_Info: "",
      viewCreateBriefCase: false,
      viewExportBriefCase: false,
      briefCaseDatas: [],
      briefCaseExpireDatas: [
        {
          BriefCaseId: "1",
          Title: "Kế hoạch 3 tháng đầu năm 2020",
          FileNotation: "hồ sơ 001",
          StartDate: "2020-01-01",
          EndDate: "2020-03-31",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Hết hạn",
            Color: "green",
          },
          Description: "",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
        },
        {
          BriefCaseId: "2",
          Title: "Kế hoạch quý 2 năm 2020",
          FileNotation: "hồ sơ 002",
          StartDate: "2020-04-01",
          EndDate: "2020-06-30",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Hết hạn",
            Color: "green",
          },
          Description: "",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
        },
        {
          BriefCaseId: "3",
          Title: "Kế hoạch quý 3 năm 2020",
          FileNotation: "hồ sơ 003",
          StartDate: "2020-07-01",
          EndDate: "2020-9-30",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Hết hạn",
            Color: "green",
          },
          Description: "",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
        },
        {
          BriefCaseId: "4",
          Title: "Kế hoạch 3 tháng cuối năm 2020",
          FileNotation: "hồ sơ 004",
          StartDate: "2020-10-01",
          EndDate: "2020-12-30",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Hết hạn",
            Color: "green",
          },
          Description: "",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
        },
      ],
    };
  },
  created() {
    this.Destroy_Info = this.value;
  },
  mounted() {
    if (this.processType) {
      switch (this.processType) {
        case "collect":
          this.props.viewEdit = false;
          this.props.viewApprove = false;
          this.props.viewSendApprove = false;
          this.props.viewReject = false;
          this.props.viewCreateBriefCase = false;
          this.props.viewExportBriefCase = true;
          break;
        case "info":
          this.props.props.viewEdit = true;
          this.props.viewSendApprove = true;
          this.props.viewReject = false;
          this.props.viewApprove = false;
          this.props.viewCreateBriefCase = true;
          this.props.viewExportBriefCase = true;
        case "approve":
          this.props.viewEdit = false;
          this.props.viewSendApprove = false;
          this.props.viewReject = true;
          this.props.viewApprove = true;
          this.props.viewCreateBriefCase = false;
          this.props.viewExportBriefCase = false;
      }
    }
  },
  computed: {
    autoDrawerWidth: function () {
      if ("$q.screen.lt.lg") {
        return 1000;
      }
      return 700;
    },
    displayApprove: function () {
      if (!this.viewApprove) return false;
      if (this.Destroy_Info.isApproved) {
        return false;
      }
      return true;
    },
    displaySubmit: function () {
      if (!this.viewSendApprove) return false;
      if (this.Destroy_Info.IsSubmited) {
        return false;
      }
      return true;
    },
    displayEdit: function () {
      if (!this.viewEdit) return false;
      if (this.Destroy_Info.IsSubmited || this.Destroy_Info.IsApproved) {
        return false;
      }
      return true;
    },
    displayReject: function () {
      if (!this.viewReject) return false;
      if (this.Destroy_Info.IsApproved) {
        return false;
      }
      return true;
    },
  },
  methods: {
    onDrawerSelectBriefCase() {
      debugger;
      this.drawerSelectBriefCase = !this.drawerSelectBriefCase;
      this.$refs.BriefTableSelect.clearSelection();
    },
    onSubmit(data) {
      if (this.briefCaseDatas.length == 0) {
        this.$q.notify({
          type: "negative",
          position: "center",
          message: "Vui lòng chọn danh sách hồ sơ",
        });
        return;
      }
      this.$q.notify({
        type: "positive",
        position: "center",
        message: "Gắn kho lưu trữ hồ sơ thành công",
      });
      this.selectedBriedCaseExpire = [];
      this.briefCaseDatas = [];
    },
    selectedBriedCaseExpireChange(val) {
      this.selectedBriedCaseExpire = val;
    },
    selectBriefCaseClick() {
      debugger;
      this.briefCaseDatas = [
        ...this.selectedBriedCaseExpire,
        ...this.briefCaseDatas,
      ];
      this.drawerSelectBriefCase = false;
      this.selectedBriedCaseExpire.forEach((item, index) => {
        var bcIndex = this.briefCaseExpireDatas.indexOf(item);
        this.briefCaseExpireDatas.splice(bcIndex, 1);
      });
    },
    formattedDate(dateString) {
      try {
        return date.formatDate(dateString, "DD/MM/YYYY");
      } catch {}
      return "";
    },
    openFormSendApproveClick() {
      this.titleApprove = "Gửi duyệt quyết định tiêu hủy?";
      this.contentApprove = "Bạn muốn gửi duyệt quyết định: ";
      this.confirmSendApprove = true;
    },
    openFormApproveClick() {
      this.titleApprove = "Duyệt quyết định tiêu hủy?";
      this.contentApprove = "Bạn muốn duyệt quyết định tiêu hủy: ";
      this.confirmSendApprove = true;
    },
    sendApproveClick() {
      if (this.viewSendApprove) {
        this.confirmSendApprove = false;
        this.sendApprove();
        this.$q.notify({
          type: "positive",
          position: "center",
          timeout: 1000,
          message: "Gửi duyệt thành công",
        });
      } else if (this.viewApprove) {
        this.confirmSendApprove = false;
        this.approve();
        this.$q.notify({
          type: "positive",
          position: "center",
          timeout: 1000,
          message: "Duyệt thành công",
        });
      }
    },
    approve() {
      this.$emit("approve", { ...this.value });
    },
    sendApprove() {
      this.$emit("submit", { ...this.value });
    },
    backClick() {
      this.$emit("backClick");
    },
    editClick(value) {
      this.$emit("editData", { ...value });
    },
    TableAddOrUpdate: function (data) {
      value = data;
    },
    UpdateInfo(value) {
      value = value;
    },
    infoData(data) {
      this.briefCase_Info = data;
      this.$emit("infoData", data);
    },
  },
};
</script>
