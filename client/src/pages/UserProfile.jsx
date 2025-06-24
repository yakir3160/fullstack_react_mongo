
import { useAuthStore } from '@store/authStore';
import { useState } from 'react';
import Input from '@components/Reusables/Input';
import useForm from '@hooks/useForm';
import { updateProfileSchema } from '@src/validation/authSchemas';
import { MdOutlineEmail, MdPerson, MdLocationCity } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaCalendarAlt } from "react-icons/fa";




const UserProfile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { user, logout, updateUser } = useAuthStore();
    const authStore = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);

    const { formData, errors, isSubmitting, serverError, handleChange, handleSubmit } = useForm(
        {
            name: user?.name || '',
            email: user?.email || '',
            city: user?.city || '',
            age: user?.age || '',
        },
        updateProfileSchema,
        { store: authStore }
    );

    const onSubmit = async (data) => {
        return updateUser(data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right bg-white p-8 rounded-xl shadow-lg max-w-md w-full" dir="rtl">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">פרופיל משתמש</h1>
                    <p className="text-lg text-gray-600">פרטי המשתמש שלך</p>
                </div>

                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="אימייל"
                    placeholder="הזן אימייל"
                    error={errors.email}
                    icon={<MdOutlineEmail />}
                    disabled={!isEditing}
                    className={!isEditing ? 'opacity-50' : ''}
                    dir="ltr"
                />

                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    label="שם מלא"
                    placeholder="הזן שם מלא"
                    error={errors.name}
                    icon={<MdPerson />}
                    disabled={!isEditing}
                    className={!isEditing ? 'opacity-50' : ''}
                />

                <Input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    label="עיר"
                    placeholder="הזן עיר"
                    error={errors.city}
                    icon={<MdLocationCity />}
                    disabled={!isEditing}
                    className={!isEditing ? 'opacity-50' : ''}
                />

                <Input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    label="גיל"
                    placeholder="הזן גיל"
                    error={errors.age}
                    icon={<FaCalendarAlt />}
                    min="16"
                    max="120"
                    disabled={!isEditing}
                    className={!isEditing ? 'opacity-50' : ''}
                />

                <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    label="סיסמה"
                    placeholder="הזן סיסמה"
                    error={errors.password}
                    icon={<TbLockPassword />}
                    hasToggleButton={true}
                    isToggled={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                    dir="ltr"
                />

                <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    label="אשר סיסמה"
                    placeholder="הזן סיסמה שוב"
                    error={errors.confirmPassword}
                    icon={<TbLockPassword />}
                    hasToggleButton={true}
                    isToggled={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                    dir="ltr"
                />


                <div className="mt-6 flex flex-col items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
                    >
                        {isEditing ? 'ביטול' : 'ערוך פרופיל'}
                    </button>

                    {isEditing && (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300 font-medium disabled:opacity-50"
                        >
                            {isSubmitting ? 'שומר...' : 'שמור שינויים'}
                        </button>
                    )}
                </div>

                {serverError && (
                    <div className="text-red-600 text-sm text-center mt-4">
                        {serverError}
                    </div>
                )}
            </form>

            <button
                onClick={logout}
                className="mt-6 bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300 font-medium"
            >
                התנתק
            </button>
        </div>
    );
}

export default UserProfile;