import {
  AppResponse,
  type AppRequest,
  type EndpointDefinition,
} from "@simapi/simapi";
import { mockProducts } from "@models/product.js";
import { listProductsRequest } from "@requests/list-products.js";

export const getProducts: EndpointDefinition = {
  path: "/api/commerce/v1/products",
  method: "GET",
  type: "secure",
  title: "List Commerce Products",
  description:
    "Returns a paginated list of commerce products, optionally filtered by keyword.",
  request: listProductsRequest,
  handler: (req: AppRequest) => {
    const search = req.param("search")?.toLowerCase() || "";
    const page = Number.parseInt(req.param("page") || "1", 10);
    const perPage = Number.parseInt(req.param("per_page") || "15", 10);

    let filtered = [...mockProducts];

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.custom_category.toLowerCase().includes(search),
      );
    }

    const total = filtered.length;
    const lastPage = Math.max(1, Math.ceil(total / perPage));
    const currentPage = Math.min(page, lastPage);
    const offset = (currentPage - 1) * perPage;
    const paginated = filtered.slice(offset, offset + perPage);

    return AppResponse.success({
      data: paginated,
      meta: {
        current_page: currentPage,
        last_page: lastPage,
        per_page: perPage,
        total,
      },
    });
  },
};

export const getProductDetail: EndpointDefinition = {
  path: "/api/commerce/v1/products/:id",
  method: "GET",
  type: "secure",
  title: "Get Single Product Details",
  description: "Returns the details of a single commerce product.",
  handler: (req: AppRequest) => {
    const id = req.urlParam("id");
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return AppResponse.notFound({
        message: `Product with ID ${id} not found.`,
      });
    }

    return AppResponse.success({ data: product });
  },
};
