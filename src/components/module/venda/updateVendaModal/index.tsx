import React, { useState } from 'react';
import { Modal } from '@/components/UI/modal';
import { updateProduct } from '@/service/productsHttp';
import { FormSubmitHandler, useForm } from 'react-hook-form';
import { UpdateProductReq } from '@/@types/interfaces/req/UpdateProductReq';
import { ProductForm, ProductFormFields } from "../../product/productForm";
import { MessageModal } from '@/components/UI/messageModal';
import { ModalHeader } from '@/components/UI/modalHeader';
import { ItemVenda } from '@/@types/interfaces/Venda';

export default function UpdateVendaModal({
  selectedVenda,
  onClose,
}: {
  selectedVenda: ItemVenda;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<{ message: string; error: boolean }>();
  console.log(selectedVenda);

  const { control, register } = useForm<ProductFormFields>({
    defaultValues: {
      nome: selectedVenda.nome,
      marca: selectedVenda.marca,
      preco: selectedVenda.preco,
      cod: selectedVenda.codigo,
      categoriaId: selectedVenda.Categoria.id,
    },
  });

  const onSubmit: FormSubmitHandler<ProductFormFields> = async ({ data }) => {
    const updatedProduct: UpdateProductReq = {
      id: selectedProduct.id!,
      nome: data.nome,
      marca: data.marca,
      categoriaId: data.categoriaId,
      preco: +data.preco,
      codigo: +data.cod,
    };
    const response = await updateProduct(updatedProduct);
    setStatus(response);
  };

  return (
    <>
      {status && (
        <MessageModal
          message={status.message}
          icon={status.error ? '/img/error.png' : '/img/check.png'}
          onClose={status.error ? () => setStatus(undefined) : onClose}
        />
      )}
      {!status && (
        <Modal
          onClose={onClose}
          className='bg-orange-400 p-8 rounded-xl w-[960px] flex flex-col'
        >
          <ModalHeader title='Atualizar o Produto' onClose={onClose} />
          <ProductForm
            onSubmit={onSubmit}
            control={control}
            register={register}
            update
          />
        </Modal>
      )}
    </>
  );
}
