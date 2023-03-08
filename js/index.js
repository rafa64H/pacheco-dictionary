import * as main from './main.js'

//words to create some definitions on the home page
const listOfWords = ['aircraft', 'boat', 'hello', 'goodbye', 'card', 'keyboard', 'mouse', 'insect', 'truck',
'car', 'horse', 'cat', 'dog', 'bed']

for(let i = 0; i <=3; i++){
    let listWords = listOfWords
    let randomNumber = main.randomNumberInt(0, listWords.length-1)
    let randomWord = listWords[randomNumber]

    listWords.splice(randomNumber, 1)

    main.createSection(randomWord)
}