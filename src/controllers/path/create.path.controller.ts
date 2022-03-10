import {Request, Response} from "express";
import {isNullOrUndefined} from "util";
import {getManager} from "typeorm";
import {Path} from "../../entities/path.entity";
import {StartCoordinate} from "../../entities/startcoodinate.entity";
import {EndCoordinate} from "../../entities/endcoodinate.entity";
import {Checkpoint} from "../../entities/checkpoint";
const NodeGeocoder = require('node-geocoder');

const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: 'AIzaSyDKjhRwkC0zTWqN7ILl2w3y_ULU2AaM8JI',
    formatter: null,
});

export async function createPathController(request: Request, response: Response)
{
    const name = request.body.name;
    const start = request.body.start;
    const end = request.body.end;
    const checkpoints = request.body.checkpoints;

    if(isNullOrUndefined(name) || isNullOrUndefined(start) || isNullOrUndefined(end))
    {
        response.status(400).end();
        return;
    }

    const geoStart = await geocoder.geocode({
        address: start,
        country: 'France',
    });

    const geoEnd = await geocoder.geocode({
        address: end,
        country: 'France',
    });

    const pathRepo = getManager().getRepository(Path);
    const startCoordinateRepo = getManager().getRepository(StartCoordinate);
    const endCoordinateRepo = getManager().getRepository(EndCoordinate);

    const startCoordinateSaved = await startCoordinateRepo.save(
        await startCoordinateRepo.create({
            latitude: geoStart[0].latitude,
            longitude: geoStart[0].longitude,
        })
    );

    const endCoordinateSaved = await endCoordinateRepo.save(
        await endCoordinateRepo.create({
            latitude: geoEnd[0].latitude,
            longitude: geoEnd[0].longitude,
        })
    );

    await pathRepo.save(
        await pathRepo.create({
            name: name,
            start: startCoordinateSaved,
            end: endCoordinateSaved,
            checkpoints: await getCheckpoints(checkpoints),
        })
    );

    response.status(200).end();
}

async function getCheckpoints(checkpoints: string[]): Promise<Checkpoint[]>
{
    const checkpointRepo = getManager().getRepository(Checkpoint);

    let checkpointsSaved: Checkpoint[] = [];
    for (const checkpoint of checkpoints) {
        const geoCheckpoint = await geocoder.geocode({
            address: checkpoint,
            country: 'France',
        });
        const newCheckpoint = await checkpointRepo.create({
            name: checkpoint,
            latitude: geoCheckpoint[0].latitude,
            longitude: geoCheckpoint[0].longitude,
        });
        await checkpointRepo.save(newCheckpoint);
        checkpointsSaved.push(newCheckpoint);
    }

    return checkpointsSaved;
}