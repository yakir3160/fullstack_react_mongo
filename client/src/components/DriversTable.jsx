import { useF1Store } from "../store/F1Store"


const DriversTable = () => {

    const {drivers} = useF1Store();

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Drivers Standings</h2>
            <ul className="space-y-2 rounded-lg p-2">
                <div className="w-full flex flex-row bg-gray-800 text-white p-3 rounded-t-lg">
                    <div className="w-10 text-center">
                        <strong>Pos</strong>
                    </div>
                    <div className="w-full flex justify-between px-4">
                        <strong className="w-1/3">Driver</strong>
                        <strong className="w-1/3 text-center">Team</strong>
                        <strong className="w-1/3 text-right">Points</strong>
                    </div>
                </div>
                {
                    drivers.standings?.map((d, index) => (
                        <li 
                            key={d.driver.name} 
                            className={`text-black w-full rounded-md hover:bg-gray-100 transition-all
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} 
                            flex flex-row items-center my-1 overflow-hidden shadow-sm`}
                        >
                            <div className={`w-10 h-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 flex items-center justify-center`}>
                                {index + 1}
                            </div>              
                            <div className="w-full flex justify-between py-3 px-4">
                                <span className="w-1/3 font-medium flex items-center">
                                    {d.driver.name} {d.driver.surname}
                                </span>
                                <span className="w-1/3 text-center text-gray-700">{d.team.teamName}</span>
                                <strong className="w-1/3 text-lg text-right font-bold">{d.points}</strong>
                            </div>
                        </li>
                    ))
                }
                {!drivers.standings?.length && (
                    <div className="text-center py-4 text-gray-500">No driver data available</div>
                )}
            </ul>
        </div>
    )
}

export default DriversTable