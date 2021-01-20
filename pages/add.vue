<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="zip"
            v-model="zip"
            :rules="[() => !!zip || 'This field is required']"
            label="ZIP / Postal Code"
            v-mask="'##.###-###'"
            required
            placeholder="64.016-070"
          ></v-text-field>
          <v-text-field
            ref="address"
            :disabled="disabled"
            v-model="address"
            :rules="[
              () => !!address || 'This field is required',
              () =>
                (!!address && address.length <= 25) ||
                'Address must be less than 25 characters',
              addressCheck,
            ]"
            label="Address Line"
            placeholder="Snowy Rock Pl"
            counter="25"
            required
          ></v-text-field>
          <v-text-field
            ref="city"
            :disabled="disabled"
            v-model="city"
            :rules="[() => !!city || 'This field is required', addressCheck]"
            label="City"
            placeholder="El Paso"
            required
          ></v-text-field>
          <v-text-field
            ref="state"
            :disabled="disabled"
            v-model="state"
            :rules="[() => !!state || 'This field is required']"
            label="State/Province/Region"
            required
            placeholder="TX"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit"> Create </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    disabled: true,
    errorMessages: '',
    address: null,
    city: null,
    state: null,
    zip: null,
    formHasErrors: false,
  }),

  computed: {
    form() {
      return {
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
      }
    },
  },

  watch: {
    zip(zip) {
      const zipRex = zip.replace(/\D/g, '')
      this.disabled = true
      if (zipRex.length === 8) {
        this.$axios.$get(`/${zipRex}/json`).then((res) => {
          if (res.erro) {
            Swal.fire({
              title: 'Zip Code not found!',
              text: 'This Zip code not found.',
              icon: 'error',
              confirmButtonText: 'Ok',
            })
          }
          if (res.logradouro === '') {
            this.disabled = false
          } else {
            this.address = res.logradouro
            this.city = res.localidade
            this.state = res.uf
          }
        })
      }
    },
  },

  methods: {
    addAddress() {
      this.$store.commit('address/add', this.form)
    },

    ...mapMutations({
      toggle: 'address/toggle',
    }),

    removeTodo(index) {
      this.$store.commit('address/remove', index)
    },
    addressCheck() {
      this.errorMessages = this.address ? `Hey! I'm required` : ''

      return true
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
    },
    async submit() {
      this.formHasErrors = false

      await Object.keys(this.form).forEach(async (f) => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      if (!this.formHasErrors) {
        this.addAddress()

        Swal.fire({
          title: 'Address created!',
          text: 'Address created successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        })
        this.$router.push('/')
      }
    },
  },
}
</script>
