<template>
  <div class="view-chart" ref="chartView">Click to bind data.</div>
</template>

<script>
import echarts from "echarts";
import BaseView from "../View";

export default {
  name: "ViewChart",
  extends: BaseView,
  props: {},
  watch: {
    detail: function (newVal) {
      console.log(this.detail);
       console.log('this.detail===============');
      console.log(this.detail.position.dataLine)
      this.setOption(this.option);
    },
   
  },
  data() {
    return {
      echart: null,
      detaLine:'',
      dataStepLine: [100, 0, 100, 100, 0, 0, 100],
      detaLinev: [820, 932, 901, 934, 1290, 1330, 1320],
      xdata : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      option: {
        xAxis: {
          type: "category",
          data: this.xdata,
          silent: true,
        },
        yAxis: {
          type: "value",
          silent: true,
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            clickable: false,
            type: "line",
            smooth: true,
          },
        ],
      },
    };
  },
  created:function(){
    
     if(this.detail.position.dataLine.length !== 0){
       console.log('1')
      this.detaLinev = this.detail.position.dataLine
      this.xdatav = this.detail.position.xdata
    }else{
    }
  },
  methods: {
    setOption(option) {
       console.log(this.detaLinev)
      if (this.echart) {
        this.echart.dispose();
      }
      if (this.detail.type === "chart-line") {
          console.log(this.detail)
        console.log(this.detail.type);
        this.option.series[0].type = "line";
        this.option.xAxis.data = this.xdatav;
        this.option.series[0].data = this.detaLinev;
        delete this.option.series[0]["step"];
        this.option.series[0]["smooth"] = true;
      } else if (this.detail.type == "chart-line-step") {
        this.option.series[0].type = "line";
        this.option.series[0].data = this.dataStepLine;
        this.option.series[0].step = "start";
        delete this.option.series[0]["smooth"];
      } else if (this.detail.type == "chart-bar") {
        this.option.series[0].type = "bar";
         this.option.xAxis.data = this.xdatav;
        this.option.series[0].data = this.detaLinev;
        console.log( this.option.series[0])
        delete this.option.series[0]["step"];
      }
      let view = this.$refs.chartView;
      this.echart = echarts.init(view);
      this.echart.setOption(option);
    },
    onResize() {
      if (this.echart) {
        this.echart.resize();
      }
    },
    updateView() {
      this.setOption(this.option);
    },
  },
  mounted() {
      console.log(this.detail.position.dataLine)
       console.log(' console.log(this.detail)')

    this.$nextTick(function () {
      this.setOption(this.option);
    });
  },
};
</script>

<style lang="scss">
.view-chart {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
