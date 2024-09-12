import type { ChartOptions, DeepPartial } from "lightweight-charts";

export default {
    layout: {
        textColor: 'black',
        // background: {
        //     type: 'solid',
        //     color: 'white',
        // }
    },
    // leftPriceScale: {
    //     autoScale: true,
    // },
    rightPriceScale: {
        autoScale: true,
        visible: false,
        borderVisible: false,
        alignLabels: false,
        scaleMargins: {
            top: 0, // leave some space for the legend
            bottom: 0,
        },
    },
    timeScale: {
        visible: false,
        rightOffset: -0.5,
        lockVisibleTimeRangeOnResize: true,
        // fixLeftEdge: true,
        // fixRightEdge: true,
        // barSpacing: 10,
    },
    handleScroll: false,
    handleScale: false,
    crosshair: {
        // hide the horizontal crosshair line
        vertLine: {
            visible: false,
        },
        horzLine: {
            visible: false,
            labelVisible: false,
        },
    },
    // hide the grid lines
    grid: {
        vertLines: {
            visible: false,
        },
        horzLines: {
            visible: false,
        },
    },
} as DeepPartial<ChartOptions>;