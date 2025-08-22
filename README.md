# Shamir's Secret Sharing - Simple Implementation

A simplified JavaScript implementation of Shamir's Secret Sharing using Lagrange interpolation.

## Files

- `solution.js` - Main implementation
- `testcase.json` - Sample test case
- `testcase1.json` - Additional test case  
- `testcase2.json` - Complex test case with large numbers

## Usage

```bash
node solution.js
```

The script reads `testcase.json` by default and outputs the secret.

## How It Works

1. Reads JSON file with encoded points
2. Decodes values from different bases using `baseNToBigInt()`
3. Uses Lagrange interpolation to find the secret at P(0)

## Example

For the sample testcase.json, the secret is: **3**