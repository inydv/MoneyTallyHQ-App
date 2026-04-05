import { ResponseType, UserDataType } from "@/constants/types";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType,
): Promise<ResponseType> => {
  try {
    if (updatedData.image && updatedData.image?.uri) {
      const imageUploadRes = await uploadFileToCloudinary(
        updatedData.image,
        "users",
      );

      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload image",
        };
      }

      updatedData.image = imageUploadRes.data;
    }

    return { success: true, msg: "updated successfully" };
  } catch (error: any) {
    console.log("error updating user: ", error);
    return { success: false, msg: error?.message };
  }
};
