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
    initPipelineMap();
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
// PIPELINE MAP
// ========================================

let pipelineMap = null;
let mapMarkers = [];

function initPipelineMap() {
    const mapContainer = document.getElementById('pipeline-map');
    if (!mapContainer || typeof L === 'undefined') return;
    
    // Initialize map centered on APAC
    pipelineMap = L.map('pipeline-map', {
        scrollWheelZoom: false
    }).setView([20, 120], 3);
    
    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(pipelineMap);
    
    // Color mapping for countries
    const countryColors = {
        'Japan': '#3B82F6',      // Blue
        'Australia': '#10B981',   // Green
        'Singapore': '#F59E0B',   // Orange
        'Hong Kong': '#EF4444'    // Red
    };
    
    // Get all property rows
    const rows = document.querySelectorAll('.pipeline-table tbody tr');
    
    rows.forEach(row => {
        const lat = parseFloat(row.dataset.lat);
        const lng = parseFloat(row.dataset.lng);
        const country = row.dataset.country;
        const isBoutique = row.classList.contains('boutique');
        
        if (isNaN(lat) || isNaN(lng)) return;
        
        const name = row.querySelector('.property-name')?.textContent || 'Property';
        const address = row.querySelector('.property-address')?.textContent || '';
        const type = row.querySelector('.type-badge')?.textContent || '';
        const price = row.cells[4]?.textContent || '';
        const yieldPct = row.cells[5]?.textContent || '';
        const link = row.querySelector('.listing-link')?.href || '#';
        
        // Create custom marker - purple for boutique
        const markerColor = isBoutique ? '#8B5CF6' : (countryColors[country] || '#3B82F6');
        const markerHtml = `<div style="
            background: ${markerColor};
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`;
        
        const icon = L.divIcon({
            html: markerHtml,
            className: 'custom-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
        
        const marker = L.marker([lat, lng], { icon }).addTo(pipelineMap);
        
        // Create popup content
        const popupContent = `
            <div class="map-popup">
                <h4>${name}</h4>
                <p>${address}</p>
                <p><strong>${type}</strong> • <span class="popup-price">${price}</span> • ${yieldPct}</p>
                <a href="${link}" target="_blank" style="color: #3B82F6; font-size: 12px;">View Listing →</a>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.country = country;
        marker.isBoutique = isBoutique;
        mapMarkers.push(marker);
    });
}

function filterMapMarkers(filter) {
    if (!pipelineMap) return;
    
    mapMarkers.forEach(marker => {
        if (filter === 'all') {
            marker.addTo(pipelineMap);
        } else if (filter === 'boutique') {
            if (marker.isBoutique) {
                marker.addTo(pipelineMap);
            } else {
                pipelineMap.removeLayer(marker);
            }
        } else if (marker.country === filter) {
            marker.addTo(pipelineMap);
        } else {
            pipelineMap.removeLayer(marker);
        }
    });
    
    // Fit bounds to visible markers
    let visibleMarkers;
    if (filter === 'all') {
        visibleMarkers = mapMarkers;
    } else if (filter === 'boutique') {
        visibleMarkers = mapMarkers.filter(m => m.isBoutique);
    } else {
        visibleMarkers = mapMarkers.filter(m => m.country === filter);
    }
    
    if (visibleMarkers.length > 0) {
        const group = L.featureGroup(visibleMarkers);
        pipelineMap.fitBounds(group.getBounds().pad(0.1));
    }
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
                if (filter === 'all') {
                    row.style.display = '';
                    row.style.opacity = '1';
                } else if (filter === 'boutique') {
                    // Show only boutique broker deals
                    if (row.classList.contains('boutique')) {
                        row.style.display = '';
                        row.style.opacity = '1';
                    } else {
                        row.style.display = 'none';
                    }
                } else if (row.dataset.country === filter) {
                    row.style.display = '';
                    row.style.opacity = '1';
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Update summary stats based on visible rows
            updatePipelineStats(filter);
            
            // Filter map markers
            filterMapMarkers(filter);
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
