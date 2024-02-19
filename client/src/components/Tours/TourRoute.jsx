import tokenRequest from "../../utils/tokenRequest";
import Tours from "./Tours";
async function loader() {
	const response = await tokenRequest("/tours");
	return response.data;
}
export const TourRoute = {
	element: <Tours />,
    loader
};
