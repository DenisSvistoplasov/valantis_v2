import { useFilterContent } from "../../../hooks/useFilterContent";
import {
  resetFilter,
  selectFilter,
  setBrand,
  setPriceInterval,
  setProductName,
} from "../../../store/filterSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { BrandSelect } from "./BrandSelect/BrandSelect";
import styles from "./Filter.module.scss";
import { PriceInterval } from "./PriceInterval/PriceInterval";
import { ProductNameSearch } from "./ProductNameSearch/ProductNameSearch";

interface FilterProps {}

export function Filter({}: FilterProps) {
  const { brands, prices, isLoading } = useFilterContent();
  const [minPrice, maxPrice] = [Math.min(...prices), Math.max(...prices)];

  const { product, brand, price } = useAppSelector(selectFilter);
  const from = price?.from;
  const to = price?.to;

  const dispatch = useAppDispatch();

  const changeProductName = (value: string) => {
    dispatch(setProductName(value));
  };
  const changeBrand = (value: string) => {
    dispatch(setBrand(value));
  };
  const setPriceInterval_ = (interval: { from: number; to: number }) => {
    dispatch(setPriceInterval(interval));
  };
  const reset = () => dispatch(resetFilter());

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Filter</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.filter}>
          <ProductNameSearch
            initialValue={product}
            onChange={changeProductName}
          />
          <BrandSelect value={brand} brands={brands} onChange={changeBrand} />
          <PriceInterval
            from={from}
            to={to}
            min={minPrice}
            max={maxPrice}
            setPriceInterval={setPriceInterval_}
          />
          <button className={styles.resetBtn} onClick={reset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
