<template>
<div>
	 <div class="block">
		 <span>速度</span>
	<el-row :gutter="20">
 
  <el-col :span="18"><el-slider v-model="tooltipVal" :show-tooltip="false" @change = 'tooltip'></el-slider></el-col>
  <el-col :span="4"><span style="line-height:40px">{{tooltipVal*100}}</span></el-col>
</el-row>
  
	
  </div>
	  <el-radio-group v-model="radio1" size="mini" class="" @change="animaMethod('',radio1)">
      <el-radio-button label="一次"></el-radio-button>
      <el-radio-button label="循环"></el-radio-button>
    </el-radio-group>

  <div class="functionList">
  
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod(' ')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/timg.jpg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">暂停</div>
    </a>
	<a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('lightSpeedIn')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-刹车.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">刹车</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('fadeIn')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-淡入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">淡入</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('zoomIn')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-放大.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">放大</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('rotateIn')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-旋转出现.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">旋转</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('zoomInDown')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-下落放大.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">下落放大</div>
    </a>

    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('bounce')"
    >
      <div class="editAnimateIco">
        <img src="@/statics/topo/anima/上下震动.svg" class="mCS_img_loaded" />
      </div>
      <div class="editAnimateTxt">上下震动</div>
    </a>
    <a href="javascript:;" class="editAnimateImg" @click="animaMethod('shake')">
      <div class="editAnimateIco">
        <img src="@/statics/topo/anima/左右震动.svg" class="mCS_img_loaded" />
      </div>
      <div class="editAnimateTxt">左右震动</div>
    </a>
    <a href="javascript:;" class="editAnimateImg" @click="animaMethod('flash')">
      <div class="editAnimateIco">
        <img src="@/statics/topo/anima/闪烁.svg" class="mCS_img_loaded" />
      </div>
      <div class="editAnimateTxt">闪烁</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('rubberBand')"
    >
      <div class="editAnimateIco">
        <img src="@/statics/topo/anima/橡皮筋.svg" class="mCS_img_loaded" />
      </div>
      <div class="editAnimateTxt">橡皮筋</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('slideInLeft')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向左滑入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">向右滑入</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('slideInRight')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向右滑入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">向左滑入</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('slideInUp')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向上滑入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">向上滑入</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('slideInDown')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向下滑入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">向下滑入</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('rotateInDownRight')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-从右滚入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">从右滚入</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('rotateInDownLeft')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-从左滚入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">从左滚入</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('bounceInLeft')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向左飞入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">弹性向右</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('bounceInRight')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向右飞入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">弹性向左</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('bounceInUp')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向上飞入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">弹性向上</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('bounceInDown')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向下飞入.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">弹性向下</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('flipInX')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-上下翻转.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">上下翻转</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('flipInY')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-左右翻转.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">左右翻转</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('zoomInLeft')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向左展开.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">变焦向右</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('zoomInRight')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向右展开.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">变焦向左</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('zoomInUp')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向上展开.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">变焦向上</div>
    </a>
    <a
      href="javascript:;"
      class="editAnimateImg"
      @click="animaMethod('zoomInDown')"
    >
      <div class="editAnimateIco">
        <img
          src="@/statics/topo/anima/H5动画-向下展开.svg"
          class="mCS_img_loaded"
        />
      </div>
      <div class="editAnimateTxt">变焦向下</div>
    </a>
  </div>
  </div>
</template>
<script>
export default {
	props: ["anTooltip"],
	watch:{
		anTooltip:function(){
		 this.tooltipVal = this.anTooltip ?  this.anTooltip.substring(0,this.anTooltip.length-1)*10 : 0
		}
	},
data(){
	return{
		tooltipVal:0,
		radio1:'一次',
		animatype:''
	}
	
},
  methods: {
    animaMethod(name,state) {
	  name = typeof name != null  ? name : ''
	  this.animatype = this.radio1 == '一次'? '': 'infinite'
      this.$emit("addAnima", [this.animatype,name]);
     
	},
	tooltip(val) {
       this.$emit("tooltip",val/10);
      }
	
  },
  mounted(){
	 
 this.tooltipVal = this.anTooltip ?  this.anTooltip.substring(0,this.anTooltip.length-1)*10 : 0
	//   this.tooltipVal = this.anTooltip.substr(this.anTooltip.length-1)*1000
  }
};
</script>
<style scoped>
a {
  color: #337ab7;
  text-decoration: none;
}
img {
  vertical-align: middle;
}
.functionList {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.editAnimateImg {
  position: relative;
  float: left;
  width: 64px;
  margin: 10px 5px 5px 5px;
  height: 60px;
  border: 1px solid #eee;
  border-radius: 8px;
  display: block;
}
.editAnimateIco {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}
.editAnimateIco img {
  width: 100%;
  height: 100%;
}
.editAnimateTxt {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  color: #555;
}
</style>
