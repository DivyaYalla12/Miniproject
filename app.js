document.addEventListener('DOMContentLoaded', function() {
    const internshipList = document.getElementById('internshipList');
    const searchInput = document.getElementById('searchInput');
    const locationFilter = document.getElementById('locationFilter');
    const applicationForm = document.getElementById('applicationForm');

    const internships = [
        { title: 'Software Developer Intern', company: 'Tech Corp', location: 'Remote', description: 'Work on web development projects.' },
        { title: 'Marketing Intern', company: 'Business Inc.', location: 'On-site', description: 'Assist with marketing campaigns.' },
        { title: 'Data Science Intern', company: 'Data Solutions', location: 'Remote', description: 'Analyze data and build models.' },
        { title: 'Design Intern', company: 'Creative Agency', location: 'On-site', description: 'Create visual content for clients.' }
    ];

    function displayInternships(internships) {
        internshipList.innerHTML = '';
        internships.forEach(internship => {
            const internshipDiv = document.createElement('div');
            internshipDiv.classList.add('internship');
            internshipDiv.innerHTML = `
                <h2><i class="fas fa-briefcase"></i>${internship.title}</h2>
                <p class="company"><i class="fas fa-building"></i>${internship.company}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i>${internship.location}</p>
                <p class="description"><i class="fas fa-info-circle"></i>${internship.description}</p>
            `;
            internshipList.appendChild(internshipDiv);
        });
    }

    function filterInternships() {
        const searchValue = searchInput.value.toLowerCase();
        const locationValue = locationFilter.value;
        const filteredInternships = internships.filter(internship => {
            const matchesSearch = internship.title.toLowerCase().includes(searchValue) || internship.company.toLowerCase().includes(searchValue);
            const matchesLocation = locationValue ? internship.location.toLowerCase() === locationValue : true;
            return matchesSearch && matchesLocation;
        });
        displayInternships(filteredInternships);
    }

    async function submitApplication(event) {
        event.preventDefault();
        const formData = new FormData(applicationForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            internship: formData.get('internship')
        };

        try {
            const response = await fetch('https://your-api-endpoint.amazonaws.com/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Application submitted successfully!');
                applicationForm.reset();
            } else {
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    searchInput.addEventListener('input', filterInternships);
    locationFilter.addEventListener('change', filterInternships);
    applicationForm.addEventListener('submit', submitApplication);

    displayInternships(internships);  // Initial display
});
