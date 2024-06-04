import { Request, Response } from "express";
import { ListFinishedOrdersService } from "../../services/order/ListFinishedOrdersService";

class ListFinishedOrdersController {
    async handle(req: Request, res: Response) {
        const listFinishedOrdersService = new ListFinishedOrdersService();
        try {
            const finishedOrders = await listFinishedOrdersService.execute();
            return res.json(finishedOrders);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Erro ao listar pedidos finalizados', error: error.message });
            }
            return res.status(500).json({ message: 'Erro desconhecido ao listar pedidos finalizados' });
        }
    }
}

export { ListFinishedOrdersController };
