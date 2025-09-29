const fs = require('fs');
const path = require('path');

function getNextInvoiceNumber(folderPath, partialName) {
    const files = fs.existsSync(folderPath) ? fs.readdirSync(folderPath) : [];
    
    const numbers = files
        .filter(file => file.includes(partialName))
        .map(file => {
            // Extraire UNIQUEMENT le numéro après le partialName
            // Exemple: "Facture-29-09-2025-3.pdf" -> extrait "3"
            const regex = new RegExp(`${partialName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+)`);
            const match = file.match(regex);
            return match ? parseInt(match[1], 10) : 0;
        })
        .filter(num => num > 0);
    
    if (numbers.length === 0) return 1;
    return Math.max(...numbers) + 1;
}

module.exports = { getNextInvoiceNumber}