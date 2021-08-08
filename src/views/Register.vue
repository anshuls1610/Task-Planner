<template>
  <v-container>
    <v-layout justify-center>
      <v-card class="mt-16" elevation="0" width="600" v-if="!successful">
        <v-card-title class="justify-center headline font-weight-bold"
          >Register Form</v-card-title
        >
        <v-form @submit.prevent="handleRegister" v-model="valid">
          <div>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  class="mt-2 ml-2 mr-2"
                  v-model="user.username"
                  type="text"
                  :rules="nameRules"
                  label="Username"
                  required
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  outlined
                  class="mt-n4 ml-2 mr-2"
                  v-model="user.email"
                  type="email"
                  :rules="emailRules"
                  label="Email"
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
                  :rules="passwordRules"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn
                v-if="valid"
                color="primary"
                @click="handleRegister"
                block
                x-large
                class="mt-n4 mb-4 white--text"
              >
                <span class=""></span>
                <span>SignUp</span>
              </v-btn>
            </v-card-actions>
          </div>
        </v-form>
      </v-card>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import User from "../models/user";

export default {
  name: "Register",
  data() {
    return {
      valid: false,
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
      nameRules: [(v) => !!v || "Name is required"],
      passwordRules: [(v) => !!v || "Password is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      if (this.user.username && this.user.password && this.user.email) {
        this.$store.dispatch("auth/register", this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
          }
        );
      }
    },
  },
};
</script>

<style scoped></style>
