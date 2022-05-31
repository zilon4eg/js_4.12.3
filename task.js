function authSuccess(userId) {
    document.getElementById('signin').classList.remove('signin_active');
    const welcomeMsg = document.getElementById('user_id');
    welcomeMsg.textContent = userId;
    document.getElementById('welcome').classList.add('welcome_active');
}

function clearAuthForm() {
    const entryFields = authForm.querySelectorAll('.control');
    for (const entryField of entryFields) {
        entryField.value = '';
    }
}


const authForm = document.getElementById('signin__form');
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();

    xhr.onload = () => {
        if (xhr.status != 200) { // HTTP ошибка?
          // обработаем ошибку
          alert('Ошибка: ' + xhr.status);
          return;
        }
    }

    xhr.onload = () => {
        const postRes = JSON.parse(xhr.responseText);
        const userId = postRes.user_id;

        if (postRes.success) {
            authSuccess(userId);
        }
        else {
            alert('Неверный логин/пароль!');
            clearAuthForm();
        }
    };

    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
    const authFormData = new FormData(document.getElementById('signin__form'));
    xhr.send(authFormData);
});
