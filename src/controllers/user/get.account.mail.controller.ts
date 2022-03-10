import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Account} from "../../entities/account.entity";
import {isNullOrUndefined} from "util";

export async function getAccountMailController(request: Request, response: Response){

    const mail = request.params.mail;

    const accountRepo = getManager().getRepository(Account);

    if(isNullOrUndefined(mail))
    {
        const account = await accountRepo.createQueryBuilder()
            .select("*")
            .from(Account,"account")
            .where("account.mail = :mail",mail)
            .getOne();


        response.send(account);
        response.status(200).end();
    }
}