<template>
  <div class="view-chartwatera" ref="chartView">Click to bind lines.</div>
</template>

<script>
// import echarts from "echarts";
import BaseView from "../View";
import echarts from "echarts";
import 'echarts-liquidfill'
export default {
  name: "viewChartwatera",
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
        series: [
          {
            name: "水球图",
            type: "liquidFill",
            radius: "90%",
            center: ["50%", "50%"],
            waveAnimation: 10, // 动画时长
            amplitude: 5, // 振幅
            top:20,
            let:'5%',
            right:'5%',
            bottom:20,
            data: [0.6],
            itemStyle: {
              //渐变色设置
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#14DAFF",
                  },
                  {
                    offset: 1,
                    color: "#4C87FF",
                  },
                ]),
              },
            },
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: "#14DAFF",
                },
                {
                  offset: 0,
                  color: "#4C87FF",
                },
              ],
              globalCoord: false,
            },
            label:{
              normal: {
              textStyle: {
                  color: '#ffffff',
                  insideColor: '#ffffff',
                  fontSize: 16
              }
          }
            },
            outline: {
              show: true,
              borderDistance: 0,
              itemStyle: {
                borderWidth: 2,
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#14DAFF",
                    },
                    {
                      offset: 1,
                      color: "#4C87FF",
                    },
                  ],
                  globalCoord: false,
                },
              },
            },
           
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
        // console.log(this.$refs.chartView);
        this.echart.resize();
      }
    },
    updateView() {
      this.setOption(this.option);
    },
  },
  mounted() {
  // let arr =  this.detail.dataBind
   this.detail.dataBind.chartwatera = this.waterData
  // arr.chartwatera = 'chartwatera'
    // console.log(this.detail);
    // console.log(this.$store.state.topoEditor.topoData.components[9].style.position.h);
    // this.$nextTick(function () {
     this.setOption(this.option);
    // });
  },
};
</script>

<style lang="scss">
.view-chartwatera {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
