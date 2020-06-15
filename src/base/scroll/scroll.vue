<template>
    <div ref="wrapper">
          <slot></slot>
    </div>
</template>

<script>
    import betterScroll from 'better-scroll'
    export default {
        name: "scroll",
        props : {
          probeType : {
              type : Number ,
              default : 3
          },
          data :{
            type : Array,
            default : null
          },
          listenScroll : {
              type : Boolean,
              default : false
          }
        },
        created(){
          setTimeout(()=>{
            this._initScroll();
          } , 20)
        },
        methods : {
            _initScroll(){
                this.scroll = new betterScroll( this.$refs.wrapper , {
                    probeType : this.probeType,
                    click : true
                });
                if( this.listenScroll ){
                    let _this = this;
                    this.scroll.on("scroll" ,(pos)=>{
                        _this.$emit('posY' , pos.y);
                    })
                }
            },
            refresh(){
                this.scroll && this.scroll.refresh();
            },
            scrollToElement(){
                this.scroll && this.scroll.scrollToElement.apply(this.scroll , arguments);
            }
        },
      watch : {
          data(){
              setTimeout(()=>{
                this.refresh();
              } , 20)
          }
        }
    }
</script>

<style scoped>

</style>
