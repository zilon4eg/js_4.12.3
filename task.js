function authSuccess(userId) {
    localStorage.setItem('user', userId);
    document.getElementById('signin').classList.remove('signin_active');
    const welcomeMsg = document.getElementById('user_id');
    welcomeMsg.textContent = userId;
    document.getElementById('welcome').classList.add('welcome_active');
}


function logout() {
    localStorage.removeItem('user');
    document.getElementById('signin').classList.add('signin_active');
    document.getElementById('welcome').classList.remove('welcome_active');
}


const authForm = document.getElementById('signin__form');

const userIdLocal = localStorage.getItem('user');
if (userIdLocal != null) {
    authSuccess(userIdLocal);
}

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();

    xhr.onload = () => {
        const postRes = JSON.parse(xhr.responseText);
        const userId = postRes.user_id;

        if (postRes.success) {
            authSuccess(userId);
        }
        else {
            alert('Неверный логин/пароль!');
            authForm.reset();
        }
    };

    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
    const authFormData = new FormData(document.getElementById('signin__form'));
    xhr.send(authFormData);
});

const logoutBtn = document.getElementById('signout__btn');
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
});