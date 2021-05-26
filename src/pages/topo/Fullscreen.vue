<template>
  <div class="topo-fullscreen">
    <TopoRender  :facilityData="facilityData" :deviceList = "deviceList"  />
  </div>
</template>

<script>
import TopoRender from "../../components/topo/TopoRender";
export default {
  name: "TopoFullscreen",
  data() {
    return {
      facilityData: [],
      facility_param: [],
      facility_devunit_list: [],
      deviceList: [], //设备组
      newdeviceList: [],
      component:[],
    };
  },
  components: {
    TopoRender,
  },
  watch: {
  },
  methods: {
    async getFacilityDevunit() {
      let pctname =  JSON.parse(localStorage.getItem("topoData")).name; //项目名
      await this.$axios
        .post("/api/devunit/manage/list", {project_name: pctname })
        .then((res) => {
          let arr = [];
          this.deviceList = res.data.extra;
          res.data.extra.map((item) => {
            arr.push(item.devunit_name);
          });
          this.facility_devunit_list = arr;
          this.getFacilitydata(arr);
        });
    },
    async getFacilitydata(params) {
        let that = this
       that.$axios.post("/api/gateway/real/objdata", { devunit_name: params })
       .then((res) => {
         that.facilityData = res.data.extra;
        
    });
               
  },
  async getidData() {
      let that = this;
      await this.$axios
        .post("/api/drag/listid", {
          id: that.$route.query.id,
        })
        .then((res) => {
          console.log(res);
          if ( res.data.extra[0].user_account == localStorage.getItem("user_account")){
            let temp = res.data.extra[0].dargjsondata;
            localStorage.setItem("topoData",temp);
            that.configData = JSON.parse(res.data.extra[0].dargjsondata);
          }
          else{
            this.$message({
              message: "无权限",
              type: "warning",
            });
          }
        });
    },
  },
  async created() {
    this.component = JSON.parse(localStorage.getItem("topoData")).components
    await this.getFacilityDevunit();
  },
  mounted() {
     if(this.$route.query.id){
      
        this.getidData()
    }
      let that = this
       that.getFacilityDevunit()
      setInterval(function()  {
          that.getFacilityDevunit()
      },60000)
  
  },

};
</script>

<style lang="scss">
.topo-fullscreen {
  height: 100vh;
  width: 100%;
}
</style>


