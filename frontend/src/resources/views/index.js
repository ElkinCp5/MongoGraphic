import signin from "./pages/signin";
import signup from "./pages/signup";
import proyects from "./pages/proyects";
import dashboard from "./pages/dashboard";

import home from "./pages/dashboard/home";

import collections      from "./pages/dashboard/collections";
import showCollection   from "./pages/dashboard/sub/collection/show";
import createCollection from "./pages/dashboard/sub/collection/create";

import documents from "./pages/dashboard/documents";
import format from "./pages/dashboard/format";
import profile from "./pages/dashboard/profile";

import E404 from "./pages/errors/error404";
import verify from "./pages/verify";

export { 
    signin, 
    signup, 
    proyects, 
    dashboard,  
    home,

    collections, 
    showCollection,
    createCollection,

    documents, 
    format, 
    profile, 
    E404, 
    verify
};