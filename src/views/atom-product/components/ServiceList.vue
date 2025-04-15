<template>
  <div class="service-list-container">
    <div
      class="service-box"
      v-for="service in services"
      :key="service.title"
    >
      <div class="left-box">
        <div class="title">{{service.title}}</div>
        <div class="desc">{{service.description}}</div>
        <img
          v-if="getImgPath(service)"
          class="left-bottom-img"
          :src="getImgPath(service)"
        >
      </div>
      <div class="right-box">
        <div
          class="sub-app"
          v-for="app in service.subApp"
          :key="app.title"
        >
          <div class="sub-title">{{app.subTitle}}</div>
          <div class="sub-items">
            <div
              class="item"
              v-for="item in app.items"
              :key="item.name"
              :style="{minWidth: item.minWidth?item.minWidth:'auto'}"
              @click="sendClick(item)"
            ><img
                src="../../../assets/icon/itemIcon.png"
                class="item-icon"
                alt="icon"
              >{{item.name+'（'+item.count+'）'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceList',
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  methods: {
    getImgPath (item) {
      // 根据subTitle和items长度计算高度（每1个subTitle加24px 每4个item加40px）
      let preHight = 0
      item.subApp.forEach(app => {
        if (app.subTitle) preHight += 24
        preHight += app.items.length > 4 ? Math.ceil(app.items.length / 4) * 40 : 40
      })
      if (preHight < 130) return ''
      return item.imgPath ? `src/assets/${item.imgPath}.png` : ''
    },
    sendClick (item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.service-list-container {
  margin-top: 17px;
  .service-box {
    display: flex;
    margin-bottom: 17px;
    .left-box {
      background-image: linear-gradient(179deg, #f2f7ff 0%, #ffffff 100%);
      border-radius: 8px;
      width: 20%;
      margin-right: 16px;
      padding: 20px 14px;
      position: relative;
      .title {
        color: #2460fe;
        font-family: PingFang-SC-Bold;
        font-weight: 700;
        font-size: 18px;
        text-align: justify;
      }
      .desc {
        margin-top: 17px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #666666;
        text-align: justify;
      }
      .left-bottom-img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 179px;
        height: 179px;
      }
    }
    .right-box {
      width: 100%;
      background-color: white;
      padding: 16px 18px;
      padding-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .sub-title {
        margin-top: 16px;
        width: 100%;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        font-size: 16px;
        color: #414352;
        text-align: justify;
        min-height: 23px;
      }
      .sub-items {
        display: flex;
        flex-wrap: wrap; /* 允许换行 */
        // justify-content: space-between; /* 项目之间间距均匀分布 */
        .item {
          margin-top: 12px;
          flex: 0 0 calc(25% - 15px); /* 每个项目占据25%的宽度 */
          box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */
          padding: 5px; /* 根据需要调整内边距 */
          text-align: center; /* 根据需要调整对齐方式 */
          display: flex;
          background: #ffffff;
          border: 1px solid #eeeeee;
          border-radius: 4px;
          align-content: center;
          cursor: pointer;
          margin-right: 15px;
          &:hover {
            border: 1px solid #2460fe;
            // border-color: #2460fe;
          }
          .item-icon {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }
}
</style>