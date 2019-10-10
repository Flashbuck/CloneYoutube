document.addEventListener('DOMContentLoaded', () => {
            // экранная клавиатура
            {
                const keyboardButton = document.querySelector('.search-form__keyboard'),
                    keyboard = document.querySelector('.keyboard'),
                    closeKeyboard = document.getElementById('close-keyboard'),
                    searchInput = document.querySelector('.search-form__input'),
                    spaceKey = document.getElementById('spaceKey'),
                    backspaceKey = document.getElementById('keyboard-backspace');

                const toggleKeyboard = () => {
                    keyboard.style.top = keyboard.style.top ? '' : '50%';
                    console.log('keyboard.style.top: ', keyboard.style.top);
                };
                const changelang = (btn, lang) => {
                    const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                        'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
                        'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
                        'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
                        'ru', ' '
                    ];
                    const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
                        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
                        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
                        'en', ' '
                    ];

                    if (lang === 'en') {
                        btn.forEach((elem, i) => {
                            elem.textContent = langRu[i];
                        });
                    } else if (lang === 'ru') {
                        btn.forEach((elem, i) => {
                            elem.textContent = langEn[i];
                        });
                    }
                };

                const typing = event => {
                    const target = event.target;

                    if (target.tagName.toLowerCase() === 'button') {
                        const contentButton = target.textContent.trim(),
                            buttons = [...keyboard.querySelectorAll('button')]
                            .filter(elem => elem.style.visibility !== 'hidden');

                        if (!contentButton) {
                            searchInput.value += ' ';
                        } else if (contentButton == '⬅') {
                            searchInput.value = searchInput.value.slice(0, -1);
                        } else if (contentButton === 'en' || contentButton === 'ru') {
                            changelang(buttons, contentButton);

                        } else {
                            searchInput.value += contentButton;
                        }
                    } //backspace  space
                };
                keyboardButton.addEventListener('click', toggleKeyboard);
                closeKeyboard.addEventListener('click', toggleKeyboard);
                keyboard.addEventListener('click', typing);
            }

            // меню
            {
                const burger = document.querySelector('.spinner'),
                    sideBarMenu = document.querySelector('.sidebarMenu');

                burger.addEventListener('click', () => {
                    burger.classList.toggle('active');
                    sideBarMenu.classList.toggle('rollUp');
                });
                sideBarMenu.addEventListener('click', e => {
                    let target = e.target;
                    target = target.closest('a[href="#"]');
                    if (target) {
                        const parentTarget = target.parentNode;
                        sideBarMenu.querySelectorAll('li').forEach(elem => {
                            if (elem == parentTarget) {
                                elem.classList.add('active');
                            } else {
                                elem.classList.remove('active');
                            }

                        });
                    }
                });
            }

            // Модальное окно

            {
                document.body.insertAdjacentHTML('beforeEnd', `
        <div class="youTuberModal">
            <div id="youtuberClose">&#215</div>
            <div id="youtuberContainer"></div>
        </div>
        `);
                const youtuberItems = document.querySelectorAll('[data-youtuber]'),
                    youTuberModal = document.querySelector('.youTuberModal'),
                    youtuberContainer = document.getElementById('youtuberContainer'),
                    qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256],
                    qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

                const sizeVideo = () => {
                    let ww = document.documentElement.clientWidth,
                        wh = document.documentElement.clientHeight;

                    for (let i = 0; i < qw.length; i++) {
                        if (ww > qw[i]) {
                            youtuberContainer.querySelector('iframe').style.cssText = `
                        width: ${qw[i]}px;
                        height: ${qh[i]}px;
                        `;
                            youtuberContainer.style.cssText = `
                        width: ${qw[i]}px;
                        height: ${qh[i]}px;
                        top: ${(wh-qh[i])/2}px;
                        left: ${(ww-qw[i])/2}px;
                        `;
                            break;
                        }
                    }
                };




                youtuberItems.forEach(elem => {
                        elem.addEventListener('click', () => {
                            const idVideo = elem.dataset.youtuber;
                            youTuberModal.style.display = 'block';

                            const youTuberFrame = document.createElement('iframe');
                            youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
                            youtuberContainer.insertAdjacentElement('beforeEnd', youTuberFrame);

                            window.addEventListener('resize', sizeVideo);

                            sizeVideo();
                            });
                        });
                        youTuberModal.addEventListener('click', () => {
                            youTuberModal.style.display = '';
                            youtuberContainer.textContent = '';
                            window.removeEventListener('resize', sizeVideo);
                        });




                    
                }


                // youtube
                {
                    const API_KEY = 'AIzaSyDOLNjX0w45J-inriRGzEu6FmI9cU-XFWA';
                    const CLIENT_ID = '633909297552-knensnhb97vn41su1uikhld87khbq8tf.apps.googleusercontent.com';

                }


            });