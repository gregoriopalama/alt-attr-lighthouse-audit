module.exports = {
    extends: "lighthouse:default",
    audits: ["./audits/alt-att-quality.js"], // Esempio di audit personalizzato
    minWidthSize: 150,
    minHeightSize: 150,
    projectId: "seetheunseen",
    LOCATION_ID: "europe-west8",
    API_ENDPOINT: "europe-west8-aiplatform.googleapis.com",
    MODEL_ID: "gemini-2.0-flash-001",
    GENERATE_CONTENT_API: "streamGenerateContent", 
    categories: {
      accessibility: {
        title: "Accessibility",
        description: "Images have a meaningful alt attribute.",
        auditRefs: [
          {
            id: "alt-att-quality",
            weight: 1,
            group: "a11y-names-labels"
          },
        ],
      },
    }
  }; 