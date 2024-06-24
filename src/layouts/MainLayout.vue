<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>

      <q-toolbar>

        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />
        <q-toolbar-title> SOHO DMS </q-toolbar-title>

        <q-breadcrumbs v-if="!$q.screen.lt.md && crumbs.length > 0" active-color="white"
          style="font-size: 16px; margin-left: 130px">
          <q-breadcrumbs-el icon="home" to="/" />
          <q-breadcrumbs-el v-for="crumb in crumbs" :label="crumb.text" :key="crumb.text" :to="crumb.to" />
        </q-breadcrumbs>
        <q-space />


        <div class="q-gutter-sm row items-center no-wrap">


          <!-- Nút phóng full màn hình -->
          <q-btn color="white" round dense flat icon="fullscreen" @click="$q.fullscreen.toggle()"></q-btn>
          <!-- Thông Báo -->
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important" flat dense class="text-indigo-8" />
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <!-- avatar -->
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-btn>
          <q-toolbar>
            <q-btn flat dense round @click="logout">
              <q-icon name="logout" />
              <q-tooltip>Logout</q-tooltip>
            </q-btn>
          </q-toolbar>
        </div>

      </q-toolbar>

    </q-header>

    <!-- Quản li -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="text-black">
      <q-list>

        <!-- Quản Lí Hồ Sơ -->
        <q-expansion-item group="somegroup" class="q-item-expand" icon="collections" label="QUẢN LÍ HỒ SƠ"
          header-class="bg-secondary text-white" active-class="q-expansion-item-hightlighting">
          <q-list class="q-pl-sm">

            <!-- Hồ Sơ -->
            <q-item dense to="/CatalogPages" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Hồ Sơ</q-item-label>
              </q-item-section>
            </q-item>
            <!-- PHÔNG -->
            <q-item dense to="/CatalogStorage" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Phông</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>



        <!-- Quản lí Kho -->
        <q-expansion-item group="somegroup" class="q-item-expand" icon="inventory_2" v-model="expanded"
          label="QUẢN LÍ KHO" header-class="bg-secondary text-white" active-class="q-expansion-item-hightlighting">
          <q-list class="q-pl-sm">

            <q-item dense to="/StorageWarehouse" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Kho</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense to="/StorageFloor" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Tầng</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense to="/StorageRoom" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Phòng</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense to="/StorageRowShelf" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Kệ</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense to="PricePages" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Giá</q-item-label>
              </q-item-section>
            </q-item>

            <q-item dense to="FloorofpricePages" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Tầng Của Giá</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <!-- Quản Lí Người Dùng -->
        <q-expansion-item group="somegroup" icon="edit_note" header-class="bg-secondary text-white"
          label="QUẢN LÍ NGƯỜI DÙNG">
          <q-list class="q-pl-sm">
            <q-item dense to="/UserListPages" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Văn Bản</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <!-- Quản Lí Phân Quyền -->
        <q-expansion-item group="somegroup" icon="inventory_2" label="QUẢN LÍ PHÂN QUYỀN"
          header-class="bg-secondary text-white">
          <q-list class="q-pl-sm">
            <q-item dense to="/AccessPages" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Phân Quyền</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <!-- Quản Lí Tài Liệu -->
        <q-expansion-item group="somegroup" class="q-item-expand" icon="collections" label="QUẢN LÍ TÀI LIỆU"
          header-class="bg-secondary text-white" active-class="q-expansion-item-hightlighting">
          <q-list class="q-pl-sm">

            <!-- TÀI LIỆU -->
            <q-item dense to="/DocumentPages" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Tài Liệu</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view>

      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
// import thư viện
import { ref, computed, watch } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";


// khai báo biên
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const leftDrawerOpen = ref(false);
const expanded = ref(false);
const crumbs = computed(() => route.meta.breadcrumbs || []);
const isSearchDialogOpen = ref(false);
const searchQuery = ref("");



// Phương thức fullscreen
function toggleFullscreen() {
  $q.fullscreen.toggle();
}
// Phương thức logout
function logout() {
  // Handle logout logic here, e.g., clearing auth tokens
  router.push('/login');
}
watch(route, () => {
  console.log("Route changed:", route.fullPath);
});
</script>

<style>
.q-layout__section--marginal {
  background-color: green !important;
  color: white !important;
}

.bg-primary {
  background: green !important;
}

.q-expansion-item__container {
  margin-bottom: 2px !important;
}

.fas {
  font-size: 1rem !important;
}

.q-item__section--side>.q-icon {
  font-size: 1.2rem !important;
}

.q-table__top {
  padding: 3px 16px;
  border-top-style: solid !important;
  border-top-color: green !important;
}

.q-card__section--vert {
  padding: 5px 16px;
}

.q-card>div:first-child {
  border-top: initial;
}

.border-top {
  border-top-style: solid !important;
  border-top-color: green !important;
}

.q-btn__wrapper {
  padding: 4px 6px;
}

.on-left {
  margin: 2px;
}

.q-item__section--avatar {
  min-width: initial;
}

.q-toolbar__title {
  flex: inherit;
}

.q-field--auto-height.q-field--labeled .q-field__native {
  min-height: 20px !important;
}
</style>
<style lang="sass">
.q-expansion-item-hightlighting
  color: white
  background: #F2C037
</style>
