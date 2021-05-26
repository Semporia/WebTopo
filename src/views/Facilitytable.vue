<template>
  <div style="padding: 10px 0 0 20px;" class="main_div">
    <div v-for="item in newFacilitydata" :key="item._id">
      <h6 class="h6"><i class="el-icon-edit"></i>{{ item.sensor_facility }}</h6>
      <el-row class="rowsytle" v-for="itemv in item.data" :key="itemv._id">
        <span class="MicroChapter">
          <i> 未连接 </i>
        </span>
        <el-col :span="5">序列号：{{ itemv._id }}</el-col>
        <el-col :span="4">传感器名称：{{ itemv.sensor_name }}</el-col>
        <el-col :span="3">传感器类型：{{ itemv.sensor_type }}</el-col>
        <el-col :span="4">传感器ID：{{ itemv.sensor_No }}</el-col>
        <el-col :span="2">单位：{{ itemv.sensor_unit }}</el-col>
        <el-col :span="6" class="czstyle">
          <el-button type="primary" size="mini" @click="copyFacility(itemv)">复制设备</el-button>
          <el-button type="success" size="mini" @click="setFacility(itemv)">编辑设备</el-button>
          <el-button type="warning" size="mini" @click="delFacility(itemv._id)">删除设备</el-button>
          </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  props: ["pctFacility",'Facilitydata'],
  computed: {
    ...mapState({
      Projectnametlist: (state) => state.example.Projectnametlist,
      ProjectFacility: (state) => state.example.ProjectFacility,
    }),
  },
  watch: {
    // 每pctFacility数据改变即触发事件

    Facilitydata: function () {

        this.getnewFacilitydata(this.Facilitydata)
    },
  },
  data() {
    return {
      newFacilitydata:[],
    };
  },

  mounted() {
    // console.log(this.$route.query.id);
    

  },
  methods: {
    getnewFacilitydata(arr) {
      var map = {},
        dest = [];
      arr.forEach((item, index) => {
        var ai = item;
        if (!map[ai.sensor_facility]) {
          dest.push({
            sensor_facility: ai.sensor_facility,
            data: [ai],
          });
          map[ai.sensor_facility] = ai;
        } else {
          dest.forEach((itemdest, y) => {
            let dj = dest[y];
            if (dj.sensor_facility == ai.sensor_facility) {
              dj.data.push(ai);
            }
          });
        }
      });
      this.newFacilitydata = dest;
      console.log(dest);
    },

    delFacility(id) {
       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delFacility',id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    copyFacility(itemv){
       let data = {
                sensor_name:itemv.sensor_name,
                sensor_type:itemv.sensor_type,
                sensor_No:itemv.sensor_No,
                 sensor_unit:itemv.sensor_unit,
                sensor_facility:itemv.sensor_facility,
            }
       this.$emit('saveCreate',data)
    },
    setFacility(data){
       this.$emit('setFacility',data) 
    }
  },
};
</script>
<style>
.h6 {
  padding: 0;
  margin: 5px 0;
  font-size: 16px;
}
.h6 i {
  margin: 0 10px 0 0;
}
.rowsytle {
  margin: 10px;
  background: #eee;
  padding: 10px;
  color: #666;
  line-height: 30px;
}
.czstyle {
  text-align: center;
}
.MicroChapter {
  position: absolute;
  left: -4px;
  top: 1px;
  background-color: #c2c2c2;
  height: 16px;
  line-height: 15px;
  font-size: 10px;
  color: #fff;
  padding: 0 8px;
  text-align: center;
  border-radius: 10px 10px 10px 0;
  /* background-image: -moz-linear-gradient(left,#c2c2c2 20%,#868686); */
  background-image: -ms-linear-gradient(left, #c2c2c2 20%, #868686);
  /* background-image: -webkit-linear-gradient(left,#c2c2c2 20%,#868686); */
  /* background-image: linear-gradient(left,#c2c2c2 20%,#868686); */
  box-shadow: 2px 2px 5px hsla(0, 0%, 60%, 0.4);
  z-index: 999;
}

.MicroChapter::after {
  content: "";
  width: 4px;
  height: 8px;
  border-radius: 8px 0 0 8px;
  background-color: #868686;
  position: absolute;
  top: 14px;
  left: 0;
}
.MicroChapter i {
  font-size: 12px;
  transform: scale(0.8);
  display: inline-block;
}
</style>