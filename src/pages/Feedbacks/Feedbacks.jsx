import {useEffect, useState} from "react";
import {ChevronDown, ChevronUp} from 'lucide-react';
import './Feedbacks.scss'
import {APIv1} from "../../api";
import {defaultExtractDate} from "../../utils";

const feedbacksStatus = {
    'IN_PROGRESS': 'In Progress',
    'PENDING': 'Pending',
    'RESOLVED': 'Resolving',
}

const Feedbacks = (props) => {
    // const [feedbackHistory, setFeedbackHistory] = useState([
    //     {
    //         id: 1,
    //         name: "John Doe",
    //         email: "john@example.com",
    //         subject: "Great Service",
    //         message: "Great service! Really impressed with the quick response.",
    //         date: "2024-01-15",
    //         status: "Resolved",
    //         response: "Thank you for your positive feedback! We're glad you had a great experience.",
    //         expanded: false
    //     },
    //     {
    //         id: 2,
    //         name: "Sarah Smith",
    //         email: "sarah@example.com",
    //         subject: "New Features",
    //         message: "The new features are amazing. Keep up the good work!",
    //         date: "2024-01-14",
    //         status: "Pending",
    //         response: "",
    //         expanded: false
    //     },
    //     {
    //         id: 3,
    //         name: "Mike Johnson",
    //         email: "mike@example.com",
    //         subject: "Initial Issues",
    //         message: "Had some initial issues but support team was very helpful.",
    //         date: "2024-01-13",
    //         status: "In Progress",
    //         response: "We're working on resolving the issues you encountered. We'll update you soon.",
    //         expanded: false
    //     },
    //     {
    //         id: 4,
    //         name: "Mike Johnson",
    //         email: "mike@example.com",
    //         subject: "Initial Issues",
    //         message: "Had some initial issues but support team was very helpful.",
    //         date: "2024-01-13",
    //         status: "In Progress",
    //         response: "We're working on resolving the issues you encountered. We'll update you soon.",
    //         expanded: false
    //     },
    //     {
    //         id: 5,
    //         name: "Mike Johnson",
    //         email: "mike@example.com",
    //         subject: "Initial Issues",
    //         message: "Had some initial issues but support team was very helpful.",
    //         date: "2024-01-13",
    //         status: "In Progress",
    //         response: "We're working on resolving the issues you encountered. We'll update you soon.",
    //         expanded: false
    //     }
    // ]);
    const [userData, setUserData] = useState({});
    const [feedbackHistory, setFeedbackHistory] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const toggleExpand = (id) => {
        setFeedbackHistory(prevHistory =>
            prevHistory.map(item =>
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

    useEffect(() => {
        const fetchFeedbacksData = async () => {
            try {
                const response = await APIv1.get('/feedback/', {
                    headers: {
                        Authorization: `Token ${userData.token}`,
                    }
                });
                const data = response.data.results.map((report) => ({
                    key: report.id,
                    name: report.name,
                    email: report.email,
                    subject: report.subject,
                    message: report.message,
                    status: feedbacksStatus[report.status],
                    response: report.response,
                    date: report.created_date ? defaultExtractDate(report.created_date) : '--/--/----'
                }));

                setFeedbackHistory(data)
            } catch (err) {
                // console.error('Something went wrong:', err)
            }
        };

        fetchFeedbacksData();
    }, [userData.token])

    return (
        <div className="feedback-page">
            <h1 className="page-title">Customer Feedback</h1>
            <div className="feedback-container">
                <div className="feedback-form-section">
                    <div className="feedback-content">
                        <h2 className="section-title">Form</h2>
                        <p className="feedback-description">
                            We value your opinion! This is your space to share your thoughts, experiences, and
                            suggestions with us. Your feedback helps us understand what we’re doing well and where we
                            can improve. Whether you have a compliment, a concern, or an idea for enhancement, we want
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
                                    className="form-textarea"
                                />
                            </div>

                            <div className="form-footer">
                                <button type="submit" className="submit-button">
                                    Submit Feedback
                                </button>
                                <span className="powered-by">
                  Powered by <span className="opn-form">OpnForm</span>
                </span>
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
        </div>
    );
};


export default Feedbacks;
