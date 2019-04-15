<template>
    <div>
      <button @click="addMapOverlay">显示轨迹</button>
      <div style="width:700px;height:550px;border:#ccc solid 1px;font-size:12px" id="map"></div>
      <p style="color:red;font-weight:600">地图生成工具基于百度地图JS api v2.0版本开发，使用请申请密匙。
        <a href="http://developer.baidu.com/map/index.php?title=jspopular/guide/introduction" style="color:#2f83c7" target="_blank">了解如何申请密匙</a>
        <a href="http://lbsyun.baidu.com/apiconsole/key?application=key" style="color:#2f83c7" target="_blank">申请密匙</a>
      </p>
    </div>
</template>
<script>
export default {
  name: 'mapPath',
  data() {
    return {
      map: null,
      posList: [
        {
          lati: 118.824877,
          long: 32.039678
        },
        {
          lati: 118.824998,
          long: 32.040543
        },
        // {
        //   lati: 118.825052,
        //   long: 32.040816
        // },
        {
          lati: 118.825528,
          long: 32.040772
        },
        {
          lati: 118.826283,
          long: 32.041383
        },
        {
          lati: 118.82578,
          long: 32.041895
        }
      ],
      chartData: []
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    showMap () {
      for (let i = 0, len = this.posList.length; i < len; i++) {
        this.chartData.push(new BMap.Point(this.posList[i].lati, this.posList[i].long))
      }

      for (let i = 0; i < this.chartData.length-1; i++) {
        let startPoint = this.chartData[i];
        let endPoint = this.chartData[i + 1];
        this.showPath(startPoint, endPoint);
      }
    },
    showPath (startPoint, endPoint) {
      let driving = new BMap.DrivingRoute(this.map, {renderOptions:{map: this.map, autoViewport: true},
        onMarkersSet: (routes) => {
          for(let m = 0; m < routes.length; m++){
            let mm=routes[m].marker;
            this.map.removeOverlay(mm)
          }
        }
      });
      driving.search(startPoint, endPoint)
      
      driving.setPolylinesSetCallback(rs => {
        let line = rs[0].getPolyline()
        line.setStrokeColor('red')
        line.setStrokeWeight('8')
        line.setStrokeOpacity(0.8)
      })
     
    },
    initMap() {
      this.createMap();//创建地图
      this.showMap()
      this.setMapEvent();//设置地图事件
      this.addMapControl();//向地图添加控件
      this.addMapOverlay();//向地图添加覆盖物
    },
    createMap(){ 
      this.map = new BMap.Map("map"); 
      this.map.centerAndZoom(new BMap.Point(this.posList[0].lati, this.posList[1].long), 19);
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(new BMap.NavigationControl());
    },
    setMapEvent(){
      this.map.enableScrollWheelZoom();
      this.map.enableKeyboard();
      this.map.enableDragging();
      this.map.enableDoubleClickZoom()
    },
    // addClickHandler(target,window){
    //   target.addEventListener("click", function(){
    //     target.openInfoWindow(window);
    //   });
    // },
    addMapOverlay(){
      // 起点
      let pt = new BMap.Point(this.posList[0].lati, this.posList[0].long);
      let myIcon = new BMap.Icon("/static/car.png", new BMap.Size(30, 20), {
      　imageSize: new BMap.Size(30, 20), // 引用图片实际大小
      　imageOffset:new BMap.Size(0, 0 )  // 图片相对视窗的偏移
      });
      let marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
      this.map.addOverlay(marker2);  
      
      // 终点
      let endIndex = this.posList.length - 1
      let firstPoint = new BMap.Point(this.posList[endIndex].lati, this.posList[endIndex].long)
      let m1 = new BMap.Marker(firstPoint);
      this.map.addOverlay(m1);
      let lab1 = new BMap.Label('终', { position: firstPoint, offset: new BMap.Size(-8, -25) });
      lab1.setStyle({
        color: "#fff",
        fontSize: "13px",
        backgroundColor: "0.05",
        border: "0",
        fontWeight: "bold"
      });
      this.map.addOverlay(lab1);
    },
    addMapControl(){
      let scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      this.map.addControl(scaleControl);
      let navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      this.map.addControl(navControl);
      let overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
      this.map.addControl(overviewControl);
    }
  }
}
</script>

<style>
</style>