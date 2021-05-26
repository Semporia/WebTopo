<template>
  <div class="login-wrap">
    <q-card>
   
      <q-card-section class="row items-center q-pb-none btnicon">
        <div class="text-h6">{{dialogtitle}}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        
      
        <el-form :model="sensorForm" :rules="rules"  ref="sensorForm">
          <el-form-item
            label="设备名"
            prop="faval"
            :label-width="formLabelWidth"
          >
            <el-select v-model="sensorForm.faval" placeholder="请选择">
                <el-option
                v-for="item in pctFacility"
                :key="item._id"
                :label="item.dev_cn_name"
                :value="item.dev_cn_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="传感器名称"
            prop="sensor_name"
            :label-width="formLabelWidth"
          >
            <el-input v-model="sensorForm.sensor_name"></el-input>
          </el-form-item>

          <el-form-item
            label="传感器类型"
            prop="sensor_vaule"
            :label-width="formLabelWidth"
          >
          <el-select v-model="sensorForm.sensor_vaule" placeholder="请选择">
            <el-option
                v-for="item in sensor_type"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
          </el-select>
            <!-- <q-select filled v-model="sensorForm.sensor_vaule" :options="sensor_type"  /> -->
          </el-form-item>
          <el-form-item
            label="传感器型号"
            prop="sensor_No"
            :label-width="formLabelWidth"
          >
            <el-input v-model="sensorForm.sensor_No"></el-input>
          </el-form-item>
          <el-form-item
            label="传感器单位"
            prop="sensor_unit"
            :label-width="formLabelWidth"
          >
            <el-input v-model="sensorForm.sensor_unit"></el-input>
          </el-form-item>
        </el-form>
         <el-button type="primary" @click="submitForm('sensorForm')" >
           <span v-if="this.faciltityAdata._id">修改</span>
             <span  v-else>创 建</span>
           </el-button>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import datatype from "../assets/libs/datatype"
export default {
  props: ["pctFacility","faciltityAdata"],
  data() {
    return {
      dialogtitle:'新增传感器',
      formLabelWidth: "120px",
      sensor_type: datatype.sensortype,
     
      sensorForm: {
        sensor_name: "",
        sensor_No: "",
        sensor_vaule: "",
        sensor_unit: "",
        faval: "", //设备名
      },
      rules: {
        sensor_name: [
          { required: true, message: "请输入传感器名称", trigger: "blur" },
        ],
         sensor_No: [
          { required: true, message: "请输入传感器型号", trigger: "blur" },
        ],
         faval: [
          { required: true, message: "请选择设备名", trigger: "change" },
        ],
         sensor_unit: [
          { required: true, message: "请输入传感器单位", trigger: "blur" },
        ],
         sensor_vaule: [
          { required: true, message: "请选择传感器类型", trigger: "change" },
        ],
        
      },
    };
  },
  watch:{
   
  },
  mounted() {
    
    console.log(this.sensor_type)
    console.log(this.pctFacility);
    if(this.faciltityAdata._id){
      this.dialogtitle = '编辑传感器'
      this.sensorForm.sensor_name = this.faciltityAdata.sensor_name
      this.sensorForm.sensor_vaule = this.faciltityAdata.sensor_type
       this.sensorForm.sensor_No = this.faciltityAdata.sensor_No
        this.sensorForm.faval = this.faciltityAdata.sensor_facility
          this.sensorForm.sensor_unit = this.faciltityAdata.sensor_unit
    }else{
        console.log("this.faciltityAdata无数据");
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           let data = {
        sensor_name: this.sensorForm.sensor_name,
        sensor_type: this.sensorForm.sensor_vaule,
        sensor_No: this.sensorForm.sensor_No,
        sensor_unit: this.sensorForm.sensor_unit,
        sensor_facility: this.sensorForm.faval,
      };
      if(this.faciltityAdata._id){
        data._id = this.faciltityAdata._id
      }
      this.$emit("saveCreate", data);
        } else {
          return false;
        }
      });
    },

    
  },
};
</script>
<style>
.login-wrap .btnicon .q-btn {
  position: absolute;
  top: 0;
  right: 0;
}
.login-wrap .el-form {
  padding: 20px 40px 0 0;
}
.login-wrap .q-card {
  text-align: center;
}
.fullscreen{ z-index: 2000 ;}
</style>