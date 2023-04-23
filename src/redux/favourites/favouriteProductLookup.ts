import { useSelector } from "react-redux";
import { favouritesSelector } from "./favouritesSlice";
const useFavouriteLookup = () => {
  const { favouriteProducts } = useSelector(favouritesSelector);
  const lookup = new Set<number>();
  favouriteProducts.forEach((product) => {
    lookup.add(product.id);
  });
  return lookup;
};
export default useFavouriteLookup;
