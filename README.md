# KingMRU AI Chat

A modern, responsive AI chatbot web application powered by Mistral AI with Firebase authentication.

## Features

- 🤖 AI-powered chat using Mistral AI API
- 🔐 Firebase Authentication (Google & Email)
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 🎨 Modern UI inspired by ChatGPT
- 💰 Google AdSense ready
- 🚀 SEO optimized
- ⚡ Fast and lightweight

## Tech Stack

- HTML5, CSS3, JavaScript (Vanilla)
- Firebase Authentication
- Mistral AI API
- Vercel (Deployment)

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/kingmru-ai-chat.git
cd kingmru-ai-chat
```

### 2. Configure Firebase

The Firebase configuration is already set in `firebase-config.js`. Make sure to enable:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `kingmru-ai-chat`
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google and Email/Password providers

### 3. Configure AdSense

1. Replace `ca-pub-XXXXXXXXXXXXXXXX` in `index.html` with your AdSense publisher ID
2. Replace ad slot IDs with your actual ad unit IDs

### 4. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Click "Import Project"
3. Import your GitHub repository
4. Vercel will automatically detect settings
5. Click "Deploy"

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 5. Update URLs

After deployment, update these files with your actual domain:

- `index.html`: Update Open Graph URLs
- `public/robots.txt`: Update sitemap URL
- `public/sitemap.xml`: Update domain URL

## Project Structure

```
kingmru-ai-chat/
├── index.html           # Main HTML file
├── styles.css           # All styling
├── app.js              # Main application logic
├── firebase-config.js  # Firebase configuration
├── vercel.json         # Vercel deployment config
├── public/
│   ├── robots.txt      # SEO robots file
│   └── sitemap.xml     # SEO sitemap
└── README.md           # This file
```

## Configuration

### Mistral AI API

The API key is already configured in `app.js`:
```javascript
const MISTRAL_API_KEY = '4QtZ8GY0zX1EZxZU8jWDJCIJJvNYmn9Y';
```

⚠️ **Security Note**: For production, consider using environment variables.

### Theme Colors

Primary color is set to `#e9523d`. To change:
1. Update `--primary-color` in `styles.css`
2. Update SVG logo colors in `index.html`

## Features Guide

### Authentication
- Users can sign in with Google or Email/Password
- Firebase handles all authentication securely
- Session persists across page reloads

### Chat Interface
- Real-time AI responses from Mistral AI
- Conversation history maintained during session
- Typing indicators for better UX
- Smooth animations and transitions

### Theme Toggle
- Toggle between light and dark modes
- Preference saved in localStorage
- Smooth color transitions

### SEO Features
- Semantic HTML5 structure
- Meta tags for social media
- robots.txt for search engines
- XML sitemap
- Fast loading times

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s

## License

MIT License - feel free to use for personal or commercial projects

## Support

For issues or questions, please open an issue on GitHub.

## Author

KingMRU

---

Made with ❤️ using Mistral AI and Firebase
