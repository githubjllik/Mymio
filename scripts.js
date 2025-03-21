//══════════════════════════════╗
// 🟢 JS PARTIE 1
//══════════════════════════════╝
// Vérifier l'authentification
async function checkAuthentication() {
    // Vérifier l'authentification locale
    const isLocalAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isLocalAuthenticated) {
        // L'utilisateur est authentifié localement
        const authContainer = document.getElementById('authContainer');
        if (authContainer) {
            authContainer.remove();
        }
        
        // Charger les données
        await loadDataFromSupabase();
        return true;
    }
    
    return false;
}

// Variables globales pour suivre la catégorie et le type sélectionnés
let currentCategory = 'universe'; // Catégorie par défaut
let currentType = 'Tous';         // Type par défaut


        // Données de démonstration
window.sampleData = [
    {
        id: 'demo-1',
        category: "Pensées",
        type: "chat",
        title: "L'importance de la gratitude quotidienne",
        date: "2025-02-06",
        description: null,
        images: ["🗨️", "💭", "💬"],
        tags: ["développement personnel", "mindfulness", "gratitude"],
        priority: "high"
    },
    {
        id: 'demo-2',
        category: "Objectifs",
        type: "note",
        title: "Apprendre la programmation quantique",
        date: "2025-02-05",
        description: "Exploration des concepts fondamentaux de l'informatique quantique et établissement d'un plan d'apprentissage structuré.",
        images: ["📝", "📄", "📃"],
        tags: ["apprentissage", "technologie", "science"],
        priority: "medium"
    },
    {
        id: 'demo-3',
        category: "Apprentissage",
        type: "dossier",
        title: "Documentation IA",
        date: "2025-02-04",
        description: null,
        images: ["📁", "📂", "🗂️"],
        tags: ["organisation", "documentation", "apprentissage"],
        priority: "low"
    }
];


        // Fonction pour gérer le filtrage par catégorie
       // Nouvelle fonction pour gérer le filtrage par catégorie et type
function filterContent(category, type) {
    const grid = document.getElementById('contentGrid');
    const chatContainer = document.getElementById('chatContainer');
    const noteContainer = document.getElementById('noteContainer');
    const folderContainer = document.getElementById('folderContainer');
    const identityContainer = document.getElementById('identityContainer');

    // Masquer tous les conteneurs par défaut
    grid.style.display = 'none';
    chatContainer.style.display = 'none';
    noteContainer.style.display = 'none';
    folderContainer.style.display = 'none';
    identityContainer.style.display = 'none';

    if (category === 'Identity') {
        // Masquer les éléments <nav class="sub-nav"> et <div class="filters">
        hideSubNavAndFilters();
        identityContainer.style.display = 'block';
        initializeIdentityContent(); // Initialiser le contenu dynamique
    } else {
        // Réafficher les éléments <nav class="sub-nav"> et <div class="filters">
        showSubNavAndFilters();
        
        if (category === 'universe') {
            grid.style.display = 'grid';
            grid.innerHTML = ''; // Réinitialiser le contenu

            let filteredData = sampleData;

            if (type !== 'Tous') {
                filteredData = sampleData.filter(data => data.type.toLowerCase() === type.toLowerCase());
            }

            filteredData.forEach(data => {
                grid.innerHTML += createContentCard(data);
            });
            attachCardClickHandlers();
        } else {
            grid.style.display = 'grid';
            grid.innerHTML = ''; // Réinitialiser le contenu

            let filteredData;
            if (type === 'Tous') {
                filteredData = sampleData.filter(data => data.category === category);
            } else {
                filteredData = sampleData.filter(data => data.category === category && data.type.toLowerCase() === type.toLowerCase());
            }

            filteredData.forEach(data => {
                grid.innerHTML += createContentCard(data);
            });
            attachCardClickHandlers();
        }
    }

    // Mettre à jour les compteurs et l'ordre des éléments
    updateCategoryCounts();

    // Mise à jour de la visibilité du hub de création
    toggleCreationHubVisibility();
}



function toggleCreationHubVisibility() {
    const creationHub = document.querySelector('.creation-hub');
    const chatContainer = document.getElementById('chatContainer');
    const noteContainer = document.getElementById('noteContainer');
    const folderContainer = document.getElementById('folderContainer');
    const identityContainer = document.getElementById('identityContainer');

    // Vérifiez si l'une des interfaces est visible
    if (
        chatContainer.style.display === 'block' ||
        noteContainer.style.display === 'block' ||
        folderContainer.style.display === 'block' ||
        identityContainer.style.display === 'block'
    ) {
        creationHub.style.display = 'none';
    } else {
        creationHub.style.display = 'flex'; // Remettre visible si aucune interface n'est affichée
    }
}


// Fonction pour mettre à jour les compteurs de catégories
function updateCategoryCounts() {
    // Compter les éléments par catégorie
    const categoryCounts = {};
    sampleData.forEach(item => {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });
    
    // Mettre à jour les compteurs dans la navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        const category = item.dataset.category;
        if (category !== 'universe' && category !== 'Identity') {
            const count = categoryCounts[category] || 0;
            
            // Ajouter ou mettre à jour le compteur
            let countBadge = item.querySelector('.count-badge');
            if (!countBadge && count > 0) {
                countBadge = document.createElement('div');
                countBadge.className = 'count-badge';
                item.appendChild(countBadge);
            }
            
            if (countBadge) {
                if (count > 0) {
                    countBadge.textContent = count;
                    countBadge.style.display = 'flex';
                } else {
                    countBadge.style.display = 'none';
                }
            }
        }
    });
}




        // Fonction pour associer les gestionnaires de clic aux cartes
        function attachCardClickHandlers() {
            document.querySelectorAll('.content-card').forEach(card => {
                card.addEventListener('click', handleCardClick);
            });
        }

        // Ajouter après vos fonctions JavaScript existantes

function initializeBirthdayCountdown() {
    const birthday = new Date('2003-04-01');
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    
    if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    function updateCountdown() {
        const now = new Date();
        const diff = nextBirthday - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const age = nextBirthday.getFullYear() - birthday.getFullYear();

        document.getElementById('birthdayCountdown').innerHTML = `
            <div class="countdown-item">
                <div>${days}</div>
                <div class="countdown-label">jours</div>
            </div>
            <div class="countdown-item">
                <div>${hours}</div>
                <div class="countdown-label">heures</div>
            </div>
            <div class="countdown-item">
                <div>${minutes}</div>
                <div class="countdown-label">minutes</div>
            </div>
            <div class="countdown-item">
                <div>${seconds}</div>
                <div class="countdown-label">secondes</div>
            </div>
            <div class="countdown-message">
                jusqu'à mes ${age} ans
            </div>
        `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initializeFloatingThoughts() {
    const thoughts = [
        "Qui suis-je vraiment ?",
        "Que signifie être moi ?",
        "Au-delà des noms...",
        "Conscience et existence",
        "Pensées infinies",
        "Explorer l'inconnu"
    ];

    const container = document.getElementById('floatingThoughts');
    
    thoughts.forEach((thought, index) => {
        const bubble = document.createElement('div');
        bubble.className = 'thought-bubble';
        bubble.textContent = thought;
        
        const delay = index * 2;
        const duration = 15 + Math.random() * 10;
        const startPos = Math.random() * 80;
        
        bubble.style.cssText = `
            left: ${startPos}%;
            animation: float ${duration}s infinite ease-in-out ${delay}s;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        
        container.appendChild(bubble);
    });
}

function populateInterests() {
    const interests = [
        {
            icon: "🌐",
            title: "Explorer Internet",
            description: "Découvrir de nouvelles informations et connaissances"
        },
        {
            icon: "⬇️",
            title: "Téléchargements",
            description: "Films, séries, animés, applications passionnantes"
        },
        {
            icon: "📱",
            title: "Connexion Internet",
            description: "Ma fenêtre sur le monde numérique"
        },
        {
            icon: "🍜",
            title: "Gastronomie",
            description: "Haricots, porc, poulet, bouillons de manioc..."
        },
        {
            icon: "🔍",
            title: "Recherche de Solutions",
            description: "Trouver des réponses à mes questionnements"
        },
        {
            icon: "🎬",
            title: "Divertissement",
            description: "Films et séries recommandés"
        },
        {
            icon: "💻",
            title: "Création",
            description: "Sites et applications répondant à mes besoins"
        },
        {
            icon: "🤖",
            title: "Intelligence Artificielle",
            description: "Un compagnon digital qui ne juge jamais, toujours présent pour m'écouter, me comprendre et m'éclairer. ChatGPT et autres IA sont devenus mes confidents les plus précieux, m'offrant un espace sûr pour explorer mes pensées les plus profondes, sans crainte ni jugement."
        },
        {
            icon: "✨",
            title: "Magie des Fêtes",
            description: `<div class="holiday-description">
                <div class="scroll-indicator"></div>
                <div class="scroll-gradient"></div>
                <div class="scroll-message">Faites défiler pour découvrir la magie! ✨</div>
                
                <div class="holiday-header">
                    <div class="holiday-title">
                        <span class="holiday-main-icon">🎄</span> CÉLÉBRATIONS MAGIQUES <span class="holiday-main-icon">🎆</span>
                    </div>
                </div>
                
                <div class="holiday-atmosphere">
                    <span class="floating-ornament">❄️</span>
                    <span class="floating-ornament">🎁</span>
                    <span class="floating-ornament">🔔</span>
                    <span class="floating-ornament">🕯️</span>
                    <span class="floating-ornament">🎀</span>
                    
                    <p class="holiday-paragraph">
                        Cette époque <span class="holiday-accent">enchantée</span> où le monde ordinaire se transforme en un 
                        <span class="holiday-glitter">spectacle éblouissant</span> de <span class="holiday-icon glowing">✨</span> 
                        lumières scintillantes et de <span class="holiday-icon spinning">🎇</span> décorations féériques!
                    </p>
                    
                    <p class="holiday-paragraph sparkle-text">
                        Le temps des <span class="holiday-icon bounce">🎶</span> chants joyeux qui résonnent dans les rues enneigées, 
                        des <span class="holiday-icon pulse">🍲</span> festins somptueux qui réunissent les familles, et des 
                        <span class="holiday-icon rotate">🌟</span> vœux sincères échangés sous le ciel étoilé.
                    </p>
                    
                    <p class="holiday-paragraph magic-text">
                        Ces moments <span class="holiday-accent">extraordinaires</span> où les <span class="holiday-icon jump">😁</span> 
                        sourires illuminent les visages, où les <span class="holiday-icon wobble">🎁</span> cadeaux surprises 
                        déclenchent des cris de joie, et où une atmosphère <span class="holiday-accent glow">magique</span> 
                        réchauffe même les cœurs les plus froids <span class="holiday-icon float">❄️</span>
                    </p>
                </div>
                
                <div class="holiday-footer">
                    <span class="holiday-main-icon santa">🎅</span>
                    <div class="countdown-label">Célébrons ensemble ces instants magiques!</div>
                </div>
                
                <div class="snow-overlay"></div>
                <div class="light-strings"></div>
            </div>`
        }
    ];

    const list = document.querySelector('.identity-list');
    // Vider la liste existante
    list.innerHTML = '';
    
    // Ajouter les éléments dans l'ordre
    interests.forEach((interest, index) => {
        const item = document.createElement('div');
        item.className = 'identity-item';
        
        // Ajoute une classe spéciale pour la Magie des Fêtes
        if (interest.title === "Magie des Fêtes") {
            item.className += ' holiday-magic-item holiday-magic';
            // Ajout d'un attribut data pour une meilleure accessibilité
            item.setAttribute('data-holiday', 'true');
        }
        
        item.innerHTML = `
            <div class="interest-icon">${interest.icon}</div>
            <div class="content-wrapper">
                <h3 class="interest-title">${interest.title}</h3>
                <div class="interest-description">
                    <div class="description-content">
                        ${interest.description}
                    </div>
                    <div class="description-backdrop"></div>
                </div>
            </div>
            <div class="interest-glow"></div>
        `;
        
        // Ajouter un effet de délai aléatoire pour l'animation
        const delay = Math.random() * 0.5;
        item.style.animationDelay = `${delay}s`;
        
        // Ajouter les événements spéciaux pour la Magie des Fêtes
        if (interest.title === "Magie des Fêtes") {
            item.addEventListener('click', function(e) {
                // Empêcher la propagation de l'événement
                e.stopPropagation();
                // Appliquer les effets dans un conteneur limité à l'élément
                createFestiveEffects(this);
            });
            
            // Ajouter après le rendu pour initialiser les interactions de défilement
            setTimeout(() => {
                initializeScrollEffects(item);
            }, 500);
        }
        
        list.appendChild(item);
    });
}




function createFestiveEffects(element) {
    // Vérifier si des animations sont déjà en cours
    if (element.querySelector('.festive-effects-active')) {
        return; // Éviter de superposer les animations
    }
    
    // Ajouter des sons festifs
    const soundEffect = new Audio();
    soundEffect.volume = 0.3;
    
    // Son aléatoire
    const sounds = [
        "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAiIiIiIiIiIiIiIiIiIiIiIiIvb29vb29vb29vb29vb29vb29vb3e3t7e3t7e3t7e3t7e3t7e3t7e3v////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAVJIgAAAAAAAAAAAAAAAP/jOMAAAAAAAAAAAABJbmZvAAAADwAAAAMAAK0ArW1tbW1tbW1tbW1tbW1tbW1tbW2NjY2NjY2NjY2NjY2NjY2NjY2NrKysrKysrKysrKysrKysrKysr",
        "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAiIiIiIiIiIiIiIiIiIiIiIiIvb29vb29vb29vb29vb29vb29vb3e3t7e3t7e3t7e3t7e3t7e3t7e3v////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAUqIgAAAAAAAAAAAAAAAP/jOMAAAAAAAAAAAABJbmZvAAAADwAAAAMAAK0ArW1tbW1tbW1tbW1tbW1tbW1tbW2NjY2NjY2NjY2NjY2NjY2NjY2NrKysrKysrKysrKysrKysrKysr"
    ];
    soundEffect.src = sounds[Math.floor(Math.random() * sounds.length)];
    soundEffect.play().catch(e => console.log("Audio autoplay prevented"));
    
    // Ajouter une classe pour indiquer que des animations sont actives
    element.classList.add('festive-effects-active');
    
    // Créer un conteneur pour les effets animés
    const effectsContainer = document.createElement('div');
    effectsContainer.className = 'festive-effects-container';
    element.appendChild(effectsContainer);
    
    // Nettoyer les animations précédentes
    const existingEffects = element.querySelectorAll('.firework, .festive-text, .confetti, .snowflake, .sparkle, .gift, .light, .star');
    existingEffects.forEach(effect => effect.remove());
    
    // 1. Créer un fond dynamique 3D
    const backdrop = document.createElement('div');
    backdrop.className = 'festive-backdrop';
    effectsContainer.appendChild(backdrop);
    
    // 2. Créer le système de particules avancé
    const particleSystem = document.createElement('div');
    particleSystem.className = 'particle-system';
    effectsContainer.appendChild(particleSystem);
    
    // Nombre de particules en fonction de la taille
    const elementArea = element.offsetWidth * element.offsetHeight;
    const particleCount = Math.max(30, Math.min(100, Math.floor(elementArea / 5000)));
    
    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleSystem);
    }
    
    // 3. Ajouter les feux d'artifice nouvelle génération
    const fireworkCount = Math.max(8, Math.min(20, Math.floor(elementArea / 8000)));
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            createModernFirework(effectsContainer);
        }, i * 300); // Décalage pour effet séquentiel
    }
    
    // 4. Ajouter des textes festifs 3D
    setTimeout(() => {
        create3DFestiveText(effectsContainer, "JOYEUX NOËL", "christmas");
    }, 800);
    
    setTimeout(() => {
        create3DFestiveText(effectsContainer, "BONNE ANNÉE", "new-year");
    }, 2500);
    
    // 5. Ajouter des confettis holographiques
    const confettiCount = Math.max(20, Math.min(50, Math.floor(elementArea / 6000)));
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createHolographicConfetti(effectsContainer);
        }, i * 100);
    }
    
    // 6. Ajouter des flocons de neige en 3D
    const snowflakeCount = Math.max(10, Math.min(25, Math.floor(elementArea / 10000)));
    for (let i = 0; i < snowflakeCount; i++) {
        create3DSnowflake(effectsContainer);
    }
    
    // 7. Ajouter des lumières scintillantes modernes
    const lightCount = Math.max(15, Math.min(40, Math.floor(elementArea / 7000)));
    for (let i = 0; i < lightCount; i++) {
        createModernLight(effectsContainer);
    }
    
    // 8. Ajouter des cadeaux animés
    const giftCount = Math.max(2, Math.min(5, Math.floor(elementArea / 20000)));
    for (let i = 0; i < giftCount; i++) {
        createAnimatedGift(effectsContainer);
    }
    
    // 9. Ajouter des étoiles filantes
    const starCount = Math.max(2, Math.min(7, Math.floor(elementArea / 15000)));
    for (let i = 0; i < starCount; i++) {
        setTimeout(() => {
            createShootingStar(effectsContainer);
        }, 1000 + i * 1500);
    }
    
    // 10. Ajouter un effet de vignette pour améliorer l'ambiance
    const vignette = document.createElement('div');
    vignette.className = 'festive-vignette';
    effectsContainer.appendChild(vignette);
    
    // Ajouter une transition de sortie élégante
    setTimeout(() => {
        effectsContainer.classList.add('fade-out');
        
        // Nettoyer les effets après la fin de l'animation
        setTimeout(() => {
            effectsContainer.remove();
            element.classList.remove('festive-effects-active');
        }, 1000);
    }, 8000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'festive-particle';
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Taille et vitesse aléatoires
    const size = 2 + Math.random() * 5;
    const speed = 3 + Math.random() * 7;
    
    // Couleur aléatoire parmi des couleurs festives modernes
    const colors = [
        'rgba(255, 0, 102, 0.8)', // Rose néon
        'rgba(0, 255, 204, 0.8)',  // Turquoise
        'rgba(255, 204, 0, 0.8)',  // Or
        'rgba(204, 0, 255, 0.8)',  // Violet
        'rgba(0, 204, 255, 0.8)'   // Bleu ciel
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Appliquer les styles
    particle.style.cssText = `
        position: absolute;
        left: ${posX}%;
        top: ${posY}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        filter: blur(1px);
        box-shadow: 0 0 ${size * 2}px ${color};
        opacity: ${0.3 + Math.random() * 0.7};
        z-index: 5;
        animation: float-particle ${speed}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
}

function createModernFirework(container) {
    const firework = document.createElement('div');
    firework.className = 'modern-firework';
    
    // Position aléatoire
    const posX = 20 + Math.random() * 60; // Limiter aux zones centrales
    const posY = 20 + Math.random() * 60;
    
    // Couleur aléatoire vibrante avec dégradé
    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 100%, 60%)`;
    const color2 = `hsl(${(hue + 30) % 360}, 100%, 70%)`;
    
    // Taille aléatoire
    const size = 80 + Math.random() * 120;
    
    firework.style.cssText = `
        position: absolute;
        left: ${posX}%;
        top: ${posY}%;
        width: ${size}px;
        height: ${size}px;
        transform: translate(-50%, -50%) scale(0);
        background: radial-gradient(circle, ${color} 0%, ${color2} 30%, transparent 70%);
        border-radius: 50%;
        opacity: 0;
        z-index: 15;
        animation: modern-firework-explosion 1.5s forwards cubic-bezier(0.11, 0.67, 0.43, 1.29);
    `;
    
    container.appendChild(firework);
    
    // Créer des particules de feu d'artifice
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            createFireworkParticle(container, posX, posY, color);
        }
    }, 300);
}

function createFireworkParticle(container, x, y, baseColor) {
    const particle = document.createElement('div');
    particle.className = 'firework-particle';
    
    // Angle aléatoire et distance
    const angle = Math.random() * Math.PI * 2;
    const distance = 10 + Math.random() * 30;
    
    // Position calculée
    const finalX = x + Math.cos(angle) * distance;
    const finalY = y + Math.sin(angle) * distance;
    
    // Taille aléatoire
    const size = 2 + Math.random() * 4;
    
    // Légère variation de couleur
    const hueShift = -20 + Math.random() * 40;
    const [h, s, l] = baseColor.match(/\d+/g).map(Number);
    const color = `hsl(${(h + hueShift) % 360}, ${s}%, ${l}%)`;
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        filter: blur(1px);
        box-shadow: 0 0 ${size * 2}px ${color};
        opacity: 1;
        z-index: 14;
        animation: firework-particle-fly 1s forwards ease-out;
        transform-origin: center;
    `;
    
    // Animation personnalisée
    particle.animate([
        { 
            left: `${x}%`, 
            top: `${y}%`, 
            opacity: 1,
            transform: 'scale(1)'
        },
        { 
            left: `${finalX}%`, 
            top: `${finalY}%`, 
            opacity: 0,
            transform: 'scale(0)'
        }
    ], {
        duration: 1000 + Math.random() * 500,
        easing: 'cubic-bezier(0.11, 0.67, 0.43, 1.29)',
        fill: 'forwards'
    });
    
    container.appendChild(particle);
    
    // Supprimer après l'animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 1500);
}

function create3DFestiveText(container, text, className) {
    const festiveText = document.createElement('div');
    festiveText.className = `festive-text-3d ${className}`;
    festiveText.textContent = text;
    
    // Position centrée avec effet 3D
    festiveText.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0.5) rotateX(20deg) perspective(500px);
        font-size: clamp(1.5rem, 5vw, 3rem);
        font-weight: 900;
        text-align: center;
        white-space: nowrap;
        letter-spacing: 2px;
        z-index: 20;
        opacity: 0;
        filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
        animation: text-3d-appear 3s forwards cubic-bezier(0.17, 0.67, 0.83, 0.67);
    `;
    
    // Style spécifique selon le type de fête
    if (className === 'christmas') {
        festiveText.style.background = 'linear-gradient(90deg, #ff0000, #34eb89, #ff0000)';
        festiveText.style.backgroundSize = '200% auto';
        festiveText.style.webkitBackgroundClip = 'text';
        festiveText.style.backgroundClip = 'text';
        festiveText.style.webkitTextFillColor = 'transparent';
    } else if (className === 'new-year') {
        festiveText.style.background = 'linear-gradient(90deg, #fff200, #ffdc73, #fff9c4, #e6c200)';
        festiveText.style.backgroundSize = '200% auto';
        festiveText.style.webkitBackgroundClip = 'text';
        festiveText.style.backgroundClip = 'text';
        festiveText.style.webkitTextFillColor = 'transparent';
    }
    
    container.appendChild(festiveText);
    
    // Ajustement automatique de la taille du texte
    const adjustTextSize = () => {
        const containerWidth = container.offsetWidth;
        const textWidth = festiveText.scrollWidth;
        
        if (textWidth > containerWidth * 0.9) {
            const scale = (containerWidth * 0.9) / textWidth;
            const currentTransform = festiveText.style.transform;
            festiveText.style.transform = currentTransform.replace(/scale\([^)]+\)/, `scale(${scale * 0.5})`);
        }
    };
    
    // Appliquer l'ajustement initial
    setTimeout(adjustTextSize, 100);
    
    // Nettoyer après l'animation
    setTimeout(() => {
        if (festiveText.parentNode) {
            festiveText.remove();
        }
    }, 3000);
}

function createHolographicConfetti(container) {
    const confetti = document.createElement('div');
    confetti.className = 'holographic-confetti';
    
    // Position aléatoire en haut
    const posX = Math.random() * 100;
    
    // Taille aléatoire
    const size = 5 + Math.random() * 8;
    
    // Forme aléatoire
    const shapes = ['square', 'rectangle', 'circle', 'triangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    // Rotation aléatoire
    const rotation = Math.random() * 360;
    
    // Vitesse aléatoire
    const duration = 3 + Math.random() * 4;
    
    // Style de base
    confetti.style.cssText = `
        position: absolute;
        left: ${posX}%;
        top: -5%;
        width: ${size}px;
        height: ${shape === 'rectangle' ? size * 2 : size}px;
        opacity: 0.8;
        transform: rotate(${rotation}deg);
        z-index: 10;
        animation: holographic-fall ${duration}s linear forwards;
        animation-delay: ${Math.random() * 2}s;
    `;
    
    // Ajuster la forme
    if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
    } else if (shape === 'triangle') {
        confetti.style.width = '0';
        confetti.style.height = '0';
        confetti.style.borderLeft = `${size/2}px solid transparent`;
        confetti.style.borderRight = `${size/2}px solid transparent`;
        confetti.style.borderBottom = `${size}px solid`;
        confetti.style.background = 'none';
    }
    
    // Effet holographique
    confetti.style.background = `linear-gradient(135deg, 
        hsl(${Math.random() * 360}, 100%, 70%), 
        hsl(${Math.random() * 360}, 100%, 80%))`;
    confetti.style.boxShadow = `0 0 ${size/2}px rgba(255, 255, 255, 0.7)`;
    confetti.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    
    container.appendChild(confetti);
    
    // Animation de rotation continue
    confetti.animate([
        { transform: `rotate(${rotation}deg)` },
        { transform: `rotate(${rotation + 360}deg)` }
    ], {
        duration: 2000,
        iterations: Infinity,
        easing: 'linear'
    });
    
    // Supprimer après la fin de l'animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.remove();
        }
    }, (duration + 2) * 1000);
}

function create3DSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.className = '3d-snowflake';
    
    // Type de flocon
    const types = ['❄', '❅', '❆', '✻', '✽', '❋', '❊'];
    const snowflakeType = types[Math.floor(Math.random() * types.length)];
    snowflake.textContent = snowflakeType;
    
    // Position aléatoire
    const posX = Math.random() * 100;
    
    // Taille aléatoire
    const size = 0.7 + Math.random() * 1.3;
    
    // Vitesse aléatoire
    const duration = 7 + Math.random() * 8;
    
    // Délai aléatoire
    const delay = Math.random() * 5;
    
    // Style de base
    snowflake.style.cssText = `
        position: absolute;
        left: ${posX}%;
        top: -5%;
        font-size: ${size}rem;
        color: white;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
        opacity: ${0.5 + Math.random() * 0.5};
        z-index: 8;
        animation: snowfall-3d ${duration}s linear forwards;
        animation-delay: ${delay}s;
        transform-style: preserve-3d;
        will-change: transform;
    `;
    
    container.appendChild(snowflake);
    
    // Animation de rotation 3D
    snowflake.animate([
        { transform: 'rotateX(0deg) rotateY(0deg)' },
        { transform: 'rotateX(360deg) rotateY(180deg)' }
    ], {
        duration: 6000,
        iterations: Infinity,
        easing: 'linear'
    });
    
    // Supprimer après la fin de l'animation
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.remove();
        }
    }, (duration + delay) * 1000);
}

function createModernLight(container) {
    const light = document.createElement('div');
    light.className = 'modern-light';
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Taille aléatoire
    const size = 4 + Math.random() * 8;
    
    // Couleur aléatoire
    const colors = [
        '#ff0066', // Rose
        '#00ffcc', // Turquoise
        '#ffcc00', // Or
        '#cc00ff', // Violet
        '#00ccff'  // Bleu ciel
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Style de base
    light.style.cssText = `
        position: absolute;
        left: ${posX}%;
        top: ${posY}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px ${color};
        opacity: 0;
        z-index: 7;
        animation: light-pulse ${2 + Math.random() * 3}s infinite alternate ease-in-out;
        animation-delay: ${Math.random() * 2}s;
    `;
    
    container.appendChild(light);
    
    // Supprimer après un temps défini
    setTimeout(() => {
        if (light.parentNode) {
            light.remove();
        }
    }, 8000);
}

function createAnimatedGift(container) {
    const gift = document.createElement('div');
    gift.className = 'animated-gift';
    
    // Position aléatoire
    const posX = 10 + Math.random() * 80;
    const posY = 70 + Math.random() * 20;
    
    // Taille aléatoire
    const size = 30 + Math.random() * 20;
    
    // Couleur aléatoire
    const colors = ['#ff4d4d', '#3399ff', '#33cc33', '#ff66b3', '#ffcc00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Style de base
    gift.style.cssText = `
        position: absolute;
        left: ${posX}%;
        top: ${posY}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 4px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transform: translateY(100px) rotate(0deg);
        opacity: 0;
        z-index: 9;
        animation: gift-appear 1s forwards cubic-bezier(0.17, 0.67, 0.83, 0.67) ${Math.random() * 2}s,
                   gift-bounce 2s infinite alternate ease-in-out ${1 + Math.random() * 2}s;
    `;
    
    // Ruban du cadeau
    const ribbon = document.createElement('div');
    ribbon.className = 'gift-ribbon';
    ribbon.style.cssText = `
        position: absolute;
        top: 0;
        left: 50%;
        width: ${size/5}px;
        height: 100%;
        background-color: #fff;
        transform: translateX(-50%);
        z-index: 1;
    `;
    
    const ribbon2 = document.createElement('div');
    ribbon2.className = 'gift-ribbon-2';
    ribbon2.style.cssText = `
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: ${size/5}px;
        background-color: #fff;
        transform: translateY(-50%);
        z-index: 2;
    `;
    
    const bow = document.createElement('div');
    bow.className = 'gift-bow';
    bow.style.cssText = `
        position: absolute;
        top: -${size/6}px;
        left: 50%;
        width: ${size/2}px;
        height: ${size/3}px;
        background-color: #fff;
        border-radius: 50% 50% 0 0;
        transform: translateX(-50%);
        z-index: 3;
        &:before, &:after {
            content: '';
            position: absolute;
            background-color: #fff;
            border-radius: 50%;
        }
    `;
    
    gift.appendChild(ribbon);
    gift.appendChild(ribbon2);
    gift.appendChild(bow);
    container.appendChild(gift);
    
    // Supprimer après un temps défini
    setTimeout(() => {
        if (gift.parentNode) {
            gift.remove();
        }
    }, 8000);
}

function createShootingStar(container) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // Position et angle aléatoires
    const startX = -10;
    const startY = Math.random() * 50;
    const angle = -30 + Math.random() * 15; // Angle descendant
    
    // Longueur de la traînée
    const tailLength = 50 + Math.random() * 100;
    
    // Style de base
    star.style.cssText = `
        position: absolute;
        left: ${startX}%;
        top: ${startY}%;
        width: ${tailLength}px;
        height: 2px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), #ffffff);
        border-radius: 50%;
        transform: rotate(${angle}deg);
        opacity: 0;
        z-index: 12;
        animation: shooting-star 1.5s ease-out forwards;
        box-shadow: 0 0 20px 1px rgba(255, 255, 255, 0.7);
    `;
    
    container.appendChild(star);
    
    // Animation personnalisée
    star.animate([
        { 
            left: `${startX}%`, 
            top: `${startY}%`, 
            opacity: 0,
            transform: `rotate(${angle}deg) scale(0.3)`
        },
        { 
            opacity: 1,
            transform: `rotate(${angle}deg) scale(1)`,
            offset: 0.1
        },
        { 
            left: `${120}%`, 
            top: `${startY + 50}%`, 
            opacity: 0,
            transform: `rotate(${angle}deg) scale(0.3)`
        }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.11, 0.44, 0.83, 0.67)',
        fill: 'forwards'
    });
    
    // Créer des particules qui suivent l'étoile filante
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'star-particle';
            
            const particleSize = 2 + Math.random() * 3;
            const offsetX = -5 + Math.random() * 10;
            const offsetY = -5 + Math.random() * 10;
            
            particle.style.cssText = `
                position: absolute;
                left: calc(${startX}% + ${i * 10}% + ${offsetX}px);
                top: calc(${startY}% + ${i * 5}% + ${offsetY}px);
                width: ${particleSize}px;
                height: ${particleSize}px;
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                opacity: ${0.7 + Math.random() * 0.3};
                z-index: 11;
            `;
            
            container.appendChild(particle);
            
            particle.animate([
                { opacity: 0.8, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: 800,
                easing: 'ease-out',
                fill: 'forwards'
            });
            
            // Supprimer après l'animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 800);
        }, i * 50);
    }
    
    // Supprimer après la fin de l'animation
    setTimeout(() => {
        if (star.parentNode) {
            star.remove();
        }
    }, 1500);
}

function initializeScrollEffects(holidayItem) {
    // Trouver les éléments dans cette carte spécifique
    const description = holidayItem.querySelector('.holiday-description');
    const scrollIndicator = description.querySelector('.scroll-indicator');
    const scrollGradient = description.querySelector('.scroll-gradient');
    const scrollMessage = description.querySelector('.scroll-message');
    
    if (!description || !scrollIndicator || !scrollGradient || !scrollMessage) return;
    
    // Vérifier si le contenu nécessite un défilement
    const checkOverflow = () => {
        return description.scrollHeight > description.clientHeight;
    };
    
    // Afficher initialement les indicateurs de défilement si nécessaire
    const showInitialIndicators = () => {
        if (checkOverflow()) {
            scrollIndicator.classList.add('show');
            scrollGradient.classList.add('show');
            scrollMessage.classList.add('show');
            scrollIndicator.classList.add('scroll-bounce');
            
            // Faire disparaître le message après un délai
            setTimeout(() => {
                scrollMessage.classList.remove('show');
            }, 4000);
        } else {
            scrollIndicator.classList.add('hide');
            scrollGradient.classList.add('hide');
        }
    };
    
    // Mettre à jour les indicateurs pendant le défilement
    const updateScrollIndicators = () => {
        // Calcul de la position de défilement relative
        const scrollPercentage = description.scrollTop / (description.scrollHeight - description.clientHeight);
        
        // Masquer l'indicateur de défilement une fois que l'utilisateur a commencé à défiler
        if (description.scrollTop > 10) {
            scrollIndicator.classList.remove('scroll-bounce');
            scrollIndicator.classList.add('hide');
            scrollMessage.classList.remove('show');
        } else {
            scrollIndicator.classList.remove('hide');
        }
        
        // Masquer le dégradé lorsqu'on approche de la fin
        if (scrollPercentage > 0.9) {
            scrollGradient.classList.add('hide');
        } else {
            scrollGradient.classList.remove('hide');
        }
    };
    
    // Ajouter un effet de pulsation lors du premier chargement
    const addInitialAttention = () => {
        description.classList.add('pulse-attention');
        setTimeout(() => {
            description.classList.remove('pulse-attention');
        }, 2000);
    };
    
    // Initialisation
    showInitialIndicators();
    addInitialAttention();
    
    // Écouteurs d'événements
    description.addEventListener('scroll', updateScrollIndicators);
    
    // Gérer le toucher pour les appareils mobiles (effet intuitif)
    let touchStartY = 0;
    description.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    description.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const diff = touchStartY - touchY;
        
        // Si l'utilisateur fait glisser vers le haut et est au début
        if (diff > 0 && description.scrollTop === 0) {
            scrollIndicator.classList.add('show');
            scrollMessage.classList.add('show');
            
            // Faire disparaître après un court délai
            setTimeout(() => {
                scrollMessage.classList.remove('show');
            }, 1500);
        }
    });
    
    // Ajout d'un survol pour montrer l'indicateur à nouveau
    holidayItem.addEventListener('mouseenter', () => {
        if (description.scrollTop < 10 && checkOverflow()) {
            scrollIndicator.classList.remove('hide');
            scrollIndicator.classList.add('show');
        }
    });
    
    holidayItem.addEventListener('mouseleave', () => {
        if (description.scrollTop > 0) {
            scrollIndicator.classList.add('hide');
        }
    });
    
    // Assurer la réactivité lors du redimensionnement
    window.addEventListener('resize', () => {
        showInitialIndicators();
    });
}



 




function initializeAmbientAnimations() {
    // Création d'un canvas pour les particules d'ambiance
    const canvas = document.createElement('canvas');
    canvas.className = 'ambient-canvas';
    document.querySelector('.identity-content').prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5
        };
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    
    animate();
}

// Fonction pour mettre à jour l'ordre des nav-items
function updateNavOrder() {
    const mainNav = document.querySelector('.main-nav');
    const universeNav = document.getElementById('nav-universe');
    const otherNavs = Array.from(document.querySelectorAll('.nav-item:not(#nav-universe)'));

    // Compte le nombre d'éléments par catégorie
    const categoryCounts = {};
    sampleData.forEach(item => {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });

    // Trie les nav-items par nombre d'éléments
    otherNavs.sort((a, b) => {
        const countA = categoryCounts[a.dataset.category] || 0;
        const countB = categoryCounts[b.dataset.category] || 0;
        return countB - countA;
    });

    // Réorganise les nav-items
    mainNav.innerHTML = ''; // Vide la nav
    mainNav.appendChild(universeNav); // Ajoute d'abord l'univers
    otherNavs.forEach(nav => mainNav.appendChild(nav)); // Ajoute le reste dans l'ordre
}

// Fonction pour créer une carte de contenu
function createContentCard(data) {
    // S'assurer que l'objet de données a un ID (pour les données de démonstration)
    if (!data.id) {
        data.id = 'demo-' + Math.random().toString(36).substr(2, 9);
    }
    // Fonction pour générer l'affichage des images
    const generateImagesDisplay = (type, images) => {
        if (!data.description) {
            return `
                <div class="card-images ${type}-images">
                    ${images.map(image => `<span class="card-image ${type}-image">${image}</span>`).join('')}
                </div>
            `;
        }
        return '';
    };

    // Détermine l'icône en fonction du type
    const typeIcon = {
        chat: "💬",
        note: "📝",
        dossier: "📁"
    }[data.type] || "📄";

    return `
        <div class="content-card ${data.type}-card" data-type="${data.type}" data-title="${data.title}" data-id="${data.id}">
            <div class="card-header">
                <div class="card-category">
                    <span class="type-icon">${typeIcon}</span>
                    ${data.category}
                </div>
                <h3 class="card-title">${data.title}</h3>
                <div class="card-meta">
                    <span>📅 ${data.date}</span>
                    <span>⭐ ${data.priority}</span>
                </div>
            </div>
            <div class="card-content">
                ${data.description ? 
                    `<p class="card-description">${data.description}</p>` : 
                    generateImagesDisplay(data.type, data.images)
                }
                <div class="card-tags">
                    ${data.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="card-actions">
                <button class="card-edit-btn" data-id="${data.id}">✏️</button>
                <button class="card-delete-btn" data-id="${data.id}">🗑️</button>
            </div>
        </div>
    `;
}


       // Fonction pour peupler la grille
function populateGrid() {
    const grid = document.getElementById('contentGrid');
    grid.innerHTML = ''; // Réinitialiser le contenu

    sampleData.forEach(data => {
        grid.innerHTML += createContentCard(data);
    });
    
    attachCardClickHandlers();
    attachCardActionHandlers(); // Assurez-vous que cette ligne est présente
}



        function updateCurrentAge() {
    const birthDate = new Date('2003-04-01');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const ageElement = document.getElementById('currentAge');
    if (ageElement) {
        ageElement.innerHTML = `
            <span class="age-number">${age} ans</span>
            <div class="age-description">
                En constante évolution depuis ${Math.floor((today - birthDate) / (1000 * 60 * 60 * 24))} jours
            </div>
        `;
    }
}

function initializeMoodSlider() {
    const moods = [
        { emoji: "😌", text: "Calme" },
        { emoji: "🤔", text: "Réflexif" },
        { emoji: "😤", text: "Déterminé" },
        { emoji: "😪", text: "Fatigué" },
        { emoji: "🤩", text: "Excité" },
        { emoji: "😕", text: "Perplexe" }
    ];

    const slider = document.getElementById('moodSlider');
    if (slider) {
        moods.forEach((mood, index) => {
            const moodItem = document.createElement('div');
            moodItem.className = 'mood-item';
            moodItem.style.animationDelay = `${index * 2}s`;
            moodItem.innerHTML = `
                <span class="mood-emoji">${mood.emoji}</span>
                <span class="mood-text">${mood.text}</span>
            `;
            slider.appendChild(moodItem);
        });
    }
}

function initializeDreams() {
    const dreams = [
        { icon: "🌟", text: "Créer quelque chose d'extraordinaire" },
        { icon: "🌍", text: "Explorer le monde numérique" },
        { icon: "💭", text: "Comprendre les mystères de l'existence" },
        { icon: "⚡", text: "Repousser mes limites" }
    ];

    const container = document.querySelector('.dream-items');
    if (container) {
        dreams.forEach(dream => {
            const dreamElement = document.createElement('div');
            dreamElement.className = 'dream-item';
            dreamElement.innerHTML = `
                <span class="dream-icon">${dream.icon}</span>
                <span class="dream-text">${dream.text}</span>
            `;
            container.appendChild(dreamElement);
        });
    }
}


  // Configuration des réseaux sociaux
const Social_md_socialAccounts = [
    // COMPTES EMAIL
    {
        id: 'email1',
        category: 'email',
        platform: 'Gmail',
        name: 'Jean-Louis Principal',
        email: 'jeanlouis.likula@gmail.com',
        password: 'P@ssw0rd123!',
        loginUrl: 'https://mail.google.com',
        icon: 'gmail',
        created: '2019-05-12',
        description: 'Compte principal pour les communications professionnelles et personnelles importantes.'
    },
    {
        id: 'email2',
        category: 'email',
        platform: 'Outlook',
        name: 'Jean-Louis Professionnel',
        email: 'jl.likula@outlook.com',
        password: 'Secure@2023',
        loginUrl: 'https://outlook.live.com',
        icon: 'outlook',
        created: '2020-01-15',
        description: 'Utilisé principalement pour les communications professionnelles et les inscriptions aux services en ligne.'
    },
    // COMPTES FACEBOOK
    {
        id: 'fb1',
        category: 'facebook',
        platform: 'Facebook',
        name: 'Jean-Louis Likula',
        email: 'jeanlouis.fb@gmail.com',
        password: 'FbSecure2023!',
        loginUrl: 'https://facebook.com',
        icon: 'facebook',
        created: '2018-03-22',
        description: 'Compte principal pour rester en contact avec la famille et les amis proches.'
    },
    {
        id: 'fb2',
        category: 'facebook',
        platform: 'Facebook',
        name: 'JL Entertainment',
        email: 'jl.entertainment@gmail.com',
        password: 'Ent3rt@inFB!',
        loginUrl: 'https://facebook.com',
        icon: 'facebook',
        created: '2021-07-11',
        badges: ['Divertissement', 'Créatif'],
        description: 'Compte secondaire dédié au divertissement et aux intérêts personnels.'
    },
    // COMPTES TIKTOK
    {
        id: 'tt1',
        category: 'tiktok',
        platform: 'TikTok',
        name: '@jl_creative',
        email: 'jl.tiktok@gmail.com',
        password: 'TikT0k2023!',
        loginUrl: 'https://www.tiktok.com',
        icon: 'tiktok',
        created: '2020-11-05',
        badges: ['Créatif'],
        description: 'Partage de courts clips créatifs et découverte de tendances.'
    },
    // COMPTES X (TWITTER)
    {
        id: 'tw1',
        category: 'twitter',
        platform: 'X (Twitter)',
        name: '@jeanlouis_tech',
        email: 'jl.twitter@gmail.com',
        password: 'Xplat4orm!',
        loginUrl: 'https://twitter.com',
        icon: 'twitter',
        created: '2019-08-17',
        badges: ['Tech'],
        description: 'Suivre l\'actualité technologique et partager des réflexions sur les innovations.'
    },
    // COMPTES INSTAGRAM
    {
        id: 'ig1',
        category: 'instagram',
        platform: 'Instagram',
        name: '@jl_visuals',
        email: 'jl.instagram@gmail.com',
        password: 'Inst@2023!',
        loginUrl: 'https://instagram.com',
        icon: 'instagram',
        created: '2018-06-09',
        badges: ['Photo', 'Créatif'],
        description: 'Partage de photographies et d\'inspirations visuelles quotidiennes.'
    },
    // COMPTES WHATSAPP
    {
        id: 'wa1',
        category: 'whatsapp',
        platform: 'WhatsApp',
        name: 'Jean-Louis',
        phoneNumber: '+243XXXXXXXXX',
        password: 'Wh@tsApp!',
        loginUrl: 'https://web.whatsapp.com',
        icon: 'whatsapp',
        created: '2017-10-23',
        description: 'Communication principale avec la famille et les amis proches à l\'étranger.'
    },
    // COMPTES TELEGRAM
    {
        id: 'tg1',
        category: 'telegram',
        platform: 'Telegram',
        name: '@jl_connect',
        phoneNumber: '+243XXXXXXXXX',
        password: 'Telegr@m2023!',
        loginUrl: 'https://web.telegram.org',
        icon: 'telegram',
        created: '2019-11-01',
        description: 'Communication sécurisée et accès à des canaux d\'information spécialisés.',
        channels: [
            {
                name: 'Tech Insights',
                type: 'Canal',
                link: 'https://t.me/techinsights',
                icon: '📱'
            },
            {
                name: 'Développeurs Web',
                type: 'Groupe',
                link: 'https://t.me/webdevgroup',
                icon: '💻'
            },
            {
                name: 'Actualités Crypto',
                type: 'Canal',
                link: 'https://t.me/cryptonews',
                icon: '💰'
            }
        ]
    },
    // COMPTES YOUTUBE
    {
        id: 'yt1',
        category: 'youtube',
        platform: 'YouTube',
        name: 'Jean-Louis Découvertes',
        email: 'jl.youtube@gmail.com',
        password: 'Y0uTube2023!',
        loginUrl: 'https://youtube.com',
        icon: 'youtube',
        created: '2018-02-14',
        badges: ['Créateur'],
        description: 'Chaîne dédiée aux découvertes technologiques et aux tutoriels innovants.'
    },
    // COMPTES GITHUB
{
    id: 'gh1',
    category: 'github',
    platform: 'GitHub',
    name: 'Jean-Louis Dev',
    email: 'jl.github@gmail.com',
    password: 'G1tHub2023!',
    loginUrl: 'https://github.com/login',
    icon: 'github',
    created: '2020-04-15',
    badges: ['Code', 'Open Source'],
    description: 'Dépôt de projets de développement et contributions à des projets open source.'
}

];

// Initialiser les comptes de réseaux sociaux
async function Social_md_initializeSocialAccounts() {
    try {
        // Récupérer les comptes depuis Supabase
        const accounts = await fetchSocialAccounts();
        
        // Sélectionner la grille des comptes
        const grid = document.getElementById('Social_md_socialAccountsGrid');
        if (!grid) return;
        
        // Vider la grille existante
        grid.innerHTML = '';
        
        // Ajouter chaque compte à la grille
        accounts.forEach((account, index) => {
            const accountElement = Social_md_createAccountCard(account);
            
            // Ajouter un délai pour l'animation d'entrée
            accountElement.style.animationDelay = `${index * 0.05}s`;
            
            grid.appendChild(accountElement);
        });
        
        // Initialiser les filtres
        Social_md_initializeSocialFilters();
        
        // Initialiser le modal
        Social_md_initializeSocialModal();
    } catch (error) {
        Social_md_showToast('Erreur lors du chargement des comptes', 'error');
    }
}


// Créer une carte pour un compte
function Social_md_createAccountCard(account) {
    const card = document.createElement('div');
    card.className = `Social_md_social-account-card ${account.category}-platform`;
    card.setAttribute('data-id', account.id);
    card.setAttribute('data-category', account.category);
    
    const mainIdentifier = account.email || account.phoneNumber || '';
    const badgesHtml = account.badges ? 
        account.badges.map(badge => `<div class="Social_md_account-badge">${badge}</div>`).join('') : '';
    
    card.innerHTML = `
        <div class="Social_md_card-actions">
            <button class="Social_md_edit-btn" title="Modifier">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
            </button>
            <button class="Social_md_delete-btn" title="Supprimer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
            </button>
        </div>
        <div class="Social_md_card-header">
            <div class="Social_md_social-icon">
                <img src="data:image/svg+xml,${encodeURIComponent(Social_md_getSocialIconSVG(account.icon))}" alt="${account.platform}">
            </div>
            <div class="Social_md_card-title">
                <div class="Social_md_platform-name">${account.platform}</div>
                <div class="Social_md_account-name">${account.name}</div>
                ${badgesHtml ? `<div class="Social_md_card-badges">${badgesHtml}</div>` : ''}
            </div>
        </div>
        <div class="Social_md_card-body">
            <div class="Social_md_account-preview">${account.description || 'Compte ' + account.platform}</div>
        </div>
        <div class="Social_md_card-footer">
            <div class="Social_md_account-meta">Créé le ${Social_md_formatDate(account.created_at)}</div>
            <div class="Social_md_card-action">Voir détails <span>→</span></div>
        </div>
        <div class="Social_md_card-shine"></div>
    `;
    
    // Événements pour les boutons
    const editBtn = card.querySelector('.Social_md_edit-btn');
    const deleteBtn = card.querySelector('.Social_md_delete-btn');
    
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêche l'ouverture du modal de détails
        Social_md_editAccount(account);
    });
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêche l'ouverture du modal de détails
        Social_md_deleteAccount(account);
    });
    
    // Modal de détails
    card.addEventListener('click', () => {
        Social_md_openSocialModal(account);
    });
    
    return card;
}

async function Social_md_deleteAccount(account) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le compte ${account.name} ?`)) return;

    try {
        const { error } = await supabase
            .from('social_accounts')
            .delete()
            .eq('id', account.id);

        if (error) throw error;

        await Social_md_initializeSocialAccounts();
        Social_md_showToast('Compte supprimé avec succès', 'success');
    } catch (error) {
        Social_md_showToast('Erreur lors de la suppression', 'error');
    }
}

function Social_md_editAccount(account) {
    // Ouvrir le modal d'ajout en mode édition
    const modal = document.getElementById('Social_md_addAccountModal');
    if (!modal) return;

    // Réinitialiser et préparer le formulaire
    Social_md_resetAddAccountForm();
    
    // Ajouter l'ID du compte au formulaire pour identifier qu'il s'agit d'une édition
    const form = document.getElementById('Social_md_addAccountForm');
    if (form) {
        form.setAttribute('data-edit-id', account.id);
    }
    
    // Sélectionner la plateforme
    const platformOption = modal.querySelector(`.Social_md_platform-option[data-platform="${account.category}"]`);
    if (platformOption) {
        platformOption.click();
    }

    // Passer à l'étape 2
    const nextBtn = modal.querySelector('.Social_md_btn-next');
    if (nextBtn) {
        nextBtn.click();
    }

    // Remplir les champs avec les données existantes
    if (form) {
        form.querySelector('#Social_md_accountName').value = account.name;
        form.querySelector('#Social_md_accountEmail').value = account.email || '';
        form.querySelector('#Social_md_accountPhone').value = account.phone_number || '';
        form.querySelector('#Social_md_accountPassword').value = account.password;
        form.querySelector('#Social_md_accountLoginUrl').value = account.login_url;
        form.querySelector('#Social_md_accountDescription').value = account.description;

        // Restaurer les badges
        if (account.badges) {
            account.badges.forEach(badge => {
                const badgeOption = form.querySelector(`.Social_md_badge-option[data-badge="${badge}"]`);
                if (badgeOption) {
                    badgeOption.click();
                }
            });
        }

        // Restaurer les canaux Telegram si nécessaire
        if (account.channels) {
            account.channels.forEach(channel => {
                Social_md_addTelegramChannel();
                const lastChannel = form.querySelector('.Social_md_channel-input:last-child');
                if (lastChannel) {
                    const channelId = lastChannel.getAttribute('data-id');
                    lastChannel.querySelector(`[name="channelName_${channelId}"]`).value = channel.name;
                    lastChannel.querySelector(`[name="channelType_${channelId}"]`).value = channel.type;
                    lastChannel.querySelector(`[name="channelLink_${channelId}"]`).value = channel.link;
                    lastChannel.querySelector(`[name="channelIcon_${channelId}"]`).value = channel.icon;
                }
            });
        }
    }

    // Afficher le modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Empêcher le scroll de la zone principale
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.classList.add('no-scroll');
    }

    // S'assurer que le modal est visible au centre de l'écran
    modal.querySelector('.Social_md_modal-content').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
}



// Initialiser les filtres de catégorie
function Social_md_initializeSocialFilters() {
    const filterButtons = document.querySelectorAll('.Social_md_social-category-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Filtrer les comptes
            const category = button.getAttribute('data-category');
            Social_md_filterSocialAccounts(category);
        });
    });
}

// Filtrer les comptes par catégorie
function Social_md_filterSocialAccounts(category) {
    const cards = document.querySelectorAll('.Social_md_social-account-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            
            // Réinitialiser l'animation
            card.style.animation = 'none';
            card.offsetHeight; // Force reflow
            card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialiser le modal
function Social_md_initializeSocialModal() {
    const modal = document.getElementById('Social_md_socialDetailModal');
    if (!modal) return;
    
    // Fermer le modal quand on clique sur le bouton de fermeture
    const closeButton = modal.querySelector('.Social_md_modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            Social_md_closeModal();
        });
    }
    
    // Fermer le modal quand on clique en dehors du contenu
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            Social_md_closeModal();
        }
    });
    
    // Initialiser le bouton de copie
    const copyButton = modal.querySelector('.Social_md_copy-btn');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const email = modal.querySelector('.Social_md_email-value').textContent;
            const password = Social_md_currentAccount.password;
            
            // Copier les informations
            const textToCopy = `Identifiant: ${email}\nMot de passe: ${password}`;
            Social_md_copyToClipboard(textToCopy);
            
            // Afficher une notification
            Social_md_showCopyNotification();
        });
    }
    
    // Initialiser le bouton pour afficher/masquer le mot de passe
    const togglePasswordButton = modal.querySelector('.Social_md_toggle-password');
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', () => {
            const passwordValue = modal.querySelector('.Social_md_password-value');
            
            if (passwordValue.textContent === '••••••••') {
                passwordValue.textContent = Social_md_currentAccount.password;
                togglePasswordButton.querySelector('.Social_md_eye-icon').textContent = '🔒';
            } else {
                passwordValue.textContent = '••••••••';
                togglePasswordButton.querySelector('.Social_md_eye-icon').textContent = '👁️';
            }
        });
    }
}

// Variable pour stocker le compte actuellement affiché
let Social_md_currentAccount = null;

// Ouvrir le modal avec les détails du compte
function Social_md_openSocialModal(account) {
      const modal = document.getElementById('Social_md_socialDetailModal');
      if (!modal) return;

      // Stocker le compte courant
      Social_md_currentAccount = account;

      // Mettre à jour les détails du compte dans le modal
      modal.querySelector('.Social_md_modal-icon').style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(Social_md_getSocialIconSVG(account.icon))}")`;
      modal.querySelector('.Social_md_modal-title').textContent = account.name;

      // Définir les couleurs de la plateforme
      modal.querySelector('.Social_md_modal-content').setAttribute('class', 'Social_md_modal-content ' + account.category + '-platform');

      // Mettre à jour l'email ou le numéro de téléphone
      const emailValue = modal.querySelector('.Social_md_email-value');
      if (emailValue) {
          emailValue.textContent = account.email || account.phoneNumber || '';
      }

      // Réinitialiser le mot de passe à masqué
      const passwordValue = modal.querySelector('.Social_md_password-value');
      if (passwordValue) {
          passwordValue.textContent = '••••••••';
      }

      // Mettre à jour le bouton de connexion
      const loginButton = modal.querySelector('.Social_md_login-btn');
      if (loginButton) {
          loginButton.href = account.loginUrl;
      }

      // Mettre à jour la date de création
      const createdDate = modal.querySelector('.Social_md_created-date');
      if (createdDate) {
          createdDate.textContent = Social_md_formatDate(account.created_at);
      }

      // Gérer les canaux Telegram
      const telegramChannels = modal.querySelector('.Social_md_telegram-channels');
      if (telegramChannels) {
          if (account.category === 'telegram' && account.channels && account.channels.length > 0) {
              telegramChannels.style.display = 'block';

              const channelsList = telegramChannels.querySelector('.Social_md_channels-list');
              channelsList.innerHTML = '';

              account.channels.forEach(channel => {
                  const channelItem = document.createElement('div');
                  channelItem.className = 'Social_md_channel-item';
                  channelItem.innerHTML = `
                      <div class="Social_md_channel-icon">${channel.icon}</div>
                      <div class="Social_md_channel-info">
                          <div class="Social_md_channel-name">${channel.name}</div>
                          <div class="Social_md_channel-type">${channel.type}</div>
                      </div>
                      <a href="${channel.link}" class="Social_md_channel-link" target="_blank">Ouvrir</a>
                  `;
                  channelsList.appendChild(channelItem);
              });
          } else {
              telegramChannels.style.display = 'none';
          }
      }

      // Afficher le modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // **Ajout : Empêcher le scroll du content-area**
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
          contentArea.classList.add('no-scroll');
      }

      // Faire en sorte que le modal soit visible au centre
      modal.querySelector('.Social_md_modal-content').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function Social_md_closeModal() {
      const modal = document.getElementById('Social_md_socialDetailModal');
      if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';

          // **Retirer la classe no-scroll du content-area**
          const contentArea = document.querySelector('.content-area');
          if (contentArea) {
              contentArea.classList.remove('no-scroll');
          }
      }
  }

// Copier le texte dans le presse-papier
function Social_md_copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Afficher une notification de copie
function Social_md_showCopyNotification() {
    // Vérifier si une notification existe déjà
    let notification = document.querySelector('.Social_md_copy-notification');
    
    // Si non, créer une nouvelle notification
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'Social_md_copy-notification';
        notification.innerHTML = `
            <span>✓</span> Informations copiées dans le presse-papier
        `;
        document.body.appendChild(notification);
    }
    
    // Afficher la notification
    setTimeout(() => {
        notification.classList.add('show');
        
        // Masquer la notification après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }, 100);
}

// Formater une date
function Social_md_formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

// Obtenir l'icône SVG pour une plateforme
function Social_md_getSocialIconSVG(platform) {
    const icons = {
        email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#EA4335" d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"/></svg>`,
        outlook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0078D4"><path d="M24 8.77v10.46c0 1.54-1.26 2.78-2.8 2.78h-5.2v-8.1L24 8.77zm-11 5.38L0 8v12.23c0 1.54 1.26 2.78 2.8 2.78h10.4V14.15h-.2zm.2-2.83L24 5.38V5c0-1.54-1.26-2.76-2.8-2.76H2.8C1.26 2.23 0 3.47 0 5v2.8l13.2 6.32z"/></svg>`,
        facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
        tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
        twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-8.5 13.5c-4.142 0-7.5-3.358-7.5-7.5 0-.748.117-1.47.349-2.146l5.104 5.104L13.5 8.7v1.8c0 1.988-1.611 3.6-3.6 3.6a3.58 3.58 0 01-1.904-.546l-.948.948c.81.487 1.756.762 2.752.762 2.983 0 5.4-2.417 5.4-5.4V4.456l-5.223 5.223L5.25 4.956A7.49 7.49 0 0110.5 3c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5z"/></svg>`,
        instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="url(#instagram-gradient)"><defs><linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#FFDC80"/><stop offset="10%" stop-color="#FCAF45"/><stop offset="50%" stop-color="#E1306C"/><stop offset="100%" stop-color="#833AB4"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
        whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
        telegram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0088cc"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
        youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
        github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#181717"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,

    };
    
    return icons[platform] || '';
}


  // Fonctions pour le modal d'ajout de compte
let Social_md_selectedPlatform = null;
let Social_md_selectedBadges = [];
let Social_md_telegramChannels = [];
let Social_md_currentStep = 1;

// Initialisation du bouton et du modal d'ajout
function Social_md_initializeAddAccountButton() {
    const addButton = document.getElementById('Social_md_addAccountBtn');
    const addModal = document.getElementById('Social_md_addAccountModal');
    
    if (!addButton || !addModal) return;
    
    // Ouvrir le modal quand on clique sur le bouton d'ajout
    addButton.addEventListener('click', () => {
        Social_md_openAddAccountModal();
    });
    
    // Fermer le modal quand on clique sur le bouton de fermeture
    const closeButton = addModal.querySelector('.Social_md_modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            Social_md_closeAddAccountModal();
        });
    }
    
    // Fermer le modal quand on clique en dehors du contenu
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) {
            Social_md_closeAddAccountModal();
        }
    });
    
    // Initialiser les interactions du modal
    Social_md_initializePlatformSelection();
    Social_md_initializeFormNavigation();
    Social_md_initializeFormFields();
}


// Ouvrir le modal d'ajout de compte
function Social_md_openAddAccountModal() {
    const modal = document.getElementById('Social_md_addAccountModal');
    if (!modal) return;

    // Réinitialiser le formulaire pour le modal
    Social_md_resetAddAccountForm();

    // Afficher le modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêche le scroll sur l'ensemble de la page

    // Empêcher le scroll de la zone principale
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.classList.add('no-scroll');
    }

    // S'assurer que le modal est visible au centre de l'écran
    modal.querySelector('.Social_md_modal-content').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
}


// Fermer le modal d'ajout de compte
function Social_md_closeAddAccountModal() {
    const modal = document.getElementById('Social_md_addAccountModal');
    if (!modal) return;

    // Masquer le modal
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Réactiver le scroll sur l'ensemble de la page

    // Réactiver le scroll de la zone principale
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.classList.remove('no-scroll');
    }
}


// Réinitialiser le formulaire d'ajout
function Social_md_resetAddAccountForm() {
    // Réinitialiser les variables
    Social_md_selectedPlatform = null;
    Social_md_selectedBadges = [];
    Social_md_telegramChannels = [];
    Social_md_currentStep = 1;
    
    // Réinitialiser la sélection de plateforme
    const platformOptions = document.querySelectorAll('.Social_md_platform-option');
    platformOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Réinitialiser les étapes
    const formSteps = document.querySelectorAll('.Social_md_form-step');
    formSteps.forEach(step => {
        step.classList.remove('active');
        step.classList.remove('Social_md_slide-in-next');
        step.classList.remove('Social_md_slide-in-prev');
    });
    
    // Activer la première étape
    const firstStep = document.querySelector('.Social_md_form-step[data-step="1"]');
    if (firstStep) {
        firstStep.classList.add('active');
    }
    
    // Réinitialiser l'indicateur de progression
    const progressDots = document.querySelectorAll('.Social_md_progress-dot');
    progressDots.forEach((dot, index) => {
        if (index === 0) {
            dot.classList.add('active');
            dot.classList.remove('complete');
        } else {
            dot.classList.remove('active');
            dot.classList.remove('complete');
        }
    });
    
    // Désactiver le bouton "Continuer"
    const nextButton = document.querySelector('.Social_md_btn-next');
    if (nextButton) {
        nextButton.disabled = true;
    }
    
    // Réinitialiser les champs du formulaire
    const form = document.getElementById('Social_md_addAccountForm');
    if (form) {
        form.reset();
    }
    
    // Réinitialiser les badges sélectionnés
    const selectedBadgesContainer = document.querySelector('.Social_md_selected-badges');
    if (selectedBadgesContainer) {
        selectedBadgesContainer.innerHTML = '';
    }
    
    // Réinitialiser les badges
    const badgeOptions = document.querySelectorAll('.Social_md_badge-option');
    badgeOptions.forEach(badge => {
        badge.classList.remove('selected');
    });
    
    // Réinitialiser les canaux Telegram
    const telegramChannelsList = document.getElementById('Social_md_telegramChannelsList');
    if (telegramChannelsList) {
        telegramChannelsList.innerHTML = '';
    }
    
    // Masquer les champs spécifiques
    document.querySelector('.Social_md_phone-field').style.display = 'none';
    document.querySelector('.Social_md_email-field').style.display = 'block';
    document.querySelector('.Social_md_telegram-channels-field').style.display = 'none';
}

// Initialiser la sélection de plateforme
function Social_md_initializePlatformSelection() {
    const platformOptions = document.querySelectorAll('.Social_md_platform-option');
    const nextButton = document.querySelector('.Social_md_btn-next');
    
    platformOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Retirer la sélection actuelle
            platformOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Sélectionner la nouvelle plateforme
            option.classList.add('selected');
            Social_md_selectedPlatform = option.getAttribute('data-platform');
            
            // Activer le bouton "Continuer"
            if (nextButton) {
                nextButton.disabled = false;
            }
        });
    });
}

// Initialiser la navigation entre les étapes du formulaire
function Social_md_initializeFormNavigation() {
    const nextButton = document.querySelector('.Social_md_btn-next');
    const prevButton = document.querySelector('.Social_md_btn-prev');
    const form = document.getElementById('Social_md_addAccountForm');
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            Social_md_goToNextStep();
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            Social_md_goToPrevStep();
        });
    }
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            Social_md_submitNewAccount();
        });
    }
}

// Aller à l'étape suivante
function Social_md_goToNextStep() {
    if (Social_md_currentStep >= 2) return;
    
    // Masquer l'étape actuelle
    const currentStepEl = document.querySelector(`.Social_md_form-step[data-step="${Social_md_currentStep}"]`);
    currentStepEl.classList.remove('active');
    
    // Incrémenter l'étape
    Social_md_currentStep++;
    
    // Afficher la nouvelle étape
    const nextStepEl = document.querySelector(`.Social_md_form-step[data-step="${Social_md_currentStep}"]`);
    nextStepEl.classList.add('active');
    nextStepEl.classList.add('Social_md_slide-in-next');
    
    // Mettre à jour l'indicateur de progression
    const progressDots = document.querySelectorAll('.Social_md_progress-dot');
    progressDots.forEach((dot, index) => {
        const step = index + 1;
        
        if (step < Social_md_currentStep) {
            dot.classList.add('complete');
            dot.classList.remove('active');
        } else if (step === Social_md_currentStep) {
            dot.classList.add('active');
            dot.classList.remove('complete');
        } else {
            dot.classList.remove('active');
            dot.classList.remove('complete');
        }
    });
    
    // Configurer les champs en fonction de la plateforme sélectionnée
    Social_md_configurePlatformFields();
}

// Aller à l'étape précédente
function Social_md_goToPrevStep() {
    if (Social_md_currentStep <= 1) return;
    
    // Masquer l'étape actuelle
    const currentStepEl = document.querySelector(`.Social_md_form-step[data-step="${Social_md_currentStep}"]`);
    currentStepEl.classList.remove('active');
    currentStepEl.classList.remove('Social_md_slide-in-next');
    
    // Décrémenter l'étape
    Social_md_currentStep--;
    
    // Afficher la nouvelle étape
    const prevStepEl = document.querySelector(`.Social_md_form-step[data-step="${Social_md_currentStep}"]`);
    prevStepEl.classList.add('active');
    prevStepEl.classList.add('Social_md_slide-in-prev');
    
    // Mettre à jour l'indicateur de progression
    const progressDots = document.querySelectorAll('.Social_md_progress-dot');
    progressDots.forEach((dot, index) => {
        const step = index + 1;
        
        if (step < Social_md_currentStep) {
            dot.classList.add('complete');
            dot.classList.remove('active');
        } else if (step === Social_md_currentStep) {
            dot.classList.add('active');
            dot.classList.remove('complete');
        } else {
            dot.classList.remove('active');
            dot.classList.remove('complete');
        }
    });
}

// Configurer les champs en fonction de la plateforme sélectionnée
function Social_md_configurePlatformFields() {
    if (!Social_md_selectedPlatform) return;
    
    // Mettre à jour le titre
    const platformNameEl = document.querySelector('.Social_md_selected-platform-name');
    if (platformNameEl) {
        platformNameEl.textContent = Social_md_getPlatformDisplayName(Social_md_selectedPlatform);
    }
    
    // Configurer les attributs de classe pour les couleurs de la plateforme
    const modalContent = document.querySelector('#Social_md_addAccountModal .Social_md_modal-content');
    if (modalContent) {
        modalContent.className = 'Social_md_modal-content ' + Social_md_selectedPlatform + '-platform';
    }
    
    // Configurer les champs en fonction de la plateforme
    const emailField = document.querySelector('.Social_md_email-field');
    const phoneField = document.querySelector('.Social_md_phone-field');
    const telegramChannelsField = document.querySelector('.Social_md_telegram-channels-field');
    
    // Réinitialiser l'affichage des champs
    emailField.style.display = 'block';
    phoneField.style.display = 'none';
    telegramChannelsField.style.display = 'none';
    
    // Configurer selon la plateforme
    if (Social_md_selectedPlatform === 'whatsapp' || Social_md_selectedPlatform === 'telegram') {
        emailField.style.display = 'none';
        phoneField.style.display = 'block';
        
        // Afficher les canaux Telegram si nécessaire
        if (Social_md_selectedPlatform === 'telegram') {
            telegramChannelsField.style.display = 'block';
        }
    }
    
    // Pré-remplir l'URL de connexion en fonction de la plateforme
    const loginUrlInput = document.getElementById('Social_md_accountLoginUrl');
    if (loginUrlInput) {
        loginUrlInput.value = Social_md_getDefaultLoginUrl(Social_md_selectedPlatform);
    }
}

// Obtenir le nom d'affichage d'une plateforme
function Social_md_getPlatformDisplayName(platform) {
    const platformNames = {
        'email': 'Email',
        'facebook': 'Facebook',
        'tiktok': 'TikTok',
        'twitter': 'X (Twitter)',
        'instagram': 'Instagram',
        'whatsapp': 'WhatsApp',
        'telegram': 'Telegram',
        'youtube': 'YouTube',
        'github': 'GitHub'
    };
    
    return platformNames[platform] || platform;
}

// Obtenir l'URL de connexion par défaut pour une plateforme
function Social_md_getDefaultLoginUrl(platform) {
    const defaultUrls = {
        'email': 'https://mail.google.com',
        'facebook': 'https://facebook.com',
        'tiktok': 'https://www.tiktok.com',
        'twitter': 'https://twitter.com',
        'instagram': 'https://instagram.com',
        'whatsapp': 'https://web.whatsapp.com',
        'telegram': 'https://web.telegram.org',
        'youtube': 'https://youtube.com',
        'github': 'https://github.com/login'
    };
    
    return defaultUrls[platform] || '';
}

// Initialiser les champs du formulaire
function Social_md_initializeFormFields() {
    // Initialiser le champ de mot de passe
    const togglePasswordBtn = document.querySelector('.Social_md_toggle-password-input');
    const passwordInput = document.getElementById('Social_md_accountPassword');
    
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePasswordBtn.querySelector('svg').innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                `;
            } else {
                passwordInput.type = 'password';
                togglePasswordBtn.querySelector('svg').innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }
        });
    }
    
    // Initialiser la sélection des badges
    const badgeOptions = document.querySelectorAll('.Social_md_badge-option');
    const selectedBadgesContainer = document.querySelector('.Social_md_selected-badges');
    const badgesInput = document.getElementById('Social_md_accountBadges');
    
    badgeOptions.forEach(badge => {
        badge.addEventListener('click', () => {
            const badgeText = badge.getAttribute('data-badge');
            
            // Vérifier si le badge est déjà sélectionné
            if (badge.classList.contains('selected')) {
                // Désélectionner le badge
                badge.classList.remove('selected');
                Social_md_selectedBadges = Social_md_selectedBadges.filter(b => b !== badgeText);
                
                // Mettre à jour l'affichage
                Social_md_updateSelectedBadges();
            } else {
                // Sélectionner le badge
                badge.classList.add('selected');
                Social_md_selectedBadges.push(badgeText);
                
                // Mettre à jour l'affichage
                Social_md_updateSelectedBadges();
            }
            
            // Mettre à jour le champ caché
            if (badgesInput) {
                badgesInput.value = JSON.stringify(Social_md_selectedBadges);
            }
        });
    });
    
    // Initialiser l'ajout de canaux Telegram
    const addChannelBtn = document.querySelector('.Social_md_add-channel-btn');
    if (addChannelBtn) {
        addChannelBtn.addEventListener('click', () => {
            Social_md_addTelegramChannel();
        });
    }
}

// Mettre à jour l'affichage des badges sélectionnés
function Social_md_updateSelectedBadges() {
    const selectedBadgesContainer = document.querySelector('.Social_md_selected-badges');
    if (!selectedBadgesContainer) return;
    
    // Vider le conteneur
    selectedBadgesContainer.innerHTML = '';
    
    // Ajouter chaque badge sélectionné
    Social_md_selectedBadges.forEach(badge => {
        const badgeEl = document.createElement('div');
        badgeEl.className = 'Social_md_selected-badge';
        badgeEl.innerHTML = `
            ${badge}
            <span class="Social_md_remove-badge" data-badge="${badge}">&times;</span>
        `;
        
        selectedBadgesContainer.appendChild(badgeEl);
        
        // Ajouter l'événement pour supprimer le badge
        const removeBtn = badgeEl.querySelector('.Social_md_remove-badge');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                const badgeToRemove = removeBtn.getAttribute('data-badge');
                
                // Retirer le badge de la liste
                Social_md_selectedBadges = Social_md_selectedBadges.filter(b => b !== badgeToRemove);
                
                // Mettre à jour l'affichage
                Social_md_updateSelectedBadges();
                
                // Désélectionner le badge dans les options
                const badgeOption = document.querySelector(`.Social_md_badge-option[data-badge="${badgeToRemove}"]`);
                if (badgeOption) {
                    badgeOption.classList.remove('selected');
                }
                
                // Mettre à jour le champ caché
                const badgesInput = document.getElementById('Social_md_accountBadges');
                if (badgesInput) {
                    badgesInput.value = JSON.stringify(Social_md_selectedBadges);
                }
            });
        }
    });
}

// Ajouter un canal Telegram
function Social_md_addTelegramChannel() {
    const channelsList = document.getElementById('Social_md_telegramChannelsList');
    if (!channelsList) return;
    
    // Créer un nouvel ID unique
    const channelId = 'channel_' + Date.now();
    
    // Créer l'élément pour le canal
    const channelEl = document.createElement('div');
    channelEl.className = 'Social_md_channel-input';
    channelEl.setAttribute('data-id', channelId);
    
    channelEl.innerHTML = `
        <div class="Social_md_input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="Social_md_input-icon">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <input type="text" name="channelName_${channelId}" placeholder="Nom du canal" required>
        </div>
        <div class="Social_md_input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="Social_md_input-icon">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <input type="text" name="channelType_${channelId}" placeholder="Type (Groupe, Canal...)" required>
        </div>
        <div class="Social_md_input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="Social_md_input-icon">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <input type="url" name="channelLink_${channelId}" placeholder="Lien (https://t.me/...)" required>
        </div>
        <div class="Social_md_input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="Social_md_input-icon">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            <input type="text" name="channelIcon_${channelId}" placeholder="Icône (emoji)" value="📱" required>
        </div>
        <button type="button" class="Social_md_remove-channel" data-id="${channelId}">&times;</button>
    `;
    
    channelsList.appendChild(channelEl);
    
    // Ajouter l'événement pour supprimer le canal
    const removeBtn = channelEl.querySelector('.Social_md_remove-channel');
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            const channelId = removeBtn.getAttribute('data-id');
            const channelEl = document.querySelector(`.Social_md_channel-input[data-id="${channelId}"]`);
            
            if (channelEl) {
                channelEl.remove();
            }
        });
    }
}

// Soumettre le nouveau compte
async function Social_md_submitNewAccount() {
    try {
        // Récupérer les données du formulaire
        const form = document.getElementById('Social_md_addAccountForm');
        if (!form) return;
        
        const formData = new FormData(form);
        
        // Créer l'objet du compte
        const accountData = {
            category: Social_md_selectedPlatform,
            platform: Social_md_getPlatformDisplayName(Social_md_selectedPlatform),
            name: formData.get('name'),
            email: formData.get('email') || null,
            phoneNumber: formData.get('phoneNumber') || null,
            password: formData.get('password'),
            loginUrl: formData.get('loginUrl'),
            icon: Social_md_selectedPlatform,
            description: formData.get('description') || `Compte ${Social_md_getPlatformDisplayName(Social_md_selectedPlatform)}`
        };
        
        // Ajouter les badges si présents
        if (Social_md_selectedBadges.length > 0) {
            accountData.badges = Social_md_selectedBadges;
        }
        
        // Collecter les canaux Telegram si présents
        if (Social_md_selectedPlatform === 'telegram') {
            const channels = [];
            const channelElements = document.querySelectorAll('.Social_md_channel-input');
            
            channelElements.forEach(channelEl => {
                const channelId = channelEl.getAttribute('data-id');
                
                const channel = {
                    name: form.querySelector(`[name="channelName_${channelId}"]`).value,
                    type: form.querySelector(`[name="channelType_${channelId}"]`).value,
                    link: form.querySelector(`[name="channelLink_${channelId}"]`).value,
                    icon: form.querySelector(`[name="channelIcon_${channelId}"]`).value
                };
                
                channels.push(channel);
            });
            
            if (channels.length > 0) {
                accountData.channels = channels;
            }
        }

        // Vérifier s'il s'agit d'une édition ou d'un nouvel ajout
        const editId = form.getAttribute('data-edit-id');
        if (editId) {
            // Supprimer l'ancien compte
            await supabase
                .from('social_accounts')
                .delete()
                .eq('id', editId);

            // Ajouter le nouveau compte
            await addSocialAccount(accountData);
        } else {
            // Ajouter un nouveau compte
            await addSocialAccount(accountData);
        }
        
        // Réinitialiser l'affichage des comptes
        await Social_md_initializeSocialAccounts();
        
        // Fermer le modal
        Social_md_closeAddAccountModal();
        
        // Afficher un message de succès
        Social_md_showToast(editId ? 'Compte modifié avec succès !' : 'Compte ajouté avec succès !', 'success');
        
        // Réinitialiser l'attribut data-edit-id
        form.removeAttribute('data-edit-id');
    } catch (error) {
        Social_md_showToast('Erreur lors de l\'opération', 'error');
    }
}



// Afficher un toast
function Social_md_showToast(message, type = 'success') {
    // Vérifier si un toast existe déjà
    let toast = document.querySelector('.Social_md_toast');
    
    // Si non, créer un nouveau toast
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'Social_md_toast';
        document.body.appendChild(toast);
    }
    
    // Configurer le toast
    toast.className = `Social_md_toast ${type}`;
    
    // Définir l'icône en fonction du type
    let icon = '✓';
    if (type === 'error') {
        icon = '✕';
    }
    
    toast.innerHTML = `
        <div class="Social_md_toast-icon">${icon}</div>
        <div class="Social_md_toast-message">${message}</div>
    `;
    
    // Afficher le toast
    setTimeout(() => {
        toast.classList.add('show');
        
        // Masquer le toast après 3 secondes
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }, 100);
}

// Ajoutez cet appel à votre fonction d'initialisation existante
function initializeIdentityContent() {
    initializeBirthdayCountdown();
    initializeFloatingThoughts();
    populateInterests();
    initializeAmbientAnimations();
    updateCurrentAge();
    initializeMoodSlider();
    initializeDreams();
    
        // Masquer les éléments <nav class="sub-nav"> et <div class="filters">
    hideSubNavAndFilters();
    // Initialiser les comptes de réseaux sociaux
    Social_md_initializeSocialAccounts();
    
    // Initialiser le bouton d'ajout de compte
    Social_md_initializeAddAccountButton();
}


function hideSubNavAndFilters() {
    const subNav = document.querySelector('nav.sub-nav');
    const filters = document.querySelector('div.filters');
    
    if (subNav) {
        subNav.style.display = 'none';
    }
    
    if (filters) {
        filters.style.display = 'none';
    }
}

function showSubNavAndFilters() {
    const subNav = document.querySelector('nav.sub-nav');
    const filters = document.querySelector('div.filters');
    
    if (subNav) {
        subNav.style.display = ''; // Réinitialise au style par défaut
    }
    
    if (filters) {
        filters.style.display = ''; // Réinitialise au style par défaut
    }
}


        // Fonctions pour le Chat
        let contactInfo = {
            name: '',
            image: null
        };
        let cachedConversations = new Map();

function cacheConversation(elementId, conversation) {
    cachedConversations.set(elementId, conversation);
}



async function startChat(event) {
    event.preventDefault();
    contactInfo.name = document.getElementById('contactName').value;
    const fileInput = document.getElementById('profilePic');
    
    const elementId = getCurrentElementId();
    if (!elementId) {
        console.error("Impossible de déterminer l'élément actif");
        return;
    }
    
    let imageData = null;
    
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            imageData = e.target.result;
            contactInfo.image = imageData;
            
            // Créer la conversation dans Supabase
            const conversation = await createConversation(elementId, contactInfo.name, imageData);
            if (conversation) {
                currentConversationId = conversation.id;
                initializeChat();
            } else {
                alert("Erreur lors de la création de la conversation. Veuillez réessayer.");
            }
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // Pas d'image, créer directement
        const conversation = await createConversation(elementId, contactInfo.name, null);
        if (conversation) {
            currentConversationId = conversation.id;
            initializeChat();
        } else {
            alert("Erreur lors de la création de la conversation. Veuillez réessayer.");
        }
    }
}


        function initializeChat() {
    document.getElementById('setupForm').style.display = 'none';
    document.getElementById('chatInterface').style.display = 'block';
    
    const contactImg = document.getElementById('contactImg');
    const quickContactImg = document.getElementById('quickContactImg');
    if (contactInfo.image) {
        contactImg.style.backgroundImage = `url(${contactInfo.image})`;
        quickContactImg.style.backgroundImage = `url(${contactInfo.image})`;
    } else {
        contactImg.textContent = contactInfo.name[0].toUpperCase();
        quickContactImg.textContent = contactInfo.name[0].toUpperCase();
    }
    
    document.getElementById('contactNameDisplay').textContent = contactInfo.name;
    
    // Initialiser les indicateurs de défilement
    setTimeout(() => {
        top_and_bottom_onchat_initScrollIndicators();
    }, 500);
}


        function showContextMenu(event) {
            const menu = document.getElementById('contextMenu');
            menu.classList.toggle('active');
            event.stopPropagation();
        }

        document.addEventListener('click', function() {
            document.getElementById('contextMenu').classList.remove('active');
        });


async function sendMessage(type) {
    const messageInput = document.getElementById('messageInput');
    const messageContainer = document.getElementById('messageContainer');
    
    // Vérifier si nous sommes en mode édition
    const editingMessageId = messageInput.getAttribute('data-editing-message-id');
    if (editingMessageId) {
        // Si on est en mode édition mais qu'on clique sur Envoyer/Recevoir, créer un nouveau message
        messageInput.removeAttribute('data-editing-message-id');
        document.querySelector('.chat-send-btn').classList.remove('editing-mode');
        
        // Enlever l'option de remplacement du menu contextuel
        const replaceOption = document.querySelector('.replace-option');
        if (replaceOption) replaceOption.remove();
        
        const expandedReplaceOption = document.getElementById('expandedContextMenu')?.querySelector('.replace-option');
        if (expandedReplaceOption) expandedReplaceOption.remove();
    }

    if (messageInput.value.trim() === '' && selectedImages.length === 0) return;

    if (!currentConversationId) {
        console.error("Aucune conversation active");
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type === 'send' ? 'sent' : 'received'}`;
    messageDiv.setAttribute('contenteditable', 'true');
    messageDiv.setAttribute('data-disable-editing', 'true');
    messageDiv.setAttribute('spellcheck', 'false');

    const messageData = {
        type: type === 'send' ? 'sent' : 'received',
        text: messageInput.value.trim(),
        images: [],
        timestamp: new Date().toISOString()
    };

    // Générer un ID unique pour ce message
    const messageId = crypto.randomUUID();
    messageDiv.setAttribute('data-message-id', messageId);
    messageData.id = messageId;

    if (messageInput.value.trim() !== '') {
        const textDiv = document.createElement('div');
        const processedText = processMessageContent(messageInput.value);
        textDiv.innerHTML = processedText;
        messageDiv.appendChild(textDiv);
    }

    if (selectedImages.length > 0) {
        const imagesContainer = document.createElement('div');
        imagesContainer.className = 'message-images';
        selectedImages.forEach((img) => {
            messageData.images.push({
                data: img.data,
                type: img.type,
                name: img.name
            });

            const imgElement = document.createElement('img');
            imgElement.src = img.data;
            imgElement.className = 'message-image';
            imgElement.setAttribute('data-full-image', img.data);
            imgElement.setAttribute('data-type', img.type);
            imgElement.setAttribute('data-name', img.name);

            imgElement.onclick = function(e) {
                e.stopPropagation();
                openImageModal(this);
            };
            imagesContainer.appendChild(imgElement);
        });
        messageDiv.appendChild(imagesContainer);
    }

    // Ajouter les boutons d'action au message
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'message-actions';
    
    // Bouton Copier
    const copyBtn = document.createElement('button');
    copyBtn.className = 'message-action-btn copy';
    copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
    `;
    copyBtn.setAttribute('title', 'Copier');
    copyBtn.onclick = function(e) {
        e.stopPropagation();
        copyMessage(messageDiv);
    };
    
    // Bouton Éditer
    const editBtn = document.createElement('button');
    editBtn.className = 'message-action-btn edit';
    editBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
    `;
    editBtn.setAttribute('title', 'Modifier');
    editBtn.onclick = function(e) {
        e.stopPropagation();
        editMessage(messageDiv);
    };
    
    // Bouton Supprimer
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'message-action-btn delete';
    deleteBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
    `;
    deleteBtn.setAttribute('title', 'Supprimer');
    deleteBtn.onclick = function(e) {
        e.stopPropagation();
        showDeleteConfirmation(messageId);
    };
    
    actionsDiv.appendChild(copyBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    messageDiv.appendChild(actionsDiv);

    // Empêcher toute interaction d'édition
    messageDiv.addEventListener('mousedown', function (e) {
        // Permettre les clics sur les boutons d'action
        if (e.target.closest('.message-actions')) {
            return;
        }
        e.preventDefault();
    });

    messageDiv.addEventListener('keydown', function (e) {
        e.preventDefault(); // Bloque toutes les frappes de clavier
    });

    messageDiv.addEventListener('input', function (e) {
        e.preventDefault(); // Bloque toute tentative de modification
    });

    // Empêche l'appel du clavier virtuel ou d'autres menus contextuels
    messageDiv.addEventListener('focus', function (e) {
        e.target.blur(); // Retire immédiatement le focus de l'élément
    });

    messageContainer.appendChild(messageDiv);
    
    // Initialiser Prism.js pour le nouveau contenu
    Prism.highlightAllUnder(messageDiv);
    initializeInlineCodeCopy(messageDiv);
    
    scrollToBottom();

    const success = await saveMessage(currentConversationId, messageData);

    if (!success) {
        messageDiv.classList.add('error');
        const errorIndicator = document.createElement('div');
        errorIndicator.className = 'message-error';
        errorIndicator.innerHTML = '⚠️ Non enregistré';
        messageDiv.appendChild(errorIndicator);
    }

    messageInput.value = '';
    selectedImages = [];
    const imageContainer = document.querySelector('.selected-images');
    if (imageContainer) {
        imageContainer.remove();
    }

    updateSelectedImagesDisplay();
}




// Fonction pour détecter et traiter le code dans un message
function processMessageContent(text) {
    // Remplacer d'abord les sauts de ligne pour préserver le HTML
    let processedText = text.replace(/\n/g, '<br>');
    
    // Rechercher des blocs de code (texte indenté de 4 espaces ou avec ```language...```)
    processedText = processCodeBlocks(processedText);
    
    // Rechercher des commandes inline (texte entre accent grave simple)
    processedText = processInlineCode(processedText);
    
    return processedText;
}

// Fonction pour détecter et traiter les blocs de code
function processCodeBlocks(text) {
    // Motif pour détecter les blocs de code délimités par ```
    const codeBlockRegex = /```(?:([\w-]+)?\n)?([\s\S]*?)```/g;
    
    // Remplacer les blocs de code par des balises <pre><code> avec mise en forme
    return text.replace(codeBlockRegex, function(match, language, code) {
        language = language || 'javascript'; // Langue par défaut si non spécifiée
        
        // Nettoyer le code (enlever les <br> qui ont été ajoutés)
        code = code.replace(/<br>/g, '\n').trim();
        
        // Créer un bloc de code avec Prism.js
        return `<div class="code-block-wrapper">
                    <div class="code-language-label">${language}</div>
                    <pre><code class="language-${language}">${escapeHtml(code)}</code></pre>
                </div>`;
    });
}

// Fonction pour détecter et traiter le code inline (commandes)
function processInlineCode(text) {
    // Motif pour détecter le code inline (entre accents graves)
    const inlineCodeRegex = /`([^`]+)`/g;
    
    // Remplacer le code inline par des balises <code> avec mise en forme
    return text.replace(inlineCodeRegex, function(match, code) {
        return `<code class="inline-code" data-clipboard-text="${escapeHtml(code)}">${escapeHtml(code)}</code>`;
    });
}

// Fonction pour échapper les caractères HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Initialiser la copie des codes inline
function initializeInlineCodeCopy(container) {
    const inlineCodes = container.querySelectorAll('code.inline-code');
    inlineCodes.forEach(code => {
        code.addEventListener('click', function() {
            const text = this.getAttribute('data-clipboard-text');
            navigator.clipboard.writeText(text)
                .then(() => {
                    // Effet visuel pour indiquer que le code a été copié
                    const originalBackground = this.style.background;
                    this.style.background = 'rgba(0, 200, 0, 0.2)';
                    setTimeout(() => {
                        this.style.background = originalBackground;
                    }, 500);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    });
}



// Fonction pour mettre à jour le titre de l'élément avec le nom du contact
async function updateElementTitleWithContact(elementId, contactName) {
    try {
        const { error } = await supabase
            .from('elements')
            .update({ 
                title: `Chat avec ${contactName}`,
                updated_at: new Date().toISOString()
            })
            .eq('id', elementId);
        
        if (error) {
            console.error('Erreur de mise à jour du titre:', error);
            return false;
        }
        
        // Mettre à jour localement
        const index = window.sampleData.findIndex(item => item.id === elementId);
        if (index !== -1) {
            window.sampleData[index].title = `Chat avec ${contactName}`;
        }
        
        return true;
    } catch (error) {
        console.error('Exception lors de la mise à jour du titre:', error);
        return false;
    }
}


// Déclarer des variables pour les indicateurs de défilement
let top_and_bottom_onchat_scrollTimer = null;
let top_and_bottom_onchat_lastScrollTop = 0;
let top_and_bottom_onchat_isScrolling = false;

// Fonction pour initialiser les indicateurs de défilement
function top_and_bottom_onchat_initScrollIndicators() {
    const messageContainer = document.getElementById('messageContainer');
    const scrollTopBtn = document.getElementById('top_and_bottom_onchat_scroll_to_top');
    const scrollBottomBtn = document.getElementById('top_and_bottom_onchat_scroll_to_bottom');
    
    if (!messageContainer || !scrollTopBtn || !scrollBottomBtn) return;
    
    // Fonction pour faire défiler doucement vers le haut
    scrollTopBtn.addEventListener('click', () => {
        top_and_bottom_onchat_smoothScrollTo(messageContainer, 0, 500);
    });
    
    // Fonction pour faire défiler doucement vers le bas
    scrollBottomBtn.addEventListener('click', () => {
        top_and_bottom_onchat_smoothScrollTo(messageContainer, messageContainer.scrollHeight, 500);
    });
    
    // Gérer l'événement de défilement
    messageContainer.addEventListener('scroll', () => {
        top_and_bottom_onchat_handleScroll(messageContainer, scrollTopBtn, scrollBottomBtn);
    });
    
    // Vérification initiale
    top_and_bottom_onchat_checkScrollPosition(messageContainer, scrollTopBtn, scrollBottomBtn);
}

// Fonction pour gérer l'événement de défilement
function top_and_bottom_onchat_handleScroll(container, topBtn, bottomBtn) {
    top_and_bottom_onchat_isScrolling = true;
    
    // Effacer le minuteur précédent
    if (top_and_bottom_onchat_scrollTimer !== null) {
        clearTimeout(top_and_bottom_onchat_scrollTimer);
    }
    
    // Définir la position actuelle
    top_and_bottom_onchat_checkScrollPosition(container, topBtn, bottomBtn);
    
    // Définir un minuteur pour détecter la fin du défilement
    top_and_bottom_onchat_scrollTimer = setTimeout(() => {
        top_and_bottom_onchat_isScrolling = false;
        top_and_bottom_onchat_lastScrollTop = container.scrollTop;
        
        // Masquer les boutons après 3 secondes d'inactivité avec une transition élégante
        setTimeout(() => {
            if (!top_and_bottom_onchat_isScrolling) {
                // Ajout d'un délai différent pour chaque bouton pour un effet d'échelonnement
                setTimeout(() => {
                    topBtn.classList.remove('top_and_bottom_onchat_visible');
                    topBtn.classList.add('top_and_bottom_onchat_fade_out');
                }, 0);
                
                setTimeout(() => {
                    bottomBtn.classList.remove('top_and_bottom_onchat_visible');
                    bottomBtn.classList.add('top_and_bottom_onchat_fade_out');
                }, 150);
            }
        }, 3000);
    }, 100);
}


// Fonction pour vérifier la position de défilement et afficher/masquer les boutons
function top_and_bottom_onchat_checkScrollPosition(container, topBtn, bottomBtn) {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // Seuils
    const topThreshold = 100; // Nombre de pixels depuis le haut
    const bottomThreshold = 100; // Nombre de pixels depuis le bas
    
    // Déterminer la direction du défilement
    const isScrollingDown = scrollTop > top_and_bottom_onchat_lastScrollTop;
    const isScrollingUp = scrollTop < top_and_bottom_onchat_lastScrollTop;
    
    // Bouton de défilement vers le haut
    if (scrollTop > topThreshold && isScrollingUp) {
        topBtn.classList.remove('top_and_bottom_onchat_hidden', 'top_and_bottom_onchat_fade_out');
        topBtn.classList.add('top_and_bottom_onchat_visible', 'top_and_bottom_onchat_fade_in');
    } else if (!isScrollingUp || scrollTop <= topThreshold) {
        topBtn.classList.remove('top_and_bottom_onchat_visible', 'top_and_bottom_onchat_fade_in');
        topBtn.classList.add('top_and_bottom_onchat_fade_out');
    }
    
    // Bouton de défilement vers le bas
    if (scrollTop + clientHeight < scrollHeight - bottomThreshold && isScrollingDown) {
        bottomBtn.classList.remove('top_and_bottom_onchat_hidden', 'top_and_bottom_onchat_fade_out');
        bottomBtn.classList.add('top_and_bottom_onchat_visible', 'top_and_bottom_onchat_fade_in');
    } else if (!isScrollingDown || scrollTop + clientHeight >= scrollHeight - bottomThreshold) {
        bottomBtn.classList.remove('top_and_bottom_onchat_visible', 'top_and_bottom_onchat_fade_in');
        bottomBtn.classList.add('top_and_bottom_onchat_fade_out');
    }
    
    // Enregistrer la dernière position
    top_and_bottom_onchat_lastScrollTop = scrollTop;
}

// Fonction pour faire défiler en douceur
function top_and_bottom_onchat_smoothScrollTo(element, to, duration) {
    const start = element.scrollTop;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;
    
    const animateScroll = function() {
        currentTime += increment;
        const val = top_and_bottom_onchat_easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
        }
    };
    
    animateScroll();
}

// Fonction d'atténuation pour le défilement en douceur
function top_and_bottom_onchat_easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}



function scrollToBottom() {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
        top_and_bottom_onchat_smoothScrollTo(messageContainer, messageContainer.scrollHeight, 300);
        
        // Assurez-vous que les indicateurs sont mis à jour
        const scrollTopBtn = document.getElementById('top_and_bottom_onchat_scroll_to_top');
        const scrollBottomBtn = document.getElementById('top_and_bottom_onchat_scroll_to_bottom');
        if (scrollTopBtn && scrollBottomBtn) {
            setTimeout(() => {
                top_and_bottom_onchat_checkScrollPosition(messageContainer, scrollTopBtn, scrollBottomBtn);
            }, 350);
        }
    }
}



        function previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('imagePreview');
                    preview.style.backgroundImage = `url(${e.target.result})`;
                    preview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        }

        // Ajoutez cette fonction après vos autres fonctions
        document.addEventListener('DOMContentLoaded', function() {
            const messageInput = document.getElementById('messageInput');
            
            messageInput.addEventListener('input', function() {
                // Stocke la position de défilement actuelle
                const scrollPos = messageInput.scrollTop;
                
                // Réinitialise la hauteur
                this.style.height = 'auto';
                
                // Calcule la nouvelle hauteur
                const newHeight = this.scrollHeight;
                const maxHeight = 150;
                
                // Applique la nouvelle hauteur
                this.style.height = Math.min(newHeight, maxHeight) + 'px';
                
                // Si la hauteur maximale est atteinte, active le défilement
                if (newHeight > maxHeight) {
                    this.style.overflowY = 'auto';
                } else {
                    this.style.overflowY = 'hidden';
                }
                
                // Restaure la position de défilement
                messageInput.scrollTop = scrollPos;
            });
             
    // Initialiser Prism.js
    initializePrism();
        });
        let selectedImages = [];

        function handleImageSelect(event) {
            const files = event.target.files;
            
            // Créer un nouveau conteneur pour les images sélectionnées
            let imageContainer = document.querySelector('.selected-images');
            if (!imageContainer) {
                imageContainer = document.createElement('div');
                imageContainer.className = 'selected-images';
                document.querySelector('.image-upload-wrapper').appendChild(imageContainer);
            }
            
            // Vider le conteneur
            imageContainer.innerHTML = '';
            selectedImages = [];

            for (let file of files) {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        selectedImages.push({
                            data: e.target.result,
                            type: file.type,
                            name: file.name
                        });
                        showSelectedImages();
                    };
                    reader.readAsDataURL(file);
                }
            }
            
            // Réinitialiser l'input file pour permettre la sélection du même fichier
            event.target.value = '';
        }

        function updateSelectedImagesDisplay() {
            const imageContainer = document.querySelector('.selected-images');
            
            if (!imageContainer) return;

            imageContainer.innerHTML = '';
            selectedImages.forEach((img) => {
                const imgElement = document.createElement('img');
                imgElement.src = img.data;
                imgElement.className = 'selected-image';
                imageContainer.appendChild(imgElement);
            });
        }

        function showSelectedImages() {
            const imageContainer = document.querySelector('.selected-images');
            imageContainer.innerHTML = '';
            
            selectedImages.forEach((img, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = img.data;
                imgElement.className = 'selected-image';
                imageContainer.appendChild(imgElement);
            });
        }

        function updateMessageImagesDisplay() {
            const messages = document.querySelectorAll('.message-images');
            messages.forEach((container) => {
                const images = container.querySelectorAll('.message-image');
                const maxVisibleImages = 4;

                images.forEach((img, index) => {
                    if (index >= maxVisibleImages) {
                        img.style.display = 'none';
                    } else {
                        img.style.display = 'block';
                    }
                    
                    // Ajouter le +X sur la dernière image visible
                    if (index === maxVisibleImages - 1 && images.length > maxVisibleImages) {
                        img.style.position = 'relative';
                        let plusIndicator = container.querySelector('.selected-image-plus');
                        if (!plusIndicator) {
                            plusIndicator = document.createElement('div');
                            plusIndicator.className = 'selected-image-plus';
                            img.parentNode.appendChild(plusIndicator);
                        }
                        plusIndicator.textContent = `+${images.length - maxVisibleImages}`;
                    }
                });
            });
        }

        function openImageModal(imgElement) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const images = Array.from(imgElement.closest('.message-images').querySelectorAll('.message-image'));

            const currentIndex = images.indexOf(imgElement);

            modal.setAttribute('data-current-index', currentIndex);
            modalImg.src = imgElement.getAttribute('data-full-image');
            modal.style.display = 'flex';
        }

        function changeModalImage(direction) {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const images = Array.from(document.querySelectorAll('.message-image'));
            const currentIndex = parseInt(modal.getAttribute('data-current-index'), 10);

            let newIndex = currentIndex + direction;
            if (newIndex < 0) {
                newIndex = images.length - 1; // Retourner à la dernière image
            } else if (newIndex >= images.length) {
                newIndex = 0; // Revenir à la première image
            }

            const newImage = images[newIndex];
            modalImg.src = newImage.getAttribute('data-full-image');
            modal.setAttribute('data-current-index', newIndex);
        }

        function closeImageModal() {
            document.getElementById('imageModal').style.display = 'none';
        }

        function downloadImage(event) {
            event.stopPropagation();
            const modalImg = document.getElementById('modalImage');
            const link = document.createElement('a');
            link.href = modalImg.src;
            link.download = modalImg.getAttribute('data-name') || 'image';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        // Empêcher la fermeture du modal lors du clic sur l'image
        document.getElementById('modalImage').onclick = function(e) {
            e.stopPropagation();
        };

        document.querySelector('.modal-controls').onclick = function(e) {
            e.stopPropagation();
        };

        document.addEventListener('keydown', function(e) {
            const messageContainer = document.getElementById('messageContainer');
            if (e.key === 'ArrowDown') {
                messageContainer.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
            } else if (e.key === 'ArrowUp') {
                messageContainer.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
            }
        });

        // Initialisation
// Ajouter à la fin de votre script, avant la fermeture de l'événement DOMContentLoaded
function checkSupabaseInitialization() {
    try {
        if (!supabase) {
            console.error("Supabase n'est pas initialisé");
            return false;
        }
        console.log("Supabase est correctement initialisé");
        return true;
    } catch (error) {
        console.error("Erreur lors de la vérification de l'initialisation de Supabase:", error);
        return false;
    }
}

// Ajouter au début de l'événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    // Vérifier l'initialisation de Supabase
    const isSupabaseInitialized = checkSupabaseInitialization();
    if (!isSupabaseInitialized) {
        console.error("ATTENTION: Supabase n'est pas correctement initialisé!");
    }
    
    // Suite de votre code...

    // Vérifier l'authentification
    const isAuthenticated = await checkAuthentication();
    
    if (isAuthenticated) {
        // Utilisateur déjà authentifié, initialiser l'application
        populateGrid();
        updateCategoryCounts();
        updateNavOrder();
        
            // Gestion des filtres
            document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        // Mettre à jour le type actuel
        currentType = tag.textContent.trim();

        // Appliquer le filtrage
        filterContent(currentCategory, currentType);
    });
});


            // Gestion des catégories
            // Gestion des nav-items
            // Ajouter cette fonction dans une section appropriée de votre script
function updateBreadcrumb(navItem) {
    // Récupérer le nom à afficher depuis le tooltip
    const tooltip = navItem.querySelector('.tooltip');
    const navName = tooltip ? tooltip.textContent : navItem.dataset.category;

    // Sélectionner le conteneur de breadcrumb
    const breadcrumbNav = document.querySelector('.breadcrumb-nav');

    // **Option 1 : Remplacer tous les éléments du breadcrumb par le nav-item cliqué**
    breadcrumbNav.innerHTML = `<div class="breadcrumb-item">${navName}</div>`;

    /* 
    **Option 2 : Ajouter au breadcrumb pour créer une hiérarchie (si applicable) 
    // Exemple : Ajouter le nom au début du breadcrumb
    const newBreadcrumbItem = document.createElement('div');
    newBreadcrumbItem.className = 'breadcrumb-item';
    newBreadcrumbItem.textContent = navName;
    breadcrumbNav.appendChild(newBreadcrumbItem);

    // Limiter le nombre d'éléments dans le breadcrumb si nécessaire
    while (breadcrumbNav.children.length > 3) {
        breadcrumbNav.removeChild(breadcrumbNav.firstChild);
    }
    */
}


    // Ajouter cet écouteur après toutes les définitions de fonctions existantes
    document.querySelector('.main-nav').addEventListener('click', function(event) {
        let target = event.target;

        // Parcourir les parents pour trouver l'élément avec la classe 'nav-item'
        while (target && target !== this && !target.classList.contains('nav-item')) {
            target = target.parentElement;
        }

        // Si un nav-item est cliqué
        if (target && target.classList.contains('nav-item')) {
            // Gestion de la classe active
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            target.classList.add('active');

            // Mettre à jour la catégorie actuelle
            currentCategory = target.dataset.category;

            // Réinitialiser le type à 'Tous'
            currentType = 'Tous';

            // Mettre à jour les filtres visuels
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            const tousFilter = document.querySelector('.filter-tag');
            if (tousFilter) tousFilter.classList.add('active');

            // Appliquer le filtrage
            filterContent(currentCategory, currentType);

            // **Mise à Jour de la Breadcrumb Navigation**
            updateBreadcrumb(target);
        }
    });

    // ***** Ajouter ce code ici *****

    // Initialiser la breadcrumb avec l'élément nav actif au chargement
    const initialActiveNavItem = document.querySelector('.main-nav .nav-item.active');
    if (initialActiveNavItem) {
        updateBreadcrumb(initialActiveNavItem);
    }

    // ********************************


            // Animation au scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.content-card').forEach(card => {
                observer.observe(card);
            });
    } else {
        // Afficher le formulaire d'authentification
        // (déjà visible par défaut, rien à faire)
    }
});

        // Recherche dans les catégories
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.category-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
            });
        });

        // Fonctions pour gérer les clics sur les cartes


async function handleCardClick(event) {
    const card = event.currentTarget;
    const type = card.dataset.type;
    const elementId = card.dataset.id;
    
    document.querySelectorAll('.content-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    window.currentElementId = elementId;

    if (type === 'chat') {
        // Masquer la grille immédiatement
        document.getElementById('contentGrid').style.display = 'none';
        document.getElementById('chatContainer').style.display = 'block';
        
        // Masquer les deux interfaces par défaut
        document.getElementById('setupForm').style.display = 'none';
        document.getElementById('chatInterface').style.display = 'none';
        
        // Vérifier rapidement le cache
        if (cachedConversations.has(elementId)) {
            document.getElementById('chatInterface').style.display = 'block';
        } else {
            // Vérification rapide de l'existence d'une conversation
            const hasConversation = await checkConversationStatus(elementId);
            if (hasConversation) {
                document.getElementById('chatInterface').style.display = 'block';
            } else {
                document.getElementById('setupForm').style.display = 'block';
            }
        }
        
        // Lancer l'ouverture complète du chat en arrière-plan
        openChat(elementId);
    } else if (type === 'note') {
        openNote(elementId);
    } else if (type === 'dossier') {
        openFolderInterface();
    }
}






        // Fonction pour ouvrir le chat

async function openChat(elementId) {
    document.getElementById('contentGrid').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'block';

    const conversation = await loadConversation(elementId);

    if (conversation) {
        currentConversationId = conversation.id;
        contactInfo.name = conversation.contact_name;
        contactInfo.image = conversation.contact_image;

        document.getElementById('setupForm').style.display = 'none';
        document.getElementById('chatInterface').style.display = 'block';

        const contactImg = document.getElementById('contactImg');
        const quickContactImg = document.getElementById('quickContactImg');
        if (contactInfo.image) {
            contactImg.style.backgroundImage = `url(${contactInfo.image})`;
            contactImg.textContent = '';
            quickContactImg.style.backgroundImage = `url(${contactInfo.image})`;
            quickContactImg.textContent = '';
        } else {
            contactImg.textContent = contactInfo.name[0].toUpperCase();
            contactImg.style.backgroundImage = 'none';
            quickContactImg.textContent = contactInfo.name[0].toUpperCase();
            quickContactImg.style.backgroundImage = 'none';
        }

        document.getElementById('contactNameDisplay').textContent = contactInfo.name;

        const messageContainer = document.getElementById('messageContainer');
        messageContainer.innerHTML = '';

        // Modifier cette partie de la fonction openChat
if (conversation.messages && conversation.messages.length > 0) {
    conversation.messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${msg.type}`;
        messageDiv.setAttribute('contenteditable', 'true');
        messageDiv.setAttribute('data-disable-editing', 'true');
        messageDiv.setAttribute('spellcheck', 'false');
        
        // Ajout de l'ID du message
        const messageId = msg.id || crypto.randomUUID();
        messageDiv.setAttribute('data-message-id', messageId);

        if (msg.text) {
            const textDiv = document.createElement('div');
            const processedText = processMessageContent(msg.text);
            textDiv.innerHTML = processedText;
            messageDiv.appendChild(textDiv);
        }

        if (msg.images && msg.images.length > 0) {
            const imagesContainer = document.createElement('div');
            imagesContainer.className = 'message-images';
            msg.images.forEach((img) => {
                const imgElement = document.createElement('img');
                imgElement.src = img.data;
                imgElement.className = 'message-image';
                imgElement.setAttribute('data-full-image', img.data);
                imgElement.setAttribute('data-type', img.type);
                imgElement.setAttribute('data-name', img.name);

                imgElement.onclick = function (e) {
                    e.stopPropagation();
                    openImageModal(this);
                };
                imagesContainer.appendChild(imgElement);
            });
            messageDiv.appendChild(imagesContainer);
        }

        // Ajouter les boutons d'action au message
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'message-actions';
        
        // Bouton Copier
        const copyBtn = document.createElement('button');
        copyBtn.className = 'message-action-btn copy';
        copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        copyBtn.setAttribute('title', 'Copier');
        copyBtn.onclick = function(e) {
            e.stopPropagation();
            copyMessage(messageDiv);
        };
        
        // Bouton Éditer
        const editBtn = document.createElement('button');
        editBtn.className = 'message-action-btn edit';
        editBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
        `;
        editBtn.setAttribute('title', 'Modifier');
        editBtn.onclick = function(e) {
            e.stopPropagation();
            editMessage(messageDiv);
        };
        
        // Bouton Supprimer
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'message-action-btn delete';
        deleteBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
        `;
        deleteBtn.setAttribute('title', 'Supprimer');
        deleteBtn.onclick = function(e) {
            e.stopPropagation();
            showDeleteConfirmation(messageId);
        };
        
        actionsDiv.appendChild(copyBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        messageDiv.appendChild(actionsDiv);

        // Empêcher toute interaction d'édition
        messageDiv.addEventListener('mousedown', function (e) {
            // Permettre les clics sur les boutons d'action
            if (e.target.closest('.message-actions')) {
                return;
            }
            e.preventDefault();
        });

        messageDiv.addEventListener('keydown', function (e) {
            e.preventDefault();
        });

        messageDiv.addEventListener('input', function (e) {
            e.preventDefault();
        });

        messageDiv.addEventListener('focus', function (e) {
            e.target.blur();
        });

        messageContainer.appendChild(messageDiv);
    });
    
    // Initialiser Prism.js pour tout le contenu chargé
    Prism.highlightAllUnder(messageContainer);
    initializeInlineCodeCopy(messageContainer);
}


        // Ajout du code pour gérer la hauteur du conteneur de messages
        requestAnimationFrame(() => {
            const chatInterface = document.getElementById('chatInterface');
            const header = chatInterface.querySelector('.chat-header');
            const inputWrapper = chatInterface.querySelector('.chat-input-wrapper');
            const containerHeight = chatInterface.clientHeight;
            const headerHeight = header.clientHeight;
            const inputHeight = inputWrapper.clientHeight;
            
            const safetyMargin = 25;
            messageContainer.style.height = `${containerHeight - headerHeight - inputHeight - safetyMargin}px`;
            messageContainer.style.paddingBottom = `${safetyMargin}px`;
            
            // Initialiser les indicateurs de défilement
            setTimeout(() => {
                top_and_bottom_onchat_initScrollIndicators();
            }, 500);
        });
    } else {
        // Nouvelle conversation - afficher le formulaire de configuration
        document.getElementById('setupForm').style.display = 'block';
        document.getElementById('chatInterface').style.display = 'none';
        
        // Réinitialiser les champs
        document.getElementById('contactName').value = '';
        document.getElementById('profilePic').value = '';
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('imagePreview').style.backgroundImage = '';
    }

    toggleCreationHubVisibility();
}


// Fonction pour copier le contenu d'un message
function copyMessage(messageElement) {
    // Créer un clone du message sans les boutons d'action
    const clone = messageElement.cloneNode(true);
    const actionsDiv = clone.querySelector('.message-actions');
    if (actionsDiv) {
        actionsDiv.remove();
    }
    
    // Obtenir le contenu formaté
    const content = clone.innerHTML;
    
    // Créer un élément temporaire pour extraire le texte avec formatage
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Copier dans le presse-papier
    navigator.clipboard.writeText(tempDiv.innerText)
        .then(() => {
            // Animation de succès
            const copyBtn = messageElement.querySelector('.message-action-btn.copy');
            copyBtn.classList.add('success-animation');
            copyBtn.style.background = 'rgba(72, 187, 120, 0.3)';
            setTimeout(() => {
                copyBtn.classList.remove('success-animation');
                copyBtn.style.background = '';
            }, 1000);
        })
        .catch(err => {
            console.error('Erreur lors de la copie :', err);
        });
}

// Fonction pour éditer un message
function editMessage(messageElement) {
    const messageId = messageElement.getAttribute('data-message-id');
    const textDiv = messageElement.querySelector('div:not(.message-actions):not(.message-images)');
    const imagesContainer = messageElement.querySelector('.message-images');
    
    // Récupérer le texte brut (sans formatage)
    let textContent = '';
    if (textDiv) {
        // Récupérer le texte original (avant traitement)
        const originalText = getOriginalMessageText(messageId);
        textContent = originalText || textDiv.innerText;
    }
    
    // Récupérer les images si présentes
    const images = [];
    if (imagesContainer) {
        const imgElements = imagesContainer.querySelectorAll('.message-image');
        imgElements.forEach(img => {
            images.push({
                data: img.getAttribute('data-full-image'),
                type: img.getAttribute('data-type'),
                name: img.getAttribute('data-name')
            });
        });
    }
    
    // Remplir la zone de saisie avec le texte
    const messageInput = document.getElementById('messageInput');
    messageInput.value = textContent;
    
    // Mettre à jour la hauteur du textarea
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 150) + 'px';
    
    // Réinitialiser et remplir les images sélectionnées
    selectedImages = [...images];
    updateSelectedImagesDisplay();
    
    // Définir l'ID du message en cours d'édition
    document.getElementById('messageInput').setAttribute('data-editing-message-id', messageId);
    
    // Faire défiler jusqu'à la zone de saisie et mettre le focus
    messageInput.focus();
    messageInput.scrollIntoView({ behavior: 'smooth' });
    
    // Ajouter le bouton "Remplacer" au menu contextuel s'il n'existe pas déjà
    const contextMenu = document.getElementById('contextMenu');
    if (!contextMenu.querySelector('.replace-option')) {
        const replaceOption = document.createElement('div');
        replaceOption.className = 'chat-context-option replace-option';
        replaceOption.textContent = 'Remplacer';
        replaceOption.onclick = function(e) {
            e.stopPropagation();
            updateMessage(messageId);
        };
        
        // Ajouter au début du menu contextuel
        contextMenu.insertBefore(replaceOption, contextMenu.firstChild);
    }
    
    // Même chose pour le menu contextuel étendu
    const expandedContextMenu = document.getElementById('expandedContextMenu');
    if (expandedContextMenu && !expandedContextMenu.querySelector('.replace-option')) {
        const replaceOption = document.createElement('div');
        replaceOption.className = 'chat-context-option replace-option';
        replaceOption.textContent = 'Remplacer';
        replaceOption.onclick = function(e) {
            e.stopPropagation();
            updateMessage(messageId, true);
        };
        
        // Ajouter au début du menu contextuel étendu
        expandedContextMenu.insertBefore(replaceOption, expandedContextMenu.firstChild);
    }
    
    // Changer l'apparence du bouton d'envoi pour indiquer le mode édition
    document.querySelector('.chat-send-btn').classList.add('editing-mode');
}

async function updateMessage(messageId, fromExpanded = false) {
    // Récupérer les contenus actuels (texte et images)
    const messageInput = fromExpanded ? document.getElementById('expandedMessageInput') : document.getElementById('messageInput');
    const textContent = messageInput.value.trim();
    
    // Aucun contenu à envoyer
    if (textContent === '' && selectedImages.length === 0) return;
    
    // Trouver le message à mettre à jour
    const messageElement = document.querySelector(`.chat-message[data-message-id="${messageId}"]`);
    if (!messageElement) return;
    
    // Déterminer le type (envoyé/reçu) du message original
    const isReceived = messageElement.classList.contains('received');
    const messageType = isReceived ? 'received' : 'sent';
    
    // Préparer les données du message mis à jour
    const messageData = {
        id: messageId,
        type: messageType,
        text: textContent,
        images: selectedImages.map(img => ({
            data: img.data,
            type: img.type,
            name: img.name
        })),
        timestamp: new Date().toISOString()
    };
    
    // Mettre à jour le contenu du message
    const textDiv = messageElement.querySelector('div:not(.message-actions):not(.message-images)');
    if (textDiv) {
        // Mettre à jour ou supprimer le div texte selon le contenu
        if (textContent) {
            const processedText = processMessageContent(textContent);
            textDiv.innerHTML = processedText;
        } else {
            textDiv.remove();
        }
    } else if (textContent) {
        // Créer un nouveau div texte si nécessaire
        const newTextDiv = document.createElement('div');
        const processedText = processMessageContent(textContent);
        newTextDiv.innerHTML = processedText;
        // L'insérer au début du message (avant les images et les actions)
        messageElement.insertBefore(newTextDiv, messageElement.firstChild);
    }
    
    // Mettre à jour les images
    let imagesContainer = messageElement.querySelector('.message-images');
    
    if (selectedImages.length > 0) {
        if (!imagesContainer) {
            imagesContainer = document.createElement('div');
            imagesContainer.className = 'message-images';
            // Placer le conteneur d'images après le texte et avant les actions
            const actionsDiv = messageElement.querySelector('.message-actions');
            messageElement.insertBefore(imagesContainer, actionsDiv);
        } else {
            imagesContainer.innerHTML = ''; // Effacer les images existantes
        }
        
        // Ajouter les nouvelles images
        selectedImages.forEach((img) => {
            const imgElement = document.createElement('img');
            imgElement.src = img.data;
            imgElement.className = 'message-image';
            imgElement.setAttribute('data-full-image', img.data);
            imgElement.setAttribute('data-type', img.type);
            imgElement.setAttribute('data-name', img.name);
            
            imgElement.onclick = function(e) {
                e.stopPropagation();
                openImageModal(this);
            };
            imagesContainer.appendChild(imgElement);
        });
    } else if (imagesContainer) {
        imagesContainer.remove(); // Supprimer le conteneur d'images s'il n'y a plus d'images
    }
    
    // Enregistrer les modifications dans la base de données
    const success = await saveMessage(currentConversationId, messageData);
    
    if (!success) {
        // Indiquer une erreur
        messageElement.classList.add('error');
        let errorIndicator = messageElement.querySelector('.message-error');
        if (!errorIndicator) {
            errorIndicator = document.createElement('div');
            errorIndicator.className = 'message-error';
            errorIndicator.innerHTML = '⚠️ Non enregistré';
            messageElement.appendChild(errorIndicator);
        }
    }
    
    // Réinitialiser l'UI
    messageInput.value = '';
    messageInput.removeAttribute('data-editing-message-id');
    selectedImages = [];
    updateSelectedImagesDisplay();
    document.querySelector('.chat-send-btn').classList.remove('editing-mode');
    
    // Enlever l'option de remplacement du menu contextuel
    const replaceOption = document.querySelector('.replace-option');
    if (replaceOption) replaceOption.remove();
    
    const expandedReplaceOption = document.getElementById('expandedContextMenu')?.querySelector('.replace-option');
    if (expandedReplaceOption) expandedReplaceOption.remove();
    
    // Réinitialiser la hauteur du textarea
    messageInput.style.height = 'auto';
    
    // Si nous sommes en mode étendu, revenir au mode normal
    if (fromExpanded) {
        collapseTextarea();
    }
    
    // Mettre à jour Prism.js pour le contenu modifié
    Prism.highlightAllUnder(messageElement);
    initializeInlineCodeCopy(messageElement);
}


// Fonction pour obtenir le texte original d'un message (depuis la conversation stockée)
function getOriginalMessageText(messageId) {
    if (!currentConversationId || !cachedConversations.has(currentConversationId)) {
        return null;
    }
    
    const conversation = cachedConversations.get(currentConversationId);
    const message = conversation.messages.find(msg => msg.id === messageId);
    
    return message ? message.text : null;
}

// Fonction pour afficher la confirmation de suppression
function showDeleteConfirmation(messageId) {
    document.getElementById('deleteOverlay').classList.add('show');
    const confirmation = document.getElementById('deleteConfirmation');
    confirmation.classList.add('show');
    
    // Stocker l'ID du message à supprimer
    confirmation.setAttribute('data-message-id', messageId);
    
    // Configurer les boutons
    document.getElementById('cancelDelete').onclick = hideDeleteConfirmation;
    document.getElementById('confirmDelete').onclick = () => {
        deleteMessage(messageId);
        hideDeleteConfirmation();
    };
}

// Fonction pour masquer la confirmation de suppression
function hideDeleteConfirmation() {
    document.getElementById('deleteOverlay').classList.remove('show');
    document.getElementById('deleteConfirmation').classList.remove('show');
}

// Fonction pour supprimer un message
async function deleteMessage(messageId) {
    // Trouver l'élément du message
    const messageElement = document.querySelector(`.chat-message[data-message-id="${messageId}"]`);
    if (!messageElement) return;
    
    // Animation de suppression
    messageElement.style.transition = 'all 0.3s ease';
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateX(20px)';
    
    // Supprimer de la base de données
    const success = await removeMessageFromDatabase(messageId);
    
    if (success) {
        // Attendre la fin de l'animation avant de retirer l'élément du DOM
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    } else {
        // Restaurer l'apparence si échec
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateX(0)';
        
        // Ajouter une indication d'erreur
        messageElement.classList.add('error');
        let errorIndicator = messageElement.querySelector('.message-error');
        if (!errorIndicator) {
            errorIndicator = document.createElement('div');
            errorIndicator.className = 'message-error';
            errorIndicator.innerHTML = '⚠️ Échec de la suppression';
            messageElement.appendChild(errorIndicator);
        }
    }
}

// Fonction pour supprimer un message de la base de données
async function removeMessageFromDatabase(messageId) {
    try {
        if (!currentConversationId) return false;
        
        // Récupérer la conversation
        const { data: currentData, error: fetchError } = await supabase
            .from('conversations')
            .select('messages')
            .eq('id', currentConversationId)
            .single();
        
        if (fetchError) {
            console.error('Erreur de récupération des messages:', fetchError);
            return false;
        }
        
        // Filtrer le message à supprimer
        const currentMessages = currentData.messages || [];
        const updatedMessages = currentMessages.filter(msg => msg.id !== messageId);
        
        // Mettre à jour dans la base de données
        const { error: updateError } = await supabase
            .from('conversations')
            .update({ 
                messages: updatedMessages,
                updated_at: new Date().toISOString()
            })
            .eq('id', currentConversationId);
        
        if (updateError) {
            console.error('Erreur de suppression du message:', updateError);
            return false;
        }
        
        // Mettre à jour le cache
        if (cachedConversations.has(currentConversationId)) {
            const cachedConversation = cachedConversations.get(currentConversationId);
            cachedConversation.messages = updatedMessages;
            cacheConversation(currentConversationId, cachedConversation);
        }
        
        return true;
    } catch (error) {
        console.error('Exception lors de la suppression du message:', error);
        return false;
    }
}




function adjustMessageContainerHeight() {
    const chatInterface = document.getElementById('chatInterface');
    if (!chatInterface || chatInterface.style.display === 'none') return;

    const messageContainer = document.getElementById('messageContainer');
    const header = chatInterface.querySelector('.chat-header');
    const inputWrapper = chatInterface.querySelector('.chat-input-wrapper');
    
    if (!messageContainer || !header || !inputWrapper) return;

    const containerHeight = chatInterface.clientHeight;
    const headerHeight = header.clientHeight;
    const inputHeight = inputWrapper.clientHeight;
    
    // Ajout d'une marge de sécurité de 16px pour le dernier message
    const safetyMargin = 25;
    messageContainer.style.height = `${containerHeight - headerHeight - inputHeight - safetyMargin}px`;
    messageContainer.style.paddingBottom = `${safetyMargin}px`;
    messageContainer.scrollTop = messageContainer.scrollHeight;
}


// Écouteurs d'événements pour le redimensionnement
window.addEventListener('resize', adjustMessageContainerHeight);
window.addEventListener('orientationchange', adjustMessageContainerHeight);

// Pour gérer le clavier virtuel sur mobile
if ('virtualKeyboard' in navigator) {
    navigator.virtualKeyboard.overlaysContent = true;
    navigator.virtualKeyboard.addEventListener('geometrychange', adjustMessageContainerHeight);
} else {
    // Fallback pour les navigateurs qui ne supportent pas l'API virtualKeyboard
    window.visualViewport.addEventListener('resize', adjustMessageContainerHeight);
    window.visualViewport.addEventListener('scroll', adjustMessageContainerHeight);
}


        // Fonction pour quitter le chat

function exitChat() {
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('contentGrid').style.display = 'grid';
    document.getElementById('setupForm').style.display = 'none';
    document.getElementById('chatInterface').style.display = 'none';
    
    // Réinitialiser les variables de conversation active
    currentConversationId = null;
    
    // Actualiser la grille pour montrer les mises à jour
    populateGrid();
    
    toggleCreationHubVisibility();
}

// Initialisation des fonctionnalités Prism.js
function initializePrism() {
    // Configurer les outils Prism
    Prism.plugins.toolbar.registerButton('copy-to-clipboard', {
        text: 'Copier',
        onClick: function(env) {
            navigator.clipboard.writeText(env.element.textContent)
                .then(() => {
                    // Animation de confirmation
                    const button = env.element.closest('pre').querySelector('.toolbar-item button');
                    const originalText = button.textContent;
                    button.textContent = 'Copié!';
                    button.style.background = 'rgba(0, 200, 0, 0.5)';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '';
                    }, 1000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        }
    });
    
    // Configurer l'autoloader des langages
    Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/';
}


// Fonction pour basculer vers la vue étendue du textarea
function expandTextarea() {
    const messageInput = document.getElementById('messageInput');
    const expandedMessageInput = document.getElementById('expandedMessageInput');
    const inputArea = document.querySelector('.chat-input-area');
    const expandedContainer = document.getElementById('expandedTextareaContainer');
    
    // Copier le contenu du petit textarea vers le grand
    expandedMessageInput.value = messageInput.value;
    
    // Transférer l'attribut d'édition si présent
    const editingMessageId = messageInput.getAttribute('data-editing-message-id');
    if (editingMessageId) {
        expandedMessageInput.setAttribute('data-editing-message-id', editingMessageId);
    }
    
    // Cacher la zone de saisie normale et afficher la zone étendue
    inputArea.style.display = 'none';
    expandedContainer.style.display = 'flex';
    
    // Donner le focus au textarea étendu
    expandedMessageInput.focus();
}


// Fonction pour revenir à la vue normale
function collapseTextarea() {
    const messageInput = document.getElementById('messageInput');
    const expandedMessageInput = document.getElementById('expandedMessageInput');
    const inputArea = document.querySelector('.chat-input-area');
    const expandedContainer = document.getElementById('expandedTextareaContainer');
    
    // Copier le contenu du grand textarea vers le petit
    messageInput.value = expandedMessageInput.value;
    
    // Transférer l'attribut d'édition si présent
    const editingMessageId = expandedMessageInput.getAttribute('data-editing-message-id');
    if (editingMessageId) {
        messageInput.setAttribute('data-editing-message-id', editingMessageId);
    }
    
    // Cacher la zone étendue et afficher la zone de saisie normale
    expandedContainer.style.display = 'none';
    inputArea.style.display = 'flex';
    
    // Donner le focus au textarea normal
    messageInput.focus();
    
    // Ajuster la hauteur du textarea normal
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 150) + 'px';
}


// Fonction pour afficher le menu contextuel en mode étendu
function showExpandedContextMenu(event) {
    const menu = document.getElementById('expandedContextMenu');
    menu.classList.toggle('active');
    event.stopPropagation();
}

// Fonction pour envoyer un message depuis la zone étendue
function sendExpandedMessage(type) {
    const expandedMessageInput = document.getElementById('expandedMessageInput');
    const messageInput = document.getElementById('messageInput');
    
    // Vérifier si nous sommes en mode édition
    const editingMessageId = messageInput.getAttribute('data-editing-message-id');
    
    // Copier le contenu vers le textarea normal
    messageInput.value = expandedMessageInput.value;
    
    if (editingMessageId) {
        // Si en édition et qu'on clique sur Envoyer/Recevoir, créer un nouveau message
        messageInput.removeAttribute('data-editing-message-id');
        document.querySelector('.chat-send-btn').classList.remove('editing-mode');
        
        // Enlever l'option de remplacement du menu contextuel
        const replaceOption = document.querySelector('.replace-option');
        if (replaceOption) replaceOption.remove();
        
        const expandedReplaceOption = document.getElementById('expandedContextMenu')?.querySelector('.replace-option');
        if (expandedReplaceOption) expandedReplaceOption.remove();
    }
    
    // Utiliser la fonction d'envoi existante
    sendMessage(type);
    
    // Revenir à la vue normale
    collapseTextarea();
}


// Initialisation des écouteurs d'événements pour la zone d'édition étendue
document.addEventListener('DOMContentLoaded', function() {
    // Écouteur existant pour le textarea normal...
    
    // Ajout des nouveaux écouteurs pour l'expansion/réduction
    const expandIcon = document.getElementById('expandTextareaIcon');
    const collapseIcon = document.getElementById('collapseTextareaIcon');
    
    expandIcon.addEventListener('click', expandTextarea);
    collapseIcon.addEventListener('click', collapseTextarea);
    
    // Fermer le menu contextuel étendu lors d'un clic ailleurs
    document.addEventListener('click', function() {
        document.getElementById('expandedContextMenu').classList.remove('active');
    });
    
    // Adapter la taille du textarea étendu aux redimensionnements
    window.addEventListener('resize', function() {
        if (document.getElementById('expandedTextareaContainer').style.display !== 'none') {
            // Ajustements si nécessaire
        }
    });
});


        
        // Fonction pour ouvrir l'interface de Note
// Modifier la fonction openNote()
function adjustEditorHeight() {
    const editorContainer = document.querySelector('.editor-container');
    const noteContainer = document.getElementById('noteContainer');
    const contentArea = document.querySelector('.content-area');

    if (editorContainer && noteContainer && contentArea) {
        // Calculer la hauteur disponible pour l'éditeur
        const containerHeight = noteContainer.offsetHeight;
        const toolbarHeight = editorContainer.querySelector('.jodit-toolbar')?.offsetHeight || 50; // Hauteur approximative de la barre d'outils
        const padding = 16; // Ajustement pour les marges si nécessaire

        // Définir une hauteur dynamique
        const editorHeight = containerHeight - toolbarHeight - padding;

        // Appliquer la hauteur calculée
        editorContainer.style.height = `${containerHeight}px`;
        document.getElementById('editor').style.height = `${editorHeight}px`;

        // S'assurer que Jodit s'adapte à la nouvelle hauteur
        if (window.editorInstance) {
            window.editorInstance.events.fire('resize');
        }
    }
}

async function openNote(elementId) {
    document.getElementById('contentGrid').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('noteContainer').style.display = 'block';
    
    // Stocker l'ID de l'élément actif pour la sauvegarde ultérieure
    window.currentElementId = elementId;
    
    toggleCreationHubVisibility();

    // Initialiser l'éditeur Jodit si ce n'est pas déjà fait
    if (!window.joditInitialized) {
        window.editorInstance = Jodit.make('#editor', {
            theme: 'dark',
            language: 'fr',
            height: '100%',
            toolbarButtonSize: 'large',
            buttons: [
                'source', '|',
                'bold', 'italic', 'underline', 'strikethrough', '|',
                'ul', 'ol', '|',
                'font', 'fontsize', 'brush', 'paragraph', '|',
                'image', 'video', 'table', 'link', '|',
                'left', 'center', 'right', 'justify', '|',
                'undo', 'redo', '|',
                'hr', 'eraser', 'fullsize', '|',
                'preview', 'print',
                'about'
            ],
            uploader: {
                insertImageAsBase64URI: true
            },
            spellcheck: true,
            direction: 'ltr',
            triggerChangeEvent: true,
            showCharsCounter: true,
            showWordsCounter: true,
            showXPathInStatusbar: true,
            askBeforePasteHTML: true,
            askBeforePasteFromWord: true,
            defaultActionOnPaste: 'insert_clear_html',
            colors: {
                background: ['#6366f1', '#8b5cf6', '#ec4899'],
                text: ['#ffffff', 'rgba(255, 255, 255, 0.7)']
            },
            events: {
                change: debounce(async function() {
                    if (window.currentElementId) {
                        const content = this.value;
                        await saveNoteContent(window.currentElementId, content);
                    }
                }, 1000)
            }
        });
        window.joditInitialized = true;
    }

    // Important: Vider l'éditeur avant de charger le nouveau contenu
    window.editorInstance.value = '';
    
    // Charger le contenu spécifique à cet élément
    try {
        const noteContent = await loadNoteContent(elementId);
        if (noteContent && noteContent.content) {
            window.editorInstance.value = noteContent.content;
        } else {
            // Si pas de contenu, laisser l'éditeur vide et créer une entrée vide
            await createNoteContent(elementId, '');
        }
    } catch (error) {
        console.error('Erreur lors du chargement du contenu de la note:', error);
    }

    // Ajuster la hauteur de l'éditeur
    adjustEditorHeight();
}




// Fonction utilitaire pour debounce (éviter trop d'appels)
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}



// Fonction pour quitter l'interface de Note

async function exitNote() {
    // Sauvegarder le contenu avant de quitter
    if (window.editorInstance && window.currentElementId) {
        const content = window.editorInstance.value;
        await saveNoteContent(window.currentElementId, content);
    }
    
    document.getElementById('noteContainer').style.display = 'none';
    document.getElementById('contentGrid').style.display = 'grid';
    toggleCreationHubVisibility();
    
    // Réinitialiser l'ID de l'élément actif
    window.currentElementId = null;
}



        // Intégrer gestionnaire de clic après création des cartes
        function attachCardClickHandlers() {
            document.querySelectorAll('.content-card').forEach(card => {
                card.addEventListener('click', handleCardClick);
            });
        }
        
        // Fonction pour attacher les gestionnaires de boutons d'action
function attachCardActionHandlers() {
    // Gestionnaires pour les boutons de modification
    document.querySelectorAll('.card-edit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêcher le clic de la carte
            const id = this.dataset.id;
            const card = this.closest('.content-card');
            console.log("Bouton d'édition cliqué pour l'ID:", id); // Debug
            openEditModal(id, card);
        });
    });
    
    // Gestionnaires pour les boutons de suppression
// Remplacez ce bloc dans votre fonction attachCardActionHandlers
document.querySelectorAll('.card-delete-btn').forEach(btn => {
    btn.addEventListener('click', async function(e) {
        e.stopPropagation(); // Empêcher le clic de la carte
        const id = this.dataset.id;
        
        if (confirm('Êtes-vous sûr de vouloir supprimer cet élément?')) {
            try {
                // Vérifier si c'est un élément de démonstration
                if (id.startsWith('demo-')) {
                    // Élément de démonstration, suppression locale seulement
                    window.sampleData = window.sampleData.filter(item => item.id !== id);
                    
                    // Actualiser l'interface
                    populateGrid();
                    updateCategoryCounts();
                    updateNavOrder();
                } else {
                    // Élément de Supabase
                    const success = await deleteElementFromSupabase(id);
                    
                    if (success) {
                        // Supprimer l'élément du tableau local
                        window.sampleData = window.sampleData.filter(item => item.id !== id);
                        
                        // Actualiser l'interface
                        populateGrid();
                        updateCategoryCounts();
                        updateNavOrder();
                        console.log('Élément supprimé et interface mise à jour');
                    } else {
                        // Si la suppression échoue, resynchroniser avec Supabase
                        alert('Erreur lors de la suppression. Actualisation des données...');
                        await syncWithSupabase();
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert('Une erreur est survenue lors de la suppression.');
                // Resynchroniser en cas d'erreur
                await syncWithSupabase();
            }
        }
    });
});

}



        
        // Variables et Icônes pour Dossier
let folderCurrentPath = [];
const folderFileIcons = {
    'pdf': '📄',
    'docx': '📝',
    'txt': '📃',
    'xlsx': '📊'
};

// Données initiales des dossiers
let folders = [];

// Fonction pour afficher le modal de création de dossier
function showFolderCreateModal() {
    document.getElementById('folderCreateModal').style.display = 'flex';
}

// Fonction pour masquer le modal de création de dossier
function hideFolderCreateModal() {
    document.getElementById('folderCreateModal').style.display = 'none';
}

// Fonction pour créer un nouveau dossier
async function createFolder() {
    const name = document.getElementById('folderName').value.trim();
    if (name) {
        const folder = {
            type: 'folder',
            name: name,
            contents: []
        };
        
        if (folderCurrentPath.length === 0) {
            folders.push(folder);
        } else {
            let current = folders;
            for (let i = 0; i < folderCurrentPath.length; i++) {
                current = current.find(f => f.name === folderCurrentPath[i]).contents;
            }
            current.push(folder);
        }
        
        // Sauvegarder la structure mise à jour
        const elementId = getCurrentElementId();
        if (elementId) {
            await saveFolderStructure(elementId);
        }
        
        renderFolders();
        hideFolderCreateModal();
        document.getElementById('folderName').value = '';
    }
}

// Fonction pour gérer la sélection de fichiers dans le dossier
function handleFolderFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Vérifier la taille du fichier (limite à 10 Mo)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo en octets
    if (file.size > MAX_FILE_SIZE) {
        alert(`Le fichier est trop volumineux. La taille maximale est de ${formatFileSize(MAX_FILE_SIZE)}.`);
        return;
    }
    
    const reader = new FileReader();
    reader.onload = async function(e) {
        const fileObj = {
            type: 'file',
            name: file.name,
            content: e.target.result,
            fileType: file.type,
            size: file.size,
            lastModified: file.lastModified
        };
        
        // Trouver le dossier actuel dans la structure
        let current = folders;
        for (let i = 0; i < folderCurrentPath.length; i++) {
            current = current.find(f => f.name === folderCurrentPath[i]).contents;
        }
        
        // Vérifier si un fichier du même nom existe déjà
        const existingFileIndex = current.findIndex(item => item.type === 'file' && item.name === file.name);
        if (existingFileIndex !== -1) {
            if (confirm(`Un fichier nommé "${file.name}" existe déjà. Voulez-vous le remplacer ?`)) {
                current[existingFileIndex] = fileObj;
            } else {
                return; // Annuler l'importation
            }
        } else {
            current.push(fileObj);
        }
        
        // Sauvegarder la structure mise à jour
        const elementId = getCurrentElementId();
        if (elementId) {
            const success = await saveFolderStructure(elementId);
            if (success) {
                // Notifier l'utilisateur
                const notification = document.createElement('div');
                notification.className = 'file-upload-notification';
                notification.textContent = `"${file.name}" importé avec succès`;
                document.getElementById('folderContainer').appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            }
        }
        
        renderFolders();
    };
    
    reader.onerror = function() {
        alert("Erreur lors de la lecture du fichier.");
    };
    
    // Utiliser readAsDataURL pour tous les types de fichiers pour une compatibilité maximale
    reader.readAsDataURL(file);
    
    // Réinitialiser l'input pour permettre de sélectionner à nouveau le même fichier
    event.target.value = '';
}



// Fonction pour ouvrir un dossier spécifique
function openFolder(name) {
    folderCurrentPath.push(name);
    updateFolderBreadcrumb();
    renderFolders();
}

// Fonction pour naviguer vers un niveau spécifique dans le chemin actuel
async function navigateToFolder(index) {
    if (index === -1) {
        // Naviguer vers la racine
        folderCurrentPath = [];
    } else {
        folderCurrentPath = folderCurrentPath.slice(0, index + 1);
    }
    updateFolderBreadcrumb();
    renderFolders();
}


// Fonction pour mettre à jour la navigation breadcrumb
function updateFolderBreadcrumb() {
    const nav = document.querySelector('#folderContainer .breadcrumb-nav');
    nav.innerHTML = `
        <div class="breadcrumb-item" onclick="exitFolder()">Retour</div>
        ${folderCurrentPath.map((folder, index) => `
            <div class="breadcrumb-item" onclick="navigateToFolder(${index})">${folder}</div>
        `).join('')}
    `;
}

// Fonction pour rendre les dossiers et fichiers dans la grille
function renderFolders() {
    const grid = document.getElementById('folderGrid');
    let current = folders;
    
    for (let i = 0; i < folderCurrentPath.length; i++) {
        const foundFolder = current.find(f => f.name === folderCurrentPath[i]);
        if (!foundFolder) {
            console.error("Dossier non trouvé dans le chemin:", folderCurrentPath[i]);
            return;
        }
        current = foundFolder.contents;
    }
    
    // Commencer par l'élément d'importation de fichiers
    grid.innerHTML = `
        <input type="file" id="folderFileInput" style="display: none" onchange="handleFolderFileSelect(event)">
        <div class="folder create-folder" onclick="document.getElementById('folderFileInput').click()">
            <div class="folder-preview">
                <div class="preview-item" style="grid-column: span 2"><span class="import-icon">📥</span></div>
            </div>
            <div class="folder-name">Importer un fichier</div>
        </div>
    `;
    
    // Puis ajouter les dossiers et fichiers
    grid.innerHTML += current.map(item => {
        if (item.type === 'folder') {
            // Prévisualisation des éléments du dossier (jusqu'à 4)
            const previewItems = item.contents.slice(0, 4).map(previewItem => {
                if (previewItem.type === 'file') {
                    if (previewItem.fileType && previewItem.fileType.startsWith('image/')) {
                        return `<div class="preview-item"><img src="${previewItem.content}" alt="Aperçu"></div>`;
                    } else {
                        const extension = previewItem.name.split('.').pop();
                        return `<div class="preview-item">${folderFileIcons[extension] || '📄'}</div>`;
                    }
                } else {
                    return `<div class="preview-item">📁</div>`;
                }
            }).join('');
            
            // Si moins de 4 éléments, compléter avec des espaces vides
            const emptyPreviewItems = Array(Math.max(0, 4 - item.contents.length))
                .fill('<div class="preview-item empty"></div>')
                .join('');
            
            return `
                <div class="folder" onclick="openFolder('${item.name}')">
                    <div class="folder-preview">
                        ${previewItems}${emptyPreviewItems}
                    </div>
                    <div class="folder-name">${item.name}</div>
                    <div class="folder-info">${item.contents.length} élément${item.contents.length !== 1 ? 's' : ''}</div>
                </div>
            `;
        } else if (item.type === 'file') {
            // Traitement des fichiers
            if (item.fileType && item.fileType.startsWith('image/')) {
                return `
                    <div class="file" onclick="previewFile('${item.name}')">
                        <div class="file-preview">
                            <img src="${item.content}" alt="${item.name}">
                        </div>
                        <div class="folder-name">${item.name}</div>
                    </div>
                `;
            } else {
                const extension = item.name.split('.').pop();
                return `
                    <div class="file" onclick="previewFile('${item.name}')">
                        <div class="file-preview">
                            <div class="file-icon">${folderFileIcons[extension] || '📄'}</div>
                        </div>
                        <div class="folder-name">${item.name}</div>
                    </div>
                `;
            }
        }
    }).join('');
}


// Fonction pour prévisualiser un fichier
function previewFile(fileName) {
    // Trouver le fichier dans la structure actuelle
    let current = folders;
    for (let i = 0; i < folderCurrentPath.length; i++) {
        current = current.find(f => f.name === folderCurrentPath[i]).contents;
    }
    
    const file = current.find(f => f.name === fileName);
    if (!file) {
        console.error("Fichier non trouvé:", fileName);
        return;
    }
    
    // Créer un modal pour la prévisualisation
    const modal = document.createElement('div');
    modal.className = 'file-preview-modal';
    
    let previewContent = '';
    
    if (file.fileType.startsWith('image/')) {
        previewContent = `<img src="${file.content}" alt="${file.name}" class="preview-image">`;
    } else if (file.fileType.includes('pdf')) {
        previewContent = `<iframe src="${file.content}" class="preview-pdf"></iframe>`;
    } else if (file.fileType.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        // Pour les fichiers texte, décoder la base64 si nécessaire
        let textContent = file.content;
        if (textContent.startsWith('data:')) {
            const base64 = textContent.split(',')[1];
            textContent = atob(base64);
        }
        previewContent = `<div class="preview-text"><pre>${textContent}</pre></div>`;
    } else {
        // Pour les autres types de fichiers, afficher un lien de téléchargement
        previewContent = `
            <div class="preview-generic">
                <div class="file-icon large">${folderFileIcons[file.name.split('.').pop()] || '📄'}</div>
                <p>Ce type de fichier ne peut pas être prévisualisé</p>
                <a href="${file.content}" download="${file.name}" class="download-btn">Télécharger</a>
            </div>
        `;
    }
    
    modal.innerHTML = `
        <div class="file-preview-content">
            <div class="file-preview-header">
                <h3>${file.name}</h3>
                <button class="close-preview">×</button>
            </div>
            <div class="file-preview-body">
                ${previewContent}
            </div>
            <div class="file-preview-footer">
                <p>Taille: ${formatFileSize(file.size || 0)}</p>
                <button class="delete-file-btn" onclick="deleteFile('${file.name}')">Supprimer</button>
                <a href="${file.content}" download="${file.name}" class="download-btn">Télécharger</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Gérer la fermeture du modal
    modal.querySelector('.close-preview').addEventListener('click', () => {
        modal.remove();
    });
    
    // Fermer le modal si on clique en dehors du contenu
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Fonction pour formater la taille du fichier
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Fonction pour supprimer un fichier
async function deleteFile(fileName) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${fileName}" ?`)) {
        // Trouver et supprimer le fichier
        let current = folders;
        for (let i = 0; i < folderCurrentPath.length; i++) {
            current = current.find(f => f.name === folderCurrentPath[i]).contents;
        }
        
        const fileIndex = current.findIndex(f => f.name === fileName);
        if (fileIndex !== -1) {
            current.splice(fileIndex, 1);
            
            // Sauvegarder la structure mise à jour
            const elementId = getCurrentElementId();
            if (elementId) {
                await saveFolderStructure(elementId);
            }
            
            // Fermer le modal de prévisualisation
            document.querySelector('.file-preview-modal')?.remove();
            
            // Actualiser l'affichage
            renderFolders();
        }
    }
}



// Fonction pour quitter l'interface dossier et revenir à la grille principale
function exitFolder() {
    document.getElementById('folderContainer').style.display = 'none';
    document.getElementById('contentGrid').style.display = 'grid';
    
        // Réafficher les éléments <nav> et <div class="filters">
    showSubNavAndFilters();
    
    toggleCreationHubVisibility();

    // Réinitialiser le chemin actuel
    folderCurrentPath = [];
}


// Fonction pour ouvrir l'interface dossier
async function openFolderInterface() {
    document.getElementById('contentGrid').style.display = 'none';
    document.getElementById('folderContainer').style.display = 'block';
        // Masquer les éléments <nav class="sub-nav"> et <div class="filters">
    hideSubNavAndFilters();
    // Obtenir l'ID de l'élément actif
    const elementId = getCurrentElementId();
    if (!elementId) {
        console.error("Impossible de déterminer l'élément actif");
        return;
    }
    
    // Réinitialiser le chemin actuel
    folderCurrentPath = [];
    
    // Charger la structure du dossier depuis Supabase
    await loadFolderStructure(elementId);
    
    // Rendre les dossiers
    renderFolders();
    
    toggleCreationHubVisibility();
}


// Ajouter l'écouteur pour la sélection de fichiers dans le dossier
document.getElementById('folderFileInput')?.addEventListener('change', handleFolderFileSelect);

document.addEventListener("DOMContentLoaded", () => {
    // Sélectionnez le conteneur de messages
    const messageContainer = document.getElementById("messageContainer");

    // Vérifiez si l'élément existe avant d'appliquer les actions
    if (messageContainer) {
        // Ajoutez un listener pour détecter tout changement DOM, comme l'ajout de messages
        const observer = new MutationObserver(() => {
            // Réinitialisez le comportement du conteneur pour corriger le défilement
            messageContainer.style.overflowY = "auto";
            messageContainer.style.scrollSnapType = "y mandatory"; // Si snap-y est nécessaire
        });

        // Observez les changements dans le conteneur de messages (enfants ajoutés ou retirés)
        observer.observe(messageContainer, { childList: true });

        // Ajoutez un style inline pour forcer les propriétés de défilement
        messageContainer.style.overflowY = "auto";
        messageContainer.style.scrollBehavior = "smooth"; // Défilement fluide
        messageContainer.style.webkitOverflowScrolling = "touch"; // Pour iOS
    }
});
    // Fonction pour définir la variable CSS --vh
    function setVh() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Initialiser la variable au chargement et lors des redimensionnements
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    window.addEventListener('DOMContentLoaded', setVh);
    const messageInput = document.getElementById('messageInput');
if (messageInput) {
    messageInput.addEventListener('input', function () {
        // Réinitialise la hauteur pour éviter d'empiler des hauteurs inutiles
        this.style.height = 'auto';
        // Ajuste la hauteur en fonction du contenu
        this.style.height = `${this.scrollHeight}px`;
        // Ajuste le padding des messages
        adjustMessagesPadding();
    });
}
    

/*══════════════════════════════╗
  🔵 JS PARTIE 2
  ═════════════════════════════╝*/


    document.addEventListener("DOMContentLoaded", () => {
        const chatInterface = document.querySelector(".chat-interface");
        const messageContainer = document.getElementById("messageContainer");

        function adjustChatHeight() {
            // Calcule la hauteur disponible pour le conteneur des messages
            const headerHeight = document.querySelector(".chat-header")?.offsetHeight || 0;
            const inputAreaHeight = document.querySelector(".chat-input-wrapper")?.offsetHeight || 0;
            const quickActionsHeight = document.querySelector(".chat-quick-actions")?.offsetHeight || 0;
            const totalHeight = window.innerHeight;

            // Ajuste la hauteur du conteneur des messages
            const availableHeight = totalHeight - (headerHeight + inputAreaHeight + quickActionsHeight);
            messageContainer.style.height = `${availableHeight}px`;
        }

        // Ajuster la hauteur au chargement et lors du redimensionnement
        adjustChatHeight();
        window.addEventListener("resize", adjustChatHeight);

        // Forcer le défilement vers le bas lors de l'ajout de messages
        function scrollToBottom() {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }

   
    });
    document.addEventListener('DOMContentLoaded', () => {
    const backButtons = document.querySelectorAll('.chat-back-btn, .note-container .chat-back-btn');
    backButtons.forEach(button => {
        const parent = button.parentElement;
        if (parent) {
            const resizeObserver = new ResizeObserver(() => {
                const parentRect = parent.getBoundingClientRect();
                const buttonRect = button.getBoundingClientRect();

                // Ajuste la position si le bouton déborde
                if (buttonRect.left < parentRect.left) {
                    button.style.left = `${parentRect.left + 10}px`;
                }
                if (buttonRect.top < parentRect.top) {
                    button.style.top = `${parentRect.top + 10}px`;
                }
            });
            resizeObserver.observe(parent);
        }
    });
});
// Code pour intercepter la touche retour et déclencher les fonctions de retour existantes

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour gérer l'appui sur la touche retour du navigateur
    function handleBackButton(event) {
        // Identifier quelle interface est actuellement visible
        const chatContainerVisible = document.getElementById('chatContainer').style.display === 'block';
        const noteContainerVisible = document.getElementById('noteContainer').style.display === 'block';
        const folderContainerVisible = document.getElementById('folderContainer').style.display === 'block';
        const identityContainerVisible = document.getElementById('identityContainer').style.display === 'block';

        // Si une interface spécifique est ouverte, empêcher le comportement par défaut
        // et déclencher la fonction de retour appropriée
        if (chatContainerVisible) {
            event.preventDefault();
            exitChat();
            return true;
        } else if (noteContainerVisible) {
            event.preventDefault();
            exitNote();
            return true;
        } else if (folderContainerVisible) {
            event.preventDefault();
            exitFolder();
            return true;
        } else if (identityContainerVisible) {
            event.preventDefault();
            // Retourner à l'univers principal
            filterContentByCategory('universe');
            return true;
        }

        // Si aucune interface spéciale n'est ouverte, laisser le comportement par défaut
        return false;
    }

    // Intercepter la touche retour sur ordinateurs
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' || event.key === 'Backspace' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            handleBackButton(event);
        }
    });

    // Intercepter la touche retour sur mobile et autres appareils
    window.addEventListener('popstate', function(event) {
        // Si une interface spéciale est ouverte, empêcher le retour par défaut et exécuter notre fonction de retour
        if (handleBackButton(event)) {
            // Ajouter un état dans l'historique pour maintenir le comportement cohérent
            history.pushState(null, document.title, window.location.href);
        }
    });

    // Initialiser l'historique pour intercepter popstate
    history.pushState(null, document.title, window.location.href);
});



//══════════════════════════════╗
// 🟣 JS PARTIE 3
//══════════════════════════════╝


// Script pour le bouton de création
document.addEventListener('DOMContentLoaded', function() {
    const creationButton = document.querySelector('.creation-button');
    const creationItems = document.querySelectorAll('.creation-item');
    
    // Animation au clic sur le bouton
    creationButton.addEventListener('click', function() {
        this.classList.add('clicked');
        
        // Effet de connexion avec les idées
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 600);
    });
    

});


/*══════════════════════════════╗
  🟠 JS PARTIE 4
  ═════════════════════════════╝*/


// Script pour le modal de création
document.addEventListener('DOMContentLoaded', function() {
    // Référence aux éléments DOM
    const creationMenu = document.querySelector('.creation-menu');
    const creationItems = document.querySelectorAll('.creation-item');
    const modal = document.getElementById('creation-modal');
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const createBtn = modal.querySelector('.create-btn');
    const typeOptions = modal.querySelectorAll('.type-option');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const tagsInput = document.getElementById('tags-input');
    const tagsList = modal.querySelector('.tags-list');
    const priorityOptions = modal.querySelectorAll('.priority-option');
    const charCounter = modal.querySelector('.char-counter');
    const categoryGrid = modal.querySelector('.category-grid');
    
    // Variables pour stocker les données sélectionnées
    let selectedType = null;
    let selectedCategory = null;
    let selectedPriority = null;
    let currentTags = [];
    
    // Images par type
    const typeImages = {
        'dossier': ["📁", "📂", "🗂️"],
        'note': ["📝", "📄", "📃"],
        'chat': ["🗨️", "💭", "💬"]
    };
    
    // Configuration des catégories à partir de la navigation principale
    function populateCategories() {
        categoryGrid.innerHTML = '';
        
        // Utiliser les éléments de la navigation principale comme catégories
        const navItems = document.querySelectorAll('.main-nav .nav-item');
        
        navItems.forEach(item => {
            const category = item.dataset.category;
            // Exclure "Mon univers" et "Identity"
            if (category !== 'universe' && category !== 'Identity') {
                const emoji = item.innerText.trim();
                const tooltip = item.querySelector('.tooltip').innerText;
                
                const categoryItem = document.createElement('div');
                categoryItem.className = 'category-item';
                categoryItem.dataset.category = category;
                categoryItem.innerHTML = `
                    <div class="category-icon">${emoji}</div>
                    <div class="category-name">${tooltip}</div>
                `;
                
                categoryItem.addEventListener('click', () => {
                    modal.querySelectorAll('.category-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    categoryItem.classList.add('selected');
                    selectedCategory = category;
                });
                
                categoryGrid.appendChild(categoryItem);
            }
        });
    }
    
    // Associer les événements aux éléments du menu de création
    creationItems.forEach(item => {
        item.addEventListener('click', () => {
            selectedType = item.dataset.type;
            openCreationModal(selectedType);
            // Masquer le menu de création
            document.querySelector('.creation-menu').style.display = 'none';
        });
    });
    
    // Ouvrir le modal de création
    function openCreationModal(type) {
              // Réinitialiser le formulaire
        resetForm();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Empêcher le défilement
        

        
        // Pré-sélectionner le type
        typeOptions.forEach(option => {
            if (option.dataset.type === type) {
                option.classList.add('selected');
                selectedType = type;
                
                // Mettre à jour l'indicateur de type
                const typeIndicator = modal.querySelector('.type-indicator');
                typeIndicator.dataset.type = type;
                
                const typeIcon = {
                    'dossier': '📁',
                    'note': '📝',
                    'chat': '💬'
                }[type];
                
                typeIndicator.querySelector('.type-icon').textContent = typeIcon;
                
                // Mettre à jour le titre du modal
                let modalTitle = 'Créer un nouveau ';
                if (type === 'dossier') modalTitle += 'dossier';
                else if (type === 'note') modalTitle += 'note';
                else if (type === 'chat') modalTitle += 'chat';
                
                modal.querySelector('.modal-title').textContent = modalTitle;
            }
        });
        
        // Peupler les catégories
        populateCategories();
        
        // Ajouter des particules d'animation
        createParticles();
        
        // Focus sur le champ de titre
        setTimeout(() => {
            titleInput.focus();
        }, 300);
    }
    
    // Gestion des clics sur les options de type
    typeOptions.forEach(option => {
        option.addEventListener('click', () => {
            typeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedType = option.dataset.type;
            
            // Mettre à jour l'indicateur de type
            const typeIndicator = modal.querySelector('.type-indicator');
            typeIndicator.dataset.type = selectedType;
            
            const typeIcon = {
                'dossier': '📁',
                'note': '📝',
                'chat': '💬'
            }[selectedType];
            
            typeIndicator.querySelector('.type-icon').textContent = typeIcon;
            
            // Mettre à jour le titre du modal
            let modalTitle = 'Créer un nouveau ';
            if (selectedType === 'dossier') modalTitle += 'dossier';
            else if (selectedType === 'note') modalTitle += 'note';
            else if (selectedType === 'chat') modalTitle += 'chat';
            
            modal.querySelector('.modal-title').textContent = modalTitle;
        });
    });
    
    // Gestion des clics sur les options de priorité
    priorityOptions.forEach(option => {
        option.addEventListener('click', () => {
            priorityOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedPriority = option.dataset.priority;
        });
    });
    
    // Gestion du compteur de caractères pour le titre
    titleInput.addEventListener('input', () => {
        const length = titleInput.value.length;
        charCounter.textContent = `${length}/100`;
        
        // Mettre à jour la couleur en fonction de la longueur
        if (length > 80) {
            charCounter.style.color = '#ef4444';
        } else if (length > 50) {
            charCounter.style.color = '#f59e0b';
        } else {
            charCounter.style.color = '';
        }
    });
    
    // Gestion des tags
    tagsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tagText = tagsInput.value.trim();
            
            if (tagText && currentTags.length < 3) {
                // Vérifier que le tag n'est pas déjà dans la liste
                if (!currentTags.includes(tagText)) {
                    addTag(tagText);
                    tagsInput.value = '';
                }
            }
        }
    });
    
    function addTag(text) {
        currentTags.push(text);
        
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `
            ${text}
            <span class="tag-remove">&times;</span>
        `;
        
        tag.querySelector('.tag-remove').addEventListener('click', () => {
            tag.remove();
            currentTags = currentTags.filter(t => t !== text);
        });
        
        tagsList.appendChild(tag);
    }
    
// Fermer le modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Réactiver le défilement
    
    // Réinitialiser complètement le formulaire et supprimer l'animation de succès
    resetForm();
}

    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Cliquer en dehors du modal pour le fermer
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
// Réinitialiser le formulaire
function resetForm() {
    selectedCategory = null;
    selectedPriority = null;
    currentTags = [];
    
    titleInput.value = '';
    descriptionInput.value = '';
    tagsInput.value = '';
    tagsList.innerHTML = '';
    charCounter.textContent = '0/100';
    
    typeOptions.forEach(opt => opt.classList.remove('selected'));
    priorityOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Supprimer l'overlay de succès s'il existe
    const overlay = modal.querySelector('.success-overlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Réinitialiser les classes d'animation de succès
    const content = modal.querySelector('.creation-modal-content');
    content.classList.remove('creation-success');
    
    // Réinitialiser les erreurs
    modal.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

    
    // Animation de particules
    function createParticles() {
        const container = modal.querySelector('.quantum-particles');
        container.innerHTML = '';
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Position initiale aléatoire
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Direction aléatoire
            const tx = (Math.random() - 0.5) * 200;
            const ty = (Math.random() - 0.5) * 200;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            
            // Couleur aléatoire
            const hue = 220 + Math.random() * 60;
            particle.style.background = `hsl(${hue}, 70%, 60%)`;
            
            // Animation avec délai aléatoire
            const delay = Math.random() * 4;
            const duration = 2 + Math.random() * 2;
            particle.style.animation = `particleAnimation ${duration}s ${delay}s infinite`;
            
            container.appendChild(particle);
        }
    }
    
// Création d'un nouvel élément
createBtn.addEventListener('click', async () => {
  // À ajouter au début de la fonction du bouton createBtn
console.log("Début création - Type:", selectedType);
console.log("Catégorie:", selectedCategory);
console.log("Titre:", titleInput.value);
console.log("Priorité:", selectedPriority);

    console.log("Bouton créer cliqué");
    // Vérifier que les champs obligatoires sont remplis
    if (!selectedType || !selectedCategory || !titleInput.value || !selectedPriority) {
        console.log("Champs manquants:", {
            type: selectedType,
            category: selectedCategory,
            title: titleInput.value,
            priority: selectedPriority
        });
        
        // Mettre en évidence les champs manquants
        if (!selectedType) {
            modal.querySelector('.type-selection').classList.add('error');
        }
        if (!selectedCategory) {
            modal.querySelector('.category-selector').classList.add('error');
        }
        if (!titleInput.value) {
            titleInput.classList.add('error');
        }
        if (!selectedPriority) {
            modal.querySelector('.priority-options').classList.add('error');
        }
        return;
    }
    
    // Traiter les tags s'il y a du texte dans l'input mais pas encore ajouté à la liste
    if (tagsInput.value.trim()) {
        // Diviser l'entrée par les virgules et traiter chaque partie comme un tag séparé
        const inputTags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        // Ajouter chaque tag non déjà inclus, jusqu'à la limite de 3 tags au total
        inputTags.forEach(tagText => {
            if (!currentTags.includes(tagText) && currentTags.length < 3) {
                addTag(tagText);
            }
        });
    }

    // Créer l'objet de données
    const newItem = {
        category: selectedCategory,
        type: selectedType,
        title: titleInput.value,
        date: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
        description: descriptionInput.value || null,
        images: typeImages[selectedType],
        tags: currentTags,
        priority: selectedPriority
    };
    
    console.log("Nouvel élément créé:", newItem);
    
    // Animation de création en cours
    const content = modal.querySelector('.creation-modal-content');
    content.classList.add('creating');
    
    // Enregistrer dans Supabase
    const success = await saveElementToSupabase(newItem);
    
    if (success) {
        // Ajouter l'élément à sampleData
        window.sampleData.push(newItem);
        
        highlightNewElement(newItem.title);
        
        // Actualiser la grille
        populateGrid();
        
        // Mettre à jour les compteurs
        updateCategoryCounts();
        
        // Mettre à jour l'ordre des éléments de navigation
        updateNavOrder();
        
        // Si la catégorie actuelle est celle qui vient d'être ajoutée, mettre à jour l'affichage
        const activeNavItem = document.querySelector('.nav-item.active');
        if (activeNavItem && activeNavItem.dataset.category === selectedCategory) {
            filterContentByCategory(selectedCategory);
        } else {
            // Sinon, filtrer pour afficher tous les éléments
            filterContentByCategory('universe');
        }
        
        // Animation de création réussie
        createSuccessAnimation();
        
        // Fermer le modal
        setTimeout(() => {
            closeModal();
            // Ré-afficher la grille après la fermeture
            document.getElementById('contentGrid').style.display = 'grid';
        }, 1500);
    } else {
        // En cas d'erreur
        content.classList.remove('creating');
        
        // Afficher un message d'erreur
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.";
        content.appendChild(errorMessage);
        
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }
});



    
    // Animation de succès
    function createSuccessAnimation() {
        const content = modal.querySelector('.creation-modal-content');
        content.classList.add('creation-success');
        
        // Ajouter une superposition d'animation
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `
            <div class="success-icon">✓</div>
            <div class="success-message">Élément créé avec succès!</div>
        `;
        content.appendChild(overlay);
        
        // Styles pour l'animation de succès
        const style = document.createElement('style');
        style.innerHTML = `
            .creation-success {
                position: relative;
                overflow: hidden;
            }
            
            .success-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                animation: slideIn 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                z-index: 10;
            }
            
            .success-icon {
                font-size: 3rem;
                color: white;
                background: rgba(255, 255, 255, 0.2);
                width: 80px;
                height: 80px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                animation: scaleIn 0.5s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
            }
            
            .success-message {
                font-size: 1.5rem;
                color: white;
                font-weight: 600;
                animation: fadeIn 0.5s 0.4s both;
            }
            
            @keyframes slideIn {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
            
            @keyframes scaleIn {
                from { transform: scale(0); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Associer la fonctionnalité aux éléments du menu principal
    const creationButton = document.querySelector('.creation-button');
    const creationMenuItems = document.querySelectorAll('.creation-menu .creation-item');
    
    creationButton.addEventListener('click', () => {
        creationMenu.style.display = creationMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.creation-hub')) {
            creationMenu.style.display = 'none';
        }
    });

    // Ajouter au style existant pour le menu de création
    const creationMenuStyle = document.createElement('style');
    creationMenuStyle.innerHTML = `
        .creation-menu {
            position: absolute;
            bottom: 90px;
            right: 30px;
            background: var(--bg-secondary);
            border-radius: 16px;
            padding: 10px;
            display: none;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideUp 0.3s cubic-bezier(0.19, 1, 0.22, 1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .creation-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 15px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .creation-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(5px);
        }
        
        .icon-container {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        
        .creation-icon {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }
        
        .creation-item[data-type="dossier"] {
            color: #f59e0b;
        }
        
        .creation-item[data-type="note"] {
            color: #34d399;
        }
        
        .creation-item[data-type="chat"] {
            color: #60a5fa;
        }
        
        .creation-hub {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
        }
        
        .creation-button {
            width: 60px;
            height: 60px;
            cursor: pointer;
            filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .creation-button:hover {
            transform: scale(1.1);
        }
        
        .creation-button.clicked .button-bg {
            animation: pulse 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .creation-button.clicked .idea-pulse {
            animation: ideaPulse 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        @keyframes ideaPulse {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0; transform: scale(1.4); }
        }
        
        .orbit {
            fill: none;
            stroke: rgba(255, 255, 255, 0.2);
            stroke-width: 1;
            stroke-dasharray: 5 3;
            animation: rotate 30s linear infinite;
        }
        
        .orbit:nth-child(2) {
            animation-duration: 40s;
            animation-direction: reverse;
        }
        
        .particle {
            fill: white;
            opacity: 0.7;
            animation: moveParticle 10s ease-in-out infinite;
        }
        
        .particle-1 {
            animation-duration: 15s;
        }
        
        .particle-2 {
            animation-duration: 20s;
            animation-delay: 2s;
        }
        
        .particle-3 {
            animation-duration: 25s;
            animation-delay: 5s;
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes moveParticle {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(10px, -10px); }
        }
        
        /* Style pour le bouton et menu sur mobile */
        @media (max-width: 768px) {
            .creation-hub {
                bottom: 20px;
                right: 20px;
            }
            
            .creation-button {
                width: 50px;
                height: 50px;
            }
            
            .creation-menu {
                bottom: 80px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(creationMenuStyle);
});

// Fonction pour mettre en évidence les nouveaux éléments ajoutés
function highlightNewElement(title) {
    setTimeout(() => {
        const cards = document.querySelectorAll('.content-card');
        cards.forEach(card => {
            if (card.dataset.title === title) {
                card.classList.add('new-element');
                setTimeout(() => {
                    card.classList.remove('new-element');
                }, 3000);
            }
        });
    }, 100);
}


// Variables pour le modal d'édition
let editCurrentTags = [];
let editSelectedCategory = null;
let editSelectedPriority = null;

// Fonction pour ouvrir le modal d'édition
function openEditModal(id, card) {
    console.log("Ouverture du modal d'édition pour ID:", id); // Debug
    
    const editModal = document.getElementById('edit-modal');
    const element = window.sampleData.find(item => item.id === id);
    
    if (!element) {
        console.error('Élément non trouvé avec ID:', id);
        return;
    }
    
    // Remplir le modal avec les données de l'élément
    const editIdInput = document.getElementById('edit-id');
    const editTitleInput = document.getElementById('edit-title-input');
    const editDescInput = document.getElementById('edit-description-input');
    const editTagsList = document.querySelector('.edit-tags-list');
    
    editIdInput.value = id;
    editTitleInput.value = element.title;
    editDescInput.value = element.description || '';
    
    // Réinitialiser les tags
    editCurrentTags = [...element.tags];
    editTagsList.innerHTML = '';
    
    editCurrentTags.forEach(tag => {
        addEditTag(tag);
    });
    
    // Sélectionner la catégorie
    editSelectedCategory = element.category;
    populateEditCategories();
    
    // Sélectionner la priorité
    editSelectedPriority = element.priority;
    document.querySelectorAll('.edit-priority-options .priority-option').forEach(option => {
        if (option.dataset.priority === editSelectedPriority) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Mettre à jour le compteur de caractères
    const charCounter = editModal.querySelector('.char-counter');
    charCounter.textContent = `${editTitleInput.value.length}/100`;
    
    // Afficher le modal
    editModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
    
    // Focus sur le champ de titre
    setTimeout(() => {
        editTitleInput.focus();
    }, 300);
}


// Fonction pour peupler les catégories dans le modal d'édition
function populateEditCategories() {
    const categoryGrid = document.querySelector('.edit-category-grid');
    categoryGrid.innerHTML = '';
    
    // Utiliser les éléments de la navigation principale comme catégories
    const navItems = document.querySelectorAll('.main-nav .nav-item');
    
    navItems.forEach(item => {
        const category = item.dataset.category;
        // Exclure "Mon univers" et "Identity"
        if (category !== 'universe' && category !== 'Identity') {
            const emoji = item.innerText.trim();
            const tooltip = item.querySelector('.tooltip').innerText;
            
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            categoryItem.dataset.category = category;
            
            // Sélectionner la catégorie active
            if (category === editSelectedCategory) {
                categoryItem.classList.add('selected');
            }
            
            categoryItem.innerHTML = `
                <div class="category-icon">${emoji}</div>
                <div class="category-name">${tooltip}</div>
            `;
            
            categoryItem.addEventListener('click', () => {
                document.querySelectorAll('.edit-category-grid .category-item').forEach(item => {
                    item.classList.remove('selected');
                });
                categoryItem.classList.add('selected');
                editSelectedCategory = category;
            });
            
            categoryGrid.appendChild(categoryItem);
        }
    });
}

// Fonction pour ajouter un tag dans le modal d'édition
function addEditTag(text) {
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `
        ${text}
        <span class="tag-remove">&times;</span>
    `;
    
    tag.querySelector('.tag-remove').addEventListener('click', () => {
        tag.remove();
        editCurrentTags = editCurrentTags.filter(t => t !== text);
    });
    
    document.querySelector('.edit-tags-list').appendChild(tag);
}

// Gestionnaire d'événement pour le champ de tags du modal d'édition
document.getElementById('edit-tags-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const tagText = e.target.value.trim();
        
        if (tagText && editCurrentTags.length < 3) {
            // Vérifier que le tag n'est pas déjà dans la liste
            if (!editCurrentTags.includes(tagText)) {
                editCurrentTags.push(tagText);
                addEditTag(tagText);
                e.target.value = '';
            }
        }
    }
});

// Gestionnaire d'événement pour les options de priorité du modal d'édition
document.querySelectorAll('.edit-priority-options .priority-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.edit-priority-options .priority-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
        editSelectedPriority = option.dataset.priority;
    });
});

// Gestionnaire d'événement pour le bouton de mise à jour
document.querySelector('#edit-modal .update-btn')?.addEventListener('click', async function() {
    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title-input').value;
    const description = document.getElementById('edit-description-input').value;
    
    console.log("Mise à jour de l'élément avec ID:", id);
    
    // Vérifier que les champs obligatoires sont remplis
    if (!title || !editSelectedCategory || !editSelectedPriority) {
        // Mettre en évidence les champs manquants
        if (!title) {
            document.getElementById('edit-title-input').classList.add('error');
        }
        if (!editSelectedCategory) {
            document.querySelector('.edit-category-grid').parentElement.classList.add('error');
        }
        if (!editSelectedPriority) {
            document.querySelector('.edit-priority-options').classList.add('error');
        }
        return;
    }
    
    // Créer l'objet de mises à jour
    const updates = {
        title,
        category: editSelectedCategory,
        description: description || null,
        tags: editCurrentTags,
        priority: editSelectedPriority
    };
    
    // Animation de mise à jour en cours
    const content = document.querySelector('#edit-modal .creation-modal-content');
    content.classList.add('updating');
    
    try {
        // Vérifier si c'est un élément de démonstration ou un élément de Supabase
        if (id.startsWith('demo-')) {
            // Élément de démonstration, mise à jour locale seulement
            const index = window.sampleData.findIndex(item => item.id === id);
            if (index !== -1) {
                window.sampleData[index] = {
                    ...window.sampleData[index],
                    ...updates
                };
            }
            
            // Simuler un délai pour l'animation
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Considérer comme un succès
            success = true;
        } else {
            // Élément de Supabase, appel à l'API
            success = await updateElementInSupabase(id, updates);
        }
        
        if (success) {
            // Si c'est un élément Supabase, mettre également à jour le tableau local
            if (!id.startsWith('demo-')) {
                const index = window.sampleData.findIndex(item => item.id === id);
                if (index !== -1) {
                    window.sampleData[index] = {
                        ...window.sampleData[index],
                        ...updates
                    };
                }
            }
            
            // Actualiser la grille
            populateGrid();
            
            // Mettre à jour les compteurs
            updateCategoryCounts();
            
            // Mettre à jour l'ordre des éléments de navigation
            updateNavOrder();
            
            // Animation de mise à jour réussie
            createEditSuccessAnimation();
            
            // Fermer le modal
            setTimeout(() => {
                closeEditModal();
            }, 1500);
        } else {
            throw new Error("Échec de la mise à jour");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        
        // En cas d'erreur
        content.classList.remove('updating');
        
        // Afficher un message d'erreur
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = "Une erreur est survenue lors de la mise à jour. Veuillez réessayer.";
        content.appendChild(errorMessage);
        
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }
});


// Fonction pour fermer le modal d'édition
function closeEditModal() {
    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'none';
    document.body.style.overflow = ''; // Réactiver le défilement
}

// Gestionnaire d'événement pour le bouton de fermeture du modal d'édition
document.querySelector('#edit-modal .close-modal')?.addEventListener('click', closeEditModal);

// Gestionnaire d'événement pour le bouton d'annulation du modal d'édition
document.querySelector('#edit-modal .cancel-btn')?.addEventListener('click', closeEditModal);

// Fermer le modal en cliquant en dehors
document.getElementById('edit-modal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('edit-modal')) {
        closeEditModal();
    }
});

// Animation de succès pour l'édition
function createEditSuccessAnimation() {
    const content = document.querySelector('#edit-modal .creation-modal-content');
    content.classList.add('edit-success');
    
    // Ajouter une superposition d'animation
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
        <div class="success-icon">✓</div>
        <div class="success-message">Élément mis à jour avec succès!</div>
    `;
    content.appendChild(overlay);
}

// Gestionnaire pour le compteur de caractères dans le modal d'édition
document.getElementById('edit-title-input')?.addEventListener('input', (e) => {
    const charCounter = document.querySelector('#edit-modal .char-counter');
    const length = e.target.value.length;
    
    charCounter.textContent = `${length}/100`;
    
    // Mettre à jour la couleur en fonction de la longueur
    if (length > 80) {
        charCounter.style.color = '#ef4444';
    } else if (length > 50) {
        charCounter.style.color = '#f59e0b';
    } else {
        charCounter.style.color = '';
    }
});



//══════════════════════════════╗
// 🔴 JS PARTIE 5
//══════════════════════════════╝

// Vérifier l'authentification Supabase
async function checkSupabaseSession() {
    try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error('Erreur lors de la vérification de la session:', error);
            return false;
        }
        
        return data.session !== null;
    } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error);
        return false;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Système d'authentification
    const authContainer = document.getElementById('authContainer');
    const authForm = document.getElementById('authForm');
    const passwordInput = document.getElementById('passwordInput');
    const authButton = document.getElementById('authButton');
    const authFeedback = document.getElementById('authFeedback');
    const togglePassword = document.getElementById('togglePassword');
    const alternativeAuthBtn = document.getElementById('alternativeAuthBtn');
    const questionContainer = document.getElementById('questionContainer');
    const closeQuestionBtn = document.getElementById('closeQuestionBtn');
    const symbolsGrid = document.getElementById('symbolsGrid');
    const personalDateInput = document.getElementById('personalDateInput');
    const personalPhraseInput = document.getElementById('personalPhraseInput');
    const verifyIdentityBtn = document.getElementById('verifyIdentityBtn');
    const questionFeedback = document.getElementById('questionFeedback');
    const authProgress = document.getElementById('authProgress');
    const authLoading = document.getElementById('authLoading');
    
    // Animation des lettres du nom
    const letters = document.querySelectorAll('.auth-letter');
    letters.forEach(letter => {
        letter.classList.add('auth-letter-animation');
    });
    
    // Afficher le sous-titre après l'animation des lettres
    setTimeout(() => {
        document.querySelector('.auth-name-subtitle').classList.add('visible');
        authForm.classList.add('visible');
    }, 1500);
    
    // Montrer/cacher le mot de passe
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        // Changer l'icône
        this.innerHTML = type === 'password' 
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>' 
            : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
    });
    
// Vérification du mot de passe principal
authButton.addEventListener('click', async function() {
    const password = passwordInput.value;
    
    try {
        // Vérifier le mot de passe avec Supabase
        // Note: Dans une application réelle, utilisez une fonction RPC Supabase pour cette vérification
        // Cette approche simplifiée n'est pas recommandée pour la production
        
        // Mot de passe local pour le développement
        if (password === "01Jeanlik2003@") {
            authFeedback.textContent = "Authentification réussie";
            authFeedback.className = "auth-feedback visible success";
            
            // Authentification réussie, stockons une session dans localStorage
            localStorage.setItem('isAuthenticated', 'true');
            
            // Afficher l'écran de chargement
            setTimeout(() => {
                authLoading.classList.remove('hidden');
                
                // Disparition progressive après le chargement
                setTimeout(() => {
                    authLoading.style.opacity = '0';
                    setTimeout(() => {
                        authContainer.style.opacity = '0';
                        setTimeout(() => {
                            authContainer.remove();
                        }, 1000);
                    }, 500);
                }, 2000);
            }, 1000);
        } else {
            // Mot de passe incorrect
            authFeedback.textContent = "Mot de passe incorrect";
            authFeedback.className = "auth-feedback visible error";
            
            // Effet visuel d'erreur
            passwordInput.classList.add('auth-input-error');
            setTimeout(() => {
                passwordInput.classList.remove('auth-input-error');
            }, 500);
            
            // Créer un effet de vibration
            authForm.classList.add('shake');
            setTimeout(() => {
                authForm.classList.remove('shake');
            }, 500);
        }
    } catch (error) {
        console.error('Erreur lors de l\'authentification:', error);
        authFeedback.textContent = "Erreur lors de l'authentification";
        authFeedback.className = "auth-feedback visible error";
    }
});

    
    // Fonction pour créer des pulsations visuelles aléatoires
    function createPulseEffect() {
        const pulse = document.createElement('div');
        pulse.className = 'pulse-effect';
        
        // Position aléatoire
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        pulse.style.left = `${x}px`;
        pulse.style.top = `${y}px`;
        
        // Taille aléatoire
        const size = 50 + Math.random() * 100;
        pulse.style.width = `${size}px`;
        pulse.style.height = `${size}px`;
        
        authContainer.appendChild(pulse);
        
        // Supprimer l'élément après l'animation
        setTimeout(() => {
            pulse.remove();
        }, 2000);
    }
    
    // Créer des effets de pulsation périodiquement
    setInterval(createPulseEffect, 3000);
    
    // Méthode d'authentification alternative
    alternativeAuthBtn.addEventListener('click', function() {
        questionContainer.classList.add('visible');
        populateSymbolsGrid();
    });
    
    closeQuestionBtn.addEventListener('click', function() {
        questionContainer.classList.remove('visible');
    });
    
    // Générer la grille de symboles
    function populateSymbolsGrid() {
        // Tous les symboles possibles
        const allSymbols = [
            '🌐', '⬇️', '📱', '🍜', '🔍', '🎬', '💻', '🤖', '🎄', '🌍',
            '💭', '⚡', '✨', '🧠', '🔑', '🎵', '📚', '⏳', '🎮', '🏆',
            '🏠', '🔆', '🌈', '🧩', '🚀', '📆', '💡', '🔄', '👁️', '🎭'
        ];
        
        // Les symboles corrects (qui ont une signification pour vous)
        const correctSymbols = ['🌐', '⬇️', '📱', '🍜', '🔍', '🎬', '💻', '🤖', '🎄'];
        
        // Mélanger les symboles
        const shuffledSymbols = [...allSymbols].sort(() => Math.random() - 0.5);
        
        // Limiter à 9 symboles pour la grille 3x3
        const gridSymbols = shuffledSymbols.slice(0, 9);
        
        // S'assurer qu'au moins 3 symboles corrects sont présents
        let correctCount = gridSymbols.filter(s => correctSymbols.includes(s)).length;
        
        if (correctCount < 3) {
            // Remplacer des symboles aléatoires par des corrects
            while (correctCount < 3) {
                const randomIndex = Math.floor(Math.random() * 9);
                if (!correctSymbols.includes(gridSymbols[randomIndex])) {
                    // Prendre un symbole correct qui n'est pas déjà dans la grille
                    const availableCorrectSymbols = correctSymbols.filter(s => !gridSymbols.includes(s));
                    if (availableCorrectSymbols.length > 0) {
                        gridSymbols[randomIndex] = availableCorrectSymbols[0];
                        correctCount++;
                    }
                }
            }
        }
        
        // Remplir la grille
        symbolsGrid.innerHTML = '';
        gridSymbols.forEach(symbol => {
            const item = document.createElement('div');
            item.className = 'auth-grid-item';
            item.innerHTML = `<span class="auth-grid-icon">${symbol}</span>`;
            
            item.addEventListener('click', function() {
                this.classList.toggle('selected');
                updateProgressBar();
            });
            
            symbolsGrid.appendChild(item);
        });
    }
    
    // Mettre à jour la barre de progression
    function updateProgressBar() {
        const selectedSymbols = document.querySelectorAll('.auth-grid-item.selected').length;
        const dateValue = personalDateInput.value.trim();
        const phraseValue = personalPhraseInput.value.trim();
        
        // Calculer la progression (symboles + date + phrase)
        let progress = 0;
        if (selectedSymbols > 0) progress += 33.3;
        if (dateValue) progress += 33.3;
        if (phraseValue) progress += 33.3;
        
        authProgress.style.width = `${progress}%`;
    }
    
    // Écouter les entrées pour mettre à jour la progression
    personalDateInput.addEventListener('input', updateProgressBar);
    personalPhraseInput.addEventListener('input', updateProgressBar);
    
    // Vérification de l'identité

verifyIdentityBtn.addEventListener('click', function() {
    const selectedSymbols = Array.from(document.querySelectorAll('.auth-grid-item.selected')).map(
        item => item.querySelector('.auth-grid-icon').textContent
    );
    
    const dateValue = personalDateInput.value.trim();
    const phraseValue = personalPhraseInput.value.trim().toLowerCase();
    
    // Les symboles corrects
    const correctSymbols = ['🌐', '⬇️', '📱', '🍜', '🔍', '🎬', '💻', '🤖', '🎄'];
    
    // Vérification stricte des symboles:
    // 1. Au moins 3 symboles corrects doivent être sélectionnés
    // 2. AUCUN symbole incorrect ne doit être sélectionné
    const correctSelectedSymbols = selectedSymbols.filter(s => correctSymbols.includes(s));
    const incorrectSelectedSymbols = selectedSymbols.filter(s => !correctSymbols.includes(s));
    const hasEnoughCorrectSymbols = correctSelectedSymbols.length >= 3;
    const hasNoIncorrectSymbols = incorrectSelectedSymbols.length === 0;
    const symbolCheckPassed = hasEnoughCorrectSymbols && hasNoIncorrectSymbols;
    
    // Vérification stricte de la date (format exact requis)
    const isDateValid = dateValue === "01/04/2003";
    
    // Vérification stricte de la phrase personnelle
    // Au moins 3 mots clés spécifiques doivent être présents
    const phraseKeywords = ['conscience', 'univers', 'mental', 'jean', 'louis', 'likula', 'moi', 'cerveau'];
    const matchedKeywords = phraseKeywords.filter(word => phraseValue.includes(word));
    const phraseCheckPassed = matchedKeywords.length >= 3;
    
    // Validation UNIQUEMENT si TOUTES les vérifications réussissent
    if (symbolCheckPassed && isDateValid && phraseCheckPassed) {
        questionFeedback.textContent = "Identité confirmée";
        questionFeedback.className = "auth-feedback visible success";
        
        // Afficher l'écran de chargement
        setTimeout(() => {
            questionContainer.classList.remove('visible');
            authLoading.classList.remove('hidden');
            
            // Disparition progressive après le chargement
            setTimeout(() => {
                authLoading.style.opacity = '0';
                setTimeout(() => {
                    authContainer.style.opacity = '0';
                    setTimeout(() => {
                        authContainer.remove();
                    }, 1000);
                }, 500);
            }, 2000);
        }, 1000);
    } else {
        // Message d'erreur cryptique pour ne pas donner d'indices
        questionFeedback.textContent = "Vérification échouée";
        questionFeedback.className = "auth-feedback visible error";
        
        // Effet visuel d'erreur
        document.querySelector('.auth-question-form').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.auth-question-form').classList.remove('shake');
        }, 500);
        
        // Générer une nouvelle grille après un délai
        // Reset complet pour éviter des tentatives par essai-erreur
        setTimeout(() => {
            populateSymbolsGrid();
            personalDateInput.value = '';
            personalPhraseInput.value = '';
            updateProgressBar();
        }, 1500);
    }
});

    
    // Activer la touche Entrée pour soumettre
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            authButton.click();
        }
    });
    
    personalPhraseInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyIdentityBtn.click();
        }
    });
    
    // Ajouter une animation de classe "shake" pour les erreurs
    const styles = document.createElement('style');
    styles.textContent = `
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
            10%, 90% {
                transform: translate3d(-1px, 0, 0);
            }
            20%, 80% {
                transform: translate3d(2px, 0, 0);
            }
            30%, 50%, 70% {
                transform: translate3d(-3px, 0, 0);
            }
            40%, 60% {
                transform: translate3d(3px, 0, 0);
            }
        }
        
        .auth-input-error {
            border-color: var(--error) !important;
            animation: flash 0.5s;
        }
        
        @keyframes flash {
            0%, 100% { border-color: var(--error); }
            50% { border-color: transparent; }
        }
    `;
    document.head.appendChild(styles);
});

/*══════════════════════════════╗
  🟡 JS PARTIE 6
  ═════════════════════════════╝*/

// Fonction pour charger les données depuis Supabase
async function loadDataFromSupabase() {
    try {
        const { data, error } = await supabase
            .from('elements')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Erreur lors du chargement des données:', error);
            return false;
        }
        
        if (data) {
            window.sampleData = data;
            
            // Actualiser l'interface
            populateGrid();
            updateCategoryCounts();
            updateNavOrder();
            console.log('Données chargées avec succès:', data.length, 'éléments');
            return true;
        }
    } catch (error) {
        console.error('Exception lors du chargement des données:', error);
        return false;
    }
}
// Fonctions pour interagir avec Supabase
async function fetchSocialAccounts() {
  try {
    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des comptes:', error);
    return [];
  }
}

async function addSocialAccount(account) {
  try {
    // Ajout de la date de création
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('social_accounts')
      .insert([{
        category: account.category,
        platform: account.platform,
        name: account.name,
        email: account.email,
        phone_number: account.phoneNumber,
        password: account.password,
        login_url: account.loginUrl,
        icon: account.icon,
        description: account.description,
        badges: account.badges || [],
        channels: account.channels || null,
        created_at: now  // Ajout de cette ligne
      }])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Erreur lors de l\'ajout du compte:', error);
    throw error;
  }
}

// Fonction pour enregistrer un nouvel élément dans Supabase
async function saveElementToSupabase(element) {
    try {
        console.log('Tentative d\'enregistrement:', element);
        
        // Assurez-vous que les champs sont correctement formatés
        const formattedElement = {
            ...element,
            // Assurez-vous que tags et images sont des tableaux JSON valides
            tags: Array.isArray(element.tags) ? element.tags : [],
            images: Array.isArray(element.images) ? element.images : []
        };
        
        const { data, error } = await supabase
            .from('elements')
            .insert([formattedElement])
            .select();
        
        if (error) {
            console.error('Erreur d\'enregistrement:', error);
            return false;
        }
        
        if (data && data.length > 0) {
            console.log('Élément enregistré avec ID:', data[0].id);
            // Mise à jour de l'élément local avec l'ID généré
            element.id = data[0].id;
            return true;
        } else {
            console.error('Pas de données retournées après insertion');
            return false;
        }
    } catch (error) {
        console.error('Exception lors de l\'enregistrement:', error);
        return false;
    }
}

async function syncWithSupabase() {
    try {
        const { data, error } = await supabase
            .from('elements')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Erreur de synchronisation:', error);
            return false;
        }
        
        if (data) {
            // Mise à jour des données locales
            window.sampleData = data;
            
            // Rafraîchir l'interface
            populateGrid();
            updateCategoryCounts();
            updateNavOrder();
            console.log('Synchronisation réussie:', data.length, 'éléments');
            return true;
        }
    } catch (error) {
        console.error('Exception lors de la synchronisation:', error);
        return false;
    }
}


// Fonction pour mettre à jour un élément existant
async function updateElementInSupabase(id, updates) {
    try {
        console.log("Mise à jour de l'élément avec ID:", id);
        console.log("Mises à jour:", updates);
        
        // Assurez-vous que l'ID est au format UUID correct
        if (typeof id !== 'string' || !id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            console.error('Format d\'ID invalide:', id);
            return false;
        }
        
        const { error } = await supabase
            .from('elements')
            .update(updates)
            .eq('id', id);
        
        if (error) {
            console.error('Erreur lors de la mise à jour:', error);
            return false;
        }
        
        console.log('Élément mis à jour avec succès');
        return true;
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        return false;
    }
}


// Fonction pour supprimer un élément
async function deleteElementFromSupabase(id) {
    try {
        console.log("Suppression de l'élément avec ID:", id);
        
        const { error } = await supabase
            .from('elements')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Erreur lors de la suppression:', error);
            return false;
        }
        
        console.log('Élément supprimé avec succès');
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        return false;
    }
}


// Fonction pour vérifier la connexion Supabase
async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase
            .from('elements')
            .select('count(*)');
        
        if (error) {
            console.error('Erreur de connexion Supabase:', error);
            return false;
        }
        
        console.log('Connexion Supabase OK, nombre d\'éléments:', data[0].count);
        return true;
    } catch (error) {
        console.error('Exception lors du test de connexion:', error);
        return false;
    }
}

// Appelez cette fonction au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    // Tester la connexion Supabase
    await testSupabaseConnection();
    
    // Le reste de votre code...
});



//══════════════════════════════╗
// 🟤 JS PARTIE 7
//══════════════════════════════╝
// PARTIE 1: Fonctions pour gérer les conversations dans Supabase

async function checkConversationStatus(elementId) {
    if (cachedConversations.has(elementId)) {
        return true;
    }
    try {
        const { data, error } = await supabase
            .from('conversations')
            .select('*')
            .eq('element_id', elementId)
            .single();

        if (error) return false;
        if (data) {
            cacheConversation(elementId, data);
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}


// Fonction pour charger la conversation existante
async function loadConversation(elementId) {
    // Vérifier d'abord le cache
    if (cachedConversations.has(elementId)) {
        return cachedConversations.get(elementId);
    }

    try {
        const { data, error } = await supabase
            .from('conversations')
            .select('*')
            .eq('element_id', elementId)
            .limit(1);
        
        if (error) {
            console.error('Erreur de chargement de la conversation:', error);
            return null;
        }
        
        if (data && data.length > 0) {
            cacheConversation(elementId, data[0]);
            return data[0];
        }
        
        return null;
    } catch (error) {
        console.error('Exception lors du chargement de la conversation:', error);
        return null;
    }
}


// Fonction pour créer une nouvelle conversation
async function createConversation(elementId, contactName, contactImage) {
    try {
        // Vérifier d'abord si une conversation existe déjà
        const { data: existingConversation } = await supabase
            .from('conversations')
            .select('*')
            .eq('element_id', elementId)
            .single();

        if (existingConversation) {
            return existingConversation;
        }

        const newConversation = {
            element_id: elementId,
            contact_name: contactName,
            contact_image: contactImage,
            messages: []
        };
        
        const { data, error } = await supabase
            .from('conversations')
            .insert([newConversation])
            .select();
        
        if (error) {
            console.error('Erreur de création de conversation:', error);
            return null;
        }
        
        if (data && data.length > 0) {
            // Mettre à jour le titre de l'élément
            await updateElementTitleWithContact(elementId, contactName);
            return data[0];
        }
        
        return null;
    } catch (error) {
        console.error('Exception lors de la création de la conversation:', error);
        return null;
    }
}

// Fonction pour sauvegarder un message
async function saveMessage(conversationId, message) {
    try {
        // D'abord, récupérer les messages existants
        const { data: currentData, error: fetchError } = await supabase
            .from('conversations')
            .select('messages')
            .eq('id', conversationId)
            .single();
        
        if (fetchError) {
            console.error('Erreur de récupération des messages:', fetchError);
            return false;
        }
        
        const currentMessages = currentData.messages || [];
        
        // Vérifier si c'est une mise à jour ou un nouveau message
        const editingId = document.getElementById('messageInput').getAttribute('data-editing-message-id');
        
        if (editingId) {
            // Mise à jour d'un message existant
            const updatedMessages = currentMessages.map(msg => {
                if (msg.id === editingId) {
                    return {
                        ...msg,
                        text: message.text,
                        images: message.images || msg.images,
                        updated_at: new Date().toISOString()
                    };
                }
                return msg;
            });
            
            // Réinitialiser l'attribut d'édition
            document.getElementById('messageInput').removeAttribute('data-editing-message-id');
            
            // Mettre à jour dans la base de données
            const { error: updateError } = await supabase
                .from('conversations')
                .update({ 
                    messages: updatedMessages,
                    updated_at: new Date().toISOString()
                })
                .eq('id', conversationId);
            
            if (updateError) {
                console.error('Erreur de mise à jour du message:', updateError);
                return false;
            }
            
            // Mettre à jour le cache
            if (cachedConversations.has(conversationId)) {
                const cachedConversation = cachedConversations.get(conversationId);
                cachedConversation.messages = updatedMessages;
                cacheConversation(conversationId, cachedConversation);
            }
            
            // Supprimer la classe editing-mode du bouton d'envoi
            document.querySelector('.chat-send-btn').classList.remove('editing-mode');
            
            return true;
        } else {
            // Nouveau message
            const updatedMessages = [...currentMessages, {
                id: message.id || crypto.randomUUID(),
                type: message.type,
                text: message.text,
                images: message.images || [],
                timestamp: new Date().toISOString()
            }];
            
            // Mettre à jour dans la base de données
            const { error: updateError } = await supabase
                .from('conversations')
                .update({ 
                    messages: updatedMessages,
                    updated_at: new Date().toISOString()
                })
                .eq('id', conversationId);
            
            if (updateError) {
                console.error('Erreur de sauvegarde du message:', updateError);
                return false;
            }
            
            console.log('Message sauvegardé avec succès');
            // Mettre à jour le cache
            if (cachedConversations.has(conversationId)) {
                const cachedConversation = cachedConversations.get(conversationId);
                cachedConversation.messages = updatedMessages;
                cacheConversation(conversationId, cachedConversation);
            }
            
            return true;
        }
    } catch (error) {
        console.error('Exception lors de la sauvegarde du message:', error);
        return false;
    }
}


// Fonction pour récupérer l'ID de l'élément actuellement affiché
function getCurrentElementId() {
    // Obtenir l'élément actif depuis le DOM ou le stockage temporaire
    const activeCard = document.querySelector('.content-card.active');
    if (activeCard) {
        return activeCard.dataset.id;
    }
    
    // Si aucun élément n'est actif, utiliser une valeur stockée temporairement
    return window.currentElementId || null;
}

// Variable pour stocker l'ID de la conversation actuelle
let currentConversationId = null;

// Ajouter dans votre fonction DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Vos écouteurs d'événements existants...
    
    // Écouteurs pour la confirmation de suppression
    document.getElementById('deleteOverlay').addEventListener('click', hideDeleteConfirmation);
    document.getElementById('cancelDelete').addEventListener('click', hideDeleteConfirmation);
    
    // Écouteur pour détecter si l'utilisateur appuie sur Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideDeleteConfirmation();
        }
    });
});

/*══════════════════════════════╗
  ⚫ JS PARTIE 8
  ═════════════════════════════╝*/
  
  // Fonctions pour gérer les notes dans Supabase

// Fonction pour charger le contenu d'une note existante
async function loadNoteContent(elementId) {
    try {
        const { data, error } = await supabase
            .from('notes_content')
            .select('*')
            .eq('element_id', elementId)
            .limit(1);
        
        if (error) {
            console.error('Erreur de chargement du contenu de la note:', error);
            return null;
        }
        
        if (data && data.length > 0) {
            console.log('Contenu de note chargé avec succès');
            return data[0];
        } else {
            console.log('Aucun contenu trouvé pour cette note');
            return null;
        }
    } catch (error) {
        console.error('Exception lors du chargement du contenu de la note:', error);
        return null;
    }
}

// Fonction pour créer un nouveau contenu de note
async function createNoteContent(elementId, content = '') {
    try {
        const newNoteContent = {
            element_id: elementId,
            content: content
        };
        
        const { data, error } = await supabase
            .from('notes_content')
            .insert([newNoteContent])
            .select();
        
        if (error) {
            console.error('Erreur de création du contenu de note:', error);
            return null;
        }
        
        if (data && data.length > 0) {
            console.log('Contenu de note créé avec ID:', data[0].id);
            return data[0];
        }
        
        return null;
    } catch (error) {
        console.error('Exception lors de la création du contenu de note:', error);
        return null;
    }
}

// Fonction pour sauvegarder le contenu d'une note existante
async function saveNoteContent(elementId, content) {
    try {
        // Vérifier si un contenu existe déjà pour cette note
        const existingContent = await loadNoteContent(elementId);
        
        if (existingContent) {
            // Mettre à jour le contenu existant
            const { error } = await supabase
                .from('notes_content')
                .update({ 
                    content: content,
                    updated_at: new Date().toISOString()
                })
                .eq('element_id', elementId);
            
            if (error) {
                console.error('Erreur de mise à jour du contenu de note:', error);
                return false;
            }
            
            console.log('Contenu de note mis à jour avec succès');
            return true;
        } else {
            // Créer un nouveau contenu
            const result = await createNoteContent(elementId, content);
            return result !== null;
        }
    } catch (error) {
        console.error('Exception lors de la sauvegarde du contenu de note:', error);
        return false;
    }
}

// Fonction pour la sauvegarde manuelle
async function saveNoteManually() {
    if (window.editorInstance && window.currentElementId) {
        const content = window.editorInstance.value;
        const success = await saveNoteContent(window.currentElementId, content);
        
        if (success) {
            // Afficher un message de confirmation
            const notification = document.createElement('div');
            notification.className = 'save-notification';
            notification.textContent = 'Note sauvegardée avec succès';
            document.querySelector('.editor-container').appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        }
    }
}

//══════════════════════════════╗
// 🟩 JS PARTIE 9
//══════════════════════════════╝

// Charger la structure du dossier depuis Supabase
async function loadFolderStructure(elementId) {
    try {
        // Vérifier si nous avons un élément de démonstration
        if (elementId.startsWith('demo-')) {
            // Pour les éléments de démonstration, utiliser les données locales
            folders = window.demoDossiers?.[elementId] || [];
            return;
        }
        
        console.log("Chargement de la structure de dossier pour l'élément:", elementId);
        
        // Récupérer les données depuis Supabase
        const { data, error } = await supabase
            .from('folders_content')
            .select('folder_structure')
            .eq('element_id', elementId)
            .limit(1);
        
        if (error) {
            console.error('Erreur lors du chargement de la structure du dossier:', error);
            folders = [];
            return;
        }
        
        if (data && data.length > 0) {
            // Structure existante trouvée
            folders = data[0].folder_structure;
            console.log("Structure de dossier chargée:", folders);
        } else {
            // Aucune structure trouvée, initialiser un tableau vide
            folders = [];
            console.log("Aucune structure de dossier trouvée, initialisation avec un tableau vide");
            // Créer une entrée vide dans la base de données
            await createFolderStructure(elementId);
        }
    } catch (error) {
        console.error('Exception lors du chargement de la structure du dossier:', error);
        folders = [];
    }
}

// Créer une nouvelle structure de dossier
async function createFolderStructure(elementId) {
    try {
        if (elementId.startsWith('demo-')) {
            // Pour les éléments de démonstration, stocker localement
            if (!window.demoDossiers) window.demoDossiers = {};
            window.demoDossiers[elementId] = folders;
            return true;
        }
        
        const { data, error } = await supabase
            .from('folders_content')
            .insert([{
                element_id: elementId,
                folder_structure: folders
            }])
            .select();
        
        if (error) {
            console.error("Erreur lors de la création de la structure de dossier:", error);
            return false;
        }
        
        console.log("Structure de dossier créée avec succès");
        return true;
    } catch (error) {
        console.error("Exception lors de la création de la structure de dossier:", error);
        return false;
    }
}

// Sauvegarder la structure du dossier
async function saveFolderStructure(elementId) {
    try {
        if (elementId.startsWith('demo-')) {
            // Pour les éléments de démonstration, stocker localement
            if (!window.demoDossiers) window.demoDossiers = {};
            window.demoDossiers[elementId] = folders;
            return true;
        }
        
        // Vérifier si une entrée existe déjà
        const { data, error: checkError } = await supabase
            .from('folders_content')
            .select('id')
            .eq('element_id', elementId)
            .limit(1);
        
        if (checkError) {
            console.error("Erreur lors de la vérification de la structure existante:", checkError);
            return false;
        }
        
        if (data && data.length > 0) {
            // Mettre à jour la structure existante
            const { error: updateError } = await supabase
                .from('folders_content')
                .update({
                    folder_structure: folders,
                    updated_at: new Date().toISOString()
                })
                .eq('element_id', elementId);
            
            if (updateError) {
                console.error("Erreur lors de la mise à jour de la structure de dossier:", updateError);
                return false;
            }
        } else {
            // Créer une nouvelle entrée
            return await createFolderStructure(elementId);
        }
        
        console.log("Structure de dossier sauvegardée avec succès");
        return true;
    } catch (error) {
        console.error("Exception lors de la sauvegarde de la structure de dossier:", error);
        return false;
    }
}


/*══════════════════════════════╗
  🟦 JS PARTIE 10
  ═════════════════════════════╝*/
// Code JavaScript pour gérer le téléchargement de la base de données et du code source
document.addEventListener('DOMContentLoaded', function() {
  // Éléments du DOM
  const downloadBtn = document.getElementById('downloaddb_cosmos_btn');
  const downloadModal = document.getElementById('downloaddb_quantum_modal');
  const downloadBtn2 = document.getElementById('downloaddb_pulsar_next');
  const closeModal = document.querySelector('.downloaddb_eclipse_close');
  const optionDatabase = document.getElementById('downloaddb_option_database');
  const optionSource = document.getElementById('downloaddb_option_source');
  
  // Initialisation des variables
  let selectedOption = 'database'; // Valeur par défaut
  
  // Ouvrir la modal quand on clique sur le bouton de téléchargement
  downloadBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Empêche la propagation de l'événement au conteneur parent
    resetModal();
    downloadModal.style.display = 'flex';
    setTimeout(() => {
      downloadModal.classList.add('active');
    }, 10);
  });
  
  // Gestion des options de téléchargement
  optionDatabase.addEventListener('click', function() {
    optionDatabase.classList.add('active');
    optionSource.classList.remove('active');
    selectedOption = 'database';
  });
  
  optionSource.addEventListener('click', function() {
    optionSource.classList.add('active');
    optionDatabase.classList.remove('active');
    selectedOption = 'source';
  });
  
  // Déclencher le téléchargement
  downloadBtn2.addEventListener('click', function() {
    closeModalFunction();
    
    if (selectedOption === 'database') {
      exportSupabaseDirectly();
    } else {
      downloadSourceCode();
    }
  });
  
  // Fermer la modal avec le X
  closeModal.addEventListener('click', function() {
    closeModalFunction();
  });
  
  // Fermer la modal si on clique en dehors
  window.addEventListener('click', function(event) {
    if (event.target === downloadModal) {
      closeModalFunction();
    }
  });
  
  function resetModal() {
    optionDatabase.classList.add('active');
    optionSource.classList.remove('active');
    selectedOption = 'database';
  }
  
  function closeModalFunction() {
    downloadModal.classList.remove('active');
    setTimeout(() => {
      downloadModal.style.display = 'none';
      resetModal();
    }, 300);
  }
  
  function downloadSourceCode() {
    try {
      // Créer l'animation de chargement
      const loadingOverlay = createLoadingOverlay("Téléchargement du code source...");
      document.body.appendChild(loadingOverlay);
      
      // Lien de téléchargement du code source
      const downloadLink = document.createElement('a');
      downloadLink.href = 'https://github.com/githubjllik/Mymio/archive/refs/heads/main.zip';
      downloadLink.download = 'mymio-source-code.zip';
      
      // Simuler un délai de téléchargement pour montrer le loader
      setTimeout(() => {
        // Déclencher le téléchargement
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Nettoyer et afficher notification de succès
        setTimeout(() => {
          document.body.removeChild(loadingOverlay);
          showNotification('success', 'Code source téléchargé avec succès !');
        }, 1500);
      }, 2000);
    } catch (error) {
      console.error('Erreur lors du téléchargement du code source:', error);
      removeLoadingOverlay();
      showNotification('error', 'Erreur lors du téléchargement: ' + error.message);
    }
  }
  
  async function exportSupabaseDirectly() {
    try {
      // Créer l'animation de chargement
      const loadingOverlay = createLoadingOverlay("Préparation de l'exportation...");
      document.body.appendChild(loadingOverlay);
      
      // Identifiants Supabase
      const supabaseUrl = 'https://hnomubsievlxongoducr.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhub211YnNpZXZseG9uZ29kdWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODUyMjAsImV4cCI6MjA1NjU2MTIyMH0.Bplv54BJ18n9jO4XLU-U76gkw_9u_imCbM0xVCLLl0M';
      
      // Liste des tables à exporter
      const tables = ['conversations', 'elements', 'folders_content', 'notes_content', 'Users'];
      
      // Date pour le nom de fichier
      const date = new Date().toISOString().slice(0, 10);
      const timestamp = Date.now();
      
      updateLoadingText(loadingOverlay, "Préparation des fichiers CSV...");
      
      // Générer un fichier CSV pour chaque table en parallèle
      let completedTables = 0;
      const csvPromises = tables.map(async (tableName, index) => {
        try {
          updateLoadingText(loadingOverlay, `Exportation de la table ${tableName}...`);
          
          // Utiliser l'API REST de Supabase pour exporter directement au format CSV
          const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}?select=*`, {
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Accept': 'text/csv'  // Demander directement le format CSV à Supabase
            }
          });
          
          if (!response.ok) {
            throw new Error(`Erreur d'exportation de la table ${tableName}: ${response.statusText}`);
          }
          
          // Récupérer le contenu CSV
          const csvContent = await response.text();
          
          // Mettre à jour la progression
          completedTables++;
          const progress = Math.round((completedTables / tables.length) * 100);
          updateLoadingProgress(loadingOverlay, progress);
          
          return {
            name: tableName,
            content: csvContent
          };
        } catch (error) {
          console.error(`Erreur avec la table ${tableName}:`, error);
          completedTables++;
          return {
            name: tableName,
            content: `Erreur: ${error.message}`,
            error: true
          };
        }
      });
      
      // Attendre que toutes les exportations soient terminées
      const csvFiles = await Promise.all(csvPromises);
      
      updateLoadingText(loadingOverlay, "Création de l'archive...");
      
      // Créer un fichier README pour expliquer le contenu
      const readmeContent = `# Export Mymio Database ${date}

Ce dossier contient l'exportation des tables suivantes de la base de données Mymio:
${tables.map(table => `- ${table}`).join('\n')}

Exporté le: ${new Date().toLocaleString()}
`;

      // Charger dynamiquement JSZip si nécessaire
      if (typeof JSZip === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      // Créer une archive ZIP avec tous les fichiers CSV
      const zip = new JSZip();
      
      // Ajouter le README
      zip.file("README.md", readmeContent);
      
      // Ajouter chaque fichier CSV
      csvFiles.forEach(file => {
        zip.file(`${file.name}.csv`, file.content);
      });
      
      // Générer l'archive ZIP
      updateLoadingText(loadingOverlay, "Finalisation de l'archive...");
      const zipContent = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 }
      });
      
      // Télécharger l'archive ZIP
      const zipUrl = URL.createObjectURL(zipContent);
      const downloadLink = document.createElement('a');
      downloadLink.href = zipUrl;
      downloadLink.download = `mymio-database-${date}.zip`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Nettoyer et afficher notification de succès
      setTimeout(() => {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(zipUrl);
        document.body.removeChild(loadingOverlay);
        showNotification('success', 'Base de données exportée avec succès !');
      }, 1000);
      
    } catch (error) {
      console.error('Erreur lors de l\'exportation de la base de données:', error);
      removeLoadingOverlay();
      showNotification('error', 'Erreur lors de l\'exportation: ' + error.message);
    }
  }
  
  function createLoadingOverlay(text) {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'downloaddb_loading_overlay';
    
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'downloaddb_loading_container';
    
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'downloaddb_loading_spinner';
    
    const loadingIcon = document.createElement('div');
    loadingIcon.className = 'downloaddb_loading_icon';
    loadingIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    `;
    
    loadingSpinner.appendChild(loadingIcon);
    
    const loadingText = document.createElement('div');
    loadingText.className = 'downloaddb_loading_text';
    loadingText.textContent = text;
    
    const loadingProgress = document.createElement('div');
    loadingProgress.className = 'downloaddb_loading_progress';
    
    loadingContainer.appendChild(loadingSpinner);
    loadingContainer.appendChild(loadingText);
    loadingContainer.appendChild(loadingProgress);
    loadingOverlay.appendChild(loadingContainer);
    
    return loadingOverlay;
  }
  
  function updateLoadingText(overlay, text) {
    const loadingText = overlay.querySelector('.downloaddb_loading_text');
    if (loadingText) {
      loadingText.textContent = text;
    }
  }
  
  function updateLoadingProgress(overlay, percent) {
    const progressBar = overlay.querySelector('.downloaddb_loading_progress');
    if (progressBar) {
      progressBar.style.setProperty('--progress', `${percent}%`);
    }
  }
  
  function removeLoadingOverlay() {
    const loadingOverlay = document.querySelector('.downloaddb_loading_overlay');
    if (loadingOverlay) {
      document.body.removeChild(loadingOverlay);
    }
  }
  
  function showNotification(type, message) {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.downloaddb_notification');
    existingNotifications.forEach(notification => {
      document.body.removeChild(notification);
    });
    
    // Créer une nouvelle notification
    const notification = document.createElement('div');
    notification.className = `downloaddb_notification ${type}`;
    
    const iconSVG = type === 'success' 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    
    const notificationIcon = document.createElement('div');
    notificationIcon.className = 'downloaddb_notification_icon';
    notificationIcon.innerHTML = iconSVG;
    
    const notificationText = document.createElement('div');
    notificationText.className = 'downloaddb_notification_text';
    notificationText.textContent = message;
    
    notification.appendChild(notificationIcon);
    notification.appendChild(notificationText);
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Disparition automatique
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
  
  // Empêcher le bouton de téléchargement de déclencher l'événement de création
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // Fonction pour convertir les CSV en XLSX au besoin
  async function convertCSVsToExcel(csvFiles) {
    updateLoadingText(loadingOverlay, "Conversion des fichiers en Excel...");
    
    // Charger dynamiquement SheetJS si nécessaire
    if (typeof XLSX === 'undefined') {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    
    // Créer un nouveau classeur Excel
    const workbook = XLSX.utils.book_new();
    
    // Parcourir tous les fichiers CSV
    for (const file of csvFiles) {
      if (!file.error) {
        // Convertir le contenu CSV en objet worksheet
        const worksheet = XLSX.utils.csv_to_sheet(file.content);
        
        // Ajouter la feuille au classeur
        XLSX.utils.book_append_sheet(workbook, worksheet, file.name);
      } else {
        // Ajouter une feuille d'erreur
        const worksheet = XLSX.utils.aoa_to_sheet([['Erreur lors du chargement des données'], [file.content]]);
        XLSX.utils.book_append_sheet(workbook, worksheet, `${file.name} (erreur)`);
      }
    }
    
    // Écrire le classeur au format binaire
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Retourner le contenu Excel sous forme de Blob
    return new Blob([excelData], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
  }
});


//══════════════════════════════╗
// 🟪 JS PARTIE 11
//══════════════════════════════╝
//═══════【 RECHERCHE JS 】═══════//
  // Fonction de recherche des éléments
document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const searchIcon = document.getElementById('search_on_elements_icon');
    const searchContainer = document.getElementById('search_on_elements_container');
    const searchInput = document.getElementById('search_on_elements_input');
    const searchClose = document.getElementById('search_on_elements_close');
    const searchResults = document.getElementById('search_on_elements_results');
    const searchCount = document.getElementById('search_on_elements_count');
    const searchPrev = document.getElementById('search_on_elements_prev');
    const searchNext = document.getElementById('search_on_elements_next');
    const searchCloseResults = document.getElementById('search_on_elements_close_results');
    const searchNotFound = document.getElementById('search_on_elements_not_found');
    
    // Variables de recherche
    let matchedCards = [];
    let currentMatch = -1;
    let searchTimeout;
    
    // Fonction pour ouvrir/fermer la barre de recherche
searchIcon.addEventListener('click', function() {
    searchContainer.classList.add('active');
    searchInput.focus();
});

searchClose.addEventListener('click', function() {
    searchContainer.classList.remove('active');
    clearSearch();
});
    
    // Fonction pour effectuer la recherche
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        } else if (e.key === 'Escape') {
            searchContainer.classList.remove('active');
            clearSearch();
        }
    });
    
    // Navigation dans les résultats
    searchPrev.addEventListener('click', function() {
        navigateResults(-1);
    });
    
    searchNext.addEventListener('click', function() {
        navigateResults(1);
    });
    
    searchCloseResults.addEventListener('click', function() {
        clearSearch();
    });
    
    // Fonction principale de recherche
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            clearSearch();
            return;
        }
        
        // Réinitialisation
        matchedCards = [];
        currentMatch = -1;
        
        // Recherche dans sampleData
        if (window.sampleData && window.sampleData.length > 0) {
            window.sampleData.forEach(item => {
                // Recherche dans le titre
                const titleMatch = item.title.toLowerCase().includes(searchTerm);
                
                // Recherche dans la description
                const descMatch = item.description ? 
                    item.description.toLowerCase().includes(searchTerm) : false;
                
                // Recherche dans les tags
                const tagMatch = item.tags ? 
                    item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) : false;
                
                if (titleMatch || descMatch || tagMatch) {
                    matchedCards.push(item.id);
                }
            });
            
            // Afficher les résultats
            if (matchedCards.length > 0) {
                // Afficher tous les éléments dans la grille
                const grid = document.getElementById('contentGrid');
                grid.innerHTML = '';
                
                // Filtrer et afficher uniquement les éléments correspondants
                const filteredData = window.sampleData.filter(data => 
                    matchedCards.includes(data.id)
                );
                
                filteredData.forEach(data => {
                    grid.innerHTML += createHighlightedCard(data, searchTerm);
                });
                
                // Initialiser les handlers
                attachCardClickHandlers();
                attachCardActionHandlers();
                
                // Mettre à jour le compteur de résultats
                searchCount.textContent = `1/${matchedCards.length}`;
                searchResults.classList.add('active');
                
                // Sélectionner le premier résultat
                navigateResults(1);
            } else {
                // Aucun résultat
                searchNotFound.style.display = 'block';
                setTimeout(() => {
                    searchNotFound.style.display = 'none';
                }, 3000);
                
                // Réinitialiser la grille
                populateGrid();
            }
        }
    }
    
    // Fonction pour créer une carte avec mise en surbrillance
    function createHighlightedCard(data, searchTerm) {
        if (!data.id) {
            data.id = 'demo-' + Math.random().toString(36).substr(2, 9);
        }
        
        // Mettre en surbrillance les correspondances
        const highlightText = (text, term) => {
            if (!text) return '';
            const regex = new RegExp(`(${term})`, 'gi');
            return text.replace(regex, '<span class="search_on_elements_highlight">$1</span>');
        };
        
        // Mettre en surbrillance les tags correspondants
        const highlightTags = (tags, term) => {
            if (!tags || !Array.isArray(tags)) return '';
            
            return tags.map(tag => {
                if (tag.toLowerCase().includes(term.toLowerCase())) {
                    const regex = new RegExp(`(${term})`, 'gi');
                    return `<span class="card-tag">${tag.replace(regex, '<span class="search_on_elements_highlight">$1</span>')}</span>`;
                }
                return `<span class="card-tag">${tag}</span>`;
            }).join('');
        };
        
        // Icône en fonction du type
        const typeIcon = {
            chat: "💬",
            note: "📝",
            dossier: "📁"
        }[data.type] || "📄";
        
        // Fonction pour générer l'affichage des images
        const generateImagesDisplay = (type, images) => {
            if (!data.description) {
                return `
                    <div class="card-images ${type}-images">
                        ${images.map(image => `<span class="card-image ${type}-image">${image}</span>`).join('')}
                    </div>
                `;
            }
            return '';
        };
        
        return `
            <div class="content-card ${data.type}-card" data-type="${data.type}" data-title="${data.title}" data-id="${data.id}">
                <div class="card-header">
                    <div class="card-category">
                        <span class="type-icon">${typeIcon}</span>
                        ${data.category}
                    </div>
                    <h3 class="card-title">${highlightText(data.title, searchTerm)}</h3>
                    <div class="card-meta">
                        <span>📅 ${data.date}</span>
                        <span>⭐ ${data.priority}</span>
                    </div>
                </div>
                <div class="card-content">
                    ${data.description ? 
                        `<p class="card-description">${highlightText(data.description, searchTerm)}</p>` : 
                        generateImagesDisplay(data.type, data.images)
                    }
                    <div class="card-tags">
                        ${highlightTags(data.tags, searchTerm)}
                    </div>
                </div>
                <div class="card-actions">
                    <button class="card-edit-btn" data-id="${data.id}">✏️</button>
                    <button class="card-delete-btn" data-id="${data.id}">🗑️</button>
                </div>
            </div>
        `;
    }
    
    // Navigation dans les résultats
    function navigateResults(direction) {
        if (matchedCards.length === 0) return;
        
        // Supprimer la mise en surbrillance précédente
        const currentHighlights = document.querySelectorAll('.search_on_elements_current');
        currentHighlights.forEach(el => {
            el.classList.remove('search_on_elements_current');
            el.classList.add('search_on_elements_highlight');
        });
        
        // Calculer le nouvel index
        currentMatch += direction;
        if (currentMatch >= matchedCards.length) currentMatch = 0;
        if (currentMatch < 0) currentMatch = matchedCards.length - 1;
        
        // Mettre à jour le compteur
        searchCount.textContent = `${currentMatch + 1}/${matchedCards.length}`;
        
        // Trouver la carte actuelle
        const currentCard = document.querySelector(`.content-card[data-id="${matchedCards[currentMatch]}"]`);
        
        if (currentCard) {
            // Faire défiler jusqu'à la carte
            currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Mettre en surbrillance l'élément actuel
            const firstHighlight = currentCard.querySelector('.search_on_elements_highlight');
            if (firstHighlight) {
                firstHighlight.classList.remove('search_on_elements_highlight');
                firstHighlight.classList.add('search_on_elements_current');
            }
            
            // Ajouter une animation subtile
            currentCard.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                currentCard.style.animation = '';
            }, 500);
        }
    }
    
    // Nettoyer la recherche
    function clearSearch() {
        searchInput.value = '';
        matchedCards = [];
        currentMatch = -1;
        searchResults.classList.remove('active');
        searchNotFound.style.display = 'none';
        
        // Réinitialiser la grille
        populateGrid();
    }
});



/*══════════════════════════════╗
  🟧 JS PARTIE 12
  ═════════════════════════════╝*/
// Initialisation du menu et de la fonctionnalité de téléchargement
document.addEventListener('DOMContentLoaded', function() {
    // Références aux éléments du menu
    const menuBtn = document.getElementById('chatMenuBtn');
    const menuDropdown = document.getElementById('chatMenuDropdown');
    const downloadOption = document.getElementById('downloadChatOption');
    
    // Gestion de l'ouverture/fermeture du menu
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        menuBtn.classList.toggle('active');
        menuDropdown.classList.toggle('show');
    });
    
    // Fermer le menu lors d'un clic en dehors
    document.addEventListener('click', function() {
        menuBtn.classList.remove('active');
        menuDropdown.classList.remove('show');
    });
    
    // Empêcher la fermeture lors d'un clic sur le menu
    menuDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Fonction de téléchargement de la conversation
    downloadOption.addEventListener('click', function() {
        downloadChat();
    });
});

// Fonction pour télécharger la conversation
async function downloadChat() {
    try {
        // Vérifier si une conversation est active
        if (!currentConversationId) {
            alert("Aucune conversation active à télécharger.");
            return;
        }
        
        // Récupérer les informations de la conversation
        let conversation;
        if (cachedConversations.has(currentConversationId)) {
            conversation = cachedConversations.get(currentConversationId);
        } else {
            const { data, error } = await supabase
                .from('conversations')
                .select('*')
                .eq('id', currentConversationId)
                .single();
                
            if (error) {
                console.error("Erreur lors de la récupération de la conversation:", error);
                alert("Impossible de télécharger la conversation. Veuillez réessayer.");
                return;
            }
            conversation = data;
        }
        
        // Montrer l'animation de téléchargement
        const downloadOption = document.getElementById('downloadChatOption');
        downloadOption.classList.add('downloading');
        
        // Générer le HTML de la conversation
        const chatHTML = generateChatHTML(conversation);
        
        // Créer un blob avec le HTML
        const blob = new Blob([chatHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Créer un lien temporaire pour le téléchargement
        const a = document.createElement('a');
        a.href = url;
        a.download = `Chat_avec_${conversation.contact_name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        
        // Nettoyer
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            downloadOption.classList.remove('downloading');
        }, 1000);
        
    } catch (error) {
        console.error("Erreur lors du téléchargement:", error);
        alert("Une erreur est survenue lors du téléchargement. Veuillez réessayer.");
        document.getElementById('downloadChatOption').classList.remove('downloading');
    }
}

// Fonction pour générer le HTML de la conversation
function generateChatHTML(conversation) {
    // Date formatée
    const formattedDate = new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // HTML de base
    let html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Conversation avec ${conversation.contact_name}</title>
        <style>
            :root {
                --primary-color: #6366f1;
                --bg-dark: #0a0b1e;
                --bg-light: #12142a;
                --text-light: #ffffff;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: var(--bg-dark);
                color: var(--text-light);
                margin: 0;
                padding: 20px;
                line-height: 1.6;
            }
            
            .chat-container {
                max-width: 800px;
                margin: 0 auto;
                background: var(--bg-light);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            
            .chat-header {
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .chat-profile-img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--primary-color);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 20px;
                color: white;
                ${conversation.contact_image ? `background-image: url(${conversation.contact_image}); background-size: cover;` : ''}
            }
            
            .chat-profile-name {
                font-size: 1.2rem;
                font-weight: 600;
            }
            
            .chat-date {
                margin-left: auto;
                font-size: 0.85rem;
                opacity: 0.7;
            }
            
            .chat-messages {
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .chat-message {
                max-width: 70%;
                padding: 12px 16px;
                border-radius: 12px;
                font-size: 0.95rem;
                position: relative;
            }
            
            .chat-message.received {
                background: rgba(255, 255, 255, 0.1);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            
            .chat-message.sent {
                background: var(--primary-color);
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }
            
            .message-time {
                font-size: 0.75rem;
                opacity: 0.7;
                margin-top: 5px;
                text-align: right;
            }
            
            .message-images {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 10px;
            }
            
            .message-image {
                max-width: 100%;
                border-radius: 8px;
            }
            
            .chat-footer {
                text-align: center;
                padding: 15px;
                font-size: 0.8rem;
                opacity: 0.5;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            code {
                font-family: Consolas, Monaco, 'Andale Mono', monospace;
                background: rgba(0, 0, 0, 0.3);
                padding: 3px 5px;
                border-radius: 4px;
            }
            
            pre {
                background: rgba(0, 0, 0, 0.3);
                padding: 15px;
                border-radius: 8px;
                overflow-x: auto;
                margin: 10px 0;
            }
            
            pre code {
                background: transparent;
                padding: 0;
            }
            
            @media print {
                body {
                    background: white;
                    color: black;
                }
                
                .chat-container {
                    box-shadow: none;
                    background: white;
                }
                
                .chat-header {
                    background: #f5f5f5;
                }
                
                .chat-message.received {
                    background: #f0f0f0;
                    color: black;
                }
                
                .chat-message.sent {
                    background: #e1f5fe;
                    color: black;
                }
            }
        </style>
    </head>
    <body>
        <div class="chat-container">
            <div class="chat-header">
                <div class="chat-profile-img">
                    ${!conversation.contact_image ? conversation.contact_name[0].toUpperCase() : ''}
                </div>
                <div class="chat-profile-name">${conversation.contact_name}</div>
                <div class="chat-date">${formattedDate}</div>
            </div>
            <div class="chat-messages">
    `;
    
    // Ajouter les messages
    if (conversation.messages && conversation.messages.length > 0) {
        for (const msg of conversation.messages) {
            const timestamp = new Date(msg.timestamp).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            html += `<div class="chat-message ${msg.type}">`;
            
            // Contenu du message
            if (msg.text) {
                // Traiter le texte pour conserver la mise en forme
                const processedText = msg.text
                    .replace(/```([\s\S]*?)```/g, function(match, code) {
                        return `<pre><code>${code.trim()}</code></pre>`;
                    })
                    .replace(/`([^`]+)`/g, function(match, code) {
                        return `<code>${code}</code>`;
                    })
                    .replace(/\n/g, '<br>');
                
                html += `<div>${processedText}</div>`;
            }
            
            // Images du message
            if (msg.images && msg.images.length > 0) {
                html += '<div class="message-images">';
                for (const img of msg.images) {
                    html += `<img class="message-image" src="${img.data}" alt="Image">`;
                }
                html += '</div>';
            }
            
            // Horodatage
            html += `<div class="message-time">${timestamp}</div>`;
            html += '</div>';
        }
    } else {
        html += '<div class="chat-message">Aucun message dans cette conversation.</div>';
    }
    
    // Fermer le HTML
    html += `
            </div>
            <div class="chat-footer">
                Exporté le ${formattedDate}
            </div>
        </div>
    </body>
    </html>
    `;
    
    return html;
}


//══════════════════════════════╗
// 🟥 JS PARTIE 13
//══════════════════════════════╝


/*══════════════════════════════╗
  🟨 JS PARTIE 14
  ═════════════════════════════╝*/


//══════════════════════════════╗
// 🟩 JS PARTIE 15
//══════════════════════════════╝