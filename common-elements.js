class CommonElements extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        
        <div class="creation-hub">
    <svg class="creation-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--accent-1)" />
                <stop offset="50%" stop-color="var(--accent-2)" />
                <stop offset="100%" stop-color="var(--accent-3)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        <g class="orbit-system">
            <circle class="orbit" cx="50" cy="50" r="30" />
            <circle class="orbit" cx="50" cy="50" r="40" />
            <circle class="particle particle-1" cx="50" cy="20" r="3" />
            <circle class="particle particle-2" cx="80" cy="50" r="2" />
            <circle class="particle particle-3" cx="50" cy="90" r="4" />
        </g>
        <circle class="button-bg" cx="50" cy="50" r="25" fill="url(#buttonGradient)" filter="url(#glow)" />
        <path class="plus-icon" d="M50,37 L50,63 M37,50 L63,50" stroke="white" stroke-width="4" stroke-linecap="round" />
        <g class="idea-pulse" opacity="0">
            <circle cx="50" cy="50" r="35" fill="none" stroke="white" stroke-width="1" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="0.5" />
        </g>
    </svg>
    
    <!-- Menu pop-up de création -->
   <!-- Menu pop-up de création -->
<div class="creation-menu">
    <div class="creation-item" data-type="dossier">
        <div class="icon-container">
            <svg class="creation-icon" viewBox="0 0 24 24">
                <path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" />
            </svg>
        </div>
        <span>Dossier</span>
    </div>
    <div class="creation-item" data-type="note">
        <div class="icon-container">
            <svg class="creation-icon" viewBox="0 0 24 24">
                <path d="M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3M5,5V19H19V12H12V5H5Z" />
            </svg>
        </div>
        <span>Note</span>
    </div>
    <div class="creation-item" data-type="chat">
        <div class="icon-container">
            <svg class="creation-icon" viewBox="0 0 24 24">
                <path d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3M17,12V10H15V12H17M13,12V10H11V12H13M9,12V10H7V12H9Z" />
            </svg>
        </div>
        <span>Chat</span>
    </div>
</div>

</div>
 

<div id="creation-modal" class="creation-modal">
    <div class="creation-modal-content">
        <div class="creation-modal-header">
            <div class="type-indicator">
                <div class="type-icon"></div>
                <h2 class="modal-title">Créer un nouvel élément</h2>
            </div>
            <button class="close-modal">&times;</button>
        </div>
        
        <div class="creation-modal-body">
            <div class="form-group type-selection">
                <label>Type</label>
                <div class="type-options">
                    <div class="type-option" data-type="dossier">
                        <div class="type-icon">📁</div>
                        <span>Dossier</span>
                    </div>
                    <div class="type-option" data-type="note">
                        <div class="type-icon">📝</div>
                        <span>Note</span>
                    </div>
                    <div class="type-option" data-type="chat">
                        <div class="type-icon">💬</div>
                        <span>Chat</span>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="category-select">Catégorie</label>
                <div class="category-selector">
                    <div class="category-grid"></div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="title-input">Titre <span class="char-counter">0/100</span></label>
                <input type="text" id="title-input" placeholder="Donnez un titre à votre création..." maxlength="100">
            </div>
            
            <div class="form-group">
                <label for="description-input">Description <span class="optional">(optionnel)</span></label>
                <textarea id="description-input" placeholder="Ajoutez une description..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="tags-input">Tags <span class="hint">(max 3)</span></label>
                <div class="tags-container">
                    <div class="tags-list"></div>
                    <input type="text" id="tags-input" placeholder="Ajoutez des tags...">
                </div>
            </div>
            
            <div class="form-group">
                <label>Priorité</label>
                <div class="priority-options">
                    <div class="priority-option" data-priority="low">
                        <div class="priority-icon">🔽</div>
                        <span>Basse</span>
                    </div>
                    <div class="priority-option" data-priority="medium">
                        <div class="priority-icon">➖</div>
                        <span>Moyenne</span>
                    </div>
                    <div class="priority-option" data-priority="high">
                        <div class="priority-icon">🔼</div>
                        <span>Haute</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="creation-modal-footer">
            <div class="quantum-particles"></div>
            <button class="cancel-btn">Annuler</button>
            <button class="create-btn">Créer</button>
        </div>
    </div>
</div>

        `;
    }
}

customElements.define('common-elements', CommonElements);