<template>
    <div>
        <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <!-- 这里的index用来给当前菜单起个名字, 以区分 -->
            <el-submenu v-for="item in menu" :key="item.title" :index="item.title">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for="subItem in item.children" :key="subItem.title" :index="subItem.title">
                    <router-link :to="subItem.path">{{subItem.title}}</router-link>                            
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: "Aside",
    data() {
        return {
           //左侧导航数据
           menu: [
               {
                   title:'商品管理',
                   children: [
                       {title:'内容管理',path:'/admin/goods/list'},
                       {title:'分类管理',path:'/admin/goods/detail/:id'},
                       {title:'评论管理',path:'/admin/goods/comment'},
                   ]
                },
                {
                   title:'学生管理',
                   children: [
                       {title:'内容管理1',path:'/admin/goods'},
                       {title:'分类管理2',path:'/admin/categort'},
                       {title:'评论管理3',path:'/admin/comment'},
                   ]
                }
           ] 
        }
    }

};
</script>

<style scoped>
    .el-menu {
        height: 100%;
        
    }
    a {
        color: #fff;
    }
</style>