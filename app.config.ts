// app.config.ts
import 'dotenv/config';

export default {
    expo: {
        name: 'Aesthetica',
        slug: 'aesthetica',
        userInterfaceStyle: 'automatic',
        // ...any existing config
        extra: {
            SUPABASE_URL: process.env.SUPABASE_URL,
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
            "eas": {
                "projectId": "6d0b66fa-4c9b-4dfa-ba92-691daf8fb5dc"
            }
        },

    },
};