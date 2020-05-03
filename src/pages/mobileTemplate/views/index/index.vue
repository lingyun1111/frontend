<template>
<div>
  <div class="text-center">
    <v-btn rounded color="primary" dark>Rounded Button</v-btn>
    <div class="text-center">
      <div class="my-2">
        <v-btn x-small color="secondary" dark>Extra small Button</v-btn>
      </div>
      <div class="my-2">
        <v-btn small color="primary" dark>Small Button</v-btn>
      </div>
      <div class="my-2">
        <v-btn color="warning" dark>Normal Button</v-btn>
      </div>
      <div class="my-2">
        <v-btn color="error" dark large>Large Button</v-btn>
      </div>
      <div class="my-2">
        <v-btn x-large color="success" dark>Extra large Button</v-btn>
      </div>
    </div>
  </div>
  <v-bottom-navigation v-model="bottomNav" fixed  bottom dark shift>
    <v-btn>
      <span>Video</span>
      <v-icon>mdi-television-play</v-icon>
    </v-btn>

    <v-btn>
      <span>Music</span>
      <v-icon>mdi-music-note</v-icon>
    </v-btn>

    <v-btn>
      <span>Book</span>
      <v-icon>mdi-book</v-icon>
    </v-btn>

    <v-btn>
      <span>Image</span>
      <v-icon>mdi-image</v-icon>
    </v-btn>
  </v-bottom-navigation>
</div>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 3
    }
  }
}
</script>
