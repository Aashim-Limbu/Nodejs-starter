import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { apis } from "../../utils/apis";
export default function UserUpdateForm() {
	const inputRef = useRef(null);
	const navigate = useNavigate();
	const { userId } = useParams();
	console.log(userId);
	const { user } = useLoaderData();
	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [role, setRole] = useState(user?.role);
	const [image, setImage] = useState(user?.photo);
	console.log(image);
	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		formData.append("role", role);
		formData.append("photo", image);
		try {
			await apis.patch(`/users/${userId}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return navigate(-2);
		} catch (error) {
			console.error("Error updating user:", error);
		}
	}

	return (
		// <Form method="patch" action={`/users/${userId}`}>
		<form method="patch" onSubmit={handleSubmit}>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Personal Information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Use a permanent address where you can receive mail.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label
								htmlFor="first-name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="name"
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:col-span-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label
								htmlFor="photo"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Photo
							</label>
							<div className="mt-2 flex items-center gap-x-3">
								<UserCircleIcon
									className="h-12 w-12 text-gray-300"
									aria-hidden="true"
								/>
								<input
									ref={inputRef}
									className="hidden"
									type="file"
									id="photo"
									onChange={(e) => setImage(e.target.files[0])}
									name="photo"
									accept="image/*"
								/>

								<button
									type="button"
									className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
									onClick={() => inputRef.current.click()}
								>
									Change
								</button>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Roles
							</label>
							<div className="mt-2">
								<select
									id="role"
									name="role"
									autoComplete="country-name"
									value={role}
									onChange={(e) => setRole(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option value="admin">Admin</option>
									<option value="guide">Guide</option>
									<option value="user">User</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="button"
					className="text-sm font-semibold leading-6 text-gray-900"
					onClick={() => navigate(-2)}
				>
					Cancel
				</button>

				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Save
				</button>
			</div>
		</form>
	);
}
