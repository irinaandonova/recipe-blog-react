import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const Header = () => {
    const { userInfo, logout } = useContext(AuthContext);

    return (
        <header>
            <nav>
                {!userInfo._id ?
                    <ul className='header-list'>
                        <li className='header-link'>
                            <Link to="/auth/login">Login</Link>
                        </li>
                        <li className='header-link right'>
                            <Link to="/auth/register">Register</Link>
                        </li>
                    </ul>
                    :
                    <ul className='header-list'>
                        <li className='header-link'>
                            <Link to="/recipe/my-recipes">My recipes</Link>
                        </li>
                        <li className='header-link'>
                            <Link to="/recipe/add/info">Add recipe</Link>
                        </li>
                        <li className='header-link right'>
                            <Link to="#" className='logout-btn' onClick={logout}>Logout</Link>
                        </li>
                    </ul>
                }
            </nav>
        </header>
    )
}

export default Header;