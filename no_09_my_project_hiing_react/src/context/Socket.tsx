import { messageWebview } from 'hooks/useWebviewBridge';
import React from 'react'
import { io, Socket } from 'socket.io-client';

export const socket_values = {
    url: process.env.REACT_APP_API_CHAT_URL ?? 'https://test-persona-chat.hiing.co/',
    onEvent: {
        receive_message: 'receiveMessage',
        send_message: 'message',
        send_personal_message: 'personal_message',
        receive_personal_message: 'receivePersonalMessage',
    }
} as const;

export interface EmitData {
    character_se: number;
    member_se: number;
    answer: string; // 챗봇 대답
    degree: number; // 감정 세기
    emotion: string; // 감정
    inserted_id: string; // 채팅 고유 id
    user_message: string; // 유저 메시지
}

export interface EmitData_PersonalMessage {
    character_se: number;
    character_en_nm: string;
    member_se: number;
    inserted_id: string; // 채팅 고유 id
    response: string; // 개인화 메세지
}

// const socket = io(socket_values.url, { 
//     transports: ['websocket'],
//     autoConnect: false, // 초기 자동 연결 해제
//     reconnection: true, // 재연결 활성화
//     // reconnectionDelay: 1000, // 재연결 시도 초기 지연 시간
//     // reconnectionDelayMax: 5000, // 재연결 시도 최대 지연 시간
//     // reconnectionAttempts: 'Infinity' // 최대 재연결 시도 횟수
// });

const SocketContext = React.createContext<{
    socket: Socket | null;
}>({
    socket: null,
});

const SocketProvider = ({ children }: React.PropsWithChildren) => {

    // const [ isConnected, setIsConnected ] = React.useState(false);
    const [ socket, setSocket ] = React.useState<Socket | null>(null);

    React.useEffect(() => {
        const createSocket = io(socket_values.url, { 
            transports: ['websocket'],
            // autoConnect: false, // 초기 자동 연결 해제
            reconnection: true, // 재연결 활성화
            // reconnectionDelay: 1000, // 재연결 시도 초기 지연 시간
            // reconnectionDelayMax: 5000, // 재연결 시도 최대 지연 시간
            // reconnectionAttempts: 'Infinity' // 최대 재연결 시도 횟수
        });

        setSocket(createSocket);

        return () => {
            createSocket.disconnect();
        }
    }, [])

    React.useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log('소켓 커넥트!')
        })

        socket.on('disconnect', (reason) => {
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 disconnect => 연결해체 이유: ${reason}`
            //     }
            // });
            // alert(`소켓 disconnect => 연결해체 이유: ${reason}`)
            console.log('소켓 디스커넥트');
        });

        socket.on('connect_error', (err: any) => {
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 connect_error => ${err}`
            //     }
            // });
            // alert('소켓 connect_error')
            console.log('소켓 커넥트 에러', err)
        })

        socket.on('error', (err: any) => {
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 error => ${err}`
            //     }
            // });
            // alert('소켓 error')
            console.log('소켓 에러', err)
        })

        socket.on("reconnect", (attemptNumber) => {
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 reconnect => 시도 횟수: ${attemptNumber}`
            //     }
            // });
            // alert(`소켓 reconnect => 시도 횟수: ${attemptNumber}`)
            console.log(`소켓 리커넥트 (시도 횟수: ${attemptNumber})`);
        });

        socket.on("close", () => {
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 close`
            //     }
            // });
            // alert(`소켓 close`);
            console.log('소켓 닫힘')
        })

        return () => {
            socket.disconnect();
        }
    }, [socket])
    
    return (
        <SocketContext.Provider value={{
            socket,
        }}>
            { children }
        </SocketContext.Provider>
    )
}

export default SocketProvider;

export const useSocketContext = () => {
  return React.useContext(SocketContext);
}