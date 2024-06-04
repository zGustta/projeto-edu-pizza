import { Request, Response } from 'express';
import { CloseOrderService } from '../../services/order/CloseOrderService';

class CloseOrderController {
    async handle(req: Request, res: Response) {
        const { orderId } = req.params;
        const closeOrderService = new CloseOrderService();

        try {
            const closeOrder = await closeOrderService.execute(orderId);
            return res.json(closeOrder);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'Unknown error' });
        }
    }
}

export { CloseOrderController };
