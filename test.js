const animals = [
    { name: 'marri', type: 'cat' },
    { name: 'rosei', type: 'cat' },
    { name: 'tom', type: 'dog' },
]

const cats = animals.filter(animal => animal.type === 'cat')

console.log(cats);

/**
 * Higher order function
 */
const filter = (arr, cb) => {
    const newArr = [];

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (cb(element)) {
            newArr.push(element)
        }
    }

    return newArr
}

console.log(filter(animals, function (animal) {
    return animal.type === 'cat'
}))

