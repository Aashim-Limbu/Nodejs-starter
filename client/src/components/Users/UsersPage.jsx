import {useLoaderData} from "react-router-dom"
import UserList from "./UserList";
export default function UserPage() {
	const data = useLoaderData()
    console.log(data)
	return <div>
        <UserList/>
    </div>;
}
