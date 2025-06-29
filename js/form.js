document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const successMessage = document.createElement('p');
  successMessage.style.color = 'green';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    let messages = [];

    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const message = form.querySelector('textarea[name="message"]');

    if (!name.value.trim()) {
      isValid = false;
      messages.push('Veuillez saisir votre nom.');
    }

    if (!email.value.trim()) {
      isValid = false;
      messages.push('Veuillez saisir votre email.');
    } else if (!validateEmail(email.value.trim())) {
      isValid = false;
      messages.push('Veuillez saisir un email valide.');
    }

    if (!message.value.trim()) {
      isValid = false;
      messages.push('Veuillez saisir votre message.');
    }

    if (!isValid) {
      alert(messages.join('\n'));
      return;
    }

    // Envoi AJAX vers Formspree
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        successMessage.textContent = 'Merci pour votre message ! Nous vous répondrons rapidement.';
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        form.reset();
      } else {
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    } catch (error) {
      alert('Erreur réseau. Vérifiez votre connexion.');
    }
  });
});

function validateEmail(email) {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
}
