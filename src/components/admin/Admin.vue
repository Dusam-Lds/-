<template>
    <div class="admin">
        <el-container>
            <!-- 公共头部 -->
            <el-header>
                <app-header></app-header>
            </el-header>
            <el-container>
                <!-- 公共左侧 -->
                <app-aside class="app-aside">Aside</app-aside>
                <el-main>
                    <!-- 变化的后台管理子页面 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from "./subcom/Header";
import Aside from "./subcom/Aside";
export default {
  name: "Admin",
  components: {
    appHeader: Header,
    appAside: Aside
  }
};
</script>

<style scoped lang="less">
    .admin {
        height: 100%;
        .el-header {
            line-height: 60px;
            background: #ccc;
        }
        .el-container {
            height: 100%;
            .app-aside {
                width: 201px;
            }
        }
        
    }
</style>