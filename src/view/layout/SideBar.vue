<template>
    <div style="height:100px">
        <ul class="kd-side-list" v-for="item in routers"> 
            <router-link tag="li" :to="item.path">
                <img :src="item.icon" class="kd-side-icon">
                <span class="kd-side-text">{{item.name}}</span>
                <i class="el-icon-arrow-right kd-side-float"></i>
            </router-link> 
        </ul>
    </div>
</template>
<script>
import {constListMap} from '@/router'
export default {
    data() {
        return {
            routers:constListMap
        }
    } 
}
</script>
