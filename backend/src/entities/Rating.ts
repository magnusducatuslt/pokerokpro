export interface RatingBase {
    position: number;
    games: number;
}

export type PersonalRating =  {
    id: string;
    username: string;
    balance: number;
} & RatingBase