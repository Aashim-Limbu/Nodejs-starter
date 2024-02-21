import UserUpdateForm from "./UserUpdateForm";
// import { redirect } from "react-router-dom";
import tokenRequest from "../../utils/tokenGetRequest";
// import tokenPatchRequest from "../../utils/tokenPatchRequest";
async function loader({ params }) {
	const { userId } = params;
	const user = await tokenRequest(`/users/${userId}`);
	return {
		user: user.data.data.data,
	};
}
export const UserUpdateRoute = {
	element: <UserUpdateForm />,
	loader,
};
