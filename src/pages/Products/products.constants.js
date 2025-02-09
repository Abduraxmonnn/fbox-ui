import {Link} from "react-router-dom";

const ProductsColumns = (t) => {
    return [
        {
            title: t('pages.products.listColumns.column1'),
            dataIndex: 'name',
            render: (text, record) => (
                <Link to={`/product/detail/${record.key}`}>{text}</Link>
            ),
        },
        {
            title: t('pages.products.listColumns.column2'),
            dataIndex: 'barcode',
            render: (text, record) => (
                <Link to={`/product/detail/${record.key}`}>{text}</Link>
            ),
        },
        {
            title: t('pages.products.listColumns.column3'),
            dataIndex: 'amount',
            sorter: true,
            orderIndex: "amount",
        },
        {
            title: t('pages.products.listColumns.column4'),
            dataIndex: 'product_price',
            sorter: true,
            orderIndex: "product_price",
        },
        {
            title: t('pages.products.listColumns.column5'),
            dataIndex: 'price',
            sorter: true,
            orderIndex: "price",
        },
        {
            title: t('pages.products.listColumns.column6'),
            dataIndex: 'discount_percent',
            sorter: true,
            orderIndex: "discount_percent",
        },
    ]
};

export default ProductsColumns;
