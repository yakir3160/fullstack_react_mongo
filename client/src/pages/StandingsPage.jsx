import { useEffect, useState } from 'react';

import NavTab from '@components/Nav/NavTab';
import TeamsTable from '@components/TeamsTable';
import DriversTable from "@components/DriversTable"

import Loader from '@components/Reusables/Loader';
import Error from '@components/Reusables/Error';

import { useF1Store } from '@store/F1Store';

const StandingsPage = () => {
    const [activeTab, setActiveTab] = useState('drivers');



    const { isLoading, error } = useF1Store();

    return (
        <div className="p-6 text-black max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Championship Standings</h1>
                <p className="text-2xl font-italic">Current F1 2025 season standings</p>
            </div>
            
            {/* Navigation Tabs */}
            <NavTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            
            {/* Content based on active tab */}
            {isLoading ? (
                <Loader text="Loading standings data..." />
            ) : error ? (
                <Error title={"Error fetching standings data"} text={error} className="mt-6" />
            ) : (
                <div className="bg-white p-6 rounded-xl shadow min-h-64 border border-gray-100">
                    {activeTab === 'drivers' && <DriversTable />}
                    {activeTab === 'teams' && <TeamsTable />}
                </div>
            )}


        </div>
    );
}

export default StandingsPage


