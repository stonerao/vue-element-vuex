<template>
    <div>
        <section class="kd-bottom-box">
            {{txt}}
        </section>
    </div>
</template>

<script> 
import store from '@/utils/commos'
export default {
    data(){
        return{ 
            txt:""
        }
    },
    created(){  
        store.bottom.call(this);
    }
}
</script> 
<style scoped>
 
</style>
