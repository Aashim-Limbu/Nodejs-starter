import tokenRequest from "../../utils/tokenGetRequest";
import UserPage from "./UsersPage";
async function loader() {
	const response = await tokenRequest("/users");
	return response.data.data.data;
}
export const UserListRoute = {
	element: <UserPage />,
	loader,
};
