import CreatePost from "../containers/CreatePost"
import Dashboard from "../containers/Dashboard"
import EditPost from "../containers/EditPost"
import Home from "../containers/Home"
import SignUp from "../containers/Login/SignUp"
import PostDetail from "../containers/PostDetail"

export const PRIVATE_ROUTES = [
    {
        key: "home",
        path: "",
        element: <Home />
    },
    {
        key: "createpost",
        path: "createpost",
        element: <CreatePost />
    },
    {
        key: "postdetail",
        path: ":id",
        element: <PostDetail />
    },
    {
        key: "dashboard",
        path: "dashboard",
        element: <Dashboard />
    },
    {
        key: "editpost",
        path: "editpost/:id",
        element: <EditPost />
    },
]

export const PUBLIC_ROUTES = [
    {
        key: "signup",
        path: "signup",
        element: <SignUp />
    }
]