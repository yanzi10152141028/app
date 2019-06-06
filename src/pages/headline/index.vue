<template>
    <div class="wx_new">
      <header-title  header="微头条"></header-title>
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content" :hidden="activeIndex != 0">
             <header-content type="图片"></header-content>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
             <header-content type="视频"></header-content>
          </div>
        </div>
      </div>
       <!-- <div class="page__bd page__bd_spacing">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="placeholder">
              <img src="../../../static/images/edit.png"/>
              <span>资讯添加</span>
            </div>
          </div>
          <div class="weui-flex__item">
            <div class="placeholder"  @click="chooseImage"> 
             <img src="../../../static/images/video.png"/>
              <span>视频添加</span>
            </div>
          </div>
        </div>
       </div> -->
       <div class="headline_content">
         <!-- <header-content></header-content> -->
          <!-- <div class="weui-uploader__bd">
              <div class="weui-uploader__files" id="uploaderFiles">
                <block v-for="item in files" :key="index">
                  <div class="weui-uploader__file" @click="predivImage" :id="item">
                    <image class="weui-uploader__img" :src="item" mode="aspectFill" />
                  </div>
                </block>
              </div>
          </div> -->
       </div>
    </div>
</template>
<script>
import HeaderTitle from "../../components/title.vue"
import HeaderContent from "../../components/wxcontent.vue"
export default {
  components: { HeaderTitle,HeaderContent },
  data() {
    return {
      files: [],
      imgUrl: require("../../../static/images/video.png"),
      tabs:["图片上传","视频上传"],
      activeIndex:0
    };
  },
  methods: {
    chooseImage(e) {
      var _this = this;
      wx.chooseImage({
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths);
        },
        fail: function() {
          console.log("fail");
        },
        complete: function() {
          console.log("commplete");
        }
      });
    },
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      });
    },
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
    }
  }
};
</script>
<style lang="scss">
.wx_new{
     .weui-navbar__item{
       border-right: 1px solid #cccccc ;
     }
     .weui-navbar__item:last-child{
       border-right: 0;
     }

}


  

</style>

