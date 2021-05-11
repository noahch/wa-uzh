/**
 * Set the form control element to valid
 * @param {object} element - The DOM element
 */
function setValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
}

/**
 * Set the form control element to invalid with the error message
 * @param {object} element - The DOM element
 */
function setInvalid(element) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
}

/**
 * Remove validation information from the element
 * @param {object} element - The DOM element
 */
function removeValidation(element) {
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
}

function errorElement(id, msg) {
    var a = document.createElement('a');
    a.href = '#' + id;
    a.dataset.pointsTo = id;
    a.innerHTML = msg;
    a.classList = ['text-danger'];
    a.setAttribute('aria-live', 'assertive');
    return a;
}

function changeErrorList(listId, msgs) {
    var listEl = document.getElementById(listId);
    var li;

    listEl.innerHTML = '';
    msgs.forEach(function(m) {
        li = document.createElement('li');
        li.appendChild(m);
        listEl.appendChild(li);
    })

    // make it visible
    listEl.classList.remove('sr-only');
    listEl.classList.add('sr-only-focusable');
}

/**
 * Validate the login form and try to log the user in
 * @param {object} event - The DOM event
 */
function login(event) {
    event.preventDefault();
    event.stopPropagation();

    var hasError = false;
    var errorMessages = [];

    var email = document.getElementById('login-email-control');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        setInvalid(email);
        hasError = true;
        errorMessages.push(errorElement('login-email-control', 'Please provide an email address'));
    } else {
        setInvalid(email);
        hasError = true;
        errorMessages.push(errorElement('login-email-control', 'Please provide a valid e-mail address'));
    }

    var password = document.getElementById('login-password-control');
    if (password.value.trim().length == 0) {
        setInvalid(password);
        hasError = true;
        errorMessages.push(errorElement('login-password-control', 'Please provide a valid password'))
    } else {
        setValid(password);
    }

    if (hasError) {
        document.getElementById('login-error').classList.remove('d-none');
        changeErrorList('login-error-list', errorMessages);
    } else {
        document.getElementById('login-error').classList.add('d-none');
        document.getElementById('login-error-list').classList.remove('sr-only-focusable');
        document.getElementById('login-error-list').classList.add('sr-only');

    }
}

/**
 * Validate the login form and try to retrieve the password
 * @param {object} event - The DOM event
 */
function forgot(event) {
    event.preventDefault();
    event.stopPropagation();

    var hasError = false;

    var email = document.getElementById('login-email-control');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        setInvalid(email);
        hasError = true;
    } else {
        setInvalid(email);
        hasError = true;
    }

    var password = document.getElementById('login-password-control');
    removeValidation(password);

    if (hasError) {
        document.getElementById('login-error').classList.remove('d-none');
    } else {
        document.getElementById('login-error').classList.add('d-none');
    }
}

/**
 * Validate the login form and try to register the new user
 * @param {object} event - The DOM event
 */
function register(event) {
    event.preventDefault();
    event.stopPropagation();

    var hasError = false;
    var errorMessages = [];

    var firstName = document.getElementById('register-first-name-control');
    if (firstName.value.trim().length == 0) {
        setInvalid(firstName);
        hasError = true;
        errorMessages.push(errorElement('register-first-name-control', 'Please provide a valid first name'))
    } else if (firstName.validity.valid) {
        setValid(firstName);
    }

    var lastName = document.getElementById('register-last-name-control');
    if (lastName.value.trim().length == 0) {
        setInvalid(lastName);
        hasError = true;
        errorMessages.push(errorElement('register-last-name-control', 'Please provide a valid last name'))
    } else if (lastName.validity.valid) {
        setValid(lastName);
    }

    var email = document.getElementById('register-email-control');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        setInvalid(email);
        hasError = true;
        errorMessages.push(errorElement('register-email-control', 'Please provide an email address'));
    } else {
        setInvalid(email);
        hasError = true;
        errorMessages.push(errorElement('register-email-control', 'Please provide a valid email address'));
    }

    var password = document.getElementById('register-password-control');
    var passwordValue = password.value.trim();
    if (passwordValue.length < 8) {
        setInvalid(password);
        hasError = true;
        errorMessages.push(errorElement('register-password-control', 'Please provide a password that contains between 8 and 16 characters.'));
    } else if (passwordValue.length > 16) {
        setInvalid(password);
        hasError = true;
        errorMessages.push(errorElement('register-password-control', 'Please provide a password that contains between 8 and 16 characters.'));
    } else if (passwordValue.match(/[a-zA-Z]+/) == null) {
        setInvalid(password);
        hasError = true;
        errorMessages.push(errorElement('register-password-control', 'Password must contain letters.'));
    } else if (passwordValue.match(/[0-9]+/) == null) {
        setInvalid(password);
        hasError = true;
        errorMessages.push(errorElement('register-password-control', 'Password must contain numbers.'));
    } else {
        setValid(password);
    }

    var programme = document.getElementById('register-programme-control');
    if (programme.validity.valueMissing) {
        setInvalid(programme);
        hasError = true;
    } else if (!programme.validity.valid) {
        setInvalid(programme);
        hasError = true;
    } else {
        setValid(programme);
        errorMessages.push(errorElement('register-programme-control', 'Please select a studdy programme'))
    }

    if (hasError) {
        document.getElementById('register-error').classList.remove('d-none');
        changeErrorList('register-error-list', errorMessages);
    } else {
        document.getElementById('register-error').classList.add('d-none');
        document.getElementById('register-error-list').classList.remove('sr-only-focusable');
        document.getElementById('register-error-list').classList.add('sr-only');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document
        .getElementById('login-login-button')
        .addEventListener('click', login, false);

    document
        .getElementById('login-forgot-button')
        .addEventListener('click', forgot, false);

    document
        .getElementById('register-register-button')
        .addEventListener('click', register, false);
}, false);
