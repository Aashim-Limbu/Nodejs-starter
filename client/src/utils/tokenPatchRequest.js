import { apis } from "./apis";

export default function tokenActionRequest(routes, patchData) {
	// const token = sessionStorage.getItem("token");
	return apis.patch(
		routes,
		patchData
		//     , {
		// 	headers: {
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// }
	);
}
