export const mypage = {
  data() {
    return {

    }
  },
  computed: {
    nickNameValid() {
      if(this.nickname.length >= 2 && this.nickname.length <= 10) {
        const isValid = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,10}$/.test(this.nickname);

        if(isValid) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    passwordValid() {
      if(this.password.length >= 8) {
        const isEngContain = /[A-Za-z]+/.test(this.password);
        const isNumContain = /[0-9]+/.test(this.password);
        // const isSpecialContain = /[@$!%*#?&]+/.test(this.password);
        const isSpecialContain = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/.test(this.password);

        let condCount = 0;

        if(isEngContain) {
          condCount++;
        }

        if(isNumContain) {
          condCount++;
        }

        if(isSpecialContain) {
          condCount++;
        }

        if(condCount >= 2) {
          return true;
        }
      }

      return false;
    }
  },
  methods: {
    test() {
      console.log('믹스인테스트')
    }
  }
}

