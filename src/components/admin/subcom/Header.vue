<template>
    <div class="header">
        <!-- @command绑定属性 -->
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <span>你好,{{uname}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">退出登陆</el-dropdown-item>
                <el-dropdown-item command="b">修改密码</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      uname: localStorage.getItem("uname")
    };
  },

  methods: {
    //   登出
    logout() {
      this.$http.get(this.$api.logout).then((res)=>{
          if(res.data.status==0) {
              this.$router.push({name:'Login'})
          }
      })
    },
    handleCommand(command) {
        // 通过command判断点击的是哪个属性
      if (command == "a") {
        this.logout();
      }
    }
  }
};
</script>

<style scoped>
    .header {
        text-align: right;
    }
</style>