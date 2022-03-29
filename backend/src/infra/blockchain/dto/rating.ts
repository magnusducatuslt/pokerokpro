export type RatingProperties = {
	p: number,
	n: string,
	v: number
}

export enum RatingRangesE {
	day = "day",
	week = "week",
	month = "month",
	total = "total"
}

export type RatingMetaInfo = {
	result: number,
	date: Date,
	request_id: string,
	left: number
}


export type RatingFromTotalPoker = Record<keyof typeof RatingRangesE, RatingProperties[]> & RatingMetaInfo
