<template>
    <div class="home_page">
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <div class="typeset_one">
                    <div class="one">
                        <h3>{{item.title}}</h3>
                        <!-- <img src="../../static/images/head_img.jpg"/>             -->
                    </div>
                    <div class="imgs">
                      <img :src="item.img"/>
                         <!-- <img :src="i" v-for="(i,j) in item.img" :key="j"/> -->
                    </div>
                </div>
                <p class="marker"><span>{{item.username}}</span><span>1&nbsp;评论</span><span>{{item.addDate}}</span></p>
            </li>
        </ul>
    </div>
</template>
<script>
import {config} from "../config.js"
export default {
  props:['type'],
  data(){
    return{
      baseUrl:config,
      list:[],
      imgList:[]
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
          firstType:'首页'
        }).
        then(function(result){
          if(result.status == 200){
            for(var i=0;i<result.data.length;i++){
              var title = result.data[i].title;
              var username = result.data[i].username;
              var addDate = result.data[i].addDate.split("T")[0];
              var imgs = result.data[i].img;
              // if(imgs.indexOf(",") > -1){
              //    imgs= imgs.split(",");
              //    for(var i=0;i<imgs.length;i++){
              //        var   img = imgs[i];
              //        self.imgList.push(self.baseUrl+img)
              //        console.log("1"+img);
              //    }
              // }
              self.list.push({
                title:title,
                username:username,
                addDate:addDate,
                img:self.baseUrl+imgs
              })
            }
          }
        })
     }
  }

};
</script>
<style lang="scss">
.home_page {
  ul {
    li {
      border-bottom: 1px solid #cccccc;
      padding:6px 0;
      margin: 0 10px;
      .one{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          h3{
              font-size: 17px;
              padding: 5px 0;
          }
          img{
            width:120px;
            height: 120px;
          }
      }
      .imgs {
        padding-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        img {
          width: 110px;
          height: 110px;
        }
      }
      .marker {
        color: #8a8a8a;
        font-size: 14px;
        padding-top: 10px;
        padding-bottom: 5px;
        span {
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
    li:last-child{
      border-bottom:0;
    }
  }
}
</style>

