<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card class="q-pa-md q-my-lg q-my-xl q-my-xxl responsive-card">
          <q-card-section>
            <q-avatar size="120px" class="absolute-center shadow-20">
              <img src="/src/assets/dsg.svg" alt="Logo">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h5 ellipsis text-bold text" style="color: green; margin-top: 30px;">
                Welcome Back!
              </div>
              <div class="col text-subtitle2 text" style="color: green;">
                Please log in to your account
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="handleSubmit">
              <q-input filled v-model="enteredUsername" label="Username" label-color="green-10" lazy-rules>
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input type="password" filled v-model="enteredPassword" label="Password" label-color="green-10"
                lazy-rules>
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <div class="text-center q-pt-md">
                <q-btn label="Login" type="submit" color="green-10" class="full-width" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      enteredUsername: '',
      enteredPassword: ''
    }
  },
  methods: {
    handleSubmit() {
      const validUsername = 'Admin';
      const validPassword = '12345';
      if (this.enteredUsername === validUsername && this.enteredPassword === validPassword) {
        // Navigate to the home page upon successful login
        this.$router.push('/');
      } else {
        // Show an error message
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Invalid username or password',
          icon: 'warning'
        });
      }
    }
  }
}
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #FFE67C 0%, #FFE67C 100%);
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.q-card {
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(25, 146, 9, 0.897);
}

.text-primary {
  color: #295F2D;
}

.text-secondary {
  color: #295F2D;
}

.full-width {
  width: 100%;
}

.responsive-card {
  max-width: auto;
  width: auto;
  margin: auto;
}

@media (max-width: 600px) {
  .responsive-card {
    width: 100%;
  }
}
</style>
