import React from 'react';
import Counter from '../components/Counter';
import AlertModal from '../components/AlertModal';
import { useMain } from '../context/MainContext';

const Index = () => {
    const { showAlert } = useMain();
    return (
        <>
            {showAlert && <AlertModal />}
            <div className="App">
                <header className="App-header">
                    <Counter />
                </header>
            </div>
        </>
    );
};

export default Index;
