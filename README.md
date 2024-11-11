Videogames Archive è un archivio di videogiochi creato come progetto capstone durante il corso di Web Development. Questo è il primo progetto complesso e completo sviluppato con React, Redux, React-router-dom e Bootstrap, sfruttando json-server e json-server-auth per simulare un backend. Utilizza anche l'API di terze parti di RAWG per accedere a un vasto database di videogiochi. Grazie a json-server, l'applicazione permette la registrazione di utenti "fasulli" e offre una serie completa di operazioni CRUD (Create, Read, Update, Delete) sui commenti.

Funzionalità principali:
- Registrazione utente (tramite json-server e json-server-auth).
- Esplorazione dei videogiochi: gli utenti possono esplorare e visualizzare i dettagli di migliaia di titoli grazie ai dati forniti dalla API di RAWG.
- Gestione dei commenti: gli utenti possono pubblicare, modificare, visualizzare e cancellare commenti sui giochi, eseguendo operazioni CRUD complete.

Per avviare l'applicazione:

- Inserire il comando `npx json-server db.json --port 8000` per avviare il "server" backend
- Inserire il comando `npm start` per avviare il client frontend
