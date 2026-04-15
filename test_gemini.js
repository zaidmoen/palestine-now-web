const API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

async function listModels() {
  try {
    if (!API_KEY) {
      throw new Error("Missing GEMINI_API_KEY or VITE_GEMINI_API_KEY environment variable.");
    }

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {
    console.error("Error fetching models:", e);
  }
}

listModels();
