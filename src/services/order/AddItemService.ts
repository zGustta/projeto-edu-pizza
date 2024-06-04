import prismaClient from "../../prisma";

interface ItemRequest {
    quantidade: number;
    id_produto: string;
    id_pedido: string;
}

class AddItemService {
    async execute({ quantidade, id_produto, id_pedido }: ItemRequest) {
        const newItem = await prismaClient.item.create({
            data: {
                quantidade: quantidade,
                produtoId: id_produto,
                pedidoId: id_pedido,
            }
        });

        return newItem;
    }
}

export { AddItemService };
