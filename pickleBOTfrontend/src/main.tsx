import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './Styles/fonts.css';
import { AuthProvider } from '../context/AuthProvider.tsx'; // Import the AuthProvider component from the appropriate module

ReactDOM.createRoot(document.getElementById('root')!).render(
        <AuthProvider>
                <App />
        </AuthProvider>
)
