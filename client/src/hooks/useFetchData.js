import { useF1Store } from "../store/F1Store";
import { useEffect } from "react";


export const useFetchData = () => {
    const { setDrivers, setTeams,setEvents, setIsLoading, setError } = useF1Store();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [driversStandingsResponse, teamsStandingsResponse, driversResponse, teamsResponse,eventsResponse] = await Promise.all([
                    fetch("https://f1api.dev/api/current/drivers-championship"),
                    fetch("https://f1api.dev/api/current/constructors-championship"),
                    fetch("https://f1api.dev/api/current/drivers"),
                    fetch("https://f1api.dev/api/current/teams"),
                    fetch("https://f1api.dev/api/2025")
                ]);
                const driversStandings = await driversStandingsResponse.json();
                const teamsStandings = await teamsStandingsResponse.json();
                const driversData = await driversResponse.json();
                const teamsData = await teamsResponse.json();
                const eventsData = await eventsResponse.json();
                
                console.log("Drivers Standings:", driversStandings);
                console.log("Teams Standings:", teamsStandings);
                console.log("Drivers Data:", driversData);
                console.log("Teams Data:", teamsData);
                console.log("Events Data:", eventsData);

                setDrivers({
                    standings: driversStandings.drivers_championship || [],
                    drivers: driversData.drivers || []
                });
                setTeams({
                    standings: teamsStandings.constructors_championship || [],
                    teams: teamsData.teams || []
                });
                setEvents(eventsData || {});
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
};