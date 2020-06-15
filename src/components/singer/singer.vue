<template>
    <div class="singer">
        <list-view :data="singerList"></list-view>
    </div>
</template>

<script>
    import {getSingerList} from 'api/singer'
    import listView from 'base/listview/listview'
    const HOT_NAME = '热门1';
    const HOT_AMOUNT = 10;

    export default {
        name: "singer",
        data(){
            return{
              singerList : []
            }
        },
        components :{
          listView
        },
        mounted(){
            setTimeout(()=>{
              this._getSingerList();
            } , 20)
        },
        methods : {
            _getSingerList(){
                getSingerList().then((res)=>{
                    this.singerList = this._normalSingerList(res.data.list);
                })
            },
            _normalSingerList(data){

                let map = {};//除了热门的数据
                let hot = [{
                    title  : HOT_NAME,
                    item : []
                }];//热门数据
                for( let i=0 ; i<data.length;i++ ){
                    if( i<HOT_AMOUNT ){
                      hot[0].item.push({
                            id : data[i].Fsinger_mid,
                            name : data[i].Fsinger_name,
                            image :`https://y.gtimg.cn/music/photo_new/T001R300x300M000${data[i].Fsinger_mid}.jpg?max_age=2592000`
                        })
                    }

                    let Findex = data[i].Findex;
                    if( !map[Findex] ){
                      map[Findex] = {
                          title  : Findex,
                          item  :[]
                      }
                    }
                    map[Findex].item.push({
                        id : data[i].Fsinger_mid,
                        name : data[i].Fsinger_name,
                        image :`https://y.gtimg.cn/music/photo_new/T001R300x300M000${data[i].Fsinger_mid}.jpg?max_age=2592000`
                    })

                }

                let ret = [];//排序过的a-z的数据
                for( let key in map ){
                    if( map[key].title.match(/[a-zA-Z]/) ){
                        ret.push(map[key]);
                    }
                }
                ret.sort((a,b)=>{
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                });

                return hot.concat(ret);

            }


        }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

