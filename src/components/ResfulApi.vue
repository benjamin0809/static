<template>
  <el-tabs v-model="activeName"
           @tab-click="handleClick">
    <el-tab-pane label="基本属性"
                 name="1">
      <baseInfo></baseInfo>
    </el-tab-pane>
    <el-tab-pane label="API配置"
                 name="2">
      <ApiConfig></ApiConfig>
    </el-tab-pane>
    <el-tab-pane label="Header"
                 name="3">
      <Header></Header>
    </el-tab-pane>
    <el-tab-pane label="输入参数"
                 name="4">
      <InputParams></InputParams>
    </el-tab-pane>
    <el-tab-pane label="输出参数"
                 name="5">
      <OutputParams></OutputParams>
    </el-tab-pane>
    <el-tab-pane label="断言"
                 name="6">
      <Assert></Assert>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import baseInfo from './BaseInfo.vue'
import ApiConfig from './ApiConfig.vue'
import Header from './Header.vue'
import InputParams from './InputParams.vue'
import OutputParams from './OutputParams.vue'
import Assert from './Assert.vue'
export default {
  name: 'ResfulApi',
  components: {
    baseInfo,
    ApiConfig,
    Header,
    InputParams,
    OutputParams,
    Assert
  },
  data () {
    return {
      activeName: '1'
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
};
</script>