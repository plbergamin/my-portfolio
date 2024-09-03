const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.section');

/* Active menu item line scroll */

window.addEventListener('scroll', checkSections);

checkSections();

function checkSections() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop -60;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.querySelector('a').getAttribute('href').substring(1) === currentSection) {
            item.classList.add('active');
        }
    });
}

/* Mobile Navbar */

btn.addEventListener('click', navToggle);

function navToggle() {
    btn.classList.toggle('open');
    overlay.classList.toggle('overlay-show');
    document.body.classList.toggle('stop-scrolling');
    menu.classList.toggle('show-menu');
}

document.addEventListener("DOMContentLoaded", function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('open');
            overlay.classList.remove('overlay-show');
            document.body.classList.remove('stop-scrolling');
            menu.classList.remove('show-menu');
        });
    });
});

/* Toggle Dark Mode */

(function() {
    let darkMode = localStorage.getItem('darkMode');
    const darkModeToggleSun = document.querySelector('#dark-mode-toggle-1');
    const darkModeToggleMoon = document.querySelector('#dark-mode-toggle-2');

    const enableDarkMode = () => {
        document.body.classList.add('darkmode');
        darkModeToggleSun.style.display = 'inline-block';
        darkModeToggleMoon.style.display = 'none';
        localStorage.setItem('darkMode', 'enabled');
    };

    const disableDarkMode = () => {
        document.body.classList.remove('darkmode');
        darkModeToggleSun.style.display = 'none';
        darkModeToggleMoon.style.display = 'inline-block';
        localStorage.setItem('darkMode', 'disabled');
    };

    if (darkMode === 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    const toggleDarkMode = () => {
        darkMode = localStorage.getItem('darkMode');
        if (darkMode !== 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    };

    if (darkModeToggleSun) {
        darkModeToggleSun.addEventListener('click', toggleDarkMode);
    } else {
        console.error('Sun icon (dark mode toggle) not found.');
    }

    if (darkModeToggleMoon) {
        darkModeToggleMoon.addEventListener('click', toggleDarkMode);
    } else {
        console.error('Moon icon (light mode toggle) not found.');
    }
})();

/* Play portfolio videos on hover*/

document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.portfolio-item .video');
  
    videos.forEach(video => {
      video.addEventListener('mouseover', () => {
        video.play();
      });
  
      video.addEventListener('mouseout', () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  });

/* Play portfolio videos basaed on screen position for small screens*/

document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.portfolio-item .video');
    const screenThreshold = 550;

    // Function to calculate the distance of an element from the center of the viewport
    function getDistanceFromCenter(element) {
        const elementRect = element.getBoundingClientRect();
        const elementCenterY = elementRect.top + elementRect.height / 2;
        const viewportCenterY = window.innerHeight / 2;
        return Math.abs(viewportCenterY - elementCenterY);
    }

    // Function to handle the video playback
    function playVideoInMiddle() {
        let closestVideo = null;
        let minDistance = Infinity;

        videos.forEach(video => {
            const distance = getDistanceFromCenter(video);
            if (distance < minDistance) {
                minDistance = distance;
                closestVideo = video;
            }
            // Pause all videos initially and remove the 'playing' class
            video.pause();
            video.currentTime = 0;
            video.closest('.portfolio-item').classList.remove('video-playing');
        });

        // Play the video closest to the center of the viewport and add the 'playing' class
        if (closestVideo) {
            closestVideo.play();
            closestVideo.closest('.portfolio-item').classList.add('video-playing');
        }
    }
        window.addEventListener('scroll', playVideoInMiddle);
        playVideoInMiddle();
});
  
/* Architecture portfolio open page */

const archProjects = document.querySelectorAll('.arch-project');
const archPages = document.querySelectorAll('.arch-project-page');
const closeButtons = document.querySelectorAll('.close-btn');

archProjects.forEach((project, index) => {
    project.addEventListener('click', () => {
        archPages[index].classList.add('open-page');
        document.body.style.overflow = 'hidden';
    });
});

closeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        archPages[index].classList.remove('open-page');
        document.body.style.overflow = '';
    });
});


/* Architecture portfolio Gallery Images Scroll */

document.addEventListener('DOMContentLoaded', function () {
    const projectPages = document.querySelectorAll('.arch-project-page');

    projectPages.forEach(projectPage => {
        const gallery = projectPage.querySelector('.gallery');
        const galleryItems = projectPage.querySelectorAll('.gallery-item');
        const leftArrow = projectPage.querySelector('.left-arrow');
        const rightArrow = projectPage.querySelector('.right-arrow');
        const totalItems = galleryItems.length;
        let currentIndex = 0;
        const changeInterval = 5000;

        function showSlide(index) {
            if (index < 0) {
                currentIndex = totalItems - 1;
            } else if (index >= totalItems) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100;
            gallery.style.transform = `translateX(${offset}%)`;
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        // Arrow click event listeners
        leftArrow.addEventListener('click', function () {
            showSlide(currentIndex - 1);
        });

        rightArrow.addEventListener('click', function () {
            showSlide(currentIndex + 1);
        });

        // Automatically change slides every 5 seconds
        setInterval(nextSlide, changeInterval);
    });
});


/* Developer skills section */

const devIcons = document.querySelectorAll('.icon');
const devContents = document.querySelectorAll('.dev-skills-content');

devIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        removeDevActives();
        icon.classList.add('active');
        devContents[index].classList.add('active');
    });
});

function removeDevActives() {
    devIcons.forEach((icon) => {
        icon.classList.remove('active');
    });
    devContents.forEach((content) => {
        content.classList.remove('active');
    });
}


/* Design skills section */

const designTabs = document.querySelectorAll('.tab');
const designContents = document.querySelectorAll('.design-skills-content');

designTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        removeDesignActives();
        tab.classList.add('active');
        designContents[index].classList.add('active');
    });
});

function removeDesignActives() {
    designTabs.forEach((tab) => {
        tab.classList.remove('active');
    });
    designContents.forEach((content) => {
        content.classList.remove('active');
    });
}
