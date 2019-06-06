<template>
    <div class="video_page">
        <div class="video_item" v-for="(item,index) in list" :key="index">
            <video :src="item.img"></video> 
            <div class="video_info">
                <img  src="../../static/images/entrance.png"/>
                <span class="info_nickname">{{item.username}}</span>
                <div class="info_item">
                    <ul>
                        <li><img src="../../static/images/attention.png"/><span>关注</span></li>
                        <li><img src="../../static/images/message.png"/><span>1</span></li>
                    </ul>
                </div>
            </div>
        </div>
     </div>
</template>
<script>
import {config} from "../config.js"
export default {
    props:["type"],
    data(){
        return{
            baseUrl:config,
            list:[],
            videoInfo:[{
                "headImg":require("../../static/images/entrance.png"),
                "nickName":'丫丫',
                "num":2
            }]
        }
    },
     onLoad(){
     this.list.splice(0,this.list.length);
     this.getInfo();
  },
    methods:{
         //获取信息
     getInfo(){
       var self = this;
        this.$http.post(this.baseUrl+'/info/getInformation',
        {
          type:this.type,
          firstType:'西瓜视频'
        }).
        then(function(result){
          if(result.status == 200){
            for(var i=0;i<result.data.length;i++){
              var title = result.data[i].title;
              var username = result.data[i].username;
              var addDate = result.data[i].addDate.split("T")[0];
              var img = result.data[i].img;
              self.list.push({
                title:title,
                username:username,
                addDate:addDate,
                img: self.baseUrl+img
              })
            } 
          }
        })
     }
    }
}
</script>
<style lang="scss">
.video_page{
    width:100%;
    .video_item{
       margin-bottom: 10px;
       video{
           width: 100%;
       }
       .video_info{
           padding: 10px;
           overflow: hidden;
           img{
               width: 60px;
               height: 60px;
               border-radius: 50%;
           }
           .info_nickname{
               display: inline-block;
               vertical-align: top;
               line-height: 60px;
               padding-left: 10px;
           }
           .info_item{
               float:right;
               ul{
                   padding: 0;
                   margin-top: 15px;
               }
               li{
                   display: inline-block;
                   font-size: 18px;
                   margin-right: 13px;
                   img{
                   width: 32px;
                   height: 32px;
                   border-radius: 0;
                   }
                   span{
                      display: inline-block;
                      vertical-align: top;
                      line-height: 32px;
                      padding-left: 5px;
                   }
               }
           }
       }
    }
}
</style>

