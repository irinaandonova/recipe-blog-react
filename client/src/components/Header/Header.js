import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const Header = () => {
    const { userInfo, logout } = useContext(AuthContext);

    return (
        <header>
            <nav className='upper-navbar'>
                <Link to="/" className="logo">Tasty Bite</Link>
                {!userInfo._id ?
                    <ul className='header-list'>


                        <li className='header-link'>
                            <Link to="/auth/login" className='upper-link'>Login</Link>
                        </li>
                        <li className='header-link'>
                            <Link to="/auth/register" className='upper-link'>Register</Link>
                        </li>
                    </ul>
                    :
                    <ul className='header-list'>
                        <li className='header-link'>
                            <Link to="/recipe/my-recipes" className='upper-link'>My recipes</Link>
                        </li>
                        <li className='header-link'>
                            <Link to="/recipe/add/info" className='upper-link'>Add recipe</Link>
                        </li>
                        <li className='header-link right'>
                            <Link to="#" className='logout-btn upper-link' onClick={logout}>Logout</Link>
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
                        <Link to="/categories/vegeterian" className='category-link vegetarian'>Vegeterian recipes</Link>

                    </li>
                    <li>
                        <Link to="/categories/desserts" className='category-link dessert'>Desserts</Link>
                    </li>

                </ul>
            </nav>
        </header>
    )
}

export default Header;