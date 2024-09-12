import { type ISourceOptions } from "@tsparticles/engine";
import defaultOption from "./_default";

export const bigBubble: ISourceOptions = {
    ...defaultOption(),
    name: 'Big Particle',
    zLayers: 100,
    background: {
        color: {
            value: "#ffffff",
        },
        opacity: 1,
    },
    fullScreen: {
        enable: true,
        zIndex: 0,
    },
    fpsLimit: 120,
    particles: {
        color: {
            value: [
                "#5bc0eb",
                "#fde74c",
                "#9bc53d",
                "#e55934",
                "#fa7921",
            ],
            animation: {
                h: {
                    enable: true,
                    speed: 20,
                    sync: false,
                    offset: 0,
                    count: 0
                },
                s: {
                    enable: false,
                    speed: 50,
                    sync: true,
                    offset: 0,
                    count: 0
                },
                l: {
                    enable: false,
                    speed: 50,
                    sync: true,
                    offset: 0,
                    count: 0
                }
            }
        },
        move: {
            enable: true,
            direction: 'top',
            drift: 0,
            outModes: {
                default: 'out'
            },
            speed: 7,
            angle: {
                offset: 0,
                value: {
                    min: 0,
                    max: 90
                }
            },
            attract: {
                enable: false,
                distance: 200
            },
            center: {
                x: 50,
                y: 50,
                mode: 'percent',
                radius: 0
            }
        },
        number: {
            value: 30,
            limit: {
                mode: 'delete',
                value: 0,
            }
        },
        opacity: {
            value: {
                min: 0.4,
                max: 0.8
            },
            animation: {
                enable: false,
                speed: 1,
                sync: false,
                mode: 'auto',
                startValue: 'random',
            }
            // value: 0.7,
        },
        shape: {
            type: 'circle',
            fill: true,
            close: true,
        },
        size: {
            value: {
                min: 200,
                max: 300,
            },
            animation: {
                enable: true,
                speed: 50,
                sync: false,
                mode: 'auto',
                startValue: 'random'
            }
        },
        collisions: {
            enable: true,
            overlap: { // 파티클끼리 겹치게 할것인지 설정
                enable: true,
                retries: 0
            }
        },
    },
}


