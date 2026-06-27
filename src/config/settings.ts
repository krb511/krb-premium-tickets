export const config = {
    branding: {
        name: "KRB Premium Support",
        logo: "https://i.imgur.com/your-premium-logo.png",
        colors: {
            primary: 0x000000,    // High-Contrast Black
            secondary: 0x2B2D31,  // Dark Gray
            success: 0x2ECC71,    // Emerald Green
            danger: 0xE74C3C,     // Crimson Red
            warning: 0xF1C40F,    // Sunflower Yellow
            info: 0x3498DB        // Peter River Blue
        }
    },
    system: {
        cacheDuration: 1000 * 60 * 10, // 10 Minutes Cache
        rateLimitWindow: 1000 * 60,    // 1 Minute Window
        maxRequestsPerWindow: 3        // Anti-Spam (Max 3 actions per minute)
    }
};
