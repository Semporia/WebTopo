<template>
  <div>
    <el-table :data="componentdata" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="创建人" width="100"></el-table-column>
      <el-table-column prop="showname" label="创建人" width="100"></el-table-column>
      <el-table-column prop="projectname" label="项目名称" width="280"></el-table-column>
      <el-table-column prop="create_date" label="日期" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">导入</el-button>
          <el-button @click="delClick(scope.row)" type="warning" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currentchange"
      background
      layout="prev, pager, next"
      :total="totalnum"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Topotable',
  components: {},
   props: {
       componentdata: {},
       totalnum:{
           type: Number,
       }
   },
  data() {
    return {
    
      page_size: 10,
      current_page: 1,
    };
  },
  mounted: function () {
   console.log(this.componentdata)
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
    }
  },
};
</script>