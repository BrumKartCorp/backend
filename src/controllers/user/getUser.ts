import {Request, Response} from "express";
import {getManager} from "typeorm";
import {isNullOrUndefined} from "util";
import {User} from "../../entities/userEntity";

export async function getUser(request: Request, response: Response)
{
    const id = request.params.id;

    const userRepository = getManager().getRepository(User);

    if (isNullOrUndefined(id))
    {
        const users = await userRepository.find();

        response.send(users);
        response.status(200).end();
        return;
    }

    const user = await userRepository.findOne(id);
    response.send(user);
    response.status(200).end();
}
