const appData = {
    profiles: [
        {
            id: 1,
            name: 'Perfil 1',
            image: 'assets/cffa6f80921f68f97921681755a2156f.jpg',
            alt: 'Avatar do perfil 1'
        },
        {
            id: 2,
            name: 'Perfil 2',
            image: 'assets/L u c y.jpg',
            alt: 'Avatar do perfil 2'
        },
        {
            id: 3,
            name: 'Perfil 3',
            image: 'assets/power icon.jpg',
            alt: 'Avatar do perfil 3'
        }
    ],
    content: {
        movies: [
            { id: 1, title: 'Homem-Aranha', category: 'Ação', year: 2023 },
            { id: 2, title: 'Interestelar', category: 'Ficção Científica', year: 2014 },
            { id: 3, title: 'A Origem', category: 'Ficção Científica', year: 2010 },
            { id: 4, title: 'Vingadores', category: 'Ação', year: 2023 },
            { id: 5, title: 'Coringa', category: 'Drama', year: 2019 },
            { id: 6, title: 'Aquaman', category: 'Ação', year: 2023 },
            { id: 7, title: 'Homem de Ferro', category: 'Ação', year: 2023 },
            { id: 8, title: 'Pantera Negra', category: 'Ação', year: 2023 },
            { id: 9, title: 'Capitã Marvel', category: 'Ação', year: 2023 },
            { id: 10, title: 'Jogo da Imitação', category: 'Drama', year: 2014 }
        ],
        series: [
            { id: 101, title: 'Stranger Things', category: 'Ficção Científica', year: 2023 },
            { id: 102, title: 'The Crown', category: 'Drama', year: 2023 },
            { id: 103, title: 'Breaking Bad', category: 'Drama', year: 2023 },
            { id: 104, title: 'Sherlock', category: 'Mistério', year: 2023 },
            { id: 105, title: 'Peaky Blinders', category: 'Drama', year: 2023 },
            { id: 106, title: 'The Witcher', category: 'Fantasia', year: 2023 },
            { id: 107, title: 'Bridgerton', category: 'Romance', year: 2023 },
            { id: 108, title: 'The Mandalorian', category: 'Ficção Científica', year: 2023 },
            { id: 109, title: 'Castlevania', category: 'Fantasia', year: 2023 },
            { id: 110, title: 'Dark', category: 'Ficção Científica', year: 2023 }
        ]
    }
};

const selectProfile = (profile) => {
    localStorage.setItem('selectedProfile', JSON.stringify(profile));
    window.location.href = 'catalog.html';
};

const getSelectedProfile = () => {
    try {
        return JSON.parse(localStorage.getItem('selectedProfile')) || null;
    } catch {
        return null;
    }
};

const renderProfiles = () => {
    const profilesContainer = document.getElementById('profiles-container');
    if (!profilesContainer) {
        return;
    }

    const fragment = document.createDocumentFragment();

    appData.profiles.forEach((profile) => {
        const card = document.createElement('figure');
        card.className = 'profile';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Selecionar ${profile.name}`);

        card.innerHTML = `
            <img src="${profile.image}" alt="${profile.alt}" class="profile__image" loading="lazy" />
            <figcaption class="profile__name">${profile.name}</figcaption>
        `;

        card.addEventListener('click', () => selectProfile(profile));
        card.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                selectProfile(profile);
            }
        });

        fragment.appendChild(card);
    });

    profilesContainer.appendChild(fragment);
};

const renderProfileHeader = () => {
    const profile = getSelectedProfile();
    const profileNameElement = document.getElementById('profile-name');
    const profileAvatarElement = document.getElementById('profile-avatar');

    if (!profile || !profileNameElement || !profileAvatarElement) {
        return;
    }

    profileNameElement.textContent = profile.name;
    profileAvatarElement.src = profile.image;
    profileAvatarElement.alt = profile.alt || `Avatar de ${profile.name}`;
};

const createMediaCard = (item) => {
    const card = document.createElement('article');
    card.className = 'media-card';
    card.dataset.title = item.title.toLowerCase();
    card.innerHTML = `
        <div class="media-card__thumbnail">
            <div class="media-card__thumbnail--placeholder" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <span class="media-card__play-icon" aria-hidden="true">▶</span>
            </div>
        </div>
        <div class="media-card__content">
            <h3 class="media-card__title">${item.title}</h3>
            <p class="media-card__genre">${item.category}</p>
            <p class="media-card__year">${item.year}</p>
        </div>
    `;

    return card;
};

const renderMediaSection = (items, containerId) => {
    const grid = document.getElementById(containerId);
    if (!grid) {
        return;
    }

    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.appendChild(createMediaCard(item)));
    grid.appendChild(fragment);
};

const setupSearch = () => {
    const searchInput = document.getElementById('search-input');
    const cardsContainer = document.querySelector('.catalog-container');

    if (!searchInput || !cardsContainer) {
        return;
    }

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.trim().toLowerCase();
        const cards = cardsContainer.querySelectorAll('.media-card');
        let visibleCount = 0;

        cards.forEach((card) => {
            const title = card.dataset.title;
            const matches = title.includes(searchTerm);
            card.hidden = !matches;
            if (matches) {
                visibleCount += 1;
            }
        });

        if (searchTerm && visibleCount === 0) {
            console.log('Nenhum resultado encontrado');
        }
    });
};

const initCatalogPage = () => {
    if (!document.getElementById('movies-grid')) {
        return;
    }

    const profile = getSelectedProfile();
    if (!profile) {
        window.location.href = 'index.html';
        return;
    }

    renderProfileHeader();
    renderMediaSection(appData.content.movies, 'movies-grid');
    renderMediaSection(appData.content.series, 'series-grid');
    setupSearch();
};

window.addEventListener('DOMContentLoaded', () => {
    renderProfiles();
    initCatalogPage();
});
