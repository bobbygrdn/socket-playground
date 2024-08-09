const ENDPOINT = 'http://localhost:5000';

export const fetchChats = async (userId: string) => {
    try {
        const response = await fetch(`${ENDPOINT}/api/chats/${userId}`);
        const data = await response.json();

        if (!data) return;

        return data;
    } catch (error) {
        console.error('Error fetching chats: ', error);
    }
};