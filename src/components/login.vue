<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>农业资源管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "login",
      data() {
          return{
            loginForm: {
              username: '',
              password: '',
            },
            rules: {
              username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ],
            },
          }
      },
      methods: {
          async submitForm(formName) {
            this.$refs.loginForm.validate(valid => {
              if (valid) {
                this.$axios.post('/login/', this.loginForm)
                  .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                      this.$store.commit('SET_TOKEN', response.data.token)
                      this.$store.commit('GET_USER', response.data.username)
                      this.$message({
                        message: '登陆成功',
                        type: 'success'
                      })
                      this.$router.push({path:'/manage',query:{user:response.data.username}})
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
              } else {
                console.log('error submit!!')
                return false
              }
            })
            // let url = '/login/'
            // let _this = this;
            // _this.$axios.post(url,this.loginForm)
            //   .then(function (response) {
            //     console.log(response)
                // let u = response.data.user;
                // let t = response.data.is_staff;
                // _this.$router.push({path:'/manage',query:{user:u,right:t}});
            //   }).catch(function (error) {
            //   console.log(error);
            // })
          }
      }
    }
</script>

<style lang="less" scoped>
  @import '../style/mixin';
  .login_page{
    background-color: #324057;
  }
  .manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p{
      font-size: 34px;
      color: #fff;
    }
  }
  .form_contianer{
    .wh(320px, 210px);
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn{
      width: 100%;
      font-size: 16px;
    }
  }
  .tip{
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
