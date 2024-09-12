import { widget } from '~/public/charting_library';
import '~/public/charting_library/datafeeds/bundle';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            widget
        }
    }
})