<template>
  <q-form ref="wareHouse_form" class="col-lg-12">
    <q-card class="card-bg">
      <q-card-section class="text-h6 border-top">
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list class="row">
          <q-item class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <q-item-section>
              <q-select
                dense
                v-model="wareHouse_form.WareHouse"
                use-input
                @filter="filter_WareHouse"
                :options="list_Data.list_Warehouse"
                label="Kho *"
                label-color="blue"
                behavior="menu"
                lazy-rules
                :rules="[(val) => val || 'Vui lòng chọn kho']"
            /></q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <q-item-section>
              <q-select
                dense
                v-model="wareHouse_form.Shelf"
                use-input
                @filter="filter_Shelf"
                :options="list_Data.list_Shelf"
                label="Kệ *"
                label-color="blue"
                behavior="menu"
                lazy-rules
                :rules="[(val) => val || 'Vui lòng chọn kệ']"
            /></q-item-section>
          </q-item>
          <q-item class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <q-item-section>
              <q-select
                dense
                v-model="wareHouse_form.Box"
                use-input
                @filter="filter_Box"
                :options="list_Data.list_Box"
                label="Hộp *"
                label-color="blue"
                behavior="menu"
                lazy-rules
                :rules="[(val) => val || 'Vui lòng chọn hộp']"
            /></q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions vertical align="center">
        <div class="row">
          <q-btn
            label="Lưu"
            @click="onSubmit"
            push
            icon="save"
            class="text-capitalize"
            color="secondary"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
<script>
import { date } from "quasar";
export default {
  props: ["form_Data"],
  data() {
    return {
      title: "Gán kho lưu hồ sơ",
      wareHouse_form: {
        WareHouse: "",
        Shelf: "",
        Box: "",
      },
      accept: false,
      list_Data: {
        list_Warehouse_Source: [
          {
            label: "Kho khu vực 1",
            value: 1,
          },
          {
            label: "Kho khu vực 2",
            value: 2,
          },
          {
            label: "Kho khu vực 3",
            value: 3,
          },
          {
            label: "Kho khu vực 4",
            value: 4,
          },
        ],
        list_Warehouse: [
          {
            label: "Kho khu vực 1",
            value: 1,
          },
          {
            label: "Kho khu vực 2",
            value: 2,
          },
          {
            label: "Kho khu vực 3",
            value: 3,
          },
          {
            label: "Kho khu vực 4",
            value: 4,
          },
        ],
        list_Shelf_Source: [
          { label: "Kệ 1 - Khu vực 1", value: 1, WhID: 1 },
          { label: "Kệ 2 - Khu vực 1", value: 2, WhID: 1 },
          { label: "Kệ 3 - Khu vực 1", value: 3, WhID: 1 },
          { label: "Kệ 4 - Khu vực 1", value: 4, WhID: 1 },
          { label: "Kệ 5 - Khu vực 1", value: 5, WhID: 1 },
          { label: "Kệ 1 - Khu vực 2", value: 6, WhID: 2 },
          { label: "Kệ 2 - Khu vực 2", value: 7, WhID: 2 },
          { label: "Kệ 3 - Khu vực 2", value: 8, WhID: 2 },
          { label: "Kệ 4 - Khu vực 2", value: 9, WhID: 2 },
          { label: "Kệ 5 - Khu vực 2", value: 10, WhID: 2 },
          { label: "Kệ 1 - Khu vực 3", value: 11, WhID: 3 },
          { label: "Kệ 2 - Khu vực 3", value: 12, WhID: 3 },
          { label: "Kệ 3 - Khu vực 3", value: 13, WhID: 3 },
          { label: "Kệ 4 - Khu vực 3", value: 14, WhID: 3 },
          { label: "Kệ 5 - Khu vực 3", value: 15, WhID: 3 },
        ],
        list_Shelf: [],

        list_Box_Source: [
          { label: "Hộp số 1", value: 1, ShelfID: 1 },
          { label: "Hộp số 2", value: 2, ShelfID: 2 },
          { label: "Hộp số 3", value: 3, ShelfID: 3 },
          { label: "Hộp số 4", value: 4, ShelfID: 4 },
          { label: "Hộp số 5", value: 5, ShelfID: 5 },
        ],
        list_Box: [],
      },
    };
  },
  created: function () {},
  computed: {
    formattedStartDate() {
      return date.formatDate(this.wareHouse_form.StartDate, "DD/MM/YYYY");
    },
    formattedEndDate() {
      return date.formatDate(this.wareHouse_form.EndDate, "DD/MM/YYYY");
    },
    FileCode() {
      if (!this.wareHouse_form.Organization.Identifier) return "";
      let yearFrom = date.formatDate(this.wareHouse_form.StartDate, "YYYY");
      if (!yearFrom) yearFrom = "";
      let FileNotation = this.wareHouse_form.FileNotation;
      if (!FileNotation) {
        FileNotation = "";
      }
      return `${this.wareHouse_form.Organization.Identifier}.${yearFrom}.${FileNotation}`;
    },
  },
  watch: {},
  methods: {
    optionsStartDate(date) {
      debugger;
      if (this.wareHouse_form.EndDate) {
        if (date.replaceAll("/", "-") <= this.wareHouse_form.EndDate) {
          return date.replaceAll("/", "-");
        }
      }
    },
    optionsEndDate(date) {
      if (this.wareHouse_form.StartDate)
        return date.replaceAll("/", "-") >= this.wareHouse_form.StartDate;
    },
    onSubmit() {
      this.$refs.wareHouse_form.validate().then((success) => {
        if (!success) return;
      });
      this.$emit("submit", this.wareHouse_form);
    },
    filter_Data(val, source, dest) {
      debugger;
      const needle = val.toLowerCase();
      if (!needle) {
        dest = source;
        return;
      }
      dest = source.filter((v) => v.label.toLowerCase().indexOf(needle) > -1);
    },
    filter_WareHouse(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        if (!needle) {
          this.list_Data.list_Warehouse = this.list_Data.list_Warehouse_Source;
          return;
        }
        this.list_Data.list_Warehouse =
          this.list_Data.list_Warehouse_Source.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
      });
    },
    filter_Shelf(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        if (!needle) {
          this.list_Data.list_Shelf = this.list_Data.list_Shelf_Source.filter(
            (v) => v.WhID == this.wareHouse_form.WareHouse.value
          );
          return;
        }
        this.list_Data.list_Shelf = this.list_Data.list_Shelf_Source.filter(
          (v) =>
            v.label.toLowerCase().indexOf(needle) > -1 &&
            v.WhID == this.wareHouse_form.WareHouse.value
        );
      });
    },
    filter_Box(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        if (!needle) {
          this.list_Data.list_Box = this.list_Data.list_Box_Source.filter(
            (v) => v.ShelfID == this.wareHouse_form.Shelf.value
          );
          return;
        }
        this.list_Data.list_Box = this.list_Data.list_Box_Source.filter(
          (v) =>
            v.label.toLowerCase().indexOf(needle) > -1 &&
            v.ShelfID == this.wareHouse_form.Shelf.value
        );
      });
    },
    loadData: function (data) {
      this.wareHouse_form = data;
    },
    closeClick() {
      this.accept = false;
      this.$emit("close", true);
    },
    organizationChange() {
      debugger;
      this.wareHouse_form.Identifier =
        this.wareHouse_form.Organization.Identifier;
    },
  },
};
</script>
<style>
.q-item {
  padding: 0px 16px !important;
}
</style>
