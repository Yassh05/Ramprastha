 //Properties management and filtering

class PropertiesManager {
    constructor() {
        this.properties = [
            {
                id: 1,
                title: "Ramprastha Edge Towers",
                location: "Sector 37D, Gurgaon",
                price: "₹1.2 Cr - ₹2.8 Cr",
                image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
                beds: 3,
                baths: 2,
                area: 1450,
                parking: 1,
                type: "Apartment",
                status: "Ready to Move",
                description: "Modern high-rise apartments with panoramic city views and premium amenities.",
                features: ["Swimming Pool", "Gym", "Club House", "24/7 Security", "Power Backup", "Parking"]
            },
            {
                id: 2,
                title: "Ramprastha Rise",
                location: "Sector 37D, Gurgaon",
                price: "₹85 Lac - ₹1.5 Cr",
                image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
                beds: 2,
                baths: 2,
                area: 1200,
                parking: 1,
                type: "Apartment",
                status: "Under Construction",
                description: "Contemporary living spaces designed for young professionals and growing families.",
                features: ["Modern Kitchen", "Balcony", "Security", "Parking", "Green Spaces", "Shopping Complex"]
            },
         {
                id: 3,
                title: "Ramprastha Primera",
                location: "Sector 37D, Gurgaon",
                price: "₹1.2 Cr - ₹2.8 Cr",
                image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
                beds: 3,
                baths: 2,
                area: 1450,
                parking: 1,
                type: "Apartment",
                status: "Ready to Move",
                description: "Modern high-rise apartments with panoramic city views and premium amenities.",
                features: ["Swimming Pool", "Gym", "Club House", "24/7 Security", "Power Backup", "Parking"]
            },
            {
                id: 4,
                title: "Ramprastha The View",
                location: "Sector 37D, Gurgaon",
                price: "₹1.8 Cr - ₹3.2 Cr",
                image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
                beds: 4,
                baths: 3,
                area: 2100,
                parking: 2,
                type: "Apartment",
                status: "Ready to Move",
                description: "Spacious luxury apartments with breathtaking views and world-class amenities.",
                features: ["Swimming Pool", "Spa", "Business Center", "Children's Play Area", "Landscaped Gardens", "Concierge"]
            },
         {
                id: 5,
                title: "Ramprastha SKYZ",
                location: "Sector 37D, Gurgaon",
                price: "₹1.8 Cr - ₹3.2 Cr",
                image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
                beds: 4,
                baths: 3,
                area: 2100,
                parking: 2,
                type: "Apartment",
                status: "Ready to Move",
                description: "Spacious luxury apartments with breathtaking views and world-class amenities.",
                features: ["Swimming Pool", "Spa", "Business Center", "Children's Play Area", "Landscaped Gardens", "Concierge"]
            },
         {
                id: 6,
                title: "Ramprastha Atrium",
                location: "Sector 37D, Gurgaon",
                price: "₹1.8 Cr - ₹3.2 Cr",
                image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
                beds: 4,
                baths: 3,
                area: 2100,
                parking: 2,
                type: "Apartment",
                status: "Ready to Move",
                description: "Spacious luxury apartments with breathtaking views and world-class amenities.",
                features: ["Swimming Pool", "Spa", "Business Center", "Children's Play Area", "Landscaped Gardens", "Concierge"]
            },
            {
                id: 7,
                title: "Ramprastha Platinum",
                location: "Sector 37D, Gurgaon",
                price: "₹2.5 Cr - ₹4.8 Cr",
                image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
                beds: 4,
                baths: 4,
                area: 2800,
                parking: 2,
                type: "Penthouse",
                status: "Ready to Move",
                description: "Ultra-luxury penthouses with private terraces and exclusive amenities.",
                features: ["Private Terrace", "Jacuzzi", "Home Theater", "Wine Cellar", "Private Elevator", "Butler Service"]
            },
            {
                id: 8,
                title: "Ramprastha City",
                location: "Sector 37D, Gurgaon",
                price: "₹95 Lac - ₹1.8 Cr",
                image: "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800",
                beds: 3,
                baths: 2,
                area: 1350,
                parking: 1,
                type: "Apartment",
                status: "Launching Soon",
                description: "Integrated township with residential, commercial, and recreational facilities.",
                features: ["Shopping Mall", "School", "Hospital", "Metro Connectivity", "Parks", "Sports Complex"]
            },
            {
                id: 9,
                title: "Ramprastha Prima",
                location: "Sector 37D, Gurgaon",
                price: "₹1.5 Cr - ₹2.9 Cr",
                image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
                beds: 3,
                baths: 3,
                area: 1650,
                parking: 1,
                type: "Apartment",
                status: "Ready to Move",
                description: "Premium apartments with innovative design and sustainable living features.",
                features: ["Solar Panels", "Rainwater Harvesting", "Smart Home", "EV Charging", "Yoga Deck", "Organic Garden"]
            }
        ];
        
        this.filteredProperties = [...this.properties];
        this.init();
    }

    init() {
        this.renderProperties();
        this.setupLazyLoading();
    }

    renderProperties() {
        const container = document.getElementById('propertiesGrid');
        if (!container) return;

        container.innerHTML = '';

        if (this.filteredProperties.length === 0) {
            container.innerHTML = `
                <div class="no-properties">
                    <div class="no-properties-content">
                        <svg class="no-properties-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                            <path d="21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h3>No Properties Found</h3>
                        <p>Try adjusting your search criteria to find more properties.</p>
                    </div>
                </div>
            `;
            return;
        }

        this.filteredProperties.forEach((property, index) => {
            const propertyCard = this.createPropertyCard(property, index);
            container.appendChild(propertyCard);
        });

        // Trigger animations for new elements
        this.triggerAnimations();
    }

    createPropertyCard(property, index) {
        const card = document.createElement('div');
        card.className = 'property-card fade-in-on-scroll';
        card.style.animationDelay = `${index * 100}ms`;
        card.setAttribute('data-property-id', property.id);

        card.innerHTML = `
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <div class="property-status status-${this.getStatusClass(property.status)}">
                    ${property.status}
                </div>
                <div class="property-type">
                    ${property.type}
                </div>
            </div>
            <div class="property-details">
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>${property.location}</span>
                </div>
                <div class="property-features">
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 7H17C18.1046 7 19 7.89543 19 9V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V9C5 7.89543 5.89543 7 7 7Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 3V7" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <span>${property.beds}</span>
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 14C5.9 14 5 14.9 5 16V20H19V16C19 14.9 18.1 14 17 14H7Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M9 10V6C9 5.46957 9.21071 4.96086 9.58579 4.58579C9.96086 4.21071 10.4696 4 11 4H13C13.5304 4 14.0391 4.21071 14.4142 4.58579C14.7893 4.96086 15 5.46957 15 6V10" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <span>${property.baths}</span>
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                            <rect x="7" y="7" width="10" height="10" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <span>${property.area} sq ft</span>
                    </div>
                    <div class="feature-item">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 16V12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12V16" stroke="currentColor" stroke-width="2"/>
                            <path d="M18 8C20.2091 8 22 9.79086 22 12V20H2V12C2 9.79086 3.79086 8 6 8L18 8Z" stroke="currentColor" stroke-width="2"/>
                            <circle cx="7" cy="16" r="2" stroke="currentColor" stroke-width="2"/>
                            <circle cx="17" cy="16" r="2" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <span>${property.parking}</span>
                    </div>
                </div>
                <div class="property-footer">
                    <div class="property-price">${property.price}</div>
                    <button class="view-details-btn" onclick="propertiesManager.showPropertyDetails(${property.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    getStatusClass(status) {
        switch (status) {
            case 'Ready to Move':
                return 'ready';
            case 'Under Construction':
                return 'construction';
            case 'Launching Soon':
                return 'launching';
            default:
                return 'ready';
        }
    }

    filterProperties(searchTerm = '', selectedType = 'All') {
        this.filteredProperties = this.properties.filter(property => {
            const matchesSearch = 
                property.title.toLowerCase().includes(searchTerm) ||
                property.location.toLowerCase().includes(searchTerm) ||
                property.description.toLowerCase().includes(searchTerm);
            
            const matchesType = selectedType === 'All' || property.type === selectedType;
            
            return matchesSearch && matchesType;
        });
        
        this.renderProperties();
    }

    showPropertyDetails(propertyId) {
        const property = this.properties.find(p => p.id === propertyId);
        if (!property) return;

        this.createPropertyModal(property);
    }

    createPropertyModal(property) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.property-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'property-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${property.title}</h2>
                    <button class="modal-close" onclick="this.closest('.property-modal').remove()">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
                            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${property.image}" alt="${property.title}">
                    </div>
                    <div class="modal-details">
                        <div class="property-info">
                            <div class="info-item">
                                <span class="info-label">Location:</span>
                                <span class="info-value">${property.location}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Price:</span>
                                <span class="info-value">${property.price}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Type:</span>
                                <span class="info-value">${property.type}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Status:</span>
                                <span class="info-value status-${this.getStatusClass(property.status)}">${property.status}</span>
                            </div>
                        </div>
                        
                        <div class="property-specs">
                            <div class="spec-item">
                                <div class="spec-value">${property.beds}</div>
                                <div class="spec-label">Bedrooms</div>
                            </div>
                            <div class="spec-item">
                                <div class="spec-value">${property.baths}</div>
                                <div class="spec-label">Bathrooms</div>
                            </div>
                            <div class="spec-item">
                                <div class="spec-value">${property.area}</div>
                                <div class="spec-label">Sq Ft</div>
                            </div>
                            <div class="spec-item">
                                <div class="spec-value">${property.parking}</div>
                                <div class="spec-label">Parking</div>
                            </div>
                        </div>
                        
                        <div class="property-description">
                            <h4>Description</h4>
                            <p>${property.description}</p>
                        </div>
                        
                        <div class="property-amenities">
                            <h4>Features & Amenities</h4>
                            <div class="amenities-grid">
                                ${property.features.map(feature => `
                                    <div class="amenity-item">
                                        <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                                        </svg>
                                        <span>${feature}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="modal-actions">
                            <button class="btn btn-primary" onclick="propertiesManager.requestCallback(${property.id})">
                                Request Callback
                            </button>
                            <button class="btn btn-secondary" onclick="propertiesManager.scheduleVisit(${property.id})">
                                Schedule Visit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        this.addModalStyles();
        
        document.body.appendChild(modal);
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = '';
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    addModalStyles() {
        // Check if styles already exist
        if (document.querySelector('#property-modal-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'property-modal-styles';
        styles.textContent = `
            .property-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .property-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                max-width: 900px;
                max-height: 90vh;
                margin: 5vh auto;
                background: white;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                transform: scale(0.9) translateY(-20px);
                transition: transform 0.3s ease;
            }
            
            .property-modal.active .modal-content {
                transform: scale(1) translateY(0);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem;
                border-bottom: 1px solid #e5e7eb;
                background: #f9fafb;
            }
            
            .modal-header h2 {
                margin: 0;
                font-size: 1.5rem;
                font-weight: 700;
                color: #1f2937;
            }
            
            .modal-close {
                background: none;
                border: none;
                padding: 0.5rem;
                cursor: pointer;
                border-radius: 50%;
                transition: background-color 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(0, 0, 0, 0.1);
            }
            
            .modal-close svg {
                width: 20px;
                height: 20px;
                color: #6b7280;
            }
            
            .modal-body {
                padding: 2rem;
                max-height: 70vh;
                overflow-y: auto;
            }
            
            .modal-image {
                margin-bottom: 2rem;
                border-radius: 12px;
                overflow: hidden;
            }
            
            .modal-image img {
                width: 100%;
                height: 300px;
                object-fit: cover;
            }
            
            .property-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .info-item {
                display: flex;
                justify-content: space-between;
                padding: 0.75rem;
                background: #f9fafb;
                border-radius: 8px;
            }
            
            .info-label {
                font-weight: 600;
                color: #6b7280;
            }
            
            .info-value {
                font-weight: 600;
                color: #1f2937;
            }
            
            .property-specs {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 1rem;
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .spec-item {
                padding: 1rem;
                background: #f9fafb;
                border-radius: 12px;
            }
            
            .spec-value {
                font-size: 2rem;
                font-weight: 800;
                color: #2563eb;
                margin-bottom: 0.5rem;
            }
            
            .spec-label {
                font-size: 0.875rem;
                color: #6b7280;
                font-weight: 500;
            }
            
            .property-description {
                margin-bottom: 2rem;
            }
            
            .property-description h4,
            .property-amenities h4 {
                font-size: 1.25rem;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 1rem;
            }
            
            .property-description p {
                color: #6b7280;
                line-height: 1.6;
            }
            
            .amenities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 0.75rem;
                margin-bottom: 2rem;
            }
            
            .amenity-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem;
                background: #f0f9ff;
                border-radius: 8px;
                font-size: 0.875rem;
                color: #1f2937;
            }
            
            .amenity-icon {
                width: 16px;
                height: 16px;
                color: #2563eb;
                flex-shrink: 0;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .modal-actions .btn {
                min-width: 150px;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    margin: 2vh 1rem;
                    max-height: 96vh;
                }
                
                .modal-body {
                    padding: 1rem;
                }
                
                .property-specs {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .amenities-grid {
                    grid-template-columns: 1fr;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
                
                .modal-actions .btn {
                    width: 100%;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    requestCallback(propertyId) {
        const property = this.properties.find(p => p.id === propertyId);
        if (!property) return;

        // Close modal
        document.querySelector('.property-modal')?.remove();
        document.body.style.overflow = '';

        // Show callback form or notification
        this.showCallbackForm(property);
    }

    scheduleVisit(propertyId) {
        const property = this.properties.find(p => p.id === propertyId);
        if (!property) return;

        // Close modal
        document.querySelector('.property-modal')?.remove();
        document.body.style.overflow = '';

        // Show visit scheduling form or notification
        this.showVisitForm(property);
    }

    showCallbackForm(property) {
        // Simple implementation - in real app, show a proper form
        const message = `Thank you for your interest in ${property.title}. Our team will call you back within 24 hours.`;
        if (window.ramprasthaWebsite) {
            window.ramprasthaWebsite.showNotification(message, 'success');
        } else {
            alert(message);
        }
    }

    showVisitForm(property) {
        // Simple implementation - in real app, show a proper form
        const message = `Site visit request for ${property.title} has been noted. Our team will contact you to schedule the visit.`;
        if (window.ramprasthaWebsite) {
            window.ramprasthaWebsite.showNotification(message, 'success');
        } else {
            alert(message);
        }
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            // Observe all property images
            document.querySelectorAll('.property-image img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    triggerAnimations() {
        // Re-setup intersection observer for new elements
        if (window.ramprasthaWebsite) {
            window.ramprasthaWebsite.setupIntersectionObserver();
        }
    }
}

// Initialize properties manager
document.addEventListener('DOMContentLoaded', () => {
    window.propertiesManager = new PropertiesManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PropertiesManager;
}
