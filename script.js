// Elementos do Modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('m-img');
const modalGallery = document.getElementById('m-gallery');
const modalName = document.getElementById('m-name');
const modalDesc = document.getElementById('m-desc');
const modalPrice = document.getElementById('m-price');
const modalSizes = document.getElementById('m-sizes');
const buyBtn = document.querySelector('.buy-btn');

// Botões dos Cards
const detailButtons = document.querySelectorAll('.details-btn');

detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Pegar dados
        const mainImage = btn.getAttribute('data-img');
        const imagesList = btn.getAttribute('data-images');
        const name = btn.getAttribute('data-name');
        const price = btn.getAttribute('data-price');
        const desc = btn.getAttribute('data-desc');
        const sizes = btn.getAttribute('data-sizes').split(',');

        // 2. Preencher Modal
        modalName.innerText = name;
        modalDesc.innerText = desc;
        modalPrice.innerText = price;
        modalImg.src = mainImage;

        // 3. Gerar Galeria
        modalGallery.innerHTML = ''; 
        let galleryImages = imagesList ? imagesList.split(',') : [mainImage];

        galleryImages.forEach((imgSrc, index) => {
            const thumbDiv = document.createElement('div');
            thumbDiv.classList.add('gallery-thumb');
            if (index === 0) thumbDiv.classList.add('selected');

            const imgElement = document.createElement('img');
            imgElement.src = imgSrc.trim();
            imgElement.onerror = function() { this.src = 'https://via.placeholder.com/100?text=Foto'; };

            thumbDiv.appendChild(imgElement);
            modalGallery.appendChild(thumbDiv);

            // Clique na miniatura
            thumbDiv.addEventListener('click', () => {
                modalImg.src = imgSrc.trim();
                document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('selected'));
                thumbDiv.classList.add('selected');
            });
        });

        // 4. Gerar Tamanhos
        modalSizes.innerHTML = ''; 
        sizes.forEach(size => {
            const span = document.createElement('span');
            span.innerText = size;
            
            span.onclick = () => {
                document.querySelectorAll('.size-options span').forEach(s => s.classList.remove('active-size'));
                span.classList.add('active-size');
            };
            
            modalSizes.appendChild(span);
        });

        // 5. Abrir
        modal.style.display = 'flex';
        setTimeout(() => { modal.style.opacity = '1'; }, 10);
    });
});

// Botão de Compra (WhatsApp)
buyBtn.addEventListener('click', () => {
    const productName = modalName.innerText;
    const selectedSizeEl = document.querySelector('.size-options span.active-size');
    
    let sizeText = "";
    if (selectedSizeEl) {
        sizeText = ` no tamanho *${selectedSizeEl.innerText}*`;
    } else {
        sizeText = " (ainda não escolhi o tamanho)";
    }

    const phoneNumber = "558591597451"; 
    const message = `Olá! Vi no site e tenho interesse no *${productName}*${sizeText}. Gostaria de saber se está disponível!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
});

// Fechar Modal
function closeModal() {
    modal.style.opacity = '0';
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

window.onclick = function(event) {
    if (event.target == modal) closeModal();
}