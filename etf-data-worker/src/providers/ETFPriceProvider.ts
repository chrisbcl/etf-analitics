export interface ETFPrice {
    symbol: string;
    price: number;
}

export interface ETFPriceProvider {
    getPrice(symbol: string): Promise<ETFPrice | null>;
    getAllPrices(): Promise<ETFPrice[]>;
}
