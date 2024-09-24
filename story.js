const story = JSON.parse(localStorage.getItem('currentStory'));
let partIndex = 0;
let score = 0;
let showQuestion = false; 

let storyContentElement = document.getElementById('story-content');
let nextPartButton = document.getElementById('next-part');
let finishButton = document.getElementById('finish');



function displayPart() {

    storyContentElement.innerHTML = '';

    if (partIndex < story.parts.length) {
        const part = story.parts[partIndex];


        const partTitle = document.createElement('h2');
        partTitle.textContent = story.title; 
        partTitle.style.fontWeight = 'bold';
        storyContentElement.appendChild(partTitle);

        if (!showQuestion) {
            const partText = document.createElement('h4');
            partText.textContent = part.text;
            storyContentElement.appendChild(partText);


            nextPartButton.style.display = 'inline-block';
            nextPartButton.textContent = 'عرض السؤال';
            showQuestion = true;
        } else {

            const questionText = document.createElement('h4');
            questionText.textContent = part.question.text;
            storyContentElement.appendChild(questionText);

            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('d-flex', 'flex-wrap', 'gap-3');
            storyContentElement.appendChild(optionsContainer);


            part.question.options.forEach((option, index) => {
                const optionButton = document.createElement('button');
                optionButton.textContent = option;
                optionButton.classList.add('btn-outline-custom', 'p-2', 'rounded' );

                optionButton.onclick = function () {
                    checkAnswer(index);
                };

                optionsContainer.appendChild(optionButton);
            });

            nextPartButton.style.display = 'none';
            showQuestion = false; 
        }
    } else {
        const endMessage = document.createElement('h4');
        endMessage.textContent = 'انتهت القصة!';
        storyContentElement.appendChild(endMessage);

        const scoreMessage = document.createElement('h4');
        scoreMessage.textContent = `نتيجتك: ${score}`;
        storyContentElement.appendChild(scoreMessage);


        finishButton.style.display = 'block';
        nextPartButton.style.display = 'none'; 
    }
}


function checkAnswer(selectedIndex) {
    if (selectedIndex === story.parts[partIndex].question.correct) {
        score++;
    }
    partIndex++; 
    nextPartButton.style.display = 'inline-block'; 
    displayPart();
}


nextPartButton.onclick = () => {
    displayPart(); 
};


finishButton.onclick = () => {
    localStorage.removeItem('currentStory');
    window.location.href = 'main.html'; 
};


displayPart();
