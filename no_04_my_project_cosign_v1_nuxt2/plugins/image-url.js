import Vue from 'vue'

export default ({ app }, inject) => {
  inject('static', Vue.observable({ imgUrl: 'https://cosign.kr.object.ncloudstorage.com/project-images/cosign-view/' }))
}