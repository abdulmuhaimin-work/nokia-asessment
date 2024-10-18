import React from 'react';
import { useMain } from '../context/MainContext';

const AlertModal = () => {
    const { setShowAlert, alertMessage, setAlertMessage } = useMain();
    return (
        <div className="alert-modal">
            <div className="alert-content">
                <p>{alertMessage}</p>
                <button onClick={() => {setShowAlert(false); setAlertMessage('')}}>Close</button>
            </div>
        </div>
    );
};

export default AlertModal;