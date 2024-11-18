import { Button, TextField, Typography } from '@mui/material';
import { Stomp } from '@stomp/stompjs';
// import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [nickName, setNickName] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe('/topic/messages', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((pre) => [...pre, receivedMessage]);
            });
        });
        console.log(messages);
        setStompClient(client);
        return () => {
            client.disconnect();
        };
    }, []);

    const sendMessage = () => {
        const chatMessage = {
            nickName: nickName,
            content: message,
        };
        if (stompClient && stompClient.connected) {
            stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
            console.log('Da connect');
            console.log('Message sent:', JSON.stringify(chatMessage));
            setMessage('');
        }
    };
    return (
        <div className="container mx-auto px-4">
            <ul className="list-none">
                {messages.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4 py-2">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white uppercase">
                                {item.nickName.charAt(0)}
                            </div>
                        </div>
                        <div className="flex-grow">
                            <p className="text-lg font-semibold">{item.nickName}</p>
                            <p className="text-gray-600">{item.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="d-flex items-center">
                <TextField
                    id="standard-basic"
                    label="nickName"
                    onChange={(e) => setNickName(e.target.value)}
                    variant="standard"
                    value={nickName}
                />
                <TextField
                    id="standard-basic"
                    label="message"
                    onChange={(e) => setMessage(e.target.value)}
                    variant="standard"
                    value={message}
                />
                <Button variant="contained" onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
}
export default Chat;

// import React, { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';

// function Chat() {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     const [nickName, setNickName] = useState('');
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         const newSocket = new SockJS('http://localhost:8080/ws');

//         newSocket.onopen = () => {
//             console.log('WebSocket connected');
//         };

//         newSocket.onmessage = (event) => {
//             const receivedMessage = JSON.parse(event.data);
//             setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//             console.log('qua day');
//         };

//         // newSocket.onclose = () => {
//         //     console.log('WebSocket disconnected');
//         // };

//         setSocket(newSocket);

//         return () => {
//             newSocket.close();
//         };
//     }, []);

//     const sendMessage = () => {
//         const chatMessage = {
//             nickName: nickName,
//             content: message,
//         };
//         if (socket && socket.readyState === WebSocket.OPEN) {
//             socket.send(JSON.stringify(chatMessage));
//             console.log('Message sent:', JSON.stringify(chatMessage));
//             setMessage('');
//             setMessages((pre) => [...pre, chatMessage]);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4">
//             <ul className="list-none">
//                 {messages.map((item, index) => (
//                     <li key={index} className="flex items-center space-x-4 py-2">
//                         <div className="flex-shrink-0">
//                             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white uppercase">
//                                 {item.nickName.charAt(0)}
//                             </div>
//                         </div>
//                         <div className="flex-grow">
//                             <p className="text-lg font-semibold">{item.nickName}</p>
//                             <p className="text-gray-600">{item.content}</p>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//             <div className="d-flex items-center">
//                 <input
//                     type="text"
//                     placeholder="nickName"
//                     value={nickName}
//                     onChange={(e) => setNickName(e.target.value)}
//                 />
//                 <input type="text" placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)} />
//                 <button onClick={sendMessage}>Send</button>
//             </div>
//         </div>
//     );
// }

// export default Chat;
