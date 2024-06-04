import { Request, Response } from 'express';
import { RemoveOrderService } from '../../services/order/RemoveOrderService';

class RemoveOrderController {
    async handle(req: Request, res: Response) {
        const id_pedido = req.query.id_pedido as string;

        const removeOrderService = new RemoveOrderService();

        try {
            const order = await removeOrderService.execute({ id_pedido });
            return res.json(order);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Erro ao remover o pedido', error: error.message });
            }
            return res.status(500).json({ message: 'Erro desconhecido ao remover o pedido' });
        }
    }
}

export { RemoveOrderController };
