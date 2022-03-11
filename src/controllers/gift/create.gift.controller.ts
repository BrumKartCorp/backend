import {Request, Response} from "express";
import {isNullOrUndefined} from "util";
import {getManager} from "typeorm";
import {Gift} from "../../entities/gift.entity";

export async function createGiftController(request: Request, response: Response)
{
    const name = request.body.name;

    if(isNullOrUndefined(name))
    {
        response.status(400).end();
        return;
    }

    const giftRepo = getManager().getRepository(Gift);

    await giftRepo.find().then(gifts => {
        gifts.map(gift => {
            if (gift.name === name)
            {
                response.status(400).end();
                return;
            }
        });
    });

    await giftRepo.save(
        await giftRepo.create({
            name: name,
    }));

    response.status(200).end();
}
