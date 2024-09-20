import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getPopup } from '../../store/actions';

import './ButtonClose.scss';

export const ButtonClose = ({ defaultIcon, onClick, children, className }) => {
  const [icon, setIcon] = useState(defaultIcon);
  const dispatch = useDispatch();

  const handleImageError = () => {
    setIcon(null);
  };

  const handleImageLoad = () => {};

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      dispatch(getPopup({ active: false, name: '' }));
    }
  };
  const buttonClass = className ? `bnt btn--close ${className}` : 'btn btn--close';

  return (
    <div className={buttonClass} onClick={handleClick}>
      {defaultIcon !== null ? icon ? <img src={icon} alt="Close" onError={handleImageError} onLoad={handleImageLoad} /> : <span className="no-image">close</span> : null}
      {children}
    </div>
  );
};

ButtonClose.propTypes = {
  defaultIcon: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

ButtonClose.defaultProps = {
  defaultIcon: 'images/icons/close.svg',
  className: '',
};
React.memo(ButtonClose);
