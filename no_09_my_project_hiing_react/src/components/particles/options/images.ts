import { type ISourceOptions } from "@tsparticles/engine";
import defaultOption from "./_default";

export const joyfull: ISourceOptions = {
    ...defaultOption(),
    name: 'Joyfull',
    zLayers: 100,
    background: {
        // color: '#000',
        // image: "url('/images/particles/joyfull-bg.png')",
        // position: '0 center',
        // repeat: 'no-repeat',
        // size: '100%',
        // opacity: 1,
    },
    fullScreen: {
        enable: true,
        zIndex: 0,
    },
    responsive: [{
        mode: 'screen'
    }],
    fpsLimit: 120,
    particles: {
        // color: {
        //     value: '#FF7E95',
        // },
        move: {
            enable: true,
            direction: 'none',
            drift: 0,
            outModes: {
                default: 'out'
            },
            speed: 3,
            angle: {
                offset: 0,
                value: 90
            },
            attract: {
                enable: false,
                distance: 200,
                rotate: {
                    x: 3000,
                    y: 3000
                },
            },
            center: {
                x: 50,
                y: 50,
                mode: 'percent',
                radius: 0
            },
            decay: 0,
            gravity: {
                acceleration: 9.81,
                enable: false,
                maxSpeed: 50
            },
            size: false,
        },
        number: {
            value: 100,
            limit: {
                mode: 'delete',
                value: 150,
            }
        },
        opacity: {
            value: 1,
            animation: {
                enable: false,
            }
        },
        shape: {
            type: "image",
            options: {
                image: [
                    {
                        // src: "/images/particles/joyfull-01.png",
                        src: "https://d25qtvpmz7kl1a.cloudfront.net/chat/joyfull-01.png",
                        width: 36,
                        height: 29,
                        particles: {
                            // size: {
                            //     value: {
                            //         min: 5,
                            //         max: 30
                            //     }
                            // }
                        }
                    },
                    {
                        // src: "/images/particles/joyfull-02.png",
                        src: "https://d25qtvpmz7kl1a.cloudfront.net/chat/joyfull-02.png",
                        width: 36,
                        height: 29,
                        particles: {
                            // size: {
                            //     value: {
                            //         min: 5,
                            //         max: 30
                            //     }
                            // }
                        }
                    },
                    {
                        // src: "/images/particles/joyfull-03.png",
                        src: "https://d25qtvpmz7kl1a.cloudfront.net/chat/joyfull-03.png",
                        width: 36,
                        height: 29,
                        particles: {
                            // size: {
                            //     value: {
                            //         min: 5,
                            //         max: 30
                            //     }
                            // }
                        }
                    },
                ]
            },
        },
        size: {
            value: {
                min: 8,
                max: 36,
            },
            animation: {
                enable: true,
                speed: 10,
                sync: true,
                mode: 'auto',
                startValue: 'random'
            },
        },
        zIndex: {
            value: 10,
            // opacityRate: 1,
            // sizeRate: 1,
            // velocityRate: 1
        },
        // collisions: {
        //     enable: true,
        //     absorb: {
        //         speed: 2,
        //     },
        //     overlap: { // 파티클끼리 겹치게 할것인지 설정
        //         enable: false,
        //         retries: 0
        //     }
        // },
    },
}

