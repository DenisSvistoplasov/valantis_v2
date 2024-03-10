import { useEffect, useMemo, useState } from "react";
import { useGetAllProductsQuery } from "../../store/api/productApi";
import { selectFilter } from "../../store/filterSlice";
import { useAppSelector } from "../../store/store";
import { clearNullish } from "../../utils/clearNullish";
import styles from "./Content.module.scss";
import { Pagination } from "./Pagination/Pagination";
import { ProductList } from "./ProductList/ProductList";
import { applyFilter } from "../../utils/applyFilter";
import { paginateArray } from "../../utils/paginateArray";

interface ContentProps {}

export function Content({}: ContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 50;

  const filter = useAppSelector(selectFilter);
  const clearedFilter = useMemo(() => clearNullish(filter), [filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const {
    data: products = [],
    isFetching,
    isUninitialized,
  } = useGetAllProductsQuery();

  const filteredProducts = useMemo(
    () => applyFilter(products, clearedFilter),
    [products, clearedFilter]
  );

  const totalItems = filteredProducts.length || 1;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const currentProducts = useMemo(
    () => paginateArray(filteredProducts, currentPage, ITEMS_PER_PAGE),
    [filteredProducts, currentPage, ITEMS_PER_PAGE]
  );

  const goToPage = (page: number) => setCurrentPage(page);

  return (
    <div className={styles.wrapper}>
      <h2 className="title">Products</h2>
      <ProductList
        products={currentProducts}
        isLoading={isFetching || isUninitialized}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goTo={goToPage}
      />
    </div>
  );
}
