import SockJS from 'sockjs-client';
import { CompatClient, Stomp, Client } from '@stomp/stompjs';

export default defineNuxtPlugin(() => {

    return {
        provide: {
            createStompClient2: (url: string) => {

                const client = new Client({
                    webSocketFactory: () => {
                        // WebSocket을 생성하기 위해 호출하는 팩토리 함수
                        // 새로운 SockJS 인스턴스를 반환.
                        return new SockJS(url);
                    },
                    reconnectDelay: 3000, // 클라이언트가 연결이 끊어졌을 때 자동 재연결을 시도하기 전에 대기할 시간
                    heartbeatIncoming: 4000, // 클라이언트가 서버로부터 하트비트를 수신하는 간격(밀리초), 클라이언트는 4초마다 서버로부터 하트비트를 수신
                    heartbeatOutgoing: 4000, // 클라이언트가 서버로 하트비트를 전송하는 간격(밀리초), 이 예제에서는 4000밀리초(4초)로 설정
                })

                return client;
            }
        }
    }
})