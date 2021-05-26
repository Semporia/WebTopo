<template>
  <div class="login-wrap">
    <div class="centerBox">
      <div class="loginstyle">
        <div class="text-h4">
          物联网管理平台
          <q-badge align="top">cli v1.0.0</q-badge>
        </div>
        <div class="q-pa-md">
          <div class="q-gutter-md qlogin">
            <q-form @submit="submitForm">
              <q-input filled v-model="ruleForm.username" label="用户名" hint="必填" lazy-rules :rules="[(val) => (val && val.length > 0) || '请输入用户名']" />
              <q-input filled type="password" v-model="ruleForm.password" label="密码" hint="必填" lazy-rules :rules="[(val) => (val !== null && val !== '') || '请输入密码']" />
              <div style="padding: 20px">
                <q-btn label="登录" type="submit" color="primary" style="width: 240px" />
              </div>
            </q-form>
          </div>
        </div>
        <div class="login-icp">
          <el-link href="http://www.beian.miit.gov.cn" type="primary" target="_blank">备案号</el-link>
          <br />
          <el-link type="primary" disabled>2018-2021 物联网 版权所有</el-link>
        </div>
      </div>
    </div>
    <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="账号" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
      </el-form> -->
  </div>
</template>
<script>
import axios from "axios";
import crypto from "crypto";

import { mapState, mapMutations, mapAction } from "vuex";
// import './login'
// import {Form,FormItem,} from 'element-ui'
//import global_ from 'components/common/Global';
// let httpurl = 'http://localhost:80'
export default {
  name: "Login",
  components: {},

  data: function() {
    return {
      // private property
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      ruleForm: {
        username: "",
        password: "",
      },
      name: null,
      password: null,
    };
  },
  created: function() {
    console.log(this.$q.version);
    // this.submitForm('ruleForm')
  },

  methods: {

    onSubmit() {},

    getmd5(password) {
      var md5Hash = crypto.createHash("md5");
      var md5Value = md5Hash.update(password).digest("hex");
      return md5Value;
    },

    submitForm: function(formName) {
      const self = this;
      var params = {
        user_account: self.ruleForm.username,
        user_password: self.getmd5(self.ruleForm.password),
        //user_password: self.encode(self.ruleForm.password)
      };
      self.$axios.post("/api/admin/login", params).then(
        function(res) {
          console.log(res);
          if (res.data.ret_code == 0) {
            let user_type = res.data.extra;
            localStorage.setItem("user_type", user_type);
            localStorage.setItem("user_account", self.ruleForm.username);

            //localStorage.setItem('ms_username', self.ruleForm.username);
            self.$router.push("/Home");
          } else {
            self.$message(res.data.ret_msg);
          }
        },
        function(err) {
          console.log(err);
        }
      );
    },
    register: function() {
      let self = this;
      self.$router.push("/register");
    },

    // public method for encoding
    encode: function(input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = this._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output =
          output +
          this._keyStr.charAt(enc1) +
          this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) +
          this._keyStr.charAt(enc4);
      }
      return output;
    },

    // public method for decoding
    decode: function(input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = this._utf8_decode(output);
      return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }
      return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
      var string = "";
      var i = 0;
      var c = (c1 = c2 = 0);
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(
            ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
          );
          i += 3;
        }
      }
      return string;
    },
  },
};

</script>
<style scoped>
.centerBox {
  width: 100%;
  height: 400px;
  background: url('../statics/img/bg.png') center center no-repeat content-box #08437b;
  background-size: 60%;
  position: absolute;
  top: 50%;
  margin: -250px 0 0 0;
}

.loginstyle {
  position: relative;
  height: 400px;
}

.qlogin {
  margin: 0 auto;
  width: 320px;
  padding: 5px 20px 5px 5px;
}

.q-gutter-md {

  margin: 50px 0 0 150px;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
  position: fixed;
  left: 50%;
}

.text-h4 {
  text-align: center;
  position: absolute;
  left: 50px;
  top: -50px;
  padding: 0px 20px 20px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.login-icp {
  text-align: center;
  color: #fff;
  position: absolute;
  bottom: -150px;
  width: 100%;
}

</style>
