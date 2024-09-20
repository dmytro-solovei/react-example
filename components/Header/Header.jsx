import React, { useState, useContext } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setActiveForm } from '../../store/actions';

import { ButtonTypes } from '../../elements';

import { getPopup } from '../../store/actions';
import { MenuClickContext } from '../../contexts/MenuClickAttribute';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menuClick, setMenuClick } = useContext(MenuClickContext);
  const settings = useSelector((state) => state.settings);

  const { api, size } = useSelector(
    (state) => ({
      api: state.api,
      size: state.handling.size,
      activePopup: state.handling.activePopup,
      settings: state.settings,
    }),
    shallowEqual
  );

  const { profileNav: firstProfileSection } = settings;

  const button = (type) => {
    const handleClick = () => {
      switch (type) {
        case 'menu':
          setMenuClick(!menuClick);
          document.body.style.overflow = 'hidden';
          dispatch(getPopup({ active: true, name: size.mobile ? 'profile' : firstProfileSection[0] === 'balance' ? 'profile' : firstProfileSection }));
          break;

        case 'user':
          dispatch(getPopup({ active: true, name: api.profile.includes('deposit') ? 'deposit' : firstProfileSection }));
          break;

        case 'balance':
          dispatch(getPopup({ active: true, name: api.profile.includes('balance') ? 'balance' : firstProfileSection }));
          break;

        case 'bonus':
          navigate('/bonuses');
          break;

        case 'login':
          dispatch(setActiveForm('login'));
          break;
        case 'registration':
          dispatch(setActiveForm('registration'));
          break;
        default:
          break;
      }
    };

    return (
      <ButtonTypes styled="rounded" location={type} onClick={handleClick}>
        <span>{type}</span>
      </ButtonTypes>
    );
  };

  const navigation = () => {
    return (
      <>
        {/* If Not authorized */}
        <Link to="/auth" >{button('login')} </Link>
        <Link to="/auth">{button('registration')}</Link>
      </>
    );
  };

  const Logo = () => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const logoText = 'casino';

    return imageError ? logoText : <img src="/images/logo.png" alt="logo" onError={handleImageError} />;
  };

  return (
    <div className="header">
      <div className="header__position">
        <div className="container">
          <div className="header__block">
            <div className="header__block--menu">{button('menu')}</div>
            <div className="header__block--logo">
              <Link to="/">{Logo()}</Link>
            </div>
            <div className="header__block--nav">{navigation()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
