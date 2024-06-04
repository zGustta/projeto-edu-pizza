import { Request, Response } from 'express';
import { AddItemService } from '../../services/order/AddItemService';

class AddItemController {
    async handle(request: Request, response: Response) {
        const { quantidade, id_pedido, id_produto } = request.body;

        const addItemService = new AddItemService();

        const newItem = await addItemService.execute({
            quantidade,
            id_produto,
            id_pedido
        });

        return response.json(newItem);
    }
}

export { AddItemController };
