function AttractionsForm() {
	return (
		<>
			<div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
				<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
					<label
						htmlFor="country"
						className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
					>
						Description
					</label>
					<div className="mt-2 sm:col-span-2 sm:mt-0">
						<input
							type="text"
							id="country"
							name="country"
							placeholder="Kathmandu,Nepal"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
					<label
						htmlFor="address"
						className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
					>
						Address
					</label>
					<div className="mt-2 sm:col-span-2 sm:mt-0">
						<input
							type="text"
							id="address"
							name="address"
							placeholder="Sundhara"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
					<label
						htmlFor="latitude"
						className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
					>
						Latitude
					</label>
					<div className="mt-2 sm:col-span-2 sm:mt-0">
						<input
							type="number"
							name="latitude"
							id="latitude"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
					<label
						htmlFor="longitude"
						className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
					>
						Longitude
					</label>
					<div className="mt-2 sm:col-span-2 sm:mt-0">
						<input
							type="number"
							name="longitude"
							id="longitude"
							autoComplete="family-name"
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default AttractionsForm;
