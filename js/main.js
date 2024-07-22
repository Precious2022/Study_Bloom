

const quizzes = {
    'html-css-js': [
        { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language'], answer: 0 },
        { question: 'What does CSS stand for?', options: ['Colorful Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets'], answer: 2 },
        // More questions will be needed
    ],
    'python': [
        { question: 'What is the correct syntax to output "Hello World" in Python?', options: ['echo("Hello World")', 'print("Hello World")', 'printf("Hello World")'], answer: 1 },
        // AMore questions will be needed
    ],
    'java': [
        { question: 'Which method is used to define the behavior of an object?', options: ['constructor', 'function', 'class'], answer: 1 },
        //More questions will be needed
    ],
    'data-science': [
        { question: 'What is the process of extracting hidden patterns from data?', options: ['Data analysis', 'Data mining', 'Data science'], answer: 1 },
        // More questions will be added
    ]
};

// Function to generate quiz questions dynamically
function loadQuiz(category) {
    const quizSection = document.getElementById(category + '-questions');
    const questions = quizzes[category];

    if (!questions) {
        quizSection.innerHTML = '<p>No questions available for this quiz.</p>';
        return;
    }

    let quizHTML = '';
    questions.forEach((question, index) => {
        quizHTML += `<div class="question">
                        <p>${index + 1}. ${question.question}</p>
                        <ul>
                            ${question.options.map((option, i) => `<li><input type="radio" name="${category}-answer${index}" value="${i}">${option}</li>`).join('')}
                        </ul>
                    </div>`;
    });

    quizSection.innerHTML = quizHTML;
}

// Function to submit quiz and calculate score
function submitQuiz(category) {
    const questions = quizzes[category];
    let score = 0;

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="${category}-answer${index}"]:checked`);
        if (selectedOption) {
            if (parseInt(selectedOption.value) === question.answer) {
                score++;
            }
        }
    });

    const resultSection = document.getElementById(category + '-result');
    resultSection.innerHTML = `<p>Your score: ${score} / ${questions.length}</p>`;
}

// Community page content loading
document.addEventListener('DOMContentLoaded', () => {
    loadQuiz('html-css-js');
    loadQuiz('python');
    loadQuiz('java');
    loadQuiz('data-science');

    const infoSection = document.getElementById('info-section');

    document.querySelectorAll('.cta').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const infoType = event.target.getAttribute('data-info');
            loadInfo(infoType);
        });
    });

    function loadInfo(type) {
        let content = '';

        switch (type) {
            case 'create-group':
                content = `<div class="create-join-group-section">
                                <h2>Create a Group</h2>
                                <p>Here you can create and manage your study groups.</p>
                                <form>
                                    <label for="group-name">Group Name:</label>
                                    <input type="text" id="group-name" name="group-name">
                                    <label for="group-description">Description:</label>
                                    <textarea id="group-description" name="group-description"></textarea>
                                    <button type="submit">Create Group</button>
                                </form>
                            </div>`;
                break;
            case 'login':
                content = `<div class="login-section">
                                <h2>Login</h2>
                                <p>Please log in to access community features.</p>
                                <form>
                                    <label for="username">Username:</label>
                                    <input type="text" id="username" name="username">
                                    <label for="password">Password:</label>
                                    <input type="password" id="password" name="password">
                                    <button type="submit">Login</button>
                                </form>
                            </div>`;
                break;
            case 'success-stories':
                content = `<div class="success-stories-section">
                                <h2>Success Stories</h2>
                                <p>Read inspiring stories from our successful members.</p>
                            </div>`;
                break;
            case 'events':
                content = `<div class="events-section">
                                <h2>Events</h2>
                                <p>Find out about upcoming events and activities.</p>
                            </div>`;
                break;
            case 'search-learnerships':
                content = `<div class="search-learnerships-section">
                                <h2>Search Learnerships</h2>
                                <p>Search for learnerships that fit your interests.</p>
                            </div>`;
                break;
            default:
                content = `<p>Select a category to view more information.</p>`;
        }

        infoSection.innerHTML = content;
    }
});



