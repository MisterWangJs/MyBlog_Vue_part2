<template>
	<div class="login_register">

			<div class="login" v-show="showLogin">
        <h1 style="font-size: xx-large">Welcome to my bolg</h1>
        <hr style="font-size: xx-large">

					<p><label style="font-size: xx-large">账号：</label><input class="input" type="text" v-model="userName" placeholder="请输入用户名"/></p>
          <p><label style="font-size: xx-large">密码：</label><input class="input" :type="pwdType" @on-change="password"  v-model="password" placeholder="请输入6-16位密码"/> <img :src="seen?openeye:nopeneye"  style="width: 30px;height: 30px;" class="eye" alt="" @click="changeType()"></p>


        <span  v-on:click="ToRegister">注 册</span>
        <button class="button" v-on:click="login1">登 录</button>
			</div>

			<div class="register" v-show="showRegister">

        <p><label style="font-size: xx-large">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</label><input class="input"  maxlength="10" type="text" v-model="userName" placeholder="5-10位纯英文用户名"/></p>
        <p><label style="font-size: xx-large">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</label><input class="input"  maxlength="16" type="password" v-model="password1" placeholder="6-16位纯数字密码"/></p>
        <p><label style="font-size: xx-large">确认密码：</label><input class="input" maxlength="16" type="password" v-model="password2" placeholder="请再次输入密码"/></p>

					<span v-on:click="ToLogin">已有账号？马上登录</span>
        <button class="button" v-on:click="register1">注 册</button>
			</div>

		</div>


</template>
<script>
	import { setCookie,getCookie } from '../../assets/js/cookie.js'
	import {nemoMD5} from "../../assets/js/md5.js"
  import "../../assets/js/passwordStrength"
  import axios from 'axios'
	export default{

		data(){

			return{
				userName:'',
				password:'',
				password1: '',
				password2: '',
				showLogin: true,
				showRegister: false,
        seen:'',
        pwdType: 'password', // 密码类型
        openeye: require('@/assets/open.png'), //图片地址
        nopeneye: require('@/assets/close.png'), //图片地址


			}


		},
		methods: {

      changeType() {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
        this.seen = !this.seen;//小眼睛的变化
      },

      login1(){
        let _this=this;
        let that = this;
        if(that.userName == "" || this.password == ""){
          alert("用户名密码验证码不能为空")
        }else{
          let ua = navigator.userAgent;
          let url='http://localhost:9090/my_blog/login?&userName='+that.userName+'&password='+that.password;
          axios.post(url)
            .then(res=>{
              console.log(res.request.responseURL)
              _this.ok = res.data.ok;
              _this.msg = res.data.msg;
                console.log(res.data.ret);
                console.log(res.data.msg);

              if (_this.ok==1){

                setCookie('userName',this.userName,1000*60);
                this.$router.push('/Blog')
              }
              alert(that.msg)
            })
            .catch(err=>{
              console.log(err)
            })
        }
      },
			ToRegister(){
				this.showRegister = true
				this.showLogin = false
				this.userName = ''
				this.password = ''
				this.password1 = ''
				this.password2 = ''


			},

			ToLogin(){
				this.showRegister = false
				this.showLogin = true
				this.userName = ''
				this.password = ''
			},

      register1(){
        var isnum = /^\d+$/.test(this.password1);
        var isletter = /^[a-zA-Z]+$/.test(this.userName);

        let _this=this;
        let that = this;
        if(this.userName == "" || this.password1 == ""||this.password2 == ""){
          alert("请输入用户名或密码或确认密码")
        }else if(this.userName.length<5){
          alert("账号为5-20位英文(只可英文)")
        }else if(this.password1.length<6){
          alert("密码为6-16位数字(只可数字)")
        }else if(!isletter){
          alert("账号只能为纯英文")
        }
        else if(!isnum){
          alert("密码只能为纯数字")
        }else if(this.password1!=this.password2){
          alert("两次密码不一致")

        }else {
          let ua = navigator.userAgent;
          let url='http://localhost:9090/my_blog/register?&userName='+that.userName+'&password='+that.password1;
          axios.post(url)
            .then(res=>{
              console.log(res.request.responseURL)
              _this.ok = res.data.ok;
              _this.msg = res.data.msg;
              console.log(res.data.ret);
              console.log(res.data.msg);

                if(_this.ok==1){
                alert(that.msg)
                this.showTishi = true
                this.userName = ''
                this.password1 = ''
                this.password2 = ''
                this.verifyCode = ''
                this.ToLogin();
              }
              else if(_this.ok==3){
                alert("此用户名已经存在")
                //this.ToRegister();
              }


            })
            .catch(err=>{
              console.log(err)
            })
        }
      },

			upatePassword(){
				if(getCookie('userName')){
					 let uname = getCookie('username')
     				 this.userName = uname
     				 alert(this.uname);
				}

			}
		}

	}

</script>

<style scoped>

  .eye{
    margin-left: 1100px;
    margin-top: -30px;
  }
    .login_register{
      height: 100%;
    }
	.login{
		text-align:center;
		padding-top: 10%;
		width: 100%;

	}
    .input{
      width: 250px;
      outline:none;
      border: 2px;
      box-sizing:border-box;
      margin-left: 10px;
      font-size: 25px;
    }
    .button{
      margin-left: 200px;
      text-align:center;
      width:100px;
      height:40px;
      line-height: 40px;
      border:none;
      background-color:darkcyan;
      color:#fff;
      font-size:18px;
      border-radius: 25px;
      cursor:pointer;
    }
    .register{
      text-align:center;
      padding-top: 10%;
      width: 100%;

    }
	span{
    color: #999999;
    cursor:pointer;
  }
	span:hover{color:fuchsia;}



</style>
