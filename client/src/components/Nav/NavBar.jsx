
import speedyImage from '@assets/speedy.png'
import NavButton from '@components/Nav/NavButton.jsx'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from '@src/store/authStore.js'

const NavBar = () => {
    const {user} = useAuthStore();
    return (
        <header className="bg-gradient-to-r from-red-700 to-red-600 text-white p-3 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
                {/* Logo and Brand */}
                <Link to="/" className="flex items-center space-x-2 group">
                    <img
                        src={speedyImage}
                        alt="Formula 1 Logo"
                        className="h-12 w-12 object-contain transform transition-transform group-hover:scale-110"
                    />
                    <span className="text-xl font-bold hidden sm:block">MyF1</span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center space-x-1 py-1">
                    <NavButton
                        text={'Standings'}
                        to={'standings'}
                    />
                    <NavButton
                        text={'Drivers'}
                        to={'drivers'}
                    />
                    <NavButton
                        text={'Teams'}
                        to={'teams'}
                    />
                    <NavButton
                        text={'Events'}
                        to={'events'}
                    />


                </nav>
                {/* User Actions */}
              
                    <NavButton
                        text={user ? user.name : ''}
                        to={'profile'}
                        icon={<FaUserCircle className="size-6" />}
                        className={`hover:bg-gray-100 transition-colors` }
                    />
             
            </div>
        </header>
    )
}
export default NavBar