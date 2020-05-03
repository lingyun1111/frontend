
<template>
  <v-card color="grey darken-4" dark :loading="isUpdating" style="height: 100vh">

    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"></v-img>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="账号"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="title"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="密码"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
<!--    <v-divider></v-divider>-->
    <v-card-actions style="text-align: center;" class="mt-6" >
      <v-btn :loading="isUpdating" color="grey darken-2" block   @click="isUpdating = true">
        <v-icon left>mdi-update</v-icon>
        登 录
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
      isUpdating: false

    }
  },

  watch: {
    isUpdating (val) {
      if (val) {
        setTimeout(() => {
          this.isUpdating = false
          this.$router.push('/index')
        }, 2000)
      }
    }
  },

  methods: {
    remove (item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    }
  }
}
</script>
