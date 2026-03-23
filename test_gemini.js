const API_KEY = "AIzaSyCczXoIVmQffDYgZG7DwEPeLIA6RwZ10ig";

async function listModels() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {
    console.error("Error fetching models:", e);
  }
}

listModels();
