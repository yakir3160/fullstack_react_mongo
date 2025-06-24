import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi,userApi } from '@services/api.js';
export const useAuthStore = create(persist(
    (set, get) => ({
        // state
        user: null,
        token: null,
        isLoading: false,
        succeses: false,
        error: null,

        // setters
        setIsLoading: (isLoading) => set({ isLoading }),
        setSuccess: (success) => set({ succeses: success }),
        setError: (error) => set({ error }),

        // authentication methods
        login: async (email, password) => {
            set({ isLoading: true, error: null })
            try {


                const response = await authApi.login(email, password) 
              
                        
                const { user, token } = response.data
                console.log('Login response:', response);
                set({
                    user,
                    token,
                    isLoading: false,
                    succeses: true,
                    error: null
                })

                return { succeses: true }

            } catch (error) {
                let errorMessage = 'Login failed';
                if(error.status === 401) {
                   errorMessage = 'invalid email or password';
                } else {
                   errorMessage = error?.message || 'Login failed';
                }
                set({ isLoading: false, error: errorMessage });
                return { success: false, error: errorMessage };
            }
        },
        register: async (userData) => {
            set({ isLoading: true, error: null });
            try {
                const response = await authApi.register(userData);

                const { user, token } = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);

                set({
                    user,
                    token,
                    isLoading: false,
                    succeses: true,
                    error: null
                });

                return { success: true };

            } catch (error) {
                const errorMessage = error.response?.message || 'Registration failed';
                set({ isLoading: false, error: errorMessage });
                return { success: false, error: errorMessage };
            }

        },
        logout: () => {
            set({
                user: null,
                token: null,
                isLoading: false,
                succeses: false,
                error: null,
            })
        },
        updateUser: async (userData) => {
            set({ isLoading: true, error: null });
            try {
                const { user } = get(); // Get current user from state
                console.log(`Updating user with data:${user._id}`, userData);

                const response = await userApi.updateUser(user._id, userData);
                console.log('Update response:', response);
                
                const updatedUser = response.data.user;
                
                set({
                    user: updatedUser,
                    isLoading: false,
                    succeses: true,
                    error: null
                });

                return { success: true };

            } catch (error) {
                const errorMessage = error.response?.message || 'Update failed';
                set({ isLoading: false, error: errorMessage });
                return { success: false, error: errorMessage };
            }
        },

        clearError: () => {
            set({ error: null })
        },
        isAuthenticated: () => {
            const { user, token } = get()
            return user && token
        }

    }),
    {
        name: 'auth-storage', // unique name for the storage
        getStorage: () => localStorage, // use localStorage as the storage
        partialize: (state) => ({ user: state.user, token: state.token }),

    }
));