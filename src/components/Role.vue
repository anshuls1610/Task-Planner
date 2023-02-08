<template>
  <div>
    <vnatk-crud :options="crudoptions"> </vnatk-crud>
  </div>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "@/services/service";

export default {
  name: "role",
  components: { VnatkCrud },
  data() {
    return {
      crudoptions: {
        service: service,
        basepath: "/api/vnatk",
        model: "Role",
        title: "Role",
        create: {
          modeloptions: {
            attributes: ["name"],
          },
        },
        read: {
          modeloptions: {},
          serversidepagination: true,
        },
        actions: true,
        update: false,
        delete: false,
        override: {
          headers: {
            vnatk_actions: {
              hide: true,
            },
          },
          actions: [],
        },
      },
    };
  },
  methods: {},
};
</script>
