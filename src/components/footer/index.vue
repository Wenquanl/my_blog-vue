<template>
  <div>
      <div class="m-footer">
        <div class="m-footer-p">
          <span class="m-footer-i">刘文权 © 2021</span>
          <span class="m-footer-i">&nbsp; • &nbsp;</span>
          <span> <a href="" class="m-footer-a" target="_blank" rel="noopener">test</a></span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

.m-footer{
    width: 100%;
    height: 100px;
    background: #313131;
    .m-footer-p{
      float: left;
      width:100%;
      margin-top: 50px;
      color: rgb(250, 250, 250);
      .m-footer-a{
        text-decoration: none;
        color: rgb(250, 250, 250);
      }
    }
}

</style>
