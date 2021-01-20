<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" lg="4" sm="8" md="4">
        <v-card v-if="address.length === 0" class="mt-10">
          <v-card-text class="headline">
            No registered address yet.
          </v-card-text>
        </v-card>
        <v-card v-for="(ad, index) in address" :key="index" class="mt-10">
          <v-card-title class="headline">
            Address {{ index + 1 }}
          </v-card-title>
          <v-card-text>
            {{ ad.address }}, {{ ad.city }} - {{ ad.state }} - {{ ad.zip }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt @click="editAddress(index)">
              Edit
            </v-btn>
            <v-btn color="primary" nuxt @click="deleteAddress(index)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <Dialog :dialog="dialog" @delAddress="delAddress" @close="dialog = false" />
  </v-container>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { mapActions } from 'vuex'
import Dialog from '~/components/Dialog.vue'
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      dialog: false,
      indexSelected: 0,
    }
  },
  computed: {
    address() {
      return this.$store.state.address.list
    },
  },
  methods: {
    deleteAddress(index) {
      this.indexSelected = index
      this.dialog = true
    },
    editAddress(index) {
      this.$router.push(`/edit/${index}`)
    },
    delAddress() {
      this.$store.commit('address/remove', this.indexSelected)
      this.dialog = false
      Swal.fire({
        title: 'Address deleted!',
        text: 'Address successfully deleted',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
    },
  },
  created() {},
}
</script>
