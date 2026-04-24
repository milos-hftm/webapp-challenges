// ============================================
//  CHAOS APP - Lagerverwaltung v0.1
//  Gefixte Version
// ============================================

// --- DATENQUELLE ---
const products = [
    { id: 1, title: "Tastatur", price: 50, stock: 12 },
    { id: 2, title: "Maus", price: 30, stock: 5 },
    { id: 3, title: "Monitor", price: 200, stock: 0 },
];

const shippingCosts = 10;

const customers = [
    { id: 1, name: "Anna Müller", email: "anna@example.ch" },
    { id: 2, name: "Beat Keller", email: "beat@example.ch" },
    { id: 3, name: "Carla Rossi", email: "carla@example.ch" },
];

// API-Aufruf fehlgeschlagen: besser leeres Array statt null
const specialOffers = [];

// --- LOGIK ---

// 1. Endpreis berechnen
function getFinalPrice(product) {
    return product.price + shippingCosts;
}

// 2. Gesamtwert des Lagers
function calculateTotalValue(items) {
    let total = 0;

    items.forEach(item => {
        total += item.price * item.stock;
    });

    return total;
}

// 3. Produkt suchen & Rabatt anwenden
function applyDiscount(productId, discount) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        console.error(`FEHLER: Produkt mit ID ${productId} wurde nicht gefunden.`);
        return;
    }

    product.price -= discount;

    if (product.price < 0) {
        product.price = 0;
    }

    console.log(`Neuer Preis für ${product.title}: ${product.price}`);
}

// 4. Kunden begrüssen
function printCustomerGreeting(customer) {
    console.log(`Willkommen, ${customer.name}! Deine E-Mail: ${customer.email}`);
}

// 5. Günstige Produkte filtern
function getAffordableProducts(items, maxPrice) {
    if (!items) {
        return [];
    }

    return items.filter(item => item.price <= maxPrice);
}

// --- EXECUTION ---

console.log("=== Chaos App - Lagerverwaltung ===\n");

console.log("--- Preis-Check mit Versand ---");
console.log(`Endpreis Tastatur: ${getFinalPrice(products[0])}`);
console.log(`Endpreis Maus: ${getFinalPrice(products[1])}`);

console.log("\n--- Inventar-Check ---");
console.log("Gesamtwert Lager:", calculateTotalValue(products));

console.log("\n--- Kunden-Begrüssung ---");
customers.forEach(c => printCustomerGreeting(c));

console.log("\n--- Sonderangebote (max. 100 CHF) ---");
console.log("Günstige Produkte:", getAffordableProducts(specialOffers, 100));

console.log("\n--- Discount-Aktion ---");
applyDiscount(99, 5);