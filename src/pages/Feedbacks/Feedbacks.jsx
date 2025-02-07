import {useEffect, useState} from "react";
import {ChevronDown, ChevronUp} from 'lucide-react';
import {Result, Button} from 'antd';
import './Feedbacks.scss';
import {APIv1} from "../../api";
import {defaultExtractDate} from "../../utils";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Feedbacks = (props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [userName, setUserName] = useState("");
    const [feedbackHistory, setFeedbackHistory] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false); // Loading state to show user feedback when submitting
    const [submissionSuccess, setSubmissionSuccess] = useState(false);  // State to control success message display

    const feedbacksStatus = {
        'IN_PROGRESS': t('pages.feedback.status.status1'),
        'PENDING': t('pages.feedback.status.status2'),
        'RESOLVED': t('pages.feedback.status.status3'),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            formData.name = userName
            const response = await APIv1.post('/feedback/', formData, {
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });

            setSubmissionSuccess(true);
            setFormData({name: '', email: '', subject: '', message: ''}); // Reset the form
        } catch (err) {
            console.error('Error submitting feedback:', err);
            alert(t('pages.feedback.errorAlertMessage'));
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes for form
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const toggleExpand = (id) => {
        setFeedbackHistory((prevHistory) =>
            prevHistory.map((item) =>
                item.id === id ? {...item, expanded: !item.expanded} : item
            )
        );
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUserData(items);
            setUserName(items.data.username);
        }
    }, [userData.token]);

    const onNavigateToHomePage = checkedValues => {
        navigate("/analysis")
    }

    useEffect(() => {
        const fetchFeedbacksData = async () => {
            try {
                const response = await APIv1.get('/feedback/', {
                    headers: {
                        Authorization: `Token ${userData.token}`,
                    },
                });
                const data = response.data.results.map((report) => ({
                    key: report.id,
                    name: report.name,
                    email: report.email,
                    subject: report.subject,
                    message: report.message,
                    status: feedbacksStatus[report.status],
                    response: report.response,
                    date: report.created_date ? defaultExtractDate(report.created_date) : '--/--/----',
                }));

                setFeedbackHistory(data);
            } catch (err) {
                console.error('Something went wrong:', err);
            }
        };

        fetchFeedbacksData();
    }, [userData.token]);

    return (
        <div className="feedback-page">
            <h1 className="page-title">{t('pages.feedback.title')}</h1>

            {/* Render success message if submission is successful */}
            {submissionSuccess ? (
                <Result
                    status="success"
                    title={t("pages.feedback.subtitle")}
                    subTitle="Thank you for sharing your feedback. We appreciate your input!"
                    extra={[
                        <Button type="primary" key="console" onClick={onNavigateToHomePage}>
                            Go Home
                        </Button>,
                        <Button key="buy" onClick={() => setSubmissionSuccess(false)}>
                            Submit Another Feedback
                        </Button>,
                    ]}
                />
            ) : (
                <div className="feedback-container">
                    <div className="feedback-form-section">
                        <div className="feedback-content">
                            <h2 className="section-title">{t('pages.feedback.formSection.title')}</h2>
                            <p className="feedback-description">
                                {t('pages.feedback.formSection.description')}
                            </p>

                            <form onSubmit={handleSubmit} className="feedback-form">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        {t('pages.feedback.formSection.input1')} <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder={t('pages.feedback.formSection.placeholder1')}
                                        disabled={true}
                                        defaultValue={userName}
                                        value={userName}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        {t('pages.feedback.formSection.input2')} <span className="required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder={t('pages.feedback.formSection.placeholder2')}
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">
                                        {t('pages.feedback.formSection.input3')} <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder={t('pages.feedback.formSection.placeholder3')}
                                        required
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">{t('pages.feedback.formSection.input4')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder={t('pages.feedback.formSection.placeholder4')}
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="form-textarea"
                                    />
                                </div>

                                <div className="form-footer">
                                    <button type="submit" className="submit-button" disabled={loading}>
                                        {loading ? `${t("pages.feedback.submittingButton")}` : `${t("pages.feedback.submitButton")}`}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="feedback-history-section">
                        <div className="history-content">
                            <h2 className="section-title">{t('pages.feedback.recentSection.title')}</h2>
                            <div className="history-list">
                                {feedbackHistory.map((feedback) => (
                                    <div key={feedback.id} className="history-item">
                                        <div className="history-item-header">
                                            <h3 className="history-item-name">{feedback.name}</h3>
                                            <span
                                                className="history-item-date">{new Date(feedback.date).toLocaleDateString()}</span>
                                        </div>
                                        <p className="history-item-subject">{feedback.subject}</p>
                                        <p className="history-item-message">{feedback.message}</p>
                                        <div className="history-item-footer">
                                            <span className="history-item-email">{feedback.email}</span>
                                            <button
                                                className="expand-button"
                                                onClick={() => toggleExpand(feedback.id)}
                                                aria-expanded={feedback.expanded}
                                            >
                                                {feedback.expanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                                                <span
                                                    className="expand-button-text">{feedback.expanded ? `${t('pages.feedback.recentSection.collapseTitle')}` : `${t('pages.feedback.recentSection.expandTitle')}`}</span>
                                            </button>
                                        </div>
                                        {feedback.expanded && (
                                            <div className="history-item-details">
                                                <div className="detail-row">
                                                    <span
                                                        className="detail-label">{t('pages.feedback.recentSection.statusTitle')}:</span>
                                                    <span
                                                        className={`detail-value status-${feedback.status.toLowerCase().replace(' ', '-')}`}>
                                                        {feedback.status}
                                                    </span>
                                                </div>
                                                <div className="detail-row">
                                                    <span
                                                        className="detail-label">{t('pages.feedback.recentSection.responseTitle')}:</span>
                                                    <span className="detail-value">
                                                        {feedback.response || 'No response yet'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feedbacks;
