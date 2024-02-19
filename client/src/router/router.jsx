import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../components/ErrorPage.jsx";
import ProtectRoute from "../components//ProtectRoute.jsx";
import SignIn from "../components/SignIn.jsx";
import DashBoardLayout from "../components/DashBoardLayout.jsx";
import Stats from "../components/Stats.jsx";
import Test from "../components/Test.jsx";
import { TourOverViewRoute } from "../components/TourOverView/TourOverViewRoute.jsx";
import { UserListRoute } from "../components/Users/UserListRoute.jsx";
import { TourRoute } from "../components/Tours/TourRoute.jsx";
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
					{ index: true, element: <Navigate to="home" /> },
					{ path: "home", element: <Stats /> },
					{
						path: "user",
						...UserListRoute,
					},
					{ path: "test", element: <Test /> },
					{ path: "tour", ...TourRoute },
					{ path: "tour/:tourId", ...TourOverViewRoute },
				],
			},
		],
	},
]);
