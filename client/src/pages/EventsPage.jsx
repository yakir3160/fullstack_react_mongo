import { useF1Store } from "../store/F1Store"
import { EventCard } from "../components/EventCard";


const EventsPage = () =>{
    const {events} = useF1Store();
    return(
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-red-700 mb-4">F1 Races {events.championship?.year}</h1>
            {
                events.races?.map(event => 
                    (
                      <EventCard key={event.round} event={event} />
                    )
                )
            }
        </div>
    )
}
export default EventsPage