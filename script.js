// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
});

// ===== STATS COUNTER =====
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements
    document.querySelectorAll('.service-card, .step, .testi-card, .store-card, .cq-channel').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Stats
    const strip = document.querySelector('.stats-strip');
    if (strip) statsObserver.observe(strip);

    // Stagger reveal for grids
    document.querySelectorAll('.services-grid .service-card, .testi-grid .testi-card, .stores-grid .store-card').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.08}s`;
    });
});

// ===== LIVE CHAT =====
const chatBubble = document.getElementById('chatBubble');
const chatPopup = document.getElementById('chatPopup');
const chatClose = document.getElementById('chatClose');

if (chatBubble) {
    chatBubble.addEventListener('click', () => {
        chatPopup.classList.toggle('open');
    });
}
if (chatClose) {
    chatClose.addEventListener('click', (e) => {
        e.stopPropagation();
        chatPopup.classList.remove('open');
    });
}

function addChat(msg) {
    const body = document.querySelector('.chat-body');
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.textContent = msg;
    body.appendChild(userMsg);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot';
        const replies = {
            'Tư vấn size': 'Chúng tôi có bảng size chi tiết! Bạn cho biết chiều cao và cân nặng để tôi tư vấn nhé 😊',
            'Theo dõi đơn hàng': 'Bạn vui lòng cung cấp mã đơn hàng để tôi kiểm tra ngay!',
            'Đổi/trả hàng': 'Aristino hỗ trợ đổi trả miễn phí trong 30 ngày. Bạn muốn đổi sản phẩm nào?'
        };
        botMsg.textContent = replies[msg] || 'Cảm ơn bạn! Chuyên viên sẽ hỗ trợ trong giây lát.';
        body.appendChild(botMsg);
        body.scrollTop = body.scrollHeight;
    }, 800);
}

function sendChat() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim();
    if (!msg) return;
    addChat(msg);
    input.value = '';
}

document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChat();
});


// ===== HEADER SHADOW ON SCROLL =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        header.style.boxShadow = window.scrollY > 10
            ? '0 4px 30px rgba(0,0,0,0.25)'
            : 'none';
    }
});

// ===== CART COUNT (localStorage sync) =====
function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        const dot = document.getElementById('cartDot');
        if (dot) dot.textContent = count;
    } catch {}
}
updateCartCount();