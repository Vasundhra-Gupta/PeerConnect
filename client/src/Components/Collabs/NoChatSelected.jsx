import { useEffect } from 'react';
import { icons } from '../../Assets/icons';
import { useChatContext } from '../../Context';

export default function NoChatSelected() {
    const { setSelectedChat } = useChatContext();

    useEffect(() => {
        setSelectedChat(null);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full bg-[#f6f6f6] text-center">
            {/* Icon */}
            <div className="size-24 fill-none stroke-gray-400">
                {icons.noChatSelected}
            </div>

            {/* Text */}
            <h2 className="mt-2 text-xl font-semibold text-gray-700">
                No Chat Selected
            </h2>
            <p className="mt-1 text-gray-500 max-w-[400px] px-4">
                Keep the Conversation going, or Start a new one by adding a
                collab.
            </p>
        </div>
    );
}
