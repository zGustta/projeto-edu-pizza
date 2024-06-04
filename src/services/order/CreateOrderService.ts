import prismaClient from "../../prisma";

interface OrderRequest {
    tableNumber: number;
    customerName: string;
}

class CreateOrderService {

    async execute({ tableNumber, customerName }: OrderRequest) {
        const newOrder = await prismaClient.pedido.create({
            data: {
                mesa: tableNumber,
                nome: customerName
            }
        });
        return newOrder;
    }
}

export { CreateOrderService };
