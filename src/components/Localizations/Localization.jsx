import {useTranslation} from 'react-i18next';
import {Select, Space} from 'antd';
import {useEffect} from "react";
import ReactCountryFlag from "react-country-flag";

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
                            label: (
                                <>
                                    <ReactCountryFlag countryCode="GB" style={{fontSize: "1em"}}/> English
                                </>
                            ),
                        },
                        {
                            value: 'ru',
                            label: (
                                <>
                                    <ReactCountryFlag countryCode="RU" style={{fontSize: "1em"}}/> Русский
                                </>
                            ),
                        },
                        {
                            value: 'uz',
                            label: (
                                <>
                                    <ReactCountryFlag countryCode="UZ" style={{fontSize: "1em"}}/> O‘zbekcha
                                </>
                            ),
                        },
                    ]}
                />
            </Space>
        </>
    );
};

export default Localization;
