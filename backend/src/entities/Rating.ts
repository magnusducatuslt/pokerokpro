export interface RatingBase {
    position: number;
    game: number;
}

export type PersonalRating =  {
    id: string;
    username: string;
    balance: number;
} & RatingBase