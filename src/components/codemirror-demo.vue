<template>
  <div class="databaseModelingOnLogic">
    <span class="mt10 mb10">聚合逻辑：</span>
    <div class="main">
      <sql-template
        ref="cm"
        :hintList="hintList"
        :code="code"
        :splitRules="splitRules"
        :isHint="true"
      ></sql-template>
    </div>
  </div>
</template>
 
<script>
import SqlTemplate from './codemirror.vue'
 
export default {
  components: {
    SqlTemplate
  },
  data() {
    return {
      code: 'SELECT * from table',
      list: [],
      selectData: [],
      splitRules: ['(', ')', '.', ' '],
      hintList: ['Benjamin']
    }
  }
}
</script>
 
<style lang="scss">
.databaseModelingOnLogic {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.CodeMirror-hints{
  z-index: 3000 !important;
}
</style>