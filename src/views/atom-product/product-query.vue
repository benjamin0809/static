<template>
  <div style="padding: 24px 48px">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">原子产品库</el-breadcrumb-item>
      <el-breadcrumb-item><a>产品目录查询</a></el-breadcrumb-item>
    </el-breadcrumb> -->
    <div style="text-align: right;">
      <el-button type="" size="small" @click="() => $router.back()">返回</el-button>
    </div>
    <div class="query-area">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="产品目录：">
              <el-input v-model="form.name" placeholder="请选择产品目录" size="mini" style="width: calc(100% - 120px)"> </el-input>
              <el-button size="mini" style="width: 80px; margin-left: 12px; background-color: #2460fe; color: #fff">选择</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产商品分类：">
              <el-select v-model="form.region" placeholder="请选择产商品分类" size="mini" style="width: 99%">
                <el-option label="产品/数字内容产品/增值业务原子产品" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="归属机构：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="全部" name="type"></el-checkbox>
            <el-checkbox label="在线营销服务中心" name="type"></el-checkbox>
            <el-checkbox label="咪咕" name="type"></el-checkbox>
            <el-checkbox label="杭州研究院" name="type"></el-checkbox>
            <el-checkbox label="政企事业部" name="type"></el-checkbox>
            <el-checkbox label="政企事业部" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="产品标识：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="全部" name="type"></el-checkbox>
            <el-checkbox label="战略产品" name="type"></el-checkbox>
            <el-checkbox label="普通产品" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="button-area">
        <el-button size="mini" type="primary" style="background-color: #2460fe; color: #fff">查询</el-button>
        <el-button size="mini">清空</el-button>
      </div>
    </div>
    <div class="data-area">
      <div class="data-area-header">
        <div class="data-area-header-left">
          <el-input style="width: 240px" size="mini" v-model="searchValue" placeholder="请输入关键属性进行查询">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="data-area-header-right">
          <span class="defaultSort" @click="handleSort('1')">默认排序</span>
          <i class="el-icon-d-caret"></i>
          <span class="createTime" :class="{ hignLight: sortType === '2' }" @click="handleSort('2')">创建日期</span>
          <i class="el-icon-d-caret"></i>
          <span class="totalNumbers">为您找到<span style="color: #2460fe">1301</span>条相关记录</span>
        </div>
      </div>
      <div class="data-area-main">
        <div class="data-area-item" v-for="(item, index) in list" :key="index">
          <div class="tag">
            <el-tag class="tag-red" v-if="index == 2">战略产品</el-tag>
            <el-tag class="tag-green" v-else>普通产品</el-tag>
          </div>
          <div style="padding: 8px">
            <div class="flex j-center" style="position: relative">
              <div class="product-name">{{ item.productName }}</div>
            </div>

            <div style="position: relative; margin-top: 4px; text-align: center">
              <el-tag style="color: #2460fe; border-radius: 15px">{{ item.goodsId }}</el-tag>
            </div>

            <div class="bottom clearfix">
              <div class="desc"><span style="color: #666666">商品分类：</span>{{ item.categoryName }}</div>
              <div class="desc a-center desc flex">
                <span> <span style="color: #666666">归属机构：</span>{{ item.orgName }}</span>
              </div>
              <div class="desc" style="color: #2460fe"><span style="color: #666666">打包数量：</span>{{ item.number }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-box">
        <el-pagination background layout="prev, pager, next" :total="153"> </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Products',
  props: {},
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      searchValue: '',
      list: [
        {
          productName: '5G权益原子产品',
          goodsId: '2025999780000793',
          categoryName: '产品/数字内容产品/增值业务原子产品',
          orgName: '在线营销服务中心',
          number: '5',
          effectiveDateBegin: '2023-01-01',
          effectiveDateEnd: '2023-01-01',
          tagName: '普通产品',
        },
        {
          productName: '5G权益原子产品',
          goodsId: '2025999780000793',
          categoryName: '产品/数字内容产品/增值业务原子产品',
          orgName: '在线营销服务中心',
          number: '5',
          effectiveDateBegin: '2023-01-01',
          effectiveDateEnd: '2023-01-01',
          tagName: '普通产品',
        },
        {
          productName: '5G权益原子产品',
          goodsId: '2025999780000793',
          categoryName: '产品/数字内容产品/增值业务原子产品',
          orgName: '在线营销服务中心',
          number: '5',
          effectiveDateBegin: '2023-01-01',
          effectiveDateEnd: '2023-01-01',
          tagName: '普通产品',
        },
        {
          productName: '5G权益原子产品',
          goodsId: '2025999780000793',
          categoryName: '产品/数字内容产品/增值业务原子产品',
          orgName: '在线营销服务中心',
          number: '5',
          effectiveDateBegin: '2023-01-01',
          effectiveDateEnd: '2023-01-01',
          tagName: '普通产品',
        },
        {
          productName: '5G权益原子产品',
          goodsId: '2025999780000793',
          categoryName: '产品/数字内容产品/增值业务原子产品',
          orgName: '在线营销服务中心',
          number: '5',
          effectiveDateBegin: '2023-01-01',
          effectiveDateEnd: '2023-01-01',
          tagName: '普通产品',
        },
        {
          productName: '5G权益原子产品',
          goodsId: '2025999780000793',
          categoryName: '产品/数字内容产品/增值业务原子产品',
          orgName: '在线营销服务中心',
          number: '5',
          effectiveDateBegin: '2023-01-01',
          effectiveDateEnd: '2023-01-01',
          tagName: '普通产品',
        },
        {
          productName: '5G权益原子产品',
          goodsId: '2025999780000793',
          categoryName: '产品/数字内容产品/增值业务原子产品',
          orgName: '在线营销服务中心',
          number: '5',
          effectiveDateBegin: '2023-01-01',
          effectiveDateEnd: '2023-01-01',
          tagName: '普通产品',
        },
        {
          productName: '5G权益原子产品',
          goodsId: '2025999780000793',
          categoryName: '产品/数字内容产品/增值业务原子产品',
          orgName: '在线营销服务中心',
          number: '5',
          effectiveDateBegin: '2023-01-01',
          effectiveDateEnd: '2023-01-01',
          tagName: '普通产品',
        },
        {
          productName: '5G权益原子产品',
          goodsId: '2025999780000793',
          categoryName: '产品/数字内容产品/增值业务原子产品',
          orgName: '在线营销服务中心',
          number: '5',
          effectiveDateBegin: '2023-01-01',
          effectiveDateEnd: '2023-01-01',
          tagName: '普通产品',
        },
      ],
      sortType: '1',
    }
  },
  methods: {
    handleSort(type) {
      if (['1', '2'].includes(type)) {
        this.sortType = type
      } else {
        this.$message.error('排序类型错误')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.query-area {
  margin-top: 12px;
  position: relative;
  padding: 12px 0;
  background: rgba(232, 240, 252, 1);
  ::v-deep .el-form-item__label {
    font-weight: bold;
  }
}
.button-area {
  position: absolute;
  bottom: 16px;
  right: 12px;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}
::v-deep .el-form-item {
  margin-bottom: 8px;
  .el-input,
  .el-form-item__content {
    line-height: 28px;
  }
}
::v-deep .el-form-item__label {
  line-height: 28px;
}

.data-area {
  overflow: hidden ;

  margin-top: 20px;
  background: rgba(232, 240, 252, 1);
}
.data-area-main {
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: space-between;
}
.page-box {
  text-align: right;
  margin: 12px 0;
}
.data-area-item {
  position: relative;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-size: 100% 110%;
  background-image: url(../../assets/query/bg.png);
  .tag-green {
    background-image: linear-gradient(-72deg, #00b839 0%, #9ef8a0 100%);
    box-shadow: 0 2px 1px 0 #1f284021, inset 0 -2px 0 0 #4a000014;
    color: #fff;
    line-height: 24px;
    height: 24px;
  }
  .tag-red {
    line-height: 24px;
    height: 24px;
    background-image: linear-gradient(-71deg, #ff3a3a 0%, #ffbfbf 100%);
    box-shadow: 0 2px 1px 0 #1f284021, inset 0 -2px 0 0 #4a000014;
    color: #fff;
  }
  .product-name {
    font-weight: bold;
  }
  .tag {
    position: absolute;
    right: 0;
    top: 0;
  }
  .bottom {
    margin-top: 16px;
    .desc {
      margin-top: 8px;
    }
  }
}

.data-area-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .data-area-header-left {
    padding: 8px 12px;
  }
  .data-area-header-right {
    margin-right: 8px;
    span {
      &.hignLight {
        color: #409eff;
      }
      &.defaultSort {
        cursor: pointer;
      }
      &.createTime {
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .totalNumbers {
      margin-left: 12px;
    }
  }
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
</style>
