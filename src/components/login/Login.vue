<template>
    <div class="login">
        <section>
            <!-- :model表单数据对象   :rules表单的校验规则 -->
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-position="top" label-width="100px" class="demo-ruleForm">
                <!-- prop指定当前表单代表的字段名(可省, 但如需要表单校验与重置功能, 必须写) -->
                <el-form-item label="账号" prop="uname">
                    <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="upwd">
                    <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
      // 校验函数, rule可以拿到被校验字段的信息与校验规则, value可以拿到字段的值
      // 如果校验通过必须调用callback, 不通过不要调用
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm2.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
         // 这里的字段要按照接口文档进行修改
      ruleForm2: {
        upwd: "123456",
        uname: "admin",
      },
      rules2: {
          // 这里添加的校验规则, 每个字段可以加多个, 所以是个数组
        uname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        upwd: [{ required: true, message: '请输入你的密码', trigger: 'blur' }],
      }
    };
  },
  methods: {
    login() {
        // post请求的第二个参数是发送的数据, 这里直接把data里的表单对象传过去
        this.$http.post(this.$api.login,this.ruleForm2).then((res)=>{            
            if(res.data.status==0) {
                this.$alert('登陆成功');
            }else {
                this.$alert('res.data.message');
            }
        })
    },
    // 登陆按钮方法     
    // this.$refs用来获取页面中的元素或组件, 这里通过它拿到form表单组件, 调用validate方法, 给所有表单进行校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.$alert('你的输入不正确');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="less">
    .login {
      height: 100%;
      background: skyblue;
      section {
        width: 400px;
        height: 300px;
        border: 1px solid #fff;
        border-radius: 5px;
        margin: 0 auto;
        padding: 10px 20px;
        position:relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
</style>