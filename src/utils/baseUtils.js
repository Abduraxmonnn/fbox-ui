import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

type RowData = {
    [key: string]: any;
};

type NavigationConfig = {
    routePrefix: string;
    idField: string;
};

export const useRowNavigation = ({routePrefix, idField}: NavigationConfig) => {
    const navigate = useNavigate();

    return useCallback((record: RowData) => {
        let clickTimer: NodeJS.Timeout | null = null;

        const handleNavigation = () => {
            navigate(`${routePrefix}/${record[idField]}`);
        };

        return {
            onDoubleClick: () => {
                if (clickTimer) {
                    clearTimeout(clickTimer);
                }
                handleNavigation();
            },
            onClick: () => {
                if (clickTimer) {
                    clearTimeout(clickTimer);
                }
                clickTimer = setTimeout(() => {
                    // Single click action (if needed)
                }, 250);
            },
            onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleNavigation();
                }
            },
            role: 'button',
            tabIndex: 0,
        };
    }, [navigate, routePrefix, idField]);
};

export function isBoolean(n) {
    return !!n === n;
}