import React from "react";

const VersionsColumns = (t) => {
    return [
        {
            title: t('common.id'),
            dataIndex: 'version_id',
            sorter: {},
            render: title => <a>{title}</a>,
            width: 200,
        },
        {
            title: t('pages.versions.listColumns.column1'),
            dataIndex: 'version_number',
            render: title => <a>{title}</a>,
        },
        {
            title: t('pages.versions.listColumns.column2'),
            dataIndex: 'file',
        },
    ]
};

export default VersionsColumns;
