<template>
<div class="view-text" :style="{
        fontSize: detail.style.fontSize + 'px',
        fontFamily: detail.style.fontFamily,
        color: detail.style.foreColor,
        textAlign: textAlign,
        lineHeight: lineHeight + 'px',
    }">
    {{detail.style.text}}
    <span class="unit" >{{sensor_unit}}</span>
</div>
</template>

<script>

import BaseView from './View';

export default {
    name: 'view-text',
    extends: BaseView,
    props: ['detail'],
    watch:{
       
    },
    data(){
        return {
            sensor_unit:this.detail.dataBind.queryParam.sensor_unit,
        }
    },
    methods: {
    },
    mounted(){
       
        //   if( isNaN(this.detail.style.text) == true){
        //        console.log(this.detail.style.text);
        //   }
    }
}
</script>

<style lang="scss">
.view-text {
    height: 100%;
    width: 100%;
}
.unit{ font-size: 14px;}
</style>
