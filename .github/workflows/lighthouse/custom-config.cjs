module.exports = {
  extends: "lighthouse:default",
  audits: ["./audits/alt-att-quality.js"], // Assicurati che il percorso sia corretto

  settings: {
    minWidthSize: 150,
    minHeightSize: 150,
    minScore: 5,
    PROJECT_ID: "seetheunseen",
    LOCATION_ID: "europe-west8",
    API_ENDPOINT: "europe-west8-aiplatform.googleapis.com",
    MODEL_ID: "gemini-2.0-flash-001",
    GENERATE_CONTENT_API: "streamGenerateContent",
  },

  categories: {
    accessibility: {
      title: "Accessibility",
      description: "Images have a meaningful alt attribute.",
      auditRefs: [
        {
          id: "alt-att-quality", // Deve essere uguale all'ID dell'audit
          weight: 1,
          group: "a11y-names-labels"
        }
      ],
    },
  },

  passes: [
    {
      passName: "defaultPass",
      gatherers: [], // Se hai gatherer personalizzati, aggiungili qui
    },
  ],
};
