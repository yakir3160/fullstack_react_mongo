


import { Card } from "./Reusables/Card";


export const DriverCard = ({ driver }) => {
    return (
        <Card className=" text-lg">
            <div className="flex justify-between text-4xl">
                <p>{driver.shortName}</p>
                <p className="">{driver.number}</p>
            </div>

            <h2>{driver.name} {driver.surname}</h2>
            <p>{driver.teamId}</p>
            <p>{driver.nationality}</p>
            <a href={driver.url} className="text-gray-500">
                Visit Wikipedia Profile
            </a>

        </Card>
    );
}
