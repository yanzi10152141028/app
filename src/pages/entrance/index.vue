<template>
    <div class="entrance">
      <img src="../../../static/images/entrance.png" />
      <button open-type="getUserInfo" type="primary"  @getuserinfo="bindGetUserInfo" v-if="canIUse" >用户授权</button>
    </div>
</template>
<script>
import { config } from "../../config.js";
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      baseUrl: config
    };
  },
  mounted() {},
  onLoad() {
    // var that = this;
    // //授权
    // wx.getSetting({
    //   success: (res)=>{
    //     if(res.authSetting['scope.userInfo']){
    //         wx.authorize({
    //           scope: 'scope.userInfo',
    //           success: (result)=>{
    //             console.log(result);
    //             wx.startRecord();
    //           },
    //           fail: ()=>{},
    //           complete: ()=>{}
    //         });
    //     }
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
  },
  methods: {
    // 用户授权
    bindGetUserInfo(e) {
      const self = this;
      if (e.mp.detail.userInfo) {
        wx.login({
          success: function(res) {
            if (res.code) {
              wx.request({
                url: self.baseUrl + "/login/getOpenId",
                method: "post",
                data: {
                  code: res.code
                },
                success: function(result) {
                  if (result) {
                    wx.switchTab({
                      url: "../home/main"
                    });
                    wx.setStorageSync("code", res.code);
                    wx.setStorageSync("user", e.mp.detail.userInfo);
                    wx.setStorageSync("openId", result.data.openid);
                    self.$http.post(self.baseUrl + "/message/msgTemplate")
                      .then(function(result) {
                        if (result.status == 200) {
                           wx.setStorageSync("access_token", result.data.access_token);
                        }
                      });
                  }
                }
              });
            } else {
              console.log("登录失败");
            }
          }
        })
      }
    }
  }
};
</script>
<style lang="scss">
.entrance {
  text-align: center;
  padding: 30px;
  img {
    width: 100%;
  }
}
</style>


