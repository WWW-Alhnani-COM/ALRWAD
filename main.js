// main.js - الملف الرئيسي لجافاسكريبت

document.addEventListener('DOMContentLoaded', function() {
    // تحديث السنة الحالية في الفوتر
    updateCurrentYear();
    
    // إعداد قائمة الهامبرجر
    setupHamburgerMenu();
    
    // تحسين التنقل السلس
    setupSmoothScrolling();
    
    // إعداد تأثيرات التحميل
    setupLoadingEffects();
    
    // إعداد تأثيرات التمرير
    setupScrollEffects();
    
    // إعداد تحميل الصور الكسول
    setupLazyLoading();
});

// تحديث السنة الحالية
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });
}

// إعداد قائمة الهامبرجر
function setupHamburgerMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const overlayMenu = document.getElementById('overlayMenu');
    const menuIcon = document.getElementById('menuIcon');
    
    // إذا لم توجد عناصر القائمة، لا نفعل شيئاً
    if (!menuToggle || !navLinks) return;
    
    // وظيفة فتح/إغلاق القائمة
    function toggleMenu() {
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // فتح القائمة
    function openMenu() {
        navLinks.classList.add('active');
        if (overlayMenu) overlayMenu.classList.add('active');
        menuToggle.classList.add('active');
        document.body.classList.add('menu-open');
        
        if (menuIcon) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
        
        // تحديث وصف زر الهامبرجر
        menuToggle.setAttribute('aria-label', 'إغلاق القائمة');
        menuToggle.setAttribute('aria-expanded', 'true');
        
        // تسجيل الحدث (لأغراض التحليل)
        logEvent('menu_open', 'navigation');
    }
    
    // إغلاق القائمة
    function closeMenu() {
        navLinks.classList.remove('active');
        if (overlayMenu) overlayMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
        
        // تحديث وصف زر الهامبرجر
        menuToggle.setAttribute('aria-label', 'فتح القائمة');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
    
    // إضافة event listeners
    menuToggle.addEventListener('click', toggleMenu);
    
    if (overlayMenu) {
        overlayMenu.addEventListener('click', closeMenu);
    }
    
    // إغلاق القائمة عند النقر على أي رابط
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // إغلاق القائمة عند الضغط على زر Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // إغلاق القائمة عند تغيير حجم النافذة إلى حجم كبير
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // تحسين إمكانية الوصول للوحة المفاتيح
    menuToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });
}

// تحسين التنقل السلس
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // تجاهل الروابط الفارغة
            if (href === '#' || href === '') return;
            
            // إلغاء السلوك الافتراضي للروابط الداخلية
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // تحديث URL بدون إعادة تحميل الصفحة
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// إعداد تأثيرات التحميل
function setupLoadingEffects() {
    // إضافة تأثيرات للشعار
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // تأثير النقر
        logo.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // تأثيرات للإحصائيات
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // تأثير النقر
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // تأثيرات للأزرار
    const buttons = document.querySelectorAll('.btn-whatsapp, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // تأثيرات لعناصر الميزات
    const features = document.querySelectorAll('.feature-item');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
        });
    });
}

// إعداد تأثيرات التمرير
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // تأثير الشفافية عند التمرير
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            navbar.style.padding = '15px 5%';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '20px 5%';
        }
        
        // تأثير إظهار/إخفاء الهيدر عند التمرير
        if (window.innerWidth > 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // التمرير لأسفل
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // التمرير لأعلى
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        navbar.style.transition = 'all 0.3s ease';
        lastScrollTop = scrollTop;
        
        // إضافة تأثير للعناصر عند التمرير
        animateOnScroll();
    });
    
    // إضافة تأثير ظهور العناصر عند التمرير
    function animateOnScroll() {
        const elements = document.querySelectorAll('.content-section, .feature-item, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // إعداد القيم الأولية للعناصر المتحركة
    document.querySelectorAll('.content-section, .feature-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // تفعيل مرة أولى
    setTimeout(animateOnScroll, 100);
}

// إعداد تحميل الصور الكسول
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // استبدال src بالصورة الحقيقية
                img.src = img.dataset.src;
                
                // إزالة سمة data-src
                delete img.dataset.src;
                
                // إضافة تأثير عند تحميل الصورة
                img.onload = function() {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 50);
                };
                
                // إيقاف مراقبة الصورة
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// وظائف عامة
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// دالة للتحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// دالة للتحقق من صحة رقم الهاتف السعودي
function isValidSaudiPhone(phone) {
    const phoneRegex = /^(009665|9665|\+9665|05)([0-9]{8})$/;
    return phoneRegex.test(phone);
}

// دالة تسجيل الأحداث (لأغراض التحليل)
function logEvent(eventName, eventCategory, eventLabel = null) {
    // يمكنك تفعيل Google Analytics هنا
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': eventCategory,
            'event_label': eventLabel
        });
    }
    */
    
    // أو استخدام console.log لأغراض التطوير
    console.log(`Event: ${eventName}, Category: ${eventCategory}, Label: ${eventLabel || 'N/A'}`);
}

// دالة لإضافة رسالة ترحيب في console
console.log('%c🚀 مرحباً بك في موقع كفاءات العالم للاستقدام! %c\nتم التطوير بعناية لتجربة مستخدم متميزة.', 
    'color: #25d366; font-size: 16px; font-weight: bold;',
    'color: #3498db; font-size: 12px;'
);

// تحسين تجربة اللمس على الأجهزة المحمولة
document.addEventListener('touchstart', function() {}, { 
    passive: true 
});

// منع السلوك الافتراضي لبعض الأحداث
document.addEventListener('contextmenu', function(e) {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
});

// دالة مساعدة لإضافة تأثير النقر
function addClickEffect(element) {
    element.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    element.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // لدعم اللمس
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    element.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
}

// تطبيق تأثير النقر على جميع الأزرار المهمة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const interactiveElements = document.querySelectorAll('button, .btn-whatsapp, .btn-outline, .feature-item, .stat-item');
        interactiveElements.forEach(element => {
            addClickEffect(element);
        });
    }, 1000);
});

// دالة لإظهار/إخفاء زر التمرير لأعلى
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;
    
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
        setTimeout(() => {
            if (scrollTopBtn.style.opacity === '0') {
                scrollTopBtn.style.display = 'none';
            }
        }, 300);
    }
});

// إضافة زر التمرير لأعلى إذا لم يكن موجوداً
function addScrollTopButton() {
    if (document.getElementById('scrollTopBtn')) return;
    
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'التمرير إلى الأعلى');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        background: var(--primary-color);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
    });
    
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    document.body.appendChild(scrollTopBtn);
}

// إضافة زر التمرير لأعلى عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addScrollTopButton, 1000);
});
