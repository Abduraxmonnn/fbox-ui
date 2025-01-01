import {useTranslation} from 'react-i18next';
import {Select, Space} from 'antd';

const Localization = () => {
    const {i18n} = useTranslation();

    function changeLanguage(value) {
        i18n.changeLanguage(value); // Use the selected value directly
    }

    return (
        <>
            <Space wrap>
                <Select
                    defaultValue="en"
                    style={{
                        width: 130,
                    }}
                    onChange={changeLanguage}
                    options={[
                        {
                            value: 'en',
                            label: '🇺🇸 English',
                        },
                        {
                            value: 'ru',
                            label: '🇷🇺 Русский',
                        },
                        {
                            value: 'uz',
                            label: '🇺🇿 O‘zbekcha',
                        },
                    ]}
                />
            </Space>
        </>
    );
};

export default Localization;
