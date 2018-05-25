<template>
    <div class="list">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 按钮&搜索框 -->
        <div class="list_btns">
            <el-button size="small" icon="el-icon-plus">新增</el-button>
            <el-button size="small" icon="el-icon-check">全选</el-button>
            <el-button size="small" icon="el-icon-delete">删除</el-button>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
    .list {
        &_btns {
            padding-top: 30px;
            .el-input {
                width: 200px;
                float: right;
            }
        }
    }
</style>