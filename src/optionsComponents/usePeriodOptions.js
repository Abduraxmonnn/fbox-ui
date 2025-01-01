import {useTranslation} from 'react-i18next';

const usePeriodOptions = () => {
    const {t} = useTranslation();

    return [
        {
            value: 'day',
            label: t('analysis.headerFilters.period.lastHour'),
        },
        {
            value: 'hour',
            label: t('analysis.headerFilters.period.lastHour'),
        },
        {
            value: 'month',
            label: t('analysis.headerFilters.period.last30Days'),
        },
    ];
};

export default usePeriodOptions;
