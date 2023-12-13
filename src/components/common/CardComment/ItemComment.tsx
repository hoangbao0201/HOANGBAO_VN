import Link from "next/link";
import AvatarRank from "../AvatarRank";
import Image from "next/image";

const ItemComment = () => {
    return (
        <div className="flex mb-5">
            <Link href={`/`}>
                <AvatarRank rank={1}>
                    <Image
                        width={60}
                        height={60}
                        alt="ảnh người dùng"
                        src={"/static/images/default/avatar_user_sm.jpg"}
                        className="md:w-10 md:h-10 w-9 h-9 block object-cover rounded-full flex-shrink-0"
                    />
                </AvatarRank>
            </Link>
            <div className="w-full flex-1 ml-2">
                <div
                    className="border rounded-md pt-2 pb-3 px-3 mb-2 bg-gray-100 min-h-[50px]"
                >
                    <div>
                        <Link href={`/user/admin`}>
                            <span className="font-semibold">
                                Nguyễn Hoàng Bảo
                            </span>
                        </Link>
                    </div>
                    <div>
                        Em rất thích nhưng dạng sách hiểu bản chất như này ạ. Em
                        cảm ơn anh nhiều. Hy vọng bên cạnh sách giúp học AI,
                        ML,... dùng những framework hay library đang hiện hành
                        rất nhiều, mong anh chia sẻ thêm những cuốn sách đi từ
                        bản chất như này lên ạ.
                    </div>
                </div>
                <div className="mb-3 px-2 flex">
                    <span className="text-sm font-medium hover:underline cursor-pointer">
                        Phản hồi
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ItemComment;
