import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage.jsx";
import UserList from "../components/UserList.jsx";
import ProtectRoute from "../components//ProtectRoute.jsx";
import SignIn from "../components/SignIn.jsx";
import DashBoardLayout from "../components/DashBoardLayout.jsx";
import Stats from "../components/Stats.jsx";
import Test from "../components/Test.jsx";
export const router = createBrowserRouter([
	{ path: "/signin", element: <SignIn /> },
	{
		path: "/",
		element: <ProtectRoute />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "dashboard",
				element: <DashBoardLayout />,
				children: [
					{ index: true, element: <Stats /> },
					{ path: "user", element: <UserList /> },
					{ path: "test", element: <Test /> },
				],
			},
		],
	},
]);
