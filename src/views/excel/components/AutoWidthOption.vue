<template>
  <div style="display:inline-block;">
    <label class="radio-label">Cell Auto-Width: </label>
    <v-radio-group v-model="autoWidth">
      <v-radio :label="true" border>
        True
      </v-radio>
      <v-radio :label="false" border>
        False
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    autoWidth: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
