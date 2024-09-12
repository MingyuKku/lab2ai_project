import React from 'react'

interface Particles {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    size: number;
}

interface Props {
    className?: string
    amount?: number;
    speedX?: number;
    speedY?: number;
}

const Heart = ({ className, amount, speedX, speedY }: Props) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const reqAnimationId = React.useRef<number>();

    const [ w, setW ]  = React.useState(0);
    const [ h, setH ]  = React.useState(0);


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
            // 이미지 셋팅
            const img = new Image();
            img.src = '/images/TwemojiGrowingHeart.svg'; // 여기에 이미지 경로 입력

            // 하트의 갯수
            const particlesOnScreen = amount ?? 50;
            const particlesArray:Particles[] = [];

            const canvas = canvasRef.current!;
            const context = canvas.getContext('2d');

            // 하트의 크기와 스피드를 생성하는 함수
            const create = () => {

                // for (let i = 0; i < particlesOnScreen; i++) {
                //     let newX, newY, newSize;
                //     let overlap;
                //     let tries = 0;

                //     do {
                //         newX = Math.random() * w;
                //         newY = Math.random() * h;
                //         newSize = Math.random() * 100 + 50; // 50 ~ 150 사이의 값
                //         overlap = false;
            
                //         // 다른 하트와의 거리 확인
                //         for (let j = 0; j < particlesArray.length; j++) {
                //             let dx = newX - particlesArray[j].x;
                //             let dy = newY - particlesArray[j].y;
                //             let distance = Math.sqrt(dx * dx + dy * dy);

                //             if (distance < (newSize + particlesArray[j].size) / 2) {
                //                 overlap = true;
                //                 break; // 겹치는 경우 반복문 탈출
                //             }
                //         }
            
                //         tries++;
                //     } while (overlap && tries < 100); // 100번 시도 후 겹치지 않는 위치를 찾지 못하면 포기
            
                //     // 겹치지 않는 위치 찾았을 경우 배열에 추가
                //     if (!overlap) {
                //         particlesArray.push({
                //             x: newX,
                //             y: newY,
                //             speedX: speedX ?? 1, // 1축으로 1씩 이동시킴
                //             speedY: speedY ?? 2, // y축으로 2씩 이동시킴
                //             size: newSize
                //         });
                //     }
                // }


                

                for (let i = 0; i < particlesOnScreen; i++) {

                    let newSize = 0;
                    let newX = 0;
                    let newY = 0;
                    let flag = false;
                    let tries = 0;

                    do {
                        newSize = Math.random() * 100 + 50; // 50 ~ 150 사이의 값
                        newX = Math.random() * w - (newSize / 2);
                        newY = Math.random() * h - (newSize / 2);

                        for (let j = 0; j < particlesArray.length; j++) {
                            console.log('검증=========', j)
                            console.log('저장된 x축', particlesArray[j].x)
                            console.log('저장된 y축', particlesArray[j].y)
                            console.log('생성한 x', newX)
                            console.log('생성한 y', newY)
                            console.log('생성한 사이즈', newSize)
                            
                        }

                        tries++;
                    } while (flag && tries < 100)

                    

                    

                    if (!flag) {
                        particlesArray.push({
                            x: newX,
                            y: newY,
                            speedX: speedX ?? 1, // 1축으로 1씩 이동시킴
                            speedY: speedY ?? 2, // y축으로 2씩 이동시킴
                            size: newSize
                        })
                    }
                }

                // for (let i = 0; i < particlesOnScreen; i++) {

                //     let newSize = Math.random() * 100 + 50; // 50 ~ 150 사이의 값
                //     let newX = Math.random() * w - (newSize / 2);
                //     let newY = Math.random() * h - (newSize / 2);
                    
                //     particlesArray.push({
                //         x: newX,
                //         y: newY,
                //         speedX: speedX ?? 1, // 1축으로 1씩 이동시킴
                //         speedY: speedY ?? 2, // y축으로 2씩 이동시킴
                //         size: newSize
                //     })
                // }
            }

            
            const draw = () => {
                if (!context) return;
                
                context.globalAlpha = 0.7;

                for (let i = 0; i < particlesArray.length; i++) {
                    // context.globalAlpha = Math.random() * (0.8 - 0.5) + 0.5; //0.5 ~ 0.8사이의 투명도
                    context.drawImage(
                        img,
                        particlesArray[i].x,
                        particlesArray[i].y,
                        particlesArray[i].size,
                        particlesArray[i].size,
                    )
                }
            }
            

            const move = () => {
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].x = particlesArray[i].x + particlesArray[i].speedX;
                    particlesArray[i].y = particlesArray[i].y + particlesArray[i].speedY;

                    if (particlesArray[i].y > h) {
                        particlesArray[i].x = (Math.random() * (canvas.width / 0.5)); // 이곳이 중요한데......
                        particlesArray[i].y = -particlesArray[i].size;
                    }
                }
            }


            const update = () => {
                if (!context) return;

                context.clearRect(0,0,canvas.width, canvas.height);
                draw();
                move();

                reqAnimationId.current = requestAnimationFrame(update);
            }


            img.onload = function() {

                create();
                // draw();
                update();
            }
        }


        // clear
        return () => {
            if (reqAnimationId.current) {
                cancelAnimationFrame(reqAnimationId.current);
            }
        }
    }, [w, h])

    return (
        <canvas ref={ canvasRef } className={`absolute top-0 left-0 ${className}`}></canvas>
    )
}

export default Heart;