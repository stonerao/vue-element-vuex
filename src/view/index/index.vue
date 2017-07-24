<template>
  <div class="hello">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
      console.log(this)
  }
}
</script>
 
<style scoped>
 
</style>
