import { queryClient } from "@/components/utils/reactQueryProvider";

export async function getProducts() {
  const response = await fetch("http://localhost:8080/produtos");
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
