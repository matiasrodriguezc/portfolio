// Translations object
const translations = {
  es: {
    // Navegación
    "nav.about": "Sobre mí",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.experience": "Experiencia",
    "nav.contact": "Contacto",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.title": "Ingeniero en Sistemas",
    "hero.description":
      "Especializado en desarrollo de software, arquitectura de sistemas y soluciones tecnológicas innovadoras.",
    "hero.contact": "Contactame",
    "hero.projects": "Ver proyectos",

    // Sobre mí
    "about.title": "Sobre mí",
    "about.p1":
      "Soy un Ingeniero en Sistemas con experiencia en el desarrollo de soluciones tecnológicas. Me especializo en arquitectura de software, desarrollo full-stack y optimización de sistemas.",
    "about.p2":
      "Mi enfoque combina sólidos conocimientos técnicos con habilidades de resolución de problemas, permitiéndome diseñar e implementar soluciones eficientes y escalables para desafíos complejos.",
    "about.p3":
      "Constantemente me mantengo actualizado con las últimas tecnologías y metodologías, lo que me permite ofrecer soluciones innovadoras y de vanguardia.",
    "about.name": "Nombre:",
    "about.email": "Email:",
    "about.location": "Ubicación:",
    "about.availability": "Disponibilidad:",
    "about.fulltime": "Tiempo completo",
    "about.downloadCV": "Descargar CV",
    "about.spanish": "Español",
    "about.english": "Inglés",

    // Habilidades
    "skills.title": "Habilidades",
    "skills.development": "Desarrollo",
    "skills.infrastructure": "Infraestructura",
    "skills.tools": "Herramientas",

    // Proyectos
    "projects.title": "Proyectos",

    "project1.title": "Blog App",
    "project1.description":
      "Aplicación FullStack con Next.js que permite a usuarios autenticados crear, editar y eliminar publicaciones. Incluye autenticación con JWT, almacenamiento en MongoDB y una interfaz moderna con Tailwind CSS.",

    "project2.title": "Clients Web App",
    "project2.description":
      "Aplicación web desarrollada con Angular para gestionar información de clientes. Permite visualizar saldos, agregar nuevos clientes y editar los existentes, con estadísticas en tiempo real. Diseño amigable y funcional con soporte para Firebase.",

    "project3.title": "JavaScript Mini Apps",
    "project3.description":
      "Una colección de proyectos web interactivos que incluyen un reloj digital en tiempo real, un listado de personas dinámico, una aplicación de presupuesto con ingresos y egresos, y una calculadora simple. Ideales para demostrar conocimientos en manipulación del DOM, lógica de negocio y diseño web básico.",

    "project4.title": "Shopping Cart",
    "project4.description":
      "Sistema e-commerce desarrollado con Spring Boot y PostgreSQL. Permite gestionar carritos, productos, usuarios y realizar compras con validaciones de stock y precio en tiempo real.",

    "project5.title": "Web Generator",
    "project5.description":
      "Asistente conversacional desarrollado en Python con Rasa, integrado con Telegram para generar sitios web automáticamente desde el chat.",

    "project6.title": "Photo Gallery App",
    "project6.description":
      "Aplicación desarrollada en Flutter que permite a los usuarios registrarse, iniciar sesión y acceder a su galería de fotos. Se implementó funcionalidad CRUD para gestionar imágenes y los datos se almacenan en Firebase.",

    "projects.code": "Código",
    "projects.demo": "Demo",

    // Experiencia
    "experience.title": "Experiencia",
    "exp1.role": "Desarrollador FullStack",
    "exp1.company": "Abaco Informatica",
    "exp1.period": "2024 - Presente",
    "exp1.description":
      "Desarrollo y mantengo una aplicación web con frontend en React y backend en PHP, en la cual realicé una migración del entorno antiguo hacia uno moderno utilizando Vite, mejorando notablemente los tiempos de carga y la experiencia de desarrollo. Implementé AG Grid para optimizar la visualización de datos, y trabajé en la adaptación responsiva del sitio, incluyendo botones para aumentar o reducir el tamaño de fuente, los cuales también ajustan dinámicamente la cantidad de filas visibles en la tabla según el tamaño seleccionado. En la parte backend, optimicé el uso de vistas materializadas en la base de datos, evitando su recreación en cada recarga; en su lugar, diseñé un sistema que genera la vista al inicio de cada sesión y la reutiliza durante toda su duración, mejorando la eficiencia del sistema y reduciendo el consumo de recursos.",

    // Educación
    "education.title": "Educación",
    "edu1.degree": "Ingeniería en Sistemas",
    "edu1.institution": "Universidad Nacional del Centro de la Provincia de Buenos Aires",
    "edu1.period": "2020 - 2024",
    "edu1.description":
      "Carrera centrada en la planificación, análisis y gestión de sistemas complejos, integrando habilidades en desarrollo de software, infraestructura, arquitectura de sistemas y liderazgo técnico.",
    "edu2.degree": "Analista Programador Universitario",
    "edu2.institution": "Universidad Nacional del Centro de la Provincia de Buenos Aires",
    "edu2.period": "2020 - 2024",
    "edu2.description":
      "Formación orientada al diseño, desarrollo e implementación de sistemas de software, con sólidos conocimientos en programación, bases de datos y metodologías de desarrollo.",

    // Titulos
    "certification.title": "Certificaciones",
    "cert1.degree": "Inglés - C1 Certificate",
    "cert1.institution": "EF SET, Online",
    "cert1.period": "2024",
    "cert2.degree": "Inglés - B2 First Certificate Exam",
    "cert2.institution": "Cambridge University, Reino Unido",
    "cert2.period": "2018",
    "cert3.degree": "Desarrollador Java Backend",
    "cert3.institution": "Lamansys, Tandil, Argentina",
    "cert3.period": "2024",
    "cert4.degree": "Angular - Desarrollador Web",
    "cert4.institution": "Udemy, Online",
    "cert4.period": "2024",

    // Contacto
    "contact.title": "Contacto",
    "contact.description":
      "¿Interesado en trabajar juntos o alguna pregunta? No dudes en contactarme a través de alguno de los datos de contacto.",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
    "contact.form.name": "Nombre",
    "contact.form.email": "Email",
    "contact.form.subject": "Asunto",
    "contact.form.message": "Mensaje",
    "contact.form.send": "Enviar mensaje",
    "contact.form.namePlaceholder": "Tu nombre",
    "contact.form.emailPlaceholder": "tu@email.com",
    "contact.form.subjectPlaceholder": "Asunto del mensaje",
    "contact.form.messagePlaceholder": "Tu mensaje...",

    // Footer
    "footer.rights": "Todos los derechos reservados.",

    // Language
    language: "Idioma",
    "language.spanish": "Español",
    "language.english": "Inglés",
  },
  en: {
    // Navigation
    "nav.about": "About me",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact me",

    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.title": "Systems Engineer",
    "hero.description":
      "Specialized in software development, systems architecture, and innovative technological solutions.",
    "hero.contact": "Contact me",
    "hero.projects": "View projects",

    // About
    "about.title": "About me",
    "about.p1":
      "I'm a Systems Engineer with experience in the development of technological solutions. I specialize in software architecture, full-stack development, and systems optimization.",
    "about.p2":
      "My approach combines solid technical knowledge with problem-solving skills, allowing me to design and implement efficient and scalable solutions for complex challenges.",
    "about.p3":
      "I constantly stay up to date with the latest technologies and methodologies, which enables me to deliver innovative and cutting-edge solutions.",
    "about.name": "Name:",
    "about.email": "Email:",
    "about.location": "Location:",
    "about.availability": "Availability:",
    "about.fulltime": "Full time",
    "about.downloadCV": "Download CV",
    "about.spanish": "Spanish",
    "about.english": "English",

    // Skills
    "skills.title": "Skills",
    "skills.development": "Development",
    "skills.infrastructure": "Infrastructure",
    "skills.tools": "Tools",

    // Projects
    "projects.title": "Projects",

    "project1.title": "Blog App",
    "project1.description":
      "FullStack application built with Next.js that allows authenticated users to create, edit, and delete posts. Includes JWT authentication, MongoDB storage, and a modern interface with Tailwind CSS.",

    "project2.title": "Clients Web App",
    "project2.description":
      "Web application developed with Angular to manage client information. It allows viewing balances, adding new clients, and editing existing ones, with real-time statistics. User-friendly and functional design with Firebase support.",

    "project3.title": "JavaScript Mini Apps",
    "project3.description":
      "A collection of interactive web projects including a real-time digital clock, a dynamic people list, a budget app with income and expenses, and a simple calculator. Ideal for showcasing DOM manipulation, business logic, and basic web design skills.",

    "project4.title": "Shopping Cart",
    "project4.description":
      "E-commerce system developed with Spring Boot and PostgreSQL. Allows managing carts, products, users, and performing purchases with real-time stock and price validation.",

    "project5.title": "Web Generator",
    "project5.description":
      "Conversational assistant developed in Python with Rasa, integrated with Telegram to automatically generate websites from the chat.",

    "project6.title": "Photo Gallery App",
    "project6.description":
      "Application developed in Flutter that allows users to register, log in, and access their photo gallery. CRUD functionality was implemented to manage images and data is stored in Firebase.",

    "projects.code": "Code",
    "projects.demo": "Demo",

    // Experience
    "experience.title": "Experience",
    "exp1.role": "FullStack Developer",
    "exp1.company": "Abaco Informatica",
    "exp1.period": "2024 - Present",
    "exp1.description":
      "I develop and maintain a web application with React frontend and PHP backend, where I migrated the legacy environment to a modern one using Vite, significantly improving load times and developer experience. I implemented AG Grid to optimize data visualization, and worked on responsive design, including buttons to increase or decrease font size, which also dynamically adjust the number of visible rows in the table according to the selected size. On the backend, I optimized the use of materialized views in the database by avoiding their recreation on each reload; instead, I designed a system that generates the view at the beginning of each session and reuses it throughout, enhancing system efficiency and reducing resource consumption.",

    // Education
    "education.title": "Education",
    "edu1.degree": "Systems Engineering",
    "edu1.institution": "National University of the Center of the Province of Buenos Aires",
    "edu1.period": "2020 - 2024",
    "edu1.description":
      "Degree focused on the planning, analysis, and management of complex systems, integrating skills in software development, infrastructure, systems architecture, and technical leadership.",
    "edu2.degree": "University Programming Analyst",
    "edu2.institution": "National University of the Center of the Province of Buenos Aires",
    "edu2.period": "2020 - 2024",
    "edu2.description":
      "Program focused on the design, development, and implementation of software systems, with solid knowledge in programming, databases, and development methodologies.",

    // Certifications
    "certification.title": "Certifications",
    "cert1.degree": "English - C1 Certificate",
    "cert1.institution": "EF SET, Online",
    "cert1.period": "2024",
    "cert2.degree": "English - B2 First Certificate Exam",
    "cert2.institution": "Cambridge University, United Kingdom",
    "cert2.period": "2018",
    "cert3.degree": "Java Backend Developer",
    "cert3.institution": "Lamansys, Tandil, Argentina",
    "cert3.period": "2024",
    "cert4.degree": "Angular - Web Developer",
    "cert4.institution": "Udemy, Online",
    "cert4.period": "2024",

    // Contact
    "contact.title": "Contact",
    "contact.description":
      "Interested in working together or have any questions? Feel free to contact me via some of the provided contact details.",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send message",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.subjectPlaceholder": "Subject of the message",
    "contact.form.messagePlaceholder": "Your message...",

    // Footer
    "footer.rights": "All rights reserved.",

    // Language
    language: "Language",
    "language.spanish": "Spanish",
    "language.english": "English",
  },
}
