import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { AuthContextProvider } from './context/authContext';
import Header from './components/Header/Header';
import AddRecipeInfo from './components/AddRecipe/AddRecipeInfo';
import { RecipeContextProvider } from './context/recipeContext';
import AddIngredients from './components/AddRecipe/AddIngredients';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
          <RecipeContextProvider>
            <Route path='/recipe/add/info' element={<AddRecipeInfo />} />
            <Route path='/recipe/add/ingredients' element={<AddIngredients />} />
          </RecipeContextProvider>
        </Routes>
      </AuthContextProvider>

    </div>
  );
}

export default App;
