<template>
    <scroll class="listview" ref="listview" @posY = 'posYfromScroll' :listenScroll = 'listenScroll'>
        <!--左侧-->
        <ul>
            <li v-for="item in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{ item.title }}</h2>
                <ul>
                    <li class="list-group-item" v-for="group in item.item">
                        <img v-lazy="group.image" alt="" class="avatar">
                        <span class="name">{{ group.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>

        <!--右侧-->
        <div class="list-shortcut">
            <ul>
                <li class="item"
                    v-for="(item , index) in shortcutList"
                    :data-index="index"
                    @touchstart="shortcutTouchStart"
                    @touchmove="shortcutTouchMove"
                    :class="{ 'current' : index === currentIndex}"

                >{{ item }}</li>
            </ul>
        </div>


    </scroll>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    const LINEHEIGHT = 18;
    export default {
        name: "listview",
        components : {
          Scroll
        },
        data(){
            return{
              currentIndex : 0,
              scrollY : -1,
              listenScroll : true
            }
        },
        props : {
          data : {
              type : Array ,
              default : []
          }
        },
        created(){
            this.touches = {};
            this.heightList = [0];
           /* this.$nextTick(()=>{
              this._caculateHeight();
            })*/
        },
        computed:{
            shortcutList(){
                return this.data.map((item)=>{
                    return item.title.substr(0,1);
                })
            }
        },
        methods:{
          shortcutTouchStart(e){
              this.touches.y1 = e.touches[0].clientY;
              let index = parseInt(e.target.getAttribute('data-index'));

              console.log( e.target.getAttribute('data-index') );

              this._scrollToElement(index);
          },
          shortcutTouchMove(e){
              this.touches.y2 = e.touches[0].clientY;
              let _thisIndex =  parseInt(e.target.getAttribute('data-index'));

              let datle = this.touches.y2 - this.touches.y1;
              let index = _thisIndex + (datle/18 | 0);
              index = index<0? 0 : index;
              index = index>this.shortcutList.length?this.shortcutList.length-1:index;

              this._scrollToElement(index);

          },
          _scrollToElement(index){
              this.currentIndex = index;
              this.$refs.listview.scrollToElement( this.$refs.listGroup[index] , 0  );
          },
          _caculateHeight(){
              let height = 0;
              let listGroup = this.$refs.listGroup ;
              for( let i = 0 ; i< listGroup.length ; i++ ){
                  let itemHeight = listGroup[i].clientHeight;
                  height+=itemHeight;
                  this.heightList.push(height);
              }
          },
          posYfromScroll(newY){
              let index = 0;
              if( newY > 0 ){
                  index = 0;
                  this.currentIndex = index;
                  return;
              }
              for( let i = 0; i<this.heightList.length ;i++ ){
                if( -newY > this.heightList[i] && -newY < this.heightList[i+1] ){
                    index = i;
                    this.currentIndex = index;
                    return;
                }
              }

          }


        },
        watch :{
            scrollY(newY){
              console.log( newY );
              let index = 0;
              if( newY > 0 ){
                  index = 0;
                  this.currentIndex = index;
                  return;
              }
              for( let i = 0; i<this.heightList.length ;i++ ){
                  if( -newY > this.heightList[i] && -newY < this.heightList[i+1] ){
                      index = i;
                      this.currentIndex = index;
                      return;
                  }
              }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
