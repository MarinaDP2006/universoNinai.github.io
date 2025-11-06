class AuthGoogle {
    constructor() {
        this.clientId = 'TU_CLIENT_ID_DE_GOOGLE.apps.googleusercontent.com'; // Reemplazar con tu Client ID real
        this.initializeGoogleAuth();
    }

    initializeGoogleAuth() {
        // Cargar la API de Google
        if (typeof google === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = () => this.renderGoogleButton();
            document.head.appendChild(script);
        } else {
            this.renderGoogleButton();
        }
    }

    renderGoogleButton() {
        // Crear el botón de Google
        const googleButton = document.createElement('div');
        googleButton.className = 'g_id_signin';
        googleButton.setAttribute('data-type', 'standard');
        googleButton.setAttribute('data-shape', 'rectangular');
        googleButton.setAttribute('data-theme', 'outline');
        googleButton.setAttribute('data-text', 'signin_with');
        googleButton.setAttribute('data-size', 'large');
        googleButton.setAttribute('data-logo_alignment', 'left');
        googleButton.setAttribute('data-width', '300');

        // Agregar el botón al contenedor
        const container = document.getElementById('googleAuthContainer');
        if (container) {
            container.innerHTML = '';
            container.appendChild(googleButton);
        }

        // Configurar el callback
        window.handleGoogleAuth = (response) => this.handleCredentialResponse(response);
        
        // Inicializar Google Identity Services
        google.accounts.id.initialize({
            client_id: this.clientId,
            callback: window.handleGoogleAuth
        });

        google.accounts.id.renderButton(
            googleButton,
            { 
                theme: "outline", 
                size: "large",
                width: 300,
                text: "signin_with"
            }
        );
    }

    handleCredentialResponse(response) {
        console.log('Google Auth Response:', response);
        
        // Decodificar el JWT para obtener la información del usuario
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        
        // Guardar en localStorage
        localStorage.setItem("usuarioLogueado", "true");
        localStorage.setItem("userName", payload.name);
        localStorage.setItem("userEmail", payload.email);
        localStorage.setItem("userPicture", payload.picture);
        localStorage.setItem("googleAuthToken", response.credential);

        // Actualizar la UI
        this.updateUIAfterLogin(payload.name);
        
        // Mostrar mensaje de éxito
        this.showSuccessMessage(`¡Bienvenido ${payload.name}!`);
    }

    updateUIAfterLogin(userName) {
        const loginItem = document.getElementById('loginItem');
        const userItem = document.getElementById('userItem');
        const userNameSpan = document.getElementById('userName');
        const testSection = document.getElementById('testPersonajeSection');

        if (loginItem) loginItem.classList.add('d-none');
        if (userItem) userItem.classList.remove('d-none');
        if (userNameSpan) userNameSpan.textContent = userName;
        if (testSection) testSection.classList.remove('d-none');
    }

    showSuccessMessage(message) {
        // Crear toast de éxito
        const toast = document.createElement('div');
        toast.className = 'alert alert-success position-fixed top-0 end-0 m-3';
        toast.style.zIndex = '9999';
        toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(toast);

        // Auto-remover después de 3 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    logout() {
        // Limpiar localStorage
        localStorage.removeItem("usuarioLogueado");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPicture");
        localStorage.removeItem("googleAuthToken");

        // Actualizar UI
        this.updateUIAfterLogout();
        
        // Cerrar sesión de Google
        if (google && google.accounts) {
            google.accounts.id.disableAutoSelect();
        }
    }

    updateUIAfterLogout() {
        const loginItem = document.getElementById('loginItem');
        const userItem = document.getElementById('userItem');
        const testSection = document.getElementById('testPersonajeSection');

        if (loginItem) loginItem.classList.remove('d-none');
        if (userItem) userItem.classList.add('d-none');
        if (testSection) testSection.classList.add('d-none');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.authGoogle = new AuthGoogle();
    
    // Manejar logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.authGoogle.logout();
        });
    }
});