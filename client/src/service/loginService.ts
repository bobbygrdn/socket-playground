interface LoginUserProps {
    email: string | undefined;
    password: string | undefined;
}

export const loginUser = async (props: LoginUserProps) => {
    const { email, password } = props;

    try {
        const response = await fetch('http://localhost:5000/login', {
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