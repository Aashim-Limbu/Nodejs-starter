import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectRoute() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const auth = sessionStorage.getItem("token");
		if (!auth) {
			navigate("/signin");
		}
	}, [location, navigate]);

	return <Outlet />;
}
