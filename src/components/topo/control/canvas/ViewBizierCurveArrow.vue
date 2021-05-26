<template>
  <div class="viewcanvaslines">
    <canvas
      ref="elCanvas"
      :width="detail.style.position.w"
      :height="detail.style.position.h"
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  </div>
</template>

<script>
import canvasView from "./ViewCanvas";

export default {
  name: "ViewCanvasLinesb",
  extends: canvasView,
  props: {},
  watch: {},
  data() {
    return {
      winWidth: 280,
      winHeight: 80,
      s: 20,
      speed: 20,
      ctx: "",
      stopSet:'',
      color:'rgb(173,255,47)'
    };
  },
  mounted() {
    this.onResize();
  },

  methods: {

    roundRect(ctx, x, y, w, h, r) {
      ctx.moveTo(x + r, y);
      // 右上角弧线
      ctx.arcTo(x + w, y, x + w, y + r, r);
      // 右下角弧线
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      // 左下角弧线
      ctx.arcTo(x, y + h, x, y + h - r, r);
      // 左上角弧线
      ctx.arcTo(x, y, x + r, y, r);
      ctx.fillStyle = this.color;
      ctx.fill(); //画实心圆
    },
    onResize() {
      this.winWidth = this.detail.style.position.w;
      this.winHeight = this.detail.style.position.h;
      if(!this.stopSet){
          // console.log(this.stopSet);
      }
       clearInterval(this.stopSet)

       var el = this.$refs.elCanvas;
        el.width = this.winWidth;
       el.height = this.winHeight;
            var ctx = el.getContext("2d");
    //  var canvas = document.getElementById("mycanvas");
     
      // var ctx = canvas.getContext("2d");
       this.color = this.getForeColor();
 
     
      ctx.clearRect(0, 0, this.winWidth,  this.winHeight);
      var winWidth = this.winWidth;
      var winHeight = this.winHeight;
      var z = 3; // 等分
      if (winHeight / winWidth > 0.1) {
        z = 2;
      }
      if (winHeight / winWidth > 0.5) {
        z = 1;
      }
       if (winHeight / winWidth < 0.05) {
        z = 10;
      }
      let that = this;
      var Cw = winWidth / (z*2); //元素宽
      var s = 0; //起点
      var speed = Cw; //间距
      this.stopSet  = setInterval(function () {
        ctx.clearRect(0, 0, winWidth, winHeight);
        ctx.beginPath();
        if (s < Cw + speed) {
          for (let i = -1; i < z; i++) {
            that.roundRect(
              ctx,
              (Cw + speed) * i + s,
              winHeight / 10,
              Cw,
              winHeight * 0.8,
              (winHeight * 0.8) / 2
            );
          }
        } else {
          s = 0;
          for (let i = 0; i < z; i++) {
            that.roundRect(
              ctx,
              (Cw + speed) * i + s,
              winHeight / 10,
              Cw,
              winHeight * 0.8,
              (winHeight * 0.8) / 2
            );
          }
        }
        ctx.closePath();
        s = s + 1 + 1;
      
      }, 26);
    },
  
  },
};
</script>

<style scoped>
* {
  margin: 0;
}

.viewcanvaslines {
  height: 100%;
  width: 100%;
  position: relative;
}
canvas {
  border: 1px solid #ccc;
  background-image: linear-gradient( #696969,#F5F5F5, #696969);
}
</style>