import { useState } from 'react';
import LoginForm from '@components/Auth/LoginForm';
import RegisterForm from '@components/Auth/RegisterForm';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('login');
    
    return (
        <div className="flex flex-col items-center max-w-3xl mx-auto" dir="rtl">
            <div className="bg-gradient-to-r from-red-700 to-red-500 text-white p-6 rounded-lg shadow-lg mb-8 w-full text-right">
                <h1 className="text-3xl font-bold mb-2">ברוכים הבאים ל-MyF1</h1>
                <p className="text-lg">הצטרפו לקהילת חובבי הפורמולה 1 הגדולה בישראל</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                {/* Tabs */}
                <div className="flex flex-row-reverse mb-6 border-b relative" dir="rtl">
                    <button 
                        className={`flex-1 py-3 font-medium text-lg transition-all duration-300 ease-in-out ${activeTab === 'login' ? 'text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
                        onClick={() => setActiveTab('login')}
                    >
                        <span className="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                            </svg>
                            התחברות
                        </span>
                    </button>
                    <button 
                        className={`flex-1 py-3 font-medium text-lg transition-all duration-300 ease-in-out ${activeTab === 'register' ? 'text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
                        onClick={() => setActiveTab('register')}
                    >
                        <span className="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            הרשמה
                        </span>
                    </button>
                    {/* Animated tab indicator */}
                    <div 
                        className="absolute bottom-0 right-0 h-0.5 bg-red-600 transition-all duration-300 ease-in-out" 
                        style={{ 
                            width: '50%', 
                            transform: `translateX(${activeTab === 'login' ? '-100%' : '0%'})` 
                        }}
                    ></div>
                </div>
                
                {/* Form */}
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
            </div>
            
            <div className="mt-8 text-gray-600 max-w-xl text-right">
                <h2 className="text-xl font-bold mb-2">הצטרפו לקהילת MyF1</h2>
                <p className="mb-4">קבלו עדכונים שוטפים על מרוצים, נהגים ונתונים סטטיסטיים מעולם הפורמולה 1</p>
            </div>
        </div>
    );
}

export default HomePage;