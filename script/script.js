
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

        const typing = event => {
            const target = event.target;
            if (target.tagName.toLowerCase() === 'button') {
                if(target.textContent == spaceKey.value){
                    searchInput.value += ' ';
                }
                if(target.textContent == backspaceKey.innerHTML){
                    searchInput.value = searchInput.value.slice(0,-1);
                }else{
                searchInput.value += target.textContent.trim();
                }
            }
            //backspace  space
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
            if(target){
                const parentTarget = target.parentNode;
                sideBarMenu.querySelectorAll('li').forEach(elem =>{
                    if(elem == parentTarget){
                        elem.classList.add('active');
                    }else{
                        elem.classList.remove('active');
                    }
                });
            }
        });
    }

    // Модальное окно

    // {
    //     const divYoutuber = document.createElement('div');
    // }

});