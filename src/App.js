import {
  createBrowserRouter, createRoutesFromElements,
  Route, RouterProvider
} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import Login from 'pages/login';
import SignUp from 'pages/sign-up';
import AllUsers from 'pages/all-users';
import NotFound from 'pages/404';
import UserDetails from 'pages/user-details';

import {PageTitleProvider} from 'components/page-title-context';
import PrivateRoute from 'components/private-route';
import UnauthorizedOnlyRoute from 'components/unauthorized-only-route';
import withTitle from 'components/with-title';

const Users = withTitle(AllUsers, 'Users');
const UserDetailsPage = withTitle(UserDetails, 'User Details');
const Test = withTitle(() => <div>Test</div>, 'Test');
const Dashboard = withTitle(() => <div>Dashboard</div>, 'Dashboard');

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path='/sign-in'
          element={
            <UnauthorizedOnlyRoute>
              <Login/>
            </UnauthorizedOnlyRoute>
          }
          errorElement={<div>Error.</div>}
        />
        <Route
          path='/sign-up'
          element={
            <UnauthorizedOnlyRoute>
              <SignUp/>
            </UnauthorizedOnlyRoute>
          }
          errorElement={<div>Error.</div>}
        />
        <Route
          path='/'
          element={<PrivateRoute />}
          errorElement={<div>Error.</div>}
        >
          {/* <Route index exact path='/' element={<Navigate to='/users' />} /> */}
          <Route index exact path='/' element={<Dashboard />} />
          <Route
            path='users'
            element={<Users/>}
            errorElement={<div>Error.</div>}
          />
          <Route
            path='users/:id'
            element={<UserDetailsPage/>}
            errorElement={<div>Error.</div>}
          />
          <Route
            path='test'
            element={<Test />}
            errorElement={<div>Error.</div>}
          />
        </Route>
        <Route
          path='*'
          element={<NotFound />}
          errorElement={<div>Error.</div>}
        />
      </>
    )
  );

  return (
    <div className='App'>
      <div id='modal-container'></div>
      <div id='loader-container'></div>
      <ToastContainer />
      <PageTitleProvider>
        <RouterProvider router={router} />
      </PageTitleProvider>
    </div>
  );
}

export default App;