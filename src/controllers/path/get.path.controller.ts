import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Path} from "../../entities/path.entity";
import {isNullOrUndefined} from "util";

export async function getPathController(request: Request, response: Response){

    const id = request.params.id;

    const pathRepo = getManager().getRepository(Path);

    if(isNullOrUndefined(id))
    {
        const paths = await pathRepo.find();

        response.send(paths);
        response.status(200).end();
        return;
    }

    const path = await pathRepo.findOne(id);

    if (isNullOrUndefined(path))
    {
        response.status(400).end();
        return;
    }

    response.send(path);
    response.status(200).end();
}