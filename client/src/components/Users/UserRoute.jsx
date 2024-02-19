import tokenRequest from "../../utils/tokenGetRequest";
import User from "./User";
async function loader({ params }) {
	const { userId } = params;
	const user = await tokenRequest(`/users/${userId}`);
	return {
		user: user.data.data.data,
	};
}
export const UserRoute = {
	element: <User />,
	loader,
};
