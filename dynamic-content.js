// Carrega e aplica dinamicamente o conteúdo salvo do Painel Admin (LocalStorage)
document.addEventListener("DOMContentLoaded", function () {
    const defaultData = {
        logo_texto_1: "MCP",
        logo_texto_2: "Construções",
        logo_sub: "Engenharia e Obras",

        slide1_tit1: "Construção Civil",
        slide1_tit2: "de Alto Padrão",
        slide1_sub: "Mais de 15 anos construindo o futuro com excelência.",
        slide1_img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80",

        slide2_tit1: "Obras Residenciais",
        slide2_tit2: "e Comerciais",
        slide2_img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",

        slide3_tit1: "Reformas e",
        slide3_tit2: "Ampliações",
        slide3_img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",

        slide4_tit1: "Galpões e",
        slide4_tit2: "Construção Industrial",
        slide4_img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",

        stats_text: "NA MCP CONSTRUÇÕES, CADA DETALHE É IMPORTANTE.",

        serv_tit1: "Construção Residencial",
        serv_txt1: "<p style='margin-bottom: 15px;'>A MCP Construções é especializada em obras residenciais de alto padrão...</p>",
        serv_img1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80",

        serv_tit2: "Obras Comerciais e Industriais",
        serv_txt2: "<p style='margin-bottom: 15px;'>Galpões, lojas, escritórios e estruturas industriais prontos para o seu negócio.</p>",
        serv_img2: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",

        sobre_tit: "Sobre Nós",
        sobre_txt: "<p>A MCP Construções nasceu da paixão por transformar projetos em realidade...</p>",
        sobre_img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",

        contato_end: "Lisboa — Portugal",
        contato_tel: "+351 934 627 192",
        contato_email: "contato@mcpconstrucoes.pt",
        contato_hr: "Seg–Sex: 08h às 18h",

        // Defaults Portfolio
        port_img1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", port_nome1: "Residencial Vila Nova", port_cat1: "RESIDENCIAL",
        port_img2: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", port_nome2: "Centro Empresarial Horizonte", port_cat2: "COMERCIAL",
        port_img3: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", port_nome3: "Galpão Logístico LP-12", port_cat3: "INDUSTRIAL",
        port_img4: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80", port_nome4: "Casa Alto Padrão SP", port_cat4: "RESIDENCIAL, REFORMA",
        port_img5: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80", port_nome5: "Escritório Premium", port_cat5: "COMERCIAL, ACABAMENTO",
        port_img6: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80", port_nome6: "Reforma Campinas", port_cat6: "REFORMA, ACABAMENTO",
        port_img7: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", port_nome7: "Condomínio Guarulhos", port_cat7: "RESIDENCIAL",
        port_img8: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", port_nome8: "Complexo ABC", port_cat8: "INDUSTRIAL",
        port_img9: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80", port_nome9: "Acabamento Residencial", port_cat9: "ACABAMENTO",
        port_img10: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", port_nome10: "Loja Shopping", port_cat10: "COMERCIAL",
        port_img11: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80", port_nome11: "Reforma SP", port_cat11: "REFORMA",
        port_img12: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80", port_nome12: "Apto Alto Padrão", port_cat12: "RESIDENCIAL, ACABAMENTO"
    };

    let savedData = JSON.parse(localStorage.getItem('mcp_site_data'));
    if (!savedData) savedData = defaultData; // se n tiver salvo

    const md = { ...defaultData, ...savedData };

    function setHtml(selector, text) {
        const el = document.querySelector(selector);
        if (el && text !== undefined) el.innerHTML = text;
    }

    /* ==== LOGO ==== */
    setHtml('.logo-name', `${md.logo_texto_1} <span>${md.logo_texto_2}</span>`);
    setHtml('.logo-sub2', md.logo_sub);
    setHtml('footer .col:nth-child(1) h4', `${md.logo_texto_1} ${md.logo_texto_2}`.toUpperCase());

    /* ==== SLIDES ==== */
    const slides = document.querySelectorAll('#section-1 .slide');
    if (slides.length >= 4) {
        // Slide 1
        slides[0].querySelector('h1').innerHTML = `${md.slide1_tit1}<br><span style="color:#c8a96e;">${md.slide1_tit2}</span>`;
        if (slides[0].querySelector('p')) slides[0].querySelector('p').innerHTML = md.slide1_sub;
        if (md.slide1_img) slides[0].style.backgroundImage = `url(${md.slide1_img})`;

        // Slide 2
        slides[1].querySelector('h1').innerHTML = `${md.slide2_tit1}<br>${md.slide2_tit2}`;
        if (md.slide2_img) slides[1].style.backgroundImage = `url(${md.slide2_img})`;

        // Slide 3
        slides[2].querySelector('h1').innerHTML = `${md.slide3_tit1}<br>${md.slide3_tit2}`;
        if (md.slide3_img) slides[2].style.backgroundImage = `url(${md.slide3_img})`;

        // Slide 4
        slides[3].querySelector('h1').innerHTML = `${md.slide4_tit1}<br>${md.slide4_tit2}`;
        if (md.slide4_img) slides[3].style.backgroundImage = `url(${md.slide4_img})`;
    }

    // Stats Text
    setHtml('.typing-txt', md.stats_text);
    setHtml('#section-6 h2', md.stats_text);

    /* ==== SERVIÇOS ==== */
    const servRows = document.querySelectorAll('#section-2 .row');
    if (servRows.length >= 2) {
        // Bloco 1
        const s1Tit = servRows[0].querySelector('h3');
        if (s1Tit) s1Tit.innerText = md.serv_tit1;
        const s1Txt = servRows[0].querySelector('.text-wrapper');
        if (s1Txt) s1Txt.innerHTML = md.serv_txt1;
        const s1Img = servRows[0].querySelector('img');
        if (s1Img && md.serv_img1) s1Img.src = md.serv_img1;

        // Bloco 2
        const s2Tit = servRows[1].querySelector('h3');
        if (s2Tit) s2Tit.innerText = md.serv_tit2;
        const s2Txt = servRows[1].querySelector('.text-wrapper');
        if (s2Txt) s2Txt.innerHTML = md.serv_txt2;
        const s2Img = servRows[1].querySelector('img');
        if (s2Img && md.serv_img2) s2Img.src = md.serv_img2;
    }

    /* ==== PORTFÓLIO ==== */
    // Como os filtros do isotope funcionam por classes dadas em cada grid-item e data-src
    // precisaremos atualizar isso. Para o isotope, data-src é lido pela lib q poe lazy load background, entao a gente tem q atualizar tanto src quanto bk img.
    const portItems = document.querySelectorAll('.grid-item');
    if (portItems.length >= 12) {
        for (let i = 1; i <= 12; i++) {
            const item = portItems[i - 1];
            if (item) {
                // Remove as classes antigas de filtro e poe as novas baseado na categoria
                item.className = 'grid-item ' + md[`port_cat${i}`].split(',').map(c => 'filter-' + c.trim().substring(0, 3).toLowerCase()).join(' ');

                // Altera titulos
                item.querySelector('.ttl').innerText = md[`port_cat${i}`];
                item.querySelector('span:nth-child(2)').innerText = md[`port_nome${i}`];

                // Altera img src e div da imagem com background
                const imgHolder = item.querySelector('.bg-img');
                const img = item.querySelector('img');

                if (md[`port_img${i}`]) {
                    img.setAttribute('data-src', md[`port_img${i}`]);
                    img.src = md[`port_img${i}`];
                    imgHolder.style.backgroundImage = `url(${md[`port_img${i}`]})`;
                }
            }
        }
    }


    /* ==== SOBRE ==== */
    const sobreTit = document.querySelector('#section-5 h3');
    if (sobreTit) sobreTit.innerText = md.sobre_tit;
    const sobreTxt = document.querySelector('#section-5 .text-wrapper');
    if (sobreTxt) sobreTxt.innerHTML = md.sobre_txt;
    const sobreImg = document.querySelector('#section-5 img');
    if (sobreImg && md.sobre_img) sobreImg.src = md.sobre_img;


    /* ==== CONTATOS ==== */
    const infoItems = document.querySelectorAll('.c-info-item div');
    if (infoItems.length >= 4) {
        setHtml('.c-info-item:nth-child(1) p', md.contato_end);
        const telEl = document.querySelector('.c-info-item:nth-child(2) a');
        if (telEl) {
            telEl.innerText = md.contato_tel;
            telEl.href = `tel:${md.contato_tel.replace(/\D/g, '')}`;
        }
        const mailEl = document.querySelector('.c-info-item:nth-child(3) a');
        if (mailEl) {
            mailEl.innerText = md.contato_email;
            mailEl.href = `mailto:${md.contato_email}`;
        }
        setHtml('.c-info-item:nth-child(4) p', md.contato_hr);
    }
});
