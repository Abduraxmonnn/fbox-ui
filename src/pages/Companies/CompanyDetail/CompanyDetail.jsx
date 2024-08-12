import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {APIv1, baseAPI} from "../../../api";
import {Button, Tag, Result} from "antd";
import "./CompanyDetail.scss"

const CompanyDetail = () => {
    const {id} = useParams()
    const [company, setCompany] = useState([])
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({});
    const navigate = useNavigate()

    const handleClick = () => {
        if (userData.data && userData.data.is_superuser) {
            const url = `${baseAPI}admin/device/company/${id}/change/`;
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            console.warn('Insufficient permissions to access the target URL.');
        }
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
        }
    }, [userData.token]);

    const extractDate = dateString => {
        const date = new Date(dateString)
        return date.toISOString().slice(0, 10)
    }

    useEffect(() => {
        const fetchCompanyDetail = async () => {
            setLoading(true)
            try {
                const response = await APIv1.get(`/company/${id}`)
                setCompany(response.data)
            } catch (err) {
                console.error('Something went wrong:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchCompanyDetail()
    }, [id])

    if (!company) {
        return <div>Company not found</div>
    }

    return (
        <section className='content_container'>
            <div className='company_detail__title'>
                <div>
                    <h1>{company.name}</h1>
                    <span>
						<span className='company_detail__inn'>
							Company inn:{' '}
						</span>
                        {company.inn}
					</span>
                </div>
                <div className="action_buttons">
                    <Button
                        style={{
                            width: '15%',
                            display: 'inline-block',
                            marginRight: '1%',
                        }}
                        type='dashed'
                        disabled={!userData.data || !userData.data.is_superuser}
                        onClick={handleClick}>
                        Edit
                    </Button>
                    <Button
                        style={{
                            width: '15%',
                            display: 'inline-block',
                            marginRight: '1%',
                        }}
                        type='dashed'
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </div>
            </div>
            <div className='detail_graphBox'>
                <div className='detail_box'>
                    <ul className="data_list">
                        <h1>Base information</h1>
                        <li>
                            <span>Address:</span>
                            <span>
								{company.address ? company.address :
                                    <Tag color={!company.address && 'lightgray'}>
                                        {company.address || 'empty'}
                                    </Tag>}
							</span>
                        </li>
                        <li>
                            <span>Phone number:</span>
                            <span>{company.phone_number}</span>
                        </li>
                        <li>
                            <span>Start date:</span>
                            <span>
								{company.start_date
                                    ? extractDate(company.start_date)
                                    : '----/--/--'}
							</span>
                        </li>
                        <li>
                            <span>End date:</span>
                            <span>
								{company.end_date
                                    ? extractDate(company.end_date)
                                    : '----/--/--'}
							</span>
                        </li>
                    </ul>
                    <ul className="data_list">
                        <h1>Payment permissions</h1>
                        <li>
                            <span>Click:</span>
                            <span>
								<Tag color={company.click ? 'green' : 'volcano'}>
									{company.click ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>PayMe:</span>
                            <span>
								<Tag color={company.pay_me ? 'green' : 'volcano'}>
									{company.pay_me ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>Uzum:</span>
                            <span>
								<Tag color={company.apelsin ? 'green' : 'volcano'}>
									{company.apelsin ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>Anor:</span>
                            <span>
								<Tag color={company.anor ? 'green' : 'volcano'}>
									{company.anor ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                    </ul>
                    <ul className="data_list">
                        <h1>SMS information</h1>
                        <li>
                            <span>Sent SMS:</span>
                            <span>
								<Tag color={company.send_sms ? 'green' : 'volcano'}>
									{company.send_sms ? 'TRUE' : 'FALSE'}
								</Tag>
							</span>
                        </li>
                        <li>
                            <span>Sent sms:</span>
                            <span>{company.count_sent_sms}</span>
                        </li>
                        <li>
                            <span>Last month sent sms:</span>
                            <span>{company.last_month_sms_count}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default CompanyDetail;