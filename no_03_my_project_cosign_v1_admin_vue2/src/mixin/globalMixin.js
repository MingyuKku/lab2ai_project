const globalMixinFunc = {
  data() {
    return {
      imgURL: process.env.VUE_APP_IMG_URL,
      imgURLMentor: process.env.VUE_APP_IMG_URL_Mentor,
    }
  },
  computed: {

  }
}

export default globalMixinFunc;