
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/styles/main.scss'
import { HomePage } from './pages/HomePage'
import { Header } from './cmps/Header'

export function App() {

  return (
    <Router>
      <Header />
      <Routes>

        <Route element={<HomePage />} path="/" />
        {/* <Route path="/auth">
          <Route path="login" element={<LoginSignup />} />
          <Route path="sign-up" element={<LoginSignup />} />
        </Route> */}
      </Routes>
    </Router>
  )
}

