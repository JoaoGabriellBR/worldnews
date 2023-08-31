import { useNewsCategory } from "@/context";
import axios from "axios";

export const buildApiUrl = (category: string | null, page: number) => {
    const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    const apiKey = "WCwDGgHrj9SFZsmhgzB2d4nvozkkZwOG";
    const categoryQuery = category ? `&fq=section_name:${category}` : "";
    return `${baseUrl}${categoryQuery}&api-key=${apiKey}&page=${page}`;
};

export const handleApiRequest = async (apiUrl: string) => {
    try {
        const res = await axios.get(apiUrl);
        return res?.data?.response?.docs?.reverse();
    } catch (err) {
        console.log(err);
        return [];
    };
};

export const useFetchNews = (category: string, page: number) => {
    const { setLoading, updateNewsData }: any = useNewsCategory();

    const fetchItem = async () => {
        setLoading(true);
        const apiUrl = buildApiUrl(category, page);
        const newData = await handleApiRequest(apiUrl);
        updateNewsData(newData);
        setLoading(false);
    }
    return fetchItem;
};