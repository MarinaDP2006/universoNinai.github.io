class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.spinner = document.getElementById('spinner');
        this.alertContainer = document.getElementById('alertContainer');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            asunto: formData.get('asunto'),
            mensaje: formData.get('mensaje')
        };

        // Validación básica
        if (!this.validateForm(data)) {
            return;
        }

        this.setLoading(true);

        try {
            await this.sendEmail(data);
            this.showAlert('Mensaje enviado correctamente. Te responderemos pronto.', 'success');
            this.form.reset();
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            this.showAlert('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'danger');
        } finally {
            this.setLoading(false);
        }
    }

    validateForm(data) {
        if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
            this.showAlert('Por favor, completa todos los campos.', 'warning');
            return false;
        }

        if (!this.isValidEmail(data.email)) {
            this.showAlert('Por favor, ingresa un email válido.', 'warning');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async sendEmail(data) {
        // Usar EmailJS (recomendado) o un servicio similar
        // Aquí un ejemplo con EmailJS
        
        // Primero, registra una cuenta en https://www.emailjs.com/
        // Luego configura tu servicio y template
        
        const serviceID = 'tu_service_id';
        const templateID = 'tu_template_id';
        const publicKey = 'tu_public_key';

        const templateParams = {
            from_name: data.nombre,
            from_email: data.email,
            subject: data.asunto,
            message: data.mensaje,
            to_email: 'historiasofnina05@gmail.com'
        };

        // Si usas EmailJS, descomenta esto:
        /*
        return await emailjs.send(serviceID, templateID, templateParams, publicKey);
        */

        // Alternativa: Usar Formspree (más simple)
        // Ve a https://formspree.io/ y usa este código:
        const response = await fetch('https://formspree.io/f/xdknvjvg', { // Reemplaza con tu Formspree endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                _replyto: data.email,
                _subject: data.asunto
            })
        });

        if (!response.ok) {
            throw new Error('Error en el envío');
        }

        return response;
    }

    setLoading(loading) {
        if (loading) {
            this.spinner.classList.remove('d-none');
            this.submitBtn.disabled = true;
        } else {
            this.spinner.classList.add('d-none');
            this.submitBtn.disabled = false;
        }
    }

    showAlert(message, type) {
        this.alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new ContactForm();
});