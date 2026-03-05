import { useReducer } from 'react';
import { AppContext, appReducer, initialState } from './store';
import { AppShell } from './components/AppShell';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AppShell />
    </AppContext.Provider>
  );
}
