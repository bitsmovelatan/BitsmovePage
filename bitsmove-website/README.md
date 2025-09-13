# Bitsmove Website

A comprehensive website and landing page for Bitsmove, showcasing Web3 services, products, and infrastructure with multi-language support and Auth0 authentication.

## Features

- 🌐 **Multi-language Support** - English and Spanish translations
- 🔐 **Auth0 Authentication** - Secure user authentication
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Modern UI/UX** - Beautiful and intuitive interface
- 🚀 **Vercel Deployment** - Optimized for Vercel platform
- 🎨 **Custom Components** - Tailored for Web3 services

## Sections

- **Hero** - Main landing section with call-to-action
- **Services** - Web3 and blockchain services showcase
- **Products** - Bitsmove product portfolio
- **Infrastructure** - Enterprise-grade infrastructure details
- **About** - Company mission, vision, and values
- **Contact** - Contact form and company information

## Tech Stack

- **React 18** with TypeScript
- **Auth0** for authentication
- **CSS3** with modern features
- **Vercel** for deployment

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bitsmove-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` with your Auth0 credentials.

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel --prod
```

### Environment Variables for Vercel

Configure these environment variables in your Vercel dashboard:

- `REACT_APP_AUTH0_DOMAIN`
- `REACT_APP_AUTH0_CLIENT_ID` 
- `REACT_APP_AUTH0_AUDIENCE`

## Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.tsx   # Navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── Services.tsx    # Services showcase
│   ├── Products.tsx    # Products section
│   ├── Infrastructure.tsx # Infrastructure details
│   ├── About.tsx       # About section
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer component
├── contexts/           # React contexts
│   ├── Auth0Provider.tsx # Auth0 integration
│   └── LanguageContext.tsx # Multi-language support
├── translations/       # Translation files
│   ├── en.json        # English translations
│   └── es.json        # Spanish translations
└── config/            # Configuration files
    └── auth0.ts       # Auth0 configuration
```

## Customization

### Adding New Languages

1. Create a new translation file in `src/translations/` (e.g., `fr.json`)
2. Add the language to the `languages` array in `Navigation.tsx`
3. Update the `LanguageContext.tsx` if needed

### Modifying Content

- Update translation files in `src/translations/` for text content
- Modify component CSS files for styling
- Update `src/components/` for layout changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email contact@bitsmove.com or create an issue in the repository.