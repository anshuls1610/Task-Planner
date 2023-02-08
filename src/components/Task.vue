<template>
  <div>
    <vnatk-crud :options="crudoptions()"> </vnatk-crud>
  </div>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "@/services/service";

export default {
  name: "task",
  components: { VnatkCrud },
  data() {
    return {
      currentUser: null,
    };
  },

  async mounted() {
    this.currentUser = await this.getCurrentUser();
  },

  methods: {
    crudoptions() {
      // let addPermissions;
      // if (
      //   this.currentUser &&
      //   (this.currentUser.roles.includes("ROLE_ADMIN") ||
      //     this.currentUser.roles.includes("ROLE_DEV_LEAD"))
      // ) {
      //   addPermissions = {
      //     modeloptions: {
      //       attributes: [
      //         "task",
      //         "description",
      //         "type",
      //         "for",
      //         "priority",
      //         "assignedToDevId",
      //         "assignedToTestId",
      //         "expectedFinishDate",
      //       ],
      //     },
      //   };
      // } else {
      //   addPermissions = false;
      // }
      // console.log("add", this.currentUser, addPermissions);
      return {
        service: service,
        basepath: "/api/vnatk",
        model: "Task",
        title: "Task",
        create: {
          modeloptions: {
            attributes: [
              "task",
              "description",
              "type",
              "for",
              "priority",
              "assignedToDevId",
              "expectedFinishDate",
              "createdById",
            ],
          },
        },
        update: {
          modeloptions: {
            attributes: [
              "task",
              "description",
              "type",
              "for",
              "priority",
              "assignedToDevId",
              "expectedFinishDate",
              "updatedById",
            ],
          },
        },
        read: {
          modeloptions: {},
          serversidepagination: true,
        },
        actions: true,
        override: {
          actions: [
            {
              name: "vnatk_add",
              formschemaoverrides: {
                expectedFinishDate: {
                  type: "date",
                  label: "expectedFinishDate",
                },
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
                expectedFinishDate: {
                  type: "date",
                  label: "expectedFinishDate",
                },
                assignedToDevId: {
                  searchField: "username",
                  titlefield: "username",
                },
                updatedById: {
                  // hidden: true,
                  disabled: true,
                  defaultValue: this.currentUser ? this.currentUser.id : null,
                },
              },
            },
          ],
          headers: {},
        },
      };
    },
  },
};
</script>
