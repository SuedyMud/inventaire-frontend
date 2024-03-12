import { About } from "../pages/About.jsx"
import { Account } from "../pages/Account.jsx"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { Private } from "../pages/Private"

export const nav = [
    { path:     "/",         name: "Home",        element: <Home />,       isMenu: true,     isPrivate: false  },
    { path:     "/about",    name: "About",       element: <About />,      isMenu: true,     isPrivate: false  },
    { path:     "/login",    name: "Login",       element: <Login />,      isMenu: false,    isPrivate: false  },
    { path:     "/private",  name: "Private",     element: <Private />,    isMenu: true,     isPrivate: true  },
    { path:     "/account",  name: "Account",     element: <Account />,    isMenu: true,     isPrivate: true  },
]