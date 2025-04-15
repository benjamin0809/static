<template>
  <div>
    <div class="product-package-title">
      <span class="title-name left">产品封装</span>
      <div>
        <button class="next">下一步</button>
        <button class="back" @click="$router.back()">返回</button>
      </div>
    </div>
    <div class="product-package-main">
      <!-- 左侧侧边栏 -->
      <div class="sidebar">
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1">基本信息</el-menu-item>
          <el-menu-item index="2">商品构成</el-menu-item>
          <el-menu-item index="3">商品规则</el-menu-item>
          <el-menu-item index="4">定价计划</el-menu-item>
          <el-menu-item index="5">商品关系</el-menu-item>
        </el-menu>
      </div>

      <!-- 右侧内容区域 -->
      <div class="content">
        <div class="action">
          <button class="add">+ 新建</button>
          <button class="copy">复制当前商品</button>
          <button class="ai-design" @click="show = true">封装助手</button>
        </div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="商品1" name="first">
            <el-collapse v-model="activeCollapse">
              <!-- 基本信息 -->
              <el-collapse-item title="基本信息" name="1">
                <div>
                  <el-form :model="form" label-width="100px">
                    <el-row>
                      <el-form-item label="商品分类：">
                        <el-select v-model="form.categoryId" placeholder="请选择">
                          <el-option label="可选包/组合包" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-row>

                    <el-form-item label="商品名称：">
                      <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
                    </el-form-item>

                    <el-form-item label="商品描述：">
                      <el-input v-model="form.desc" type="textarea" placeholder="请输入商品描述"></el-input>
                    </el-form-item>

                    <el-form-item label="生效时间：">
                      <el-date-picker v-model="form.effectiveDateBegin" type="date" placeholder="选择日期"></el-date-picker>
                      至
                      <el-date-picker v-model="form.effectiveDateEnd" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="收费方式：">
                      <el-radio-group v-model="form.chargeType">
                        <el-radio label="连续">连续</el-radio>
                        <el-radio label="一次性">一次性</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="商品标签：">
                      <el-input v-model="form.tags" type="textarea" placeholder="请输入商品标签"></el-input>
                    </el-form-item>

                    <el-form-item label="推广省份：">
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                      <div style="margin: 2px 0"></div>
                      <el-checkbox-group v-model="form.province" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-form>
                </div>
              </el-collapse-item>

              <!-- 商品构成 -->
              <el-collapse-item title="商品构成" name="2">
                <div>
                  <div class="composition-items">
                    <el-tag v-for="(item, index) in compositionItems" :key="index" closable type="info">
                      {{ item }}
                    </el-tag>
                  </div>
                </div>
              </el-collapse-item>

              <!-- 商品规则 -->
              <el-collapse-item title="商品规则" name="3">
                <div class="commodityRules">
                  <i class="iconfont el-icon-plus" style="font-size: 23px"></i>
                </div>
              </el-collapse-item>

              <!-- 定价计划 -->
              <el-collapse-item title="定价计划" name="4">
                <el-form :model="form2" label-width="200px">
                  <el-row type="flex" align="center">
                    <el-col :span="12">
                      <el-form-item label="套餐固定费（元/月）：">
                        <el-input v-model="form2.fixedFee" placeholder="请输入"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-collapse-item>

              <!-- 商品关系 -->
              <el-collapse-item title="商品关系" name="5">
                <div>
                  <div class="relation-items">
                    <el-tag v-for="(relation, index) in productRelations" :key="index" closable type="info">
                      {{ relation }}
                    </el-tag>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="商品2" name="second"></el-tab-pane>
          <el-tab-pane label="商品3" name="third"></el-tab-pane>
        </el-tabs>
      </div>
      <AiDesign :show.sync="show"></AiDesign>
    </div>
  </div>
</template>

<script>
import AiDesign from '../../components/aiDesign.vue'
export default {
  name: 'ProductPackage',
  components: { AiDesign },
  data() {
    return {
      show: true,
      form: {
        categoryId: '',
        name: '',
        desc: '',
        effectiveDateEnd: '',
        effectiveDateBegin: '',
        chargeType: '',
        tags: '',
        province: [],
      },
      form2: {
        fixedFee: '',
      },
      checkAll: false,
      isIndeterminate: false,
      activeCollapse: ['1', '2', '3', '4', '5'], // 默认展开的栏目
      compositionItems: ['20GB国内通用流量', '不限量热门APP定向流量', '每月5天国际漫游流量'],
      productRelations: ['10G爱奇艺定向流量包', '10G腾讯视频定向流量包', '10G优酷视频定向流量包'],
      activeName: 'first',
      cities: ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西', '西藏', '宁夏', '新疆', '香港', '澳门'],
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.form.province = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
  },
}
</script>

<style lang="scss" scoped>
.product-package-main {
  display: flex;
  .sidebar {
    width: 200px;
    background-color: #fff;
    padding: 10px;
    position: fixed;
    top: 96px;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    height: 100vh;
    .el-menu {
      border-right: none;
    }
  }

  .content {
    flex: 1;
    margin-left: 200px;
    padding: 20px;
    overflow-y: auto;

    .action {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .el-button {
        margin-right: 10px;
      }
    }

    .composition-items,
    .relation-items {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .el-tag {
        cursor: pointer;
        background: #eaf2ff;
      }
    }
    ::v-deep {
      .el-collapse-item__header {
        height: 55px;
        background: #ffffff;
        font-weight: bold;
        padding: 0 10px;
        border-bottom: 1px solid #e4e7ed;
      }
      .el-collapse-item__content {
        padding: 10px;
      }
      .el-tabs__header {
        margin-bottom: 0px;
      }
      .el-collapse-item__wrap {
        border: none;
      }
    }
    .el-collapse-item {
      margin-bottom: 10px;
      //   border: 1px solid #e4e7ed;
    }
    .el-collapse-item:last-of-type {
      margin-bottom: 0;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    .commodityRules {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.product-package-title {
  position: sticky;
  top: 48px;
  left: 0;
  width: 100%;
  height: 48px;
  background: #d4e6ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  margin-bottom: 20px;
  .title-name {
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    font-size: 16px;
    color: #414352;
    text-align: justify;
    margin-left: 18px;
  }
}
.next,
.add {
  width: 68px;
  height: 28px;
  background: #2460fe;
  border-radius: 2px;
  outline: 0;
  border: none;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  margin-right: 19px;
}
.back,
.copy,
.ai-design {
  width: 56px;
  height: 28px;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #151828;
  text-align: center;
  cursor: pointer;
  margin-right: 19px;
}
.copy,
.ai-design {
  width: 112px;
}
.el-menu-item.is-active {
  background: #ebf2ff;
}
</style>
