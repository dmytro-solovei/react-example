import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import ReactInlineSvg from 'react-inlinesvg';

import './ButtonLanguages.scss';
import { accountUpdateRequest } from '../../store/actions';

export const ButtonLanguages = ({ direction }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const settings = useSelector((state) => state.settings);
  const data = useSelector((state) => state.api);
  const [opened, setOpened] = useState(false);
  const token = localStorage.getItem('user-token');

  const handleChangeLanguage = (lang) => {
    if (token) {
      dispatch(accountUpdateRequest({ data: { language: lang } }));
    } else {
      localStorage.setItem('current-lang', lang);
    }
    setOpened(false);
  };

  const currentLang = () => (token ? data.language : localStorage.getItem('current-lang'));

  const renderLangs = () => {
    if (settings.languages && settings.languages.length > 1) {
      //const activeLang = window.config.system.language

      return settings.languages.map((lang) => {
        return (
          <div key={lang} className={`flag`} onClick={() => handleChangeLanguage(lang)}>
            <ReactInlineSvg className="image" src={`/images/icons/lang/${lang}.svg`} />
            <div className="name">{lang}</div>
          </div>
        );
      });
    }
  };

  useEffect(() => {
    document.getElementById('root').addEventListener('click', outsideClick);
    return () => {
      document.getElementById('root').removeEventListener('click', outsideClick);
    };
  }, []);

  const outsideClick = (e) => {
    ref.current && !ref.current.contains(e.target) && setOpened(false);
  };

  return (
    <div ref={ref} className={classNames('button-language')} data-opened={opened} data-direction={direction}>
      <div className="trigger" onClick={() => setOpened(!opened)}>
        <div className={`flag ${data.language}`}>
          <ReactInlineSvg className="image" src={`/images/icons/lang/${currentLang()}.svg`} />
          <span className="name">
            {data.language}
            <ReactInlineSvg className="arrow" src="/images/icons/arrow__down--grey.svg" title="lang" desciption="arrow" />
          </span>
        </div>
      </div>

      <div className="list">{renderLangs()}</div>
    </div>
  );
};
