<template>
  <div>'<div>User {{ id }}</div>'
    <div>User {{ $route.params.id }}</div>
    <div>name: {{ name }}</div>
    <!-- <renderJSX></renderJSX> -->
  </div>

</template>
<script>
// import renderJSX from 'renderJSX'
export default {
  name: 'user',
  components: {
    // renderJSX
  },
  props: {
    id: String,
    name: {
      type: String,
      default: 'Benjamin'
    }
  },
  mounted () {
    document.addEventListener('keyup', function (event) {
      console.log('keyup', event)
    })
    document.addEventListener('keydown', function (event) {
      console.log('keydown', event)
    })
    document.addEventListener('keypress', function (event) {
      console.log('keypress', event)
    })
    console.log(this)
  }
}
</script>