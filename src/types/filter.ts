export interface IFilter {
  brand?: string;
  price?: {
    from?: number;
    to?: number;
  };
  product?: string;
}
