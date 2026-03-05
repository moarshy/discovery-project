import { useReducer, useEffect } from 'react';
import { AppContext, appReducer, initialState } from './store';
import { AppShell } from './components/AppShell';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AppShell />
    </AppContext.Provider>
  );
}
