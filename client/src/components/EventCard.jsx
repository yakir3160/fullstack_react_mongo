import { Card } from "./Reusables/Card";






export const EventCard = ({ event }) => {
    const now = new Date();
    const raceDate = new Date(event.schedule.race.date)
    return (
        <Card className="text-lg" key={event.round}>
            <div className={`${raceDate < now ? `opacity-55` : ''}`} >
                <div className="flex justify-between text-2xl mb-2">
                    <p>Round {event.round}</p>
                    {raceDate < now ? <p className="text-red-500">Psat</p> : <p className="text-green-500">Upcoming</p>}
                </div>
                <h2 className="text-xl font-bold">{event.raceName}</h2>
                <p className="text-gray-600">{event.schedule.race.date} {event.schedule.race.time}</p>
                {
                    raceDate < now &&
                    (
                        <>
                            <p>Winner: {event.winner?.name} {event.winner?.surname}</p>
                            <p>Team: {event.teamWinner?.teamName}</p>
                        </>
                    )
                }

                <p className="text-gray-600">{event.circuit.city},{event.circuit.country}</p>
                <a className="text-gray-600" href={event.url}></a>
            </div>
        </Card>
    );
}