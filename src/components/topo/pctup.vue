<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="上传" :label-width="formLabelWidth">
        <el-upload
          class="upload-demo"
          ref="upload"
          name="file_name"
          with-credentials
          :limit="1"
          :action="uploadUrl"
          :data="form"
          :beforeUpload="beforeUpload"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="fileList"
          list-type="picture-card"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取项目图片</el-button
          >
        </el-upload>
      </el-form-item>

      <el-form-item label="项目名称" :label-width="formLabelWidth">
         <span>{{form.projectname}}</span>
        <!-- <el-select v-model="form.projectname" placeholder="请选择">
          <el-option
            v-for="item in Projectnametlist"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select> -->
      </el-form-item>

      <el-form-item label="展示用户名" :label-width="formLabelWidth">
        <el-select v-model="form.project_showname" placeholder="请选择">
          <el-option
            v-for="item in showname"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="备注说明"
        prop="comment"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.comment"
          class="diainp"
          auto-complete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitUpload('form')">添 加</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "Pctup",
  props: [
   'showname',
  ],
   computed: {
    ...mapState({
      topoData: (state) => state.topoEditor.topoData,
    }),
   },
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
      fileList: [],
      imgurl: "",
      isimg: true,
    };
  },
   watch: {
          'topoData.name': function(newVal){
              this.form.projectname = this.topoData.name
          },
        
      },
  mounted: function () {
    this.form.projectname = this.topoData.name
    this.form.user_account = localStorage.getItem("user_account");
    console.log(this.topoData);
    this.form.dargjsondata = JSON.stringify(this.topoData);
  },
  methods: {
    ...mapMutations("topoEditor", ["gettopoEditor"]),
   submitUpload(formName) {
      let data =this.topoData;
      data.name = this.form.projectname;
      this.form.dargjsondata = JSON.stringify(data)
      this.gettopoEditor(data);
      if (this.form.projectname == "图层") {
        // alert(this.form.projectname)
        this.$message.error("请选者项目名");
      } else {
        let self = this;
        self.$refs[formName].validate(function (valid) {
          if (valid) {
            self.$refs.upload.submit();
            localStorage.setItem("topoData", JSON.stringify(data));
            self.$emit("saveData");
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
      self.form.project_name = this.projectname;
      self.form.user_account = localStorage.getItem("user_account");
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
      console.log("handleChange", file.name);
      let reader = new FileReader();
      reader.onload = function (f) {};
      //reader.readAsBinaryString(fileList[0]);
      reader.readAsBinaryString(file.raw);
    },
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