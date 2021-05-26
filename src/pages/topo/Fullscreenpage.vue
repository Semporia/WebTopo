<template>
  <div class="topo-fullscreen" >
    <TopoRenderpage v-if="!prompt" :configData = "configData"  :facilityData="facilityData" :deviceList = "deviceList"  />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">请登录</div>
        </q-card-section>
        <!-- <Login></Login> -->
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="username"
            autofocus
            @keyup.enter="prompt = false"
            placeholder="用户名"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="password"
            autofocus
            @keyup.enter="prompt = false"
            placeholder="密码"
            type="password"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="登录" @click="clicklogin()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import TopoRenderpage from "../../components/topo/TopoRenderpage";
import crypto from "crypto";
import Login from "../../views/Login.vue";
import { log } from "util";
export default {
  name: "TopoFullscreen",
  components: {
    TopoRenderpage,
    Login,
  },
  watch: {
    prompt() {
    this.getidData();
     this.getFacilityDevunit();
      
    },
  },
  data() {
    return {
      facilityData: [],
      facility_param: [],
      facility_devunit_list: [],
      deviceList: [], //设备组
      newdeviceList: [],
      component: [],
      prompt: true,
      username: "text",
      password: "123",
      showerr: "",
      configData: "",
       loading: true
    };
  },
  methods: {
    getmd5(password) {
      var md5Hash = crypto.createHash("md5");
      var md5Value = md5Hash.update(password).digest("hex");
      return md5Value;
    },
    async clicklogin() {
      await this.$axios
        .post("/api/admin/login", {
          user_account: this.username,
          user_password: this.getmd5(this.password),
        })
        .then((res) => {
        
          if (res.data.ret_code === 0) {
         
            this.username = this.username;
          
            this.prompt = false;
          } else {
            this.$message.error(res.data.ret_msg);
          }
        });
    },
    async getFacilityDevunit() {
      await this.$axios
        .post("/api/devunit/manage/list", { project_name: this.configData.name })
        .then((res) => {
          let arr = [];
          this.deviceList = res.data.extra;
          res.data.extra.map((item) => {
            arr.push(item.devunit_name);
          });
          this.facility_devunit_list = arr;
          this.getFacilitydata(arr);
          console.log(this.deviceList);
        });
    },
    async getFacilitydata(arr) {
      let that = this;
      this.$axios
        .post("/api/gateway/real/objdata", { devunit_name: arr})
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

          if ( res.data.extra[0].project_showname == this.username){
            that.temp = res.data.extra[0].dargjsondata;
            // localStorage.getItem("topoData", JSON.parse(this.temp));
            this.configData = JSON.parse(res.data.extra[0].dargjsondata);
           
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

  mounted() {
      this.clicklogin()
      let that = this;
    setInterval(function () {
        that.getFacilityDevunit(that.temp.name);
      }, 60000);
  },
}
</script>

<style lang="scss">
.topo-fullscreen {
  height: 100vh;
  width: 100%;
}
.fullscreen {
  z-index: 500;
}
</style>


