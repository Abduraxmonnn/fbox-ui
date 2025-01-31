import dayjs from 'dayjs';

export function extractDateBySecond(dateString) {
    const utcDate = new Date(dateString);

    if (isNaN(utcDate.getTime())) {
        // console.error('Invalid date string:', dateString);
        return 'Invalid Date';
    }

    const tashkentDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000 + 5 * 60 * 60 * 1000);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    return tashkentDate.toLocaleString('en-GB', options);
}

export const defaultExtractDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
};

export const getFormattedPeriod = (startDate, endDate) => {
    const start = dayjs(startDate).startOf('day');
    const end = dayjs(endDate)
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
        .set('millisecond', 999);

    return {
        startPeriod: start.format('YYYY-MM-DD HH:mm:ss'),
        endPeriod: end.format('YYYY-MM-DD HH:mm:ss'),
    };
};
