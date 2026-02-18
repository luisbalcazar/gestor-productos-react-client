import { safeParse } from "valibot";
import {
  DraftProductSchema,
  ProductSchema,
  ProductsSchema,
  type ProductType,
} from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

export type ProductServiceType = {
  [k: string]: FormDataEntryValue;
};

const baseURL: string = import.meta.env.VITE_API_URL;

export const addProduct = async (data: ProductServiceType) => {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      const url = `${baseURL}/api/products`;
      const { data } = await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });

      if (data) {
        return {
          message: "Producto agregado exitosamente",
          code: 201,
        };
      }
    } else {
      throw new Error("Datos invalidos.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const url = `${baseURL}/api/products`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id: ProductType["id"]) => {
  try {
    const url = `${baseURL}/api/products/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (
  _data: ProductServiceType,
  id: ProductType["id"],
) => {
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: _data.name,
      price: +_data.price,
      availability: toBoolean(_data.availability.toString()),
    });

    if (result.success) {
      const url = `${baseURL}/api/products/${id}`;
      const { data } = await axios.put(url, {
        id,
        name: result.output.name,
        price: result.output.price,
        availability: result.output.availability,
      });

      if (data) {
        return {
          message: "Producto editado exitosamente",
          code: 200,
        };
      }
    } else {
      throw new Error("Datos invalidos.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateProductAvailability = async (id: ProductType["id"]) => {
  try {
    const url = `${baseURL}/api/products/${id}`;
    const { data } = await axios.patch(url);

    if (data) {
      return {
        message: "Disponibilidad del producto editado exitosamente",
        code: 200,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id: ProductType["id"]) => {
  try {
    const url = `${baseURL}/api/products/${id}`;
    const { data } = await axios.delete(url);

    if (data) {
      return {
        message: "Producto eliminado correctamente",
        code: 200,
      };
    }
  } catch (error) {
    console.error(error);
  }
};
