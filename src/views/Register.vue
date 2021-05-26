<template>

  <div class="login-wrap">
      <q-card>
        <q-card-section class="row items-center q-pb-none btnicon">
          <div class="text-h6">用户注册</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup  />
        </q-card-section>

        <q-card-section>

              <el-form :model="formA" :rules="rules" ref="formA">
      <el-form-item
        label="账号"
        prop="project_showname"
        :label-width="formLabelWidth"
      >
        <el-input v-model="formA.project_showname"></el-input>
      </el-form-item>

      <el-form-item
        label="密码"
        prop="user_password"
        :label-width="formLabelWidth"
      >
        <el-input v-model="formA.user_password"></el-input>
      </el-form-item>

      <el-form-item
        label="公司名称"
        prop="user_region"
        :label-width="formLabelWidth"
      >
        <el-input v-model="formA.user_region" class="diainp"></el-input>
      </el-form-item>
      <el-form-item
        label="联系电话"
        prop="user_phone"
        :label-width="formLabelWidth"
      >
        <el-input v-model="formA.user_phone" class="diainp"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-select
          size="small"
          style="width: 110px"
          v-model="formA.user_prov"
          placeholder="请选择省份"
          v-on:change="getProv($event)"
        >
          <el-option
            v-for="item in provs"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          size="small"
          style="width: 104px"
          v-if="formA.selectProv != ''"
          v-model="formA.user_city"
          placeholder="请选择城市"
          v-on:change="getCity($event)"
        >
          <el-option
            v-for="item in citys"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label :label-width="formLabelWidth">
        <el-input
          v-model="formA.user_detail"
          class="diainp2"
          auto-complete="off"
          placeholder="请输入详细地址"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="saveCreate('formA')">创 建</el-button>
 <!-- <div slot="footer" class="dialog-footer">
      
    </div> -->

        </q-card-section>
      </q-card>


  
   
  </div>
  
</template>

<script>
import axios from "axios";
import global_ from "../assets/libs/Global.js";
export default {
    props: ["alert"],
  data: function () {
    return {
      formA: {
        project_showname: "",
        user_password: "",
        user_region: "",
        user_phone: "",
        user_prov: "",
        user_city: "",
        user_detail: "",
      },
      rules: {
        project_showname: [
          { required: true, message: "请输入展示账号", trigger: "blur" },
        ],
        user_password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
        ],
        user_region: [{ required: true, message: "公司名称", trigger: "blur" }],
        user_phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          // {
          //   pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
          //   message: '手机号格式不对',
          //   trigger: 'blur'
          // }
        ],
      },
      formLabelWidth: "120px",
      provs: global_.provs,
      citys: [],
      fileList: [],
      search_word: "",
     
    };
  },
  created: function () {
    //            this.getData();
  },
  methods: {
    getProv: function (prov) {
      let tempCity = [];
      this.citys = [];
      this.selectCity = "";
      let allCity = global_.allCity;
      for (var val of allCity) {
        if (prov == val.prov) {
          
          tempCity.push({ label: val.label, value: val.label });
        }
      }
      this.citys = tempCity;
    },
    getCity: function (city) {
     
    },

     saveCreate: async function (formName) {
      //  this.$emit("closeDialog");
      let self = this;
      await self.$refs[formName].validate(function (valid) {
        if (valid) {
          console.log("验证成功");
        } else {
          console.log("验证失败");
          return false;
        }
        let params = {
          user_belong: localStorage.getItem("user_account"),
          user_account: self.formA.project_showname,
          user_password: self.formA.user_password,
          user_phone: self.formA.user_phone,
          user_region: self.formA.user_region,
          user_prov: self.formA.user_prov,
          user_city: self.formA.user_city,
          user_detail: self.formA.user_detail,
        };
        self.$axios.post("/api/admin/register", params).then(function (res) {
          if (res.data.ret_code == 1001) {
            self.$message({ message: res.data.ret_msg, type: "warning" });
            setTimeout(function () {
              self.$router.replace("login");
            }, 2000);
          }
          if (res.data.ret_code == 0) {
            self.$emit("closeDialog");
            self.$message({
              message: "注册成功！",
              type: "success",
            });
            self.formA.project_showname = "";
            self.formA.user_password = "";
            self.formA.user_phone = "";
            self.formA.user_region = "";
            self.formA.user_prov = "";
            self.formA.user_city = "";
            self.formA.user_detail = "";
            
          } else {
            self.$message(res.data.ret_msg);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
form{padding: 0 20px 0 0;}
.ms-title {
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  /*height:160px;*/

  padding: 0 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.btnicon .q-btn{
   position:absolute;
   top:0;
   right:0;
}
</style>
