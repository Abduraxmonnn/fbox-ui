import {Link} from "react-router-dom";

const ProductsColumns = (t) => {
    return [
        {
            title: "Name",
            dataIndex: 'name',
            render: (text, record) => (
                <Link to={`/product/detail/${record.key}`}>{text}</Link>
            ),
        },
        {
            title: "Barcode",
            dataIndex: 'barcode',
            render: (text, record) => (
                <Link to={`/product/detail/${record.key}`}>{text}</Link>
            ),
        },
        {
            title: "Amount",
            dataIndex: 'amount',
            sorter: true,
            orderIndex: "amount",
        },
        {
            title: "Product price",
            dataIndex: 'product_price',
            sorter: true,
            orderIndex: "product_price",
        },
        {
            title: "Price",
            dataIndex: 'price',
            sorter: true,
            orderIndex: "price",
        },
        {
            title: "Discount percent",
            dataIndex: 'discount_percent',
            sorter: true,
            orderIndex: "discount_percent",
        },
    ]
};

export default ProductsColumns;
