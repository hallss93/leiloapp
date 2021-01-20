<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">
        Do you really want to delete that address?
      </v-card-title>

      <v-card-text> This procedure cannot be undone. </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="$emit('close')">
          Cancel
        </v-btn>

        <v-btn color="green darken-1" text @click="$emit('delAddress')">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'Dialog',
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
