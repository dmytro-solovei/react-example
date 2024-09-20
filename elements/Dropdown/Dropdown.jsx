import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

export const Dropdown = ({ children, opened: initialOpened, onClick }) => {
  const [isOpen, setIsOpen] = useState(initialOpened);

  useEffect(() => {
    setIsOpen(initialOpened);
  }, [initialOpened]);

  const handleToggle = () => {
    if (onClick) {
      onClick(!isOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const heading = React.Children.toArray(children).find((child) => child.type === Heading);
  const content = React.Children.toArray(children).find((child) => child.type === Content);

  return (
    <div className="dropdown" data-opened={isOpen}>
      {heading && (
        <div className="dropdown__heading" onClick={handleToggle}>
          {heading}
        </div>
      )}
      {content && <div className="dropdown__content">{content}</div>}
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  opened: PropTypes.bool,
  onClick: PropTypes.func,
};

const Heading = ({ children }) => <>{children}</>;
const Content = ({ children }) => <>{children}</>;

Dropdown.Heading = Heading;
Dropdown.Content = Content;
