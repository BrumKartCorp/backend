import {Request, Response} from "express";
import {isNullOrUndefined} from "util";
import {getManager} from "typeorm";
import {Gift} from "../../entities/gift.entity";
import {Account} from "../../entities/account.entity";

export async function purchaseGiftIdController(request: Request, response: Response)
{
    const accountId = request.body.accountId;
    const giftId = request.body.giftId;

    if(isNullOrUndefined(accountId) || isNullOrUndefined(giftId))
    {
        response.status(400).end();
        return;
    }

    const accountRepo = getManager().getRepository(Account);
    const giftRepo = getManager().getRepository(Gift);

    const account = await accountRepo.findOne(accountId);
    const gift = await giftRepo.findOne(giftId);

    if(isNullOrUndefined(account) || isNullOrUndefined(gift))
    {
        response.status(400).end();
        return;
    }

    account.gifts.map(accountGift => {
        if (accountGift.id === gift.id)
        {
            response.status(400).end();
            return;
        }
    });

    account.gifts.push(gift);
    await accountRepo.save(account);

    response.status(200).end();
}
