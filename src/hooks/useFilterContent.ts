import { useGetAllProductsQuery } from "../store/api/productApi";

export function useFilterContent() {
  const {
    data: products = [],
    isFetching,
    isUninitialized,
  } = useGetAllProductsQuery();

  const brands = new Set<string>();
  const prices = new Set<number>();

  products.forEach(({ brand, price }) => {
    if (brand) brands.add(brand);
    prices.add(price);
  });

  return {
    brands: Array.from(brands).sort(),
    prices: Array.from(prices).sort((a, b) => a - b),
    isLoading: isFetching || isUninitialized,
  };
}
