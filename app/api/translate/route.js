import axios from 'axios';

export async function POST(req) {
    const { text, targetLang } = await req.json();

    try {
        const response = await axios.post("https://translation.googleapis.com/language/translate/v2", null, {
            params: {
                q: text,                  // Text to translate
                target: targetLang,       // Target language code
                key: process.env.GOOGLE_API_KEY, // API Key
            }
        });

        // Return the translated data
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error("Error translating text:", error);

        // Return error message with a status of 500
        return new Response(JSON.stringify({ error: 'Translation failed' }), { status: 500 });
    }
}
