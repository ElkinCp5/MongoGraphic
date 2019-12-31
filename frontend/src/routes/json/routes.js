import { login, signup, start, dashboard, profile, format, E404 } from "../../resources/views";

const routes = [
    {
        path: "/",
        exact: true,
        component: login,
        isAuth: false,
    },
    {
        path: "/signup",
        exact: true,
        component: signup,
        isAuth: false,
    },
    {
        path: "/dashboard",
        component: start,
        isAuth: true,
        routes: [
            {
                path: "/dashboard",
                exact: true,
                isAuth: true,
                component: dashboard
            },
            {
                path: "/dashboard/format",
                exact: true,
                isAuth: true,
                component: format
            },
            {
                path: "/dashboard/profile",
                exact: true,
                isAuth: true,
                component: profile
            },
            {
                path: "/dashboard/user",
                exact: true,
                isAuth: true,
                component: dashboard
            },
            {
                path: "*",
                isAuth: true,
                component: E404
            }

      ]
    },
    {
        path: '*',
        exact: false,
        component: E404
    }
    
  ];
export default routes;

  
  