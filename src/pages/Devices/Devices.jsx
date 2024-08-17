import {useCallback, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {APIv1} from "../../api";

const Devices = () => {
    let defaultPageSize = 20;
    const [userData, setUserData] = useState({});
    const [deviceData, setDeviceData] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [loading, setLoading] = useState(true);
    const [totalDevice, setTotalDevice] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [sortField, setSortField] = useState('');
    const [sortDevice, setSortDevice] = useState('');
    const [filters, setFilters] = useState({});
    const {searchText} = useOutletContext();

    const fetchDeviceData = useCallback(async (page, size, search = '', ordering = '', filters = {}) => {
        setLoading(true);
        try {
            const response = await APIv1.get('/devices/get_by_user/', {
                params: {
                    page,
                    page_size: size,
                    search,
                    ordering,
                    ...filters,
                }
            })
            const data = response.data.results.map((device) => ({
                key: device.id,
                device_serial_number: device.device_serial_number,
                is_multi_user: device.is_multi_user,
                start_date: device.start_date,
                end_date: device.end_date,
                click: device.click,
                pay_me: device.pay_me,
                apelsin: device.apelsin,
                anor: device.anor
            }))
            setDeviceData(data)
            setTotalDevice(response.data.count)
        } catch (err) {
            console.error('Something went wrong:', err)
        } finally {
            setLoading(false)
        }
    }, []);
};

export default Devices;