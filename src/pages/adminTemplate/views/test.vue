<template>
   <div class="app-container flex" style="flex-direction: column;height: calc(100vh - 65px )">
     <div style="line-height:50px;background: red">
       {{a}}<br>
       {{b}}<br>
       <button @click="test">222</button><br>
       <button @click="getData">初始值</button><br>

     </div>
     <div class="flex1" style="background: gold;">
       <div style="height: 100%;background: saddlebrown"></div>
     </div>
   </div>
</template>

<script>
export default {
  data () {
    return this.init()
  },
  methods: {
    init () {
      return {
        a: 123,
        b: 213
      }
    },
    test () {
      this.a = 22222222222222222
    },
    getData () {
      console.log(this.init())
    }
  }
}
</script>

<style scoped>

</style>
