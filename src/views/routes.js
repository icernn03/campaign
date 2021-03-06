import App from './app';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import SignInPage from './pages/sign-in';
import SurveysPage from './pages/surveys';
import CandidatesPage from './pages/candidates';

import { isAuthenticated } from 'core/auth';

export const paths = {
  ROOT: '/',
  ABOUT: '/about',
  CANDIDATES: '/candidates',
  SIGN_IN: '/sign-in',
  SURVEYS: '/surveys'
};

const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.ROOT);
    }
  };
};

export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: HomePage
        }
      },
      {
        path: paths.SIGN_IN,
        component: SignInPage,
        onEnter: requireUnauth(getState)
      },
      {
        path: paths.ABOUT,
        component: AboutPage
      },
      {
        path: paths.CANDIDATES,
        component: CandidatesPage,
        onEnter: requireAuth(getState)
      },
      {
        path: paths.SURVEYS,
        component: SurveysPage,
        onEnter: requireAuth(getState)
      }
    ]
  };
};

