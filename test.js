

const hastTags = [
    { name: '#funny', value: 49409706 },
    { name: '#gif', value: 2449588 },
    { name: '#funnyquotes', value: 2592444 },
    { name: '#funnymemes', value: 49410793 },
    { name: '#funnyshit', value: 9348249 },
    { name: '#smile', value: 361964725 },
    { name: '#smilemore', value: 2365325 },
    { name: '#funnyvideos', value: 18513962 },
    { name: '#lol', value: 164256128 },
    { name: '#fun', value: 385851446 },
    { name: '#funk', value: 8086098 },
    { name: '#funtimes', value: 23491413 },
    { name: '#laugh', value: 34589022 },
    { name: '#laughter', value: 6936780 },
    { name: '#laughing', value: 9959304 },
    { name: '#funtime', value: 7646358 },
    { name: '#happiness', value: 131661419 },
    { name: '#memestagram', value: 10325553 },
    { name: '#cool', value: 161457135 },
    { name: '#laughs', value: 4920720 },
    { name: '#instamood', value: 237441389 },
    { name: '#funkday', value: 10949156 },
    { name: '#memes', value: 136055093 },
    { name: '#meme', value: 110237784 },
    { name: '#dankmemes', value: 66290443 },
    { name: '#memes😂', value: 9360942 },
    { name: '#memesdaily', value: 43178658 },
    { name: '#memepage', value: 9485554 },
    { name: '#smiley', value: 3678302 },
    { name: '#smiles', value: 27010658 }
]

const descending = hastTags.sort((a, b) => b.value - a.value)
console.log(descending.length);

let tags = ''
descending.map(obj => {
    tags += ` ${obj.name}`
    console.log(`${obj.name}:${obj.value}`);

})
console.log(tags);

