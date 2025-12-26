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
    
    // إضافة زر التمرير لأعلى
    addScrollTopButton();
    
    // إعداد تأثيرات الظهور عند التمرير
    setupScrollAnimations();
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
        
        // تغيير الأيقونة
        if (menuIcon) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
        
        // تحديث وصف زر الهامبرجر
        menuToggle.setAttribute('aria-label', 'إغلاق القائمة');
        menuToggle.setAttribute('aria-expanded', 'true');
        
        // إخفاء شريط التمرير
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }
    
    // إغلاق القائمة
    function closeMenu() {
        navLinks.classList.remove('active');
        if (overlayMenu) overlayMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // إرجاع الأيقونة
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
        
        // تحديث وصف زر الهامبرجر
        menuToggle.setAttribute('aria-label', 'فتح القائمة');
        menuToggle.setAttribute('aria-expanded', 'false');
        
        // إعادة شريط التمرير
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
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

// باقي الدوال كما هي...

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
    });
}

// إعداد تأثيرات التمرير
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
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
    });
}

// إضافة زر التمرير لأعلى
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
        z-index: 999;
        opacity: 0;
    `;
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // التحكم في ظهور الزر عند التمرير
    window.addEventListener('scroll', function() {
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (!scrollTopBtn) return;
        
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
            setTimeout(() => {
                scrollTopBtn.style.opacity = '1';
            }, 10);
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (scrollTopBtn.style.opacity === '0') {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    document.body.appendChild(scrollTopBtn);
}

// إعداد تأثيرات الظهور عند التمرير
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-section, .feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}
