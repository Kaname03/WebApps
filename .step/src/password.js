function hash(text) {
  const sha = new jsSHA('SHA-256', 'TEXT');
  sha.update(text);
  return sha.getHash('HEX');
}
function auth(password) {
  const url = hash(password);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      window.location = url;
    } else {
      const message = document.getElementById('message');
      const input = document.getElementById('password');
      message.innerHTML = 'Wrong password! Try again.';
      input.value = '';
    }
  };
  xhr.onerror = function () {
    const message = document.getElementById('message');
    message.innerHTML = 'Sorry, ERROR !';
  };
}
const form = document.getElementById('form');
form.addEventListener('submit', function (event) {
  const password = document.getElementById('password').value;
  auth(password);
  event.preventDefault();
});