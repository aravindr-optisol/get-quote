const quoteContainer =document.getElementById("quote-container")
const quoteText =document.getElementById("quote")
const authorText =document.getElementById("author")
const twitterBtn =document.getElementById("twitter")
const newQuoteBtn =document.getElementById("new-quote")
const loader=document.getElementById("loader")
let apiQuotes=[]
// Show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// Hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}
// Get Quotes From API
function newQuote(){
    loading()
    // Pick a random quote from APIquotes Array
    const quote=apiQuotes[Math.floor( Math.random() * apiQuotes.length)];
    // check author if not add unknown
    if(!quote.author){
        authorText.textContent='unknown';
    }else{
        authorText.textContent=quote.author;
    }
// check for length quote to determine styling 
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote')
    }    
    quoteText.textContent=quote.text;
    complete()

}
async function getQuotes(){
    loading()
    const apiUrl="https://type.fit/api/quotes"
    try{
    const response=await fetch(apiUrl);
    apiQuotes=await response.json();
    newQuote()
    }catch(error){
        console.log("Oops!")
        //Catch Error Here
    }
}
// Tweet Quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
window.open(twitterUrl,'_blank')
}
// Event Listners
newQuoteBtn.addEventListener('click',newQuote)
twitterBtn.addEventListener('click',tweetQuote)
// on Load
getQuotes()