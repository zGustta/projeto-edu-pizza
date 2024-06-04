import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/order/CreateOrderService';

class CreateOrderController {

    async handle(req: Request, res: Response) {
        const { mesa: tableNumber, nome: customerName } = req.body;

        const createOrderService = new CreateOrderService();

        const newOrder = await createOrderService.execute({ tableNumber, customerName });
        return res.json({ order: newOrder });
    }
}

export { CreateOrderController };
