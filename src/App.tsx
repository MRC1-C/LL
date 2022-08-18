import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NotFound from './components/NotFound';
import PrivateLayout from './components/PrivateLayout';
import PublicLayout from './components/PublicLayout';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateLayout />}>
        {
          PRIVATE_ROUTES.map(e=><Route key={e.key} path={e.path} element={e.element} />)
        }
        </Route>
        <Route path="/" element={<PublicLayout />}>
        {
          PUBLIC_ROUTES.map(e=><Route key={e.key} path={e.path} element={e.element} />)
        }
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
