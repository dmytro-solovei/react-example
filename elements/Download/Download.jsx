import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useBrowserAndOSDetection } from '../../hooks/useBrowserAndOSDetection';

import Android from './assets/android.svg';
import Windows from './assets/windows.svg';
import Apple from './assets/apple.svg';

import './Download.scss';

export const Download = ({ title = false }) => {
  const size = useSelector((state) => state.handling.size);
  const settings = useSelector((state) => state.settings);
  const preloader = useSelector((state) => state.handling.preloader);
  const [system, setSystem] = useState('ios');
  const { browser, operatingSystem } = useBrowserAndOSDetection();

  useEffect(() => {
    var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) {
      setSystem('ios');
    } else if (size.mobile) {
      setSystem('android');
    } else {
      setSystem('windows');
    }
  }, [size.mobile]);

  const renderLink = (system) => {
    let link = settings.download.platforms[system];
    switch (system) {
      case 'ios':
        return (
          <a className="link" href={typeof link !== 'boolean' ? link : undefined} target="_blank" rel="noreferrer">
            <img src={Apple} className="platform-logo" alt="Apple" />
            <p className="text">
              <span>IOS APP</span>
            </p>
          </a>
        );
      case 'windows':
        return (
          <a className="link" href={link ? link : 'update/Windows.exe'} target="_blank" rel="noreferrer">
            <img src={Windows} className="platform-logo" alt={'Windows'} />
            <p className="text">
              <span>{'Windows'}</span>
            </p>
          </a>
        );
      case 'android':
        return (
          <a className="link" href={link ? link : 'update/Android.apk'} target="_blank" rel="noreferrer">
            <img src={Android} className="platform-logo" alt={'Android'} />
            <p className="text">
              <span>{'Android'}</span>
            </p>
          </a>
        );
      default:
        break;
    }
  };

  let visible = settings.download.platforms[system] !== false && operatingSystem === system;

  if (visible) {
    return (
      <div className="download" data-visible={!preloader}>
        {title && <div className="title">{title}</div>}
        {renderLink(system)}
      </div>
    );
  } else return null;
};
