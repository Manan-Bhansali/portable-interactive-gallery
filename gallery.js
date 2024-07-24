    document.addEventListener('DOMContentLoaded', function() {
        (function() {
            // Sample arrays
            let array1 = Array.from({length: 100}, (_, i) => i + 1);
            let array2 = Array.from({length: 100}, (_, i) => `https://picsum.photos/200/${300 + i}`);

            // Ensure arrays are of the same size
            const minLength = Math.min(array1.length, array2.length);
            array1 = array1.slice(0, minLength);
            array2 = array2.slice(0, minLength);

            let currentIndex = 0;
            const imagesPerLoad = 16;

            // Create a new section for the gallery
            const gallerySection = document.createElement('section');
            gallerySection.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                padding: 20px 0;
                margin: 20px 0;
            `;

            // Function to load more images
            function loadMoreImages() {
                const fragment = document.createDocumentFragment();
                const endIndex = Math.min(currentIndex + imagesPerLoad, array2.length);

                for (let i = currentIndex; i < endIndex; i++) {
                    const img = document.createElement('img');
                    img.src = array2[i];
                    img.style.cssText = `
                        width: 100px;
                        height: 100px;
                        object-fit: cover;
                        margin: 10px 0;
                        cursor: pointer;
                        transition: transform 0.3s ease;
                    `;
                    img.addEventListener('mouseover', () => {
                        img.style.transform = 'scale(1.1)';
                    });
                    img.addEventListener('mouseout', () => {
                        img.style.transform = 'scale(1)';
                    });
                    img.addEventListener('click', (e) => showClickAnimation(e));
                    img.loading = 'lazy'; // Enable lazy loading
                    fragment.appendChild(img);
                }

                gallerySection.appendChild(fragment);
                currentIndex = endIndex;

                if (currentIndex >= array2.length) {
                    window.removeEventListener('scroll', handleScroll);
                }
            }

            // Function to handle scroll event
            function handleScroll() {
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                    loadMoreImages();
                }
            }

            // Initial load
            loadMoreImages();

            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);

            // Insert the gallery section into the document
            const insertPosition = document.body.children[Math.floor(document.body.children.length / 2)];
            document.body.insertBefore(gallerySection, insertPosition);

            // Function to show click animation
            function showClickAnimation(event) {
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1000;
                `;

                const video = document.createElement('video');
                video.src = 'animation.webm';
                video.autoplay = true;
                video.loop = false;

                const originalWidth = 100; // Assuming the original width of the animation
                const scaleFactor = 6;
                const newWidth = originalWidth * scaleFactor;

                const rect = event.target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                video.style.cssText = `
                    position: absolute;
                    width: ${newWidth}px;
                    left: ${centerX + 551}px;
                    top: ${centerY + 715}px;
                    transform: translate(-100%, -100%);
                `;

                overlay.appendChild(video);
                document.body.appendChild(overlay);

                video.addEventListener('ended', () => {
                    document.body.removeChild(overlay);
                });
            }
        })();
    });
