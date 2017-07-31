<template>
    <div>
        <section class="kd-title">
            {{$route.name.substring(1)?$route.name.substring(1):titleText}}
        </section>
    </div>
</template> 
<script>
export default {
    props: ['titleText']
}
</script> 
<style scoped>

</style>
