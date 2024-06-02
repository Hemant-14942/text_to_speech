var convert = document.getElementById('convert'),
    voiceIco = document.getElementById('voiceIco'),
    speech = document.getElementById('inputText'),
    count = 1;

speech.addEventListener('change', function() {
    speechText = this.value;
    speechSynthesis.cancel();
    convert.innerHTML = "Text to Speech";
    voiceIco.innerHTML = "🔈";
});

convert.addEventListener('click', function() {
    var speechText = speech.value;
    if (!speechSynthesis.speaking && count == 1) {
        var speechVoice = new SpeechSynthesisUtterance(speechText);
        var voices = speechSynthesis.getVoices();
        speechVoice.voice = voices[2];
        speechVoice.lang = 'en-US';

        speechVoice.onstart = function() {
            convert.innerHTML = "Pause";
            voiceIco.innerHTML = "🔊";
        };

        speechVoice.onend = function() {
            convert.innerHTML = "Text to Speech";
            voiceIco.innerHTML = "🔈";
            count = 1;
        };

        speechSynthesis.speak(speechVoice);
        count = 2;
    } else if (speechSynthesis.speaking && !speechSynthesis.paused && count == 2) {
        speechSynthesis.pause();
        convert.innerHTML = "Resume";
        voiceIco.innerHTML = "🔊";
        count = 3;
    } else if (speechSynthesis.paused && count == 3) {
        speechSynthesis.resume();
        convert.innerHTML = "Pause";
        voiceIco.innerHTML = "🔊";
        count = 2;
    } else {
        speechSynthesis.cancel();
        convert.innerHTML = "Text to Speech";
        voiceIco.innerHTML = "🔈";
        count = 1;
    }
});

setInterval(() => {
    if (!speechSynthesis.speaking && count == 2) {
        convert.innerHTML = "Text to Speech";
        voiceIco.innerHTML = "🔈";
        count = 1;
    }
}, 100);
