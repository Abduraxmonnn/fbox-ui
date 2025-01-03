import {Select, Space} from 'antd';
import {useTranslation} from 'react-i18next';
import usePeriodOptions from "../../optionsComponents/usePeriodOptions";

const Period = ({handleChangePeriod}) => {
    const options = usePeriodOptions();
    const {t} = useTranslation();

    return (
        <>
            <Space wrap>
                <span>{t('analysis.headerFilters.period.title')}</span>
                <Select
                    defaultValue="day"
                    style={{
                        minWidth: 125,
                        width: "max-content",
                    }}
                    onChange={handleChangePeriod}
                    options={options}
                    placeholder="select it"
                />
            </Space>
        </>
    )
};

export default Period;