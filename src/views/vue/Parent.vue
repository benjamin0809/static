<!-- 父组件 -->
<template>
  <div>
    <p class="text">Hello from Parent</p>
    <ChildComponent />
  </div>
</template>
<script>
import ChildComponent from './ChildComponent.vue'
export default {
  components: {
    ChildComponent,
  },
}
</script>
<style scoped>
.text {
  color: red;
}
</style>
