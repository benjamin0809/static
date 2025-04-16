<template>
  <div
    class="products-container"
    style="height: 400px;margin-top: 24px;"
  >
    <div class="title-box">
      <img
        id="u571_img"
        class="title-img"
        src="../../assets/products-title-bg.png"
      >
      <div class="title-text">原子产品库</div>
    </div>
    <div class="tab-box" style="margin-top: 12px;;">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="tab-component"
      >
        <el-tab-pane
          label="产品型谱"
          name="products"
        ></el-tab-pane>
        <el-tab-pane
          label="原子货架"
          name="yuanzi"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="search-box">
      <el-input
        v-model="searchValue"
        placeholder="请输入产品目录名称进行查询"
        class="search-input"
      >
        <i
          slot="suffix"
          class="el-input__icon el-icon-search"
          @click="handleSearch"
        ></i>
      </el-input>

    </div>
    <div
      class="content-box"
      id="all-content"
    >
      <div class="content-title-row">
        <el-radio-group
          class="content-radio-group"
          v-model="contentId"
          @input="scrollContent"
        >
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="information">信息服务</el-radio-button>
          <el-radio-button label="communication">通信服务</el-radio-button>
        </el-radio-group>
      </div>
      <div id="information-content">
        <div class="content-desc-row">
          <div class="icon-title"><img
              src="../../assets/icon/info.png"
              class="icon-img"
              alt="Info Icon"
            >信息服务</div>
          <div class="content-desc">产品型谱按照公司主营业务的“两大类”“5+9”进行分类，“两大类”为通信服务和信息服务两类业务，下属产品细分为“5+9”小类。</div>
        </div>
        <ServiceList
          :services="services1"
          @clickItem="clickItem"
        ></ServiceList>
      </div>
      <div class="tr"></div>
      <div id="communication-content">
        <div class="content-desc-row">
          <div class="icon-title"><img
              src="../../assets/icon/commu.png"
              class="icon-img"
              alt="Commu Icon"
            >通信服务</div>
          <div class="content-desc">基于网络基础设施，为客户提供信息传输通道与连接保障的基础服务，实现人-机-物的泛在互联互通，包括以下5小类业务</div>
        </div>
        <ServiceList
          :services="services2"
          @clickItem="clickItem"
        ></ServiceList>
      </div>
    </div>
  </div>
</template>
<script>
import ServiceList from './components/ServiceList.vue';
import bg0 from '../../assets/left-bottom-bg0.png'
import bg1 from '../../assets/left-bottom-bg1.png'
import bg2 from '../../assets/left-bottom-bg2.png'
import bg3 from '../../assets/left-bottom-bg3.png'
export default {
  name: "Products",
  components: {
    ServiceList
  },
  props: {
  },
  data () {
    return {
      activeName: 'products',
      contentId: 'all',
      searchValue: '',
      services1: [
        {
          "title": "移动信息服务",
          "description": "基于无线通信技术，为用户提供的无需实体线路的通信连接服务，如视频、语音、流量等。",
          imgPath: bg0,
          "subApp": [
            {
              "subTitle": "内容应用",
              "items": [
                { "name": "咪咕快游", "count": 150 },
                { "name": "咪咕短剧", "count": 150 },
                { "name": "咪咕视频", "count": 150 },
                { "name": "咪咕音乐", "count": 150 },
                { "name": "咪咕阅读", "count": 150 },
                { "name": "咪咕彩铃", "count": 150 },
                { "name": "和彩印", "count": 150 }
              ]
            },
            {
              "subTitle": "5G应用",
              "items": [
                { "name": "5G消息", "count": 150 },
                { "name": "5G新通话", "count": 150 },
                { "name": "云手机", "count": 150 },
                { "name": "云电脑", "count": 150 }
              ]
            },
            {
              "subTitle": "生活办公",
              "items": [
                { "name": "移动云盘", "count": 150 },
                { "name": "移动钱包", "count": 150 },
                { "name": "移动认证", "count": 150 },
                { "name": "保险", "count": 150 },
                { "name": "手机宝", "count": 150 },
                { "name": "和多号", "count": 150 },
                { "name": "手机报", "count": 150 },
                { "name": "和留言", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "家庭信息服务",
          "description": "以家庭网络和智能硬件为入口，围绕用户家庭娱行、扫区、大车求、家智能安防需求，及乡庭场景，打造的多样化信息服务，如移动爱家、FTTR、移动社区等。",
          imgPath: bg1,
          "subApp": [
            {
              "subTitle": "智家应用",
              "items": [
                { "name": "移动爱家", "count": 150 },
                { "name": "移动看家", "count": 150 },
                { "name": "移动高清", "count": 150 },
                { "name": "咪咕音乐", "count": 150 },
                { "name": "移动康养", "count": 150 },
                { "name": "大屏点播", "count": 150 },
                { "name": "全屏智能", "count": 150 },
                { "name": "移动伴学", "count": 150 },
                { "name": "家庭机器人", "count": 150 }
              ]
            },
            {
              "subTitle": "泛家庭应用",
              "items": [
                { "name": "移动旺铺", "count": 150 },
                { "name": "移动乡村", "count": 150 },
                { "name": "移动社区", "count": 150 }
              ]
            },
            {
              "subTitle": "智能网络",
              "items": [
                { "name": "FEER", "count": 150 },
                { "name": "智能组网", "count": 150 },
                { "name": "云宽带", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "云计算服务",
          "description": "基于移动云+5G双引擎的企业级云计算服务，如移动云、IDC等。",
          imgPath: bg2,
          "subApp": [
            {
              "subTitle": "",
              "items": [
                { "name": "CDN", "count": 150 },
                { "name": "IDC", "count": 150 },
                { "name": "磐基Stak", "count": 150 }
              ]
            },
            {
              "subTitle": "移动云",
              "items": [
                { "name": "IAAS", "count": 150 },
                { "name": "Saas", "count": 150 },
                { "name": "Paas", "count": 150 },
                { "name": "私有云", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "大数据信息服务",
          "description": "依托运营商级数据资产围绕企业、政府生产运作需求，打造的风控、营销、决策等名类数据要素化服务，如认证大数据、梧桐风控等。",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "",
              "items": [
                { "name": "认证大数据", "count": 150 },
                { "name": "内容大数据", "count": 150 },
                { "name": "金融大数据", "count": 150 },
                { "name": "梧桐触达", "count": 150 },
                { "name": "梧桐洞察", "count": 150 },
                { "name": "梧桐风控", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "物联网信息服务",
          "description": "依托物联网连接提供的增值信息服务，如OneNet、OnePark、千里眼等。",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "",
              "items": [
                { "name": "oneNet", "count": 150 },
                { "name": "onePsrk", "count": 150 },
                { "name": "onePoint", "count": 150 },
                { "name": "oneTraffic", "count": 150 },
                { "name": "千里眼", "count": 150 },
                { "name": "和对讲", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "政务及行业应用服务",
          "description": "面向政府与垂直行业提供的各类标准化产品、行业数智化解决方案，如云视讯、移动办公、OneCity等",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "",
              "items": [
                { "name": "云视讯", "count": 150 },
                { "name": "移动办公", "count": 150 },
                { "name": "企业视频彩铃", "count": 150 },
                { "name": "和背包", "count": 150 },
                { "name": "和管家", "count": 150 },
                { "name": "OneCity", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "安全信息服务",
          "description": "为用户提供的个人安全、家庭安全、企业安全等服务，如移动安全管家、OnsS星辰安全等，部分安全产品是基于其他产品融合安全技术、升级打造而型、金的能力",
          imgPath: bg2,
          "subApp": [
            {
              "subTitle": "安全",
              "items": [
                { "name": "超级SIM", "count": 150 },
                { "name": "移动安全管家", "count": 150 },
                { "name": "专线卫士", "count": 150 },
                { "name": "量子密讯", "count": 150 },
                { "name": "量子密码", "count": 150 },
                { "name": "量子密盘", "count": 150 }
              ]
            },
            {
              "subTitle": "量子计算",
              "items": [
                { "name": "云视讯", "count": 150 },
                { "name": "移动办公", "count": 150 },
                { "name": "企业视频彩铃", "count": 150 },
                { "name": "和背包", "count": 150 },
                { "name": "和管家", "count": 150 },
                { "name": "OneCity", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "新型信息服务",
          "description": "基于AI大模型等人工智能技术为用户提供的智能信息服务，如AI视频彩铃AI速记等，与安全信息服务相同，AI信息服务与其他产品可能存在交叉。",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "量子计算",
              "items": [
                { "name": "量子密讯", "count": 150 },
                { "name": "量子密码", "count": 150 },
                { "name": "量子密盘", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "AI信息服务",
          "description": "基于AI大模型等人工智能技术为用户提供的智能信息服务，如AI视频彩铃AI速记等，与安全信息服务相同，AI信息服务与其他产品可能存在交叉",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "AI+产品",
              "items": [
                { "name": "AI视频彩铃", "count": 150 },
                { "name": "AI书童", "count": 150 },
                { "name": "AI数智人", "count": 150 }
              ]
            },
            {
              "subTitle": "AI智能体",
              "items": [
                { "name": "消息智能体", "count": 150 },
                { "name": "家庭服务智能体", "count": 150 },
                { "name": "移动社区", "count": 150 }
              ]
            },
            {
              "subTitle": "AI基础设施",
              "items": [
                { "name": "智能云", "count": 150 },
                { "name": "家庭服务智能体", "count": 150 },
                { "name": "移动社区", "count": 150 }
              ]
            }
          ]
        }
      ],
      services2: [
        {
          "title": "固定连接",
          "description": "基于移动云+5G双引擎的企业级云计算服务，如移动云、IDC等。",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "",
              "items": [
                { "name": "宽带", "count": 150 },
                { "name": "固话", "count": 150 },
                { "name": "专线", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "移动连接",
          "description": "基于无线通信技术，为用户提供的无需实体线路的通信连接服务，如短信、语音、流量等。",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "",
              "items": [
                { "name": "短信", "count": 150 },
                { "name": "语言", "count": 150 },
                { "name": "流量", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "云连接",
          "description": "智能云网融合服务，通过统编排实现云资源池间、云-边-端的高效协同，为企业数智化转型提供弹性可扩展的智能连接底座，如云网一体产品等。",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "",
              "items": [
                { "name": "云同一体[云连援，云互联]", "count": 150, minWidth: '300px' }
              ]
            }
          ]
        },
        {
          "title": "物联网链接",
          "description": "面向各类智能硬件设备，实现物与物的规模化连接、信息交互及管理服务，如物联卡、5G专网等",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "",
              "items": [
                { "name": "5G专网", "count": 150 },
                { "name": "物联网卡", "count": 150 }
              ]
            }
          ]
        },
        {
          "title": "新型连接",
          "description": "基于“空天地一体”网络及新型通信技术所构建的下一代连接服务，如北斗短信、5G-A、低空等",
          imgPath: bg3,
          "subApp": [
            {
              "subTitle": "",
              "items": [
                { "name": "手机直连", "count": 150 },
                { "name": "北斗短信", "count": 150 },
                { "name": "飞联网", "count": 150 },
                { "name": "5G-A", "count": 150 },
                { "name": "5G-低空", "count": 150 }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    compare (data, oldData, compareProps) { },
    handleSearch () {
      console.log('搜索内容:', this.searchValue);
    },
    // tab页签调整
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.name === 'yuanzi') {
        this.$router.push({ path: '/store' });
      }
    },
    // 首页内容滚动
    scrollContent (contentId) {
      console.log('内容ID:', contentId);
      const element = document.getElementById(contentId + '-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    clickItem (data) {
      this.$router.push({ path: '/product-query' });
      console.log('点击item', data)
    }
  },
  watch: {
    oldData (newVal) {

    },
    data (newVal) {

    }
  }
};
</script>
<style lang="scss">
.products-container {
  margin: 0 60px;
  padding-bottom: 20px;
}
.title-box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.title-img {
  width: 100%;
  height: 240px; /* 保持宽高比 */
  object-fit: cover; /* 保持图片比例并裁剪 */
}

.title-text {
  margin-left: 10px; /* 根据需要调整间距 */
  position: absolute;
  height: 100%;
  border-width: 0px;
  position: absolute;
  left: 50px;
  top: 80px;
  width: 370px;
  height: 81px;
  background: inherit;
  border: none;
  border-radius: 0px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 40px;
  text-align: left;
}
.tab-box {
  display: flex;
  width: 100%;
  .tab-component {
    width: 100%;
    font-size: 18px;
    .el-tabs__item {
      font-size: 18px;
    }
  }
  .tab-item {
    padding: 0 20px;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 30px;
    color: #797979;
  }
}

.light {
  color: blue !important;
}

.search-box {
  margin-top: 20px; /* 根据需要调整间距 */
  text-align: right;
  .search-input {
    width: 400px;
    margin-right: 46px;
    .el-input__inner {
      height: 46px; /* 设置输入框高度 */
    }
    .el-input__icon {
      cursor: pointer;
      border-width: 0px;
      position: absolute;
      left: 0px;
      top: 0px;
      background: inherit;
      color: white;
      background-color: rgba(85, 132, 255, 1);
      border: none;
      border-radius: 0px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
      font-weight: 700;
      font-style: normal;
      font-size: 28px;
      width: 57px;
      height: 46px;
    }
  }
}

.content-box {
  padding: 0 20px;
  margin-top: 20px;
  margin-bottom: 10px; /* 根据需要调整间距 */
  border-radius: 8px;
  overflow: hidden;
  background-image: linear-gradient(90deg, #b8d3ff 0%, #dff0ff 26%, #e2eaff 75%, #d0e1ff 100%);
  .tr {
    height: 24px;
    position: relative;
    width: 120%;
    background-color: white;
    left: -30px;
    border-radius: 8px;
  }
  .content-title-row {
    // width: 50%;
    // margin: 0 auto;
    margin-top: 22px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // height: auto;
    text-align: center;
    .content-radio-group {
      background: white;
      border-radius: 20px;
      .el-radio-button {
        border-radius: 20px; /* 设置圆角半径 */
        border: none;
      }

      .el-radio-button:first-child {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border: none;
      }

      .el-radio-button:last-child {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        border: none;
      }

      .el-radio-button__inner {
        border-radius: 20px; /* 设置内部按钮的圆角半径 */
        border: none;
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #2460fe; 
      }
    }
    .content-title {
      font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
      font-weight: 700;
      font-style: normal;
      font-size: 30px;
      color: #797979;
      cursor: pointer;
    }
  }
  .content-desc-row {
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-top: 30px;
    .icon-title {
      position: relative;
      font-size: 24px;
      font-weight: 700;
      .icon-img {
        width: 26px;
        height: 26px;
        position: relative;
        top: 4px;
        margin-right: 5px;
      }
    }
    .content-desc {
      margin-left: 20px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #666666;
      text-align: justify;
    }
  }
}
</style>