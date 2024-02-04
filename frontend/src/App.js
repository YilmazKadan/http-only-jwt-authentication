import React, { lazy, Suspense } from 'react';
import {
  Layout,
  Menu
} from 'antd';
import { Content, Header } from "antd/es/layout/layout";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import  {
  useAuth,
} from './provider/authProvider';

// Lazy-load components
const Products = lazy(() => import('./components/Products'));
const Unprotected = lazy(() => import('./components/Unprotected'));
const Login = lazy(() => import('./components/Login'));
const Logout = lazy(() => import('./components/Logout'));

const Navbar = () => {
  const { authenticated } = useAuth();

  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/public">Public</Link></Menu.Item>
        {authenticated && (
          <>
            <Menu.Item key="3"><Link to="/products">Products</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/logout">Logout</Link></Menu.Item>
          </>
        )}
        {!authenticated && (
          <>
            <Menu.Item key="5"><Link to="/login">Login</Link></Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

const CustomLayout = ({ children }) => {
  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '50px' }}>
        {children}
      </Content>
    </Layout>
  );
};

function App() {
  const { authenticated } = useAuth();

  return (
      <Router>
        <CustomLayout>
          <Suspense fallback={<div>Loading</div>}>
          <Routes>
            {authenticated && (
              <>
                <Route path="/" element={<Products />} />
                <Route path="/products" element={<Products />} />
                <Route path="/logout" element={<Logout />} />
              </>
            )}
            {!authenticated && (
              <>
                <Route path="/" element={<Navigate replace to="/login" />} />
              </>
            )}
            <Route path="/public" element={<Unprotected />} />
            
            <Route path="/login" element={<Login />} />
          </Routes>
          </Suspense>
        </CustomLayout>
      </Router>
  );
}

export default App;