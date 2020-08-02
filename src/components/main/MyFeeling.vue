<template>

  <div>
    <Header :title="title" :back="back"></Header>

    <div class="addsays">
      <label style="font-size: xx-large;font-weight: bolder;;margin-left: 100px;color:darkturquoise">发表说说</label>
      <p><label>说说内容：</label></p><textarea v-model="saycontent" style="width: 250px;height:150px"></textarea>

      <div><button v-on:click="addSays" class="button">确认发表</button></div>
    </div>
    <!--<button v-on:click="show1(page)" class="button">查看</button>-->

    <div style="margin-top: -24%;margin-left: 27%;position: relative">
      <p><label  class="left_content" >说说内容</label><label class="right_time" >发表时间</label></p>
      <hr style="width: 74%;margin-left:90px">
      <ul class="list" v-for="(item,index) in sayAttr">
        <li v-for=" (say,index) in item">
          <div  class="saycontent">
              <label class="sid">{{say.sid}}</label>
            <textarea  readonly class="text_content">{{say.saycontent}}</textarea>
            <div class="saytime">{{say.saytime}}</div>
            <button width="20px"  v-on:click="update(say)"  class="all_content" style="  cursor:pointer; float: right;margin-top: 30px;margin-right: 25%; color: darkgreen;font-size: larger">说说管理</button>
            <hr style="width: 80%;margin-left: -10px">
          </div>

        </li>

      </ul>
    </div>
    <div class="verticalBar"></div>
    <div style="position: absolute;bottom: 5%;left: 15%;transform: translate(-50%, -50%);" class="page_style">
      <form class="center">
        <button v-on:click="FirstPage" class="button2">首页</button>
        <button v-on:click="UpPage" class="button2">上一页</button>
        <button v-on:click="DownPage" class="button2">下一页</button>
        <button v-on:click="LastPage" class="button2">末页
        </button><br/><br/>
        <p><label>当前第   </label><label class="CurrentPageColor">{{CurrentPage}}</label><label>   页</label></p>
        <br/>
        <input type ="text" v-model="num" placeholder="请输入需要跳转的页数" class="text1"/>
        <button v-on:click="JumpPage(num)" class="button2">转到</button>
      </form>

    </div>
  </div>
</template>

<script>
  import Header from "../header/header"
  import axios from 'axios'
    export default {
        name: "MyFeeling",
      components: {
        Header
      },
      data() {

        return {
          UdateFeeling: {
            sid:'',
            saycontent:'',
            saytime:'',
          },

         saycontent:'',
          saytime:'',
          back: "/Blog",

          /*say:'',*/
          sayAttr:[],
          says:[],
          say:'',
          count: '',
          page:1,
          num:'',
          name: '',
          dom: '',
          CurrentPage:'',



        }


      },
      mounted(){
        let uname = getCookie('userName')
        this.name = uname
        if (uname == "") {
          this.$router.push('/')
        }
        let _this = this;
        // 设置一个开关来避免重负请求数据
        let sw = true;
        this.dom = this.$refs.viewBox
      },
      methods:{
        /**
         * 获取说说页面
         *
         **/
        show1: function (page) {

          let _this = this;
          let url='http://localhost:9090/my_blog/say_list?pageIndex='+page;
          axios.get(url)
            .then(function (res) {
              _this.count=res.data.count;
              _this.pageIndex=res.data.pageIndex;
              _this.pageSize=res.data.pageSize;
              _this.pageCount=res.data.pageCount;

              let CurrentPage=_this.pageIndex
              _this.CurrentPage=CurrentPage;

              _this.says=res.data.list;
              _this.sayAttr=[];
              _this.sayAttr.push(_this.says);

            }, function (error) {
              //console.log(1)
              console.log(error);
            });
        },
        /**
         * 管理说说方法
         *
         **/
       update: function (say) {

          console.log(say);

          this.$router.push({
            name: 'UpdateFeeling',
            params: {
              say:{
               sid:say.sid,
                saycontent:say.saycontent,
               saytime:say.saytime,

              }
            }
          });
        },
          /**
           *  添加说说
           * */
        addSays: function () {
          //console.log(newWord.word);
          if (this.saycontent == '') {
            alert("输入的说说不能为空！");
          }else {
            let url = 'http://localhost:9090/my_blog/say_add?saycontent=' + this.saycontent ;
            axios.post(url).then((res)=>{
              alert("发布成功！");
              this.show1(1);



            })

          }
        },

        /**
         * 分页方法 首页
         *
         * */
        FirstPage:function(){
          this.sayAttr=[];
          this.pageIndex=1;
          this.show1(this.pageIndex);
        },
        /**
         * 分页方法 上一页
         *
         * */
        UpPage:function(){
          if((this.pageIndex-1)<1){
            this.sayAttr=[];
            alert("已经是第一页了！")
            this.show1(1)
          }
          else{
            this.sayAttr=[];
            this.show1(this.pageIndex=this.pageIndex-1)
          }
        },
        /**
         * 分页方法 下一页
         *
         * */
        DownPage:function(){

          if((this.pageIndex+1>this.pageCount)){
            this.sayAttr=[];
            alert("已经是最后一页了！")
            this.show1(this.pageCount)
          }
          else{
            this.sayAttr=[];
            this.show1(this.pageIndex=this.pageIndex+1)
          }
        },
        /**
         * 分页方法 末页
         *
         * */
        LastPage:function(){
          this.sayAttr=[];
          this.pageIndex=this.pageCount;
          this.show1(this.pageIndex);
        },
        /**
         * 分页方法 跳转指定页
         *
         * */
        JumpPage:function(num){


          var isnum = /^\d+$/.test(num);//是否为纯数字
          this.sayAttr=[];
          if (!isnum) {
            alert("输入有误！")
            this.show1(this.pageIndex);
            return false;
          }else{
            if(num>this.pageCount||num<1)
            {
              this.show1(this.pageIndex);
              alert("您输入超出页码范围了")

            }else{
              this.pageIndex=num;
              this.show1(this.pageIndex);
            }
          }
        },
      },
      created() {
        this.show1(1); //默认显示第一页的内容
      }

    }
</script>

<style>
  .left_content{
    position: relative;
    margin-left: -55%;
    font-size: xx-large;
    font-weight: bold;
  }
  .right_time{
    position: absolute;
    margin-left: 24%;
    font-size: xx-large;
    font-weight: bold;
  }
  .verticalBar {
    position: absolute;
    width: 5px;
    height: 750px;
    background: red;
    display: inline-block;
    vertical-align: top;
    margin-left: 8%;
    margin-top: -37%;
  }
.text_content{
  width: 400px;
  height: 80px;
  overflow:scroll;
  resize:none;
}
.saycontent{
  position: relative;
  height: auto;
  margin-left: 100px;
  margin-top: 20px;
  text-align: left;
}
.saytime{
  position: absolute;
  margin-top:-70px;
  margin-left: 45%;
  font-weight: lighter;
  font-size: 20px;

}
.sid{
  display: none;
}
.addsays{
  margin-top: 200px;
  margin-left: 100px;
  text-align: left;
}
  .button{
    margin-left: 150px;
    margin-top: 50px;
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
  .CurrentPageColor{
    color: red;
    font-family: "Adobe 宋体 Std L";
    font-size: large;
  }
</style>
