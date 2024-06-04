import prismaClient from "../../prisma";

type RemoveItemRequest = {
    orderId: string;
    itemId: string;
}

type RemoveItemResponse = {
    error: boolean;
    status?: number;
    message?: string;
    item?: {
        id: string;
        quantidade: number;
        criado_em: Date | null;
        atualizado_em: Date | null;
        produtoId: string | null;
        pedidoId: string | null;
    };
}

class RemoveItemService {
    async execute({ orderId, itemId }: RemoveItemRequest): Promise<RemoveItemResponse> {
        const order = await prismaClient.pedido.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            return { error: true, status: 404, message: 'Pedido não encontrado' };
        }

        if (!order.rascunho) {
            return { error: true, status: 400, message: 'Não é possível remover itens de um pedido já enviado para a cozinha' };
        }

        try {
            const removedItem = await prismaClient.item.delete({
                where: {
                    id: itemId,
                },
            });

            return { error: false, item: removedItem };
        } catch (err) {
            return { error: true, status: 500, message: 'Erro ao remover item' };
        }
    }
}

export { RemoveItemService };
