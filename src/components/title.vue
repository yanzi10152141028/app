<template>
   <div class="header">
        <div class="header_title" >
            <span v-if="header=='微头条'">微头条</span>
            <span v-else>个人中心</span>
        </div>
        <div class="header_left">
            <!-- <img src="../../static/images/person_set.png"/> -->
        </div>
    </div>
</template>
<script>
export default{
    props:["header"],
    data(){
        return{
          val:''
        }
    },
}
</script>
<style lang="scss">
.header{
    text-align:center;
    padding:50px 10px 5px;
    border-bottom:1px solid #ccc;
    overflow:hidden;
    position:relative;
    .header_title{
        vertical-align:middle;
        line-height:32px;
    }
    .header_left{
        position:absolute;
        top:50px;
        right:20px;
        img{
        width:32px;
        height:32px;
        }
    }
}
</style>