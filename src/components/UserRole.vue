<template>
  <div>
    <vnatk-crud :options="crudoptions()"> </vnatk-crud>
  </div>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "@/services/service";

export default {
  name: "userRole",
  components: { VnatkCrud },
  data() {
    return {};
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    crudoptions() {
      let createPermission = false;
      let deletePermission = false;
      if (this.currentUser && this.currentUser.roles.includes("ROLE_ADMIN")) {
        createPermission = {
          modeloptions: {
            attributes: ["userId", "roleId"],
          },
        };
        deletePermission = true;
      }
      return {
        service: service,
        basepath: "/api/vnatk",
        model: "user_role",
        title: "User Roles",
        update: false,
        create: createPermission,
        delete: deletePermission,
        read: {
          modeloptions: {},
          serversidepagination: true,
        },
        actions: deletePermission,
        override: {
          headers: {
            "User.name": {
              value: "User.username",
            },
          },
          actions: [
            {
              name: "vnatk_add",
              formschemaoverrides: {
                userId: {
                  searchField: "username",
                  titlefield: "username",
                },
              },
            },
          ],
        },
      };
    },
  },
};
</script>
