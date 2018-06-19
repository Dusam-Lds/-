<template>
    <div>
        动态组件的创建
        <ul>
            <li @click='a="index"'>首页</li>
            <li @click='a="second"'>二页</li>
        </ul>
        <component :is="a"></component>
    </div>
</template>

<script>
    import Vue from 'vue'
    Vue.component('index',{
        template:`<div class="aa">组件一</div>`
    })
    Vue.component('second',{
        template:`<div>组件二</div>`
    })
    export default {
        data() {
            return {
                a:''
            }
        }
    }
</script>

<style scoped>
.aa {
    color:red;
}
</style>