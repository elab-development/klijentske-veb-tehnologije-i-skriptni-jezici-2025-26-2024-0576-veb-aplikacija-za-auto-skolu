import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Lessons from './pages/Lessons';
import Profile from './pages/Profile';
import ScheduleLesson from './pages/ScheduleLesson';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/lessons' element={<Lessons />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/schedule' element={<ScheduleLesson />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
