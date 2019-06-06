<template>
   <div class="page">
    <div class="page__bd">
        <div class="page_title">今日头条</div>
        <div class="search-bar">
            <div class="weui-search-bar__form">
            <div class="weui-search-bar__box">
                <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
                <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
                <icon type="clear" size="14"></icon>
                </div>
            </div>
            <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
                <icon class="weui-icon-search" type="search" size="14"></icon>
                <div class="weui-search-bar__text">搜索</div>
            </label>
            </div>
        </div>
        <div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
        <navigator url="" class="weui-cell" hover-class="weui-cell_active">
          <div class="weui-cell__bd">
            <div>实时搜索文本</div>
          </div>
        </navigator>
      </div>
    </div>  
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputShowed: false,
      inputVal: "",
    };
  },
  methods: {
    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = "";
      this.inputShowed = false;
    },
    clearInput() {
      this.inputVal = "";
    },
    inputTyping(e) {
      this.inputVal = e.mp.detail.value;
    }
  }
};
</script>
<style lang="scss">
.search-bar{
  position: relative;
}
 .weui-searchbar-result{
   background-color:#fff;
   width: 100%;
   position: absolute;
   top: 90px;
   left: 0;
   z-index: 999;
   padding: 10px;
   border:none;
 }
</style>


