// map.js - ملف جافاسكريبت للخريطة

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة وظائف الخريطة
    initMapFunctions();
    
    // إعداد مراقبة ظهور قسم الخريطة
    setupMapObserver();
    
    // ربط أحداث أزرار التحكم
    bindMapControlEvents();
});

// تهيئة وظائف الخريطة
function initMapFunctions() {
    console.log('تهيئة وظائف الخريطة...');
    
    // تعيين إحداثيات المكتب
    window.officeLocation = {
        lat: 16.8891341,
        lng: 42.5767392,
        address: "GGDB7677، 2618، حي المطار، جازان 82722، السعودية"
    };
    
    // تعيين مستوى التكبير الافتراضي
    window.currentZoom = 16;
}

// إعداد مراقبة ظهور قسم الخريطة
function setupMapObserver() {
    const mapSection = document.querySelector('.map-section');
    
    if (mapSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // إضافة تأثير للدبوس عند ظهور الخريطة
                    activateMarkerAnimation();
                    console.log('قسم الخريطة مرئي الآن');
                }
            });
        }, { 
            threshold: 0.3 // 30% من العنصر مرئي
        });
        
        observer.observe(mapSection);
    }
}

// ربط أحداث أزرار التحكم
function bindMapControlEvents() {
    // زر التكبير
    const zoomInBtn = document.querySelector('.zoom-in');
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', zoomMapIn);
    }
    
    // زر التصغير
    const zoomOutBtn = document.querySelector('.zoom-out');
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', zoomMapOut);
    }
    
    // زر إعادة التعيين
    const resetBtn = document.querySelector('.reset-map');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetMapView);
    }
    
    // زر الحصول على اتجاهات
    const directionsBtn = document.querySelector('.get-directions');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', getDirectionsToOffice);
    }
    
    // تأثيرات تمرير الماوس على أزرار التحكم
    const mapButtons = document.querySelectorAll('.map-btn');
    mapButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// وظائف التحكم في الخريطة

// تكبير الخريطة
function zoomMapIn() {
    const iframe = document.querySelector('#customMap iframe');
    if (!iframe) return;
    
    window.currentZoom = Math.min(window.currentZoom + 1, 20); // الحد الأقصى للتكبير
    updateMapZoom(iframe);
    
    // تأثير مرئي للتغذية الراجعة
    provideVisualFeedback('.zoom-in', 'تم التكبير');
}

// تصغير الخريطة
function zoomMapOut() {
    const iframe = document.querySelector('#customMap iframe');
    if (!iframe) return;
    
    window.currentZoom = Math.max(window.currentZoom - 1, 10); // الحد الأدنى للتكبير
    updateMapZoom(iframe);
    
    // تأثير مرئي للتغذية الراجعة
    provideVisualFeedback('.zoom-out', 'تم التصغير');
}

// تحديث مستوى التكبير في الخريطة
function updateMapZoom(iframe) {
    const currentSrc = iframe.src;
    const newSrc = currentSrc.replace(/zoom=\d+/, `zoom=${window.currentZoom}`);
    
    // استخدام requestAnimationFrame لتجنب وميض الصفحة
    requestAnimationFrame(() => {
        iframe.src = newSrc;
        console.log(`تم تحديث مستوى التكبير إلى: ${window.currentZoom}`);
    });
}

// إعادة تعيين عرض الخريطة
function resetMapView() {
    const iframe = document.querySelector('#customMap iframe');
    if (!iframe) return;
    
    window.currentZoom = 16;
    const baseUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.759634755655!2d42.57454537505811!3d16.88913408055591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15653d3d0f2d11f5%3A0x7e30c1b4d5c8d2c2!2sGGDB7677%2C%202618%2C%20%D8%AD%D9%8A%20%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%B1%2C%20%D8%AC%D8%A7%D8%B2%D8%A7%D9%86%2082722%2C%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9!5e0!3m2!1sen!2sus!4v1648159472347!5m2!1sen!2sus";
    
    iframe.src = baseUrl;
    
    // تأثير مرئي للتغذية الراجعة
    provideVisualFeedback('.reset-map', 'تم إعادة تعيين الخريطة');
    console.log('تم إعادة تعيين الخريطة إلى الوضع الافتراضي');
}

// الحصول على اتجاهات إلى المكتب
function getDirectionsToOffice() {
    if (!window.officeLocation || !window.officeLocation.address) return;
    
    const destination = encodeURIComponent(window.officeLocation.address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    
    // فتح الاتجاهات في نافذة جديدة
    window.open(directionsUrl, '_blank', 'noopener,noreferrer');
    
    // تتبع الحدث
    console.log('تم طلب الاتجاهات إلى المكتب');
    
    // تأثير مرئي للتغذية الراجعة
    provideVisualFeedback('.get-directions', 'جارٍ فتح الاتجاهات...');
}

// تفعيل حركة الدبوس
function activateMarkerAnimation() {
    const marker = document.querySelector('.custom-marker');
    if (marker) {
        marker.style.animation = 'bounce 2s infinite';
        
        // إضافة تأثير اهتزاز لمرة واحدة
        setTimeout(() => {
            marker.style.transform = 'translate(-50%, -100%) scale(1.1)';
            setTimeout(() => {
                marker.style.transform = 'translate(-50%, -100%) scale(1)';
            }, 300);
        }, 500);
    }
}

// توفير تغذية راجعة مرئية
function provideVisualFeedback(selector, message) {
    const button = document.querySelector(selector);
    if (!button) return;
    
    const originalText = button.innerHTML;
    
    // تغيير مؤقت للنص
    button.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    button.style.backgroundColor = '#2ecc71';
    
    // العودة إلى النص الأصلي بعد 1.5 ثانية
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = '';
        
        if (selector.includes('directions')) {
            button.style.backgroundColor = '#25d366';
        }
    }, 1500);
    
    // تأثير اهتزاز
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = '';
    }, 10);
}

// الحصول على إحداثيات الموقع الحالي للمستخدم (يتطلب HTTPS)
function getUserLocation() {
    if (!navigator.geolocation) {
        console.log('المتصفح لا يدعم تحديد الموقع');
        return null;
    }
    
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                console.error('خطأ في الحصول على الموقع:', error.message);
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    });
}

// حساب المسافة بين موقعين (صيغة هافرساين)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // نصف قطر الأرض بالكيلومترات
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance.toFixed(1); // كيلومترات بمعدل منزلة عشرية واحدة
}

// تصدير الوظائف للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMapFunctions,
        setupMapObserver,
        bindMapControlEvents,
        zoomMapIn,
        zoomMapOut,
        resetMapView,
        getDirectionsToOffice,
        getUserLocation,
        calculateDistance
    };
}
