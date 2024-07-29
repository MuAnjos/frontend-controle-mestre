import { Category } from "@/@types/interfaces/Category";
import { CreateProductReq } from "@/@types/interfaces/req/CreateProductReq";
import { UpdateProductReq } from "@/@types/interfaces/req/UpdateProductReq";
import { queryClient } from "@/components/utils/reactQueryProvider";

export async function getProducts(filter?: Category) {
  const response = await fetch(`http://localhost:8080/produtos?${filter ? "categoryId=" + filter.id : ""}`);
  const data = await response.json();
  return data;
}

export async function deleteProduct(selectedProduct: string) {
  const response = await fetch(
    `http://localhost:8080/produtos/${selectedProduct}`,
    {
      method: "DELETE",
    }
  );
  if (response.status !== 200) {
    return { message: "Ocorreu um erro ao deletar o produto", error: true };
  }
  queryClient.invalidateQueries({ queryKey: ["products"] });
  return { error: false, message: "Produto deletado com sucesso!" };
}

export async function updateProduct(updatedProduct: UpdateProductReq) {
  const response = await fetch("http://localhost:8080/produtos", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });
  if (response.status !== 200) {
    const errorResponse = await response.text();
    const error = JSON.parse(errorResponse);
    return { message: error.message, error: true };
  }
  queryClient.invalidateQueries({ queryKey: ["products"] });
  return { error: false, message: "Produto atualizado com sucesso!" };
}

export async function createProduct(newProduct: CreateProductReq) {
  const response = await fetch("http://localhost:8080/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...newProduct }),
  });
  if (response.status !== 200) {
    const errorResponse = await response.text();
    const error = JSON.parse(errorResponse);
    return { message: error.message, error: true };
  }
  queryClient.invalidateQueries({ queryKey: ["products"] });
  return { error: false, message: "Produto criado com sucesso!" };
}
