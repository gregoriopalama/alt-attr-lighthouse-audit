module.exports = {
    extends: "lighthouse:default",
    audits: ["alt-att-quality"],
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