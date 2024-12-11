import {ChevronDown, ChevronUp} from 'lucide-react';


export default function LogsPaymentContent(props) {
    let expandedSection = props.expandedSection;
    let logsData = props.logsData;
    let toggleSection = props.toggleSection;

    return (
        <>
            <button
                className="detail-view__expand-button"
                onClick={() => toggleSection('log-expand')}
                aria-expanded={expandedSection === 'log-expand'}
            >
                <span className="detail-view__expand-button-text">Payment Content</span>
                {expandedSection === 'log-expand' ? <ChevronUp size={22}/> :
                    <ChevronDown size={22}/>}
            </button>

            {expandedSection === 'log-expand' && (
                <div>
                    <div className="payment-log__field payment-log__field--full">
                        <span className="payment-log__label">Headers:</span>
                        {/*<TextArea rows={1} value={logsData.paymentHeaders} />*/}
                        <pre className="payment-log__pre">{logsData.paymentHeaders}</pre>
                    </div>

                    <div className="payment-log__field payment-log__field--full">
                        <span className="payment-log__label">Request:</span>
                        {/*<TextArea rows={4} value={logsData.paymentRequest} />*/}
                        <pre className="payment-log__pre">{logsData.paymentRequest}</pre>
                    </div>

                    <div className="payment-log__field payment-log__field--full">
                        <span className="payment-log__label">Response:</span>
                        {/*<TextArea rows={6} value={logsData.paymentResponse} />*/}
                        <pre className="payment-log__pre">{logsData.paymentResponse}</pre>
                    </div>
                </div>
            )}
        </>
    )
}