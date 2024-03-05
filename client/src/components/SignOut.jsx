import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apis } from "../utils/apis";
import { toast, Bounce } from "react-toastify";
function SignOut() {
	const navigate = useNavigate();
	useEffect(() => {
		async function logout() {
			try {
				await apis.get("/users/signout");
				sessionStorage.clear();
				navigate("/signin");
				toast.success("Logged Out Successfull !!", {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
			} catch (e) {
				console.log("Error", e);
				toast.error("Failed to signOut!!", {
					position: "bottom-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
			}
		}
		logout();
	}, [navigate]);
	return <div>signout</div>;
}

export default SignOut;
