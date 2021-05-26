<template>
  <div class="view-chart-lines" ref="chartView">Click to bind lines.</div>
</template>

<script>
import echarts from "echarts";
import BaseView from "../View";

export default {
  name: "viewChartLines",
  extends: BaseView,
  props: {},
  // beforeMount:function(){
  //     this.$store.state.topoEditor.topoData.components[9].style.position.h
  // },
  watch: {
    detail: function (newVal) {
      this.setOption(this.option);
    },
  },
  data() {
    return {
      echart: null,
      option: {
        grid: {
          top: "0%",
          left: "0%",
          right: "0%",
          bottom: "10%",
        },
        xAxis: {
          show: false,
          min: 0,
          max: 1200,
        },
        yAxis: {
          show: false,
          min: 0,
          max: 1200,
        },
        series: [
          {largeThreshold:2000,
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 1,
            zlevel: 7,
            animation: true,
            symbolSize : 1200,
            effect: {
              show: true,
              period: 5,
              symbolSize: [15,50],
              symbol:"pin",
              // symbol:"image://http://localhost:9090/statics/img/waterA.png",
              loop: true,
              color:"#1ab0ee"
            
            },
            lineStyle: {
              color: {
                type: "solid",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#cccccc", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffffff", // 100% 处的颜色
                  },
                    {
                    offset: 0,
                    color: "#cccccc", // 0% 处的颜色
                  }
                ],
              
              },
            
              width: 20,
              curveness: 0,
            },
            
            data: [
              {
                coords: [
                  [0, 400],
                  [1230, 400],
                ],
              },
            ],
          },
            {
              largeThreshold:2000,
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 2,
            zlevel: 7,
            animation: true,
            symbolSize : 1200,
            animationThreshold : 5000,
            effect: {
              show: true,
              period: 5,
              symbolSize: [15,50],
              symbol:"pin",
              // symbol:"image://http://localhost:9090/statics/img/waterA.png",
              loop: true,
              color:"#1ab0ee"
            },
            lineStyle: {
              width:0,
              curveness: 0,
            }, 
            data: [
              {
                coords: [
                  [350, 400],
                  [1630, 400],
                ],
              },
            ],
          },
           {
              largeThreshold:2000,
            type: "lines",
            coordinateSystem: "cartesian2d",
            z: 2,
            zlevel: 7,
            animation: true,
            symbolSize : 1200,
            animationThreshold : 5000,
            effect: {
              show: true,
              period: 2,
              symbolSize: [15,50],
              symbol:"pin",
              // symbol:"image://http://localhost:9090/statics/img/waterA.png",
              loop: true,
              color:"#1ab0ee"
            },
            lineStyle: {
              width:0,
              curveness: 0,
            }, 
            data: [
              {
                coords: [
                  [650, 400],
                  [1230, 400],
                ],
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    setOption(option) {
      if (this.echart) {
        this.echart.dispose();
      }
      let view = this.$refs.chartView;
      this.echart = echarts.init(view);
      this.echart.setOption(option);
    },
    onResize() {
      if (this.echart) {
        console.log(  this.$refs.chartView)
        this.echart.resize();
      }
    },
    updateView() {
      this.setOption(this.option);
    },
  },
  mounted() {

    // console.log(this.$store.state.topoEditor.topoData.components[9].style.position.h);
    this.$nextTick(function () {
      this.setOption(this.option);
    });
  },
};
</script>

<style lang="scss">
.view-chart-lines {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
