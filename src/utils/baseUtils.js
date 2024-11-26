import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

export const useRowNavigation = ({routePrefix, idField}: NavigationConfig) => {

    type RowData = {
        [key: string]: any;
    };

    type NavigationConfig = {
        routePrefix: string;
        idField: string;
    };

    const navigate = useNavigate();

    return useCallback((record: RowData) => {
        return {
            onClick: () => {
                navigate(`${routePrefix}/${record[idField]}`);
            },
            onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`${routePrefix}/${record[idField]}`);
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