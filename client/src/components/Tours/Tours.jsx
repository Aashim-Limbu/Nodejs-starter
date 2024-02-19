import { useLoaderData } from "react-router-dom";
import ProductList from "./ProductList";
function Tours() {
	const tours = useLoaderData();
	console.log(tours.data.data);
	return (
		<div>
			<div>Tours</div>
			<ProductList products={tours.data.data} />
		</div>
	);
}

export default Tours;
