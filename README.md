# JSON Viewer

- [English](#English)
- [Italiano](#Italiano)

## English
This project is an interactive JSON viewer developed with Vue.js and Vite. It allows users to input a JSON URL and interactively display the data structure, select keys, and view the corresponding variables in JavaScript code.

- [Installation](#installation)
- [Usage](#usage)
- [Key Features](#key-features)

## Installation

1. Clone the repository:

```
git clone https://github.com/matteocicigoi/json-viewer.git
```

2. Navigate to the project directory:

```
cd json-viewer-vue-vite
```

3. Install dependencies:

```
npm install
```

## Usage

To start the development server, run:

```
npm run dev
```

## Key Features

- **JSON URL Input:** Users can input a JSON URL in the form input field.
- **Interactive Display:** The application interactively displays the JSON data structure and allows users to select keys.
- **Automatic Code Generation:** For each selected key, the corresponding JavaScript variable for accessing the data is automatically generated.
- **Structure Management:** Users can toggle the "Structure" option to show or hide elements.
  
## Code Structure

- The `Form` component handles the JSON URL search.
- The `Output` component interactively displays the JSON data structure and generates the corresponding JavaScript code.

## Technologies Used

- Vue.js
- Vite
- Scss
<br><br><br><br>

## Italiano
Questo progetto è un visualizzatore JSON interattivo sviluppato con Vue.js e Vite. Consente agli utenti di inserire un URL JSON e visualizzare in modo interattivo la struttura dei dati, selezionare le chiavi e visualizzare le variabili corrispondenti nel codice JavaScript.

- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Funzionalità Principali](#funzionalità-principali)

## Installazione

1. Clona il repository:

```
git clone https://github.com/matteocicigoi/json-viewer.git
```

2. Naviga nella directory del progetto:

```
cd json-viewer-vue-vite
```

3. Installa le dipendenze:

```
npm install
```

## Utilizzo

Per avviare il server di sviluppo, esegui:

```
npm run dev
```

## Funzionalità Principali

- **Inserimento del URL JSON:** Gli utenti possono inserire un URL JSON nel campo di input del form.
- **Visualizzazione Interattiva:** L'applicazione visualizza interattivamente la struttura dei dati JSON e consente agli utenti di selezionare le chiavi.
- **Generazione Automatica del Codice:** Per ogni chiave selezionata, viene generato automaticamente la variabile JavaScript corrispondente per l'accesso ai dati.
- **Gestione della Struttura:** Gli utenti possono attivare o disattivare l'opzione "Structure" per visualizzare o nascondere gli elementi doppi.

## Struttura del Codice

- Il componente `Form` gestisce la ricerca del URL JSON.
- Il componente `Output` visualizza interattivamente la struttura dei dati JSON e genera il codice JavaScript corrispondente.

## Tecnologie Utilizzate

- Vue.js
- Vite
- Scss

