import {Request, Response} from "express";
import {getManager} from "typeorm";
import {isNullOrUndefined} from "util";
import {Account} from "../../entities/account.entity";

export async function deleteAccountController(request: Request, response: Response)
{
    const id = request.params.id;

    if (isNullOrUndefined(id))
    {
        response.status(400).end();
        return;
    }

    await getManager().getRepository(Account).delete(id);

    response.status(200).end();
}
