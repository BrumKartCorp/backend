import {Request, Response} from "express";
import {getManager} from "typeorm";
import {isNullOrUndefined} from "util";
import {Account} from "../../entities/account.entity";

export async function getAccountController(request: Request, response: Response)
{
    const id = request.params.id;

    const accountRepo = getManager().getRepository(Account);

    if (isNullOrUndefined(id))
    {
        const accounts = await accountRepo.find();

        response.send(accounts);
        response.status(200).end();
        return;
    }

    const account = await accountRepo.findOne(id);

    if (isNullOrUndefined(account))
    {
        response.status(400).end();
        return;
    }

    response.send(account);
    response.status(200).end();
}