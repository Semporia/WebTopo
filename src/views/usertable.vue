<template>
  <div>
    <el-table :data="tabledata" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="user_account" label="用户名" width="100"></el-table-column>
      <el-table-column prop="user_belong" label="创建者" width="100"></el-table-column>
      <el-table-column prop="user_region" label="公司名称" width="280"></el-table-column>
      <el-table-column prop="user_detail" label="地址" width="380"></el-table-column>
      <el-table-column prop="user_phone" label="手机号" width="150"></el-table-column>
       <el-table-column prop="user_password" label="密码" width="150"></el-table-column>
       <el-table-column prop="user_create_time" sortable label="创建时间" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="delClick(scope.row)" type="warning" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentchange"
      background
      layout="prev, pager, next"
      :current-change = 'currentchange'
      :total="totalv"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Topotable',
  components: {},
   props: {
       tabledata:{},
       totalv:0
   },
  data() {
    return {
      page_size: 10,
      current_page: 1,
      newtabledata:[],
      
    };
  },
  mounted: function () {
    console.log(this.tabledata);
    console.log( this.newtabledata);

  },
  methods: {
    
    currentchange(val) {
        // console.log(val);
        this.$emit('getData',val)
        // this.$emit('current_page',val)
    },
    delClick(row){
        this.$emit('delClick',row)
      
    },
    handleClick(row){
        this.$emit('handleClick',row)
    },
    currentchange(val){
         this.$emit('currentchange',val)
    }
  },
};
</script>
<style scoped>
  .el-pagination{
     margin: 20px 0 0;
  }
</style>