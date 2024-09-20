import React from 'react';
import { useSelector } from 'react-redux';

export const SocialIcons = () => {
  const settings = useSelector((state) => state.settings);
  const socialsList = settings.social;

  const renderSocialIcons = () => {
    return Object.entries(socialsList).map(([name, url]) => {
      if (url) {
        return (
          <a className="social-icons__link" href={url} target="_blank" rel="noreferrer" key={name}>
            <img
              src={`images/icons/social/${name}.svg`}
              alt={name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.parentNode.remove();
              }}
            />
          </a>
        );
      } else {
        return null;
      }
    });
  };

  const hasElementLength = renderSocialIcons().length;

  return hasElementLength !== 0 ? <div className="social-icons">{renderSocialIcons()}</div> : null;
};
