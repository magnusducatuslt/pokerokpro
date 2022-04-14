export type User = {
    readonly id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    password: string;
    isActive: boolean;

    readonly registeredAt: Date;
}
