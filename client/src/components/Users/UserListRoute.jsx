import tokenRequest from "../../utils/tokenRequest"
import UserList from "./UserList";
async function loader() {
	const response = await tokenRequest('/users')
	return response;
}
export const UserListRoute = {
    element: <UserList />,
	loader,
};
