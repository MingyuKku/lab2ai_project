import { Timers } from "components/chat/MessageArea";
import { messageMixpanel } from "hooks/useWebviewBridge";
import { formatDate } from "utils";

interface Props {
    emotion: string;
    degree: number;
    setEffectFlag: React.Dispatch<React.SetStateAction<string | null>>; // 감정 이펙트 ui를 컨트롤하는 플래그값을 바꾸는 setState
    timers: React.MutableRefObject<Timers>; // 감정이펙트 타이머 ref
    duration: number;
}

/**
 * 페르소나의 응답 메세지에서 감정 이펙트를 추출해 작동시키는 훅
 * @param emotion 감정 종류
 * @param degree 감정 강도
 * @param setEffectFlag 감정 이펙트 ui를 컨트롤하는 플래그값을 바꾸는 setState
 * @param timers 감정이펙트 타이머 ref
 * @param duration 지속시간
 */
export const checkEffect = ({
    emotion,
    degree,
    setEffectFlag,
    timers,
    duration
}: Props) => {
    const emotionList = ['joyful', 'surprise', 'anger', 'sadness', 'scared', 'excited', 'neutral', 'encourage'];

    const extractEmotion = emotionList.filter(emo => emo === emotion);

    if (
        extractEmotion.length > 0 &&
        degree >= 3
    ) {
        if (timers.current.effectStart) clearTimeout(timers.current.effectStart);
        if (timers.current.effectKeep) clearTimeout(timers.current.effectKeep);

        const emotion = extractEmotion[0];

        timers.current.effectStart = setTimeout(() => {
            setEffectFlag(emotion);
        }, 500);

        timers.current.effectKeep = setTimeout(() => {
            setEffectFlag(null);
        }, duration);
    }
}


export const sendMixMixpanel = (characterSe: string | number) => {
    const todayString = formatDate(new Date(), 'yyyy-MM-dd HH:mm');
    if (Number(characterSe) === 1) { // 하나
        messageMixpanel({
            tracking_type: 'user',
            event_name: 'talk_date_hana',
            param: {
                'value': formatDate(Date.toUtcText(todayString), 'yyyy-MM-dd'),
            }
        })
    }

    if (Number(characterSe) === 2) { // 포그니
        messageMixpanel({
            tracking_type: 'user',
            event_name: 'talk_date_pogny',
            param: {
                'value': formatDate(Date.toUtcText(todayString), 'yyyy-MM-dd'),
            }
        })
    }

    messageMixpanel({
        tracking_type: 'user_incremental',
        event_name: 'talkroom_count',
        param: {
            'amount': '1',
        }
    });
}


export function generateCustomID(length?: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < (length ?? 16); i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


let startY = 0;
// let lastTouchY = 0;
let velocityY = 0;
let lastTime = 0;

export const touchstarthandler = (e: TouchEvent) => {
    const touch = e.touches[0];
    startY = touch.clientY;
    // lastTouchY = startY;
    velocityY = 0; // 속도 초기화
    lastTime = e.timeStamp;
}

export const touchmovehandler = (el: HTMLDivElement) => {
    return (e: TouchEvent) => {
        e.preventDefault(); // 기본 동작 방지
        const touch = e.touches[0];
        const diff = touch.clientY - startY;
        const currentY = touch.clientY;
        const currentTime = e.timeStamp;
        const deltaTime = currentTime - lastTime;

        if (deltaTime > 0) { // 시간 간격이 0보다 클 때만 속도 계산
            velocityY = (diff / deltaTime) * 1000; // 픽셀/초 단위로 속도 계산
        }

        // velocityY = currentY - lastTouchY; // 이동 속도 계산
        
        // el.scrollTop = el.scrollTop - diff;
        el.scrollTop -= diff;

        // lastTouchY = currentY;
        startY = currentY;
        lastTime = currentTime;
    }
}

export const touchendhandler = (el: HTMLDivElement) => {
    return () => {
        const inertiaScroll = () => {
            // if (Math.abs(velocityY) < 1) {
            if (Math.abs(velocityY) < 0.1) {
                return; // 속도가 매우 느려지면 중단
            }

            // el.scrollTop = el.scrollTop - velocityY;
            // velocityY *= 0.95; // 관성 감소
            el.scrollTop -= velocityY * 0.016; // 60fps에 맞춘 시간 간격 (16ms)
            velocityY *= 0.95; // 관성 감소

            requestAnimationFrame(inertiaScroll);
        }

        requestAnimationFrame(inertiaScroll);
    }
}