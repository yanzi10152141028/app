<template>
    <div class="person_center">
        <!-- <header-title header="个人中心"></header-title> -->
        <div class="person_content">
            <div class="person_top">
                <div class="person_info">
                    <div class="info">
                        <img  :src="HeaderImg"/>
                         <span>{{NickName}}</span>
                         <img src="../../../static/images/scan.png" class="scan" @click="scanStart"/>
                    </div>
                    <div class="weui-flex">
                        <div class="weui-flex__item">
                            <div class="placeholder">
                        <span>0</span>
                            <p>动态</p>
                            </div>
                        </div>
                        <div class="weui-flex__item">
                            <div class="placeholder" > 
                            <span>0</span>
                            <p>粉丝</p>
                            </div>
                        </div>
                        <div class="weui-flex__item">
                            <div class="placeholder">
                            <span>1</span>
                            <p>7天夜访</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab">
                    <div class="weui-flex">
                        <div class="weui-flex__item">
                            <div class="placeholder">
                            <img src="../../../static/images/collect.png"/>
                            <p>收藏</p>
                            </div>
                        </div>
                        <div class="weui-flex__item">
                            <div class="placeholder" > 
                            <img src="../../../static/images/history.png"/>
                            <p>历史</p>
                            </div>
                        </div>
                        <div class="weui-flex__item">
                            <div class="placeholder">
                            <img src="../../../static/images/night.png"/>
                            <p>夜间</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="person_bottom">
                    <div class="weui-cell weui-cell_access">
                      <div class="weui-cell__bd">
                          <div style="display: inline-block; vertical-align: middle">消息通知</div>
                          <div class="weui-badge" style="margin-left: 5px;">1</div>
                      </div>
                      <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                    </div>
                    <div class="weui-cells weui-cells_after-title">
                        <navigator url="" class="weui-cell weui-cell_access" >
                        <div class="weui-cell__bd">头条商城</div>
                        <div class="weui-cell__ft weui-cell__ft_in-access">邀请好友领红包</div>
                        </navigator>
                        <navigator url="" class="weui-cell weui-cell_access" >
                        <div class="weui-cell__bd">京东供应</div>
                        <div class="weui-cell__ft weui-cell__ft_in-access">新人领取红包</div>
                        </navigator>
                    </div>
                    <div class="weui-cells weui-cells_after-title">
                        <navigator url="" class="weui-cell weui-cell_access" >
                        <div class="weui-cell__bd">我要爆料</div>
                        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                        </navigator>
                        <navigator url="" class="weui-cell weui-cell_access" >
                        <div class="weui-cell__bd">用户反馈</div>
                        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                        </navigator>
                        <navigator url="" class="weui-cell weui-cell_access" >
                        <div class="weui-cell__bd">系统设置</div>
                        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                        </navigator>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderTitle from "../../components/title.vue";
export default {
  components: { HeaderTitle },
  data() {
    return {
      HeaderImg: "",
      NickName: ""
    };
  },
  onLoad() {
    var userInfo = wx.getStorageSync("user");
    this.HeaderImg = userInfo.avatarUrl;
    this.NickName = userInfo.nickName;
    console.log(userInfo);
  },
  methods: {
    // 调用扫码接口
    scanStart() {
      wx.scanCode({
        success(res) {
          console.log(res);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.person_content {
  .person_top {
    .person_info {
      background-color: #211717;
      .info {
        padding: 30px 20px 0;
        img {
          display: inline-block;
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }
        span {
          color: #fff;
          display: inline-block;
          line-height: 64px;
          vertical-align: top;
          padding-left: 20px;
          margin-right: 10px;
        }
        .scan {
          display: inline-block;
          width: 50px;
          height: 50px;
        }
      }
      .weui-flex__item {
        width: 100%;
        text-align: center;
        border-right: 1px solid #565555;
        margin-top: 20px;
        margin-bottom: 20px;
        span {
          color: #fff;
        }
        p {
          color: #cccccc;
        }
      }
      .weui-flex__item:last-child {
        border-right: none;
      }
    }
    .tab {
      .weui-flex__item {
        background-color: #fff;
        text-align: center;
        padding: 20px 0;
        img {
          width: 30px;
          height: 30px;
        }
        p {
          font-size: 16px;
          vertical-align: top;
          line-height: 18px;
        }
      }
    }
  }
}
</style>

