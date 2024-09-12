import { ISourceOptions } from "@tsparticles/engine";
import defaultOption from "./_default";

export const sadness: ISourceOptions = {
    ...defaultOption(),
    name: 'Sadness',
    zLayers: 100,
    fpsLimit: 120,
    fullScreen: {
        enable: true,
        zIndex: 0,
    },
    // background: {
    //     color: "#000000"
    // },
    particles: {
        color: {
            value: ["#ffffff"]
        },
        interactivity: {
            detectsOn: 'canvas',
        },
        move: {
            enable: true,
            outModes: "out",
            direction: 'bottom',
            straight: true, // 직선방향
            // speed: { min: 15, max: 25 },
            speed: 36,
            // angle: {
            //     offset: 0,
            //     value: {
            //         min: 0,
            //         max: 0
            //     }
            // },
            // trail: { // 샤샤샥같은 효과가 있네
            //     enable: true,
            //     length: 2,
            //     fill: {
            //         color: '#000'
            //     }
            // }
        },
        number: {
            value: 200,
            density: {
                enable: true,
            }
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: "line",
        },
        size: {
            value: 1,
            // value: {
            //     min: 0.2,
            //     max: 0.6
            // },
        },
        stroke: {
            color: {
                value: "#ffffff"
            },
            width: {
                min: 24,
                max: 52
            },
            opacity: 0.5,
        },
    }, // particles end
    
}