import {Request, Response} from "express";
import {getManager} from "typeorm";
import {isNullOrUndefined} from "util";
import {v4 as uuid} from 'uuid';
import {Account} from "../../entities/account.entity";

export async function createAccountController(request: Request, response: Response)
{
    const name = request.body.name;

    if (isNullOrUndefined(name))
    {
        response.status(400).end();
        return;
    }

    const userRepo = getManager().getRepository(Account);

    await userRepo.save(
        await userRepo.create({
            id: uuid(),
            name: name,
        })
    );

    response.status(200).end();
}
