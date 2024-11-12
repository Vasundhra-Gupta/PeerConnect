import { Login } from '../Components';
import { LOGO } from '../Constants/constants';
import { motion } from 'framer-motion';

export default function LoginPage() {
    return (
        <div className="text-black flex flex-col items-center justify-center gap-5 fixed z-[1] bg-white inset-0">
            <div className="w-full flex items-center justify-center">
                <div className="overflow-hidden rounded-full size-[90px] drop-shadow-xl">
                    <img
                        src={LOGO}
                        alt="peer connect logo"
                        className="object-cover size-full"
                    />
                </div>
            </div>
            <div className="w-fit">
                <p className="text-center px-3 text-[28px] font-medium">
                    Login to Your Account
                </p>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                    className="h-[0.05rem] relative -top-1 bg-[#333333]"
                />
            </div>
            <div className="w-full flex items-center justify-center mt-3">
                <Login />
            </div>
        </div>
    );
}
