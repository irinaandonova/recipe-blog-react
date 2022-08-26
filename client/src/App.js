import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { AuthContextProvider } from './context/authContext';
import Header from './components/Header/Header';
import AddRecipeInfo from './components/AddRecipe/AddRecipeInfo';
import AddIngredients from './components/AddRecipe/AddIngredients';
import Details from './components/Details/Details';
import MyRecipes from './components/MyRecipes/MyRecipes';
import LikedRecipes from './components/LikedRecipes/LikedRecipes';
import StarRating from './components/StarRating/StarRating';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/recipe/add/info' element={<AddRecipeInfo />} />
          <Route path='/recipe/add/ingredients' element={<AddIngredients />} />
          <Route path='/recipe/:_id' element={<Details />} />
          <Route path='/:_id/my-recipes' element={<MyRecipes />} />
          <Route path='/categories/:category' element={<Dashboard />} />
          <Route path='/:_id/liked-recipes' element={<LikedRecipes />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
