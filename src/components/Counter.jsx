import { useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import AlertModal from './AlertModal';
import { useMain } from '../context/MainContext';

const Counter = () => {
    const [count, setCount] = useState(0);
    const { setShowAlert, setAlertMessage } = useMain();
    const lastSuccessfulClickTime = useRef(0);

    const handleClick = useCallback((operation) => {
        const currentTime = Date.now();
        if (currentTime - lastSuccessfulClickTime.current < 3000) {
            setShowAlert(true);
            setAlertMessage('Please wait at least 3 seconds between clicks.');
        } else {
            setCount(prevCount => operation === 'increment' ? prevCount + 1 : prevCount - 1);
            lastSuccessfulClickTime.current = currentTime;
        }
    }, [setShowAlert, setAlertMessage]);

    return (
        <>
            <button data-testid='increment' onClick={() => handleClick('increment')}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <h1>Count: {count}</h1>
            <button data-testid='decrement' onClick={() => handleClick('decrement')}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
        </>
    );
};

export default Counter;
