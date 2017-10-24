export interface CartItem {
    product: string;
    unitPrice: number;
}

type Offer = (items: CartItem[], total?: number) => number;

export class ShoppingCart {
    private offers?: Offer[];
    private items = [] as CartItem[];

    constructor(offers?: Offer[]) {
        this.offers = offers;
    }

    add(product: string, unitPrice: number) {
        this.items.push({ product, unitPrice });
    }

    isEmpty() {
        return this.items.length === 0;
    }

    getTotal() {
        const total = this.items.map(item => item.unitPrice).reduce((acc, val) => acc + val, 0);
        if (!this.offers)
            return total;
        return this.offers.reduce((acc, offer) => acc + offer(this.items, acc), total);
    }

    getQuantity(product: string) {
        return this.items.filter(item => item.product === product).length;
    }

    getItems() {
        return this.items.length;
    }
}

export const buyXGetYFree = (product: string, x: number, y: number) => {
    return function (items: CartItem[]) {
        const instances = items.filter(prod => prod.product === product);
        const pieces = instances.length;
        if (!pieces || pieces < x) {
            return 0;
        }

        return -Math.floor(pieces / (x + y)) * y * instances[0].unitPrice;
    };
};

export const buyXGetYDiscountOnNext = (product: string, x: number, y: number) => {
    return function (items: CartItem[]) {
        const instances = items.filter(prod => prod.product === product);
        const pieces = instances.length;
        if (!pieces || pieces < x) {
            return 0;
        }

        return -Math.floor(pieces / (x + 1)) * y * instances[0].unitPrice / 100;
    };
};

export const getXPercentOffIfTotalOverY = (x: number, y: number) => {
    return function (items: CartItem[], total: number) {
        if (!items.length || total < x) {
            return 0;
        }

        return -total * y / 100;
    };
};
