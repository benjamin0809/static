<template>
  <div style="height: 400px; padding: 24px; text-align: center">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/store' }">原子货架</el-breadcrumb-item>
      <el-breadcrumb-item><a>细分市场原子货架</a></el-breadcrumb-item>
    </el-breadcrumb>

    <div class="ppp-box">
      <h1>细分市场原子货架</h1>
    </div>
    <div class="market-box">
      <div class="market" :class="market === item ? 'selected' : ''" @click="marketChange(item)" v-for="(item, index) in data.市场分类" :key="index">{{ item }}</div>
    </div>
    <div class="line"></div>
    <div class="product-box">
      <div class="category-title">产品分类</div>
      <div class="category" :class="item === category ? 'selected' : ''" v-for="(item, index) in data.产品分类" @click="categoryChange(item)" :key="index">{{ item }}</div>
    </div>
    <div class="input-box">
      <el-input style="width: 240px" placeholder="请输入产品目录名称进行查询">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <Popover style="text-align: right" ref="popover"> </Popover>
    </div>
    <!-- <div class="title-box">
      {{ category }}
    </div> -->

    <div class="card-box">
      <div class="card" v-for="(o, index) in cards" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 8px">
            <div class="flex j-center" style="position: relative">
              <div class="product-name">{{ o.产品名称 }}</div>
              <div class="link" @click="handleLink">
                <img class="logo" title="知识图谱" src="../../assets/store/knowledge.png" alt="logo" />
              </div>
            </div>

            <div style="position: relative; margin-top: 4px; text-align: center">
              <el-tag style="color: #2460fe" size="mini" v-if="category === '通信产品'">
                {{ o.商品编号 }}
              </el-tag>
              <el-tag size="mini" style="color: #2460fe" v-else> 产品：{{ o.产品 }} </el-tag>
            </div>

            <div class="bottom clearfix">
              <div class="desc" v-if="category === '通信产品'"><span style="color: #666666">商品分类：</span>{{ o.商品分类 }}</div>
              <div class="desc" v-else>产品归属：{{ o.产品归属 }}</div>
              <div class="a-center desc flex">
                <span v-if="category === '通信产品'"> <span style="color: #666666">归属机构：</span>{{ o.归属机构 }}</span>
                <span v-else>产品类型：{{ o.产品类型 }}</span>
                <el-button size="mini" class="btn" @click="addToList(o)">加入清单</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="page-box">
      <el-pagination background layout="prev, pager, next" :total="36"> </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="60%">
      <img v-if="category === '通信产品'" src="../../assets/store/cmmdt.png" alt="confirm" width="100%" />
      <img v-if="category !== '通信产品'" src="../../assets/store/product.png" alt="confirm" width="100%" />
    </el-dialog>
  </div>
</template>
<script>
import { storedata, } from './data'
import Popover from './popover.vue'
export default {
  name: 'Products',
  components: {
    Popover,
  },
  props: {},
  data() {
    return {
      selected: [1, 2],
      data: storedata,
      category: '通信产品',
      market: '银发市场',
      dialogVisible: false,
    }
  },
  computed: {
    cards() {
      if (this.category === '通信产品') {
        return this.data[this.market + this.category]
      }
      return this.data[this.category]
    },
  },
  methods: {
    marketChange(market) {
      this.market = market
    },
    categoryChange(category) {
      this.category = category
    },
    addToList(item) {
      console.log(item)
      this.$message.success('已加入清单')
      item.服务 = this.category === '通信产品' ? '通信服务' : '信息服务'
      item.orgName = this.category === '自有产品' ? '互联网公司' : '在线公司'
      this.$refs.popover.add(item)
    },
    goPackage() {
      this.$router.push('/pending-package')
    },
    handleLink() {
      this.dialogVisible = true
    },
  },
  watch: {
    oldData(newVal) {},
    data(newVal) {},
  },
}
</script>
<style lang="scss" scoped>
.line {
  border-bottom: 1px solid #e5e5e5;
}
.market-box {
  margin-top: 10px;
  // margin-bottom: 10px;
  display: flex;
  .selected {
    color: #5584ff;
    font-weight: bold;
    border-bottom: 2px solid #5584ff;
  }
  .market {
    cursor: pointer;
    text-align: center;
    padding: 16px 0;
    margin-left: 70px;
    font-weight: 400;
    font-size: 20px;
    &:last-child {
      border-right: none;
    }
    &:first-child {
      padding-left: 0px;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
.product-box {
  margin-top: 20px;
  display: flex;
  font-weight: 400;
  font-size: 16px;
  .category-title {
    padding: 5px 11px;
    font-weight: bold;
    background: #2460fe;
    border-radius: 4px;
    color: #fff;
  }
  .category {
    background: #ecedee;
    border-radius: 4px;
    padding: 5px 11px;
    margin-left: 8px;
    &:hover {
      cursor: pointer;
      color: #5584ff;
    }
  }
  .selected {
    color: #5584ff;
  }
}
.input-box {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  width: 100%;
}

.ppp-box {
  margin-top: 20px;
  background-size: cover;
  height: 110px;
  display: flex;
  align-items: center;
  border-radius: 22px;
  background-image: url(../../assets/store/bg.png);
  h1 {
    margin-left: 100px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 34px;
    color: #000000;
  }
}
.title-box {
  padding-left: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: left;
  background: #e6edfe;
  font-size: 18px;
  font-weight: bold;
}

.card-box {
  text-align: left;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 固定 4 列 */
  gap: 24px; /* 每个元素间隔 12px */
  .card {
    ::v-deep .el-card {
      background-image: url(../../assets/store/card-bg.png);
      background-size: cover;
      background-position-y: center;
    }
  }
  .product-name {
    font-weight: bold;
  }
  .link {
    position: absolute;
    right: 0;
    color: #409eff;
    font-size: 12px;
    cursor: pointer;
    .logo {
      width: 20px;
      height: 20px;
    }
  }
  .desc {
  }
  .bottom {
    margin-top: 24px;
    position: relative;

    .btn {
      background: rgb(2, 103, 255, 0.25);
      color: #fff;
      border-radius: 18px;
      margin-left: auto;
    }
  }
}
.page-box {
  margin-top: 12px;
  text-align: right;
}

.flex {
  display: flex;
}

.a-center {
  align-items: center;
}
.j-center {
  justify-content: center;
}
#u14_img {
  border-width: 0px;
  left: 0px;
  top: 0px;
  width: 20px;
  height: 20px;
}
.u18_img {
  width: 44px;
  height: 44px;
}
.popover-btn {
  padding: 8px;
}
.popover-item {
}
</style>
