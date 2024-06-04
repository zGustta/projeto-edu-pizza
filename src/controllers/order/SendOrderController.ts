import { Request, Response } from 'express';
import { SendOrderService } from '../../services/order/SendOrderService';

class SendOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body;

        const sendOrderService = new SendOrderService();

        try {
            const updatedOrder = await sendOrderService.execute({ order_id });
            return res.json(updatedOrder);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Erro ao enviar o pedido', error: error.message });
            }
            return res.status(500).json({ message: 'Erro desconhecido ao enviar o pedido' });
        }
    }
}

export { SendOrderController };
