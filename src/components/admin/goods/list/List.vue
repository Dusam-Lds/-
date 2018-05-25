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
        <!-- 表格 -->
        <!-- data属性用来配置表格数据  -->
        <el-table ref="multipleTable" :data="tableData3" style="width: 100%" >
            <!-- type为selection, 即多选框 -->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!-- 里面的template用来自定义表格中的内容与数据, 相比较prop属性的方式, 更加灵活, 可以对数据进行标签包裹 （两种不同的写法）-->
            <el-table-column label="标题">
                <template slot-scope="scope">
                    <!-- slot-scope是不可或缺的  scope.row.渲染也是固定不变的 -->
                    <router-link :to="{name:'GoodsDetail'}">{{ scope.row.title }}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="categoryname" label="所属类别" width="120">
            </el-table-column>
            <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="market_price" label="市场价" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sell_price" label="销售价" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="address" label="属性" width="120" show-overflow-tooltip>
                <template slot-scope="scope">属性图标</template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <router-link to="">删除  增加</router-link>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //获取分类列表
      getDataList() {
           this.$http.get(this.$api.gsList+'?pageIndex=1&pageSize=10').then((res)=>{
                console.log(res);
                if(res.data.status==0) {
                    this.tableData3=res.data.message;
                }
           })
      },
    },
    //页面加载后执行
    created() {
        this.getDataList();
        
    }
  }
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
  a {
      color: #666;
  }
}
</style>