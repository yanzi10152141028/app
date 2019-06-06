<template>
  <div class="home">
     <header-search ></header-search>
     <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item.text}}</div>
            </div>
          </block>
          <div class="weui-navbar__title add_img" >
              <img  :src="addImg"/>
          </div>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content" :hidden="activeIndex != 0">
              <home-info type="推荐" ref="childMethod"></home-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
             <home-info type="生活" ref="childMethod"></home-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">
             <home-info type="娱乐" ref="childMethod"></home-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 3">
             <home-info type="搞笑" ref="childMethod"></home-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 4">
           <home-info type="游戏" ref="childMethod"></home-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 5">
             <home-info type="体育" ref="childMethod"></home-info>
          </div>
        </div>
     </div> 
  </div>  
</template>
<script>
import HeaderSearch from "../../components/header.vue";
import { config } from "../../config.js";
import HomeInfo from "../../components/homepage.vue";
export default {
  components: { HeaderSearch, HomeInfo },
  data() {
    return {
      tabs: ["dd", "d"],
      activeIndex: 0,
      fontSize: 30,
      addImg: require("../../../static/images/icon_add.png"),
      baseUrl: config,
      flag: true
    };
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    //点击菜单栏
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
    },
    getMenuList(e) {
      var self = this;
      this.$http
        .post(this.baseUrl + "/info/getMenu", {
          type: "小程序",
          menuType: "首页"
        })
        .then(function(result) {
          self.tabs = result.data;
        });
    },
    // 下拉刷新
    onPullDownRefresh: function() {
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      //模拟加载
      setTimeout(function() {
        // complete
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
      }, 1500);
    }
  }
};
</script>
<style lang="scss">
page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .weui-tab {
    width: 100%;
    position: fixed;
    top: 115px;
    z-index: -1;
    .weui-tab__panel {
      margin-top: 40px !important;
      padding-top: 0;
      padding-bottom: 150px;
    }
    .weui-bar__item_on {
      color: red;
    }
    .weui-navbar__item {
      padding: 8px 0 !important;
    }
    .add_img {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(255, 255, 255, 0.9);
      height: 34px;
      z-index: 1;
      img {
        width: 34px;
        height: 34px;
      }
    }
  }
}
</style>
