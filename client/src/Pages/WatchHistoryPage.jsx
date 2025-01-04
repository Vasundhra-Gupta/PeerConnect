import { icons } from '../Assets/icons';
import { Button, PostListView } from '../Components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../Services';
import { paginate, formatDateRelative } from '../Utils';
import { LIMIT } from '../Constants/constants';
import { useUserContext } from '../Context';

export default function WatchHistoryPage() {
    const [posts, setPosts] = useState([]);
    const [postsInfo, setPostsInfo] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const { user } = useUserContext();
    const navigate = useNavigate();

    // pagination
    const paginateRef = paginate(postsInfo.hasNextPage, loading, setPage);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async function getPosts() {
            try {
                setLoading(true);
                const res = await userService.getWatchHistory(
                    signal,
                    LIMIT,
                    page
                );
                if (res && !res.message) {
                    setPosts((prev) => [...prev, ...res.posts]);
                    setPostsInfo(res.postsInfo);
                }
            } catch (err) {
                navigate('/server-error');
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            controller.abort();
        };
    }, [page, user]);

    async function clearHistory() {
        try {
            const res = await userService.clearWatchHistory();
            if (res && res.message === 'WATCH_HISTORY_CLEARED_SUCCESSFULLY') {
                setPosts([]);
                setPostsInfo({});
            }
        } catch (err) {
            navigate('/server-error');
        }
    }

    const postElements = posts?.map((post, index) => (
        <PostListView
            key={post.post_id}
            post={post}
            reference={index + 1 === posts.length ? paginateRef : null}
        >
            {/* children */}
            <div className="sm:right-44 sm:bottom-8 sm:left-auto hover:cursor-text text-[15px] text-[#5a5a5a] absolute bottom-3 left-6">
                watched {formatDateRelative(post.watchedAt)}
            </div>
        </PostListView>
    ));

    return !user ? (
        <div>Login to see history</div>
    ) : (
        <div className="w-full h-full overflow-scroll">
            {loading ? (
                page === 1 ? (
                    <div className="w-full text-center">
                        loading first batch...
                    </div>
                ) : (
                    <div className="flex items-center justify-center my-2 w-full">
                        <div className="size-7 fill-[#4977ec]">
                            {icons.loading}
                        </div>
                        <span className="text-xl ml-3">Please wait . . .</span>
                    </div>
                )
            ) : postElements.length > 0 ? (
                <div>
                    <div className="w-full flex items-center justify-center mb-8">
                        <Button
                            btnText={
                                <div className="flex text-black font-medium items-center justify-center gap-2">
                                    <div className="size-[20px] group-hover:fill-red-700">
                                        {icons.delete}
                                    </div>
                                    <div>Clear Watch History</div>
                                </div>
                            }
                            className="group rounded-md p-2 px-3 bg-[#dfdede] hover:bg-[#cccbcb] drop-shadow-md"
                            onClick={clearHistory}
                        />
                    </div>
                    <div className="">{postElements}</div>
                </div>
            ) : (
                <div>No read posts !!</div>
            )}
        </div>
    );
}
