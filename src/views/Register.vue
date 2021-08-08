<template>
  <v-container>
     <v-layout justify-center>
      <v-card class="mt-16" elevation="0" width="600">
        <v-card-title class="justify-center headline font-weight-bold">Register Form</v-card-title>
        <v-form @submit.prevent="handleRegister">
          <div v-if="!successful">
            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <v-text-field
                  outlined
                  class="mt-2 ml-2 mr-2"
                  v-model="user.username"
                  v-validate="'required|min:3|max:20'"
                  type="text"
                  name="username"
                  label="Username"
                  required
                  >
                </v-text-field>
                <div
                  v-if="submitted && errors.has('username')"
                  class="mt-n6 red--text ml-4 alert-danger"
                >*{{errors.first('username')}}
                </div>
              </v-col>

              <v-col
                cols="12"
                md="12"
              >
                <v-text-field
                  outlined
                  class="mt-n4 ml-2 mr-2"
                  v-model="user.email"
                  v-validate="'required|email|max:50'"
                  type="email"
                  name="email"
                  label="Email"
                  required
                  >
                </v-text-field>
                <div
                  v-if="submitted && errors.has('email')"
                  class="mt-n6 red--text ml-4 alert-danger"
                >*{{errors.first('email')}}
                </div>
              </v-col>

              <v-col
                cols="12"
                md="12"
              >
                <v-text-field
                  outlined
                  class="mt-n4 ml-2 mr-2"
                  v-model="user.password"
                  v-validate="'required|min:6|max:40'"
                  type="password"
                  name="password"
                  label="Password"
                  required
                ></v-text-field>
                <div
                  v-if="submitted && errors.has('password')"
                  class="mt-n6 red--text ml-4 alert-danger"
                >*{{errors.first('password')}}
                </div>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn color="primary" @click="handleRegister" block x-large class="mt-n4 mb-4 white--text">
                <span class=""></span>
                <span>SignUp</span>
              </v-btn>
            </v-card-actions>
      
            <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}
            </div>
          </div>
        </v-form>
      </v-card>
     </v-layout>
  </v-container>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>

</style>