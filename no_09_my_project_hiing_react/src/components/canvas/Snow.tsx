import React from 'react'

interface Particles {
    x: number;
    y: number;
    opacity: number;
    speedX: number;
    speedY: number;
    radius: number;
}

interface Props {
    className?: string
    amount?: number;
    speedX?: number[];
    speedY?: number[];
}

const Snow = ({ className, amount, speedX, speedY }: Props) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const reqAnimationId = React.useRef<number>();

    const [ w, setW ]  = React.useState(0);
    const [ h, setH ]  = React.useState(0)

    React.useEffect(() => {
        const canvas = canvasRef.current!;

        function setSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            setW(canvas.width);
            setH(canvas.height);
        }

        function clientResize(ev: WindowEventMap['resize']) {
            setSize();
        }

        setSize();
        window.addEventListener('resize', clientResize);

        return () => window.removeEventListener('resize', clientResize);
    }, []);


    React.useEffect(() => {
        if (w !== 0 && h !== 0) {
            // 눈의 갯수
            const particlesOnScreen = amount ?? 300;
            const particlesArray:Particles[] = [];

            const canvas = canvasRef.current!;
            const context = canvas.getContext('2d');


            const random = (min: number, max: number) => {
                return min + (Math.random() * (max - min + 1));
            }

            // 눈의 모양과 스피드를 생성하는 함수
            const createSnowFlakes = () => {
                for (let i = 0; i < particlesOnScreen; i++) {
                    particlesArray.push({
                        x: Math.random() * w,
                        y: Math.random() * h,
                        opacity: Math.random(),
                        speedX: speedX ? random(speedX[0] ?? -4, speedX[1] ?? 2) : random(-4, 2),
                        speedY: speedY ? random(speedY[0] ?? 1.5, speedY[1] ?? 5) : random(1.5, 5),
                        radius: random(0.5, 4.2)
                    })
                }
            }

            
            const drawSnowFlakes = () => {
                if (!context) return;

                for (let i = 0; i < particlesArray.length; i++) {
                    const gradient = context.createRadialGradient(
                        particlesArray[i].x,
                        particlesArray[i].y,
                        0,
                        particlesArray[i].x,
                        particlesArray[i].y,
                        particlesArray[i].radius,
                    );

                    gradient.addColorStop(0, `rgba(255,255,255, ${particlesArray[i].opacity}`);
                    gradient.addColorStop(0.8, `rgba(210,236,242, ${particlesArray[i].opacity}`);
                    gradient.addColorStop(1, `rgba(237,247,249, ${particlesArray[i].opacity}`);

                    context.beginPath();
                    context.arc(
                        particlesArray[i].x,
                        particlesArray[i].y,
                        particlesArray[i].radius,
                        0,
                        Math.PI * 2,
                        false
                    );

                    context.fillStyle = gradient;
                    context.fill();
                }
            }
            

            const moveSnowFlaks = () => {
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].x = particlesArray[i].x + particlesArray[i].speedX;
                    particlesArray[i].y = particlesArray[i].y + particlesArray[i].speedY;

                    if (particlesArray[i].y > h) {
                        particlesArray[i].x = Math.random() * w * 1.5;
                        particlesArray[i].y = -50;
                    }
                }
            }

            const updateSnowFall = () => {
                if (context) {
                    context.clearRect(0,0,w,h);
                    drawSnowFlakes();
                    moveSnowFlaks();
                    reqAnimationId.current = requestAnimationFrame(updateSnowFall)
                }
                
            } 

            createSnowFlakes();
            updateSnowFall();
        }

        // clear
        return () => {
            if (reqAnimationId.current) {
                cancelAnimationFrame(reqAnimationId.current);
            }
        }
    }, [w, h])

    return (
        <canvas ref={ canvasRef } className={`fixed top-0 left-0 ${className}`}></canvas>
    )
}

export default Snow;