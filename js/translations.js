// Translations object
// Keys are referenced from index.html through data-i18n (text) and data-i18n-html (markup) attributes.
const translations = {
  es: {
    // Meta
    "meta.title": "Matías Rodríguez | AI Solutions Engineer",
    "meta.description":
      "Portfolio de Matías Rodríguez Cárdenas, AI Solutions Engineer y Full Stack AI Engineer especializado en agentes autónomos, integraciones MCP y aplicaciones GenAI.",

    // Navegación
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.skills": "Skills",
    "nav.contact": "Contacto",
    "nav.menu": "Menú",

    // UI
    "ui.prev": "Anterior",
    "ui.next": "Siguiente",
    "ui.hint": "arrastrá, deslizá o usá ← →",
    "ui.scroll": "scroll",

    // Portada
    "cover.owner": "Matías Rodríguez Cárdenas",
    "cover.year": "Portfolio 2026",
    "cover.role1": "AI Solutions Engineer",
    "cover.role2": "Full Stack AI Engineer",
    "cover.note": "bajá — cada capítulo tiene su propia identidad",
    "cover.caption": "Matías R.",
    "cover.place": "Buenos Aires, Argentina · Remoto",

    // Sobre mí
    "about.meta": "Saludos",
    "about.hello": "hola, soy",
    "about.p1":
      "Ingeniero en Sistemas e AI Engineer especializado en agentes autónomos, integraciones empresariales basadas en MCP y aplicaciones GenAI de punta a punta.",
    "about.p2":
      "Hoy lidero la adopción de IA y el desarrollo de agentes en Northbridge University, donde co-administro el despliegue institucional de Claude Enterprise y su capa de conectores MCP.",
    "about.p3":
      "Combino Full Stack (Next.js, FastAPI) con arquitecturas de IA avanzadas (LangGraph, RAG, Tool Calling, MCP) y un enfoque de gobernanza primero: permisos acotados, releases con control de cambios y evaluación de comportamiento.",
    "about.location.label": "Ubicación",
    "about.location": "Buenos Aires, Argentina",
    "about.availability.label": "Disponibilidad",
    "about.availability": "Remoto · Tiempo completo",
    "about.languages.label": "Idiomas",
    "about.languages": "Español nativo · Inglés C1",
    "about.cert.label": "Certificación",
    "about.cv": "Descargar CV",
    "about.cv.es": "Español",
    "about.cv.en": "Inglés",
    "about.tape1": "Ing. en Sistemas",
    "about.tape2": "AI Engineer",
    "about.note": "agentes, MCP y GenAI con gobernanza",

    // Experiencia
    "exp.meta": "Experiencia",
    "exp.kicker": "Capítulo 01",
    "exp.title": "Experi<em>encia</em>",
    "exp.lead":
      "Tres equipos, tres identidades. Recorré cada experiencia de forma horizontal: el portfolio adopta la marca de cada una.",
    "exp.note": "arrastrá →",

    "exp1.kicker": "Experiencia · 01 / 03",
    "exp1.role": "AI Solutions <em>Engineer</em>",
    "exp1.team": "IT Innovation Team",
    "exp1.period": "2026 — Presente",
    "exp1.place": "Remoto",
    "exp1.b1":
      "<strong>Plataforma MCP y agentes.</strong> Co-administro el despliegue institucional de Claude Enterprise. Diseñé la capa de conectores MCP (Microsoft 365 / Graph API, monday.com, SharePoint, Teams) y Skills reutilizables usadas por varios departamentos.",
    "exp1.b2":
      "<strong>Gobernanza y guardrails.</strong> SSO/SAML con Microsoft Entra ID, políticas de permisos de herramientas a nivel organización y patrones de acceso acotado para evitar exposición de datos entre unidades.",
    "exp1.b3":
      "<strong>Evaluación y releases.</strong> Apruebo los releases del AI Tutor Chatbot ante el Change Advisory Board: análisis de impacto, testing de comportamiento previo al deploy y rollouts por oleadas en Canvas.",
    "exp1.b4":
      "<strong>Agentes en producción.</strong> Publiqué cuatro agentes en Copilot Studio / Power Automate con reporte de impacto en productividad; lidero la migración a Claude Agent SDK + Graph API.",
    "exp1.board": "Capa de conectores MCP",

    "exp2.kicker": "Experiencia · 02 / 03",
    "exp2.role": "Full Stack <em>AI Engineer</em>",
    "exp2.team": "GovTech SaaS",
    "exp2.period": "2025",
    "exp2.place": "Remoto",
    "exp2.b1":
      "<strong>Integración GenAI.</strong> Desarrollé el frontend y la integración de IA de una plataforma GovTech que genera respuestas automáticas a RFPs.",
    "exp2.b2":
      "<strong>Orquestación.</strong> Pipelines de generación de contenido con Vercel AI SDK, OpenAI GPT-4 y Zod para validar estrictamente el esquema de salida.",
    "exp2.b3":
      "<strong>Analytics.</strong> Dashboards interactivos para visualizar métricas de la base vectorial y el engagement con la IA en tiempo real.",
    "exp2.b4":
      "<strong>UX/UI.</strong> Un “Block Editor” complejo para colaboración human-in-the-loop sobre documentos generados por IA.",
    "exp2.board": "RFQ Responder",

    "exp3.kicker": "Experiencia · 03 / 03",
    "exp3.role": "Software <em>Engineer</em>",
    "exp3.team": "Oficina Virtual",
    "exp3.period": "2021 — Presente",
    "exp3.place": "Tandil, Argentina",
    "exp3.b1":
      "<strong>Arquitectura.</strong> Desarrollé la plataforma “Oficina Virtual” con Next.js, con flujos de autenticación seguros y estructuras de datos multi-tenant.",
    "exp3.b2":
      "<strong>Procesamiento de datos.</strong> Algoritmos de parsing del lado del cliente para renderizar datasets masivos en grillas interactivas (AG Grid), mejorando un 40% los tiempos de carga.",
    "exp3.b3":
      "<strong>Optimización de bases de datos.</strong> Vistas materializadas en bases relacionales empresariales para reducir la carga de los procesos analíticos.",
    "exp3.board": "Carga de datos",
    "exp3.stat": "tiempo de carga",

    // Paneles de marca
    "board.palette": "Paleta",
    "board.type": "Tipografía",
    "board.stack": "Stack",

    // Proyectos
    "proj.meta": "Proyectos",
    "proj.kicker": "Capítulo 02",
    "proj.title": "Proyec<em>tos</em>",
    "proj.lead":
      "Seis productos, cada uno con su propia identidad. Agentes, RAG, MLOps y DevOps llevados a producción.",
    "proj.note": "cada uno es un mundo →",
    "proj.code": "Código",
    "proj.demo": "Demo",
    "proj.post": "Post",
    "proj.info": "+ Info",

    "proj1.kicker": "Proyecto · 01 / 06",
    "proj1.tag": "Plataforma multi-agente",
    "proj1.title": "Fluent <em>AI</em>",
    "proj1.desc":
      "Plataforma de BI generativa que transforma datos crudos en insights accionables.",
    "proj1.b1":
      "<strong>IA agéntica.</strong> Sistema multi-agente con estado en LangGraph y Gemini, con tool-calling autónomo (SQL dinámico, búsqueda vectorial, gráficos).",
    "proj1.b2":
      "<strong>Seguridad.</strong> Aislamiento total con Row-Level Security de PostgreSQL para evitar fugas entre tenants.",
    "proj1.b3":
      "<strong>Streaming.</strong> Chat en tiempo real con Server-Sent Events desde FastAPI.",

    "proj2.kicker": "Proyecto · 02 / 06",
    "proj2.tag": "SaaS híbrido · predictivo + generativo",
    "proj2.title": "Auto<em>Bid</em> AI",
    "proj2.desc":
      "SaaS B2B que predice la probabilidad de ganar una licitación y automatiza la redacción de la propuesta.",
    "proj2.b1":
      "<strong>Machine Learning.</strong> Random Forest (Scikit-Learn) con valores SHAP para predicciones explicables.",
    "proj2.b2":
      "<strong>RAG.</strong> Búsqueda semántica con Pinecone para generar propuestas contextualizadas.",
    "proj2.b3":
      "<strong>MLOps.</strong> Re-entrenamiento automático del modelo con Apache Airflow.",

    "proj3.kicker": "Proyecto · 03 / 06",
    "proj3.tag": "RAG · Live Resume",
    "proj3.title": "Asistente <em>Virtual</em>",
    "proj3.desc":
      "Chatbot RAG que permite conversar con mi experiencia profesional en tiempo real. Probalo acá mismo.",
    "proj3.b1":
      "<strong>Live Resume.</strong> Un pipeline en GitHub Actions extrae mi bio desde Google Docs y re-indexa la base vectorial automáticamente.",
    "proj3.b2":
      "<strong>Backend.</strong> FastAPI + LangChain, con respuestas de Gemini transmitidas por streaming.",
    "proj3.bubble": "¿En qué empresas trabajó Matías?",

    "proj4.kicker": "Proyecto · 04 / 06",
    "proj4.tag": "MLOps end-to-end",
    "proj4.title": "Predictor de <em>Ausencias</em>",
    "proj4.desc":
      "Proyecto Full Stack que predice horas de ausentismo de empleados y gestiona el ciclo de vida completo del dato: ingesta, análisis, re-entrenamiento automático y despliegue.",
    "proj4.note": "fuera de la oficina... ¿cuántas horas?",

    "proj5.kicker": "Proyecto · 05 / 06",
    "proj5.tag": "Data Science · No supervisado",
    "proj5.title": "K-Means <em>Clustering</em>",
    "proj5.desc":
      "App web que agrupa datos con K-Means: subís un CSV, elegís variables y ves los clusters en gráficos interactivos. Detecta el número óptimo de clusters (método del codo) y Gemini les asigna nombres y descripciones accionables.",

    "proj6.kicker": "Proyecto · 06 / 06",
    "proj6.tag": "DevOps · Cloud-Native",
    "proj6.title": "Crypto <em>Tracker</em>",
    "proj6.desc":
      "Plataforma de monitoreo de criptomonedas basada en microservicios (Python/FastAPI) con orquestación en Kubernetes y Helm, infraestructura como código con Terraform, CI/CD automatizado y observabilidad con Grafana.",

    // Skills y formación
    "skills.meta": "Competencias",
    "skills.kicker": "Capítulo 03",
    "skills.title": "Compe<em>tencias</em>",
    "skills.g1": "AI & LLMs",
    "skills.g2": "LLMOps & Gobernanza",
    "skills.g3": "ML & MLOps",
    "skills.g4": "Data & Backend",
    "skills.g5": "Frontend & Cloud",
    "skills.gov1": "Releases con CAB",
    "skills.gov2": "Skills versionadas",
    "skills.gov3": "Guardrails y permisos",
    "skills.gov4": "Evaluación de comportamiento",
    "skills.gov5": "Testing de regresión",

    "bg.meta": "Formación",
    "bg.title": "Forma<em>ción</em>",
    "bg.education": "Educación",
    "bg.certs": "Certificaciones",
    "edu1.degree": "Ingeniería en Sistemas",
    "edu2.degree": "Analista Programador Universitario",
    "edu.institution": "UNICEN — Universidad Nacional del Centro de la Provincia de Buenos Aires",
    "cert.sdlc": "Generative AI for SDLC (Agents, MCP, Copilot, Cursor)",
    "cert.sdlc.inst": "Developer Boost Seminar · Tandil Tech Cluster",
    "cert.aieng": "Ingeniero de IA",
    "cert.ds": "Científico de Datos",
    "cert.de": "Ingeniero de Datos",
    "cert.c1": "Inglés — C1 Certificate",
    "cert.b2": "Inglés — B2 First Certificate",
    "cert.java": "Desarrollador Java Backend",
    "cert.angular": "Angular — Desarrollador Web",

    // Contacto
    "contact.meta": "Contacto",
    "contact.title": "Gra<em>cias</em>",
    "contact.lead":
      "¿Querés trabajar juntos o tenés alguna pregunta? Escribime, respondo rápido.",
    "contact.note": "construyamos IA útil (y gobernada)",
    "footer.rights": "Todos los derechos reservados.",

    // Chat
    "chat.title": "Asistente de IA",
    "chat.open": "Abrir chat",
    "chat.send": "Enviar mensaje",
    "chat.intro": "¡Hola! Soy un asistente de IA. Preguntame sobre el CV de Matías.",
    "chat.placeholder": "Hacé una pregunta...",
    "chat.error": "Lo siento, ocurrió un error. Intentá de nuevo.",
  },
  en: {
    // Meta
    "meta.title": "Matías Rodríguez | AI Solutions Engineer",
    "meta.description":
      "Portfolio of Matías Rodríguez Cárdenas, AI Solutions Engineer and Full Stack AI Engineer specializing in autonomous agents, MCP integrations and GenAI applications.",

    // Navigation
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "nav.menu": "Menu",

    // UI
    "ui.prev": "Previous",
    "ui.next": "Next",
    "ui.hint": "drag, swipe or use ← →",
    "ui.scroll": "scroll",

    // Cover
    "cover.owner": "Matías Rodríguez Cárdenas",
    "cover.year": "Portfolio 2026",
    "cover.role1": "AI Solutions Engineer",
    "cover.role2": "Full Stack AI Engineer",
    "cover.note": "scroll down — every chapter has its own identity",
    "cover.caption": "Matías R.",
    "cover.place": "Buenos Aires, Argentina · Remote",

    // About
    "about.meta": "Greetings",
    "about.hello": "hi, I'm",
    "about.p1":
      "Systems Engineer and AI Engineer specializing in autonomous agents, MCP-based enterprise integrations and end-to-end GenAI applications.",
    "about.p2":
      "Currently leading AI adoption and agent development at Northbridge University, where I co-own the institutional Claude Enterprise deployment and its MCP connector layer.",
    "about.p3":
      "I combine strong Full Stack skills (Next.js, FastAPI) with advanced AI architectures (LangGraph, RAG, Tool Calling, MCP) and a governance-first approach: permission scoping, change-controlled releases and behavioral evaluation.",
    "about.location.label": "Location",
    "about.location": "Buenos Aires, Argentina",
    "about.availability.label": "Availability",
    "about.availability": "Remote · Full time",
    "about.languages.label": "Languages",
    "about.languages": "Spanish (native) · English C1",
    "about.cert.label": "Certified",
    "about.cv": "Download CV",
    "about.cv.es": "Spanish",
    "about.cv.en": "English",
    "about.tape1": "Systems Engineer",
    "about.tape2": "AI Engineer",
    "about.note": "agents, MCP & governed GenAI",

    // Experience
    "exp.meta": "Experience",
    "exp.kicker": "Chapter 01",
    "exp.title": "Experi<em>ence</em>",
    "exp.lead":
      "Three teams, three identities. Move sideways through each one — the whole portfolio takes on its brand as you go.",
    "exp.note": "drag →",

    "exp1.kicker": "Experience · 01 / 03",
    "exp1.role": "AI Solutions <em>Engineer</em>",
    "exp1.team": "IT Innovation Team",
    "exp1.period": "2026 — Present",
    "exp1.place": "Remote",
    "exp1.b1":
      "<strong>MCP & agent platform.</strong> Co-own the institutional Claude Enterprise deployment. Architected the MCP connector layer (Microsoft 365 / Graph API, monday.com, SharePoint, Teams) and reusable Skills consumed across departments.",
    "exp1.b2":
      "<strong>Governance & guardrails.</strong> SSO/SAML with Microsoft Entra ID, org-level tool-permission policies and scoped-access patterns that prevent cross-unit data exposure.",
    "exp1.b3":
      "<strong>Evaluation & release lifecycle.</strong> Own release approval for the AI Tutor Chatbot through the Change Advisory Board: impact assessment, pre-deployment behavioral testing and waved rollouts across Canvas.",
    "exp1.b4":
      "<strong>Production agents.</strong> Shipped four agents in Copilot Studio / Power Automate with a productivity-impact report; leading the migration to Claude Agent SDK + Graph API.",
    "exp1.board": "MCP connector layer",

    "exp2.kicker": "Experience · 02 / 03",
    "exp2.role": "Full Stack <em>AI Engineer</em>",
    "exp2.team": "GovTech SaaS",
    "exp2.period": "2025",
    "exp2.place": "Remote",
    "exp2.b1":
      "<strong>GenAI integration.</strong> Built the frontend and AI integration for a GovTech SaaS platform that generates automated RFP responses.",
    "exp2.b2":
      "<strong>Orchestration.</strong> Content generation pipelines with Vercel AI SDK, OpenAI GPT-4 and Zod for strict output schema validation.",
    "exp2.b3":
      "<strong>Analytics.</strong> Interactive dashboards visualizing vector database metrics and AI engagement in real time.",
    "exp2.b4":
      "<strong>UX/UI.</strong> A complex “Block Editor” enabling human-in-the-loop collaboration on AI-generated documents.",
    "exp2.board": "RFQ Responder",

    "exp3.kicker": "Experience · 03 / 03",
    "exp3.role": "Software <em>Engineer</em>",
    "exp3.team": "Oficina Virtual",
    "exp3.period": "2021 — Present",
    "exp3.place": "Tandil, Argentina",
    "exp3.b1":
      "<strong>Architecture.</strong> Built the “Oficina Virtual” platform with Next.js, implementing secure authentication flows and multi-tenant data structures.",
    "exp3.b2":
      "<strong>Data processing.</strong> Client-side parsing algorithms that render massive datasets into interactive grids (AG Grid), improving load times by 40%.",
    "exp3.b3":
      "<strong>Database optimization.</strong> Materialized Views on enterprise relational databases, reducing the load on downstream analytical processes.",
    "exp3.board": "Data load",
    "exp3.stat": "load time",

    // Brand boards
    "board.palette": "Palette",
    "board.type": "Typeface",
    "board.stack": "Stack",

    // Projects
    "proj.meta": "Projects",
    "proj.kicker": "Chapter 02",
    "proj.title": "Proj<em>ects</em>",
    "proj.lead":
      "Six products, each with its own identity. Agents, RAG, MLOps and DevOps taken all the way to production.",
    "proj.note": "each one is its own world →",
    "proj.code": "Code",
    "proj.demo": "Demo",
    "proj.post": "Post",
    "proj.info": "+ Info",

    "proj1.kicker": "Project · 01 / 06",
    "proj1.tag": "Multi-agent platform",
    "proj1.title": "Fluent <em>AI</em>",
    "proj1.desc":
      "A generative BI platform that turns raw data into actionable insights.",
    "proj1.b1":
      "<strong>Agentic AI.</strong> Stateful multi-agent system with LangGraph and Gemini, with autonomous tool calling (dynamic SQL, vector search, charts).",
    "proj1.b2":
      "<strong>Security.</strong> Absolute data isolation through PostgreSQL Row-Level Security to prevent cross-tenant leaks.",
    "proj1.b3":
      "<strong>Streaming.</strong> Real-time chat pipeline over Server-Sent Events in FastAPI.",

    "proj2.kicker": "Project · 02 / 06",
    "proj2.tag": "Hybrid SaaS · predictive + generative",
    "proj2.title": "Auto<em>Bid</em> AI",
    "proj2.desc":
      "A B2B SaaS that predicts bid success probability and automates proposal writing.",
    "proj2.b1":
      "<strong>Machine Learning.</strong> Random Forest (Scikit-Learn) with SHAP values for explainable predictions.",
    "proj2.b2":
      "<strong>RAG.</strong> Semantic search with Pinecone to generate highly contextual proposals.",
    "proj2.b3":
      "<strong>MLOps.</strong> Automated model retraining pipelines with Apache Airflow.",

    "proj3.kicker": "Project · 03 / 06",
    "proj3.tag": "RAG · Live Resume",
    "proj3.title": "Virtual <em>Assistant</em>",
    "proj3.desc":
      "A RAG chatbot that lets you talk to my professional experience in real time. Try it right here.",
    "proj3.b1":
      "<strong>Live Resume.</strong> A GitHub Actions pipeline pulls my bio from Google Docs and re-indexes the vector store automatically.",
    "proj3.b2":
      "<strong>Backend.</strong> FastAPI + LangChain, streaming answers from Gemini.",
    "proj3.bubble": "Which companies has Matías worked at?",

    "proj4.kicker": "Project · 04 / 06",
    "proj4.tag": "End-to-end MLOps",
    "proj4.title": "Absence <em>Predictor</em>",
    "proj4.desc":
      "A Full Stack project that predicts employee absenteeism hours and manages the full data lifecycle: ingestion, analysis, automatic retraining and deployment.",
    "proj4.note": "out of office... for how many hours?",

    "proj5.kicker": "Project · 05 / 06",
    "proj5.tag": "Data Science · Unsupervised",
    "proj5.title": "K-Means <em>Clustering</em>",
    "proj5.desc":
      "A web app that clusters data with K-Means: upload a CSV, pick variables and explore clusters on interactive charts. It finds the optimal number of clusters (elbow method) and Gemini gives each segment an actionable name and description.",

    "proj6.kicker": "Project · 06 / 06",
    "proj6.tag": "DevOps · Cloud-Native",
    "proj6.title": "Crypto <em>Tracker</em>",
    "proj6.desc":
      "A microservices-based crypto monitoring platform (Python/FastAPI) orchestrated with Kubernetes and Helm, Infrastructure as Code with Terraform, automated CI/CD and real-time observability with Grafana.",

    // Skills & background
    "skills.meta": "Competences",
    "skills.kicker": "Chapter 03",
    "skills.title": "Compe<em>tences</em>",
    "skills.g1": "AI & LLMs",
    "skills.g2": "LLMOps & Governance",
    "skills.g3": "ML & MLOps",
    "skills.g4": "Data & Backend",
    "skills.g5": "Frontend & Cloud",
    "skills.gov1": "CAB-gated releases",
    "skills.gov2": "Versioned Skills",
    "skills.gov3": "Guardrails & permission scoping",
    "skills.gov4": "Behavioral evaluation",
    "skills.gov5": "Regression testing",

    "bg.meta": "Background",
    "bg.title": "Back<em>ground</em>",
    "bg.education": "Education",
    "bg.certs": "Certifications",
    "edu1.degree": "Systems Engineering",
    "edu2.degree": "University Programming Analyst",
    "edu.institution": "UNICEN — National University of the Center of the Province of Buenos Aires",
    "cert.sdlc": "Generative AI for SDLC (Agents, MCP, Copilot, Cursor)",
    "cert.sdlc.inst": "Developer Boost Seminar · Tandil Tech Cluster",
    "cert.aieng": "AI Engineer",
    "cert.ds": "Data Scientist",
    "cert.de": "Data Engineer",
    "cert.c1": "English — C1 Certificate",
    "cert.b2": "English — B2 First Certificate",
    "cert.java": "Java Backend Developer",
    "cert.angular": "Angular — Web Developer",

    // Contact
    "contact.meta": "Contact",
    "contact.title": "Thank <em>you</em>",
    "contact.lead":
      "Interested in working together or have a question? Drop me a line — I reply fast.",
    "contact.note": "let's build useful (and governed) AI",
    "footer.rights": "All rights reserved.",

    // Chat
    "chat.title": "AI Assistant",
    "chat.open": "Open chat",
    "chat.send": "Send message",
    "chat.intro": "Hi! I'm an AI assistant. Ask me about Matías' resume.",
    "chat.placeholder": "Ask a question...",
    "chat.error": "Sorry, an error occurred. Please try again.",
  },
};
