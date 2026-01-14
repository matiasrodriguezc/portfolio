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
      "Soy Ingeniero en Sistemas con experiencia en el desarrollo de soluciones tecnológicas. Me especializo en desarrollo Full-Stack y actualmente MLOps (Operaciones de Machine Learning).",
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

    "project1.title": "Autobid AI",
    "project1.description":
      "SaaS Full Stack desarrollado con Next.js y FastAPI. Implementa una arquitectura RAG con Pinecone y Google Gemini para el análisis semántico de licitaciones (PDFs), junto con un modelo de ML (Scikit-Learn) que predice la probabilidad de ganar (Win Rate). Incluye anonimización de datos sensibles (PII) y autenticación multi-tenant.",

    "project2.title": "RAG - Chatbot Asistente Virtual",
    "project2.description":
      "Construí un chatbot RAG (Retrieval-Augmented Generation) que permite a los usuarios conversar con mi experiencia profesional en tiempo real. La arquitectura implementa un concepto de Live Resume: un pipeline CI/CD en GitHub Actions extrae mi biografía directamente desde Google Docs y actualiza automáticamente la base de datos vectorial Pinecone. FastAPI gestiona la lógica RAG con LangChain y transmite las respuestas del modelo Google Gemini 2.5 mediante streaming.",

    "project3.title": "MLOps - Predictor de Ausencia",
    "project3.description":
      "Proyecto Full-Stack end-to-end que predice las horas de absentismo de los empleados. Este sistema gestiona el ciclo de vida completo del dato, desde la ingesta y el análisis hasta el re-entrenamiento automático y el despliegue del modelo.",

    "project4.title": "Deep Learning - Analizador de Emociones",
    "project4.description":
      "EmotionAI es una aplicación web Full-Stack para la clasificación de emociones en tiempo real. Los usuarios pueden ingresar texto y recibir un desglose interactivo de las emociones detectadas (alegría, tristeza, ira y miedo).",
    "project5.title": "Web Generator",
    "project5.description":
      "Asistente conversacional desarrollado en Python con Rasa, integrado con Telegram para generar sitios web automáticamente desde el chat.",

    "project5.title": "Data Science - IA - Clustering",
    "project5.description":
      "Desarrollé una aplicación web full-stack que realiza clustering K-Means. Permite a los usuarios subir un CSV, seleccionar variables y visualizar los datos en gráficos interactivos (Recharts). La app identifica automáticamente el número óptimo de clusters (Método del Codo) y utiliza la API de Google Gemini para analizar los segmentos y asignarles nombres y descripciones accionables.",
    
    "project6.title": "NLP - Búsqueda semántica",
    "project6.description": "Proyecto de procesamiento de lenguaje natural (NLP) que implementa un sistema de búsqueda por aproximación para temas de cursos. Utiliza la base de datos de vectores Pinecone para búsquedas más relevantes contextualmente que las basadas en palabras clave.",
  
    "projects.code": "Código",
    "projects.demo": "Demo",

    // Experiencia
    "experience.title": "Experiencia",
    "exp1.role": "Desarrollador FullStack",
    "exp1.company": "Cleatus AI",
    "exp1.period": "2025",
    "exp1.description":
      "Durante mi pasantía en Cleatus AI como desarrollador Full-Stack, contribuí al desarrollo de una plataforma que combina inteligencia artificial con automatización del proceso de contrataciones públicas: desde el descubrimiento inteligente de licitaciones, pasando por la generación ágil de propuestas conformes, hasta el soporte estratégico vía un asistente conversacional de GovCon.",
      
    "exp2.role": "Desarrollador FullStack",
    "exp2.company": "Ábaco Informática",
    "exp2.period": "2024 - Presente",
    "exp2.description":
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
    "cert1.degree": "Ingeniero de IA",
    "cert1.institution": "Udemy, Online",
    "cert1.period": "2025",
    "cert2.degree": "Científico de Datos",
    "cert2.institution": "Udemy, Online",
    "cert2.period": "2025",
    "cert3.degree": "Ingeniero de Datos",
    "cert3.institution": "Udemy, Online",
    "cert3.period": "2025",
    "cert4.degree": "Inglés - C1 Certificate",
    "cert4.institution": "EF SET, Online",
    "cert4.period": "2024",
    "cert5.degree": "Inglés - B2 First Certificate Exam",
    "cert5.institution": "Cambridge University, Reino Unido",
    "cert5.period": "2018",
    "cert6.degree": "Desarrollador Java Backend",
    "cert6.institution": "Lamansys, Tandil, Argentina",
    "cert6.period": "2024",
    "cert7.degree": "Angular - Desarrollador Web",
    "cert7.institution": "Udemy, Online",
    "cert7.period": "2024",

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

    "chat.title": "Asistente de IA",
    "chat.intro": "¡Hola! Soy un asistente de IA. Pregúntame sobre el CV de Matías.",
    "chat.placeholder": "Haz una pregunta...",
    "chat.error": "Lo siento, ocurrió un error. Intenta de nuevo.",

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
    "about.p1": "I'm a Systems Engineer with experience in developing technological solutions. I specialize in Full-Stack development and currently in MLOps (Machine Learning Operations).",
    "about.p2": "My approach combines solid technical knowledge with problem-solving skills, allowing me to design and implement efficient and scalable solutions for complex challenges.",
    "about.p3": "I constantly stay up to date with the latest technologies and methodologies, which enables me to offer innovative and cutting-edge solutions.",
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

    "project1.title": "Autobid AI",
    "project1.description":
      "Full-Stack SaaS developed with Next.js and FastAPI. Implements a RAG architecture using Pinecone and Google Gemini for semantic analysis of tenders (PDFs), alongside a Machine Learning model (Scikit-Learn) that predicts win probability (Win Rate). Includes sensitive data anonymization (PII) and multi-tenant authentication.",

    "project2.title": "RAG - Chatbot Virtual Assistant",
    "project2.description":
      "I built a RAG (Retrieval-Augmented Generation) chatbot that enables users to converse with my professional experience in real-time. The architecture implements a Live Resume concept: a CI/CD pipeline in GitHub Actions extracts my biography directly from Google Docs and automatically updates the Pinecone vector database. FastAPI manages the RAG logic with LangChain and streams responses from the Google Gemini 2.5 model.",

    "project3.title": "MLOps - Absence Predictor",
    "project3.description":
      "End-to-end Full-Stack project that predicts employee absenteeism hours. This system manages the complete data lifecycle, from ingestion and analysis to automatic re-training and model deployment.",

    "project4.title": "Deep Learning - Emotion Analyzer",
    "project4.description":
      "A Full-Stack web application for real-time emotion classification. Users can input text and receive an interactive breakdown of the detected emotions (joy, sadness, anger, and fear).",
    "project5.title": "Web Generator",
    "project5.description":
      "Conversational assistant developed in Python with Rasa, integrated with Telegram to automatically generate websites from the chat.",

    "project5.title": "Data Science - AI - Clustering",
    "project5.description":
      "I developed a full-stack web application that performs K-Means clustering. It allows users to upload a CSV, select variables, and visualize the data on interactive charts (Recharts). The app automatically identifies the optimal number of clusters (Elbow Method) and uses the Google Gemini API to analyze the segments and assign them actionable names and descriptions.",

    "project6.title": "NLP - Semantic Search",
    "project6.description": "Natural Language Processing (NLP) project that implements an approximation-based search system for course topics. Leverages the Pinecone vector database for contextually relevant searches instead of simple keyword matching.",

    "projects.code": "Code",
    "projects.demo": "Demo",

    // Experience
    "experience.title": "Experience",
    "exp1.role": "FullStack Developer",
    "exp1.company": "Cleatus AI",
    "exp1.period": "2025",
    "exp1.description":
      "During my internship at Cleatus AI as a fullstack developer, I contributed to the development of a platform that combines artificial intelligence with automation of public procurement processes: from intelligent tender discovery, through the swift generation of compliant proposals, to strategic support via a GovCon conversational assistant.",

    "exp2.role": "FullStack Developer",
    "exp2.company": "Abaco Informática",
    "exp2.period": "2024 - Present",
    "exp2.description":
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
    "cert1.degree": "AI Engineer",
    "cert1.institution": "Udemy, Online",
    "cert1.period": "2025",
    "cert2.degree": "Data Scientist",
    "cert2.institution": "Udemy, Online",
    "cert2.period": "2025",
    "cert3.degree": "Data Engineer",
    "cert3.institution": "Udemy, Online",
    "cert3.period": "2025",
    "cert4.degree": "English - C1 Certificate",
    "cert4.institution": "EF SET, Online",
    "cert4.period": "2024",
    "cert5.degree": "English - B2 First Certificate Exam",
    "cert5.institution": "Cambridge University, United Kingdom",
    "cert5.period": "2018",
    "cert6.degree": "Java Backend Developer",
    "cert6.institution": "Lamansys, Tandil, Argentina",
    "cert6.period": "2024",
    "cert7.degree": "Angular - Web Developer",
    "cert7.institution": "Udemy, Online",
    "cert7.period": "2024",

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
    "chat.title": "AI Assistant",
    "chat.intro": "Hi! I'm an AI assistant. Ask me about Matías' resume.",
    "chat.placeholder": "Ask a question...",
    "chat.error": "Sorry, an error occurred. Please try again.",

    // Language
    language: "Language",
    "language.spanish": "Spanish",
    "language.english": "English",
  },
}
