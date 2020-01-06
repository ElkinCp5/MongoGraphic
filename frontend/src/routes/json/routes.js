import { login as signin, signup, start, proyect, dashboard, profile, format, E404, verify} from "../../resources/views";

const routes = [
    {
        path: "/",
        exact: true,
        isAuth: false,
        component: signin,
    },
    {
        path: "/signup",
        exact: true,
        isAuth: false,
        component: signup,
    },
    {
        path: "/proyect",
        exact: true,
        isAuth: true,
        component: proyect,
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
        path: '/account-verify',
        exact: true,
        isAuth: false,
        component: verify
    },
    {
        path: '*',
        exact: false,
        component: E404
    }
    
  ];
export default routes;