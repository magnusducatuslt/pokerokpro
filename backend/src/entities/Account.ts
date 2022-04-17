export type Account = {
    id: string,
    platform: string;
    status: string;
    isActive: string;
    userId: string;
    accountId:string; // id on platform example in blockchain '1.2.10674'
    accountName: string;
    game: number,
    balance: number,
    position:number,

    pubKey: string
}