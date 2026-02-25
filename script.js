const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let currentLang = 'asl';
let quizQuestions =[];
let score =0;
let userAnswers= [];
let currentQuestionIndex = 0;

//navi

function showSection(sectionId) {
    const section = ['learning-section','quiz-setup', 'quiz-game', 'results'];

    section.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.display = 'none';
    });
    

    if (sectionId === 'asl' || sectionId === 'bsl') {
        document.getElementById('learning-section').style.display = 'block';
        loadAlphabet(sectionId);
    } else {
        const target = document.getElementById(sectionId);
        if (target) target.style.display = 'block';
    }
}
//modde apprentisage
function loadAlphabet(lang) {
    const title = document.getElementById('lang-title');
    const grid = document.getElementById('alphabet-grid');
    if (!grid || !title) return;

    if (lang) {
        currentLang = lang;
    }

    title.innerText = `Alphabet ${currentLang.toLocaleUpperCase()}`;
    grid.innerHTML = "";

    alphabet.forEach(letter => {
        grid.innerHTML +=`
        <div class="card">
            <img src="image/${currentLang}/${letter}.png" alt="${letter}" style="width:100%">
            <p>${letter}</p>
        </div>`; 
    });
}

//Quiz

function startQuiz(num) {
    score = 0;
    currentQuestionIndex = 0;
    userAnswers = [];

    //melange questions
    quizQuestions = [...alphabet]
        .sort(()=> 0.5 - Math.random())
        .slice(0,num);
    showSection('quiz-game');
    document.getElementById('total-q').innerText = num;
    loadQuestion();
}

function loadQuestion() {
    const correctLetter = quizQuestions[currentQuestionIndex];
    document.getElementById('current-q').innerText = currentQuestionIndex + 1;
    document.getElementById('quiz-image').src = `image/${currentLang}/${correctLetter}.png`;

    //1 bonne option, 3 mauvaises
    let options = [correctLetter];
    while(options.length < 4) {
        let rand = alphabet[Math.floor(Math.random() * 26)];
        if(!options.includes(rand)) options.push(rand);
    }
    options.sort(() => 0.5 - Math.random());

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML ="";
    options.forEach(opt =>{
        optionsDiv.innerHTML += `<button onclick="checkAnswer('${opt}', '${correctLetter}') ">${opt}</button>`;
    });
}


//verif reponse points
function checkAnswer(selected, correct) {
    const isCorrect = (selected === correct);
    if(isCorrect) score ++;
    
    userAnswers.push({ letter: correct, selected: selected, correct: isCorrect});

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

//resultats

function showResult() {
    showSection('results');
    const display =  document.getElementById('score-display');
    const percentage = (score / quizQuestions.length) * 100;
    let gifPath = "";
    let message = "";

    if (percentage >= 90) {
        gifPath = "./gifs/90-100.gif";
        message = "Est-ce que tu peux tchatcher comme moi je tchatche ? Tu rrrrroucoules, tu bbrrroooies la langue de Molière !";
    } else if (percentage >=80) {
        gifPath = "./gifs/80-90.gif";
        message = "Maintenant que je pèse dans le game...faut laisser la star tranquille ! ⭐";
        
    } else if (percentage >=70) {
        gifPath = "./gifs/70-80.gif";
        message = "J'ai des connaissances en chimie que tu n'as pas ! 🧪";
    } else if (percentage >=60) {
        gifPath = "./gifs/60-70.webp";
        message = "Validation validée ! ✅";

    } else if (percentage >=50) {
        gifPath = "./gifs/50-60.gif";
        message = "Le football il a changé ! ⚽";
    
    } else if (percentage >=40) {
        gifPath = "./gifs/40-50.gif";
        message = "Tu ne l'as pas sécurisé avec le cadenas, à mon avis ! 🔓";

    } else if (percentage >=30) {
        gifPath = "./gifs/30-40.gif";
        message = "Believe, croire en nos rêves, on t'aime Justin Bieber ! 🐝🍃";

    } else if (percentage >=20) {
        gifPath = "./gifs/20-30.webp";
        message = "OH bah ! T'es sûrement pas français toi ! 🚩";

    } else if (percentage >=10) {
        gifPath = "./gifs/10-20.gif";
        message = "Quelqu'un veut prendre ma place ? Non chérie personne !";

    } else {
        gifPath = "./gifs/80-90.gif";
        message = "Oups ! C'est l'occasion de tout reprendre ! ✨";
    }

    display.innerHTML = `
        <h3> Ton score : ${score} / ${quizQuestions.length} (${Math.round(percentage)}%)</h3>
        <p class="final-message" style="font-weight: bold; margin: 15px 0; ">${message}</p>
        <div class="gif-container">
            <img src="${gifPath}" alt="Result GIF" style=max-width: 300px; border-radius:15px; border: 5px solid var(--primary);">
        </div>
    `;
}

//Lancement 
loadAlphabet();