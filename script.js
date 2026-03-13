// ========================================
// COURTENAY PARTNERS - BUSINESS PLAN DASHBOARD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initNavHighlight();
    initSmoothScroll();
    initScrollAnimations();
    initNameSelection();
    initPipelineFilters();
});

// ========================================
// PROGRESS BAR
// ========================================

function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const mainContent = document.querySelector('.main-content');
        const scrollHeight = mainContent.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
        progressBar.style.width = progress + '%';
    });
}

// ========================================
// NAVIGATION HIGHLIGHT
// ========================================

function initNavHighlight() {
    const sections = document.querySelectorAll('.section[id]');
    const navItems = document.querySelectorAll('.nav-item');
    
    const observerOptions = {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + id) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    document.querySelectorAll('.kpi-card, .thesis-point, .problem-row, .alternative-card, .revenue-card, .pipeline-stage, .sell-item, .task-item, .key-metric').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease-out;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .kpi-card:nth-child(1) { transition-delay: 0s; }
    .kpi-card:nth-child(2) { transition-delay: 0.1s; }
    .kpi-card:nth-child(3) { transition-delay: 0.2s; }
    .kpi-card:nth-child(4) { transition-delay: 0.3s; }
    
    .problem-row:nth-child(1) { transition-delay: 0s; }
    .problem-row:nth-child(2) { transition-delay: 0.1s; }
    .problem-row:nth-child(3) { transition-delay: 0.2s; }
    .problem-row:nth-child(4) { transition-delay: 0.3s; }
    
    .pipeline-stage:nth-child(1) { transition-delay: 0s; }
    .pipeline-stage:nth-child(2) { transition-delay: 0.15s; }
    .pipeline-stage:nth-child(3) { transition-delay: 0.3s; }
    .pipeline-stage:nth-child(4) { transition-delay: 0.45s; }
`;
document.head.appendChild(style);

// ========================================
// NAME SELECTION
// ========================================

function initNameSelection() {
    const nameOptions = document.querySelectorAll('.name-option');
    
    nameOptions.forEach(option => {
        option.addEventListener('click', () => {
            nameOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            
            // Update header if needed
            const selectedName = option.querySelector('.name-title').textContent;
            const pageHeader = document.querySelector('.page-header h1');
            if (pageHeader && pageHeader.closest('#overview')) {
                pageHeader.textContent = selectedName;
            }
            
            // Update sidebar
            const companyName = document.querySelector('.company-name');
            if (companyName) {
                companyName.textContent = selectedName;
            }
            
            // Update mark
            const companyMark = document.querySelector('.company-mark');
            if (companyMark) {
                const initials = selectedName.split(' ').map(w => w[0]).join('').substring(0, 2);
                companyMark.textContent = initials;
            }
        });
    });
}

// ========================================
// PIPELINE FILTERS
// ========================================

function initPipelineFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.pipeline-table tbody tr');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter rows
            rows.forEach(row => {
                if (filter === 'all' || row.dataset.country === filter) {
                    row.style.display = '';
                    row.style.opacity = '1';
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Update summary stats based on visible rows
            updatePipelineStats(filter);
        });
    });
}

function updatePipelineStats(filter) {
    const rows = document.querySelectorAll('.pipeline-table tbody tr');
    let count = 0;
    let totalValue = 0;
    let yieldSum = 0;
    let yieldCount = 0;
    
    rows.forEach(row => {
        if (filter === 'all' || row.dataset.country === filter) {
            count++;
            // Parse price from text (e.g., "$42M" -> 42000000)
            const priceCell = row.cells[4];
            if (priceCell) {
                const priceText = priceCell.textContent;
                const match = priceText.match(/\$([\d.]+)M/);
                if (match) {
                    totalValue += parseFloat(match[1]) * 1000000;
                }
            }
            // Parse yield
            const yieldCell = row.cells[5];
            if (yieldCell && yieldCell.textContent !== '—') {
                const yieldMatch = yieldCell.textContent.match(/([\d.]+)%/);
                if (yieldMatch) {
                    yieldSum += parseFloat(yieldMatch[1]);
                    yieldCount++;
                }
            }
        }
    });
    
    // Update KPIs
    const kpis = document.querySelectorAll('.pipeline-kpi');
    if (kpis[0]) kpis[0].querySelector('.pkpi-value').textContent = count;
    if (kpis[1]) kpis[1].querySelector('.pkpi-value').textContent = '$' + Math.round(totalValue / 1000000) + 'M';
    if (kpis[2] && yieldCount > 0) kpis[2].querySelector('.pkpi-value').textContent = (yieldSum / yieldCount).toFixed(1) + '%';
    if (kpis[3]) {
        const markets = filter === 'all' ? 4 : 1;
        kpis[3].querySelector('.pkpi-value').textContent = markets;
    }
}

// ========================================
// COUNTER ANIMATION (for KPIs)
// ========================================

function animateCounters() {
    const counters = document.querySelectorAll('.kpi-value');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const match = text.match(/[\d.]+/);
        
        if (match) {
            const target = parseFloat(match[0]);
            const suffix = text.replace(match[0], '');
            let current = 0;
            const increment = target / 30;
            const isFloat = target % 1 !== 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
            }, 30);
        }
    });
}

// Trigger counter animation when visible
const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            kpiObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const kpiGrid = document.querySelector('.kpi-grid');
if (kpiGrid) {
    kpiObserver.observe(kpiGrid);
}
