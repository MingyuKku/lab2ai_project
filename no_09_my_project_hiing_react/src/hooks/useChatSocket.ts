import React from "react"
import { Socket, io } from "socket.io-client";
import { selectMember } from "_redux/member/selector";
import { useSelector } from "react-redux";
import { messageWebview } from "./useWebviewBridge";

export const socket_values = {
    url: process.env.REACT_APP_API_CHAT_URL ?? 'https://test-persona-chat.hiing.co/',
    onEvent: {
        save_socket_id: 'saveSocketId',
        delete_socket_id: 'deleteSocketId',
        receive_message: 'receiveMessage',
        send_message: 'message',
        send_personal_message: 'personal_message',
        receive_personal_message: 'receivePersonalMessage',
    }
} as const;

export const useChatSocket = () => {
    const { se } = useSelector(selectMember);
    const [ socket, setSocket ] = React.useState<Socket | null>(null);

    React.useEffect(() => {
        const createSocket = io(socket_values.url, { 
            transports: ['websocket'],
            // autoConnect: false, // 초기 자동 연결 해제
            reconnection: true, // 재연결 활성화
            // reconnectionAttempts
            reconnectionDelay: 2500, // 재연결 시도 초기 지연 시간
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
            // console.log('소켓 커넥트!', se, '응??')
            // setIsConnected(true);

            socket.emit(socket_values.onEvent.save_socket_id, se);
        })
        // socket.connect();

        socket.on('disconnect', (reason) => {
            // alert(`소켓 disconnect => 연결해체 이유: ${reason}`);
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 disconnect => 연결해체 이유: ${reason}`
            //     }
            // });
            console.log(`소켓 디스커넥트 ${reason}`);

            // 삭제하는 api를 호출해야 함

            // socket.emit(socket_values.onEvent.delete_socket_id, {
            //     member_se: se,
            // })
        });

        socket.on('connect_error', (err: any) => {
            // alert('소켓 connect_error')
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 connect_error: ${err}`
            //     }
            // });
            console.log('소켓 커넥트 에러', err)
        })

        socket.on('error', (err: any) => {
            // alert('소켓 error')
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 error: ${err}`
            //     }
            // });
            console.log('소켓 에러', err)
        })

        socket.on("reconnect", (attemptNumber) => {
            // alert(`소켓 reconnect => 시도 횟수: ${attemptNumber}`)
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 reconnect => 시도 횟수: ${attemptNumber}`
            //     }
            // });
            console.log(`소켓 리커넥트 (시도 횟수: ${attemptNumber})`);
        });

        socket.on("close", () => {
            // alert(`소켓 close`);
            // messageWebview({
            //     type: 'dialog',
            //     param: {
            //         'title': `소켓 close`
            //     }
            // });
            console.log('소켓 닫힘')
        })

        return () => {
            socket?.disconnect();
        }
    }, [socket])

    return socket;
}