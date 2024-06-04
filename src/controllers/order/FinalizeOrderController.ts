import { Request, Response } from 'express';
import { FinalizeOrderService } from '../../services/order/FinalizeOrderService';

class FinalizeOrderController {
    async handle(req: Request, res: Response) {
        const { orderId } = req.params;
        const finalizeOrderService = new FinalizeOrderService();

        try {
            const closedOrder = await finalizeOrderService.execute(orderId);
            return res.json(closedOrder);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'Unknown error' });
        }
    }
}

export { FinalizeOrderController };
