<template>
	<div class="addBlog">
		<Header :title="title" :back="back"></Header>

<p class="title">发布新博客</p>
    <br>
		<div class="section">

					<p><label>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：</label>
            <input type ="text" v-model="blog_title" placeholder="请输入一个标题" class="text1"/></p>
            <br>
          <p><label>内&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容：</label></p>
            <textarea v-model="blog_content" style="width: 300px;height: 200px;"></textarea>
            <br> <br>
            <p><label>作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者：</label>
                                      <select v-model="author">
                                        <option value="刘爽" >刘爽</option>
                                        <option value="李丽慧">李丽慧</option>
                                      </select>
            </p>
            <br>
          <p><label>博客类型：</label>  <select v-model="blog_type">
                                        <option value="生活" >生活</option>
                                        <option value="心情" >心情</option>
                                        <option value="随笔" >随笔</option>
                                        <option value="重要" >重要</option>
                                      </select>
          </p>

		</div>
		<button v-on:click="addBlog" class="button">确认发布</button>
	</div>
</template>

<script>
    import Header from "../header/header"
    import axios from 'axios'
	export default {
    name: 'AddBlog',
    components: {
      Header
    },
    data() {

      return {
        newBlog: {
          blog_title:'',
          blog_content:'',
          pubtime:'',
          author:'',
          blog_type:''
        },

        blog_title:'',
        blog_content:'',
        pubtime:'',
        author:'',
        blog_type:'',
        back: "/Blog"
      }

    },
    methods: {
      addBlog: function () {
        //console.log(newWord.word);
        if (this.title == '') {
          alert("输入的博客标题不能为空！");
        } else if (this.blog_content == '') {
          alert("输入的博客内容不能为空！");
        } else if (this.author == '') {
          alert("选择的作者不能为空！");
        }else if (this.blog_type == '') {
          alert("选择的博客类型不能为空！");
        } else {
          let url = 'http://localhost:9090/my_blog/blog_add?blog_title=' + this.blog_title + '&blog_content=' + this.blog_content + '&author=' + this.author+'&blog_type='+this.blog_type;
          axios.post(url).then((res)=>{
            alert("发布成功！");
            this.$router.push(this.back)


          })

        }
      }
    }
  }


</script>


<style scoped>
	.addBlog{
		margin-top: 55px;


	}
	.title{
		padding-left: 23px;
		margin-bottom: 10px;
		color: #999;
    font-size: xx-large;
	}
	.section{
    margin-left: 40%;
		padding:0 23px;
    text-align: left;
	}
	.section li{
		height: 55px;
		line-height: 55px;
		border-bottom: 1px #eee solid;
		font-size: 16px;
	}
	.section input{
		border: none;
		margin-left: 16px;
		font-size: 14px;
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
</style>
