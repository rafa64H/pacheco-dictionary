const listOfWords = ['aircraft', 'boat', 'hello', 'bye', 'card', 'keyboard', 'mouse', 'insect', 'truck',
'car', 'horse', 'cat', 'dog', 'bed']

async function getDictionary(word){
    try{ 
        const responseDictionary = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const dictionaryArray = await responseDictionary.json()

        if(responseDictionary.ok){
            return dictionaryArray
        } 
        else{
            throw new Error('Something went wrong')
        }

    }catch (err){
        console.log(err)
    }

}

async function createSection(){
    try{        
        const dictionaryRes = await getDictionary('do')
        const getWordAPI = dictionaryRes[0].word
        const dictionarySection = document.querySelector('.dictionary')

        const wordSection = document.createElement('div')
        wordSection.classList.add('word-section')
        
        
    }
    catch{

    }
    finally{
        
    }
}

createSection()