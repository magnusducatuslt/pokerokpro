export enum OperationsReasonsE {
"Player do buy-out" = "Player do buy-out"
}

export type Operation = {
    fee: {
        amount: number,
        asset_id: string
    },
    player: string,
    table: string,
    table_owner: string,
    amount: {
        amount: number,
        asset_id: string
    },
    reason: OperationsReasonsE
}

export type AccountHistory = {
    id: string,
    op: [
        number,
        Operation
    ],
    result: [
        number,
        string
    ],
    block_num: number,
    trx_in_block: number,
    op_in_trx: number,
    virtual_op: number
}