import {useTranslation} from 'react-i18next';
import {Select, Space} from 'antd';
import {useEffect} from "react";

const Localization = () => {
    const {i18n} = useTranslation();

    function changeLanguage(value) {
        i18n.changeLanguage(value);
        localStorage.setItem('i18nextLng', value);
    }

    return (
        <>
            <Space wrap>
                <Select
                    value={i18n.language}
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
