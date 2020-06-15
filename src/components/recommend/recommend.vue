<template>
    <div class="recommend"  ref="recommend">
        <scroll class="recommend-content" ref="scroll" :data="discList">

            <div>
                <div class="slider-wrapper" v-if="silderList.length">
                  <div class="slider-content">

                    <slider>
                        <div v-for="item in silderList"  class="slider-item" >
                          <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                          </a>
                        </div>
                    </slider>

                  </div>
                </div>

                <div class="recommend-list">
                  <h1 class="list-title">热门歌单推荐</h1>
                  <ul>
                      <li class="item" v-for="item in discList">
                          <div class="icon">
                            <img v-lazy="item.imgurl" alt="" style="width: 60px;height: 60px;">
                          </div>
                          <div class="text">
                              <div class="name" v-html="item.creator.name"></div>
                              <div class="desc" v-html="item.dissname"></div>
                          </div>
                      </li>
                  </ul>
                </div>
            </div>


            <!--滚动加载更多-->
            <div class="loading-container" v-if="!discList.length">
                <loading></loading>
            </div>

        </scroll>
    </div>
</template>

<script>
    import {getRecommend , getDiscList} from "api/recommend"
    import {ERR_OK} from "api/configParams"
    import Slider from "base/slider/slider"
    import Scroll from 'base/scroll/scroll'
    import Loading from "base/loading/loading"

    export default {
        name: "recommend",
        components : {
          Slider,
          Scroll,
          Loading
        },
        data(){
          return{
            silderList : [],
            discList : []
          }
        },
        created(){
            this._getRecommend();
            this._getDiscList();
        },
        methods :{
          _getRecommend(){
            getRecommend().then((res)=>{
              if( res.code === ERR_OK ){
                  this.silderList = res.data.slider;
              }
            })
          },
          _getDiscList(){
            getDiscList().then((res)=>{ //promise成功时执行的方法
                if( res.code === ERR_OK ){
                    this.discList = res.data.list;
                }
            })
          },

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

