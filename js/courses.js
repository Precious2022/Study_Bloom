
// Courses data

const courses = {
    'programming': [
        { name: 'Web Development', description: 'A foundational course covering web development basics with HTML, CSS, and JavaScript.', available: true, image: 'images/web-development.jpg' },
        { name: 'Python', description: 'An introduction to Python programming language, suitable for beginners.', available: true, image: 'images/python.jpg' },
        { name: 'Java', description: 'A comprehensive course on Java programming language and application development.', available: true, image: 'images/java.jpg' },
        { name: 'Data Science', description: 'An advanced course covering data analysis, machine learning, and data visualization.', available: true, image: 'images/data-science.jpg' },
    ],
    'skills': [
        { name: 'AWS Practitioner', description: 'Learn the fundamentals of Amazon Web Services (AWS) cloud platform.', available: true, image: 'images/aws-practitioner.jpg' },
        // More skills courses will be added
    ]
};

// Function to render courses
function renderCourses(category, searchQuery = '', filterAvailable = true, sortOption = 'name') {
    const coursesContainer = document.getElementById('courses-list');
    const selectedCourses = courses[category];

    if (!selectedCourses) {
        coursesContainer.innerHTML = '<p>No courses available for this category.</p>';
        return;
    }

    let filteredCourses = selectedCourses.filter(course => {
        return course.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
               (filterAvailable ? course.available : true);
    });

    filteredCourses.sort((a, b) => {
        if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'availability') {
            return a.available === b.available ? 0 : a.available ? -1 : 1;
        }
        return 0;
    });

    let coursesHTML = '';
    filteredCourses.forEach(course => {
        coursesHTML += `
            <div class="course">
                <img src="${course.image}" alt="${course.name}">
                <div class="course-info">
                    <h2>${course.name}</h2>
                    <p>${course.description}</p>
                    <p>${course.available ? 'Available' : 'Not Available'}</p>
                    ${course.available ? '<a href="#" class="enroll-button">Enroll Now</a>' : ''}
                </div>
            </div>`;
    });

    coursesContainer.innerHTML = coursesHTML;
}

// Handle button clicks
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('programming-courses-btn').addEventListener('click', () => {
        renderCourses('programming');
    });

    document.getElementById('skills-courses-btn').addEventListener('click', () => {
        renderCourses('skills');
    });

    document.getElementById('courses-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('enroll-button')) {
            event.preventDefault();
            const courseName = event.target.closest('.course').querySelector('h2').textContent;
            enrollCourse(courseName);
        }
    });

    // Search, filter, and sort functionality
    document.getElementById('search-input').addEventListener('input', (event) => {
        const searchQuery = event.target.value;
        const filterAvailable = document.getElementById('filter-available').checked;
        const sortOption = document.getElementById('sort-option').value;
        const category = document.querySelector('input[name="category"]:checked').value;
        renderCourses(category, searchQuery, filterAvailable, sortOption);
    });

    document.getElementById('filter-available').addEventListener('change', (event) => {
        const searchQuery = document.getElementById('search-input').value;
        const filterAvailable = event.target.checked;
        const sortOption = document.getElementById('sort-option').value;
        const category = document.querySelector('input[name="category"]:checked').value;
        renderCourses(category, searchQuery, filterAvailable, sortOption);
    });

    document.getElementById('sort-option').addEventListener('change', (event) => {
        const searchQuery = document.getElementById('search-input').value;
        const filterAvailable = document.getElementById('filter-available').checked;
        const sortOption = event.target.value;
        const category = document.querySelector('input[name="category"]:checked').value;
        renderCourses(category, searchQuery, filterAvailable, sortOption);
    });
});

// Function to handle course enrollment
function enrollCourse(courseName) {
    const userCertificate = prompt('Do you have a matric certificate? (yes/no)').toLowerCase();

    if (userCertificate !== 'yes') {
        alert('You need a matric certificate to enroll.');
        return;
    }

    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    if (enrolledCourses.length >= 2) {
        alert('You can only enroll in a maximum of 2 courses at a time.');
        return;
    }

    if (enrolledCourses.includes(courseName)) {
        alert('You are already enrolled in this course.');
        return;
    }

    enrolledCourses.push(courseName);
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));

    // Send an email after successful enrollment
    fetch('/enroll', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'precious05.makana@com', courseName }) 
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        alert('Error enrolling in course.');
    });
}
