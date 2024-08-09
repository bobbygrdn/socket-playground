const ENDPOINT = 'http://localhost:5000';

type channelProps = {
    chatName: string,
    isChannel: string,
    users: string[],
    chatAdmin: string[]
}

// TODO: Finish this logic according to the documentation and the channel form
export const createChannel = async (props: channelProps) => {
    try {
        console.log(props);
        // const response = await fetch(`${ENDPOINT}/api/chats/channel`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(props),
        // });
        // const data = await response.json();

        // if (!data) return;

        // return data;
    } catch (error) {
        console.error('Error creating channel: ', error);
    }
};

// TODO: Finish this logic according to the documentation and the direct message form
export const createDirectMessage = async (userId: string) => {
    try {
        const response = await fetch(`${ENDPOINT}/api/chats/direct-messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        const data = await response.json();

        if (!data) return;

        return data;
    } catch (error) {
        console.error('Error creating direct message: ', error);
    }
};