<template>
  <div>
    <vnatk-crud :options="crudoptions()"> </vnatk-crud>
  </div>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "@/services/service";

export default {
  name: "note",
  components: { VnatkCrud },
  data() {
    return {
      currentUser: null,
    };
  },

  mounted() {
    this.currentUser = this.getCurrentUser();
  },

  methods: {
    crudoptions() {
      return {
        service: service,
        basepath: "/api/vnatk",
        model: "Note",
        title: "Note",
        create: {
          modeloptions: {
            attributes: ["text", "userId"],
          },
        },
        read: {
          modeloptions: {},
          serversidepagination: true,
        },
        actions: true,
        override: {
          headers: {},
          actions: [
            {
              name: "vnatk_add",
              formschemaoverrides: {
                userId: {
                  searchField: "username",
                  titlefield: "username",
                  type: "select",
                  hidden: true,
                  items: [
                    {
                      text: this.currentUser ? this.currentUser.username : null,
                      value: this.currentUser ? this.currentUser.id : null,
                    },
                  ],
                  defaultValue: this.currentUser ? this.currentUser.id : null,
                  disabled: true,
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
