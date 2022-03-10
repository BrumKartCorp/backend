import {Request, Response} from "express";
import {isNullOrUndefined} from "util";
import {getManager} from "typeorm";
import {Path} from "../../entities/path.entity";
import {CheckpointCoordinate} from "../../entities/checkpointcoordinate.entity";

export async function createPathController(request: Request, response: Response)
{
    const name = request.body.name;
    const start = request.body.start;
    const end = request.body.end;

    if(isNullOrUndefined(name) && isNullOrUndefined(start) && isNullOrUndefined(end))
    {
        response.status(400).end();
        return;
    }

    let startCoordinates;
    let endCoordinates;

    const geocoder = new google.maps.Geocoder();
    await geocoder.geocode( { 'address': start}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            startCoordinates = results[0].geometry.location;
        } else {
            response.status(400).end();
            return;
        }
    });

    await geocoder.geocode( { 'address': end}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            endCoordinates = results[0].geometry.location;
        } else {
            response.status(400).end();
            return;
        }
    });

    const pathRepo = getManager().getRepository(Path);
    const coordinateRepo = getManager().getRepository(CheckpointCoordinate);

    await pathRepo.save(
        await pathRepo.create({
            name: name,
            start: start,
            end: end,
        })
    );

    response.status(200).end();
}