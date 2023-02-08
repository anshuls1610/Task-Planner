<template>
  <v-container>
    <v-card class="ma-12 text-left" shaped outlined>
      <v-card-title>Profile</v-card-title>
      <v-card-title>
        <v-card-text class="font-weight-bold"
          >Name: {{ currentUser.username }} - ({{
            currentUser.roles.map((role) => role).toString(" ")
          }})
        </v-card-text>
        <v-card-text>Id: {{ currentUser.id }}</v-card-text>
        <v-card-text
          >Token: {{ currentUser.accessToken.substring(0, 20) }} ...
          {{
            currentUser.accessToken.substr(currentUser.accessToken.length - 20)
          }}
        </v-card-text>
        <v-card-text>Email: {{ currentUser.email }} </v-card-text>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
