import {Request, Response} from "express";
import {isNullOrUndefined} from "util";
import {getManager} from "typeorm";
import {Path} from "../../entities/path.entity";
import {Checkpoint} from "../../entities/checkpoint.entity";
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: "AIzaSyDKjhRwkC0zTWqN7ILl2w3y_ULU2AaM8JI",
    formatter: null,
});

export async function createPathController(request: Request, response: Response)
{
    const name = request.body.name;
    const checkpoints = request.body.checkpoints;

    if(isNullOrUndefined(name) || checkpoints.length < 2)
    {
        response.status(400).end();
        return;
    }

    const pathRepo = getManager().getRepository(Path);

    await pathRepo.save(
        await pathRepo.create({
            name: name,
            checkpoints: await getCheckpoints(checkpoints),
        })
    );

    response.status(200).end();
}

async function getCheckpoints(checkpoints: string[]): Promise<Checkpoint[]>
{
    const checkpointRepo = getManager().getRepository(Checkpoint);

    let checkpointsSaved: Checkpoint[] = [];
    for (let i = 0; i < checkpoints.length; i += 1)
    {
        const geoCheckpoint = await geocoder.geocode({
            address: checkpoints[i],
            country: 'France',
        });
        const newCheckpoint = await checkpointRepo.create({
            name: checkpoints[i],
            position: i,
            latitude: geoCheckpoint[0].latitude,
            longitude: geoCheckpoint[0].longitude,
        });
        await checkpointRepo.save(newCheckpoint);
        checkpointsSaved.push(newCheckpoint);
    }

    return checkpointsSaved;
}