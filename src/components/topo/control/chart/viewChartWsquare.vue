<template>
  <div class="view-chart-wsquare" ref="ViewWs">Click to bind lines.</div>
</template>

<script>
// import echarts from "echarts";
let shatpath = "path://M 0 0 L 36 0 L 36 144 L 0 144 Z";
let sdata = [0.8, 0.8, 0.8];
import BaseView from "../View";
import echarts from "echarts";
import "echarts-liquidfill";
export default {
  name: "viewChartWsquare",
  extends: BaseView,
  props: {},
  watch: {
    detail:{
      handler(newValue,oldValue){
		  this.setOption(this.option);
		},
    deep:true
    },
  },
  data() {
    return {
      echart: null,
      num: 0.5,
      option: {
        series: [
          {
            type: "liquidFill",
            radius: "100%",
            center: ["50%", "50%"],
            shape: "container", // 修改形状
            // shape: shatpath,

            itemStyle: {
              shadowBlur: 2,
            },
            data: [0.5, 0.5, 0.5], // data个数代表波浪数
            amplitude: 10,
            animationDuration: 1000,
            animationDurationUpdate: 1000,
            animationDelay: 1000,
            backgroundStyle: {
              borderWidth: 0,
              color: "none",
            },
            // label: {
            //   position: ["38%", "40%"],
            //   formatter: (0.5 * 100).toFixed(1) + "%",
            //   fontSize: 40,
            //   color: "#D94854",
            // },
            label: {
              position: ['38%', '40%'],
              normal: {
                position: ["38%", "40%"],
                formatter: (0.5 * 100).toFixed(1) + "%",
                textStyle: {
                  fontSize: 16,
                },
              },
            },

            outline: {
              show: false,
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
      let view = this.$refs.ViewWs;
      this.echart = echarts.init(view);
      this.echart.setOption(option);
    },
    // onResize() {
    //   if (this.echart) {
    //     this.conductShape();
    //     this.setOption(this.option);
    //     this.echart.resize();
    //   }
    // },
    updateView() {
      this.setOption(this.option);
    },
    conductShape() {
      let w = this.detail.style.position.w;
      let h = this.detail.style.position.h;
      this.option.series[0].data = [this.num, this.num, this.num];
       this.option.series[0].label.normal.position = [
        "50%",
        (100 - this.num * 100).toFixed(1) + "%",
      ];
      this.option.series[0].label.normal.formatter =
        (this.num * 100).toFixed(1) + "%";
    },
  },
  mounted() {
    this.conductShape();
    this.setOption(this.option);
  },
};
</script>

<style lang="scss">
.view-chart-wsquare {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
