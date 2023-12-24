import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";
import blogService from "@/lib/services/blog.service";
import FormEditBlog from "@/components/modules/Create/FormEditBlog";

type Props = {
    params: { slugBlog: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

const EditBlogPage = async ({ params }: Props) => {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }

    const { success, blog } = await blogService.getBlogEdit(params.slugBlog, session?.backendTokens.accessToken);
    if (!success || !blog) {
        redirect("/");
    }

    return (
        <FormEditBlog blog={blog} />
    );
};

export default EditBlogPage;
