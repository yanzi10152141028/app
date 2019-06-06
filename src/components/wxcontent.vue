<template>
    <div class="wx_content">
        <div class="add_info" v-if = "type=='图片'">
            <form  report-submit='true' @submit="addImgInfo">
                <div>
                    <label>资讯标题：</label>
                    <input placeholder="请输入资讯标题" v-model="title"/>
                </div>
                <div>
                     <label>菜单类型：</label>
                     <picker class="weui-btn"  mode="multiSelector"  @change="selectType"  :range="array">
                        <input type="text" placeholder="请选择类型" v-model="menuType" readonly="readonly"/>
                     </picker>
                </div>
                <div>
                    <label>图片上传：</label>
                    <img src="../../static/images/attention.png" @click="chooseImage" class="add_img"/>
                    <div class="weui-uploader__files" id="uploaderFiles">
                        <block v-for="item in files" :key="index">
                        <div class="weui-uploader__file" @click="predivImage" :id="item">
                            <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletImage(index)"/>
                            <image class="weui-uploader__img" :src="item" mode="aspectFill" />
                        </div>
                        </block>
                    </div>
                </div>
                <div class="btn">
                    <button type="primary" form-type="submit">添加</button>
                </div>
            </form>
        </div>
        <div class="add_info" v-else>
            <form>
                <div>
                     <label>菜单类型：</label>
                     <picker class="weui-btn"  mode="multiSelector"  @change="selectType"  :range="array">
                        <input type="text" placeholder="请选择类型" v-model="menuType" readonly="readonly"/>
                     </picker>
                </div>
                <div>
                    <label>视频上传：</label>
                    <img src="../../static/images/attention.png" @click="chooseVideo" class="add_img"/>
                    <div class="weui-uploader__files" id="uploaderFiles">
                        <block v-for="(item,index) in src" :key="index">
                        <div class="weui-uploader__file" :id="item">
                            <icon type="cancel" size="20" class="th-icon-cancel" @click.stop="deletVideo(index)"/>
                             <video  :src="item"  class="video"></video>
                        </div>
                        </block>
                    </div>
                </div>
                <div class="btn">
                    <button type="primary" form-type="submit" @click="addVideoInfo">添加</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { config } from "../config.js";
import common from "../../static/js/common.js";
export default {
  props: ["type"],
  data() {
    return {
      files: [],
      baseUrl: config,
      title: "",
      username: "",
      menuType: "",
      array: [
        ["首页", "西瓜视频"],
        ["推荐", "生活", "娱乐", "搞笑", "游戏", "体育", "视频"]
      ],
      imgList: [],
      src: [],
      videoUrl: ""
    };
  },
  methods: {
    //图片上传
    chooseImage(e) {
      var _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var tempFilePaths = res.tempFilePaths;
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths);
          wx.uploadFile({
            url: _this.baseUrl + "/upload/img", //图片上传接口
            filePath: tempFilePaths[0],
            name: "file",
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function(res) {
              wx.showToast({
                title: "图片上传成功",
                icon: "none",
                duration: 1500,
                mask: false
              });
              var imgUrl = JSON.parse(res.data).path;
              _this.imgList.push(imgUrl);
            },
            fail: function() {
              wx.showToast({
                title: "上传失败",
                icon: "none",
                image: "",
                duration: 1500,
                mask: false
              });
            }
          });
        },
        fail: function() {
          wx.showToast({
            title: "格式不正确",
            icon: "none",
            image: "",
            duration: 1500,
            mask: false
          });
        }
      });
    },
    //图片预览
    predivImage(e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      });
    },
    // 删除图片
    deletImage(index) {
      this.files.splice(index, 1);
      //  this.filesOnline.splice(index,1);
    },
    // 图片上传选择赋值
    selectType(e) {
      this.menuType =
        this.array[0][e.mp.detail.value[0]] +
        "-" +
        this.array[1][e.mp.detail.value[1]];
    },
    // 上传视频
    chooseVideo() {
      var _this = this;
      wx.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        compressed: true,
        camera: "back",
        success(res) {
          var tempFilePaths = res.tempFilePath;
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.src = _this.src.concat(res.tempFilePath);
          wx.uploadFile({
            url: _this.baseUrl + "/upload/img", //视频上传接口
            filePath: tempFilePaths,
            name: "file",
            success: function(res) {
              _this.videoUrl = JSON.parse(res.data).path;
              wx.showToast({
                title: "视频上传成功",
                icon: "none",
                duration: 1500,
                mask: false
              });
            },
            fail: function(e) {
              console.log(e);
            }
          });
        },
        fail: function() {
          console.log("选择视频失败！");
        }
      });
    },
    // 删除视频
    deletVideo(index) {
      this.src.splice(index, 1);
    },
    // 添加图片信息
    addImgInfo(e) {
      // var self = this;
      // // 发送模板
      //   var formId = e.mp.detail.formId;
      //   // var formId = "79dad705660e4e0785f1e5cc20fffbe8";
      //   console.log(formId);
      //   // var access_token = wx.getStorageSync("access_token");
      //   var access_token ="22_A_HYE_ywyE7x-7Mz9N7YANtFbmcQSEqJRPrBqBxmemDw56H-jGVCN3KfBFM4osKFsAhrzi78uy8ZUTfU-rP0eFlYJS4NZh7Q-C-MWWokg55FvpMC7ftiZimiTfUNAMjAGAREQ";
      //   // var openid = wx.getStorageSync("openId");
      //   var openid = "ocDYZ4yXXeuflR51vazGnNSlkGK4";
      //   var url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='+ access_token;
      //   var d = {
      //      access_token:access_token,
      //      touser:openid,
      //      template_id:"1DyV9wtQXr17PDfq3RNCl6NFm5QCjyNjSny5oI6aGMM",
      //      page:'../home/main',
      //      form_Id:formId,
      //      data:{
      //          "keyword1": {"value": "alisa","color": "#4a4a4a" },
      //          "keyword2": {"value": "燕子", "color": "#4a4a4a"}
      //      },
      //      header:"content-type:application/json"
      //   }
      //   self.$http.post(url,{
      //     data:JSON.stringify(d)
      //   }).then(function(result){
      //       console.log(result);
      //   }).catch(function (err) {
      //      console.log(err);
      //   })
      var self = this;
      var date = new Date().toLocaleString();
      date = common.getDateTime(date);
      var userInfo = wx.getStorageSync("user");
      this.username = userInfo.nickName;
      var menu = this.menuType.split("-");
      var firstMenu = menu[0];
      var twoMenu = menu[1];
      if (this.imgList) {
        var imgList = this.imgList.join(",");
      }
      this.$http
        .post(this.baseUrl + "/info/addInformation", {
          title: this.title,
          addDate: date,
          username: this.username,
          img: imgList,
          type: twoMenu,
          firstType: firstMenu
        })
        .then(function(result) {
          wx.showToast({
            title: "添加成功",
            icon: "success",
            duration: 3000,
            mask: true
          });
          // 发送模板
          var formId = e.mp.detail.formId;
          // var formId = "9da7483339814d8e9d4ac80eb5a1f388";
          console.log(formId);
          var access_token = wx.getStorageSync("access_token");
          var openId = wx.getStorageSync("openId");
          var url = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" +access_token;
          var d = {
            keyword1: {
              value: "alisa",
              color: "#4a4a4a"
            },
            keyword2: {
              value: "2019-09-09",
              color: "#9b9b9b"
            },
            keyword3: {
              value: "小燕子",
              color: "#9b9b9b"
            }
          };
          wx.request({
            url: url,
            data: {
                touser: openId,
                template_id: 'UsC71sZXUx7hn-meqlGX2cbEOu9xNz7vdga36p-_37Q', //申请的模板消息id，  
                page: '../home/main',
                form_id: formId,
                data: d,
                color: '#ccc',
                emphasis_keyword: 'keyword1.DATA'
            },
            header: {'content-type':'application/json'},
            method: 'POST',
            success: (result) => {
               console.log("发送成功");
               console.log(result);
            },
            fail: (err) => {
               console.log(err)
            },
          });  
          // self.$http.post(url, {
          //     data: {
          //       touser: openid,
          //       template_id: "UsC71sZXUx7hn-meqlGX2cbEOu9xNz7vdga36p-_37Q", //申请的模板消息id，
          //       page: "../home/main",
          //       form_id: formId,
          //       data: d,
          //       color: "#ccc",
          //       emphasis_keyword: "keyword1.DATA"
          //     }
          //   })
          //   .then(function(result) {
          //     console.log(result);
          //   })
          //   .catch(function(err) {
          //     console.log(err);
          //   });
          setTimeout(function() {
            wx.switchTab({
              url: "../home/main",
              success: function(e) {
                let currentPages = getCurrentPages().pop();
                if (currentPages == undefined || currentPages == null) return;
                currentPages.onLoad();
              }
            });
          }, 1000);
          self.title = "";
          self.menuType = "";
          self.files = "";
          self.username = "";
        });
    },
    // 添加视频信息
    addVideoInfo(e) {
      var self = this;
      var date = new Date().toLocaleString();
      date = common.getDateTime(date);
      var userInfo = wx.getStorageSync("user");
      this.username = userInfo.nickName;
      var menu = this.menuType.split("-");
      var firstMenu = menu[0];
      var twoMenu = menu[1];
      if (this.imgList) {
        var imgList = this.imgList.join(",");
      }
      this.$http
        .post(this.baseUrl + "/info/addInformation", {
          title: this.title,
          addDate: date,
          username: this.username,
          img: this.videoUrl,
          type: twoMenu,
          firstType: firstMenu
        })
        .then(function(result) {
          wx.showToast({
            title: "添加成功",
            icon: "success",
            duration: 3000,
            mask: true
          });
          setTimeout(function() {
            wx.switchTab({
              url: "../video/main",
              success: function(e) {
                let currentPages = getCurrentPages().pop();
                if (currentPages == undefined || currentPages == null) return;
                currentPages.onLoad();
              }
            });
          }, 1000);
          self.title = "";
          self.menuType = "";
          self.files = "";
          self.username = "";
        });
    }
  }
};
</script>
<style lang="scss">
.add_info {
  padding: 20px;
  div {
    padding-bottom: 20px;
    input {
      border-bottom: 1px solid #cccccc;
      display: inline-block;
      padding: 5px;
    }
    label {
      display: inline-block;
      vertical-align: top;
    }
    .weui-btn {
      display: inline-block;
      margin-top: 0;
    }
    .weui-uploader__input-box {
      left: 50%;
    }
    .add_img {
      width: 64px;
      height: 64px;
      vertical-align: top;
    }
  }
  .weui-uploader__files {
    padding-bottom: 70px;
  }
  .btn {
    width: 80%;
    margin: 50px auto;

    buttom {
      display: inline-block;
      width: 80%;
      margin-top: 20px;
    }
  }
}
</style>


