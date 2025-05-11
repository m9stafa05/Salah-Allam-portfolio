function showAlert() {
    const alertBox = document.querySelector('.custom-alert');
    
    alertBox.style.display = 'block';
}

function closeAlert() {
    const alertBox = document.querySelector('.custom-alert');
    
    alertBox.style.display = 'none';
}

// Handle WhatsApp button click
document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Open WhatsApp with default message
    window.open('https://wa.me/+201092499084?text=مرحباً بكم في مكتب صلاح علام للمحاماة\n\nأرغب في حجز استشارة مع مكتب المحاماة\n\نللاتصال والتواصل', '_blank');
    
    // Show alert
    showAlert();
});

document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.querySelector('input[placeholder="الاسم"]').value;
    const phone = document.querySelector('input[placeholder="رقم الهاتف"]').value;
    const email = document.querySelector('input[placeholder="البريد الإلكتروني"]').value;
    const subject = document.querySelector('input[placeholder="الموضوع"]').value;
    const details = document.querySelector('textarea[placeholder="التفاصيل"]').value;

    // Format the message
    const message = `مرحباً بكم في مكتب صلاح علام للمحاماة\n\نأرغب في حجز استشارة مع مكتب المحاماة\n\نالاسم: ${name}\نرقم الهاتف: ${phone}\نللاتصال والتواصل`;

    // Open WhatsApp automatically
    window.open(`https://wa.me/+201092499084?text=${encodeURIComponent(message)}`, '_blank');

    // Show alert with WhatsApp button
    const alertBox = document.querySelector('.custom-alert');
    const whatsappLink = document.createElement('a');
    whatsappLink.href = `https://wa.me/+201092499084?text=${encodeURIComponent(message)}`;
    whatsappLink.target = '_blank';
    whatsappLink.textContent = 'افتح واتساب مرة أخرى';
    whatsappLink.style.cssText = `
        display: block;
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: bold;
        text-decoration: none;
        color: #fff;
        background-color: #25d366;
        padding: 10px 20px;
        border-radius: 5px;
    `;
    alertBox.appendChild(whatsappLink);
    showAlert();
});
