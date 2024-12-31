import {useEffect, useState} from "react";
import {ChevronDown, ChevronUp} from 'lucide-react';
import {Result, Button} from 'antd';
import './Feedbacks.scss';
import {APIv1} from "../../api";
import {defaultExtractDate} from "../../utils";
import {useNavigate} from "react-router-dom";

const feedbacksStatus = {
    'IN_PROGRESS': 'In Progress',
    'PENDING': 'Pending',
    'RESOLVED': 'Resolving',
};

const Feedbacks = (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [feedbackHistory, setFeedbackHistory] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false); // Loading state to show user feedback when submitting
    const [submissionSuccess, setSubmissionSuccess] = useState(false);  // State to control success message display

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log(userData.token)
            const response = await APIv1.post('/feedback/', formData, {
                headers: {
                    Authorization: `Token ${userData.token}`,
                },
            });

            setSubmissionSuccess(true);
            setFormData({name: '', email: '', subject: '', message: ''}); // Reset the form
        } catch (err) {
            console.error('Error submitting feedback:', err);
            alert('Something went wrong. Please try again later.');
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
            <h1 className="page-title">Customer Feedback</h1>

            {/* Render success message if submission is successful */}
            {submissionSuccess ? (
                <Result
                    status="success"
                    title="Feedback Submitted Successfully!"
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
                            <h2 className="section-title">Form</h2>
                            <p className="feedback-description">
                                We value your opinion! This is your space to share your thoughts, experiences, and
                                suggestions with us. Your feedback helps us understand what we’re doing well and where
                                we
                                can improve. Whether you have a compliment, a concern, or an idea for enhancement, we
                                want
                                to hear from you. Thank you for taking the time to help us serve you better!
                            </p>

                            <form onSubmit={handleSubmit} className="feedback-form">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Name <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email <span className="required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">
                                        Subject <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Enter the subject of your feedback"
                                        required
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Write your message..."
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="form-textarea"
                                    />
                                </div>

                                <div className="form-footer">
                                    <button type="submit" className="submit-button" disabled={loading}>
                                        {loading ? 'Submitting...' : 'Submit Feedback'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="feedback-history-section">
                        <div className="history-content">
                            <h2 className="section-title">Recent Feedbacks</h2>
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
                                                    className="expand-button-text">{feedback.expanded ? 'Less' : 'More'}</span>
                                            </button>
                                        </div>
                                        {feedback.expanded && (
                                            <div className="history-item-details">
                                                <div className="detail-row">
                                                    <span className="detail-label">Status:</span>
                                                    <span
                                                        className={`detail-value status-${feedback.status.toLowerCase().replace(' ', '-')}`}>
                                                        {feedback.status}
                                                    </span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Response:</span>
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
