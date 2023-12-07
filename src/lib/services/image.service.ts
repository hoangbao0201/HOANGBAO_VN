import { textToSlug } from "@/utils/testToSlug";
import { API_BASE_URL } from "../constants";
import axios from "axios";


class ImageService {
    async createImageBlog({
        dataImage,
        token,
    }: {
        dataImage: FormData;
        token: string;
    }): Promise<any> {
        try {

            // const imageRes = await fetch(`${API_BASE_URL}/api/images/cloudinary/upload/blog`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${token}`,
            //     },
            //     body: formData,
            // });

            const imageRes = await axios.post(`${API_BASE_URL}/api/images/cloudinary/upload/blog`, dataImage, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            const image = await imageRes.data;
            return image;
        } catch (error) {
            return {
                success: false,
                message: "error image successful",
                error: error,
            };
        }
    }

}

const imageService = new ImageService();

export default imageService;