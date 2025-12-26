// map.js - جافاسكريبت خاص بصفحة الخريطة

document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة الخريطة جاهزة للعمل');
    
    // تحديث السنة الحالية
    updateCurrentYear();
    
    // تهيئة وظائف الخريطة
    initMapPage();
    
    // ربط أحداث أزرار التحكم
    bindMapControls();
    
    // تحسين تجربة المستخدم
    enhanceUserExperience();
});

// تهيئة صفحة الخريطة
function initMapPage() {
    // تعيين إحداثيات المكتب
    window.officeLocation = {
        lat: 16.8891341,
        lng: 42.5767392,
        address: "GGDB7677، 2618، حي المطار، جازان 82722، السعودية",
        phone: "+966552425251",
        email: "info@alkfaih.com"
    };
}

// ربط أحداث أزرار التحكم
function bindMapControls() {
    // زر التكبير
    const zoomInBtn = document.querySelector('.zoom-in');
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            zoomMapIn();
        });
    }
    
    // زر التصغير
    const zoomOutBtn = document.querySelector('.zoom-out');
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            zoomMapOut();
        });
    }
    
    // زر إعادة التعيين
    const resetBtn = document.querySelector('.reset-map');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetMapView();
        });
    }
    
    // زر الحصول على اتجاهات
    const directionsBtn = document.querySelector('.get-directions');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            getDirectionsToOffice();
        });
    }
}

// تحسين تجربة المستخدم
function enhanceUserExperience() {
    // إضافة تأثيرات للدبوس
    const marker = document.querySelector('.custom-marker');
    if (marker) {
        // تفعيل الحركة عند تحميل الصفحة
        setTimeout(() => {
            marker.style.animation = 'bounce 2s infinite';
        }, 1000);
        
        // تأثير عند التمرير فوق الدبوس
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'translate(-50%, -100%) scale(1.2)';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(-50%, -100%) scale(1)';
        });
    }
    
    // إضافة تأثيرات لأزرار التحكم
    const mapButtons = document.querySelectorAll('.map-btn');
    mapButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// تكبير الخريطة
function zoomMapIn() {
    const iframe = document.querySelector('#customMap iframe');
    if (!iframe) return;
    
    // الحصول على مستوى التكبير الحالي
    const currentSrc = iframe.src;
    const zoomMatch = currentSrc.match(/zoom=(\d+)/);
    let currentZoom = zoomMatch ? parseInt(zoomMatch[1]) : 16;
    
    // زيادة مستوى التكبير (بحد أقصى 20)
    const newZoom = Math.min(currentZoom + 1, 20);
    
    // تحديث رابط الخريطة بمستوى التكبير الجديد
    const newSrc = currentSrc.replace(/zoom=\d+/, `zoom=${newZoom}`);
    
    // تطبيق التغيير
    iframe.src = newSrc;
    
    // عرض رسالة تأكيد
    showMessage('تم تكبير الخريطة', 'success');
}

// تصغير الخريطة
function zoomMapOut() {
    const iframe = document.querySelector('#customMap iframe');
    if (!iframe) return;
    
    // الحصول على مستوى التكبير الحالي
    const currentSrc = iframe.src;
    const zoomMatch = currentSrc.match(/zoom=(\d+)/);
    let currentZoom = zoomMatch ? parseInt(zoomMatch[1]) : 16;
    
    // تقليل مستوى التكبير (بحد أدنى 10)
    const newZoom = Math.max(currentZoom - 1, 10);
    
    // تحديث رابط الخريطة بمستوى التكبير الجديد
    const newSrc = currentSrc.replace(/zoom=\d+/, `zoom=${newZoom}`);
    
    // تطبيق التغيير
    iframe.src = newSrc;
    
    // عرض رسالة تأكيد
    showMessage('تم تصغير الخريطة', 'success');
}

// إعادة تعيين عرض الخريطة
function resetMapView() {
    const iframe = document.querySelector('#customMap iframe');
    if (!iframe) return;
    
    // الرابط الأصلي للخريطة
    const baseUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.759634755655!2d42.57454537505811!3d16.88913408055591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15653d3d0f2d11f5%3A0x7e30c1b4d5c8d2c2!2sGGDB7677%2C%202618%2C%20%D8%AD%D9%8A%20%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%B1%2C%20%D8%AC%D8%A7%D8%B2%D8%A7%D9%86%2082722%2C%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9!5e0!3m2!1sen!2sus!4v1648159472347!5m2!1sen!2sus";
    
    // تطبيق التغيير
    iframe.src = baseUrl;
    
    // عرض رسالة تأكيد
    showMessage('تم إعادة تعيين الخريطة', 'success');
}

// الحصول على اتجاهات إلى المكتب
function getDirectionsToOffice() {
    if (!window.officeLocation || !window.officeLocation.address) {
        showMessage('عذراً، لا يمكن الحصول على الاتجاهات حالياً', 'error');
        return;
    }
    
    const destination = encodeURIComponent(window.officeLocation.address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // فتح الاتجاهات في نافذة جديدة
    const newWindow = window.open(directionsUrl, '_blank', 'noopener,noreferrer');
    
    if (newWindow) {
        showMessage('جارٍ فتح خرائط جوجل للاتجاهات...', 'info');
    } else {
        showMessage('عذراً، يرجى السماح بالنوافذ المنبثقة', 'warning');
    }
}

// تحديث السنة الحالية
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });
}

// عرض رسائل تأكيد
function showMessage(message, type = 'info') {
    // إزالة أي رسالة سابقة
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // إنشاء عنصر الرسالة
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast message-${type}`;
    messageDiv.innerHTML = `
        <span>${message}</span>
        <button class="message-close" aria-label="إغلاق">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة الأنماط
    messageDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Tajawal', sans-serif;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideUp 0.3s ease-out;
    `;
    
    // زر الإغلاق
    const closeBtn = messageDiv.querySelector('.message-close');
    closeBtn.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        padding: 0;
        display: flex;
        align-items: center;
    `;
    
    closeBtn.addEventListener('click', () => {
        messageDiv.remove();
    });
    
    // إضافة الرسالة إلى الصفحة
    document.body.appendChild(messageDiv);
    
    // إضافة أنيميشن
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(100%); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%) translateY(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // إزالة الرسالة تلقائياً بعد 5 ثواني
    setTimeout(() => {
        messageDiv.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 5000);
}
