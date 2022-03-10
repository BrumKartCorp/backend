import {Request, Response} from "express";
import {isNullOrUndefined} from "util";
import {getManager} from "typeorm";
import {Path} from "../../entities/path.entity";
import {StartCoordinate} from "../../entities/startcoodinate.entity";
import {EndCoordinate} from "../../entities/endcoodinate.entity";
import LatLng = google.maps.LatLng;

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

    const geocoder = new google.maps.Geocoder();

    let startCoordinates: LatLng;
    await geocoder.geocode( { 'address': start }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            startCoordinates = results[0].geometry.location;
        } else {
            console.log("API Google niké pour l'adresse " + start);
            response.status(400).end();
            return;
        }
    });

    let endCoordinates: LatLng;
    await geocoder.geocode( { 'address': end }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            endCoordinates = results[0].geometry.location;
        } else {
            console.log("API Google niké pour l'adresse " + end);
            response.status(400).end();
            return;
        }
    });

    const pathRepo = getManager().getRepository(Path);
    const startCoordinateRepo = getManager().getRepository(StartCoordinate);
    const endCoordinateRepo = getManager().getRepository(EndCoordinate);

    const startCoordinateSaved = await startCoordinateRepo.save(
        await startCoordinateRepo.create({
            latitude: startCoordinates.lat.toString(),
            longitude: startCoordinates.lng.toString(),
        })
    );

    const endCoordinateSaved = await endCoordinateRepo.save(
        await endCoordinateRepo.create({
            latitude: endCoordinates.lat.toString(),
            longitude: endCoordinates.lng.toString(),
        })
    );

    await pathRepo.save(
        await pathRepo.create({
            name: name,
            start: startCoordinateSaved,
            end: endCoordinateSaved,
        })
    );

    response.status(200).end();
}

