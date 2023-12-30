import logo from './logo.svg';
import './App.css';
import { ListingComponent } from './components/listing-component';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { DetailsComponent } from './components/details-component';
import { Character } from './components/characters-component';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
        <Route path='/' element={<ListingComponent />} />
        <Route path='/favourites' element={< Character showFavourites={true}/>} />
        <Route path='/details/:id' element={<DetailsComponent />} />

    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
