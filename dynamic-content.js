// Carrega e aplica dinamicamente o conteúdo salvo do Painel Admin (LocalStorage)
document.addEventListener("DOMContentLoaded", function() {
    const defaultData = {
        logo_texto_1: "MCP",
        logo_texto_2: "Construções",
        logo_sub: "Engenharia e Obras",
        
        slide1_tit1: "Construção Civil",
        slide1_tit2: "de Alto Padrão",
        slide1_sub: "Mais de 15 anos construindo o futuro com excelência.",
        slide1_img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80",
        stats_text: "NA MCP CONSTRUÇÕES, CADA DETALHE É IMPORTANTE.",
        
        serv_tit1: "Construção Residencial",
        serv_txt1: "<p style='margin-bottom: 15px;'>A MCP Construções é especializada em obras residenciais de alto padrão...</p>",
        serv_img1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80",
        
        sobre_tit: "Sobre Nós",
        sobre_txt: "<p>A MCP Construções nasceu da paixão por transformar projetos em realidade...</p>",
        sobre_img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
        
        contato_end: "Lisboa — Portugal",
        contato_tel: "+351 934 627 192",
        contato_email: "contato@mcpconstrucoes.pt",
        contato_hr: "Seg–Sex: 08h às 18h"
    };

    const savedData = JSON.parse(localStorage.getItem('mcp_site_data')) || defaultData;
    const mergeData = { ...defaultData, ...savedData };

    // FUNÇÃO AUXILIAR: SETAR TEXTO
    function setHtml(selector, text) {
        const el = document.querySelector(selector);
        if(el && text) el.innerHTML = text;
    }

    // FUNÇÃO AUXILIAR: MUDAR IMAGENS
    function setImg(selector, src) {
        const el = document.querySelector(selector);
        if(el && src) {
            // Se for background ou imagem 
            if(el.tagName === 'IMG') {
                el.src = src;
            } else {
                el.style.backgroundImage = `url(${src})`;
            }
        }
    }

    /* ==== APLICAR LOGO ==== */
    setHtml('.logo-name', `${mergeData.logo_texto_1} <span>${mergeData.logo_texto_2}</span>`);
    setHtml('.logo-sub2', mergeData.logo_sub);
    setHtml('footer .col:nth-child(1) h4', `${mergeData.logo_texto_1} ${mergeData.logo_texto_2}`.toUpperCase());

    /* ==== APLICAR INICIO ==== */
    // A primeira slide do SLIDER
    const slider1Title = document.querySelector('#section-1 .slide:nth-child(1) h1');
    if(slider1Title) {
        slider1Title.innerHTML = `${mergeData.slide1_tit1}<br><span style="color:#c8a96e;">${mergeData.slide1_tit2}</span>`;
    }
    const slider1Sub = document.querySelector('#section-1 .slide:nth-child(1) p');
    if(slider1Sub) {
        slider1Sub.innerHTML = mergeData.slide1_sub;
    }
    // Slide img é child da primeira div .slide
    const slider1Img = document.querySelector('#section-1 .slide:nth-child(1) img');
    if(slider1Img && mergeData.slide1_img) {
        slider1Img.src = mergeData.slide1_img;
        document.querySelector('#section-1 .slide:nth-child(1)').style.backgroundImage = `url(${mergeData.slide1_img})`;
    }
    
    // Stats Text
    setHtml('.typing-txt', mergeData.stats_text);
    setHtml('#section-6 h2', mergeData.stats_text); // tbm altera o cta text

    /* ==== APLICAR SERVIÇOS ==== */
    const serv1Tit = document.querySelector('#section-2 .row:nth-child(1) h3');
    if(serv1Tit) serv1Tit.innerText = mergeData.serv_tit1;
    
    const serv1Txt = document.querySelector('#section-2 .row:nth-child(1) .text-wrapper');
    if(serv1Txt && savedData.serv_txt1) serv1Txt.innerHTML = mergeData.serv_txt1; // so atualiza se tiver salvo pra no quebrar o original se n tiver
    
    const serv1Img = document.querySelector('#section-2 .row:nth-child(1) img');
    if(serv1Img && mergeData.serv_img1) serv1Img.src = mergeData.serv_img1;


    /* ==== APLICAR SOBRE ==== */
    const sobreTit = document.querySelector('#section-5 h3');
    if(sobreTit) sobreTit.innerText = mergeData.sobre_tit;

    const sobreTxt = document.querySelector('#section-5 .text-wrapper');
    if(sobreTxt && savedData.sobre_txt) sobreTxt.innerHTML = mergeData.sobre_txt;

    const sobreImg = document.querySelector('#section-5 img');
    if(sobreImg && mergeData.sobre_img) sobreImg.src = mergeData.sobre_img;


    /* ==== APLICAR CONTATOS ==== */
    // Vamos procurar pelos elementos que contém os info itens na ordem
    const infoItems = document.querySelectorAll('.c-info-item div');
    
    if(infoItems.length >= 4) {
        // Endereço (título é h5, p é endereco)
        setHtml('.c-info-item:nth-child(1) p', mergeData.contato_end);
        
        // Tel
        const telEl = document.querySelector('.c-info-item:nth-child(2) a');
        if(telEl) {
            telEl.innerText = mergeData.contato_tel;
            telEl.href = `tel:${mergeData.contato_tel.replace(/\D/g, '')}`;
        }

        // Email
        const mailEl = document.querySelector('.c-info-item:nth-child(3) a');
        if(mailEl) {
            mailEl.innerText = mergeData.contato_email;
            mailEl.href = `mailto:${mergeData.contato_email}`;
        }
        
        // HR
        setHtml('.c-info-item:nth-child(4) p', mergeData.contato_hr);
    }
});
