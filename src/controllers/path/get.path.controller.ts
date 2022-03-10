import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Path} from "../../entities/path.entity";
import {isNullOrUndefined} from "util";

export async function getPathController(request: Request, respone: Response){

    const id = request.params.id;

    const pathRepo = getManager().getRepository(Path);

    if(isNullOrUndefined(id))
    {
        const paths = await pathRepo.find();

        respone.send(paths);
        respone.status(200).end();
        return;
    }

    const path = await pathRepo.findOne(id);

    if (isNullOrUndefined(path))
    {
        respone.status(400).end();
        return;
    }

    respone.send(path);
    respone.status(200).end();
}