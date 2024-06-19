<template>
    <q-layout>
        <q-page-container>
            <q-page class="flex bg-image flex-center">
                <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '90%' } : { 'width': '40%' }">
                    <q-card-section>
                        <div class="text-center q-pt-lg">
                            <div class="col text-h5 ellipsis text-bold text-primary">
                                Home Page
                            </div>
                            <div class="col text-subtitle2 text-secondary">
                                Welcome to the home page
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <div class="text-center q-pt-md">
                            <q-btn label="Logout" color="primary" class="full-width" @click="handleLogout" />
                        </div>
                    </q-card-section>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    methods: {
        handleLogout() {
            // Perform logout actions here (e.g., clear session, redirect to login page)
            // Navigate to login page
            this.$router.push('/home');
        }
    }
}
</script>

<style>
.bg-image {
    background-image: linear-gradient(135deg, #0bc239 0%, #0fb140 100%);
    background-size: cover;
    background-position: center;
    height: 100vh;
}

.q-card {
    border-radius: 20px;
    box-shadow: 0 8px 16px rgba(51, 255, 24, 0.897);
}

.text-primary {
    color: #30d868ec;
}

.text-secondary {
    color: #06b933;
}

.full-width {
    width: 100%;
}
</style>