import fetch from 'node-fetch'; // Assicurati di avere node-fetch installato
import { GoogleAuth } from 'google-auth-library';
import { getRequestBody } from "./requestBody.js"; 

async function validateAltText(imageUrl, altText) {
  const API_ENDPOINT = "europe-west8-aiplatform.googleapis.com";
  const PROJECT_ID = "seetheunseen";
  const LOCATION_ID = "europe-west8";
  const MODEL_ID = "gemini-2.0-flash-001";
  const GENERATE_CONTENT_API = "streamGenerateContent";

  try { 
      const base64Image = await getBase64FromImageUrl(imageUrl); 
      const accessToken = await getAccessToken();
      const requestBody = getRequestBody(base64Image, altText); 
      console.log("altText:", altText); 
      const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:${GENERATE_CONTENT_API}`;

      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`, 
          },
          body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API call failed: ${response.status} - ${errorText}`);
      } 
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error in validateAltText:", error);
      throw error;
  }
}
 

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFilename: "./audits/seetheunseen-c104c17ce1c1.json", // Assicurati che il percorso sia corretto
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken(); 

  if (!tokenResponse || !tokenResponse.token) {
    throw new Error("Failed to obtain access token");
  }
 
  return tokenResponse.token; 
}



async function getBase64FromImageUrl(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString("base64").replace(/\r?\n|\r/g, ""); // Rimuove newline
  } catch (error) {
    console.error("Error in getBase64FromImageUrl:", error);
    throw error;
  }
}

export { validateAltText };
 
