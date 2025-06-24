
import { DriverCard } from "../components/DriverCard"
import { useF1Store } from "../store/F1Store"

const DriversPage = () => {
    const { drivers } = useF1Store();
    return (
        <div className=" gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {
                drivers.drivers?.map(driver => (
                    <>
                        <DriverCard key={driver.driverId} driver={driver} />

                    </>
                ))
            }
        </div>
    )
}
export default DriversPage