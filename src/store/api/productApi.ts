import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { ApiAction, IProduct } from "../../types";
import { splitIntoChunks } from "../../utils/splitIntoChunks";

const API_MAX_PRODUCTS_PER_REQUEST = 100;

const retrieveData = <T>(res: { result: T }) => res.result;
const uniqueize = <T>(arr: T[]) => Array.from(new Set(arr));

export const productApi = createApi({
  reducerPath: "products",
  baseQuery: retry(baseQuery),
  endpoints: (builder) => ({
    getAllIds: builder.query<string[], void>({
      query: () => ({
        url: "",
        body: {
          action: ApiAction.getIds,
        },
      }),
      transformResponse: (response: { result: string[] }) => {
        return uniqueize(retrieveData(response));
      },
    }),

    getAllProducts: builder.query<IProduct[], void>({
      queryFn: async (arg, api, extra, baseQuery) => {
        const ids =
          (await api.dispatch(productApi.endpoints.getAllIds.initiate()))
            .data || [];
        const idChunks = splitIntoChunks(ids, API_MAX_PRODUCTS_PER_REQUEST);
        const promises = idChunks.map((idChunk) =>
          baseQuery({
            url: "",
            body: {
              action: ApiAction.getItems,
              params: {
                ids: idChunk,
              },
            },
          })
        );
        const responses = (await Promise.all(promises)) as {
          data: { result: IProduct[] };
        }[];

        // With unique ID only
        const idMap = {} as { [key: string]: boolean };
        const products: IProduct[] = [];
        responses.forEach((response) => {
          response.data.result.forEach((product) => {
            if (!(product.id in idMap)) {
              idMap[product.id] = true;
              products.push(product);
            }
          });
        });

        return { data: products };
      },
    }),
  }),
});

export const { useGetAllIdsQuery, useGetAllProductsQuery } = productApi;
