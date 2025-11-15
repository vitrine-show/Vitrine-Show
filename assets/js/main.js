/* ============================================
   ESPIÃO DO NOVO ALGORITMO - JAVASCRIPT
   Landing Page Interativa
   ============================================ */

// ============================================
// DOM CONTENT LOADED
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initParticles();
    initScrollReveal();
    initSmoothScroll();
    initLeadForm();
    initCheckoutButton();
});

// ============================================
// PARTÍCULAS ANIMADAS NO BACKGROUND
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');

    // Propriedades aleatórias
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.1;

    // Estilos
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: #00D9FF;
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        opacity: ${opacity};
        box-shadow: 0 0 ${size * 2}px rgba(0, 217, 255, 0.5);
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
    `;

    container.appendChild(particle);
}

// Adicionar animação CSS para partículas via JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        25% {
            transform: translate(20px, -30px) scale(1.2);
        }
        50% {
            transform: translate(-15px, -50px) scale(0.8);
        }
        75% {
            transform: translate(30px, -20px) scale(1.1);
        }
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// SCROLL REVEAL (INTERSECTION OBSERVER)
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('section');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');

                // Animar filhos com delay
                const children = entry.target.querySelectorAll('.glass-card, .problem-card, .solution-card, .step-card, .audience-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(30px)';
                        child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignorar links vazios ou apenas "#"
            if (href === '#' || href === '') {
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FORMULÁRIO DE CAPTURA DE LEADS
// ============================================
function initLeadForm() {
    const form = document.getElementById('leadForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validação básica
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const termos = document.getElementById('termos').checked;

        // Validar nome
        if (nome.length < 2) {
            showNotification('Por favor, insira seu nome completo.', 'error');
            return;
        }

        // Validar email
        if (!isValidEmail(email)) {
            showNotification('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Validar termos
        if (!termos) {
            showNotification('Você precisa aceitar os termos para continuar.', 'error');
            return;
        }

        // Simular envio (substituir por integração real)
        simulateFormSubmission(nome, email);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission(nome, email) {
    const submitButton = document.querySelector('#leadForm .cta-button');
    const originalText = submitButton.textContent;

    // Desabilitar botão e mostrar loading
    submitButton.textContent = 'ENVIANDO...';
    submitButton.style.opacity = '0.7';
    submitButton.style.pointerEvents = 'none';

    // Simular delay de envio
    setTimeout(() => {
        // Aqui você integraria com sua API (Google Forms, Typeform, etc)
        console.log('Lead capturado:', { nome, email });

        // Mostrar sucesso
        showNotification('Guia enviado com sucesso! Confira seu e-mail 📧', 'success');

        // Resetar formulário
        document.getElementById('leadForm').reset();

        // Restaurar botão
        submitButton.textContent = originalText;
        submitButton.style.opacity = '1';
        submitButton.style.pointerEvents = 'auto';

        // Opcional: redirecionar para página de agradecimento
        // window.location.href = '/obrigado.html';
    }, 1500);
}

// ============================================
// BOTÃO DE CHECKOUT
// ============================================
function initCheckoutButton() {
    const checkoutButtons = document.querySelectorAll('#checkoutButton, .cta-primary');

    checkoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Se o link for vazio, prevenir comportamento padrão
            if (this.getAttribute('href') === '#' || !this.getAttribute('href')) {
                e.preventDefault();

                // Aqui você substituirá pelo link real da Kiwify
                const kiwifyLink = 'https://pay.kiwify.com.br/seu-produto-aqui';

                // Por enquanto, mostra notificação
                showNotification('Redirecionando para checkout seguro... 🔒', 'info');

                // Simular redirect (substituir por link real)
                setTimeout(() => {
                    // window.location.href = kiwifyLink;
                    console.log('Redirecionaria para:', kiwifyLink);
                }, 1000);
            }
        });
    });
}

// ============================================
// SISTEMA DE NOTIFICAÇÕES
// ============================================
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Definir cores baseadas no tipo
    const colors = {
        success: '#00D9FF',
        error: '#ff6b6b',
        info: '#5ce1e6'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: rgba(26, 35, 50, 0.95);
        backdrop-filter: blur(10px);
        border: 2px solid ${colors[type]};
        border-radius: 12px;
        color: white;
        font-weight: 600;
        box-shadow: 0 0 20px ${colors[type]}40;
        z-index: 9999;
        animation: slideInRight 0.4s ease;
        max-width: 300px;
    `;

    notification.textContent = message;

    // Adicionar ao body
    document.body.appendChild(notification);

    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

// Animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ============================================
// EFEITOS ADICIONAIS
// ============================================

// Efeito de digitação no título (opcional)
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Contador de visitantes (fake, para urgência)
function initVisitorCounter() {
    const counter = document.createElement('div');
    counter.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 0.75rem 1.25rem;
        background: rgba(26, 35, 50, 0.95);
        border: 2px solid #00D9FF;
        border-radius: 8px;
        color: #00D9FF;
        font-size: 0.875rem;
        font-weight: 600;
        box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);
        z-index: 1000;
    `;

    const baseVisitors = 127;
    const randomVisitors = Math.floor(Math.random() * 20) + baseVisitors;

    counter.innerHTML = `<span style="color: #5ce1e6;">🔴</span> ${randomVisitors} pessoas visualizando agora`;

    // Descomentar para ativar
    // document.body.appendChild(counter);
}

// Scroll progress bar
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00D9FF, #5ce1e6);
        box-shadow: 0 0 10px rgba(0, 217, 255, 0.8);
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Inicializar efeitos extras
initScrollProgress();

// ============================================
// EASTER EGG - Console Message
// ============================================
console.log('%c🎯 ESPIÃO DO NOVO ALGORITMO', 'color: #00D9FF; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 217, 255, 0.8);');
console.log('%cCriado por Adriele Almeida - Estrategista Digital', 'color: #5ce1e6; font-size: 12px;');
console.log('%cQuer crescer no Instagram? Este é o caminho. 🚀', 'color: #a8b2c8; font-size: 11px;');

// ============================================
// PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página carregada em ${Math.round(loadTime)}ms`);

    if (loadTime > 2000) {
        console.warn('⚠️ Tempo de carregamento acima do ideal. Considere otimizar recursos.');
    }
});
