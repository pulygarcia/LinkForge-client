export type User = {
    name: string;
    email: string;
    handle: string;
    image:string;
    id:string;
    description?: string;
    links:string
}

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string;
    password_confirmation: string;
}

export type LoginForm = Pick<User, 'email'> & {
    password: string;
}

export type ProfileFormData = Pick<User, 'handle' | 'description'>

export type SocialNetwork = {
    id: number;
    name: string;
    url: string;
    enabled:boolean;
}
export type LinkForgeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'> 