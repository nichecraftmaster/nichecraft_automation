const services = [
    { name: "Talent Management & Leadership Development", price: "$300,000", id: "talent-management" },
    { name: "AI and Machine Learning Solutions", price: "$500,000", id: "ai-solutions" },
    { name: "Marketing & Brand Strategy", price: "$500,000", id: "marketing-strategy" }
];

function displayServices() {
    const serviceList = document.getElementById('service-list');
    services.forEach(service => {
        const serviceDiv = document.createElement('div');
        serviceDiv.classList.add('service');
        serviceDiv.innerHTML = `
            <h3>${service.name}</h3>
            <p>Price: ${service.price}</p>
            <button onclick="redirectToService('${service.id}')">Learn More</button>
        `;
        serviceList.appendChild(serviceDiv);
        // Add a fade-in animation
        setTimeout(() => {
            serviceDiv.style.opacity = '1';
            serviceDiv.style.transform = 'translateY(0)';
        }, 100);
    });
}

function redirectToService(serviceId) {
    alert(`Redirecting to ${serviceId}...`); // Placeholder for future routing
}

document.addEventListener('DOMContentLoaded', displayServices);
