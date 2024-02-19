import UserUpdateForm from "./UserUpdateForm";
import { redirect } from "react-router-dom";
import tokenRequest from "../../utils/tokenGetRequest";
import tokenPatchRequest from "../../utils/tokenPatchRequest";
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
	action,
};
async function action({ request, params }) {
	const { userId } = params;
	const data = await request.formData();
	const submission = {
		email: data.get("email"),
		name: data.get("name"),
		role: data.get("role"),
	};

	const user = await tokenPatchRequest(`/users/${userId}`, submission);
	return redirect("..");
}
