<template>
  <div class="topo-main q-pa-md q-gutter-sm">
    <vue-ruler-tool
      :parent="true"
      :is-scale-revise="true"
      style="width: 100%; height: calc(100% - 40px)"
    >

      <div
       class="topo-layer "  
        tabindex="0"
       :class="{ 'topo-layer-view-selected': selectedIsLayer}" id="surface-edit-layer"
         @click="onLayerClick($event)"
         :style="layerStyle"
        @dragover.prevent
        @drop="onDrop"
        @mouseup="onLayerMouseup($event)"
        @mousemove="onLayerMousemove($event)"
        @mousedown="onLayerMousedown($event)"
        @keyup.delete="removeItem()"
        @keydown.ctrl.67.stop="copyItem"
        @keydown.ctrl.86.stop="pasteItem"
        @keydown.ctrl.90.stop="undo"
        @keydown.ctrl.89.stop="redo"
      >
       <!-- :class="{
              'topo-layer-view-selected':selectedComponentMap[component.identifier] == undefined
                  ? false
                  : true
            }
            " -->
        <template v-for="(component, index) in configData.components">
          <div
            :key="component.identifier"
            tabindex="0"
            class="topo-layer-view"
           :class="component.style.animate"
           
            @click.stop="clickComponent(index, component, $event)"
            @mousedown.stop="controlMousedown(component, $event, index)"
            @keyup.delete="removeItem()"
            @keydown.up.exact.prevent="moveItems('up')"
            @keydown.right.exact.prevent="moveItems('right')"
            @keydown.down.exact.prevent="moveItems('down')"
            @keydown.left.exact.prevent="moveItems('left')"
            @keydown.ctrl.67.stop="copyItem"
            @keydown.ctrl.86.stop="pasteItem"
            @keydown.ctrl.90.stop="undo"
            @keydown.ctrl.89.stop="redo"
            :style="{
              left: component.style.position.x + 'px',
              top: component.style.position.y + 'px',
              width: component.style.position.w + 'px',
              height: component.style.position.h + 'px',
              'background-color': component.style.backColor,
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
              v-if="topoDatademo"
              v-bind:is="parseView(component)"
              :detail="component"
              :editMode="true"
              :selected="
                selectedComponentMap[component.identifier] ? true : false
              "
              :ref="'comp' + index"
            />
            <div
              @mousedown.stop="
                resizeMousedown(component, $event, index, 'resize-lt')
              "
              v-show="selectedComponentMap[component.identifier]"
              class="resize-left-top"
            ></div>
            <div
              @mousedown.stop="
                resizeMousedown(component, $event, index, 'resize-lc')
              "
              v-show="selectedComponentMap[component.identifier]"
              class="resize-left-center"
            ></div>
            <div
              @mousedown.stop="
                resizeMousedown(component, $event, index, 'resize-lb')
              "
              v-show="selectedComponentMap[component.identifier]"
              class="resize-left-bottom"
            ></div>
            <div
              @mousedown.stop="
                resizeMousedown(component, $event, index, 'resize-rt')
              "
              v-show="selectedComponentMap[component.identifier]"
              class="resize-right-top"
            ></div>
            <div
              @mousedown.stop="
                resizeMousedown(component, $event, index, 'resize-rc')
              "
              v-show="selectedComponentMap[component.identifier]"
              class="resize-right-center"
            ></div>
            <div
              @mousedown.stop="
                resizeMousedown(component, $event, index, 'resize-rb')
              "
              v-show="selectedComponentMap[component.identifier]"
              class="resize-right-bottom"
            ></div>
            <div
              @mousedown.stop="
                resizeMousedown(component, $event, index, 'resize-ct')
              "
              v-show="selectedComponentMap[component.identifier]"
              class="resize-center-top"
            ></div>
            <div
              @mousedown.stop="
                resizeMousedown(component, $event, index, 'resize-cb')
              "
              v-show="selectedComponentMap[component.identifier]"
              class="resize-center-bottom"
            ></div>
          </div>
        </template>
        <div
          class="topo-frame-selection"
          :style="{
            width: frameSelectionDiv.width + 'px',
            height: frameSelectionDiv.height + 'px',
            top: frameSelectionDiv.top + 'px',
            left: frameSelectionDiv.left + 'px',
          }"
        ></div>
      </div>
    </vue-ruler-tool>
    <div
      style="
        height: 40px;
        border-top: #ccc solid 1px;
        position: relative;
        background-color: white;
      "
    >
      <div style="position: absolute; left: 0px; top: 0px" class="row">
        <div style="line-height: 40px; height: 40px">
          已选组件个数：{{ selectedComponents.length }}
        </div>
        <q-btn
          label="预览"
          color="primary"
          size="xs"
          style="margin-left: 100px; height: 30px; margin-top: 5px"
          @click="fullScreen"
        />

        <q-btn
          label="清空"
          color="primary"
          size="xs"
          style="margin-left: 100px; height: 30px; margin-top: 5px"
          @click="printData"
        />
        <q-btn
          label="保存数据"
          color="primary"
          size="xs"
          style="margin-left: 100px; height: 30px; margin-top: 5px"
          @click="showdialog"
        />
        <!-- <q-btn
          label="获取之前数据"
          color="primary"
          size="xs"
          style="margin-left:100px;height:30px;margin-top:5px;"
          @click="getDataClick"
        /> -->
        <q-btn
          label="首页"
          color="primary"
          size="xs"
          style="margin-left: 100px; height: 30px; margin-top: 5px"
          @click="ToHome"
        />
      </div>
      <div style="position: absolute; right: 10px; top: 0px" class="row">
        <div style="line-height: 40px; height: 40px; padding: 0px 5px">
          缩放
        </div>
        <q-slider
          v-model="selectedValue"
          :min="30"
          :max="200"
          :step="1"
          label
          :label-value="`${selectedValue}%`"
          snap
          style="width: 200px"
        />
      </div>
    </div>

    <el-dialog title="添加项目" :visible.sync="alert_two" width="30%">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
          <Pctup
            v-if="isid"
            :dargjsondata="dargjsondata"
            :showname="showname"
         
            :componentadata="componentadata"
            @saveData="saveData"
            :Projectnametlist="Projectnametlist"
          ></Pctup>
          <Pctupid
            v-if="!isid"
            :dargjsondata="dargjsondata"
            :showname="showname"
         
            :componentadata="componentadata"
            @saveData="saveData"
            :Projectnametlist="Projectnametlist"
          ></Pctupid>
          <!-- <Pctupquasar :dargjsondata="dargjsondata" :projectname="projectname" :componentadata='componentadata' @saveData ='saveData'></Pctupquasar> -->
        </el-col>
      </el-row>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="alert_two = false">取 消</el-button>
        <el-button type="primary" @click="saveData">确 定</el-button>
      </span> -->
    </el-dialog>

    <el-dialog
      title="项目展示"
      :visible.sync="alert"
      width="50%"
      class="dialogcss"
    >
      <template>
        <Topotable
          :componentdata="componentdata"
          :totalnum="totalnum"
          @delClick="delClick"
          @getData="getData"
          @handleClick="handleClick"
        ></Topotable>
      </template>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pctclosedialog">关闭</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import VueRulerTool from "./ruler";
import TopoBase from "./TopoBase";
import uid from "../../assets/libs/uid.js";

import topoUtil from "./util/topo-util";
import { deepCopy } from "../../assets/libs/utils";
import Topotable from "./Topotable";

import {
  checkInRange,
  checkByPointInRect,
  checkByRectCollisionDetection,
} from "../../assets/libs/topo";

import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import axios from "axios";
import Pctup from "./pctup";
import Pctupid from "./pctupid";
import Pctupquasar from "./pctupquasar";

export default {
  name: "TopoMain",
  extends: TopoBase,
  components: {
    VueRulerTool,
    Topotable,
    Pctup,
    Pctupid,
    Pctupquasar,
  },

  computed: {
    ...mapState({
      topoEditor: (state) => state.topoEditor.topoData,
      topoData: (state) => state.topoEditor.topoData,
      topoDatademo: (state) => state.topoEditor.selectedComponentMapdemo,
      selectedComponents: (state) => state.topoEditor.selectedComponents,
      selectedComponentMap: (state) => state.topoEditor.selectedComponentMap,
      configData: (state) => state.topoEditor.topoData,
      selectedIsLayer: (state) => state.topoEditor.selectedIsLayer,
      copySrcItems: (state) => state.topoEditor.copySrcItems,
      copyCount: (state) => state.topoEditor.copyCount,
      userAccount: (state) => state.example.userAccount,
      Projectnametlist: (state) => state.example.Projectnametlist,
    }),
    layerStyle: function () {
      var scale = this.selectedValue / 100;
      var styles = [`transform:scale(${scale})`];
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
  data() {
    return {
      alert_two: false,
      alert: false,
      isname: true,
      moveItem: {
        startX: 0,
        startY: 0,
      }, //移动组件 相关变量
      resizeItem: {
        startPx: 0,
        startPy: 0,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      }, //resize组件 相关变量
      frameSelectionDiv: {
        width: 0,
        height: 0,
        top: 10,
        left: 10,
        startX: 0,
        startY: 0,
        startPageX: 0,
        startPageY: 0,
      },
      flag: "", //当前操作标志位
      curControl: null,
      curIndex: -1,
      selectedValue: 100,
      index: "",
      dataLine: [],
      columns: [{}],
      componentdata: [],
      showname: [], //展示用户

      projectname: "",
      page_size: 10,
      current_page: 1,
      totalnum: 0,
      dargjsondata: "",
      componentadata: "", //单个数据
      isid: true,
    };
  },
  watch: {
        'configData': function(newVal){
            // console.log('边了');
        },
          
      },
  methods: {
    ...mapMutations("topoEditor", [
      "setSelectedComponent",
      "addSelectedComponent",
      "removeSelectedComponent",
      "clearSelectedComponent",
      "setLayerSelected",
      "setCopySrcItems",
      "increaseCopyCount",
      "setdemo",
      "execute",
      "undo",
      "redo",
      "gettopoEditor",
      'gettopoDataname'
    ]),
    ...mapActions("topoEditor", ["loadDefaultTopoData"]),
    controlMousedown(component, event, index) {
   
      // console.log("index=====" + index); // 用户设置属性值
      this.index = index;
      // console.log(this.selectedComponentMap);
      if (event.ctrlKey) {
        return;
      }
      this.flag = "move";
      this.curControl = component;
      this.clickItem(component, index);
      this.moveItem.startX = event.pageX;
      this.moveItem.startY = event.pageY;
      //记录初始信息--move
      for (var key in this.selectedComponentMap) {
        var component = this.selectedComponentMap[key];
        component.style.temp = {};
        component.style.temp.position = {};
        component.style.temp.position.x = component.style.position.x;
        component.style.temp.position.y = component.style.position.y;
      }
    },
    resizeMousedown(component, $event, index, flag) {
      //resize-鼠标按下事件
      this.flag = flag;
      this.curControl = component;
      this.curIndex = index;
      this.clickItem(component, index);
      var dom = event.currentTarget;
      this.resizeItem.startPx = event.pageX;
      this.resizeItem.startPy = event.pageY;
      //记录初始信息-resize
      this.resizeItem.x = this.curControl.style.position.x;
      this.resizeItem.y = this.curControl.style.position.y;
      this.resizeItem.w = this.curControl.style.position.w;
      this.resizeItem.h = this.curControl.style.position.h;
    },
    onLayerMousemove(event) {
      if (event.which != 1) {
        this.flag = "";
        return;
      }
      if (this.flag == "") return;
      if (this.flag.startsWith("resize")) {
        var dx = event.pageX - this.resizeItem.startPx,
          dy = event.pageY - this.resizeItem.startPy;
        switch (this.flag) {
          case "resize-lt":
            this.curControl.style.position.x = this.resizeItem.x + dx;
            this.curControl.style.position.y = this.resizeItem.y + dy;
            dx = -dx;
            dy = -dy;
            break;
          case "resize-lc":
            this.curControl.style.position.x = this.resizeItem.x + dx;
            dy = 0;
            dx = -dx;
            break;
          case "resize-lb":
            this.curControl.style.position.x = this.resizeItem.x + dx;
            dx = -dx;
            break;
          case "resize-rt":
            this.curControl.style.position.y = this.resizeItem.y + dy;
            dy = -dy;
            break;
          case "resize-rc":
            dy = 0;
            break;
          case "resize-rb":
            break;
          case "resize-ct":
            this.curControl.style.position.y = this.resizeItem.y + dy;
            dx = 0;
            dy = -dy;
            break;
          case "resize-cb":
            dx = 0;
            break;
        }
        if (this.resizeItem.w + dx > 10) { //最小宽度
          this.curControl.style.position.w = parseInt(this.resizeItem.w)+ parseInt(dx);
        }
        if (this.resizeItem.h + dy > 10) {
          this.curControl.style.position.h = parseInt(this.resizeItem.h) + parseInt(dy);
        }
        //canvas组件需要重新渲染
        // DOM 还没有更新
        this.$nextTick(function () {
          // DOM 更新了
        
          var a = this.$refs["comp" + this.curIndex][0];
          a.onResize();
         
        });
      } else if (this.flag == "move") {
        //移动组件
        var dx = event.pageX - this.moveItem.startX,
          dy = event.pageY - this.moveItem.startY;
        for (var key in this.selectedComponentMap) {
          var component = this.selectedComponentMap[key];
          component.style.position.x = component.style.temp.position.x + dx;
          component.style.position.y = component.style.temp.position.y + dy;
        }
      } else if (this.flag == "frame_selection") {
        this.onFrameSelection(event);
      }
    },
    onLayerMouseup(event) {
      if (this.flag.startsWith("resize")) {
        var a = this.$refs["comp" + this.curIndex][0];
        a.onResize();
      } else if (this.flag == "frame_selection") {
        //由于和onLayerClick冲突，这里模拟下点击空白区域
        this.onFrameSelection(event);
        this.frameSelectionDiv.width = 0;
        this.frameSelectionDiv.height = 0;
        this.frameSelectionDiv.top = 0;
        this.frameSelectionDiv.left = 0;
      } else if (this.flag == "move") {
        //鼠标move只是方便用户预览，真正执行应该用命令，所以要先恢复
        var dx = event.pageX - this.moveItem.startX;
        var dy = event.pageY - this.moveItem.startY;
        for (var key in this.selectedComponentMap) {
          var component = this.selectedComponentMap[key];
          component.style.position.x = component.style.position.x - dx;
          component.style.position.y = component.style.position.y - dy;
        }

        this.execute({
          op: "move",
          dx: dx,
          dy: dy,
          items: this.selectedComponentMap, //渲染
        });
      }
      this.flag = "";
    },
    onLayerMousedown($event) {
      console.log("onLayerMousedown");
      this.flag = "frame_selection";
      this.frameSelectionDiv.startX = event.offsetX;
      this.frameSelectionDiv.startY = event.offsetY;
      this.frameSelectionDiv.startPageX = event.pageX;
      this.frameSelectionDiv.startPageY = event.pageY;
    },
    onLayerClick() {
      // this.clearSelectedComponent();
      // this.setLayerSelected(true);
    },
    onFrameSelection(event) {
      var dx = event.pageX - this.frameSelectionDiv.startPageX;
      var dy = event.pageY - this.frameSelectionDiv.startPageY;
      this.frameSelectionDiv.width = Math.abs(dx);
      this.frameSelectionDiv.height = Math.abs(dy);
      if (dx > 0 && dy > 0) {
        this.frameSelectionDiv.top = this.frameSelectionDiv.startY;
        this.frameSelectionDiv.left = this.frameSelectionDiv.startX;
      } else if (dx > 0 && dy < 0) {
        this.frameSelectionDiv.top = this.frameSelectionDiv.startY + dy;
        this.frameSelectionDiv.left = this.frameSelectionDiv.startX;
      } else if (dx < 0 && dy > 0) {
        this.frameSelectionDiv.top = this.frameSelectionDiv.startY;
        this.frameSelectionDiv.left = this.frameSelectionDiv.startX + dx;
      } else if (dx < 0 && dy < 0) {
        this.frameSelectionDiv.top = this.frameSelectionDiv.startY + dy;
        this.frameSelectionDiv.left = this.frameSelectionDiv.startX + dx;
      }
      //判断各个组件是否在方框内
      var _this = this;
      var rect = {
        x: this.frameSelectionDiv.left,
        y: this.frameSelectionDiv.top,
        width: this.frameSelectionDiv.width,
        height: this.frameSelectionDiv.height,
      };
      var components = this.configData.components;
      components.forEach((component) => {
        var itemRect = {
          x: component.style.position.x,
          y: component.style.position.y,
          width: component.style.position.w,
          height: component.style.position.h,
        };
        if (checkByRectCollisionDetection(rect, itemRect)) {
          _this.addSelectedComponent(component);
        } else {
          _this.removeSelectedComponent(component);
        }
      });
      if (this.selectedComponents.length > 0) {
        this.setLayerSelected(false);
      } else {
        this.setLayerSelected(true);
      }
    },
    onDrop(event) {
      event.preventDefault();
      var infoJson = event.dataTransfer.getData("my-info");
 
      if(infoJson != null){
         var component = JSON.parse(infoJson);
      component.position = {
        dataLine: this.dataLine,
      };
      }
     

      if (this.checkAddComponent(component) == false) {
        return;
      }
      //判断当前着陆点是不是layer
      if (event.target.id == "surface-edit-layer") {
        component.style.position.x = event.offsetX;
        component.style.position.y = event.offsetY;
      } else {
        //解决着陆灯不是layer的情形
        var layer = event.currentTarget;
        var position = layer.getBoundingClientRect();
        var x = event.clientX - position.left;
        var y = event.clientY - position.top;
        component.style.position.x = x;
        component.style.position.y = y;
      }
      //处理默认值
      this.execute({
        op: "add",
        component: component,
      });
      //默认选中，并点击
      this.clickItem(component, this.configData.components.length - 1);
    },
    moveItems(direction) {
      var dx = 0,
        dy = 0;
      if (direction == "up") {
        dy = -5;
      } else if (direction == "right") {
        dx = 5;
      } else if (direction == "down") {
        dy = 5;
      } else if (direction == "left") {
        dx = -5;
      }
      this.execute({
        op: "move",
        dx: dx,
        dy: dy,
        items: this.selectedComponentMap,
      });
    },
    checkAddComponent(info) {
      if (info == null) {
        this.$q.notify({
          type: "negative",
          position: "bottom-right",
          message: "This component not surpport.",
        });
        return false;
      }
      return true;
    },
    parseView(component) {
      return topoUtil.parseViewName(component);
    },
    clickItem(component, index) {
      this.setLayerSelected(false);
      // console.log(component);
      if (this.selectedComponentMap[component.identifier] == undefined) {
        component.dataBind.biz = component.name;
        this.setSelectedComponent(component); //重新渲染1
      } else {
        // console.log('如果已经选中，则不做任何处理')
        //如果已经选中，则不做任何处理
      }
    },
    clickComponent(index, component, event) {
      //点击组件

      //  console.log(component.dataBind.biz);
      if (event.ctrlKey == true) {
        //点击了ctrl
        component.dataBind.biz = 3;
        console.log(component.dataBind.biz);
        console.log(component);
        this.setLayerSelected(false);
        if (this.selectedComponentMap[component.identifier] == undefined) {
          this.addSelectedComponent(component);
        } else {
          this.removeSelectedComponent(component);
        }
      } else {
        //这里不再处理点击事件，改为鼠标左键
        //this.clickItem(component,index);
      }
    },
    copyItem() {
      // 设定复制源
      var items = [];
      for (var key in this.selectedComponentMap) {
        var item = deepCopy(this.selectedComponentMap[key]);
        items.push(item);
      }
      this.setCopySrcItems(items);
    },
    pasteItem() {
      if (this.copySrcItems && this.copySrcItems.length > 0) {
        this.execute({
          op: "copy-add",
          items: this.copySrcItems,
        });
      }
    },
    removeItem(index, component) {
      //移除组件
      // console.log(index)
      //  console.log(component)
      this.execute({
        op: "del",
        index: index,
      });
      this.setLayerSelected(true);
    },
    fullScreen() {
      localStorage.setItem("topoData", JSON.stringify(this.configData));
    
      // this.$router.push({path: '/Fullscreen'});

      let { href } = this.$router.resolve({
        path: "/fullscreen",
        name: "TopoFullscreen",
        query: {
          sceneId: this.sceneId,
          sceneName: this.sceneName,
        },
        params: {
          sceneId: this.sceneId,
          sceneName: this.sceneName,
        },
      });
      window.open(href, "_blank");
    },
    printData() {
      let deldata = this.topoData;
      deldata.components = [];
      console.log(this.topoData);
      //   var json = JSON.stringify(this.configData);
      //   console.log(json);
      //   alert(json);
      this.gettopoEditor(deldata);
    },
    showdialog() {
     
      this.alert_two = true;
      this.dargjsondata = JSON.stringify(this.configData);
      
    },
    saveData() {
      this.alert_two = false;
    },
    getDataClick() {
      this.getData();
    },
    // 获取图层数据
    getData(page) {
      let that = this;
      console.log(page);
      this.current_page = page ? page : this.current_page;
      this.$axios
        .post("/api/drag/list", {
          username: localStorage.getItem("user_account"),
          page_size: this.page_size,
          current_page: this.current_page,
        })
        .then((res) => {
          console.log(res.data.extra);
          //  var Jsondata = JSON.parse(res.data.extra[0].dargjsondata)
          //    console.log(Jsondata.components);
          //   //  this.gettopoEditor(Jsondata)
          that.componentdata = res.data.extra;
          this.totalnum = res.data.total;
          //  that.configData = Jsondata
        });
      // this.this.configData =
      this.alert = true;
    },
    pctclosedialog() {
      this.alert = false;
    },
    handleClick(row) {
      console.log(row);
      var Jsondata = JSON.parse(row.dargjsondata);
      this.gettopoEditor(Jsondata);
      // this.configData = Jsondata
      this.alert = false;
    },
   
    delClick(row) {
      console.log(row._id);
      let that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.$axios
            .post("/api/drag/del", {
              id: row._id,
            })
            .then((res) => {
              that.getData();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    currentchange() {},
    ToHome() {
      this.$router.push({
        path: "/Home",
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 展示用户列表
    usershownamelist() {
      let that = this;
      this.$axios
        .post("/api/drag/userlist", {
          user_account: localStorage.getItem("user_account"),
        })
        .then((res) => {
          res.data.extra.map((item) => {
            let arr = {};
            arr.value = item.user_account;
            arr.label = item.user_account;
            that.showname.push(arr);
          });
          // this.showname = res.data.extra
          console.log(that.showname);
        });
    },
    draglistid() {
      if (this.$route.query.id) {
        this.isid = false;
        this.$axios
          .post("/api/drag/listid", {
            id: this.$route.query.id,
          })
          .then((res) => {
            this.componentadata = res.data.extra[0];
             let data = JSON.parse(this.componentadata.dargjsondata)
             this.getfacility(data.name)
             console.log('data.name'+data.name);
             this.gettopoDataname(data.name)
            this.handleClick(res.data.extra[0]);
          });
      }
    },
    // 获取传感器
    getfacility(){

    }
  },
  mounted() {
   
    this.usershownamelist();
    this.draglistid();
    this.isname = this.topoDatademo;
    this.loadDefaultTopoData();
  },
};
</script>

<style lang="scss">
.topo-main {
  background-color: white;
  border: #ccc solid 1px;
  margin: 0;
  // position: relative;
  // overflow-x: hidden;
  // overflow-y: hidden;

  .topo-layer {
    width: 100%;
    height: 100%;
    // position: absolute;
    transform-origin: left top;
    // overflow: auto;
    // overflow: hidden;
    // background-color: white;
    // background-clip: padding-box;
    // background-origin: padding-box;
    // background-repeat: no-repeat;
    // background-size: 100% 100%;

    // background-image: linear-gradient(
    //     45deg,
    //     #ccc 25%,
    //     transparent 25%,
    //     transparent 75%,
    //     #ccc 75%,
    //     #ccc
    //   ),
    //   linear-gradient(
    //     45deg,
    //     #ccc 25%,
    //     transparent 25%,
    //     transparent 75%,
    //     #ccc 75%,
    //     #ccc
    //   );
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;

    .topo-frame-selection {
      background-color: #8787e7;
      opacity: 0.3;
      border: #0000ff solid 1px;
      position: absolute;
      z-index: 999;
    }

    .topo-layer-view {
      position: absolute;
      height: 100px;
      width: 100px;
      // background-color: #999;
      cursor: move;
      border: #ccc solid 1px;

      .resize-left-top {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: white;
        border: 1px solid #0cf;
        left: -5px;
        top: -5px;
        cursor: nwse-resize;
      }

      .resize-left-center {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: white;
        border: 1px solid #0cf;
        left: -5px;
        top: 50%;
        margin-top: -5px;
        cursor: ew-resize;
      }

      .resize-left-bottom {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: white;
        border: 1px solid #0cf;
        left: -5px;
        bottom: -5px;
        cursor: nesw-resize;
      }

      .resize-right-top {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: white;
        border: 1px solid #0cf;
        right: -5px;
        top: -5px;
        cursor: nesw-resize;
      }

      .resize-right-center {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: white;
        border: 1px solid #0cf;
        right: -5px;
        top: 50%;
        margin-top: -5px;
        cursor: ew-resize;
      }

      .resize-right-bottom {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: white;
        border: 1px solid #0cf;
        right: -5px;
        bottom: -5px;
        cursor: nwse-resize;
      }

      .resize-center-top {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: white;
        border: 1px solid #0cf;
        top: -5px;
        left: 50%;
        margin-left: -5px;
        cursor: ns-resize;
      }

      .resize-center-bottom {
        position: absolute;
        height: 10px;
        width: 10px;
        background-color: white;
        border: 1px solid #0cf;
        bottom: -5px;
        left: 50%;
        margin-left: -5px;
        cursor: ns-resize;
      }
    }

    .topo-layer-view-selected {
      outline: 1px solid #0cf;
    }
  }
  .q-pt-none {
    padding: 20px !important;
  }
  .dialogcss .el-dialog__body {
    padding: 5px 20px 30px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .Guide{ position: absolute; z-index: 0;}
}
</style>
