<template>
  <div @click="onBtnEffect" class="wrap">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'BtnEffect',
  props: ['duration', 'color'],
  methods: {
    onBtnEffect(e) {
      let offsetXY = [e.offsetX, e.offsetY];
      const width = e.currentTarget.offsetWidth/2.5;
      const $clickEffect = document.createElement('span');
      $clickEffect.className = 'clickEffect'

      e.currentTarget.append($clickEffect)

      $clickEffect.style.width = `${width}px`;
      $clickEffect.style.height = `${width}px`;
      $clickEffect.style.top = `${offsetXY[1]}px`;
      $clickEffect.style.left = `${offsetXY[0]}px`;
      $clickEffect.style.backgroundColor = this.color;
      $clickEffect.style.animation = `clickEffect ${this.duration}s ease-out both`;

      setTimeout(()=> {
        $clickEffect.remove();
      }, this.duration*1000)
    }
  }
}
</script>

<style lang='scss'>
.wrap {
  position: relative;
  width: 100%;
  .clickEffect {
    position: absolute;
    transform: translate(-50%,-50%);
    z-index: 0;
    border-radius: 50%;
    pointer-events: none;
  }
}


@keyframes clickEffect {
  0% {transform: translate(-50%,-50%) scale(0.5); opacity: 1;}
  100% {transform: translate(-50%,-50%) scale(6); opacity: 0;}
}

</style>