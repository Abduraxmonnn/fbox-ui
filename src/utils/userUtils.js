import {ClockCircleOutlined} from "@ant-design/icons";

export const getSmsClockBadgeColor = (show, count) => {
    if (count === 'clock') {
        return show ? (
            <ClockCircleOutlined style={{ color: '#f5222d' }} />
        ) : (
            <ClockCircleOutlined style={{ color: 'gray' }} />
        );
    }
    return show && count;
};

export const truncateUsername = (username, maxLength = 10) => {
    if (username.length > maxLength) {
        return username.substring(0, maxLength) + '...';
    }
    return username;
};