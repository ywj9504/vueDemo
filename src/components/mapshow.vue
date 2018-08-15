<template>
  <div id="container"> </div>
</template>

<script type="text/javascript">
  import BaiMap from './map.js'
    export default {
        name: "mapshow",
      data(){
          return{
            tableData:[],
            maps,
          }
      },
      mounted() {
        BaiMap.init()
          .then((BMap) => {
            console.log(BMap)
            console.log("加载成功...")
            this.initmap()
          })
      },
      created(){
        this.initData();
      },

      methods:{
        async initData(){
          let url = '/areas/all/';
          this.$axios.get(url)
            .then(res=> {
              console.log(res.data);
              this.tableData = [];
              res.data.forEach(item => {
                const tD = {};
                tD.detail = item.detail;
                tD.number = item.number;
                tD.owner = item.owner;
                tD.status = item.status;
                tD.longitude = item.longitude;
                tD.latitude = item.latitude;
                this.tableData.push(tD);
              })
              this.addpoint();
            }).catch(error=>{
            console.log(error.data);
          });
        },
        initmap(){

          // 百度地图API功能
          var map = new BMap.Map("container");    // 创建Map实例
          map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
          //添加地图类型控件
          map.addControl(new BMap.MapTypeControl({
            mapTypes:[
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP
            ]}));
          map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
          this.maps = map;
        },
        addpoint(){
          var map = this.maps;
          this.tableData.forEach(item => {
            let lng = Number(item.longitude);
            let lat = Number(item.latitude);
            let p = new window.BMap.Point(lng, lat);
            let marker = new window.BMap.Marker(p);
            map.addOverlay(marker);
            let label = new window.BMap.Label(item.number);
            marker.setLabel(label);
            let info = new window.BMap.InfoWindow("详细信息：" + item.detail);
            marker.addEventListener("mouseover",function () {
              this.openInfoWindow(info);
            })
            marker.addEventListener("mouseout",function () {
              map.closeInfoWindow();
            })
            var _this = this;
            marker.addEventListener("click",function () {
              console.log(this.$parent);
              _this.$router.push({path:'/ardlist',query:{areaid:item.number}});
            })
          })
        },
      }


    }
</script>

<style scoped>
  #container{width:100%; height: 100%;}
</style>
