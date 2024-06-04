import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/order/RemoveItemService';

class RemoveItemController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { orderId, itemId } = req.params;

        const removeItemService = new RemoveItemService();

        try {
            const removedItem = await removeItemService.execute({ orderId, itemId });
            return res.status(200).json({ message: 'Item removido do pedido com sucesso', item: removedItem });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: 'Erro ao remover item do pedido', error: error.message });
            }
            return res.status(500).json({ message: 'Erro ao remover item do pedido' });
        }
    }
}

export { RemoveItemController };
