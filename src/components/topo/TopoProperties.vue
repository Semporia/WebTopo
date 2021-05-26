<template>
  <div class="topo-properties">
    <div class="topo-properties-nav">
      <!-- <q-select v-model="curComponent" :options="componentOptions" @input="changeComponent" style="margin-right:0px;height:43px;border:none;" /> -->
      <template v-if="isLayer">
        <!-- <q-input v-model="topoData.name" @change="changetopoData" /> -->
        <q-select
          v-model="topoDataname"
          :options="configObjectName"
          label="项目"
          @input="changetopoData"
        />
      </template>
      <!-- <template v-if="configObject != null && isLayer == false">
        <q-select v-model="configObject.name" :options="configObjectName" label="Standard" />
       
      </template> -->
    </div>
    <template v-if="configObject != null && isLayer == false">
      <div class="topo-properties-tabs">
        <div
          class="topo-properties-tab"
          @click="changeTab(0)"
          :class="{ 'topo-properties-tab-active': tabIndex == 0 }"
        >
          样式
        </div>
        <div
          class="topo-properties-tab"
          @click="changeTab(1)"
          :class="{ 'topo-properties-tab-active': tabIndex == 1 }"
        >
          数据
        </div>
        <div
          class="topo-properties-tab"
          @click="changeTab(2)"
          :class="{ 'topo-properties-tab-active': tabIndex == 2 }"
        >
          行为
        </div>
      </div>
      <div class="topo-properties-table">
        <div v-show="tabIndex == 0">
          <table style="display: none">
            <tr>
              <td width="50%" style="padding: 5px 0px; background-color: #eee">
                属性
              </td>
              <td width="50%" style="padding: 5px 0px; background-color: #eee">
                值
              </td>
            </tr>
          </table>
          <q-list separator no-border>
            <q-expansion-item label="定位" default-opened>
              <table>
                <!-- <tr>
                  <td width="50%">X轴</td>
                  <td width="50%">
                    <q-input
                      type="number"
                      suffix="像素"
                      v-model.lazy="configObject.style.position.x"
                      style="padding-right: 5px"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Y轴</td>
                  <td>
                    <q-input
                      type="number"
                      suffix="像素"
                      v-model.lazy="configObject.style.position.y"
                      style="padding-right: 5px"
                    />
                  </td>
                </tr> -->
                <tr>
                  <td width="50%">宽</td>
                  <td>
                    <q-input
                      type="number"
                      suffix="像素"
                      v-model.lazy="configObject.style.position.w"
                      style="padding-right: 5px"
                    />
                  </td>
                </tr>
                <tr>
                  <td>高</td>
                  <td>
                    <q-input
                      type="number"
                      suffix="像素"
                      v-model.lazy="configObject.style.position.h"
                      style="padding-right: 5px"
                    />
                  </td>
                </tr>
              </table>
            </q-expansion-item>

            <q-expansion-item label="边线" default-opened>
              <table>
                <tr>
                  <td width="50%">边线宽</td>
                  <td width="50%">
                    <q-input
                      type="number"
                      suffix="像素"
                      style="padding-right: 5px"
                      v-model.lazy="configObject.style.borderWidth"
                    />
                  </td>
                </tr>
                <tr>
                  <td>边线样式</td>
                  <td>
                    <q-select
                      v-model="configObjectstyleborderStyle"
                      :options="borderStyleOptions"
                    />
                  </td>
                </tr>
                <tr>
                  <td :style = "{'background':configObject.style.borderColor}">边线颜色</td>
                  <td>
                    <q-input
                      filled
                      v-model="configObject.style.borderColor"
                      class="my-input"
                    >
                      <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-color v-model="configObject.style.borderColor" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </td>
                </tr>
              </table>
            </q-expansion-item>
            <q-expansion-item label="基础" default-opened>
              <table>
                <!-- <tr>
                  <td width="50%">可见</td>
                  <td width="50%">
                    <q-select
                      v-model="configObject.style.visible"
                      :options="[
                        { label: '显示', value: true },
                        { label: '隐藏', value: false },
                      ]"
                    />
                  </td>
                </tr> -->
                <tr>
                  <td width="50%">层级</td>
                  <td>
                    <q-input
                      type="number"
                      v-model.lazy="configObject.style.zIndex"
                    />
                  </td>
                </tr>
                <tr>
                  <td>角度</td>
                  <td>
                    <q-input
                      type="number"
                      v-model.lazy="configObject.style.transform"
                      suffix="度"
                      style="padding-right: 5px"
                    />
                  </td>
                </tr>
                <!-- <tr>
                  <td>元素背景色</td>
                  <td  :style = "{'background':configObject.style.backColor}">
                    <q-input
                      filled
                      v-model="configObject.style.backColor"
                     
                      class="my-input"
                    >
                      <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-color v-model="configObject.style.backColor" format-model="rgba"  />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </td>
                </tr> -->
                <tr
                  v-if="
                    configObject.style.url != undefined &&
                    configObject.style.url != null
                  "
                >
                  <td>图片连接地址</td>
                  <td>
                    <q-input v-model.lazy="configObject.style.url" />
                  </td>
                </tr>
                <tr v-if="configObject.style.text != undefined">
                  <td>文字</td>
                  <td>
                    <q-input v-model.lazy="configObject.style.text" />
                  </td>
                </tr>
                <tr v-if="configObject.style.textAlign != undefined">
                  <td>对齐</td>
                  <td>
                    <q-select
                      v-model="configObject.style.textAlign"
                      :options="textAlignOptions"
                    />
                  </td>
                </tr>
                <tr>
                  <td>颜色</td>
                  <td :style = "{'background':configObject.style.foreColor}">
                    <q-input
                      filled
                      v-model="configObject.style.foreColor"
                      class="my-input"
                    >
                      <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                          <q-popup-proxy
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-color v-model="configObject.style.foreColor" format-model="rgba"  />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>


                    


                  </td>
                </tr>
                <tr v-if="configObject.style.fontFamily != undefined">
                  <td>字体</td>
                  <td>
                    <q-select
                      v-model="configObject.style.fontFamily"
                      :options="fontFamilyOptions"
                    />
                  </td>
                </tr>
                <tr v-if="configObject.style.fontSize != undefined">
                  <td>字体大小</td>
                  <td>
                    <q-input
                      type="number"
                      suffix="像素"
                      style="padding-right: 5px"
                      v-model.lazy="configObject.style.fontSize"
                    />
                  </td>
                </tr>
                <tr v-if="configObject.style.radius != undefined">
                  <td>圆角</td>
                  <td>
                    <q-input
                      type="number"
                      v-model.lazy="configObject.style.radius"
                    />
                  </td>
                </tr>
                <tr v-if="configObject.style.lineWidth != undefined">
                  <td>线宽</td>
                  <td>
                    <q-input
                      type="number"
                      suffix="像素"
                      style="padding-right: 5px"
                      v-model.lazy="configObject.style.lineWidth"
                    />
                  </td>
                </tr>
              </table>
            </q-expansion-item>
          </q-list>
        </div>
        <div v-show="tabIndex == 1">
          <div class="not-surpport">
            <h5>传感器绑定</h5>
            <div>
              <FacilityBind :factype = "factype" :topo-dataname='topoDataname' v-if="factype"></FacilityBind>
            </div>

            <!-- <q-select
              :value="valOputions"
              @input="chengeval"
              :options="axiosUrlStyleOptions"
            /> -->
          </div>
        </div>
        <div v-show="tabIndex == 2">
          <template v-if="configObject && configObject.action">
            <template v-for="(event, index) in configObject.action">
              <div :key="index" style="margin-top: 10px">
                <div
                  style="
                    padding: 5px;
                    border-left: #ccc solid 1px;
                    border-right: #ccc solid 1px;
                    border-top: #ccc solid 1px;
                  "
                >
                  交互-{{ index + 1 }}
                  <q-icon
                    name="delete"
                    color="negative"
                    style="float: right; cursor: pointer"
                    @click.native="removeAction(index)"
                  />
                </div>
                <table>
                  <tr>
                    <td width="50%">事件</td>
                    <td width="50%">
                      <q-select
                        emit-value
                        map-options
                        option-label="label"
                        v-model="event.type"
                        :option-disable="
                          (item) => (item === null ? true : item.cannotSelect)
                        "
                        :options="[
                          { label: '点击', value: 'click' },
                          { label: '双击', value: 'dblclick' },
                          {
                            label: '鼠标移入',
                            value: 'mouseenter',
                            cannotSelect: true,
                          },
                          {
                            label: '鼠标双击',
                            value: 'mouseleave',
                            cannotSelect: true,
                          },
                        ]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>动作</td>
                    <td>
                      <q-select
                        emit-value
                        map-options
                        option-label="label"
                        v-model="event.action"
                        :option-disable="
                          (item) => (item === null ? true : item.cannotSelect)
                        "
                        :options="[
                          {
                            label: '打开链接',
                            value: 'link',
                            cannotSelect: true,
                          },
                          {
                            label: '赋值变量',
                            value: 'val',
                            cannotSelect: true,
                          },
                          { label: '展示隐藏', value: 'visible' },
                          {
                            label: '调用服务',
                            value: 'service',
                            cannotSelect: true,
                          },
                        ]"
                      />
                    </td>
                  </tr>

                  <tr v-if="event.action == 'visible'">
                    <td>点击出现</td>
                    <td>
                      <q-select
                        filled
                        emit-value
                        multiple
                        use-chips
                        map-options
                        option-label="label"
                        v-model="event.showItems"
                        :options="generateTargetComponentOptions()"
                      />
                    </td>
                  </tr>
                  <tr v-if="event.action == 'visible'">
                    <td>点击隐藏</td>
                    <td>
                      <q-select
                        filled
                        emit-value
                        multiple
                        use-chips
                        map-options
                        option-label="label"
                        v-model="event.hideItems"
                        :options="generateTargetComponentOptions()"
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </template>
            <div style="width: 100%; padding: 10px 10px 10px 10px">
              <!-- <q-btn
                label="Add"
                outline
                @click="addAction"
                style="width: 100%"
              /> -->
              <div>
                <Anima @addAnima = "addAnima"  @tooltip = 'tooltip'   :anTooltip = configObject.style.animationDuration></Anima>
              </div>
            </div>
            
          </template>
        </div>
      </div>
    </template>
    <template v-if="isLayer">
      <table style="margin-top: 10px">
        <tr>
          <td width="40%">背景色</td>
          <td :style = "{'background':topoData.layer.backColor}">
            <q-input filled v-model="topoData.layer.backColor" class="my-input">
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="topoData.layer.backColor" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <!-- <q-input v-model.lazy="topoData.layer.backColor" /> -->
          </td>
        </tr>
        <tr>
          <td>背景图片</td>
          <td>
            <q-input v-model.lazy="topoData.layer.backgroundImage" />
          </td>
        </tr>
        <tr>
          <td>分辨率</td>
          <td>
            <q-select v-model="layerWH" :options="whOptions" />
          </td>
        </tr>

        <tr v-if="layerWH == 'custom'">
          <td>宽（%）</td>
          <td>
            <q-input v-model.lazy="topoData.layer.width" />
          </td>
        </tr>
        <tr v-if="layerWH == 'custom'">
          <td>高（%）</td>
          <td>
            <q-input v-model.lazy="topoData.layer.height" />
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import FacilityBind from './FacilityBind'
import Anima from './anima'
export default {
  name: "TopoProperties",
  components:{
    FacilityBind,
    Anima
  },
  data() {
    return {
      tabIndex: 0,
      fontFamilyOptions: [
        "Arial",
        "Helvetica",
        "sans-serif",
        "宋体",
        "黑体",
        "微软雅黑",
      ],
      textAlignOptions: ["left", "right", "center", "justify"],
      configObjectstyleborderStyle:'',
      borderStyleOptions: ["实线", "虚线", "点线"],
      borderStyleOptionsTransform:{
        solid:'实线',
        dashed:'虚线',
        dotted:'点线',
      },
      
      axiosUrlStyleOptions: ["固定数据", "服务器数据", "http3"],
      whOptions: [
        "1024x768",
        "1366x768",
        "1280x800",
        "1440x900",
        "1600x900",
        "1920x1080",
        "custom",
      ],
      layerWHTemp: "",
      valOputions: "",
      position: {
        dataLine: [1130, 50, 100, 500, 600, 300, 100],
        xdata: [10, 20, 30, 60, 50, 30],
      },
      topoDataname: "",
      configObjectName: [],
      factype : '', //传感器类型
    };
  },
  computed: {
    layerWH: {
      get: function () {
        if (!this.topoData.layer.width || !this.topoData.layer.height) {
          this.topoData.layer.width = 1600;
          this.topoData.layer.height = 900;
        }
         console.log('this.layerWHTemp'+this.layerWHTemp);
        if (this.layerWHTemp == "") {
          var wh = this.topoData.layer.width + "x" + this.topoData.layer.height;
          if (this.whOptions.indexOf(wh, 0) == -1) {
            this.layerWHTemp = "custom";
          } else {
            this.layerWHTemp = wh;
          }
        }else {
          var wh = this.topoData.layer.width + "x" + this.topoData.layer.height;
          if (this.whOptions.indexOf(wh, 0) == -1) {
            this.layerWHTemp = "custom";
          }
        }
        return this.layerWHTemp;
      },
      set: function (val) {
        console.log(val);
        console.log(this);
        this.layerWHTemp = val;
        if (val == "custom") {
        } else {
          var wh = val.split("x");
          this.topoData.layer.width = parseInt(wh[0]);
          this.topoData.layer.height = parseInt(wh[1]);
        }
      },
    },

    ...mapState({
      topoDatademo: (state) => state.topoEditor.selectedComponentMapdemo,
      topoData: (state) => state.topoEditor.topoData,
      selectedComponents: (state) => state.topoEditor.selectedComponents,
      selectedComponentMap: (state) => state.topoEditor.selectedComponentMap,
      isLayer: (state) => state.topoEditor.selectedIsLayer,
      configObject: (state) => state.topoEditor.selectedComponent,
      Projectnametlist: (state) => state.example.Projectnametlist,
    }),
  },
  watch: {
    topoData: function () {
      console.log(this.topoData);
      this.topoDataname = this.topoData.name;
    },
      configObject: function () {
      // console.log(this.configObject.type);
      if(this.configObject){
        //  console.log('this.configObject.style.borderStyle',this.configObject.style.borderStyle);
          this.configObjectstyleborderStyle = this.borderStyleOptionsTransform[this.configObject.style.borderStyle]
        this.factype = this.configObject
      }
      
    },
    'configObject.style.radius': function(){
      if(this.configObject != null){
          let h = this.configObject.style.position.h/2
        let w = this.configObject.style.position.w/2
        let r = this.configObject.style.radius
        if( r >= w || r >= h){
           this.configObject.style.radius = w > h ? h : w
        }
      }
    },
    Projectnametlist: function () {
      this.configObjectName = this.Projectnametlist;
    },
    configObjectstyleborderStyle: function(){
      
      this.configObject.style.borderStyle = Object.getOwnPropertyNames(this.borderStyleOptionsTransform)[this.borderStyleOptions.indexOf(this.configObjectstyleborderStyle)]
    }
  },
  methods: {
    ...mapMutations("topoEditor", [
      "setdemo",
      "setSelectedComponent",
      "gettopoEditor",
    ]),
    ...mapMutations("example", ["getProjectnametlist"]),

    async chengeval(e) {
      this.valOputions = e;
      //刷新所有组件
      for (var key in this.selectedComponentMap) {
        var component = this.selectedComponentMap[key];
      }
      component.position.xdata = [];
      component.position.dataLine = [];

      if (this.valOputions === "固定数据") {
        component.position = this.position;
      } else if (this.valOputions === "服务器数据") {
        let params = {
          devunit_name: "donghai_6_2",
          var_name: "功率",
        };
        let self = this;
        await this.$axios
          .post("/api/gateway/minute1/list", params)
          .then(function (res) {
            component.position.xdata = res.data.extra.timeList;
            component.position.dataLine = res.data.extra.dataList;
          });
      }
      this.setSelectedComponent(component);

      this.setdemo(false);
      this.$nextTick(function () {
        this.setdemo(true);
      });
    },
    initPage(configData) {
      this.configData = configData;
    },
    changeTab(tabIndex) {
      this.tabIndex = tabIndex;
    },
    bindData(configObject, index, isLayer) {
      console.log("bindData");
      this.configObject = configObject;
      this.isLayer = isLayer;
      if (isLayer === false) {
      }
    },
    // 隐藏
    generateTargetComponentOptions() {
      var options = [];
      this.topoData.components.forEach((component) => {
        if (this.configObject.identifier != component.identifier) {
          options.push({
            label: component.name || component.type,
            value: component.identifier,
          });
        }
      });

      return options;
    },
    removeAction(index) {
      this.configObject.action.splice(index, 1);
    },
    addAction() {
      var action = {
        type: "click",
        action: "visible",
        showItems: [],
        hideItems: [],
      };
     
      this.configObject.action.push(action);
    },
    // 载入动画
     addAnima(name){
        this.configObject.style.animate = 'animated '+ name[0] +' '+name[1]
      },
     tooltip(val){
        this.configObject.style.animationDuration = val+'s'
     
     },
    changetopoData() {
      console.log(this.topoData);
      this.topoData.name = this.topoDataname;
      localStorage.setItem("topoData", JSON.stringify(this.topoData));
      this.gettopoEditor(this.topoData);
    },
    // 获取项目名称
    async list_pct_name(){
        await this.$axios.post('/api/admin/list',{
        user_account : localStorage.getItem('user_account')
      }).then(res=>{
        if(res.data.ret_code == 0){
          this.topoDataname = this.topoData.name
          this.configObjectName = res.data.extra[0].user_projects
          this.getProjectnametlist(this.configObjectName)
        }
      })
    }
  },
  mounted() {
   
    
    
    this.configObjectName = this.Projectnametlist;
    if (!this.$route.query.id) {
      this.topoDataname = "图层";
    }
  },
};
</script>

<style lang="scss">
.topo-properties {
  border: #ccc solid 1px;
  background-color: white;
  height: 100%;

  .topo-properties-tabs {
    height: 35px;
    display: flex;
    border-bottom: #ccc solid 1px;
    background-color: white;

    .topo-properties-tab {
      height: 35px;
      text-align: center;
      line-height: 35px;
      flex: 1;
      color: #666;
    }

    .topo-properties-tab + .topo-properties-tab {
      border-left: #ccc solid 1px;
    }

    .topo-properties-tab:hover {
      cursor: pointer;
    }

    .topo-properties-tab-active {
      color: #000;
      border-bottom: #3388ff solid 2px;
      font-weight: bold;
    }
  }

  .topo-properties-table {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 92px);

    table {
      width: 100%;
      border-collapse: collapse;

      td {
        text-align: center;
        padding: 0px;
        border: #ccc solid 1px;
      }

      .q-input {
        border: none;
      }

      .q-select {
        border: none;
        margin-right: 0px;
      }
    }
  }

  .not-surpport {
    margin: 20px auto;
    text-align: center;
  }
}
</style>
