import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Path} from "../../entities/path.entity";
import {isNullOrUndefined} from "util";
import {Gift} from "../../entities/gift.entity";

export async function getGiftController(request: Request, response: Response){

    const id = request.params.id;

    const giftRepo = getManager().getRepository(Gift);

    if(isNullOrUndefined(id))
    {
        const gifts = await giftRepo.find();

        response.send(gifts);
        response.status(200).end();
        return;
    }

    const gift = await giftRepo.findOne(id);

    if (isNullOrUndefined(gift))
    {
        response.status(400).end();
        return;
    }

    response.send(gift);
    response.status(200).end();
}