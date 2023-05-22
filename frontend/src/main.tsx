import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import './i18n/i18n';
import loadingMarkup from './components/LoadingMarkup'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
    <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>,
)
