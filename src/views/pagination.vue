<!--
  by nickctang
  自定义分页组件
  传入参数： count、emitEvent(切换该字段，用于控制，让!emitEvent即可)
  触发事件：pageChange(limit, offset)
  limit是每页显示数量，offset是偏移量
 -->
 
<template>
  <div class="row q-my-md fs-14 bottomstyle" >
    <span class="self-center col-auto q-pb-sm q-mt-md q-mr-md">共{{count}}条，第{{ page }} /{{max}}页</span>
    <!-- <q-select
      class="col-auto self-center q-mr-md q-mt-md"
      style="width: 90px"
      v-model="perPageNum"
      :options="perPageNumOptions"
    /> -->
    <q-pagination class="col q-mt-md" v-model="page"  :max="max"  boundary-links boundary-numbers :max-pages="10" direction-links ellipses />
  </div>
</template>

<script>

export default {
  name: 'CPagination',
  data () {
    return {
      pagination: {
        offset: 0,
        limit: 10
      },
      perPageNumOptions: [
        {
          label: '每页10条',
          value: 10
        },
        {
          label: '每页20条',
          value: 20
        },
        {
          label: '每页50条',
          value: 50
        },
        {
          label: '每页100条',
          value: 100
        }
      ],
      pageChangeFlag: false
    }
  },
  watch: {
    // 每页显示数量改变即触发事件
    'pagination.limit': function () {
          console.log('每页显示数量改变即触发事件');
      if (!this.pageChangeFlag) {
        this.$emit('pageChange', this.pagination.limit, this.pagination.offset)
      } else {
        this.pageChangeFlag = false
      }
    },
    // 偏移量改变即触发事件
    'pagination.offset': function () {
          console.log('偏移量改变即触发事件');
      this.$emit('pageChange', this.pagination.limit, this.pagination.offset)
    },
    // 改变emitEvent强制触发事件
    'emitEvent': function () {
          console.log('改变emitEvent强制触发事件');
      if (this.pagination.offset === 1) {
        this.$emit('pageChange', this.pagination.limit, this.pagination.offset)
      } else {
        this.pagination.offset = 1
      }
    }
  },
  created () {
    // 默认首次就触发事件
    if(!this.isboolean){
      this.$emit('pageChange', this.pagination.limit, this.pagination.offset)
    }
  
  
  },
  computed: {
    page: {
      get: function () {
        if (this.count === 0) {
          return 0
        }
        // 偏移量/每页显示数量 向下取整 + 1
        return Math.floor(this.pagination.offset / this.pagination.limit) + 1
      },
      set: function (val) {
        // 页码改变动态的更新偏移量
        this.pagination.offset = (val - 1) * this.perPageNum
      }
    },
    perPageNum: {
      get: function () {
        return this.pagination.limit
      },
      set: function (val) {
        if (val !== this.perPageNum) {
          this.pagination.limit = val
          // 进行每页显示数量切换时，判断当前偏移量是否大于改变后的偏移量，如果是，则不触发limit改变的事件，因为偏移量的改变也会触发
          if (this.pagination.offset > (Math.floor(this.pagination.offset / val)) * val) {
            this.pageChangeFlag = true
          }
        }
      }
    },
    max: function () {
      // 最大页数，总数/每页显示数量，向上取整
      return Math.ceil(this.count / this.perPageNum)
    }
  },
  props: {
    count: {
      required: true
    },
    emitEvent: {
      required: true,
      default: false
    },
    isboolean: {
      required: false,
    },
  }
}
</script>
<style  scoped>
    .bottomstyle{
        position: fixed;
        bottom:0px;
        right: 50px;
    }
</style>
