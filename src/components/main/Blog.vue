<template>
    <vue-drawer-layout
            ref="drawerLayout">
        <div class="drawer" slot="drawer">
            <div class="text">
                <p class="user">当前用户：{{name}}</p>
                <ul class="drawerList">
                    <li @click="modifyPassword">修改密码</li>
                    <li @click="quit">安全退出</li>
                </ul>
            </div>
            <a href="javascript:void(0)" class="close"
               @click="handleToggleDrawer">
                <img src="../../assets/return.png" width="18px"/>&nbsp;返回
            </a>
        </div>

        <div class="content"   style="position:relative;bottom: -10%" slot="content" ref="viewBox">
            <Header></Header>
            <div class="section">
                <ul class="list" v-for="(item,index) in blogAttr">
                    <li v-for=" (blog,index) in item">
                      <div class="one_list">

                          <div>
                            <span class="bid">{{blog.bid}}</span>
                            <span class="blog_title">
                              <p>标题：<label style="color: black;font-family: 黑体;  font-weight: bold;">{{blog.blog_title}}</label>
                               <button width="20px"  v-on:click="update(blog)"  class="all_content" style="  cursor:pointer; float: right;margin-top: 6px;margin-right: 10px; color: darkgreen">博客管理</button>
                               </p></span>
                            <div style=" width: 200px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; font-size: 16px;color: #666; margin-left:10%;margin-bottom: 20px;">
                              {{blog.blog_content}}
                            </div>
                          </div>
                        <p class="pubtime">
                          <span>发布时间：<label style="color: darkcyan;">{{blog.pubtime}}</label></span>&nbsp;&nbsp;&nbsp;&nbsp;
                          <span >作者：<label style="color: black;font-family: 黑体;font-size: larger;  font-weight: bold;" >[{{blog.author}}]</label></span>&nbsp;&nbsp;&nbsp;&nbsp;
                          <span>博客类型：<label style="color:fuchsia;font-size: larger;  ">{{blog.blog_type}}</label></span>
                        <button width="20px" v-on:click="enter(blog)"  class="all_content" style="  cursor:pointer; float: right;margin-bottom: 2px;margin-right: 10px;">查看全文</button>
                        </p>
                      </div>
                    </li>

                </ul>

            </div>

          <div style="position: absolute;bottom: 35%;left: 10%;transform: translate(-50%, -50%);" class="page_style" v-show="page1">
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
            <a href="javascript:void(0)" class="btn"
               @click="handleToggleDrawer">
                <img src="../../assets/menu.png" width="20px"/>
            </a>
        </div>
    </vue-drawer-layout>
</template>



<script>
    import { realconsole } from '../../../build/jquery-1.7.2.min.js'
    import {setCookie, getCookie, delCookie} from '../../assets/js/cookie.js'
    import Header from "../header/header"
    import axios from 'axios'
    export default {
        name: 'Blog',
        components: {
            Header
        },
        data() {
            return {
                updateBlog: {
                  bid:'',
                  blog_title:'',
                  blog_content:'',
                  pubtime:'',
                  author:'',
                  blog_type:''

                },

                blogs:[],
                count: '',
                page:1,
                num:'',
                name: '',
                dom: '',
                blogAttr:[],//将获取到的博客列表存到这个数组
                CurrentPage:'',
                x:'',
                page1:true,

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
        methods: {

            /**
             * 分页方法 首页
             *
             * */
            FirstPage:function(){
              this.wordAttr=[];
              this.pageIndex=1;
              this.show(this.pageIndex);
            },
          /**
           * 分页方法 上一页
           *
           * */
          UpPage:function(){
            if((this.pageIndex-1)<1){
              this.wordAttr=[];
              alert("已经是第一页了！")
              this.show(1)
            }
            else{
              this.wordAttr=[];
              this.show(this.pageIndex=this.pageIndex-1)
            }
          },
          /**
           * 分页方法 下一页
           *
           * */
          DownPage:function(){

            if((this.pageIndex+1>this.pageCount)){
              this.wordAttr=[];
              alert("已经是最后一页了！")
              this.show(this.pageCount)
            }
            else{
              this.wordAttr=[];
              this.show(this.pageIndex=this.pageIndex+1)
            }
          },
          /**
           * 分页方法 末页
           *
           * */
          LastPage:function(){
            this.wordAttr=[];
            this.pageIndex=this.pageCount;
            this.show(this.pageIndex);
         },
          /**
           * 分页方法 跳转指定页
           *
           * */
          JumpPage:function(num){
            var isnum = /^\d+$/.test(num);//是否为纯数字

            this.wordAttr=[];
            if (!isnum) {
              alert("输入有误！")
              this.show(this.pageIndex);
              return false;
            }else{
              if(num>this.pageCount||num<1)
              {
                this.show(this.pageIndex);
                alert("您输入超出页码范围了")

              }else{
                this.pageIndex=num;
                this.show(this.pageIndex);
              }
            }
          },
            /**
             * 修改密码的方法
             *
             **/
            modifyPassword: function () {
                this.$router.push({path: "/UpdatePassword"})
            },

            /**
             * 弹出左侧菜单的方法
             *
             **/
            handleToggleDrawer: function () {
                this.$refs.drawerLayout.toggle();
            },

            /**
             * 退出当前程序
             *
             **/
            quit() {
                delCookie('userName')
                this.$router.push('/')
            },
            /**
             * 获取博客页面
             *
             **/
            show: function (page) {

              let _this = this;
              let url='http://localhost:9090/my_blog/blog_list?pageIndex='+page;
              axios.get(url)
                .then(function (res) {

                    _this.count=res.data.count;
                    _this.pageIndex=res.data.pageIndex;
                    _this.pageSize=res.data.pageSize;
                    _this.pageCount=res.data.pageCount;

                    let CurrentPage=_this.pageIndex
                   _this.CurrentPage=CurrentPage;

                    _this.blogs=res.data.list;
                    _this.blogAttr=[];
                    _this.blogAttr.push(_this.blogs);


                }, function (error) {
                    //console.log(1)
                    console.log(error);
                });
            },
            /**
             * 管理博客方法
             *
             **/
            update: function (blog) {

                console.log(blog);

                this.$router.push({
                    name: 'UpdateBlog',
                    params: {
                        blog:{
                          bid:blog.bid,
                          blog_title:blog.blog_title,
                          blog_content:blog.blog_content,
                          pubtime:blog.pubtime,
                          author:blog.author,
                          blog_type:blog.blog_type
                        }
                    }
                });
            },
          /**
           * 查看全文方法
           *
           **/
          enter: function (blog) {

            console.log(blog);

            this.$router.push({
              /*由于动态路由也是传递params的，所以在 this.$router.push() 方法中
               * path不能和params一起使用，否则params将无效。需要用name来指定页面。
               * */
              name: 'EnterBlog',
              params: {
                blog:{
                  bid:blog.bid,
                  blog_title:blog.blog_title,
                  blog_content:blog.blog_content,
                  pubtime:blog.pubtime,
                  author:blog.author,
                  blog_type:blog.blog_type
                }
              }
            });
          },

        },

        created() {
            this.show(1); //默认显示第一页的内容
        }
    }
</script>

<style scoped>
    .user {
        height: 100px;
        line-height: 100px;
        font-size: 20px;
        font-weight: bold;
    }
    .CurrentPageColor{
      color: red;
      font-family: "Adobe 宋体 Std L";
      font-size: large;
    }
    .pubtime{
      margin-top: 5px;

    }

    .one_list{
      width: 100%;
      border:1px dashed #000

    }
    .list{
      margin-left: 25%;
      width: 50%;
      border:1px solid #000;
    }
    .list li {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-radius: 3px;
        margin: 0 10px;
        padding: 12px;
        text-align: left;
        border: 1px #eee solid;
        margin-top: 12px;

    }

    .content {

        height: 100%;
        overflow: auto;
    }
    .bid{
      display:none;
    }
    .list li .blog_title {
        font-size: 25px;
    }

    .btn {
        position: fixed;
        left: 10px;
        top: 0;
        top: 12px;
        z-index: 2;
    }

    .drawerList li {
        width: 200px;
        cursor:pointer;
        display: flex;
        align-items: center;
        margin-left: 110px;
        line-height: 45px;
    }



    button {
        background: none;
    }

    .close {
        position: fixed;
        bottom: 10px;
        left: 15%;
        color: #41b883;
        text-decoration: none;
        font-size: 14px;
        align-items: center;
        display: flex;
        font-weight: bold;

    }

    h1, h2 {
        font-weight: normal;
        text-align: center;
    }

    ul li {
        list-style: none;
    }

    .drawer {
        height: 100%;
    }

    .text {
        width: 20%;
        height: 100%;
        box-shadow: 3px 3px 6px 6px #888888;
        font-family: 微软雅黑;
        font-size: 2.1vh;
    }

    *{margin:0;padding:0;list-style-type:none;}
    a,img{border:0;}

</style>
