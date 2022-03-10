import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Account} from "../../entities/account.entity";
import {isNullOrUndefined} from "util";

export async function getAccountMailController(request: Request, response: Response){

    const mail = request.params.mail;

    const accountRepo = getManager().getRepository(Account);

    if(isNullOrUndefined(mail))
    {
        response.status(400).end();
    }
    const account = await accountRepo.find({
        where: [
            { mail: mail },
        ],
    });


    response.send(account);
    response.status(200).end();
}