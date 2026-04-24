// ============================================
//  CHAOS APP - Lagerverwaltung v0.1
//  Autor: Praktikant (letzter Tag vor den Ferien)
// ============================================

// --- DATENQUELLE ---
const products = [
    { id: 1, title: "Tastatur", price: 50, stock: 12 },
    { id: 2, title: "Maus", price: "30", stock: 5 },
    { id: 3, title: "Monitor", price: 200 }
];

const shippingCosts = 10;

const customers = [
    { id: 1, name: "Anna Müller", email: "anna@example.ch" },
    { id: 2, firstName: "Beat Keller", email: "beat@example.ch" },
    { id: 3, name: "Carla Rossi", email: "carla@example.ch" }
];

const specialOffers = null; // API-Aufruf fehlgeschlagen, gab null statt [] zurück

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

// 3. Produkt suchen & Rabatt (Gefahr von Runtime-Crash bei falscher ID)
function applyDiscount(productId, discount) {
    const product = products.find(p => p.id === productId);
    product.price -= discount;
    console.log(`Neuer Preis für ${product.title}: ${product.price}`);
}

// 4. Kunden begrüssen
function printCustomerGreeting(customer) {
    console.log(`Willkommen, ${customer.name}! Deine E-Mail: ${customer.email}`);
}

// 5. Günstige Produkte filtern
function getAffordableProducts(items, maxPrice) {
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
try {
    console.log("Günstige Produkte:", getAffordableProducts(specialOffers, 100));
} catch (e) {
    console.error("FEHLER:", e.message);
}

console.log("\n--- Discount-Aktion ---");
try {
    applyDiscount(99, 5);
} catch (e) {
    console.error("FEHLER:", e.message);
}
