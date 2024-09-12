import { createChart } from 'lightweight-charts';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            lightweight: createChart
        }
    }
})