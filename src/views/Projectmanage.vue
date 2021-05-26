<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs separator="---" class="text-orange" active-color="secondary">
        <q-breadcrumbs-el label="首页" icon="home" />
        <q-breadcrumbs-el label="项目管理" icon="widgets" />
        <!-- <q-breadcrumbs-el label="管理中心"" icon="navigation" /> -->
      </q-breadcrumbs>
      <q-btn color="primary" label="新建项目" @click="newpctTolink" />
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" v-for="(item,index) in componentdata" :key="index">
          <q-img
            :src="item.project_image"
            style="height: 140px; max-width: 100%"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-white">Cannot load image</div>
            </template>
          </q-img>
          <q-card-section>
            <div class="text-h6">项目名:{{item.projectname.substring(0,11)}}</div>
            <div class="text-subtitle2">创建人：{{item.user_account}} </div>
              <div class="text-subtitle2">展示用户：{{item.project_showname}}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <!-- 发布
            运行编辑分享下架设置复制删除-->
            <q-btn flat color="primary" @click="Fullscreen(item)" label="发布" />
            <!-- <q-btn flat color="primary" label="运行" /> -->
            <q-btn flat color="primary" @click="handleClick(item)" label="编辑" />
            <q-btn flat color="primary" @click="setupClick(item)" label="设置" />
            <q-btn flat color="primary" @click="delClick(item)" label="删除" />
          </q-card-section>
        </q-card>
      
      </div>
      
      <CPagination :count="count" :emitEvent="emitEvent" @pageChange="pageChange"  ></CPagination>
    </div>
    <q-dialog title="设置" v-model="isSetup" center>
          <Setproject :userDatalist = "userDatalist" :userUrl = "userUrl"  :componentdata-val = "componentdataVal" @closedialog = "closedialog"></Setproject>
    </q-dialog>

  </div>
</template>
<script>
import { mapState, mapMutations, mapAction } from "vuex";
import CPagination from "./pagination";
import httpurl from '../assets/libs/httpurl'
import Setproject from './Setproject'
export default {
  name: "Projectmanage",
  components: {
    CPagination,
    Setproject
  },
  computed: {
     ...mapState({
       userDatalist: (state) => state.example.userDatalist,
    }),
   },
 
  data() {
    return {
      componentdata: [], // dargjson 表数据
      page_size: 10,
      current_page: 1,
      count: 0,
      max: 4,
      emitEvent: false,
      isSetup:false, // 设置框
      model:'',
      userUrl:'',
      componentdataVal:{}
    };
  },
  mounted: function () {
    this.max = Math.ceil(this.count / this.page_size);
   
  
    // this.pageChange();
  },
  methods: {
    newpctTolink() {
      this.$router.push("/TopoLayout");
    },
    pageChange(limit, offset) {
      let that = this;
      this.page_size = limit
      this.current_page = offset
      console.log(limit + "====" + offset);
      offset = offset == 0 ? offset + 1 : offset / 10 + 1;
        this.$axios
        .post("/api/drag/list", {
          user_account: localStorage.getItem("user_account"),
          page_size: limit,
          current_page: offset,
        })
        .then((res) => {
          that.componentdata = this.getcomponentdataImg(res.data.extra) 

          this.count = res.data.total;
        });
      // this.this.configData =
    },
    getpaginationtal(val) {
      //   this.getData(val);
    },
    // 图片路径转换
    getcomponentdataImg(data){
    data.map(item=>{
           let imgUrl = String.raw `${item.project_image}`
          // console.log("http://"+window.location.hostname+ imgUrl.split('').slice(16).toString().replace(/,/g, ""));
          item.project_image ="http://"+ window.location.hostname + imgUrl.split('').slice(16).toString().replace(/,/g, "")
        
      })
      return data
    },
    handleClick(val) {
      this.$router.push({
        path: "/TopoLayout",
        query: {
          id: val._id,
        },
      });
    },
    Fullscreen(val) {
           localStorage.setItem('topoData',val.dargjsondata)
      let routeData = this.$router.resolve({
        path: "/Fullscreen",
        query: { id: val._id },
      });
      window.open(routeData.href, "_blank");
    },
    setupClick(val) {
        this.userUrl = httpurl+'/Fullscreenpage?id='+val._id
         console.log(this.userUrl);
         this.componentdataVal = val
         this.isSetup= true
    },
    async delClick(row) {
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
              that.pageChange(that.page_size,that.current_page)
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
    closedialog(){
      this.isSetup= false
      this.pageChange(this.page_size,this.current_page)
    }
  },
};
</script>
<style  scoped>
.my-card {
  width: 100%;
  max-width: 240px;
}

.text-h6 {
  font-size: 1rem;
}
.q-select{ width:200px}
</style>