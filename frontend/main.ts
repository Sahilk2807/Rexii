// --- CONFIGURATION ---
// On local, this will be http://localhost:3000/tts
// After deployment, change this to your Railway backend URL
const BACKEND_URL = 'http://localhost:3000/tts'; // IMPORTANT: Change for deployment!

// --- ELEMENT SELECTORS ---
const textInput = document.getElementById('text-input') as HTMLTextAreaElement;
const generateBtn = document.getElementById('generate-btn') as HTMLButtonElement;
const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
const errorMessageDiv = document.getElementById('error-message') as HTMLDivElement;
const spinner = document.getElementById('spinner') as HTMLElement;
const buttonText = document.getElementById('button-text') as HTMLSpanElement;

// --- STATE MANAGEMENT ---
function setLoadingState(isLoading: boolean) {
    if (isLoading) {
        generateBtn.disabled = true;
        spinner.classList.remove('hidden');
        buttonText.textContent = 'प्रोसेसिंग...';
    } else {
        generateBtn.disabled = textInput.value.trim() === '';
        spinner.classList.add('hidden');
        buttonText.textContent = 'आवाज़ बनाएं';
    }
}

function displayError(message: string) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove('hidden');
    audioPlayer.src = ''; // Clear previous audio
}

function hideError() {
    errorMessageDiv.classList.add('hidden');
}

// --- EVENT LISTENERS ---

// Enable/disable button based on text input
textInput.addEventListener('input', () => {
    generateBtn.disabled = textInput.value.trim() === '';
});

// Handle the generate button click
generateBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    if (!text) {
        displayError('कृपया टेक्स्ट दर्ज करें।');
        return;
    }

    hideError();
    setLoadingState(true);

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            // Try to parse error from backend JSON response
            const errorData = await response.json().catch(() => null);
            const detail = errorData?.error || `Error: ${response.statusText}`;
            throw new Error(`API अनुरोध विफल रहा: ${detail}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        audioPlayer.src = audioUrl;
        audioPlayer.hidden = false;
        audioPlayer.play();

    } catch (error) {
        console.error('Fetch error:', error);
        displayError(error instanceof Error ? error.message : 'एक अज्ञात त्रुटि हुई।');
    } finally {
        setLoadingState(false);
    }
});

// --- INITIALIZATION ---
// Hide the audio player initially
audioPlayer.hidden = true;