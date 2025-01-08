import {DatePicker, Space} from 'antd';
import {useTranslation} from 'react-i18next';
import dayjs, {Dayjs} from "dayjs";

const {RangePicker} = DatePicker;

const Period = ({handleChangePeriod}) => {
    const {t} = useTranslation();

    const disabledDate = (current: Dayjs) => {
        return dayjs() < current;
    };

    return (
        <>
            <Space wrap>
                <span>{t('analysis.headerFilters.period.title')}</span>
                <RangePicker
                    defaultValue={[
                        dayjs().startOf('day'),
                        dayjs().add(1, 'day').startOf('day')
                    ]}
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