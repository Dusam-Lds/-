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
            <el-button size="small" icon="el-icon-check" @click="all">全选</el-button>
            <el-button size="small" icon="el-icon-delete" @click="delData">删除</el-button>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="apiQuery.searchvalue" @blur="search"></el-input>
        </div>
        <!-- 表格 -->
        <!-- data属性用来配置表格数据  -->
        <el-table @selection-change="change" ref="multipleTable" :data="tableData3" style="width: 100%" >
            <!-- type为selection, 即多选框 -->
            <el-table-column type="selection" width="55" >
            </el-table-column>
            <!-- 里面的template用来自定义表格中的内容与数据, 相比较prop属性的方式, 更加灵活, 可以对数据进行标签包裹 （两种不同的写法）-->
            <el-table-column label="标题">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" placement="right">
                        <!-- slot-scope是不可或缺的  scope.row.渲染也是固定不变的  scope就是上面的tableData3-->
                        <router-link :to="{path:`goods/detail/${scope.row.id}`}">{{ scope.row.title }}</router-link>
                        <div slot="content"><img :src="scope.row.imgurl" alt="商品图片" style="width:200px"></div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <!-- 当前列要展示对象中的那个字段的值, 就配置prop属性为那个字段名 -->
            <el-table-column prop="categoryname" label="所属类别" width="120">
            </el-table-column>
            <el-table-column prop="stock_quantity" label="库存" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="market_price" label="市场价" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sell_price" label="销售价" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="address" label="属性" width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                    <!-- 轮播图: is_slide -->
                    <span :class="['el-icon-picture',scope.row.is_slide==1?'active':'']"></span>
                    <!-- 指定: is_top -->
                    <span :class="['el-icon-upload2',scope.row.is_top==1?'active':'']"></span>
                    <!-- 推荐: is_hot -->
                    <span :class="['el-icon-star-off',scope.row.is_hot==1?'active':'']"></span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <router-link :to="{path:`goods/detail/${scope.row.id}`}">编辑</router-link>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <!-- total用来设定数据总数, current-page用来设定当前页, page-size用来设定当前每页数量  -->
        <el-pagination :total="apiQuery.totalcount" :page-size="apiQuery.pageSize" :current-page="apiQuery.pageIndex"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6, 8]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
      return {
        apiQuery: {
            searchvalue: '',
            pageIndex: 1,
            pageSize: 10,
            totalcount: 0
        },
        delSelectionData: [],//删除第选中数据
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      }
    },

    methods: {
    //   搜索
      search() {
          this.getDataList();
      },
      //删除数据
      delData() {
          //先获取数据，然后删除，再重新获取数据渲染
          let selectionID = this.delSelectionData.map(v=>v.id)//返回这个数组中的id
          this.$http.get(this.$api.gsDel+selectionID).then((res)=>{
              if(res.data.status==0) {
                  this.getDataList();
              }
          })
      },
      //当选择项发生变化时会触发该事件，并返回反选中的数据
      change(selection) {
          this.delSelectionData = selection;
      },
      //全选按钮，调用按钮的点击事件
      all() {
          document.querySelector('.el-checkbox__inner').click();
      },
      //获取分类列表
      getDataList() {
          // 这个接口需要pageIndex指定页, pageSize指定每页数量, searchvalue用于商品搜索
          let api = `${this.$api.gsList}?pageIndex=${this.apiQuery.pageIndex}&pageSize=${this.apiQuery.pageSize}&searchvalue=${this.apiQuery.searchvalue}`
           this.$http.get(api).then((res)=>{
               console.log(res.data.message)
                if(res.data.status==0) {
                    this.tableData3=res.data.message;// 把请求回来的数据覆盖原data数量, 表格就会自动刷新
                    this.apiQuery.totalcount = res.data.totalcount;// 把后端接口返回的数量总量赋值给分页组件总数量
                }
           })
      },
    //  每页条数发生改时 
      handleSizeChange(size) {
        //   console.log(size)
        this.apiQuery.pageSize = size;// 接收到新的页面, 赋值给data里的数量, 分页组件就会刷新视图(组件内自带的参数)
        this.getDataList();// 除了分页组件视图要变更, 表格也要重新获取数据渲染
      },
    // 当前页发生改变时  
      handleCurrentChange(currentPage) {
        //   console.log(currentPage)
        this.apiQuery.pageIndex = currentPage;// 接收到新的每页数量, 赋值给data里的数量, 分页组件就会刷新视图(组件内自带的参数)
        this.getDataList();// 除了分页组件视图要变更, 表格也要重新获取数据渲染
      }
    },
    // 页面一上来就自动调用接口获取表格数据进行展示
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
  [class^=el-icon].active {
      color: #000;
      font-weight: bold;
  }
}
</style>