import {useTranslation} from 'react-i18next';
import {Radio} from 'antd';


const Localization = () => {
    const {i18n} = useTranslation();

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <Radio.Group>
            <Radio.Button onClick={changeLanguage} value='en'>
                🇺🇸 English
            </Radio.Button>
            <Radio.Button onClick={changeLanguage} value='ru'>
                🇷🇺 Русский
            </Radio.Button>
        </Radio.Group>
    );
};

export default Localization;