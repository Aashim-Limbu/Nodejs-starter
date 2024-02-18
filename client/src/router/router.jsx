import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage.jsx";
import ProtectRoute from "../components//ProtectRoute.jsx";
import SignIn from "../components/SignIn.jsx";
import DashBoardLayout from "../components/DashBoardLayout.jsx";
import SideBar from "../components/SideBar.jsx";
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
				children: <SideBar />,
			},
		],
	},
]);
