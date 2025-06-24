import { useState } from 'react';
import Input from '@components/Reusables/Input';
import { loginSchema } from '@src/validation/authSchemas';
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import useForm from '@hooks/useForm';
import { useAuthStore } from '@store/authStore';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const authStore = useAuthStore();

    const { formData, errors, isSubmitting, serverError, handleChange, handleSubmit } = useForm(
        { email: '', password: '' },
        loginSchema,
        { store: authStore }
    );


    const onSubmit = async (data) => {
        console.log('Login data:', data);

        return await authStore.login(data.email, data.password);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right" dir="rtl">
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
                dir="ltr"
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

            <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300 text-lg font-medium disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'מתחבר...' : 'התחבר'}
            </button>

            {serverError && (
                <div className="text-red-600 text-sm text-center mt-2">
                    {serverError}
                </div>
            )}

            <div className="mt-4 text-center">
                <a href="#" className="text-red-600 hover:underline text-sm">שכחתי סיסמה</a>
            </div>
        </form>
    );
};

export default LoginForm;
