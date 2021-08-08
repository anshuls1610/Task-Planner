<template>
  <v-container>
    <v-layout justify-center>
      <v-card class="mt-16" elevation="0" width="600">
        <v-card-title class="justify-center headline font-weight-bold"
          >Login Form</v-card-title
        >
        <v-form @submit.prevent="handleLogin" v-model="valid">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                outlined
                class="mt-2 ml-2 mr-2"
                v-model="user.username"
                type="text"
                label="Username"
                :rules="nameRules"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                outlined
                class="mt-n4 ml-2 mr-2"
                v-model="user.password"
                type="password"
                label="Password"
                :rules="passwordRules"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn
              v-if="valid"
              @click="handleLogin"
              block
              color="primary"
              x-large
              class="mt-n4 mb-4 white--text"
            >
              <span class=""></span>
              <span>Login</span>
            </v-btn>
          </v-card-actions>

          <div v-if="message" class="" role="alert">{{ message }}</div>
        </v-form>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      //loading: false,
      message: "",
      valid: false,
      nameRules: [(v) => !!v || "Name is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  computed: {
    loggedIn() {
      console.log("login form - state: ", this.$store.state);
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      //this.loading = true;
      if (this.user.username && this.user.password) {
        //console.log('dispatch user from login : ', this.user)
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/home");
          },
          (error) => {
            //this.loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style scoped></style>
