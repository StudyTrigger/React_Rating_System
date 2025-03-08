import FeedbackForm from './pages/FeedbackForm'
import AdminPanel from './pages/AdminPanel'
import FeedbackList from './pages/FeedbackList'
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
    <>
    <AdminPanel/>
        {/* <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/feedbacks" element={<FeedbackList />} />
        </Routes> */}
    </>
  )
}

export default App
