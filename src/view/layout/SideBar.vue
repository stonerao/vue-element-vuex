<template>
    <div style="height:100px">
        <ul class="kd-side-list" v-for="item in routers">
            <router-link tag="li" :to="item.path" :style="{'padding-left':show?'':'30%'}">
                <img :src="$route.path!=item.redirect?item.iconActive:item.icon" class="kd-side-icon">
                <span class="kd-side-text" v-if="show">{{item.name}}</span>
                <i class="el-icon-arrow-right kd-side-float"  v-if="show"></i>
            </router-link>
        </ul>
        <div class="kd-toggle" @click="toggle">--</div>
    </div>
</template>
<script>
import { constListMap } from '@/router'
export default {
    data() {
        return {
            routers: constListMap,
            show: true,
        }
    },
    created() {
    },
    methods: {
        toggle() {
            this.show = !this.show;
            this.$emit("Toggle",this.show)
        }
    }
}
</script>
