import {Request, Response} from "express";
import {isNullOrUndefined} from "util";
import {getManager} from "typeorm";
import {Gift} from "../../entities/gift.entity";
import {Account} from "../../entities/account.entity";

export async function purchaseGiftNameController(request: Request, response: Response)
{
    const accountId = request.body.accountId;
    const giftName = request.body.giftName;

    if(isNullOrUndefined(accountId) || isNullOrUndefined(giftName))
    {
        response.status(400).end();
        return;
    }

    const accountRepo = getManager().getRepository(Account);
    const giftRepo = getManager().getRepository(Gift);

    const account = await accountRepo.findOne(accountId);
    const gift = await giftRepo.findOne({ where: { name: giftName }});

    if(isNullOrUndefined(account) || isNullOrUndefined(gift))
    {
        response.status(400).end();
        return;
    }

    account.gifts.map(accountGift => {
        if (accountGift.name === gift.name)
        {
            response.status(400).end();
            return;
        }
    });

    account.gifts.push(gift);
    await accountRepo.save(account);

    response.status(200).end();
}
