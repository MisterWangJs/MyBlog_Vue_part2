<template>
  <div class="UpdateFeeling">
    <Header  :back="back"></Header>

    <p class="title">管理说说</p>
    <br>
    <div class="section">
      <p><input  type="hidden"  v-model="sid"/></p>
      <p><label>说说内容：</label></p>
      <textarea v-model="saycontent" style="width: 300px;height: 200px;">123</textarea>
      <br> <br>
      <p><label>发表时间：</label>
        <input type ="text" v-model="saytime"  class="text1"/></p>
      <br>
    </div>
    <button v-on:click="del(sid)" class="delbtn">删除此条</button>
    <button v-on:click="update()" class="modifybtn">确认修改</button>

  </div>
</template>

<script>
  import Header from "../header/header"
  import axios from 'axios'
  export default {
    name: 'UpdateFeeling',
    components: {
      Header
    },
    data() {

      return {
        newSay: {
          sid:'',
          saycontent:'',
          saytime:'',

        },

        sid:this.$route.params.say.sid,
        saytime:this.$route.params.say.saytime,
        saycontent:this.$route.params.say.saycontent,


        back: "/MyFeeling",

      }

    },
    methods: {
      /**
       * 删除当前的单词信息
       *
       **/
      del: function (sid) {
        if(confirm('确定要删除吗')==true){
          let url='http://localhost:9090/my_blog/say_delete?sid='+sid;
          axios.get(url)
            .then(function (res) {
            }, function (error) {
              console.log(error);
              alert("删除失败!");
            });
          alert("删除成功!");
          this.$router.push(this.back)
        }


      },

      fun() {
        if (this.saycontent == '') {
          this.saycontent = this.$route.params.say.saycontent;
        }
        if (this.saytime == '') {
          this.saytime = this.$route.params.say.saytime;
        }
      },

      update() {
        this.fun();

        let sid =  this.sid;
        let saycontent = this.saycontent;
        let saytime = this.saytime;

        let url='http://localhost:9090/my_blog/say_modify?sid='+sid+'&saycontent=' +saycontent + '&saytime='+saytime;
        axios.post(url,{//请求参数
          params: {
            sid: sid,
           saycontent:saycontent,
           saytime:saytime,
          }
        })
          .then((res)=>{
            console.log(res.data);
            alert("修改成功！");
            this.$router.push('/MyFeeling');
          });
      }
    }
  }

</script>

<style scoped>
  .UpdateFeeling {
    margin-top: 55px;
  }

  .section {
    padding: 0 23px;
    text-align: left;
    margin-left: 43%;

  }

  .section li {
    height: 55px;
    line-height: 55px;
    border-bottom: 1px #eee solid;
    font-size: 16px;
  }

  .section input {
    border: none;
    margin-left: 16px;
    font-size: 14px;
    width: 200px;
  }

  .modifybtn {
    margin-left: 100px;
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
  .delbtn{
    margin-top: 50px;
    margin-left: 100px;
    text-align:center;
    width:100px;
    height:40px;
    line-height: 40px;
    border:none;
    background-color:red;
    color:#fff;
    font-size:18px;
    border-radius: 25px;
    cursor:pointer;
  }
  .title{
    padding-left: 23px;
    margin-bottom: 10px;
    color: #999;
    font-size: xx-large;
  }

</style>
