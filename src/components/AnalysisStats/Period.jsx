import {Link} from 'react-router-dom';
import {DatePicker, Space, Tag} from 'antd';
import {useTranslation} from 'react-i18next';
import dayjs, {Dayjs} from "dayjs";
import usePeriodPresets from "../../optionsComponents/usePeriodOptions";

const {RangePicker} = DatePicker;

const Period = ({handleChangePeriod}) => {
    const {t} = useTranslation();

    const disabledDate = (current: Dayjs) => {
        return dayjs().add(1, 'day') < current;
    };

    return (
        <>
            <Space wrap>
                <span>{t('analysis.headerFilters.period.title1')}</span>
                <RangePicker
                    presets={usePeriodPresets()}
                    defaultValue={[
                        dayjs().startOf('day'),
                        dayjs().add(1, 'day').startOf('day')
                    ]}
                    onChange={handleChangePeriod}
                    disabledDate={disabledDate}
                    allowClear={false}
                />
                <span style={{fontSize: 16}}>
                    <Tag color="red" size="sm">
                        {t("analysis.headerFilters.period.title2")}
                    </Tag>
                    <Tag color="green" size="sm">
                        {t("analysis.headerFilters.period.title3")} <Link
                        to={'/feedback/'}>{t("pages.feedback.title")}</Link>. {t("common.thanks")}
                    </Tag>
                </span>
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