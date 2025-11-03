import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { client } from './graphql/client';
import { store } from './redux/store';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { FiltersProvider } from './context/FiltersContext';

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <FiltersProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="character/:id" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FiltersProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
