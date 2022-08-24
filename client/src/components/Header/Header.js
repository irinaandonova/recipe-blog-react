import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const Header = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutHandler = () => {
        logout();
        navigate('/');
    }
    return (
        <header>
            <nav className='upper-navbar'>
                <Link to="/" className="logo">Tasty Bite</Link>
                {!userInfo._id ?
                    <ul className='header-list'>
                        <li className='header-link'>
                            <Link to="/auth/login" className='basic-btn'>Login</Link>
                        </li>
                        <li className='header-link'>
                            <Link to="/auth/register" className='basic-btn'>Register</Link>
                        </li>
                    </ul>
                    :
                    <ul className='header-list'>
                        <li className='header-link'>
                            <Link to="/:_id/liked-recipes" className='basic-btn'>Liked recipes</Link>
                        </li>
                        <li className='header-link'>
                            <Link to="/:_id/my-recipes" className='basic-btn'>My recipes</Link>
                        </li>
                        <li className='header-link'>
                            <Link to="/recipe/add/info" className='basic-btn'>Add recipe</Link>
                        </li>
                        <li className='header-link'>
                            <Link to="#" className='basic-btn' onClick={logoutHandler}>Logout</Link>
                        </li>
                    </ul>
                }
            </nav>
            <nav>
                <ul className='category-list'>
                    <li>
                        <Link to="/categories/meat" className='category-link meat'>Recipes with meat</Link>
                    </li>
                    <li>
                        <Link to="/categories/fish" className='category-link fish'>Recipes with fish and seafood</Link>

                    </li>
                    <li>
                        <Link to="/categories/vegetarian" className='category-link vegetarian'>Vegeterian recipes</Link>

                    </li>
                    <li>
                        <Link to="/categories/dessert" className='category-link dessert'>Desserts</Link>
                    </li>

                </ul>
            </nav>
        </header>
    )
}

export default Header;