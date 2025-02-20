import { Audit } from "lighthouse";

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

  static audit(artifacts) {
    const imgs = artifacts.ImageElements;
    //TODO: implement audit logic here
    console.log(imgs);
    const score = 0;//imgs ? 1 : 0;

    return {
      score,
    };
  }
}

export default AltAttQualityAudit;