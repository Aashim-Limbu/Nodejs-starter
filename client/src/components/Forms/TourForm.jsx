import { PhotoIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { PiImagesSquareLight } from "react-icons/pi";
import { useLoaderData } from "react-router-dom";
import tokenRequest from "../../utils/tokenGetRequest";
export default function TourForm() {
	const { users } = useLoaderData();
	const filteredUsers = users.filter((user) => user.role !== "user");
	console.log(filteredUsers);
	const fileInput = useRef(null);
	return (
		<form>
			<div className="space-y-12 sm:space-y-16">
				<div>
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Tour Description
					</h2>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
						This information will be displayed publicly so be careful what you
						share.
					</p>

					<div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="tourname"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Tourname
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<input
										type="text"
										name="tourname"
										id="tourname"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="Tour Name...."
									/>
								</div>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="guide"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								GuideName
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0 border-gray-900/10">
								<select
									name="select-guide"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<optgroup label="Guide" className="font-sans"></optgroup>
									{filteredUsers.map((user) => (
										<option className="" value={user._id} key={user._id}>
											{user.name}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="summary"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Summary
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<textarea
									id="summary"
									name="summary"
									rows={3}
									className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									defaultValue={""}
								/>
								<p className="mt-3 text-sm leading-6 text-gray-600">
									Write a few sentences about Tour.
								</p>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="description"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Description
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<textarea
									id="description"
									name="description"
									rows={3}
									className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									defaultValue={""}
								/>
								<p className="mt-3 text-sm leading-6 text-gray-600">
									Write a detailed description of Tour.
								</p>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
							<label
								htmlFor="photos"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Photos
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<div className="flex items-center gap-x-3 ">
									<PiImagesSquareLight
										className="h-12 w-12 text-gray-300"
										aria-hidden="true"
									/>
									<input
										ref={fileInput}
										id="photos"
										name="photos"
										type="file"
										accept="image/*"
										className="hidden w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									<button
										type="button"
										className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
										onClick={() => fileInput.current.click()}
									>
										Add
									</button>
								</div>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="cover-photo"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Cover photo
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
									<div className="text-center">
										<PhotoIcon
											className="mx-auto h-12 w-12 text-gray-300"
											aria-hidden="true"
										/>
										<div className="mt-4 flex text-sm leading-6 text-gray-600">
											<label
												htmlFor="cover-file-upload"
												className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
											>
												<span>Upload a file</span>
												<input
													id="cover-file-upload"
													name="cover-file-upload"
													type="file"
													className="sr-only"
												/>
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										<p className="text-xs leading-5 text-gray-600">
											PNG, JPG, GIF up to 10MB
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Destination Information
					</h2>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
						Give an accurate destination data.
					</p>

					<div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="destination-description"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Destination Name
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<input
									type="text"
									id="destination-description"
									name="destination-description"
									placeholder="Nepal"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="destination-address"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Destination Address
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<input
									type="text"
									id="destination-address"
									name="destination-address"
									placeholder="Kathmandu"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="destination-latitude"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Destination Latitude
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<input
									type="number"
									name="destination-latitude"
									id="destination-latitude"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="destination-longitude"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Destination Longitude
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<input
									type="number"
									name="destination-longitude"
									id="destination-longitude"
									autoComplete="family-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Attractions
					</h2>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
						Get the NearBy Attractions!
					</p>
					<div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="attraction-country"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Attraction Name
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<input
									type="text"
									id="attraction-country"
									name="attraction-country"
									placeholder="Nepal"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="attraction-address"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Attraction Address
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<input
									type="text"
									id="attraction-address"
									name="attraction-address"
									placeholder="Gaushala,Kathmandu"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="attraction-latitude"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Attraction Latitude
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<input
									type="number"
									name="attraction-latitude"
									id="attraction-latitude"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
							<label
								htmlFor="attraction-longitude"
								className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
							>
								Attraction Longitude
							</label>
							<div className="mt-2 sm:col-span-2 sm:mt-0">
								<input
									type="number"
									name="attraction-longitude"
									id="attraction-longitude"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								/>
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
					className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Save
				</button>
			</div>
		</form>
	);
}
async function loader() {
	const response = await tokenRequest("/users");
	return {
		users: response.data.data.data,
	};
}
export const TourFormRoute = {
	loader,
	element: <TourForm />,
};
