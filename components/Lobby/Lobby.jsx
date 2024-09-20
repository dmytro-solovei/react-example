import React from 'react';
import { Games, Header, Menu, NavigationGames, Footer } from '../../components/';
import { ReactContext } from '../../contexts/MenuClickAttribute';

export const Lobby = () => {
  return (
    <div className="view">
      <ReactContext>
        <Menu />
        <Header />
        <NavigationGames />
        <Games />
        <Footer />
      </ReactContext>
    </div>
  );
};
