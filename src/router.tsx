import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import Product, {
  loader as productLoader,
  action as productAction,
} from "./views/Product";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {
  action as editProductAction,
  loader as editProductLoader,
} from "./views/EditProduct";
import { action as productDetailAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Product />,
        loader: productLoader,
        action: productAction,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar",
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "productos/:id/eliminar",
        action: productDetailAction,
      },
    ],
  },
]);
