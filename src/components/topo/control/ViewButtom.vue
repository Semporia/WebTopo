<template>
<div class="view-buttom">
    <template v-if="buttomdata.isclick">
        <img style="width:100%;height:100%;" :src="buttomdata.url"  @dragstart.prevent    />
    </template>
    <template v-else>
        <img style="width:100%;height:100%;" :src="buttomdata.url"  @dragstart.prevent  />
    </template>
</div>
</template>

<script>
import { updateLocale } from 'moment';
import BaseView from './View';


export default {
    name: 'view-buttom',
    extends: BaseView,
    props: {
    },
    computed: {
       
    },
    components: {
        
    },
    data() {
        return {
            buttomdata:{
                 isclick : true,
                 identifier: this.detail.identifier,
                 url:this.detail.style.url
            },
        }
    },
    methods: {
    //    ...mapMutations('topoEditor',[
    //         'buttomupdata',
    //     ]),

       onchecked(){ 
       }
    },
    mounted:function(){
    },
   
}
</script>

<style lang="scss">
.view-buttom {
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>