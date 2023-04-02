// Define the pricing rules for the items
const pricingRules = {
  A: { unitPrice: 50, specialPrice: { count: 3, price: 130 } },
  B: { unitPrice: 30, specialPrice: { count: 2, price: 45 } },
  C: { unitPrice: 20 },
  D: { unitPrice: 15 }
};

// Define the shopping cart object
const cart = {
  items: {},
  add(item) {
    this.items[item] = (this.items[item] || 0) + 1;
  },
  remove(item) {
    if (this.items[item]) {
      this.items[item] -= 1;
      if (this.items[item] === 0) {
        delete this.items[item];
      }
    }
  },
  count(item) {
    return this.items[item] || 0;
  },
  total() {
    let total = 0;
    for (let item in this.items) {
      const count = this.count(item);
      const { unitPrice, specialPrice } = pricingRules[item];
      if (specialPrice) {
        const specialPriceCount = Math.floor(count / specialPrice.count);
        const remainingCount = count % specialPrice.count;
        total += specialPriceCount * specialPrice.price;
        total += remainingCount * unitPrice;
      } else {
        total += count * unitPrice;
      }
    }
    return total;
  }
};

// Test the checkout system
cart.add('A');
console.log('Total: ', cart.total()); // Total: 50
cart.add('B');
console.log('Total: ', cart.total()); // Total: 80
cart.add('A');
console.log('Total: ', cart.total()); // Total: 130
cart.add('A');
console.log('Total: ', cart.total()); // Total: 160
cart.add('C');
console.log('Total: ', cart.total()); // Total: 180
cart.remove('A');
console.log('Total: ', cart.total()); // Total: 130