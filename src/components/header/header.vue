<template>
    <div class="header">

      <ul>
        <li><router-link  to="Blog">主页</router-link></li>
        <li><router-link to="AddBlog">写博客</router-link></li>
        <li><router-link to="MyFeeling">发说说</router-link></li>
        <li style="float:right;margin-right: 100px;"><router-link to="AboutBlog">关于博客</router-link></li>
      </ul>


    </div>
</template>

<script>
    export default {
        name: "Header",
        props:["title","back"]
    }
</script>

<style scoped>
    .header {
        height: 40px;
        background-color: #333;
        color: #ffffff;
        line-height: 40px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        position: fixed;
        top: 0;
        width:100%;
    }

    ul {
      width: 100%;
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;

    }

    li {
      float: left;
    }

    li a {

      display: block;
      color: white;
      text-align: center;
      padding: 0px 10px;
      text-decoration: none;
      margin-left: 300px;
    }

    /*鼠标移动到选项上修改背景颜色 */
    li a:hover {
      background-color: #111;
    }
</style>
