"use client";

import Image from "next/image";
import { useState } from "react";

import Modal from "@/components/common/Modal";
import { useSelector } from "react-redux";
import { EditBlogSlideProps } from "@/redux/blogEditSlide";
import { toast } from "react-toastify";
import IconCheckMark from "../../icons/IconCheckMark";

interface ListImageEditBlogProps {}
const ListImageEditBlog = ({}: ListImageEditBlogProps) => {
    const { blogEdit, isSave }: EditBlogSlideProps = useSelector(
        (state: any) => state.blogEdit
    );

    const [isShowListImageBlog, setIsShowListImageBlog] =
        useState<boolean>(false);

    const handleCopyUrlImage = (urlImage: string) => {
        const copyInput = document.createElement("input");
        copyInput.value = urlImage;
        document.body.appendChild(copyInput);
        copyInput.select();
        document.execCommand("copy");
        document.body.removeChild(copyInput);

        toast(
            () => (
                <div className="flex items-center justify-center whitespace-nowrap overflow-hidden">
                    <IconCheckMark size={18} className="mr-2" /> Sao chép thành
                    công!
                </div>
            ),
            {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                closeButton: false,
                className: "max-w-[230px] h-10 py-0",
            }
        );
    };

    return (
        <>
            <button
                onClick={() => setIsShowListImageBlog(true)}
                className="px-3 mb-4 rounded-md h-10 border text-white whitespace-nowrap bg-blue-500 hover:bg-blue-600"
            >
                Danh sách ảnh
            </button>
            <Modal
                size="large"
                isOpen={isShowListImageBlog}
                setIsOpen={setIsShowListImageBlog}
            >
                <div>
                    <div className="[&>div]:w-1/5 flex flex-wrap py-5 list-images overflow-hidden">
                        {blogEdit?.blogImages &&
                            blogEdit?.blogImages.length > 0 &&
                            blogEdit?.blogImages.map((image, index) => {
                                return (
                                    <div
                                        key={image.blogImageId}
                                        className="relative group"
                                    >
                                        <Image
                                            width={800}
                                            height={800}
                                            alt="ảnh blog"
                                            src={`${image.urlImage}`}
                                            className="group-hover:fill-black"
                                        />
                                        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center ease-linear transition-all delay-100 group-hover:bg-gray-950/50">
                                            <div className="transition-all opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                                                <div className="py-2 px-3 rounded-lg text-center bg-white cursor-pointer mb-2 min-w-[150px]">
                                                    Xóa ảnh
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        handleCopyUrlImage(
                                                            image.urlImage
                                                        )
                                                    }
                                                    className="py-2 px-3 rounded-lg bg-white cursor-pointer"
                                                >
                                                    Sao chép địa chỉ
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ListImageEditBlog;
