<template>
  <div class="q-pa-md">
    <q-form class="col-lg-12 q-gutter-md">
      <q-card class="card-bg">
        <q-card-section class="text-h6 border-top">
          <div style="float: left">
            <q-btn flat color="black" icon="arrow_back" @click="backClick">
              <q-tooltip>Quay lại</q-tooltip>
            </q-btn>
          </div>
          <div class="text-h6" style="color: blue">{{ title }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <brief-case-info :value="value"></brief-case-info>
        </q-card-section>
        <q-card-actions vertical align="center">
          <div class="row">
            <q-btn
              v-if="displaySubmit"
              label="Gửi duyệt"
              @click="openFormSendApproveClick"
              icon="send"
              class="q-ml-sm text-capitalize"
              color="purple"
              :dense="$q.screen.lt.md"
              :size="$q.screen.lt.sm ? 'sm' : 'md'"
            />
            <q-btn
              label="Duyệt"
              v-if="displayApprove"
              @click="openFormApproveClick"
              icon="done"
              class="q-ml-sm text-capitalize"
              color="purple"
              :dense="$q.screen.lt.md"
              :size="$q.screen.lt.sm ? 'sm' : 'md'"
            />
            <q-btn
              v-if="displayReject"
              label="Từ chối"
              @click="openFormRejectClick"
              icon="cancel_schedule_send"
              class="q-ml-sm text-capitalize"
              color="red"
              :dense="$q.screen.lt.md"
              :size="$q.screen.lt.sm ? 'sm' : 'md'"
            />
            <q-btn
              v-if="displayEdit"
              label="Chỉnh sửa"
              icon="edit"
              :dense="$q.screen.lt.md"
              :size="$q.screen.lt.sm ? 'sm' : 'md'"
              color="secondary"
              @click="editClick(value)"
              class="q-ml-sm text-capitalize"
            />
          </div>
        </q-card-actions>
      </q-card>
      <q-card>
        <document-table
          :viewCreate="viewCreate"
          :viewExport="viewExport"
          :processType="processType"
        >
        </document-table>
      </q-card>
    </q-form>
    <q-dialog v-model="confirmSendApprove" persistent>
      <q-card>
        <q-card-section class="row bg-teal text-white items-center">
          <q-avatar
            :size="$q.screen.lt.sm ? 'sm' : 'md'"
            icon="info"
            color="red"
            text-color="white"
          />
          <div>
            <span class="q-ml-sm">{{ titleApprove }}</span>
            <br />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>
            <span class="q-ml-sm">{{ contentApprove }}</span>
            <br />
            <span
              class="q-ml-sm"
              style="font-weight: bold; font-style: italic"
              >{{ value.FileNotation }}</span
            >
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            icon="cancel"
            :dense="$q.screen.lt.md"
            :size="$q.screen.lt.sm ? 'sm' : 'md'"
            label="Hủy"
            color="red"
            v-close-popup
          />
          <q-btn
            icon="done"
            label="Đồng ý"
            color="green"
            :dense="$q.screen.lt.md"
            :size="$q.screen.lt.sm ? 'sm' : 'md'"
            @click="sendApproveClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmReject" persistent>
      <q-card>
        <q-card-section class="row bg-teal text-white items-center">
          <q-avatar
            :size="$q.screen.lt.sm ? 'sm' : 'md'"
            icon="info"
            color="red"
            text-color="white"
          />
          <div>
            <span class="q-ml-sm">Từ chối hồ sơ?</span>
            <br />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>
            <span class="q-ml-sm">Bạn muốn từ chối duyệt hồ sơ: </span>
            <br />
            <span
              class="q-ml-sm"
              style="font-weight: bold; font-style: italic"
              >{{ value.PlanName }}</span
            >
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            icon="cancel"
            :dense="$q.screen.lt.md"
            :size="$q.screen.lt.sm ? 'sm' : 'md'"
            label="Hủy"
            color="primary"
            v-close-popup
          />
          <q-btn
            icon="done"
            label="Đồng ý"
            color="green"
            :dense="$q.screen.lt.md"
            :size="$q.screen.lt.sm ? 'sm' : 'md'"
            @click="sendApproveClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { date } from "quasar";

const title = ref("Chi tiết hồ sơ");
const titleApprove = ref("");
const contentApprove = ref("");
const confirmSendApprove = ref(false);
const confirmReject = ref(false);
const accept = ref(false);
const plan_Info = ref("");
const viewCreate = ref(false);
const viewExport = ref(false);

onMounted(() => {
  plan_Info.value = props.value;
  if (props.processType) {
    switch (props.processType) {
      case "collect":
        viewExport.value = true;
        break;
      case "info":
        viewEdit.value = true;
        viewSendApprove.value = true;
        viewCreate.value = true;
        viewExport.value = true;
        break;
      case "catalog_list":
        viewSendApprove.value = true;
        viewCreate.value = true;
        break;
      case "catalog_approve":
        viewApprove.value = true;
        viewReject.value = true;
        break;
    }
  }
  viewSendApprove.value = plan_Info.value.IsSubmited ? false : true;
});

const viewEdit = ref(false);
const viewApprove = ref(false);
const viewReject = ref(false);

const displayApprove = computed(() => {
  if (!viewApprove.value) return false;
  if (plan_Info.value.isApproved) {
    return false;
  }
  return true;
});

const displaySubmit = computed(() => {
  if (!viewSendApprove.value) return false;
  if (plan_Info.value.IsSubmited) {
    return false;
  }
  return true;
});

const displayEdit = computed(() => {
  if (!viewEdit.value) return false;
  if (plan_Info.value.IsSubmited || plan_Info.value.IsApproved) {
    return false;
  }
  return true;
});

const displayReject = computed(() => {
  if (!viewReject.value) return false;
  if (plan_Info.value.IsApproved) {
    return false;
  }
  return true;
});

const formattedDate = (dateString) => {
  try {
    return date.formatDate(dateString, "DD/MM/YYYY");
  } catch {
    return "";
  }
};

const openFormSendApproveClick = () => {
  titleApprove.value = "Gửi duyệt hồ sơ?";
  contentApprove.value = "Bạn muốn gửi duyệt hồ sơ: ";
  confirmSendApprove.value = true;
};

const openFormApproveClick = () => {
  titleApprove.value = "Duyệt hồ sơ?";
  contentApprove.value = "Bạn muốn duyệt hồ sơ: ";
  confirmSendApprove.value = true;
};

const sendApproveClick = () => {
  if (viewSendApprove.value) {
    confirmSendApprove.value = false;
    sendApprove();
    $q.notify({
      type: "positive",
      position: "center",
      timeout: 1000,
      message: "Gửi duyệt thành công",
    });
  } else if (viewApprove.value) {
    confirmSendApprove.value = false;
    approve();
    $q.notify({
      type: "positive",
      position: "center",
      timeout: 1000,
      message: "Duyệt thành công",
    });
  }
};

const approve = () => {
  emit("approve", { ...props.value });
};

const sendApprove = () => {
  emit("submit", { ...props.value });
};

const backClick = () => {
  emit("backClick");
};

const editClick = (value) => {
  emit("editData", { ...value });
};

const TableAddOrUpdate = (data) => {
  value = data;
};

const UpdateInfo = (value) => {
  value = value;
};
</script>
