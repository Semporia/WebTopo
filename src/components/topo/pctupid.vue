<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="上传" :label-width="formLabelWidth">
        <el-upload
          :class="{ hide: hideUpload }"
          action="/api/drag/imgadd"
          ref="upload"
          list-type="picture-card"
          :on-success="handleAvatarSuccess"
          :data="uploadData"
          :before-upload="beforeAvatarUpload"
          :on-change="onchange"
          :file-list="fileList"
          :on-remove="onremove"
          :auto-upload="false"
          :limit="1"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取项目图片</el-button
          >
        </el-upload>
      </el-form-item>

      <el-form-item label="项目名称" :label-width="formLabelWidth">
        <span>{{ form.projectname }}</span>
        <!-- <el-select v-model="form.projectname" placeholder="请选择">
                <el-option
                  v-for="item in Projectnametlist"
                  :key="item"
                  :label="item"
                  :value="item">
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
      <el-button type="primary" @click="submitUpload()">添 加(id)</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "Pctup",
  props: [
  
  'componentadata',
    "showname",
    "Projectnametlist",
  ],
   computed: {
    ...mapState({
      topoData: (state) => state.topoEditor.topoData,
    }),
   },
  data() {
    return {
      uploadUrl: "/api/drag/imgadd",
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
      fileList: [
        {
          name: "",
          url: "",
        },
      ],
      formLabelWidth: "120px",
      imageUrl: "",
      uploadData: {},
      isimg: true,
      hideUpload: false,
    };
  },
  watch: {
          'topoData.name': function(newVal){
              this.form.projectname = this.topoData.name
          },
        
      },
  mounted: function () {
    
    console.log(this.topoData);
    this.form.projectname = this.topoData.name
    this.form.user_account = localStorage.getItem("user_account");
    this.form.dargjsondata = JSON.stringify(this.topoData)

    this.form.project_showname = this.componentadata.project_showname;
    this.hideUpload = this.fileList.length >= 1;
    this.form.comment = this.componentadata.comment;
    this.fileList[0].name = "图片";
    this.fileList[0].url = this.componentadata.project_image;
     let imgUrl = String.raw `${ this.componentadata.project_image}`
          // console.log("http://"+window.location.hostname+ imgUrl.split('').slice(16).toString().replace(/,/g, ""));
   this.fileList[0].url ="http://"+ window.location.hostname + imgUrl.split('').slice(16).toString().replace(/,/g, "")
  
   
  },
  methods: {
    ...mapMutations("topoEditor", ["gettopoEditor"]),
    //字符串转json
    // getjsonprojectname() {
    //   let jsondata = JSON.parse(this.dargjsondata);
    //   return jsondata;
    // },
    submitUpload(formName) {
      // console.log( typeof());
      let data = this.topoData;
      data.name = this.form.projectname;

      this.uploadData.id = this.componentadata._id;
      this.$refs.upload.submit();
      this.$axios
        .post("/api/drag/change", {
          projectname: this.form.projectname,
          project_showname: this.form.project_showname,
          dargjsondata: JSON.stringify(data),
          comment: this.form.comment,
          id: this.componentadata._id,
        })
        .then((res) => {
          console.log(res);
          this.$message({ message: "修改成功", type: "success" });
          localStorage.setItem("topoData", this.topoData);
          this.gettopoEditor(data);
          this.$emit("saveData");
        });
    },
    onchange() {
      
      this.hideUpload = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onremove() {
      console.log("shang");
      this.hideUpload = false;
    },
    

  },
};
</script>
<style  >
.upload-demo .el-upload:hover {
  border-color: #409eff;
}
.pctimg {
  width: 150px;
  height: 120px;
  border-radius: 20px;
}
.hide .el-upload--picture-card {
  display: none;
}
</style>