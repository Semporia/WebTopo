<template>
  <div class="q-pa-md" style="height: 100%">
    <div class="facmain">
      <q-list>
        <q-item class="h3">设备管理</q-item>
        <q-item
          clickable
          v-ripple
          v-for="(item, index) in Projectnametlist"
          :key="item"
          @click="clickmenuList(index)"
        >
          <q-item-section>
            {{ item }}
          </q-item-section>
        </q-item>
      </q-list>
      <div class="centerpage">
        <q-breadcrumbs
          separator="---"
          class="text-orange"
          active-color="secondary"
        >
          <q-breadcrumbs-el label="首页" icon="home" />
          <q-breadcrumbs-el label="设备管理" icon="widgets" />
          <q-breadcrumbs-el :label="pctname" icon="widgets" v-if="pctname" />
          <!-- <q-breadcrumbs-el label="管理中心"" icon="navigation" /> -->
        </q-breadcrumbs>
        <div class="row">
          <div class="col-6">
            <q-btn
              color="primary"
              :disabled="isdisabled"
              label="新建传感器"
              class="sbbtn"
              @click="addfacility"
            />
          </div>
          <div class="col">
            <span>搜索：</span>
            <el-select v-model="pctFacility_val" placeholder="所有设备组">
              <el-option
                label="所有设备组"
                value="所有设备组"
              ></el-option>
              <el-option
                v-for="item in pctFacility"
                :key="item._id"
                :label="item.dev_cn_name"
                :value="item.dev_cn_name"
              ></el-option>
            </el-select>
             </div>
          <div class="col">
            <q-input outlined  v-model="fID" class="input" placeholder="搜索传感器ID" />
               </div>
          <div class="col">
            <q-btn push color="primary" round icon="search" @click="searchFacility" />
          </div>
        </div>
        <Facilitytable
          :pctFacility="pctFacility"
          :Facilitydata="Facilitydata"
          @delFacility="delFacility"
          @saveCreate="saveCreate"
          @setFacility="setFacility"
        ></Facilitytable>
        <CPagination
          :count="count"
          :emitEvent="emitEvent"
          @pageChange="pageChange"
          v-if="pctFacility[0]"
          :isboolean="isboolean"
        ></CPagination>
      </div>
    </div>
    <q-dialog title="新增传感器" v-model="alert" center>
      <Getsensor
        :pctFacility="pctFacility"
        :faciltityAdata="faciltityAdata"
        @saveCreate="saveCreate"
      ></Getsensor>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import Facilitytable from "./Facilitytable";
import Getsensor from "./Getsensor";
import CPagination from "./pagination";
export default {
  components: {
    Getsensor,
    Facilitytable,
    CPagination,
  },
  computed: {
    ...mapState({
      Projectnametlist: (state) => state.example.Projectnametlist,
      ProjectFacility: (state) => state.example.ProjectFacility,
    }),
  },
  data() {
    return {
      alert: false,
      isdisabled: true,
      pctFacility: [], //项目下的设备组
      pctname: "", //项目名
      Facilitydata: [],
      faciltityAdata: {}, //1条数据
      page_size: 10,
      current_page: 1,
      count: 0,
      emitEvent: false,
      isboolean: true,
      pctFacility_val: "所有设备组",
      fID:'',
    };
  },

  mounted() {
    console.log(this.ProjectFacility);
    console.log(this.Projectnametlist);
  },
  methods: {
    clickmenuList(index) {
      this.isdisabled = false;
      // console.log(index);
      // console.log(this.ProjectFacility);
      this.pctFacility = [];
      this.pctname = this.Projectnametlist[index];

      this.ProjectFacility.forEach((element) => {
        if (element.project_name == this.pctname) {
          this.pctFacility.push(element);
        }
      });
      this.getpctFacility();
    },
    closedialog() {
      console.log("closedialog");
    },
    addfacility() {
      this.faciltityAdata = {};
      this.alert = true;
    },
    pageChange(limit, offset) {
      this.getpctFacility(limit, offset);
      // this.this.configData =
    },
    //展示列表
    getpctFacility(limit, offset,searchParam) {
      let that = this;
      this.page_size = limit;
      if (!limit) {
        limit = 10;
      }
      this.current_page = offset;
      offset = offset == 0 ? offset + 1 : offset / 10 + 1;
      if (!offset) {
        offset = 1;
      }
      let data  ={
          project_name: that.pctFacility[0].project_name,
          page_size: limit,
          current_page: offset,
      }
      if(searchParam){
         data = Object.assign(data, searchParam) 
      }
      this.$axios
        .post("/api/sensor/list",data)
        .then((res) => {
          this.count = res.data.total;
          if (res.data.extra.length > 0) {
            this.Facilitydata = res.data.extra;
          } else {
            this.Facilitydata = [];
            this.$message({
              message: this.pctname + "无数据",
              type: "warning",
            });
          }
        });
    },
    // 添加传感器数据
    saveCreate(data) {
      if (!data._id) {
        let spct = this.$route.query.id;
        this.$axios
          .post("/api/sensor/add", {
            sensor_name: data.sensor_name,
            sensor_type: data.sensor_type,
            sensor_No: data.sensor_No,
            sensor_unit: data.sensor_unit,
            sensor_facility: data.sensor_facility,
            project_name: this.pctFacility[0].project_name,
            sensor_pct: spct,
          })
          .then((res) => {
            console.log(res.data.ret_code);
            if (res.data.ret_code === 200) {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.alert = false;
              this.getpctFacility();
            }
          });
      } else {
        this.setnewFacility(data);
      }
    },
    // 删除传感器数据
    delFacility(id) {
      this.$axios
        .post("/api/sensor/del", {
          _id: id,
        })
        .then((res) => {
          if (res.data.ret_code === 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getpctFacility(this.page_size, this.current_page);
          }
        });
    },
    setFacility(data) {
      this.faciltityAdata = data;
      this.alert = true;
    },
    //编辑传感器数据
    setnewFacility(data) {
      this.$axios
        .post("/api/sensor/change", {
          _id: data._id,
          sensor_No: data.sensor_No,
          sensor_name: data.sensor_name,
          sensor_type: data.sensor_type,
          sensor_unit: data.sensor_unit,
          sensor_facility: data.sensor_facility,
        })
        .then((res) => {
          console.log(res.data.ret_code);
          if (res.data.ret_code === 200) {
            this.alert = false;
            this.getpctFacility(this.page_size, this.current_page);
          }
        });
    },
    // 搜索传感器数据
    searchFacility(val){
    

      if(this.pctFacility_val != '所有设备组'){
         this.getpctFacility(this.page_size, this.current_page,{sensor_facility:this.pctFacility_val,sensor_No:this.fID});
      }
      else if(this.fID !== ''){
         this.getpctFacility(this.page_size, this.current_page,{sensor_No:this.fID});
      }
      else{
         this.getpctFacility(this.page_size, this.current_page,{});
      }
      
    }
  },
};
</script>
<style >
.facmain {
  display: flex;
}
.facmain .q-list {
  padding: 0 10px 0 0;
  margin: 0 10px 0 0;
  border-right: 10px solid #cdcdcd;
  height: 90% !important;
  position: absolute;
}
.h3 {
  font-weight: 900;
  border-bottom: 2px slategrey solid;
}
.scroll {
  height: 100%;
}
.q-page-container {
  height: 100%;
}
.centerpage {
  margin: 0 0 0 250px;
  width: 100%;
}

.sbbtn {
  margin: 20px 0 0;
}
.input{ width: 200px; height: 38px; display: table;}
.input div{height: 38px !important;}
</style>