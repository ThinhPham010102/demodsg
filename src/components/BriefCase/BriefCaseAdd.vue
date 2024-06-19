<template>
  <div class="col-12">
    <q-form @submit="onSubmit" @reset="onReset" class="col-lg-12">
      <q-card class="card-bg">
        <q-card-section class="text-h6">
          <div class="text-h6" style="color: blue">{{ title }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list class="row">
            <q-item class="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <!-- Phông -->
              <q-item-section>
                <q-select
                  v-model="briefCase_form.Organization"
                  use-input
                  @filter="filter_Fond"
                  @update:model-value="organizationChange"
                  :options="list_Data.list_Fond"
                  label="Phông *"
                  label-color="blue"
                  behavior="menu"
                  :rules="[(val) => val || 'Vui lòng chọn phông']"
                />
              </q-item-section>
            </q-item>
            <!-- More q-item components here -->
          </q-list>

       </q-card-section>
          <!-- Lưu & Hủy-->

        <q-card-actions vertical align="center">
          <div class="row">
            <q-btn
              label="Lưu"
              type="submit"
              push
              icon="save"
              class="text-capitalize"
              color="secondary"
            />
            <q-btn
              label="Hủy"
              icon="cancel"
              push
              type="reset"
              color="deep-orange"
              class="q-ml-sm text-capitalize"
              @click="closeClick"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { date } from "quasar";

export default {
  props: ["form_Data"],
  setup(props) {
    const title = ref("");
    const briefCase_form = ref({
      Organization: "",
      FileCode: "",
      Identifier: "",
      StartDate: "",
      EndDate: "",
      // Other properties...
    });
    const accept = ref(false);
    // Other setup variables...

    const formattedStartDate = computed(() => {
      return date.formatDate(briefCase_form.value.StartDate, "DD/MM/YYYY");
    });

    const formattedEndDate = computed(() => {
      return date.formatDate(briefCase_form.value.EndDate, "DD/MM/YYYY");
    });

    const optionsStartDate = (date) => {
      // optionsStartDate method logic
    };

    const optionsEndDate = (date) => {
      // optionsEndDate method logic
    };

    const onSubmit = () => {
      // onSubmit method logic
    };

    const filter_Fond = (val, update) => {
      // filter_Fond method logic
    };

    const organizationChange = () => {
      // organizationChange method logic
    };

    const closeClick = () => {
      // closeClick method logic
    };
    // Return variables and methods needed in template
    return {
      title,
      briefCase_form,
      accept,
      formattedStartDate,
      formattedEndDate,
      FileCode,
      optionsStartDate,
      optionsEndDate,
      onSubmit,
      filter_Fond,
      organizationChange,
      closeClick,
      // Other variables and methods...
    };
  },
};
</script>

<style>
.q-item {
  padding: 0px 16px !important;
}
</style>
