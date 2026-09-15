const StatusMessage = ({ children, padded = false }) => {
    const className = padded ? 'status-message status-message_padded' : 'status-message';

    return (
        <div className="container">
            <h5 className={className}>{children}</h5>
        </div>
    );
};

export default StatusMessage;
