import prismaClient from "../../prisma";

class ListFinishedOrdersService {
    async execute() {
        const finishedOrders = await prismaClient.pedido.findMany({
            where: {
                rascunho: false,
            },
            orderBy: {
                atualizado_em: 'desc',
            },
            include: {
                items: true,
            },
        });

        const formattedFinishedOrders = finishedOrders.map(order => ({
            ...order,
            criado_em: order.criado_em ? order.criado_em.toISOString().split('T')[0] : null,
            atualizado_em: order.atualizado_em ? order.atualizado_em.toISOString().split('T')[0] : null,
        }));

        return formattedFinishedOrders;
    }
}

export { ListFinishedOrdersService };
