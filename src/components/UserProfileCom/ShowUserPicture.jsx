import {CircleX, Maximize} from "lucide-react";
import React, {useState} from "react";
import {images} from "../../constants";
import {useTranslation} from "react-i18next";

export default function ShowUserPicture(data) {
    const {t} = useTranslation();
    const [fullscreenImage, setFullscreenImage] = useState(null);

    const openFullscreen = (imageSrc: string) => {
        setFullscreenImage(imageSrc);
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    const defaultProfilePictures = [
        {
            id: 'billing',
            divClassName: 'billing-picture',
            srcClassName: 'billing-img',
            src: images.defaultAvatar2,
            alt: 'Billing',
            label: t("pages.user.profile.avatar1")
        },
        {
            id: 'qrLogo',
            divClassName: 'qr-logo',
            srcClassName: null,
            src: data.data.logo,
            alt: 'scan2pay logo',
            label: t("pages.user.profile.avatar2")
        },
        {
            id: 'qrBanner',
            divClassName: 'qr-banner',
            srcClassName: null,
            src: data.data.banner,
            alt: 'scan2pay banner',
            label: t("pages.user.profile.avatar3")
        },
    ]

    return (
        <>
            {
                defaultProfilePictures.map((picture) => (
                    <div
                        key={picture.id}
                        className={picture.divClassName}
                        onClick={() => openFullscreen(picture.src)}
                    >
                        <img className={picture.srcClassName} src={picture.src} alt={picture.alt}/>
                        <span>{picture.label}</span>
                        <div className="hover-overlay">
                            <Maximize size={24} color={'#3f96ff'}/>
                        </div>
                    </div>
                ))
            }
            {fullscreenImage && (
                <div className="fullscreen-image" onClick={closeFullscreen}>
                    <img src={fullscreenImage} alt="Full-screen view"/>
                    <div className="close-button" onClick={(e) => {
                        e.stopPropagation();
                        closeFullscreen();
                    }}>
                        <CircleX size={26}/>
                    </div>
                </div>
            )}
        </>
    )
}
