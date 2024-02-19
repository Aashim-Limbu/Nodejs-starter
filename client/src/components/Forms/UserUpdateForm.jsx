import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Form, useParams, useLoaderData } from "react-router-dom";
import { useRef } from "react";
export default function UserUpdateForm() {
	const inputRef = useRef(null);
	const { userId } = useParams();
	const { user } = useLoaderData();

	return (
		// <Form method="patch" action={`/users/${userId}`}>
		<Form method="patch">
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
									defaultValue={user.name}
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
									defaultValue={user.email}
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
									defaultValue={user.role}
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
		</Form>
	);
}
