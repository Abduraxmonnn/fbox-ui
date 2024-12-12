import React, {useState, useEffect} from "react";
import {Checkbox} from "antd";
import './PaymentProvidersPermission.scss'

const CheckboxGroup = Checkbox.Group;

const PaymentProvidersPermissionCheckBox = ({
                                                providerPermissions,
                                                onChange
                                            }) => {
    const [checkedList, setCheckedList] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);

    const options = Object.keys(providerPermissions);

    useEffect(() => {
        const initialCheckedList = options.filter(provider => providerPermissions[provider]);
        setCheckedList(initialCheckedList);
        updateCheckAllStatus(initialCheckedList);
    }, [providerPermissions]);

    const updateCheckAllStatus = (list) => {
        setIndeterminate(list.length > 0 && list.length < options.length);
        setCheckAll(list.length === options.length);
    };

    const onCheckAllChange = (e) => {
        const newCheckedList = e.target.checked ? options : [];
        setCheckedList(newCheckedList);
        updateCheckAllStatus(newCheckedList);
        onChange(newCheckedList);
    };

    const onGroupChange = (list) => {
        setCheckedList(list);
        updateCheckAllStatus(list);
        onChange(list);
    };

    return (
        <div className="providers-permission">
            <label className="providers-permission__label">Providers Permission</label>
            <div className="providers-permission__full">
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                >
                    Full Permission
                </Checkbox>
            </div>
            <div className="providers-permission__grid">
                <CheckboxGroup
                    options={options}
                    value={checkedList}
                    onChange={onGroupChange}
                />
            </div>
        </div>
    );
};

export default PaymentProvidersPermissionCheckBox;

