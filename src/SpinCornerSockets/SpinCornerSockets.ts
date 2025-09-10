import {useCallback, useRef} from 'react';
import type {BuySpinsRequest} from "../Utils/types.ts";

export const SpinCornerSockets = () => {
    const messageQueue = useRef<(BuySpinsRequest)[]>([]);
    const ws = useRef<WebSocket | null>(null);

    const connectSocket = useCallback(() => {
        if (ws.current && ws.current.readyState !== WebSocket.CLOSED) {
            console.log('WebSocket connected');
            return;
        }

        ws.current = new WebSocket('wss://lottomotto.co.ke/spincorner');

        ws.current.onopen = () => {
            processMessageQueue();
        };

        const processMessageQueue = () => {
            while (messageQueue.current.length > 0) {
                const data = messageQueue.current.shift();
                if (data) {
                    sendSpinData(data);
                }
            }
        };

        ws.current.onmessage = (event: MessageEvent<string>) => {
            console.log('Received a raw message event:', event);

            if (event && event.data) {
                console.log('Raw message data:', event.data);

            } else {
                console.error('Event or event.data is null');
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error observed:', error);
        };

        ws.current.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }, []);

    const sendSpinData = (data: BuySpinsRequest) => {
        const message = JSON.stringify(data);

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
            console.log('Message sent:', message);
        } else {
            messageQueue.current.push(data);
            console.error('WebSocket is not open. Message queued.');
        }
    };

    const getSocket = () => ws.current;

    return {
        connectSocket,
        sendSpinData,
        getSocket,
    };
};
