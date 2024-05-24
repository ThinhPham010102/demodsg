<template>
  <q-list class="row">
    <q-item class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <q-item-section>
        <q-field
          readonly
          hide-bottom-space
          :dense="$q.screen.lt.md"
          label="Phông"
          stack-label
        >
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ value.Organization.label }}
            </div>
          </template>
        </q-field>
      </q-item-section>
    </q-item>
    <!-- Other q-item components -->
    <q-item class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <q-item-section>
        <q-field
          readonly
          hide-bottom-space
          :dense="$q.screen.lt.md"
          stack-label
          label="Trạng thái"
        >
          <template v-slot:control>
            <q-badge
              outline
              :color="value.Status.Color"
              :label="value.Status.Name"
            />
          </template>
        </q-field>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { date } from "quasar";

export default {
  props: {
    value: {},
  },
  setup(props) {
    const accept = false;

    const formattedDate = (dateString) => {
      try {
        return date.formatDate(dateString, "DD/MM/YYYY");
      } catch {
        return "";
      }
    };

    return {
      accept,
      formattedDate,
    };
  },
};
</script>
