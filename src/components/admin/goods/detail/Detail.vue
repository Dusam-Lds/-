<template>
    <div class="detail">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/admin'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'GoodsList'}">商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-width="80px" label-position="left" class="detail_form">
            <el-form-item label="内容标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="form.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="所属类别">
                <el-select v-model="form.category_id" placeholder="请选择">
                    <el-option :label="item.title" :value="item.category_id" v-for="item in category" :key="item.category_id">
                        <!-- option里面可以加标签覆盖label文本, 但是label属性还得必须要, 不然会报错 -->
                        <span v-if="item.class_layer==1">|--</span>
                        <span>{{item.title}}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否发布">
                <el-switch v-model="form.status"></el-switch>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-switch v-model="form.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="form.is_hot" active-text="推荐"></el-switch>
            </el-form-item>
            <el-form-item label="上传封面">
                <el-upload class="upload-demo" :on-success="uploadImg" :file-list="form.imgList" action="http://localhost:8899/admin/article/uploadimg" list-type="picture">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传附件">
                <!-- 我们要监听文件上传成功的事件, 事件触发时要拿到后端接口返回的数据, 把它保存到data的from里, 将来保存修改的时候使用 -->
                <el-upload class="upload-demo" :on-success="uploadFile" :file-list="form.fileList" action="http://localhost:8899/admin/article/uploadfile">
                    <el-button size="small" type="primary">上传附件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品货号">
                <el-input v-model="form.goods_no"></el-input>
            </el-form-item>
            <el-form-item label="库存数量">
                <el-input v-model="form.stock_quantity"></el-input>
            </el-form-item>
            <el-form-item label="市场价格">
                <el-input v-model="form.market_price"></el-input>
            </el-form-item>
            <el-form-item label="销售价格">
                <el-input v-model="form.sell_price"></el-input>
            </el-form-item>
            <el-form-item label="内容摘要">
                <el-input type="textarea" v-model="form.zhaiyao"></el-input>
            </el-form-item>
            <el-form-item label="详细内容">
                <quillEditor v-model="form.content"></quillEditor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="$router.go(-1)">返回上一页</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 富文本插件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {},
      // 页面一上来要从url里面拿到被编辑的商品ID
      id: this.$route.params.id,
      category: [],
    };
  },
  methods: {
    onSubmit() {
      this.$http.post(this.$api.gsEdit + this.id , this.form).then(res=>{
          if(res.data.status==0) {
              this.$alert('上传成功');
          }
      })
    },  
    // 获取商品数据
    getListDetail() {
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.form = res.data.message;
          this.form.category_id = +this.form.category_id; //后台返回的id是字符串，把它转换成数字
        }
      });
    },
    // 获取分类列表
    getCategoryList() {
      this.$http.get(this.$api.ctList + "goods").then(res => {
        if (res.data.status == 0) {
          this.category = res.data.message;
        }
      });
    },
    // 上传文件
    uploadFile(a) {
        this.form.fileList.push(a);// 把接口返回的数据保存起来, 供将来保存使用
    },
    //上传图片,只能上传一张
    uploadImg(b) {
        this.form.imgList = [b];// 把接口返回的数据保存起来, 供将来保存使用
    }
  },
  // 组件初始化完毕后就调用接口渲染表单默认数据
  created() {
    this.getListDetail();
    this.getCategoryList();
  },
  //注册组件
  components: {
    quillEditor
  }
};
</script>

<style scoped lang="less">
.detail {
  &_form {
    margin-top: 50px;
    width: 700px;
  }
}
</style>