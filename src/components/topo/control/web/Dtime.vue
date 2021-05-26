<template>
  <div class="view-web-dtime">
    <template>
      <div
        :style="{
          fontSize: detail.style.fontSize + 'px',
          fontFamily: detail.style.fontFamily,
          color: detail.style.foreColor,
        }"
        class="pcstyle"
      >
      <div class="timesytle">{{currentTime}}</div>
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
      timer: "", //定义一个定时器的变量
      currentTime: '', // 获取当前时间
    };
  },
  created() {
     var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function () {
      _this.currentTime = //修改数据date
        new Date().getFullYear() +
        "-" +
        _this.appendZero((new Date().getMonth() + 1)) +
        "-" +
        _this.appendZero(new Date().getDate()) +
        " " +
        _this.appendZero( new Date().getHours()) +
        ":" +
        _this.appendZero( new Date().getMinutes())  +
        ": " +
        _this.appendZero( new Date().getSeconds()) ;
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    refreshData(val, sceneName) {},
    onResize() {},
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    },
  },
  mounted: function () {
   
    //   this.getTianQi()
  },
};
</script>
<style scoped>
.view-web-dtime {
  height: 100%;
  overflow: hidden;
}
.vblock {
  padding: 10px;
}

.timesytle {
  padding: 10px;
  text-align: center;
}

</style>