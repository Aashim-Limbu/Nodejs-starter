import { useLoaderData, Link } from "react-router-dom";
import Button from "../Button";
export default function User() {
	const { user } = useLoaderData();
	console.log(user);
	return (
		<div>
			<div className="px-4 xl:grid-cols-7 sm:px-0 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1">
				<div className="xl:col-span-6 md:col-span-3 sm:col-span-2">
					<h3 className="text-base font-semibold leading-7 text-gray-900">
						User Information
					</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						Personal details and application.
					</p>
				</div>
				<div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
					<img
						src={user.imageUrl}
						alt={user.name}
						className="object-contain object-center"
					/>
				</div>
			</div>
			<div className="mt-6 border-t border-gray-100">
				<dl className="divide-y divide-gray-100">
					<div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Full name
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{user.name}
						</dd>
					</div>
					<div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Email address
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{user.email}
						</dd>
					</div>
					<div className="bg-gray-50  px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Role
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{user.role}
						</dd>
					</div>
					<div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Active
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							true
						</dd>
					</div>
					<div className="grid md:grid-cols-2 gap-4">
						<Link className="flex flex-1" to="edit">
							<Button className="flex-1" primary>
								Edit
							</Button>
						</Link>
						<Button danger>Delete</Button>
					</div>
				</dl>
			</div>
		</div>
	);
}
