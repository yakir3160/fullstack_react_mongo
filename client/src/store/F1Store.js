import { create } from "zustand";

export const useF1Store = create((set,get) => ({
    // Initial state for drivers and teams
    drivers: {},
    teams: {},
    events: {},
    isLoading : false,
    error: null,

    // Actions to set drivers and teams directly
    setDrivers: (drivers) => {set({ drivers });},
    setTeams: (teams) => {set({ teams });},
    setEvents: (events) => {set({ events });},
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

}));



