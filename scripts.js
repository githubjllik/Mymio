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



        // Données de démonstration
window.sampleData = [

            {
                category: "Pensées",
                type: "chat",
                title: "L'importance de la gratitude quotidienne",
                date: "2025-02-06",
                description: null, // Permettre null pour la description
                images: ["🗨️", "💭", "💬"], // Emojis comme placeholder pour les images
                tags: ["développement personnel", "mindfulness", "gratitude"],
                priority: "high"
            },
            {
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
        category: "Apprentissage",
        type: "dossier",
        title: "Documentation IA",
        date: "2025-02-04",
        description: null,
        images: ["📁", "📂", "🗂️"],
        tags: ["organisation", "documentation", "apprentissage"],
        priority: "low"
    }
            // Ajoutez d'autres éléments si nécessaire
        ];

        // Fonction pour gérer le filtrage par catégorie
        function filterContentByCategory(category) {
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
        identityContainer.style.display = 'block';
        initializeIdentityContent(); // Initialiser le contenu dynamique
    } else if (category === 'universe') {
        grid.style.display = 'grid';
        grid.innerHTML = ''; // Réinitialiser le contenu
        sampleData.forEach(data => {
            grid.innerHTML += createContentCard(data);
        });
        attachCardClickHandlers();
    } else {
        // Filtrer par catégorie
        grid.style.display = 'grid';
        grid.innerHTML = ''; // Réinitialiser le contenu
        const filteredData = sampleData.filter(data => data.category === category);
        filteredData.forEach(data => {
            grid.innerHTML += createContentCard(data);
        });
        attachCardClickHandlers();
    }
    
    // Mettre à jour les compteurs et l'ordre des éléments
    updateCategoryCounts();

    // **Ajoutez la ligne suivante :**
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
            icon: "🎄",
            title: "Magie des Fêtes",
            description: "Ces moments enchantés où le monde s'illumine de mille feux, où les cœurs s'ouvrent et où la joie devient contagieuse. La période de Noël et du Nouvel An transforme notre quotidien en un conte de fées moderne, rempli de sourires sincères, de films réconfortants et de décorations scintillantes qui réchauffent l'âme."
        }
    ];

    const list = document.querySelector('.identity-list');
    // Vider la liste existante
    list.innerHTML = '';
    
    // Ajouter les éléments dans l'ordre, en mettant les nouveaux à la fin
    
    interests.forEach(interest => {
        const item = document.createElement('div');
        item.className = 'identity-item';
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
        
        list.appendChild(item);
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
    attachCardActionHandlers(); // Ajouter cette ligne
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

// Modifier la fonction initializeIdentityContent pour inclure les nouvelles initialisations
function initializeIdentityContent() {
    initializeBirthdayCountdown();
    initializeFloatingThoughts();
    populateInterests();
    initializeAmbientAnimations();
    updateCurrentAge();
    initializeMoodSlider();
    initializeDreams();
}

        // Fonctions pour le Chat
        let contactInfo = {
            name: '',
            image: null
        };

        function startChat(event) {
            event.preventDefault();
            contactInfo.name = document.getElementById('contactName').value;
            const fileInput = document.getElementById('profilePic');
            
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    contactInfo.image = e.target.result;
                    initializeChat();
                };
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                initializeChat();
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
        }

        function showContextMenu(event) {
            const menu = document.getElementById('contextMenu');
            menu.classList.toggle('active');
            event.stopPropagation();
        }

        document.addEventListener('click', function() {
            document.getElementById('contextMenu').classList.remove('active');
        });

        function sendMessage(type) {
    const messageInput = document.getElementById('messageInput');
    const messageContainer = document.getElementById('messageContainer');
    
    if (messageInput.value.trim() === '' && selectedImages.length === 0) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type === 'send' ? 'sent' : 'received'}`;
    
    // Ajouter le texte s'il y en a
    if (messageInput.value.trim() !== '') {
        const textDiv = document.createElement('div');
        textDiv.innerHTML = messageInput.value.replace(/\n/g, '<br>');
        messageDiv.appendChild(textDiv);
    }
    
    // Ajouter les images s'il y en a
    if (selectedImages.length > 0) {
        const imagesContainer = document.createElement('div');
        imagesContainer.className = 'message-images';
        selectedImages.forEach((img) => {
            const imgElement = document.createElement('img');
            imgElement.src = img.data;
            imgElement.className = 'message-image';
            imgElement.setAttribute('data-full-image', img.data);
            imgElement.setAttribute('data-type', img.type);
            imgElement.setAttribute('data-name', img.name);
            
            // Gestionnaire de clic pour ouvrir le modal
            imgElement.onclick = function(e) {
                e.stopPropagation();
                openImageModal(this);
            };
            imagesContainer.appendChild(imgElement);
        });
        messageDiv.appendChild(imagesContainer);
    }
    
    messageContainer.appendChild(messageDiv);
    messageInput.value = '';
    
    // Réinitialiser les images sélectionnées
    selectedImages = [];
    const imageContainer = document.querySelector('.selected-images');
    if (imageContainer) {
        imageContainer.remove();
    }
    
    updateSelectedImagesDisplay();
    

    scrollToBottom();
}

function scrollToBottom() {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
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
                    // Logique de filtrage à implémenter
                    const category = tag.textContent.trim();
                    filterContentByCategory(category);
                });
            });

            // Gestion des catégories
            // Gestion des nav-items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', () => {
                    // Gestion de la classe active
                    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');

                    // Filtrage du contenu
                    const category = item.dataset.category;
                    filterContentByCategory(category);
                });
            });
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
        function handleCardClick(event) {
    const card = event.currentTarget;
    const type = card.dataset.type;

    if (type === 'chat') {
        openChat();
    } else if (type === 'note') {
        openNote();
    } else if (type === 'dossier') {
        openFolderInterface();
    }
    // Ajouter d'autres types ici si nécessaire
}


        // Fonction pour ouvrir le chat
        function openChat() {
            document.getElementById('contentGrid').style.display = 'none';
            document.getElementById('chatContainer').style.display = 'block';
            document.getElementById('setupForm').style.display = 'block';
            document.getElementById('chatInterface').style.display = 'none';
            toggleCreationHubVisibility();

        }

        // Fonction pour quitter le chat
        function exitChat() {
            document.getElementById('chatContainer').style.display = 'none';
            document.getElementById('contentGrid').style.display = 'grid';
            document.getElementById('setupForm').style.display = 'none';
            document.getElementById('chatInterface').style.display = 'none';
            toggleCreationHubVisibility();

        }
        
        // Fonction pour ouvrir l'interface de Note
// Modifier la fonction openNote()
function openNote() {
    document.getElementById('contentGrid').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('noteContainer').style.display = 'block';
    
    toggleCreationHubVisibility();

    // Initialiser l'éditeur Jodit si ce n'est pas déjà fait
    if (!window.joditInitialized) {
        window.editorInstance = Jodit.make('#editor', {
            theme: 'dark',
            language: 'fr',
            height: '100%', // Remplacez ici
            minHeight: '600px', // Hauteur minimale
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
            heightCSSExpression: '100%', // Assure que l'éditeur prend toute la hauteur disponible
        });
        window.joditInitialized = true;
    } else {
        window.editorInstance.reload();
    }
}


// Fonction pour quitter l'interface de Note
function exitNote() {
    document.getElementById('noteContainer').style.display = 'none';
    document.getElementById('contentGrid').style.display = 'grid';
    toggleCreationHubVisibility();

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
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêcher le clic de la carte
            const id = btn.dataset.id;
            const card = btn.closest('.content-card');
            openEditModal(id, card);
        });
    });
    
    // Gestionnaires pour les boutons de suppression
    document.querySelectorAll('.card-delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation(); // Empêcher le clic de la carte
            const id = btn.dataset.id;
            
            if (confirm('Êtes-vous sûr de vouloir supprimer cet élément?')) {
                const success = await deleteElementFromSupabase(id);
                
                if (success) {
                    // Supprimer l'élément du tableau local
                    window.sampleData = window.sampleData.filter(item => item.id !== id);
                    
                    // Actualiser l'interface
                    populateGrid();
                    updateCategoryCounts();
                    updateNavOrder();
                } else {
                    alert('Erreur lors de la suppression de l\'élément.');
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
function createFolder() {
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
        
        renderFolders();
        hideFolderCreateModal();
        document.getElementById('folderName').value = '';
    }
}

// Fonction pour gérer la sélection de fichiers dans le dossier
function handleFolderFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileObj = {
                type: 'file',
                name: file.name,
                content: e.target.result,
                fileType: file.type
            };
            
            let current = folders;
            for (let i = 0; i < folderCurrentPath.length; i++) {
                current = current.find(f => f.name === folderCurrentPath[i]).contents;
            }
            current.push(fileObj);
            renderFolders();
        };
        
        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    }
}

// Fonction pour ouvrir un dossier spécifique
function openFolder(name) {
    folderCurrentPath.push(name);
    updateFolderBreadcrumb();
    renderFolders();
}

// Fonction pour naviguer vers un niveau spécifique dans le chemin actuel
function navigateToFolder(index) {
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
        current = current.find(f => f.name === folderCurrentPath[i]).contents;
    }
    
    grid.innerHTML = current.map(item => {
        if (item.type === 'folder') {
            return `
                <div class="folder" onclick="openFolder('${item.name}')">
                    <div class="folder-preview">
                        ${item.contents.slice(0, 4).map(() => `
                            <div class="preview-item">📄</div>
                        `).join('')}
                    </div>
                    <div class="folder-name">${item.name}</div>
                    <div class="folder-info">${item.contents.length} éléments</div>
                </div>
            `;
        } else {
            if (item.fileType.startsWith('image/')) {
                return `
                    <div class="file">
                        <div class="file-preview">
                            <img src="${item.content}" alt="${item.name}">
                        </div>
                        <div class="folder-name">${item.name}</div>
                    </div>
                `;
            } else {
                const extension = item.name.split('.').pop();
                return `
                    <div class="file">
                        <div class="file-preview">
                            <div class="file-icon">${folderFileIcons[extension] || '📄'}</div>
                        </div>
                        <div class="folder-name">${item.name}</div>
                    </div>
                `;
            }
        }
    }).join('') + `
        <input type="file" id="folderFileInput" style="display: none" onchange="handleFolderFileSelect(event)">
        <div class="folder" onclick="document.getElementById('folderFileInput').click()">
            <div class="folder-preview">
                <div class="preview-item" style="grid-column: span 2">+</div>
            </div>
            <div class="folder-name">Importer un fichier</div>
        </div>
    `;
}

// Fonction pour quitter l'interface dossier et revenir à la grille principale
function exitFolder() {
    document.getElementById('folderContainer').style.display = 'none';
    document.getElementById('contentGrid').style.display = 'grid';
    toggleCreationHubVisibility();

    // Réinitialiser le chemin actuel
    folderCurrentPath = [];
    renderFolders();
}

// Fonction pour ouvrir l'interface dossier
function openFolderInterface() {
    document.getElementById('contentGrid').style.display = 'none';
    document.getElementById('folderContainer').style.display = 'block';
    renderFolders(); // Initialiser la vue des dossiers
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

        // Exemple : Simuler un nouveau message
        document.getElementById("messageInput").addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const newMessage = document.createElement("div");
                newMessage.className = "chat-message sent";
                newMessage.textContent = e.target.value;
                messageContainer.appendChild(newMessage);
                e.target.value = "";
                scrollToBottom(); // Défilement vers le bas
            }
        });
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
    const editModal = document.getElementById('edit-modal');
    const element = window.sampleData.find(item => item.id === id);
    
    if (!element) {
        console.error('Élément non trouvé');
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
document.querySelector('#edit-modal .update-btn')?.addEventListener('click', async () => {
    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title-input').value;
    const description = document.getElementById('edit-description-input').value;
    
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
    
    // Mettre à jour dans Supabase
    const success = await updateElementInSupabase(id, updates);
    
    if (success) {
        // Mettre à jour l'élément dans le tableau local
        const index = window.sampleData.findIndex(item => item.id === id);
        if (index !== -1) {
            window.sampleData[index] = {
                ...window.sampleData[index],
                ...updates
            };
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
            .select('*');
        
        if (error) {
            console.error('Erreur lors du chargement des données:', error);
            return;
        }
        
        if (data && data.length > 0) {
            // Formater les données pour correspondre à votre structure
            window.sampleData = data.map(item => ({
                category: item.category,
                type: item.type,
                title: item.title,
                date: item.date,
                description: item.description,
                images: item.images,
                tags: item.tags,
                priority: item.priority
            }));
            
            // Actualiser l'interface
            populateGrid();
            updateCategoryCounts();
            updateNavOrder();
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
    }
}
// Fonction pour enregistrer un nouvel élément dans Supabase
async function saveElementToSupabase(element) {
    try {
        console.log('Tentative d\'enregistrement de l\'élément:', element);
        const { data, error } = await supabase
            .from('elements')
            .insert([element])
            .select();
        
        if (error) {
            console.error('Erreur lors de l\'enregistrement de l\'élément:', error);
            return false;
        }
        
        console.log('Élément enregistré avec succès:', data);
        // Si data contient l'ID généré, ajoutez-le à l'élément
        if (data && data.length > 0 && data[0].id) {
            element.id = data[0].id;
        }
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de l\'élément:', error);
        return false;
    }
}


// Fonction pour mettre à jour un élément existant
async function updateElementInSupabase(id, updates) {
    try {
        const { data, error } = await supabase
            .from('elements')
            .update(updates)
            .eq('id', id);
        
        if (error) {
            console.error('Erreur lors de la mise à jour de l\'élément:', error);
            return false;
        }
        
        console.log('Élément mis à jour avec succès:', data);
        return true;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'élément:', error);
        return false;
    }
}
// Fonction pour supprimer un élément
async function deleteElementFromSupabase(id) {
    try {
        const { data, error } = await supabase
            .from('elements')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Erreur lors de la suppression de l\'élément:', error);
            return false;
        }
        
        console.log('Élément supprimé avec succès');
        return true;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'élément:', error);
        return false;
    }
}


//══════════════════════════════╗
// 🟤 JS PARTIE 7
//══════════════════════════════╝


/*══════════════════════════════╗
  ⚫ JS PARTIE 8
  ═════════════════════════════╝*/