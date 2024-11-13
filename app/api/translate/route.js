import translate from 'translate-google';

export async function POST(req) {
    const { text, targetLang } = await req.json();

    try {
        const translatedText = await translate(text, { to: targetLang });
        
        // Return the translated data
        return new Response(JSON.stringify({ translatedText }), { status: 200 });
    } catch (error) {
        console.error("Error translating text:", error);

        // Return error message with a status of 500
        return new Response(JSON.stringify({ error: 'Translation failed' }), { status: 500 });
    }
}

