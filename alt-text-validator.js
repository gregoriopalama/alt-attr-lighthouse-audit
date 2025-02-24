// alt-text-validator.js
import fetch from 'node-fetch'; // Importa node-fetch (assicurati di installarlo: npm install node-fetch)
import { GoogleAuth } from 'google-auth-library'; // Importa GoogleAuth


async function validateAltText(imageUrl, altText,context) {
  const PROJECT_ID = context.settings.PROJECT_ID;
  const LOCATION_ID = context.settings.LOCATION_ID;
  const API_ENDPOINT = context.settings.API_ENDPOINT;
  const MODEL_ID = context.settings.MODEL_ID;
  const GENERATE_CONTENT_API = context.settings.GENERATE_CONTENT_API;

  try {
    const base64Image = await getBase64FromImageUrl(imageUrl);
    const accessToken = await getAccessToken(); //TODO must be a singleton

    const requestBody = { }; //TODO fill the request body

    const response = await fetch(
      `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:${GENERATE_CONTENT_API}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

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

async function getBase64FromImageUrl(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return base64;
  } catch (error) {
    console.error("Error in getBase64FromImageUrl:", error);
    throw error;
  }
}

async function getAccessToken() {
  
}

export { validateAltText }; 