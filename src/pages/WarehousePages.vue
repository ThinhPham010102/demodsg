<template>
  <div>
    <q-form class="col-lg-12 q-gutter-md">
      <q-card>
        <brief-case-table
          ref="BriefCaseTable"
          v-show="ShowTable"
          :title="titleTable"
          :viewCreate="false"
          :viewExport="false"
          processType="warehouse"
          :datas="briefCaseDatas"
          @infoData="infoData($event)"
        ></brief-case-table>
        <brief-case-process
          :value="Brief_Case_Info"
          processType="info"
          v-if="ShowBriefCaseInfo"
          @submit="submitClick"
          @backClick="infoBriefCaseBackClick"
        ></brief-case-process>
      </q-card>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleTable: "Danh sách hồ sơ",
      titleApprove: "",
      contentApprove: "",
      confirmSendApprove: false,
      confirmReject: false,
      accept: false,
      processType: "",
      plan_Info: "",
      Brief_Case_Info: "",
      ShowTable: true,
      ShowBriefCaseInfo: false,
      viewCreateBriefCase: false,
      viewExportBriefCase: false,
      briefCaseDatas: [
        {
          BriefCaseId: "1",
          Title: "Hồ sơ bổ sung 3 tháng đầu năm 2020",
          FileNotation: "hồ sơ 001",
          StartDate: "2020-01-01",
          EndDate: "2020-03-31",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Mới",
            Color: "blue",
          },
          Description: "không có",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
          IsSubmited: false,
        },
        {
          BriefCaseId: "2",
          Title: "Hồ sơ bổ sung 6 tháng đầu năm 2020",
          FileNotation: "hồ sơ 001",
          StartDate: "2020-07-01",
          EndDate: "2020-12-30",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Mới",
            Color: "blue",
          },
          Description: "không có",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
          IsSubmited: true,
        },
        {
          BriefCaseId: "3",
          Title: "Hồ sơ bổ sung 6 tháng đầu năm 2020",
          FileNotation: "hồ sơ 001",
          StartDate: "2020-07-01",
          EndDate: "2020-12-30",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Mới",
            Color: "blue",
          },
          Description: "không có",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
          IsSubmited: true,
        },
        {
          BriefCaseId: "4",
          Title: "Hồ sơ bổ sung 6 tháng đầu năm 2020",
          FileNotation: "hồ sơ 001",
          StartDate: "2020-07-01",
          EndDate: "2020-12-30",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Mới",
            Color: "blue",
          },
          Description: "không có",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
          IsSubmited: true,
        },
        {
          BriefCaseId: "5",
          Title: "Hồ sơ bổ sung 6 tháng đầu năm 2020",
          FileNotation: "hồ sơ 001",
          StartDate: "2020-07-01",
          EndDate: "2020-12-30",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Mới",
            Color: "blue",
          },
          Description: "không có",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
          IsSubmited: true,
        },
        {
          BriefCaseId: "6",
          Title: "Hồ sơ bổ sung 6 tháng đầu năm 2020",
          FileNotation: "hồ sơ 001",
          StartDate: "2020-07-01",
          EndDate: "2020-12-30",
          Maintenance: { label: "10 năm", value: 2 },
          NumPage: "10",
          NumImage: "20",
          DepositoryName: "Phòng kế hoạch tổng hợp",
          Classify: "Số hóa",
          Status: {
            Name: "Mới",
            Color: "blue",
          },
          Description: "không có",
          Organization: {
            label: "Sở kế hoạch và đầu tư tỉnh Quảng Nam",
            Identifier: "000.010.G93",
            value: 1,
          },
          IsSubmited: true,
        },
      ],
    };
  },
  created() {},
  mounted() {},
  watch: {
    processType: function (val) {
      debugger;
      if (val == "catalog_list") this.titleTable = "Danh sách hồ sơ";
      else if (val == "catalog_approve") {
        
        this.titleTable = "Danh sách hồ sơ cần duyệt";
      }
    },
  },
  methods: {
    formattedDate(dateString) {
      try {
        return date.formatDate(dateString, "DD/MM/YYYY");
      } catch {}
      return "";
    },
    openFormSendApproveClick() {
      this.titleApprove = "Gửi duyệt kế hoạch?";
      this.contentApprove = "Bạn muốn gửi duyệt kế hoạch: ";
      this.confirmSendApprove = true;
    },
    openFormApproveClick() {
      this.titleApprove = "Duyệt kế hoạch?";
      this.contentApprove = "Bạn muốn duyệt kế hoạch: ";
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
      debugger;
      this.ShowBriefCaseInfo = true;
      this.ShowTable = false;
      this.Brief_Case_Info = data;
    },
    infoBriefCaseBackClick() {
      this.ShowBriefCaseInfo = false;
      this.ShowTable = true;
      this.Brief_Case_Info = "";
    },
    submitClick(data) {
      //Call API submit
      data.Status = {
        Name: "Chờ duyệt",
        Color: "green",
      };
      //Update table
      this.$refs.BriefCaseTable.UpdateStatus(data);
      this.ShowTable = true;
      this.ShowBriefCaseInfo = false;
    },
  },
};
</script>
