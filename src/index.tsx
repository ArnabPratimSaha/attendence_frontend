
import { Provider } from 'react-redux'
import store from './redux/reducers/allReducer';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');

const root = createRoot(container as Element);
root.render(<Provider store={store}><App/></Provider>)
