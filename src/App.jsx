
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/styles/main.scss'

import { HomePage } from './pages/HomePage'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>

          <Route element={<HomePage />} path="/" />
          {/* <Route path="/auth">
          <Route path="login" element={<LoginSignup />} />
          <Route path="sign-up" element={<LoginSignup />} />
        </Route> */}
        </Routes>
      </Router>
    </Provider>
  )
}

