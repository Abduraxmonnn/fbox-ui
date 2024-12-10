import {Radius} from 'lucide-react';

export function StatusIcon({status}) {
    switch (status) {
        case true:
            return (
                <svg viewBox="0 0 24 24" className="payment-log__status-icon payment-log__status-icon--success">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            );
        case false:
            return (
                <svg viewBox="0 0 24 24" className="payment-log__status-icon payment-log__status-icon--failure">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            );
        case 'success':
            return (
                <svg viewBox="0 0 24 24" className="payment-log__status-icon payment-log__status-icon--success">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            );
        case 'failure':
            return (
                <svg viewBox="0 0 24 24" className="payment-log__status-icon payment-log__status-icon--failure">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            );
        case 'warning':
            return (
                <svg viewBox="0 0 24 24" className="payment-log__status-icon payment-log__status-icon--warning">
                    <path
                        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            );
        case 'pending':
            return (
                <svg viewBox="0 0 24 24" className="payment-log__status-icon payment-log__status-icon--pending">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            );
        default:
            return null;
    }
}

export function LogsStatusIcon({size, status}) {
    console.log(status);
    switch (status) {
        case 'PROCESSING':
            return (
                <Radius size={size} color={'#FFEB3B'}/>
            );
        case 'PAID':
            return (
                <Radius size={size} color={'#2196F3'}/>
            );
        case 'FISCALIZED':
            return (
                <Radius size={size} color={'#4CAF50'}/>
            );
        case 'FAILED':
            return (
                <Radius size={size} color={'#F44336'}/>
            );
        case 'CANCELED':
            return (
                <Radius size={size} color={'#9E9E9E'}/>
            );
        default:
            return null;
    }
}
