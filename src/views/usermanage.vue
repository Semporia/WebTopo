<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs
        separator="---"
        class="text-orange"
        active-color="secondary"
      >
        <q-breadcrumbs-el label="首页" icon="home" />
        <q-breadcrumbs-el label="用户中心" icon="widgets" />
        <!-- <q-breadcrumbs-el label="管理中心"" icon="navigation" /> -->
      </q-breadcrumbs>
     
      <q-btn color="primary" label="新建测试用户" @click="alert = true" />
      <Usertable
        :tabledata="tabledata"
        :totalv="totalv"
        @currentchange="currentchange"
        @delClick="delClick"
      ></Usertable>
    </div>
    <q-dialog title="用户注册" v-model="alert" :content-style="{ width: '50%' }" center>
      <Register @closeDialog="closedialog"></Register>
    </q-dialog>
  </div>
</template>
<script>
import Register from "./Register";
import Usertable from "./usertable";
export default {
  name: "Usermanage",
  components: {
    Usertable,
    Register,
  },
  data() {
    return {
      page_size: 10,
      current_page: 1,
      alert: false,
      tabledata: [],
      totalv: 0,
    };
  },
  mounted: function () {
    this.userlist();

    // this.pageChange();
  },
  methods: {
    async userlist(cpage) {
      let username = localStorage.getItem("user_account");
      this.current_page = cpage ? cpage : this.current_page;
      let ndata = {
        user_account: username,
        page_size: this.page_size,
        current_page: this.current_page,
      };
      this.tabledata.length = 0;
      await this.$axios.post("/api/drag/userlist", ndata).then((res) => {
        res.data.extra.map((item) => {
          let arr = {};
          arr.user_detail = item.user_prov + item.user_city + item.user_detail;
          arr.user_account = item.user_account;
          arr.user_belong = item.user_belong;
          arr.user_region = item.user_region;
          arr.user_phone = item.user_phone;
          arr.user_password = item.user_password;
          arr.user_create_time = item.user_create_time;
          arr.id = item._id;
          this.tabledata.push(arr);
        });
        console.log(this.tabledata);
        this.totalv = res.data.total;
      });
    },
    closedialog() {
      this.alert = false;
      this.userlist(this.current_page);
    },
    delClick(val) {
      let self = this;
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          self.$axios
            .post("/api/drag/list", {
              project_showname: val.user_account,
              page_size: 10,
              current_page: 1,
            })
            .then((res) => {
              if (res.data.total == 0) {
                self.$axios
                  .post("/api/admin/delete", { user_account:  val.user_account })
                  .then(function (res) {
                    if (res.data.ret_code == 0) {
                      self.userlist()
                      self.$message({
                        message: res.data.ret_msg,
                        type: "success",
                      });
                    }
                  });
              } else {
                this.$message({
                  type: "error",
                  message:
                    "删除失败！！！该用户名下还有" +
                    res.data.total +
                    "数据未删",
                });
              }
              console.log(res.data.total);
            });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // console.log(val);
    },
    currentchange(val) {
      this.userlist(val);
    },
  },
};
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 240px;
}
.title {
  float: left;
}
.text-h6 {
  font-size: 1rem;
}
.fullscreen .q-card {
  width: 600px;
  height: 500px;
}
</style>