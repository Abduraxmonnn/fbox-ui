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