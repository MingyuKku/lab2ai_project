const index = {
    data() {
      return {
        // animationInterval: [],
        animationInterval: null,
      };
    },
    beforeDestroy() {
      for(let i = 0; i <= this.animationInterval; i++) {
        clearInterval(i)
      }
    },
    methods: {
      marqueeIn(idx,duration) {
        let marquee = (this.$refs.marquee_wrap[idx] !== undefined) ? this.$refs.marquee[idx] : this.$refs.marquee;
        if(marquee.offsetWidth < marquee.scrollWidth) {
          marquee.style.transition = `transform ${(duration + (marquee.scrollWidth*10))/1000}s linear`;
          marquee.style.transform = `translateX(-${marquee.scrollWidth}px)`;
  
          this.animationInterval = setInterval(this.movingMarquee(marquee,duration), duration + (marquee.scrollWidth*10))
        }
      },
      movingMarquee(el,duration) {
        return function() {
          el.style.transition = `none`;
          el.style.transform = `translateX(${el.offsetWidth}px)`;
          setTimeout(()=> {
            el.style.transition = `transform ${(duration + (el.scrollWidth*10))/1000}s linear`;
            el.style.transform = `translateX(-${el.scrollWidth}px)`;
          }, 1)
        }
      },
      marqueeOut(idx) {
        clearInterval(this.animationInterval)
        let marquee = (this.$refs.marquee[idx] !== undefined) ? this.$refs.marquee[idx] : this.$refs.marquee;
        marquee.style.transition = `none`;
        marquee.style.transform = `none`;
      },
    },  
  }
  
  export { index };