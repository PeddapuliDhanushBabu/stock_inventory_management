import { createContext, useContext } from 'react';
export const NavigationContext = createContext({ page: 'Overview', navigate: () => {} });
export const useNavigation = () => useContext(NavigationContext);
