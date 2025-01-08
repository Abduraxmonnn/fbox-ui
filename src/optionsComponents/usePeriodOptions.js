import {useTranslation} from 'react-i18next';
import dayjs from "dayjs";

const usePeriodPresets = () => {
    const {t} = useTranslation();

    return [
        {
            label: t('analysis.headerFilters.period.last7Days'),
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: t('analysis.headerFilters.period.last14Days'),
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: t('analysis.headerFilters.period.last30Days'),
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: t('analysis.headerFilters.period.last90Days'),
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];
};

export default usePeriodPresets;
