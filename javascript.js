// Configuration - Je kunt hier je eigen nummer invullen
const BUSINESS_WHATSAPP_NUMBER = "31612345678"; // Voorbeeldnummer, vervang dit door je eigen nummer

document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Link Handler
    const whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=Hallo Jaap, ik heb een vraag over het huren van een aanhanger.`;
    }

    // Contact Page WhatsApp Button
    const contactWhatsappBtn = document.getElementById('contact-whatsapp-btn');
    if (contactWhatsappBtn) {
        contactWhatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const message = encodeURIComponent("Hallo Jaap, ik wil graag een aanhanger huren.");
            window.open(`https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${message}`, '_blank');
        });
    }

    // Simple Calendar Logic (for the Agenda page)
    const calendarElement = document.getElementById('calendar-grid');
    if (calendarElement) {
        generateCalendar();
    }
});

function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('month-year');
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthNames = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
    const dayNames = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

    monthYearDisplay.innerText = `${monthNames[currentMonth]} ${currentYear}`;

    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day', 'header');
        dayHeader.innerText = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Get days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0=Sun, 1=Mon...
    
    // Adjust for Monday start
    let startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    // Add empty slots for previous month
    for (let i = 0; i < startOffset; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerText = i;
        
        // Randomly simulate availability for demo
        const isBooked = Math.random() < 0.2; // 20% chance booked
        if (isBooked) {
            dayElement.classList.add('booked');
            dayElement.title = "Bezet";
        } else {
            dayElement.classList.add('available');
            dayElement.title = "Beschikbaar";
            dayElement.onclick = () => {
                alert(`Je hebt gekozen voor ${i} ${monthNames[currentMonth]}. Neem contact op via WhatsApp om de reservering te bevestigen!`);
            };
        }
        
        calendarGrid.appendChild(dayElement);
    }
}
