export type AccountStatistic = {
    id: string,
    accountId: string;
    balanceBuyin: number,
    balanceBuyout:number,
    isWon: boolean,
    readonly date: Date,
}