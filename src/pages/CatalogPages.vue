<template>
  <div>
    <q-form class="col-lg-12 q-gutter-md">
      <q-card>
        <brief-case-table
          ref="BriefCaseTable"
          v-show="showTable"
          :title="titleTable"
          :viewCreate="true"
          :viewExport="false"
          :processType="processType"
          :datas="briefCaseDatas"
          @infoData="infoData"
        ></brief-case-table>
        <brief-case-process
          :value="briefCaseInfo"
          processType="info"
          v-if="showBriefCaseInfo"
          @submit="submitClick"
          @backClick="infoBriefCaseBackClick"
        ></brief-case-process>
      </q-card>
    </q-form>
  </div>
</template>

<script>
export default {
  components: {
    BriefCaseProcess: () => import("components/BriefCase/BriefCaseProcess"),
    BriefCaseTable: () => import("components/BriefCase/BriefCaseTable"),
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
  },
  setup(props, { emit }) {
    const showTable = ref(true);
    const showBriefCaseInfo = ref(false);
    const briefCaseInfo = ref(null);
    const briefCaseDatas = reactive({
      briefCaseListDatas: [
        {
          BriefCaseId: "1",
          Title: "Hồ sơ bổ sung 3 tháng đầu năm 2020",
          // Other properties...
        },
        // Other data...
      ],
      briefCaseApproveDatas: [
        {
          BriefCaseId: "1",
          Title: "Hồ sơ bổ sung 3 tháng đầu năm 2020",
          // Other properties...
        },
        // Other data...
      ],
    });

    const titleTable = ref("Danh sách hồ sơ");
    const processType = ref("");

    onMounted(() => {
      preLoad();
    });

    watchEffect(() => {
      if (processType.value === "catalog_list") {
        titleTable.value = "Danh sách hồ sơ";
      } else if (processType.value === "catalog_approve") {
        titleTable.value = "Danh sách hồ sơ cần duyệt";
      }
    });

    const preLoad = () => {
      const type = props.$route.params.type;
      if (type === "list") {
        processType.value = "catalog_list";
        briefCaseDatas.briefCaseDatas = briefCaseDatas.briefCaseListDatas;
      } else if (type === "approve") {
        processType.value = "catalog_approve";
        briefCaseDatas.briefCaseDatas = briefCaseDatas.briefCaseApproveDatas;
      }
      this.editModal = false;
    }
  }
}

</script>
