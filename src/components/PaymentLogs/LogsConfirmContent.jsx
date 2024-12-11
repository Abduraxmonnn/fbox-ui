import {ChevronDown, ChevronUp} from 'lucide-react';


export default function LogsConfirmContent(props) {
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
                <span className="detail-view__expand-button-text">Confirm Content</span>
                {expandedSection === 'log-expand' ? <ChevronUp size={22}/> :
                    <ChevronDown size={22}/>}
            </button>

            {expandedSection === 'log-expand' && (
                <div>
                    <div className="payment-log__field payment-log__field--full">
                        <span className="payment-log__label">Headers:</span>
                        <pre className="payment-log__pre">{logsData.confirmHeaders}</pre>
                    </div>

                    <div className="payment-log__field payment-log__field--full">
                        <span className="payment-log__label">Request:</span>
                        <pre className="payment-log__pre">{logsData.confirmRequest}</pre>
                    </div>

                    <div className="payment-log__field payment-log__field--full">
                        <span className="payment-log__label">Response:</span>
                        <pre className="payment-log__pre">{logsData.confirmResponse}</pre>
                    </div>
                </div>
            )}
        </>
    )
}
