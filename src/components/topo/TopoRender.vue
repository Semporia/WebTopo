<template>
  <div class="topo-render" :style="layerStyle" v-if="configData.layer">
    <template v-for="(component, index) in configData.components">
      <div
        class="topo-render-wrapper"
        :key="index"
        @click="doClickComponent(component)"
        @dblclick="doDbClickComponent(component)"
    
           :class="component.style.animate"
        v-show="
          component.style.visible == true ? true : component.style.visible.value
        "
        :style="{
          left: component.style.position.x + 'px',
          top: component.style.position.y + 'px',
          width: component.style.position.w + 'px',
          height: component.style.position.h + 'px',
          backgroundColor: component.style.backColor,
          zIndex: component.style.zIndex,
          borderWidth: component.style.borderWidth + 'px',
          borderStyle: component.style.borderStyle,
          borderColor: component.style.borderColor,
          'animation-duration': component.style.animationDuration,
          transform: component.style.transform
          
            ? `rotate(${component.style.transform}deg)`
            : 'rotate(0deg)',
        }"
      >
        <component
          v-bind:is="parseView(component)"
          :detail="component"
          ref="spirit"
        />
      </div>
    </template>
  </div>
</template>

<script>
import TopoBase from "./TopoBase";

import topoUtil from "./util/topo-util";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "TopoRender",
  extends: TopoBase,
  props: ["facilityData", "deviceList"],
  components: {},
  computed: {
    ...mapState({
      topoData: (state) => state.topoEditor.topoData,
    }),
    layerStyle: function () {
      var styles = [];
      if (this.configData.layer.backColor) {
        styles.push(`background-color: ${this.configData.layer.backColor}`);
      }
      if (this.configData.layer.backgroundImage) {
        styles.push(
          `background-image: url("${this.configData.layer.backgroundImage}")`
        );
      }
       if (this.configData.layer.width > 0) {
        styles.push(`width: ${this.configData.layer.width}px`);
      }
      if (this.configData.layer.height > 0) {
        styles.push(`height: ${this.configData.layer.height}px`);
      }
     
      var style = styles.join(";");
      return style;
    },
  },
  watch: {
    facilityData: function () {
      clearInterval(this.timer)
      this.$nextTick(function () {
        console.log(this.$refs);
        this.$refs.spirit.map((item) => {
          this.deviceList.map((itemD) => {
            if (
              item.detail.dataBind.queryParam.sensor_facility ==
              itemD.dev_cn_name
            ) {
              item.detail.dataBind.queryParam.devunit_name = itemD.devunit_name;
            }
          });
            
           this.facilityData.map((itemF) => {
            if (
              item.detail.dataBind.queryParam.devunit_name == itemF.devunit_name
              
            ) {
              itemF.data.map((itemdata) => {
                if (
                  itemdata.varId == item.detail.dataBind.queryParam.sensor_No
                ){
                   
                  this.timer = setInterval(() => {
                        // console.log(1+Math.random().toFixed(1)/10);
                     if(isNaN(itemdata.varValue) == false){
                        // console.log(parseInt(itemdata.varValue));
                       item.detail.style.text =  (parseInt(itemdata.varValue) * (1+Math.floor(Math.random()*10)/1000)).toFixed(2);
                     }
                  }, 1000);
                  // Math.ceil(Math.random()*10)
                }
              });
            }
          });
          this.configData.components.map((itemC) => {
            itemC = item.detail;
          });
      
          if(item.detail.type == 'buttom'){
            item.buttomdata.url = item.detail.style.text == true ? "statics/topo/svg/on1.svg" : "statics/topo/svg/off1.svg";
          }  
        });
       
        // localStorage.setItem('topoData',this.configData )
      });
    },
  },
  data() {
    return {
      configData: {},
      buttomdata: {
        isclick: true,
        identifier: "",
        url: "",
      },
      temp: "",
      devicedata: [],
      timer:''
    };
  },
  methods: {
    ...mapMutations("topoEditor", ["buttomupdata"]),
    parseView(component) {
      return topoUtil.parseViewName(component);
    },
    doClickComponent(component) {
      if (component.type == "buttom") {
        console.log("buttom");
        console.log(component);
        this.$refs.spirit.map((item) => {
          if (item.detail.name == component.name) {
            if(item.detail.style.text == undefined){
                this.$message.error('设备未绑定')
            }
          //  console.log( item.buttomdata.isclick);
           item.buttomdata.isclick =  item.buttomdata.isclick == true ? false : true;
          //  console.log( item.buttomdata.isclick);
            item.buttomdata.url = item.buttomdata.isclick == true ? "statics/topo/svg/on1.svg" : "statics/topo/svg/off1.svg";
            // console.log(item.buttomdata.url );
          }
        });

        localStorage.getItem("topoData", this.configData);
        // this.buttomupdata(this.buttomdata)
        // this.buttomdata.isclick = !(component.style.text)
      }
      for (var i = 0; i < component.action.length; i++) {
        var action = component.action[i];
        if (action.type == "click") {
          this.handleComponentActuib(action);
          // console.log("click");
        }
      }
    },
    doDbClickComponent(component) {
      for (var i = 0; i < component.action.length; i++) {
        var action = component.action[i];
        if (action.type == "dblclick") {
          this.handleComponentActuib(action);
        }
      }
    },
    //显示隐藏
    handleComponentActuib(action) {
      var _this = this;
      if (action.action == "visible") {
        if (action.showItems.length > 0) {
          action.showItems.forEach((identifier) => {
            _this.showComponent(identifier, true);
          });
        }
        if (action.hideItems.length > 0) {
          action.hideItems.forEach((identifier) => {
            _this.showComponent(identifier, false);
          });
        }
      } else if (action.action == "Invisible") {
        _this.sendFun(action);
      }
    },
    showComponent(identifier, visible) {
      // console.log("show:" + identifier + ",visible:" + visible);
      var spirits = this.$refs["spirit"];
      for (var i = 0; i < spirits.length; i++) {
        var spirit = spirits[i];
        if (spirit.detail.identifier == identifier) {
          spirit.detail.style.visible = visible;
          break;
        }
      }
    },
     
  },
  mounted() {
    //这里只是纯前端项目，实际应该从后台拿取数据
   
   
    this.configData = JSON.parse(localStorage.getItem("topoData"));
    console.log(this.configData);
  },
};
</script>

<style lang="scss">
.topo-render {
  overflow: auto;
  background-color: white;
  background-clip: padding-box;
  background-origin: padding-box;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  height: 100%;
  overflow: hidden;

  .topo-render-wrapper {
    position: absolute;
  }

  .topo-render-wrapper-clickable {
    cursor: pointer;
  }
 
}
</style>

