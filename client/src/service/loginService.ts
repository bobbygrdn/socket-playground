interface LoginUserProps {
    email: string | undefined;
    password: string | undefined;
}

export const loginUser = async (props: LoginUserProps) => {
    const { email, password } = props;

    try {
        const response = await fetch(`${process.env.SERVER_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}