<template>
 

    <div class="q-pa-md">
    <div class="q-gutter-sm row items-start">
      <q-uploader
        url="http://localhost:4444/upload"
        style="max-width: 300px"
      />
    


    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitUpload('form')">添 加</el-button>
      
    </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Pctup",
  props: ["projectname", "dargjsondata", "componentadata"],
  data() {
    return {
      uploadUrl: "/api/drag/add",
      dialogFormVisible: false,
      form: {
        file_name: "",
        projectname: "",
        user_account: "",
        project_showname: "",
        project_image: "",
        dargjsondata: "",
        comment: "",
      },
      rules: {
        projectname: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      fileList: [
        // {
        //   name: "",
        //   url: "",
        // },
      ],
      imgurl: "",
      isimg: true,
    };
  },
  mounted: function () {
    this.form.projectname = this.projectname;
    this.form.user_account = localStorage.getItem("user_account");
    this.form.dargjsondata = this.dargjsondata;
    console.log(this.dargjsondata);
    console.log(this.componentadata);
    if (this.componentadata) {
      console.log('this.componentadata');
      this.form.project_name = this.componentadata.projectname;
      this.form.project_showname = this.componentadata.project_showname;
      this.form.comment = this.componentadata.comment;
      // this.fileList[0].name = "";
      // this.fileList[0].url = this.componentadata.project_image;
    }
  },
  methods: {
    submitUpload(formName) {
      console.log(formName)
      // let reader = new FileReader();
      // reader.onload = function (f) {};
      // //reader.readAsBinaryString(fileList[0]);
      // reader.readAsBinaryString(file.raw);
      
      let self = this;
     
      if(this.isimg){
        console.log("ddd");
      }else{
          self.$refs[formName].validate(function (valid) {
        if (valid) {
           console.log( self.$refs.upload.submit());
          self.$refs.upload.submit();
        } else {
          console.log("验证失败");
          return false;
        }
      });
      }
      
    },
    beforeUpload: function (file) {
      console.log("beforeUpload", file.name);
      //this.form.file_name = file.name;
      return true;
    },
    handleSuccess: function (response, file, fileList) {
      console.log("handleSuccess", file.name);
      let self = this;
      if (response.ret_code == 0) {
        this.$message({ message: "创建成功", type: "success" });
        this.isimg = false;
      } else {
        this.$message.error("创建失败");
      }
      self.fileList = [];
      self.form.project_name = "";
      self.form.user_account = this.projectname;
      self.form.project_showname = "";
      self.form.comment = "";
      //this.fullscreenLoading  = false;
      this.form.dargjsondata = this.dargjsondata;
      //   self.dialogFormVisible = false;
      self.$refs.upload.clearFiles();
      this.$emit("saveData");
      //   this.getProjectList(self.currentPage, self.page_size);
    },
    handleError: function (err, file, fileList) {
      console.log("handleError", file.name);
      this.$message("操作失败");
      this.$refs.upload.clearFiles();
    },
    handleChange: function (file, fileList) {
      console.log(file);
      console.log("handleChange", file.name);
      
      let reader = new FileReader();
      reader.onload = function (f) {};
      //reader.readAsBinaryString(fileList[0]);
      reader.readAsBinaryString(file.raw);
    },
    // saveData() {
    //   let that = this;
    //   let name_p = this.showname === "" ? this.shownamev : this.showname;

    //   console.log(localStorage.getItem("user_account"));
    //   this.$axios
    //     .post("/api/drag/add", {
    //       username: localStorage.getItem("user_account"),
    //       showname: name_p,
    //       projectname: that.projectname,
    //       dargjsondata: JSON.stringify(this.configData),
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data.ret_code == 200) {
    //         that.alert_two = false;
    //         that.$message({
    //           message: "添加成功",
    //           type: "success",
    //         });
    //       }
    //     });
    //   localStorage.setItem("topoData", JSON.stringify(this.configData));
    // },
  },
};
</script>
<style  scoped>
.upload-demo .el-upload:hover {
  border-color: #409eff;
}
.pctimg {
  width: 150px;
  height: 120px;
  border-radius: 20px;
}
</style>