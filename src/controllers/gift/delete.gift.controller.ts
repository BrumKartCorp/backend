import {Request, Response} from "express";
import {getManager} from "typeorm";
import {isNullOrUndefined} from "util";
import {Gift} from "../../entities/gift.entity";

export async function deleteGiftController(request: Request, response: Response)
{
    const id = request.params.id;

    if (isNullOrUndefined(id))
    {
        response.status(400).end();
        return;
    }

    await getManager().getRepository(Gift).softDelete(id);

    response.status(200).end();
}
