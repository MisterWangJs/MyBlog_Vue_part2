<template>

    <div class="UpdateBlog">
        <Header  :back="back"></Header>

      <p class="title">博客全文</p>
      <br>
          <div class="section">
            <label style=" font-size: 30px;">标&nbsp;题：</label><label style="color: black;font-family: 黑体; font-size: 30px;  font-weight: bold;">{{blog_title}}</label>
            <br>
              <div style="margin-left:-120px;">
                <p><label>作&nbsp;者：</label><label style="color: black;font-family: 黑体;font-size: larger;  font-weight: bold;">[{{author}}]</label>
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<label>博客类型：</label><label style="color:fuchsia;font-size: larger;  ">{{blog_type}}</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>发布时间：</label><label style="color: darkcyan;">{{pubtime}}</label>
                </p>
              </div>
          </div>

          <br>
            <p><label>内&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容：</label></p>
            <textarea readonly v-model="blog_content" style="width: 500px;height: 600px;">123</textarea>
            <br> <br>

            <router-link  class="return" to="Blog">返回</router-link>
    </div>
</template>

<script>
    import Header from "../header/header"
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
.return{
  margin-left: 400px;
  text-align:center;
  background-color:darkcyan;
  color:black;
  font-size:30px;
  border-radius:100%;

  cursor:pointer;
  text-decoration: none;
}

    .title{
      padding-left: 23px;
      margin-bottom: 10px;
      color: #999;
      font-size: xx-large;
    }

</style>
