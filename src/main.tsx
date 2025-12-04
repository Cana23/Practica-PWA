import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from './registerServiceWorker';

createRoot(document.getElementById('root')!).render(<App />);
registerSW();