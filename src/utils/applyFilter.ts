import { IProduct, IFilter } from "../types";

export function applyFilter(items: IProduct[], filter: IFilter) {
  return items.filter((item) => {
    if ("brand" in filter && filter.brand !== item.brand) return false;
    if (
      "price" in filter &&
      ((filter.price!.from || 0) > item.price ||
        (filter.price!.to || Infinity) < item.price)
    )
      return false;
    if (
      "product" in filter &&
      !item.product.toLowerCase().includes(filter.product!.toLowerCase())
    )
      return false;
    return true;
  });
}
