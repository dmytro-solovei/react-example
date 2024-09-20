import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useReduxView } from '../../hooks/';
import { Lobby } from '../../components';
import { Preloader } from '../Preloader/Preloader';
import { Auth } from '../Auth/Auth';

import useQuery from '../../hooks/useQuery';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentUserToken} from '../../store/actions';

export const Enter = () => {
  const loaded = useReduxView();
  const dispatch = useDispatch();
  const query = useQuery();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('user-token')

    if (token && token !== 'undefined') {
        dispatch(setCurrentUserToken(token))
    }

    const key = query.get('key')
    if (key) {
      localStorage.setItem('cmd-key', key)
    }

    const isFirstVisit = localStorage.getItem('user-first-visit');

    if (!isFirstVisit && isFirstVisit !== '1') {
      localStorage.setItem('user-first-visit', '1')
    } else {
      localStorage.setItem('user-first-visit', '0')
    }
  },[])
  console.log(auth);

  const checkIfUserAuth = () => {
    if (auth.userData) {
      return (
          <Routes>
            <Route exact element={<Lobby />} path="/" />
            <Route exact element={<Lobby />} path="/bonuses" />
          </Routes>
      )
    } else {
      return (
          <Routes>
            <Route exact element={<Lobby />} path="/" />
            <Route exact element={<Lobby />} path="/bonuses" />
            <Route exact element={<Auth />} path="/auth" />
          </Routes>
      )
    }
  }

  return (
    <>
      {!loaded ? (
        <Preloader />
      ) : checkIfUserAuth()}
    </>
  );
};
