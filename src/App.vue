<template>
  <div id="app">
    <Header></Header>
    <div class="content"><router-view></router-view></div>
  </div>
</template>
<script>
import Header from "./components/header.vue";
export default {
  name: "app",
  components: {
    Header
  },
  methods: {
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.content {
  padding-top: 44px;;
}
</style>