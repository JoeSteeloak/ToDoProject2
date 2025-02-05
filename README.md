# ToDo App

En enkel ToDo-applikation där användare kan skapa, läsa, uppdatera och ta bort uppgifter. Statusen för varje uppgift kan ändras mellan tre olika tillstånd: "Ej påbörjad", "Pågående", och "Avklarad". Applikationen är byggd med React och använder ett RESTful API för att hantera uppgifter.

## Funktioner

- **Visa uppgifter**: Lista alla ToDos med information om titel, beskrivning och status.
- **Skapa uppgift**: Lägg till nya uppgifter med titel, beskrivning och initial status.
- **Uppdatera status**: Byt status för varje uppgift mellan "Ej påbörjad", "Pågående", och "Avklarad".
- **Ta bort uppgift**: Ta bort en uppgift från listan.

## Teknologier

- **React**: För att bygga användargränssnittet.
- **CSS**: För att styla appen och göra den responsiv.
- **Fetch API**: För att kommunicera med backend-API:t.

## Installation

1. Klona repositoryt:
    ```git clone https://github.com/JoeSteeloak/ToDoProject2.git```

2. Navigera till mappen:
    ```cd to-do-app```

3. Installera beroenden:
    ```npm install```

4. Starta applikationen:
    ```npm start```

Öppna din webbläsare och gå till `http://localhost:3000` för att använda appen.

## Användning

1. **Skapa en uppgift**: Fyll i titel och beskrivning, och tryck på "Lägg till i lista".
2. **Ändra status**: Klicka på statusknappen för att växla mellan "Ej påbörjad", "Pågående", och "Avklarad". Färgen på knappen ändras beroende på status.
3. **Ta bort en uppgift**: Klicka på "Ta bort" för att radera en uppgift från listan.

## CSS-styling

- Responsiv design för att anpassa sig till både desktop och mobila enheter.
- Färgkodning av statusknappar:
  - **Röd**: "Ej påbörjad"
  - **Gul**: "Pågående"
  - **Grön**: "Avklarad"
- Tydlig grå färg på "Ta bort"-knappen.

