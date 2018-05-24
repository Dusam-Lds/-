<template>
    <div>
        <app-header></app-header>
        <app-aside></app-aside>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from './subcom/Header'
import Aside from './subcom/Aside'
    export default {
        name:'Admin',
        components: {
            appHeader: Header,
            appAside: Aside
        }
    }
</script>

<style scoped>

</style>