import {ClockCircleOutlined} from "@ant-design/icons";

export const getSmsBadgeCount = (show, count) => {
    if (count === 'clock') {
        return show ? (
            <ClockCircleOutlined style={{ color: '#f5222d' }} />
        ) : (
            0
        );
    }
    return show ? count : 0;
};