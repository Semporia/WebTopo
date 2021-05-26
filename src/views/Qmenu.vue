<template>
  <div>
    <!-- 动态菜单 -->
    <q-list>
      <q-item clickable v-ripple v-for="(item,index) in menuList" :key="item.label" @click="clickmenuList(index)">
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section>
                {{item.label}}
              </q-item-section>
     </q-item>

      <!-- <Myitem :my-router="menuList" :init-level="0"/> -->
    </q-list>
  </div>
</template>

<script>

 import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: 'my-q-menu',
  
   computed: {
       ...mapState({
      Projectnametlist: (state) => state.example.Projectnametlist,
    }),
   },
   watch: {
        //   'Projectnametlist': function(){
        //     this.Projectnametlist.map(item =>{  
        //     let arr ={}
        //     arr.icon = 'perm_identity'
        //     arr.label = item
        //     arr.path = `/Facility?id=${item}`
        //     this.menuList[2].children.push(arr)   
        // })
        //   },
          
      },
  data () {
    return {
      menuList: [
        {
          icon: "inbox",
          label: "项目管理",
          path: '/Projectmanage',
          separator: true,
        },
        {
          icon: "send",
          label: "用户中心",
            path: '/usermanage',
          separator: false,
        },
        {
          icon: 'inbox',
          label: '设备管理',
          path: '/Facility',
         
        },
      ],
    
    }
  },
  mounted(){
    
    
    
  },
  methods:{
   clickmenuList(val){
     switch (val) {
       case 0:
        this.$router.push('/Projectmanage') 
         break;
       case 1:
        this.$router.push('/usermanage') 
         break;
           case 2:
        this.$router.push('/Facility') 
         break;
       default:
         break;
     }
     console.log(val);
   }

  }

}
</script>
<style>
  .justify-center{ padding: 0 !important;}
</style>