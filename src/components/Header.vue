<template>
  <header>
    <div>
      <span class="title">一级产商品中心</span>
      <i class="el-icon-s-fold"></i>
    </div>
    <div data-v-59286f9f="" class="tag-box">
      <span data-v-59286f9f="" command="PCC_node_00" class="tag ">全网产商品管理</span>
      <span data-v-59286f9f="" command="CPCC_node_00" class="tag">分省产商品管理</span>
      <span data-v-59286f9f="" command="charge_node_00" class="tag">资费管理</span>
      <span data-v-59286f9f="" command="market_node_00" class="tag">营销案管理</span>
      <span data-v-59286f9f="" command="gear_node_00" class="tag">政企计收规则管理</span>
      <span data-v-59286f9f="" command="gear_node_00" class="tag active" @click="back">原子产品库</span>
    </div>
    <div style="margin-left:auto;margin-right:12px;">
      <i class="el-icon-info"></i>
      <i class="el-icon-message-solid"></i>
      <span class="date">2025年4月15日</span>
      <i class="el-icon-user"></i>
      <span class="name">肖91</span>
      <i class="el-icon-arrow-down"></i>
    </div>
  </header>
</template>
<script>
export default { 
  name: 'Header',
  methods: {
    back() {
      this.$router.push('/products')
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 999;
  top: 0;
  display: flex;
  align-items: center;
  background: #5584ff;
  color: #fff;
  .title {
    margin-left: 25px;
    font-size: 18px;
    font-weight: bold;
  }
  .date {
    color: #fff !important;
    font-size: 16px;
    margin-right: 10px;
    margin-bottom: 3px;
    text-decoration: underline;
  }
}
.tag-box {
  margin-left: 12px;;
  display: flex;
  align-items: center;
  height: 48px;
  left: 0;
  position: relative;
  transition: all 0.35s;
  width: max-content;
  cursor: pointer;
  .tag {
    border-radius: 36px;
    padding: 2px 16px;
    line-height: 24px;
    min-width: max-content;
    margin: 0 4px;
    &.active {
      background: #fff;
      color: #5584ff;
    }
  }
}
</style>
