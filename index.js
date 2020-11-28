const elements = {
    QUOTE_CONTAINER:    document.getElementById('quote-container'),
    QUOTE_TEXT:         document.getElementById('quote'),
    AUTHOR_TEXT:        document.getElementById('author'),
    TWITTER_BTN:        document.getElementById('twitter'),
    NEW_QUOTE_BTN:      document.getElementById('new-quote'),
    LOADER:             document.getElementById('loader')
}

function showLoader() {
    elements.LOADER.hidden = false;
    elements.QUOTE_CONTAINER.hidden = true;
}

function removeLoader() {
    if (!elements.LOADER.hidden) {
        elements.QUOTE_CONTAINER.hidden = false;
        elements.LOADER.hidden = true;
    }
}

// get quote from api
async function getQuote() {
    showLoader();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const res = await fetch(proxyUrl + apiUrl);
        const data = await res.json();
        elements.AUTHOR_TEXT.innerText = data.quoteAuthor || 'unknown';

        if (data.quoteText.length > 120) {
            elements.QUOTE_TEXT.classList.add('long-quote');
        } else {
            elements.QUOTE_TEXT.classList.remove('long-quote');
        }
        elements.QUOTE_TEXT.innerText = data.quoteText;

        removeLoader();
    } catch (err) {
        console.log('error', err);
    }
}

function tweetQuote() {
    const quote = elements.QUOTE_TEXT.innerText;
    const author = elements.AUTHOR_TEXT.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// on load
getQuote();

// event listeners
elements.NEW_QUOTE_BTN.addEventListener('click', getQuote);
elements.TWITTER_BTN.addEventListener('click', tweetQuote);

