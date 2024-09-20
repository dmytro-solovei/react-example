import React, { createContext, useState } from 'react';

export const MenuClickContext = createContext({
  menuClick: false,
  setMenuClick: () => {},
});

export const ReactContext = ({ children }) => {
  const [menuClick, setMenuClick] = useState(null);

  return <MenuClickContext.Provider value={{ menuClick, setMenuClick }}>{children}</MenuClickContext.Provider>;
};