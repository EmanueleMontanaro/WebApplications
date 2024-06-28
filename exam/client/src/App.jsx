import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './components/custom.css';
import {useState, useEffect} from 'react';
import TitleScreen from './components/TitleScreenComponents';
import Login from './components/LoginComponents';
import HomePage from './components/HomePageComponents';
import { ThemeProvider } from './components/themeContext';
import NavHeader from './components/NavHeader';
import PlayPage from './components/PlayComponents';
import './App.css';
import RecapPage from './components/RecapComponents';
import API from './components/API.mjs';
import HistoryPage from './components/HistoryComponents';
import NotFound from './components/NotFoundComponents';

function App() {

  const navigate = useNavigate();

  const [mode, setMode] = useState('');
  const [login, setLogin] = useState(false);
  const [recap, setRecap] = useState([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try{
        const user = await API.getUserInfo();
        setLogin(true);
        setUser(user);
      } catch(err){
        console.error("No previous session available.");
        navigate('/');
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async(credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLogin(true);
      setMessage({msg: `Welcome back ${user.name}!`, type: 'success'});
      setUser(user);
    } catch (err) {
      setMessage({msg: err, type: 'danger'})
    }
  };

  const handleLogout = async() => {
    await API.logOut();
    setLogin(false);
    setMessage('');
    navigate('/');
  };

  return (
    <ThemeProvider>
    <Routes>
      <Route element= {<>
        <NavHeader login={login} handleLogout={handleLogout} username={user.name}/>
        <Outlet/>
        </>
      }>
        <Route path='/' element={<TitleScreen login={login} username={user.name}/>}/>
        <Route path='/login' element={login ? <Navigate replace to='/home'/> : <Login login={login} handleLogin={handleLogin} message={message} setMessage={setMessage}/>}/>
        <Route path='/home' element={<HomePage login={login} message={message} setMessage={setMessage}/>}/>
        <Route path='/play' element={<PlayPage login={login} recap={recap} setRecap={setRecap} setMode={setMode}/>}/>
        <Route path='/recap' element={<RecapPage login={login} recap={recap} userid={user.id} mode={mode}/>}/>
        <Route path='/profile' element={<HistoryPage user={user} login={login} setRecap={setRecap} setMode={setMode}/>}/>
        <Route path="*" element={ <NotFound/> } />
      </Route>
    </Routes>
    </ThemeProvider>
  );
}

export default App
