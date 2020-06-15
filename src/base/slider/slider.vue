<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
           <span class="dot" v-for="(item,index) in dotsList" :class="{ 'active' : index===currentIndex }"></span>
        </div>
    </div>
</template>

<script>
    import betterScroll from "better-scroll"
    // import {addClass} from 'common/js/dom'
    export default {
        name: "slider",
        data(){
          return {
            dotsList : [],
            currentIndex : 0
          }
        },
        props : {
            loop : {
              type : Boolean,
              default : true
            },
            autoPlay : {
              type : Boolean,
              default : true
            },
            interval : {
               type : Number,
               default : 3000
            }
        },
        mounted(){
          setTimeout(()=>{
            this._setWidth();
            this._initDots();
            this._initScroll();

            if( this.autoPlay ){
                this._play();
            }

          } , 20);

          window.addEventListener("resize" , ()=>{
              this._setWidth(true);
              this.scroll.refresh();
          })

        },
        methods:{
            _setWidth(isResize){
                if( !this.$refs.slider ){
                  return;
                }
                let width = this.$refs.slider.clientWidth;
                var sliderGroupWidth = 0;
                this.children = this.$refs.sliderGroup.children;
                for( let i = 0; i<this.children.length;i++ ){
                  // addClass(this.children[i], 'slider-item');
                  this.children[i].style.width = width + "px";
                  sliderGroupWidth+=width;
                }
                if( this.loop && !isResize ){
                  sliderGroupWidth += 2*width;
                }
                this.$refs.sliderGroup.style.width = sliderGroupWidth + 'px';
            },
            _initScroll(){
               this.scroll = new betterScroll( this.$refs.slider , {
                   scrollX : true,
                   scrollY : false,
                   momentum : false,//是否是动画效果
                   snap: {
                     loop: this.loop,
                     threshold: 0.3,
                     speed: 400
                   },
                   click : true
               });

              // 滚动结束时
              this.scroll.on("scrollEnd" ,()=> {
                  this.currentIndex = this.scroll.getCurrentPage().pageX;
                  if(this.autoPlay){
                    this._play();
                  }
              });

              // 滚动开始前
              this.scroll.on('scrollStart', () => {
                if (this.autoPlay) {
                  clearTimeout(this.timer)
                }
              })




            },
            _initDots(){
                this.dotsList = new Array(this.children.length);
            },
            _play(){
                this.timer = setTimeout(()=>{
                  this.scroll.next();
                } , this.interval);
            }


        },
        destroyed(){
            clearTimeout(this.timer);
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
