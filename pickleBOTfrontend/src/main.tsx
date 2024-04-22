import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './Styles/fonts.css';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '../context/AuthProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
        <>
        <AuthProvider>
                <Analytics/>
                <App />     
        </AuthProvider>
        </>
                

)
