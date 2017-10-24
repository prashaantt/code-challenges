import tape = require('tape');
import { ShoppingCart, buyXGetYFree, CartItem, buyXGetYDiscountOnNext, getXPercentOffIfTotalOverY } from './supermarket';

tape('supermarket', tape => {
    tape.test('supermarket initialises correctly', t => {
        const cart = new ShoppingCart();
        t.true(cart.isEmpty());
        t.end();
    });

    tape.test('adds an item', t => {
        const product = 'Dove soap';
        const cart = new ShoppingCart();
        cart.add(product, 30);
        t.equal(cart.getQuantity(product), 1);
        t.false(cart.isEmpty());
        t.end();
    });

    tape.test('computes total', t => {
        const cart = new ShoppingCart();
        const product = 'Dove soap';
        cart.add(product, 30);
        cart.add(product, 30);
        cart.add(product, 30);
        cart.add(product, 30);
        cart.add(product, 30);
        t.equal(cart.getQuantity(product), 5);
        t.equal(cart.getTotal(), 150);
        t.end();
    });

    tape.test('buy x get free y calculates correct discount', t => {
        const product = 'Dove soap';
        const items: CartItem[] = [
            { product: 'Dove soap', unitPrice: 30 }, { product: 'Dove soap', unitPrice: 30 }, { product: 'Dove soap', unitPrice: 30 }, { product: 'Axe deo', unitPrice: 100 }
        ];
        const discount = buyXGetYFree(product, 2, 1)(items);
        t.equal(discount, -30);
        t.equal(buyXGetYFree(product, 1, 1)(items), -30);
        t.end();
    });

    tape.test('calculates discounts for 3 dove soaps', t => {
        const product = 'Dove soap';
        const buy2get1FreeDove = buyXGetYFree(product, 2, 1);
        const cart = new ShoppingCart([buy2get1FreeDove]);
        cart.add(product, 30);
        cart.add(product, 30);
        cart.add(product, 30);
        t.equal(cart.getQuantity(product), 3);
        t.equal(cart.getTotal(), 60);
        t.end();
    });

    tape.test('calculates discounts for 5 soaps', t => {
        const product = 'Dove soap';
        const buy2get1FreeDove = buyXGetYFree(product, 2, 1);
        const cart = new ShoppingCart([buy2get1FreeDove]);
        cart.add(product, 30);
        cart.add(product, 30);
        cart.add(product, 30);
        cart.add(product, 30);
        cart.add(product, 30);
        t.equal(cart.getItems(), 5);
        t.equal(cart.getTotal(), 120);
        t.end();
    });

    tape.test('calculates discounts for 3 soaps and 2 deos', t => {
        const product = 'Dove soap';
        const buy2get1FreeDove = buyXGetYFree(product, 2, 1);
        const cart = new ShoppingCart([buy2get1FreeDove]);
        cart.add(product, 30);
        cart.add(product, 30);
        cart.add(product, 30);
        const product2 = 'Axe deo';
        cart.add(product2, 100);
        cart.add(product2, 100);
        t.equal(cart.getItems(), 5);
        t.equal(cart.getTotal(), 260);
        t.end();
    });

    tape.test('buy one get 50% discount offer', t => {
        const product = 'Dove soap';
        const items: CartItem[] = [
            { product, unitPrice: 30 }, { product, unitPrice: 30 }, { product, unitPrice: 30 }, { product: 'Axe deo', unitPrice: 100 }
        ];
        const discount = buyXGetYDiscountOnNext(product, 2, 50)(items);
        t.equal(discount, -15);
        t.end();
    });

    tape.test('calculates percentage discounts for 1 dove soap', t => {
        const product = 'Dove soap';
        const discount = buyXGetYDiscountOnNext(product, 1, 50);
        const cart = new ShoppingCart([discount]);
        cart.add(product, 30);
        cart.add(product, 30);
        t.equal(cart.getTotal(), 45);
        t.end();
    });

    tape.test('apply x% discount on total if total > y', t => {
        const product = 'Dove soap';
        const items: CartItem[] = [
            { product, unitPrice: 30 }, { product, unitPrice: 30 }, { product, unitPrice: 30 }, { product: 'Axe deo', unitPrice: 110 }
        ];
        const discount = getXPercentOffIfTotalOverY(100, 25)(items, 200);
        t.equal(discount, -50);
        t.end();
    });

    tape.test('combines multiple offers', t => {
        const dove = 'Dove soap';
        const axe = 'Axe deo';
        const buy2get1FreeDoveOffer = buyXGetYFree(dove, 2, 1);
        const netDiscountOffer = getXPercentOffIfTotalOverY(500, 20);
        const cart = new ShoppingCart([buy2get1FreeDoveOffer, netDiscountOffer]);
        cart.add(dove, 30);
        cart.add(dove, 30);
        cart.add(dove, 30);
        cart.add(dove, 30);
        cart.add(dove, 30);
        cart.add(axe, 100);
        cart.add(axe, 100);
        cart.add(axe, 100);
        cart.add(axe, 100);
        t.equal(cart.getTotal(), 416);
        t.end();
    });
});
