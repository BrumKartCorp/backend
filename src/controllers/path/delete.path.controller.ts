import {Request, Response} from "express";
import {getManager} from "typeorm";
import {isNullOrUndefined} from "util";
import {Path} from "../../entities/path.entity";

export async function deletePathController(request: Request, response: Response)
{
    const id = request.params.id;

    if (isNullOrUndefined(id))
    {
        response.status(400).end();
        return;
    }

    await getManager().getRepository(Path).softDelete(id);

    response.status(200).end();
}
