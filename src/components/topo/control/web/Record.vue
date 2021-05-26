<template>
  <div class="view-web-record">
    <template>
      <div
        :style="{
          fontSize: detail.style.fontSize + 'px',
          fontFamily: detail.style.fontFamily,
          color: detail.style.foreColor,
          textAlign: textAlign,
        }"
        class="pcstyle"
      >
   
       <span class="demonstration">预警数据</span>
      <div class="vblock">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        
      </div>
      <el-button type="primary">搜索</el-button>
      <div>
        <div class="tablediv">
           <table border="0" class="table" cellpadding="0" cellspacing="0">
            <tr><th>日期</th><th>传感器</th><th>值</th></tr>
            <tr><td>2020.01.01</td><td>压力表</td><td>0002</td></tr>
            <tr><td>2020.01.01</td><td>压力表</td><td>0002</td></tr>
            <tr><td>2020.01.01</td><td>压力表</td><td>0002</td></tr>
            <tr><td>2020.01.01</td><td>压力表</td><td>0002</td></tr>
             
         </table>
        </div>
        
      </div>
        
      </div>
    </template>
  </div>
</template>
<script>
import BaseView from "../View";
export default {
  name: "BaseView",

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
  computed: {
    textAlign: function () {
      if (this.detail.style.textAlign == undefined) {
        return "center";
      } else {
        return this.detail.style.textAlign;
      }
    },
    lineHeight: function () {
      if (this.detail.style.lineHeight == undefined) {
        return this.detail.style.position.h;
      }
      return this.detail.style.lineHeight;
    },
  },
  data() {
    return {
     
      value1: "",
    
    };
  },
  methods: {
    refreshData(val, sceneName) {},
    onResize() {},
  },
  mounted: function () {},
};
</script>
<style scoped>
.view-web-record {
  height: 100%;
  overflow: hidden;
}
.vblock{ padding: 10px;}

.tablediv{ padding: 10px;}
.table{ width: 100%; margin: 10px 0 0;}
.table,.table td , .table th{ border: 1px solid #ccc; border-collapse: collapse; line-height: 30px; padding: 5px;}
.demonstration{text-align: left; padding: 10px 10px 0px 20px; line-height: 30px; display: block;font-weight: 800;}

</style>