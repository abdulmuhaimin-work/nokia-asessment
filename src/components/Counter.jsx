import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Counter = () => {
    const [count, setCount] = useState(0);
    
    return (
        <>
            <button onClick={() => setCount(count + 1)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count - 1)}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
        </>
    )
}




export default Counter;