import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import IconButton from 'components/icon-button';

import {ReactComponent as LogoR} from 'assets/img/logo-r.svg';
import {ReactComponent as MenuOpen} from 'assets/icons/menu-open.svg';
import {ReactComponent as MenuClose} from 'assets/icons/menu-close.svg';
import {ReactComponent as Dashboard} from 'assets/icons/home.svg';
import {ReactComponent as Users} from 'assets/icons/users.svg';
import {ReactComponent as Profile} from 'assets/icons/profile.svg';
import {ReactComponent as SignOut} from 'assets/icons/sign-out.svg';
import './styles.scss';

const Sidebar = ({user}) => {
  const {pathname} = useLocation();
  const [expanded, setExpanded] = useState(false);
  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  return (
    <aside className={`menu ${expanded ? 'open' : ''}`}>
      <div className='top-container'>
        <div className='logo-container'>
          <Link to='/'>
            <LogoR />
          </Link>
          {expanded && (
            <div className='company-name'>
              <h1>Company</h1>
              <div className='company-moto'>Our moto goes here</div>
            </div>
          )}
        </div>
        <div className='user-container'>
          {expanded && (
            <>
            </>
          )}
          <IconButton
            icon={expanded ? MenuClose : MenuOpen}
            onClick={toggleMenu}
          />
        </div>
      </div>
      <div className='menu-items-container'>
        <p className='main-menu-category-title'>Main</p>
        <div className='main-menu-item'>
          <Link to='/' className={pathname === '/' ? 'active' : ''}>
            <Dashboard />
            {expanded && <span>Dashboard</span>}
          </Link>
        </div>
        <div className='main-menu-item'>
          <Link to='/users' className={pathname === '/users' ? 'active' : ''}>
            <Users />
            {expanded && <span>Users</span>}
          </Link>
        </div>
        <div className='main-menu-item'>
          <Link to={`/users/${user.id}`} className={pathname === `/users/${user.id}` ? 'active' : ''}>
            <Profile />
            {expanded && <span>Profile</span>}
          </Link>
        </div>
      </div>
      <div className='bottom-container'>
        <div className='logout-button gradient-shaddow'>
          <SignOut />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;