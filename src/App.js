import logo from './logo.svg';
import './App.css';
import { ListingComponent } from './components/listing-component';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { DetailsComponent } from './components/details-component';
import { Character } from './components/characters-component';
import { createContext, useState } from 'react';
import { ProtectedRoutes } from './components/protected-routes';
import { Login } from './components/login-component';
import { useLocalStorage } from './hooks/useLocalStorage';

export const ApiContext = createContext()
export const UserContext = createContext();
function App() {
  const [user, setUser, clear] = useLocalStorage('user');
  const [data, update] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser, clear }}>
      <ApiContext.Provider value={{ data, update }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route element={<ProtectedRoutes />}>

                <Route path='/' element={<ListingComponent />} />
                <Route path='/favourites' element={< Character showFavourites={true} />} />
                <Route path='/details/:id' element={<DetailsComponent />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </ApiContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
