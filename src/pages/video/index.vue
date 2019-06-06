<template>
    <div class="video">
      <header-search info="视频"></header-search>
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
              <video-info type="推荐" ></video-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
             <video-info type="直播" ></video-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">
             <video-info type="影视" ></video-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 3">
            <video-info type="社会" ></video-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 4">
           <video-info type="游戏" ></video-info>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 5">
            <video-info type="NBA" ></video-info>
          </div>
        </div>
      </div>  
    </div>
</template>
<script>
import HeaderSearch from "../../components/header.vue";
import VideoInfo from "../../components/videopage.vue";
import {config} from '../../config.js'
export default {
  components: { HeaderSearch,VideoInfo},
  data(){
    return{
      tabs: [],
      activeIndex: 0,
      fontSize: 30,
      addImg: require("../../../static/images/icon_add.png"),
      baseUrl: config
    }
  },
  mounted(){
  this.getMenuList();
  },
  methods:{
      tabClick(e) {
      this.activeIndex = e.currentTarget.id;
      console.log(this.activeIndex);
    },
    getMenuList(e) {
      var self = this;
      this.$http
        .post(this.baseUrl + "/info/getMenu", {
          type: "小程序",
          menuType:'西瓜视频'

        })
        .then(function(result) {
          self.tabs = result.data;
        });
    }
  }
}
</script>
<style lang="scss">
page{
  width: 100%;
  .weui-tab{
    width: 100%;
    position: fixed;
    top: 115px;
    .weui-tab__panel{
      margin-top: 40px !important;
      padding-top: 0;
      padding-bottom: 150px;
    }
    .weui-bar__item_on{
      color: red;
    }
    .weui-navbar__item{
      padding: 8px 0 !important;
    }
      .add_img{
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.9);
        height: 34px;
        img{
            width: 34px;
            height: 34px;
        }
      }
  }
}
</style>
