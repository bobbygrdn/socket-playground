interface RegisterUserProps {
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
}

export const registerUser = async (props: RegisterUserProps) => {
    const { name, email, password, confirmPassword } = props;

    if (password !== confirmPassword) return;

    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, confirmPassword }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}