import { Outlet } from "react-router-dom";
function DashBoardLayout() {
	return (
		<div>
			This is DashBoardLayout
			<Outlet />
		</div>
	);
}

export default DashBoardLayout;
