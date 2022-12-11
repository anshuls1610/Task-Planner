<template>
  <div>
    <vnatk-crud :options="crudoptions"> Bug Fix</vnatk-crud>
  </div>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "@/services/service";

export default {
  name: "bug",
  components: { VnatkCrud },
  data() {
    return {
      crudoptions: {
        service: service,
        basepath: "/api/vnatk",
        model: "Bug",
        title: "Bug",
        create: {
          modeloptions: {
            attributes: [
              "bug",
              "description",
              "assignedToDevId",
              "createdById",
            ],
          },
        },
        read: {
          modeloptions: {},
          serversidepagination: true,
        },
        update: {
          modeloptions: {
            attributes: [
              "bug",
              "description",
              "assignedToDevId",
              "updatedById",
            ],
          },
        },
        actions: true,
        override: {
          headers: {},
          actions: [
            {
              name: "vnatk_add",
              formschemaoverrides: {
                assignedToDevId: {
                  searchField: "username",
                  titlefield: "username",
                },
                createdById: {
                  hidden: true,
                  disabled: true,
                  defaultValue: this.currentUser ? this.currentUser.id : null,
                },
              },
            },
            {
              name: "vnatk_edit",
              formschemaoverrides: {
                assignedToDevId: {
                  searchField: "username",
                  titlefield: "username",
                  clearable: true,
                },
                updatedById: {
                  // hidden: true,
                  disabled: true,
                  value: this.currentUser ? this.currentUser.id : null,
                },
              },
            },
          ],
        },
      },
    };
  },
  methods: {},
};
</script>
