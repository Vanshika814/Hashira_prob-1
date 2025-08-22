const fs = require('fs');

// Function to decode a value with a given base
function baseNToBigInt(str, base) {
    let result = 0n;
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    const intBase = BigInt(base);

    for (let i = 0; i < str.length; i++) {
        const char = str[i].toLowerCase();
        const digitValue = BigInt(chars.indexOf(char));
        result = result * intBase + digitValue;
    }
    return result;
}

// Lagrange interpolation to find P(0)
function findSecret(points) {
    let secret = 0n;

    for (let i = 0; i < points.length; i++) {
        const { x: xi, y: yi } = points[i];
        let term = yi;
        let numerator = 1n;
        let denominator = 1n;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const { x: xj } = points[j];
                numerator *= (0n - xj);
                denominator *= (xi - xj);
            }
        }
        
        term = term * numerator / denominator;
        secret += term;
    }

    return secret;
}

try {
    const fileData = fs.readFileSync('testcase.json', 'utf8');
    const data = JSON.parse(fileData);

    const n = data.keys.n;
    const k = data.keys.k;
    
    const points = [];

    // Decode all points
    for (let i = 1; i <= n; i++) {
        const pointData = data[i.toString()];
        if (pointData) {
            const x = BigInt(i);
            const y = baseNToBigInt(pointData.value, pointData.base);
            points.push({ x, y });
        }
    }

    // Use first k points for interpolation
    const selectedPoints = points.slice(0, k);
    
    // Calculate the secret
    const secret = findSecret(selectedPoints);
    
    console.log('The secret is:', secret.toString());
    
} catch (error) {
    console.error('Error:', error.message);
}
