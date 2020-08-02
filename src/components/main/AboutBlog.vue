<template>
  <div>
    <Header  :back="back"></Header>
    <div style="margin-top: 10%;">
      <router-link  class="return" to="Blog">返回</router-link>

      <p><label> 作者:</label><label style="font-size: large;color: black"> Mister·Wang </label></p>
      <br>
      <p><label> 用到技术:</label><label>vue.js + 跨域 + javaee + mysql </label></p>
      <br>

        <div>
            <b style="font-size:20px;">博客稳定运行：</b><SPAN id=span_dt_dt style="color: #2F889A; font-size:20px;"></SPAN> <SCRIPT language=javascript>function show_date_time(){
            window.setTimeout("show_date_time()", 1000);
            BirthDay=new Date("6/12/2020 0:0:0");
            today=new Date();
            timeold=(today.getTime()-BirthDay.getTime());
            sectimeold=timeold/1000
            secondsold=Math.floor(sectimeold);
            msPerDay=24*60*60*1000
            e_daysold=timeold/msPerDay
            daysold=Math.floor(e_daysold);
            e_hrsold=(e_daysold-daysold)*24;
            hrsold=Math.floor(e_hrsold);
            e_minsold=(e_hrsold-hrsold)*60;
            minsold=Math.floor((e_hrsold-hrsold)*60);
            seconds=Math.floor((e_minsold-minsold)*60);
            span_dt_dt.innerHTML='<font style=color:#C40000>'+daysold+'</font> 天 <font style=color:#C40000>'+hrsold+'</font> 时 <font style=color:#C40000>'+minsold+'</font> 分 <font style=color:#C40000>'+seconds+'</font> 秒';
          }
          show_date_time();</script>
        </div>

    </div>
  </div>


</template>

<script>
  import Header from "../header/header"

    export default {
        name: "AboutBlog",
      components: {
        Header
      },
      data() {

        return {

          back: "/Blog",

        }


        }


    }

</script>

<style scoped>
  .return{

    text-align:center;
    background-color:darkcyan;
    color:black;
    font-size:30px;
    border-radius:100%;

    cursor:pointer;
    text-decoration: none;
  }
</style>
