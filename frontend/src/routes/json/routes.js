import { 
    signin, 
    signup, 
    proyects, 
    dashboard, 
    home,

    collections,
    showCollection,
    createCollection,

    documents, 
    profile, 
    format, 
    E404, 
    verify
} from "../../resources/views";

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
        path: "/proyects",
        exact: true,
        isAuth: true,
        component: proyects,
    },
    {
        path: "/dashboard",
        component: dashboard,
        isAuth: true,
        routes: [
            {
                path: "/dashboard",
                exact: true,
                isAuth: true,
                component: home
            },
            {
                path: "/dashboard/collections",
                exact: true,
                isAuth: true,
                component: collections
            },
            {
                path: "/dashboard/collections/:name",
                exact: true,
                isAuth: true,
                component: showCollection
            },
            {
                path: "/dashboard/collections/create",
                exact: true,
                isAuth: true,
                component: createCollection
            },
            {
                path: "/dashboard/documents",
                exact: true,
                isAuth: true,
                component: documents
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
                exact: false,
                isAuth: true,
                component: E404
            }

      ]
    },
    {
        path: '/account-verify',
        exact: true,
        isAuth: true,
        component: verify
    },
    {
        path: '*',
        exact: false,
        isAuth: false,
        component: E404
    }
    
  ];
export default routes;