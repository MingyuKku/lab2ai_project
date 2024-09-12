export const opt = {
    autoPlay: true,
    background: {
        color: {
            value: "#043564",
        },
    },
    backgroundMask: {
        composite: 'destination-out',
        cover: {
            color: {
                value: '#fff',
            },
            opacity: 1,
        },
        enable: false,
    },
    clear: true,
    delay: 0,
    fullScreen: {
        enable: true,
        zIndex: 0
    },
    detectRetina: true,
    duration: 0,
    fpsLimit: 120,
    interactivity: {
        detectsOn: 'window',
        events: {

        },
        modes: {
            
        }
    },
    particles: {
        bounce: {
            horizontal: {
                value: 1
            },
            vertical: {
                value: 1
            }
        },
        collisions: {
            absorb: {
                speed: 2,
            },
            bounce: {
                horizontal: {
                    value: 1
                },
                vertical: {
                    value: 1
                }
            },
            enable: false,
            maxSpeed: 50,
            mode: 'bounce',
            overlap: {
                enable: true,
                retries: 0
            }
        },
        color: {
            value: '#fff',
            animation: {
                h: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                },
                s: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                },
                l: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                }
            },
        },
        move: {
            
        },
        shape: {
            type: 'star',
            close: true,
            fill: true,
            options: {
                star: {
                    sides: 5
                }
            }
        },
        size: {
            value: {
                min: 1,
                max: 4
            },
            animation: {
                count: 0,
                enable: false,
                speed: 5,
                decay: 0,
                delay: 0,
                sync: false,
                mode: 'auto',
                startValue: 'random',
                destroy: 'none'
            }
        }
    }
}