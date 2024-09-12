import { widget } from '~/public/charting_library';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            widget
        }
    }
})