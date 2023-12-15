import Image from "next/image";
import dynamic from "next/dynamic";

import userService, { GetUserDetailProps } from "@/lib/services/user.service";
import { Metadata, ResolvingMetadata } from "next";
import siteMetadata from "@/lib/siteMetadata";

const ListBlogUser = dynamic(
    () =>
        import("@/components/modules/User/ListBlogUser", {
            ssr: false,
        } as ImportCallOptions)
);

type Props = {
    params: { slugUser: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { success, user }: { success: boolean; user: GetUserDetailProps } =
        await userService.getUserDetail({
            username: params.slugUser,
            next: { revalidate: 3 * 60 * 60 },
        });

    return {
        title: `${user.name} - ${user.username}`,
        description: `${user.description}`,
    };
}

const UserDetailPage = async ({ params }: Props) => {
    const { success, user } = await userService.getUserDetail({
        username: params.slugUser,
        next: { revalidate: 3 * 60 * 60 },
    });

    return (
        <main>
            <div className="min-h-screen">
                <div className="bg-black w-full h-32"></div>

                {user && (
                    <div className="max-w-6xl mx-auto top-0 -translate-y-20">
                        <div className="py-5 flex flex-col items-center bg-white shadow-sm rounded-md">
                            <span className="">
                                <Image
                                    width={150}
                                    height={150}
                                    alt={`Ảnh của Bảo`}
                                    className="w-32 h-32 block object-cover rounded-full overflow-hidden"
                                    src={`/static/images/default/avatar_user_sm.jpg`}
                                />
                            </span>
                            <div className="text-center mt-4">
                                <h1 className="font-semibold text-3xl mb-3">
                                    {user.name}
                                </h1>
                                <div>
                                    {/* {user.description} */}I wish for
                                    everyone to find passion in their life. I
                                    found mine in coding
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="grid grid-cols-12">
                                <div className="md:col-span-4 col-span-full mb-4">
                                    <div className="px-4 py-4 bg-white shadow-sm rounded-md">
                                        <div>
                                            <span>
                                                {user._count.blogs} bài viết
                                            </span>
                                        </div>
                                        <div>
                                            <span>0 bình luận</span>
                                        </div>
                                        <div>
                                            <span>
                                                {user._count.userSaves} chủ đề
                                                theo dõi
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-8 col-span-full mb-4">
                                    <ListBlogUser slug={user.username} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default UserDetailPage;
