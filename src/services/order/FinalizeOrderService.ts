import prismaClient from "../../prisma";

class FinalizeOrderService {
    async execute(orderId: string) {
        const orderData = await prismaClient.pedido.findUnique({
            where: { id: orderId },
        });

        if (!orderData) {
            throw new Error('Order not found');
        }

        if (!orderData.rascunho) {
            throw new Error('Order is already finalized');
        }

        const closedOrder = await prismaClient.pedido.update({
            where: { id: orderId },
            data: { rascunho: false },
        });

        return closedOrder;
    }
}

export { FinalizeOrderService };
