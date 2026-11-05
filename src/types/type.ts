export type PriceDir = "up" | "down" | "flat";

export type SortMode = "default" | "asc" | "desc";

export interface ICategory {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

export interface IMarketPrice {
    market: string;
    division: string;
    min: number;
    max: number;
}

export interface IProduct {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: PriceDir;
        pct: number;
    };
    markets: IMarketPrice[];
}