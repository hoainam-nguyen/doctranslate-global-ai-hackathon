import { http } from "@src/configs/axios.config";

export const creatorService = {
    getLanguages: () => {
        let uri = '/languages'
        return http.get(uri)
    },
    createVideo: (data: any) => {
        let uri = '/presentation-video'
        console.log("Getting result...")
        return http.post(uri, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }
}