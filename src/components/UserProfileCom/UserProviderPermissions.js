import {Badge, Space, Switch} from "antd";
import {getSmsClockBadgeColor} from "../../utils";
import React from "react";

export function UserProviderPermissions(data) {
    return (
        <>
            {/*<Space>*/}
            {/*    <Switch value={isSmsShow} onChange={() => setIsSmsShow(!isSmsShow)}*/}
            {/*            checkedChildren="On" unCheckedChildren="Off"*/}
            {/*            style={{backgroundColor: isSmsShow ? "var(--color-status-on)" : "var(--color-status-off"}}/>*/}
            {/*    <Badge count={profileData.totalSms} color={isSmsShow ? "#faad14" : "gray"}*/}
            {/*           overflowCount={Infinity}/>*/}
            {/*    <Badge count={profileData.successSms} color={isSmsShow ? "#52c41a" : "gray"}*/}
            {/*           overflowCount={Infinity}/>*/}
            {/*    <Badge count={getSmsClockBadgeColor(isSmsShow, 'clock')}*/}
            {/*           overflowCount={Infinity}/>*/}
            {/*    <Badge*/}
            {/*        className="site-badge-count-109"*/}
            {/*        count={profileData.errorSms}*/}
            {/*        color={isSmsShow ? "#f5222d" : "gray"}*/}
            {/*        overflowCount={Infinity}*/}
            {/*    />*/}
            {/*</Space>*/}
        </>
    )
}
