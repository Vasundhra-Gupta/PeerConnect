import { useNavigate, Link, useParams } from 'react-router-dom';
import { icons } from '../../../Assets/icons';
import { useChatContext, useSideBarContext } from '../../../Context';
import { Button } from '../../';
import { LOGO } from '../../../Constants/constants';
import { useEffect, useState } from 'react';

export default function ChatSidebar() {
    const { chats } = useChatContext();
    const { setShowSideBar } = useSideBarContext();
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { chatId } = useParams();

    useEffect(() => {
        // null -> [] or [...]
        if (Array.isArray(chats)) {
            setLoading(false);
        }
    }, [chats]);

    const chatElements = chats
        ?.filter((chat) => {
            if (!search) {
                return chat;
            } else if (
                chat.user_firstName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                chat.user_lastName.toLowerCase().includes(search.toLowerCase())
            ) {
                return chat;
            } else {
                return;
            }
        })
        .map((chat) => (
            <div
                key={chat.chat_id}
                onClick={() => navigate(`chat/${chat.chat_id}`)}
                className={`cursor-pointer flex items-center py-2 px-[10px] rounded-md hover:backdrop-brightness-90 ${chatId === chat.chat_id && 'backdrop-brightness-90'} focus:outline-none w-full text-left`}
            >
                <div className="relative border-[2px] rounded-full p-[1px]">
                    {/* Avatar */}
                    {chat.user_avatar ? (
                        <div className="size-12">
                            <img
                                src={chat.user_avatar}
                                alt="User Avatar"
                                className="size-full object-cover rounded-full"
                            />
                        </div>
                    ) : (
                        <div className="size-12 fill-gray-300 drop-shadow-md">
                            {icons.circleUser}
                        </div>
                    )}

                    {/* Online Indicator */}
                    {chat.isOnline && (
                        <span className="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                </div>

                {/* User Info */}
                <div className="ml-3 flex-1">
                    <h4 className="text-[16px] font-semibold text-[#2b2b2b] truncate leading-4 line-clamp-1">
                        {chat.user_firstName} {chat.user_lastName}
                    </h4>
                    <p className="text-[13px] text-gray-500 truncate leading-5 line-clamp-1">
                        {chat.lastMessage || 'No messages yet'}
                    </p>
                </div>
            </div>
        ));

    return (
        <div className="w-[280px] border-r-[0.01rem] border-r-[#e6e6e6] h-full px-3 bg-[#f6f6f6] flex flex-col">
            <div className="h-[60px] flex items-center justify-start gap-4">
                {/* hamburgur menu btn */}
                <Button
                    btnText={
                        <div className="size-[20px] fill-[#434343] group-hover:fill-[#4977ec]">
                            {icons.hamburgur}
                        </div>
                    }
                    onClick={() => setShowSideBar((prev) => !prev)}
                    className="bg-[#ffffff] p-[10px] group rounded-full drop-shadow-md w-fit"
                />

                {/* logo */}
                <Link
                    to={'/'}
                    className="flex items-center justify-center gap-3 text-nowrap font-medium text-lg"
                >
                    <div className="overflow-hidden rounded-full size-[40px] drop-shadow-md hover:scale-110 transition-all duration-300">
                        <img
                            src={LOGO}
                            alt="peer connect logo"
                            className="object-cover size-full hover:brightness-95"
                        />
                    </div>
                    <div className="hidden xs:block hover:scale-110 transition-all duration-300">
                        PeerConnect
                    </div>
                </Link>
            </div>

            <hr />

            {/* Search Bar */}
            <div className="relative my-3">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search or start new chat"
                    className="placeholder:text-[14px] placeholder:text-[#8e8e8e] border border-b-[0.15rem] focus:border-b-[#4977ec] w-full indent-9 pr-3 py-[5px] bg-[#fbfbfb] focus:bg-white rounded-md focus:outline-none"
                />
                <div className="size-[15px] fill-[#b0b0b0] absolute left-3 top-[50%] transform translate-y-[-50%]">
                    {icons.search}
                </div>
            </div>

            <div className="flex-1 overflow-y-scroll flex flex-col gap-[3px]">
                {loading ? (
                    <div className="text-center">loading ...</div>
                ) : chats?.length > 0 ? (
                    chatElements
                ) : (
                    <p className="text-sm text-gray-500 text-center">
                        No users found.
                    </p>
                )}
            </div>
        </div>
    );
}
