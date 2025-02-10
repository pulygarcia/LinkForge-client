export type User = {
    name: string;
    email: string;
    handle: string;
    id:string;
    description: string;
}

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string;
    password_confirmation: string;
}

export type LoginForm = Pick<User, 'email'> & {
    password: string;
}

export type ProfileFormData = Pick<User, 'handle' | 'description'>