module.exports = {
    extends: "lighthouse:default",
    audits: ["alt-att-quality"],
    minWidthSize: 100,
    minHeightSize: 100,
    PROJECT_ID : "seetheunseen",
    LOCATION_ID : "europe-west8",
    API_ENDPOINT : "europe-west8-aiplatform.googleapis.com",
    MODEL_ID : "gemini-2.0-flash-001",
    GENERATE_CONTENT_API : "streamGenerateContent",
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
    },
  };