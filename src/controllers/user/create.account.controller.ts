import {Request, Response} from "express";
import {getManager} from "typeorm";
import {isNullOrUndefined} from "util";
import {Account} from "../../entities/account.entity";

export async function createAccountController(request: Request, response: Response)
{
    const mail = request.body.mail;
    const password = request.body.password;

    if (isNullOrUndefined(mail) || isNullOrUndefined(password))
    {
        response.status(400).end();
        return;
    }
    const userRepo = getManager().getRepository(Account);

    await userRepo.save(
        await userRepo.create({
            mail: mail,
            password: password,
        })
    );

    response.status(200).end();
}