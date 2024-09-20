import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactInlineSvg from 'react-inlinesvg';
import classNames from 'classnames';
import {
  // ! added to redux - setSearch,
  setActiveGameList,
  // ! added to redux - setActiveInput
} from '../../store/actions';
import { useDebounce, useOutsideClick } from '../../hooks';
import './Search.scss';

export const Search = ({ opening = true }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const words = useSelector((state) => state.words);
  const { size, activeGameList, activeInput } = useSelector((state) => state.handling);
  const [value, setValue] = useState('');
  const [lastProvider, setLastProvider] = useState(activeGameList);
  const [opened, setOpened] = useState(!opening);
  const debouncedSearchTerm = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm !== '') {
      // dispatch(setSearch(debouncedSearchTerm));  // ! added to redux
      dispatch(setActiveGameList('search'));
    } else {
      dispatch(setActiveGameList(lastProvider));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (activeGameList && activeGameList !== 'search') {
      setLastProvider(activeGameList);
      setValue('');
    }
  }, [activeGameList]);

  useOutsideClick(
    ref,
    () => {
      if (!value && !(size.mobile && size.landscape) && !(activeInput === 'search-input' && settings.virtualKeyboard && !size.mobile)) {
        setOpened(false);
      }
    },
    opened
  );

  const changeHandler = (newValue) => {
    if (newValue === '') {
      setValue('');
    } else {
      setValue(newValue);
      if (settings.virtualKeyboard && !size.mobile) {
        window.VirtualKeyboard.setInput(newValue);
      }
    }
  };

  const clearTerm = () => {
    setValue('');
    if (settings.virtualKeyboard && !size.mobile) {
      window.VirtualKeyboard.setInput('');
    }
    setOpened(false);
    ref.current.value = '';
    let event = new Event('input', { bubbles: true });
    ref.current.dispatchEvent(event);
  };

  return (
    <div className="search" data-open={opened}>
      <input
        ref={ref}
        id="search-input"
        className="search-input"
        onClick={() => setOpened(true)}
        placeholder={'Search'}
        type="text"
        value={value}
        // onFocus={() => dispatch(setActiveInput('search-input'))}
        onInput={(event) => changeHandler(event.target.value)}
      />
      <ReactInlineSvg className="icon" src="/images/icons/search.svg" />
      <ReactInlineSvg
        className={classNames('clear', {
          'clear--active': value,
        })}
        src="images/icons/close.svg"
        onClick={clearTerm}
      />
    </div>
  );
};
