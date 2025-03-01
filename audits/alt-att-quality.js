import { Audit } from "lighthouse"; 
import { validateAltText } from "./alt-text-validator.js"; 

class AltAttQualityAudit extends Audit {
  static get meta() {
    return {
      id: "alt-att-quality",
      title: "The Alt attribute for images has meaningful values",
      failureTitle: "Some image have poor quality alt attribute",
      description:
        "Alt attribute on images is important for screen readers and accessibility, but it should have meaningful value",
      requiredArtifacts: ["ImageElements"],
    };
  }

  static async audit(artifacts,context) {
    const imgs = artifacts.ImageElements || []; 
    
    const largeImgs = this.removeNonEvaluableImages(imgs,context);
    this.removeMissingAltTectFromImages(largeImgs);
    const lowQualityAltImgs = await this.evaluateTagAltContent(imgs, context);
    const score = lowQualityAltImgs.length === 0 ? 1 : 0;
    console.log("Score:", score);
    return this.generateLightHouseTable(score, lowQualityAltImgs);
  }

  static removeMissingAltTectFromImages(imgs) {
    imgs.forEach(img => {
      if (img.node && img.node.snippet.startsWith('<img')) {
        const snippet = img.node.snippet;
        const altMatch = snippet.match(/alt="([^"]*)"/); 
        if (altMatch && altMatch[1]) {
          const altText = altMatch[1];
          img.alt = altText;
        } else {
          console.log('Attributo alt non trovato nel snippet');
        }
      }
    });
  }

  static removeNonEvaluableImages(imgs, context) {
    const minWidthSize = context.settings.minWidthSize || 100;
    const minHeightSize = context.settings.minHeightSize || 100;
    const largeImgs = imgs.filter(img => img.displayedWidth > minWidthSize && img.displayedHeight > minHeightSize
    ); 
    return largeImgs;
  }

  static async evaluateTagAltContent(largeImgs, context) {
    const lowQualityAltImgs = [];
    for (const img of largeImgs) {
      console.log("Evaluating image:", img.alt);
      if (img.alt !== undefined && img.alt.trim().length > 0) { 
        try { 
          const validationResult = await validateAltText(img.src, img.alt, context); 
          const scoreFromApi = parseInt(validationResult[0].candidates[0].content.parts[0].text); 
          if (scoreFromApi < context.settings.minScore){
            lowQualityAltImgs.push({ ...img, apiScore: scoreFromApi, alt: img.alt || "(empty)" });
          }
          
        } catch (error) {
          console.error("Error validating image:", img.src, error);
          lowQualityAltImgs.push({ ...img, apiScore: 0, alt: img.alt || "(empty)", error: error.message });
        }
      }
    }
    return lowQualityAltImgs;
  }
  
  static generateLightHouseTable(score, lowQualityAltImgs) {
    return {
      score,
      details: {
        type: "table",
        headings: [
          { key: "thumbnail", itemType: "thumbnail", text: "Preview" },
          { key: "src", itemType: "url", text: "Image URL" },
          { key: "alt", itemType: "text", text: "Alt Attribute" },
          { key: "score", itemType: "numeric", text: "Score" },
          ...(score === 0 ? [{ key: "htmlTag", itemType: "text", text: "HTML Tag" }] : [])
        ],
        items: lowQualityAltImgs.map((img) => ({
          thumbnail: img.src,
          src: img.src,
          alt: img.alt || "(empty)",
          score: img.apiScore,
          ...(score === 0 ? { htmlTag: img.node.snippet } : {})
        })),
      },
    };
  }
}

export default AltAttQualityAudit;