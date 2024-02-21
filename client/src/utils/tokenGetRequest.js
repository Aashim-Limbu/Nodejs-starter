import { apis } from "./apis";
export default function tokenRequest(route) {
	// const token = sessionStorage.getItem("token");
	return apis.get(
		route
		//     , {
		// 	headers: {
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// }
	);
}
