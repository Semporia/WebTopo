<template>
  <div  style="padding: 10px 0 0 20px" class="main_div">
    <h6 class="h6"><i class="el-icon-edit"></i>设置</h6>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="展示用户">
        <el-select v-model="form.region" placeholder="展示用户">
          <el-option
            v-for="item in userDatalist"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
        <span :href="userUrl" target="_blank" type="primary">{{
          userUrl
        }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button
          class="tag-read"
          :data-clipboard-text="userUrl"
          @click="copy"
          >复制地址</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
export default {
  name: "Setproject",
  props: ["userDatalist", "userUrl", "componentdataVal"],
  data() {
    return {
      form: {
        name: "",
        region: "",
      },
      centerDialogVisible: true,
    };
  },

  mounted() {
    this.form.name = this.componentdataVal.projectname;
    this.form.region = this.componentdataVal.project_showname;
    console.log(this.componentdataVal);
    
	
	
  },
  methods: {
    onSubmit() {
      let updata_pct = {
        projectname: this.form.name,
        project_showname: this.form.region,
        id: this.componentdataVal._id,
      };
      this.$axios.post("/api/drag/change", updata_pct).then((res) => {
        if (res.data.ret_code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$emit("closedialog");
        } else {
        }
      });
    },
    copy() {
       
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", (e) => {
        this.$message({
          message: "复制成功",
          type: "success",
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
  },
};
</script>
<style scoped>
h6{ margin: 5px;}
  .main_div{ background: #fff; height: 400px;}
  .el-form{ padding: 0 50px 0 30px;}
</style>