import { mapActions } from 'vuex';

const model = {
    methods: {
        ...mapActions('signStore', ['toggleDescModal']),
        closeModal() {
          this.toggleDescModal(false)
        }
    }
}

export default model;