<template>
    <div class="UpdateBlog">
        <Header  :back="back"></Header>

      <p class="title">管理博客</p>
      <br>
          <div class="section">
             <p><input  type="hidden"  v-model="bid"/></p>
            <p><label>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：</label>
              <input type ="text"  v-model="blog_title"  class="text1"></p>
            <br>
            <p><label>内&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容：</label></p>
            <textarea v-model="blog_content" style="width: 300px;height: 200px;">123</textarea>
            <br> <br>
            <p><label>发布时间：</label>
              <input type ="text" v-model="pubtime"  class="text1"/></p>
            <br>
            <p><label>作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者：</label>
              <select v-model="author">
                <option value="刘爽" >刘爽</option>
                <option value="李丽慧">李丽慧</option>
              </select>
            </p>
            <br>
            <p><label>博客类型：</label>
              <select v-model="blog_type">
              <option value="生活" >生活</option>
              <option value="心情" >心情</option>
              <option value="随笔" >随笔</option>
              <option value="重要" >重要</option>
            </select>
            </p>

          </div>
      <button v-on:click="del(bid)" class="delbtn">删除此条</button>
        <button v-on:click="update()" class="modifybtn">确认修改</button>

    </div>
</template>

<script>
    import Header from "../header/header"
    import axios from 'axios'
    export default {
        name: 'UpdateBlog',
        components: {
            Header
        },
        data() {

          return {
                newBlog: {
                  bid:'',
                  blog_title:'',
                  blog_content:'',
                  pubtime:'',
                  author:'',
                  blog_type:'',
                },

            bid:this.$route.params.blog.bid,
            blog_title:this.$route.params.blog.blog_title,
            blog_content:this.$route.params.blog.blog_content,
            pubtime:this.$route.params.blog.pubtime,
            author:this.$route.params.blog.author,
            blog_type:this.$route.params.blog.blog_type,

            back: "/Blog",

            }

        },
        methods: {
          /**
           * 删除当前的单词信息
           *
           **/
          del: function (bid) {
            if(confirm('确定要删除吗')==true){
              let url='http://localhost:9090/my_blog/blog_delete?bid='+bid;
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
           if (this.blog_title == '') {
             this.blog_title = this.$route.params.blog.blog_title;
           }
           if (this.blog_content == '') {
             this.blog_content = this.$route.params.blog.blog_content;
           }
            if (this.author == '') {
              this.author = this.$route.params.blog.author;
            }
           if (this.pubtime == '') {
             this.pubtime = this.$route.params.blog.pubtime;
           }
           if (this.blog_type == '') {
             this.blog_type = this.$route.params.blog.blog_type;
           }
          },

            update() {
              this.fun();

              let bid =  this.bid;
              let blog_title = this.blog_title;
              let blog_content = this.blog_content;
              let pubtime = this.pubtime;
              let author = this.author;
              let blog_type = this.blog_type;

              let url='http://localhost:9090/my_blog/blog_modify?bid='+bid+'&blog_title=' + blog_title + '&blog_content=' + blog_content + '&pubtime='+pubtime+'&author=' + author+'&blog_type='+blog_type;
                  axios.post(url,{//请求参数
                    params: {
                      bid: bid,
                      blog_title:blog_title,
                      blog_content:blog_content,
                      pubtime:pubtime,
                      author:author,
                      blog_type:blog_type
                    }
                  })
                    .then((res)=>{
                      console.log(res.data);
                      alert("修改成功！");
                      this.$router.push('/Blog');
                });
            }
        }
    }

</script>

<style scoped>
    .UpdateBlog {
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
