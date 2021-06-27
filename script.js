const qouteContainer = document.getElementById('qoute-container');
const qouteText = document.getElementById('qoute');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-qoute');
const loader = document.getElementById('loader');
let apiQoutes = [];

// Show Loading

function loading () {
    loader.hidden = false;
    qouteContainer.hidden = true;
}

// Hide Loading
function complete () {
    qouteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Qoute

function newQoute() {
    loading();
    // pick a random qoute/number array
    const qoute = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
    // Check if author is blank
    if (!qoute.author){
        authorText.textContent = 'Unknown';
    }else {
        authorText.textContent = qoute.author;
    }
    // Check qoute length
    if (qoute.text.length > 100) {
        qouteText.classList.add('long-qoute');
    }else{
        qouteText.classList.remove('long-qoute');
    }
    // Set Qoute, Hide Loader
    qouteText.textContent = qoute.text;
    complete();  
}

// Get Qoute From Api

async function getQoute() {
    loading();
    // const proxyUrl = 'https://guarded-temple-55250.herokuapp.com/'
     const apiUrl = 'https://type.fit/api/quotes';
     try {
         const response = await fetch(apiUrl);
         apiQoutes = await response.json();
         newQoute();

     } catch (error) {
         getQoute();
         console.log('oopps, no qoute!', error);
     } 

}

// Tweet Quote
function tweetQoute() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); 
}
// Event Listeners
newQuoteBtn.addEventListener('click', newQoute);
twitterBtn .addEventListener('click', tweetQoute);


// On Load
getQoute();
