import {DatePicker, Space} from 'antd';
import {useTranslation} from 'react-i18next';
import usePeriodOptions from "../../optionsComponents/usePeriodOptions";
import dayjs, {Dayjs} from "dayjs";

const {RangePicker} = DatePicker;

const Period = ({handleChangePeriod}) => {
    const options = usePeriodOptions();
    const {t} = useTranslation();

    const disabledDate = (current: Dayjs) => {
        return dayjs() < current;
    };

    return (
        <>
            <Space wrap>
                <span>{t('analysis.headerFilters.period.title')}</span>
                <RangePicker
                    onChange={handleChangePeriod}
                    disabledDate={disabledDate}
                />
                {/*<Select*/}
                {/*    defaultValue="day"*/}
                {/*    style={{*/}
                {/*        minWidth: 125,*/}
                {/*        width: "max-content",*/}
                {/*    }}*/}
                {/*    onChange={handleChangePeriod}*/}
                {/*    options={options}*/}
                {/*    placeholder="select it"*/}
                {/*/>*/}
            </Space>
        </>
    )
};

export default Period;