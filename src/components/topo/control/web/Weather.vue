<template>
  <div class="view-web-weather">
    <template>
      <div
        :style="{
          fontSize: detail.style.fontSize + 'px',
          fontFamily: detail.style.fontFamily,
          color: detail.style.foreColor,
        }"
        class="pcstyle"
      >
     
        <div id="weather-v2-plugin-standard"></div>
      </div>
      <!-- <div id="weater">
          {{City}}
      </div> -->
    </template>
  </div>
</template>
<script>
import BaseView from "../View";

export default {
  name: "BIWeather.vue",

  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
      default: {},
    },
  },
  computed: {},
  data() {
    return {
      value1: "",
      City: "北京",
    };
  },
  created() {
    window.WIDGET = {
    CONFIG : {
        layout: 1,
        width: 450,
        height: 150,
        background: 4,
        dataColor: "FFFFFF",
        backgroundColor: "3F8CEB",
        language: "zh",
        borderRadius: "5",
        key: "1WsfpTnndK",
      }
      };
   (function(d){
	var c = d.createElement('link');
	c.rel = 'stylesheet';
	c.href = 'https://apip.weatherdt.com/standard/static/js/weather-standard-common.js?v=2.0'
	var s = d.createElement('script');
	s.src = 'https://apip.weatherdt.com/standard/static/js/weather-standard-common.js?v=2.0'
	var sn =  d.getElementsByTagName('script')[0];
	sn.parentNode.insertBefore(c,sn)
	sn.parentNode.insertBefore(s,sn)
})(document)
    
    
  },

  methods: {
      refreshData(val, sceneName) {},
    onResize() {},
    // async getTianQi() {
    //   var result = await this.$axios
    //   .get(
    //     "http://wthrcdn.etouch.cn/weather_mini?city=" +this.City,{headers:{'Content-Type': 'application/json;charset=UTF-8'}}
    //   ).then(res =>{
    //         this.City = res.data.data.city;
    //         console.log(this.City);
    //   });
    //   console.log(result.data.data.forecast);
    //   this.City = result.data.data.forecast[0];
    //   console.log(this.City);
    // },
  },
  mounted: function () {
      
    //   this.getTianQi()
  },
};
</script>
<style scoped>
.view-web-weather {
  height: 100%;
  overflow: hidden;
}
.vblock {
  padding: 10px;
}

.tablediv {
  padding: 10px;
}
.table {
  width: 100%;
  margin: 10px 0 0;
}
.table,
.table td,
.table th {
  border: 1px solid #ccc;
  border-collapse: collapse;
  line-height: 30px;
  padding: 5px;
}
.demonstration {
  text-align: left;
  padding: 10px 10px 0px 20px;
  line-height: 30px;
  display: block;
  font-weight: 800;
}
</style>