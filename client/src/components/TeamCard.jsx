import { Card } from "./Reusables/Card";

export const TeamCard = ({ Team }) => {
    return (
        <Card className=" text-md " key={Team.teamId}>
            <img src={'https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg'} alt={`${Team.teamName} logo`} className="size-24 mb-4" />
            <div className="flex justify-between text-3xl">
                <p>{Team.teamName}</p>
                <p>{Team.teamNationality}</p>
            </div>
            <p className="text-nowrap"> Constructors Championships : {Team.constructorsChampionships}</p>
            <p> Drivers Championships:  {Team.driversChampionships}</p>
            <a href={Team.url} className="text-gray-500">
                Visit Wikipedia Profile
            </a>
        </Card>
    
    );
}
