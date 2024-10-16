import './App.css';
import { MainProvider } from './context/MainContext'; 
import Index from './pages/index';

function App() {
  return (
    <MainProvider>
      <Index />
    </MainProvider>
  );
}

export default App;
