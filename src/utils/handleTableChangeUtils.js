export const handleTableChange = (setSortField, setSortOrder, columns, setFilters = null, filterField = '') =>
    (pagination, filters, sorter) => {
        let field = sorter.field;
        let order = sorter.order;
        let orderIndex = columns.find(column => column.dataIndex === field)?.orderIndex || field;

        if (order === 'ascend') {
            setSortField(orderIndex);
            setSortOrder('ascend');
        } else if (order === 'descend') {
            setSortField(orderIndex);
            setSortOrder('descend');
        } else {
            setSortField('');
            setSortOrder('');
        }

        if (setFilters && filterField) {
            const updatedFilters = {...filters};
            if (filters[filterField]) {
                updatedFilters[filterField] = filters[filterField][0];
            }
            setFilters(updatedFilters);
        }
    };
