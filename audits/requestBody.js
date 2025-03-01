const getRequestBody = (base64Image, altText) => ({
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image, // Assicurati che sia una stringa valida
            },
          },
          {
            text: altText, // Deve essere una stringa non vuota
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [
        {
          text: `Sto analizzando una pagina web. Per ogni immagine all'interno della pagina web, ho previsto un valore da usare per l'attributo "alt" del tag "img", per permettere ad uno screen reader di dare informazioni sull'immagine e descriverla in maniera corretta, in ottica accessibilità.
          
          Per ogni immagine che riceverai:
          * ti fornirò anche la sua descrizione che ho inserito nel tag "alt"
          * fornisci una valutazione in base alla bontà della mia descrizione
          * se la mia descrizione è totalmente insufficiente o fuorviante, rispondimi con 0
          * se è accettabile, ma ha bisogno di essere migliorata, rispondi 1
          * se è buona, ma può essere ancora migliorata, rispondi 2
          * se la ritieni buona e molto vicina alla descrizione che daresti tu, rispondi 3
          * la tua risposta deve contenere solo il numero relativo alla valutazione`,
        },
      ],
    },
    generationConfig: {
      responseModalities: ["TEXT"],
      temperature: 1,
      maxOutputTokens: 8192,
      topP: 0.95,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "OFF" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "OFF" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "OFF" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "OFF" },
    ],
  });
  
  export { getRequestBody };
  