import {Request, Response} from "express";
import {isNullOrUndefined} from "util";
import {getManager} from "typeorm";
import {Path} from "../../entities/path.entity";

export async function createPathController(request: Request, response: Response)
{
    const start = request.body.start;
    const end = request.body.end;

    if(isNullOrUndefined(start) && isNullOrUndefined(end))
    {
        response.status(400).end();
        return;
    }

    const pathRepo = getManager().getRepository(Path);

    await pathRepo.save(
        await pathRepo.create({
            start: start,
            end: end,
        })
    );

    response.status(200).end();
}