document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
    let devtools = {
        open: false,
        orientation: null
    };
    const threshold = 160;
    setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold ||
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                console.warn('Developer tools detected');
            }
        } else {
            devtools.open = false;
        }
    }, 500);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offsetTop = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.advantage-item, .service-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    document.body.style.transition = 'opacity 0.5s ease';

    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }
});

function safeOpenTelegram(type) {
    let telegramUrl;
    let message;
    switch(type) {
        case 'main':
            telegramUrl = 'https://t.me/bryablo';
            message = 'Перейти для связи по всем вопросам?';
            break;
        case 'blog':
            telegramUrl = 'https://t.me/fleur_furniture';
            message = 'Перейти в наш блог?';
            break;
        case 'bot':
            telegramUrl = 'https://t.me/fleur_furniture_bot';
            message = 'Подать заявку через Telegram бот?';
            break;
        default:
            return;
    }
    if (confirm(message)) {
        const tempLink = document.createElement('a');
        tempLink.href = telegramUrl;
        if (tempLink.hostname === 't.me' || tempLink.hostname === 'telegram.me') {
            window.open(telegramUrl, '_blank', 'noopener,noreferrer');
        } else {
            alert('Неверная ссылка');
        }
    }
}