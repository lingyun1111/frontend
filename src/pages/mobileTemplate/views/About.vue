<template>
  <div class="about">
<!--    <img :src="img">-->
    <v-btn  small color="error">Error</v-btn>
    <com msg="MMMM"></com>
  </div>
</template>

<script>
import com from '@adminTemplate/components/HelloWorld'
export default {
  data () {
    return {
      img: img
    }
  },
  components: {
    com
  },
  mounted () {
    console.log('AJAXURL', AJAXURL)
  }
}
</script>
