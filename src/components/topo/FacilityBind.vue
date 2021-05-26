<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="设备组">
        <el-select v-model="sValue" placeholder="请选择设备组"  @change="devicechange">
          <el-option
            v-for="item in sOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="传感器ID">
        <el-select v-model="fValue" placeholder="请选择传感器ID" @change="selectchange">
          <el-option
            v-for="(item, index) in fOptions"
            :key="index"
            :label="item.sensor_No"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">取消绑定</el-button>

      </el-form-item>
      
        
     
    </el-form>
     <span class="spanstyle">保存请点页面正下方按钮《保存数据》</span>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  props: ["factype", "topoDataname"],
  data() {
    return {
      sValue: "", //设备
      fValue: "",
      sOptions: [],
      fOptions: [],
      faclicitydata: [],
      i:Number, 
    };
  },
  computed: {
    ...mapState({
      topoData: (state) => state.topoEditor.topoData,
    }),
  },
  watch: {
    factype:function(){
      console.log(this.factype);
      if(this.factype.type == 'chart-watera'){
        
      }
       this.setValue(this.factype.dataBind.sn)
    },
    sValue : function(){
      console.log(this.sValue);
      if( this.fOptions.length>0){
        this.fOptions.length = []
      }
      this.faclicitydata.filter((item) => {
        if (item.sensor_facility === this.sValue) {
          this.fOptions.push(item);
        }
      });
     
    }
  },
  mounted() {
    //  console.log(this.factype.dataBind.sn)
    console.log('this.factype'+this.factype)
     
    // console.log(this.topoData);

    this.$axios
      .post("/api/sensor/list", { pct_name: this.topoDataname })
      .then((res) => {
        console.log(res.data.extra);
        this.faclicitydata = res.data.extra;
        this.sOptions = this.utildata(res.data.extra);
        // console.log();
        this.setValue(this.factype.dataBind.sn)
      });


  },
  methods: {
    ...mapMutations("topoEditor", [
      "gettopoEditor",
    ]),
    utildata(query) {
      let obj = [];
      query.filter((item) => {
        if (obj.indexOf(item.sensor_facility) < 0) {
          obj.push(item.sensor_facility);
        }
      });
      return obj;
    },
    onSubmit() {
      this.fValue = ""
      this.sValue =""
      this.factype.dataBind.sn = ''
      this.gettopoEditor(this.topoData)

    },
    
    selectchange(){

      console.log(this.faclicitydata);
      console.log(this.sValue);
      console.log(this.fValue);
      this.faclicitydata.filter((item) => {
        if (item.sensor_facility === this.sValue && item._id=== this.fValue )
        {     
            this.factype.dataBind.queryParam = item
            console.log(item);
            console.log(this.fValue);
        }
        })
      // console.log( this.factype.name.replace(/[^0-9]/ig,""));
      // let i = this.factype.name.replace(/[^0-9]/ig,"")

      console.log( this.factype);
      console.log(this.topoData);
     
      this.gettopoEditor(this.topoData)
    
    },
    devicechange(){
      this.fOptions = [];
      this.faclicitydata.filter((item) => {
        if (item.sensor_facility === this.sValue) {
          this.fOptions.push(item);
        }
      });
      this.fValue =''
    },
    setValue(sn){

       if(sn){
        this.faclicitydata.forEach(item=>{
         if( item._id == sn){
              this.fValue = item.sensor_No
              this.sValue = item.sensor_facility
           }
       })
       }else{
          this.fValue = ""
          this.sValue =""
       }
    }
  },
};
</script>
<style scoped>
  .spanstyle{
    color: #666;
    display: block;
    font-size: 12px;
  }
</style>