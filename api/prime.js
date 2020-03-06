import { sqrt, mod, floor } from 'mathjs';
export default input => {
    return new Promise((resolve, reject) => {
        if (!input) reject({status: 400, message: "no number was supplied"});
        resolve(isPrime(input));
    });
};

function isPrime(n) {
    if(n < 2) {
        return "not prime";
    }

    for (let i = 2; i <= sqrt(n); i++) {
        if (mod(n, i) === 0) {
            return "not prime"
        }
    }

    return "prime";
}