
export const saveImageToCloudinary = async (image: any) => {

    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', 'jobhouse')

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_NAME
            }/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await response.json();
        return data
    } catch (err) {
        console.log(err);
        return err

    }

};