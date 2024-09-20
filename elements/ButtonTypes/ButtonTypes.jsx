import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border: none;
  padding: var(--btn--${(props) => props.location}__padding);
  border-radius: var(--btn--${(props) => props.location}__radius);
  box-shadow: var(--btn--${(props) => props.location}__border);
  background: var(--btn--${(props) => props.location}__bg);
  color: var(--btn--${(props) => props.location}__color);
  transition: all 0.4s ease;

  &:hover {
    box-shadow: var(--btn--${(props) => props.location}__border-hover);
    background: var(--btn--${(props) => props.location}__bg-hover);
    color: var(--btn--${(props) => props.location}__color-hover);
  }
`;

export const ButtonTypes = ({ styled, location, children, onClick, className = '' }) => {
  return (
    <Button className={`btn btn--${styled} btn--${location} ${className}`} location={location} onClick={onClick}>
      {children}
    </Button>
  );
};

ButtonTypes.propTypes = {
  styled: PropTypes.string,
  location: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

ButtonTypes.defaultProps = {
  styled: 'rounded',
  location: null,
};
