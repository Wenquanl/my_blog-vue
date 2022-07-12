<template>
  <div class="stars">
    <div v-for="(item,index) in starsCount" :key="index" class="star" ref="star"></div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      starsCount: 800, // 星星数量
      distance: 800// 间距
    }
  },
  mounted () {
    const _starList = document.getElementsByClassName('star')
    const starArr = Array.prototype.slice.call(_starList)
    // vue ref免DOM操作
    // const starList = this.$refs.star

    starArr.forEach(item => {
      var speed = 0.5 + (Math.random())
      var thisDistance = this.distance + (Math.random() * 500)
      item.style.transformOrigin = `0 0 ${thisDistance}px`
      item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${speed},${speed})`
    })
  }

}
</script>

<style lang="less" scoped>
//动画
@keyframes rotate{
  0%{
    transform:perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100%{
    transform:perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}
.stars{
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
  bottom: 0;
}
.star{
  width: 3px;
  height: 3px;
  background: #5e00ff;
  position: absolute;
  top:0;
  left: 0;
  backface-visibility: hidden;
}

</style>
