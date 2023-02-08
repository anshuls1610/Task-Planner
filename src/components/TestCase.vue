<template>
  <div>
    <vnatk-crud :options="crudoptions"> </vnatk-crud>
  </div>
</template>

<script>
import { VnatkCrud } from "vnatk-vue";
import service from "@/services/service";

export default {
  name: "testcase",
  components: { VnatkCrud },
  data() {
    return {
      crudoptions: {
        service: service,
        basepath: "/api/vnatk",
        model: "Testcase",
        title: "Testcase",
        create: {
          modeloptions: {
            attributes: ["name", "case"],
          },
        },
        update: {
          modeloptions: {
            attributes: ["name", "case", "status"],
          },
        },
        read: {
          modeloptions: {},
          serversidepagination: true,
        },
        actions: true,
        override: {
          headers: {},
          actions: [],
        },
      },
    };
  },
  methods: {},
};
</script>
