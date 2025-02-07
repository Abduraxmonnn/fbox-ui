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
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

export const extractStringDate = (dateString) => {
    const date = new Date(dateString);

    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options);

    const [month, day, year] = formattedDate.split(' ');
    const monthAbbr = month.slice(0, 3) + '.';

    return `${monthAbbr} ${day} ${year}`;
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
