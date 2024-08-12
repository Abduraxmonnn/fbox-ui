import {useEffect} from 'react';

const ThemeSwitcher = ({isDarkMode}) => {
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.style.setProperty('--header-bg-color', '#141414')
            root.style.setProperty('--header-text-color', '#ffffff')
            root.style.setProperty('--body-bg-color', '#1c1c1c')
            root.style.setProperty('--text-color', '#f0f0f0')

            root.style.setProperty('--content-container-bg-color', '#1c1c1c')
            root.style.setProperty('--detail-box-bg-color', '#000000')

            root.style.setProperty('--box-bg-color', '#000000')
        } else {
            root.style.setProperty('--header-bg-color', '#ffffff')
            root.style.setProperty('--header-text-color', '#000000')

            root.style.setProperty('--content-container-bg-color', '#ffffff')
            root.style.setProperty('--detail-box-bg-color', '#ffffff')

            root.style.setProperty('--box-bg-color', '#ffffff')
        }
    }, [isDarkMode]);

    return null;
};

export default ThemeSwitcher;
