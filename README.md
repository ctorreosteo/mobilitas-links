# Studio Mobilitas Links

Una pagina di link moderna e professionale per Studio Mobilitas, realizzata con React, TypeScript, Tailwind CSS e Framer Motion.

## 🚀 Caratteristiche

- **Design Moderno**: Interfaccia elegante con gradienti e effetti glassmorphism
- **Animazioni Fluide**: Transizioni e animazioni con Framer Motion
- **Responsive**: Ottimizzato per tutti i dispositivi
- **Accessibilità**: Focus styles e semantica HTML corretta
- **PWA Ready**: Configurato per Progressive Web App
- **SEO Ottimizzato**: Meta tags e Open Graph per social media

## 🛠️ Tecnologie Utilizzate

- **React 19** - Framework JavaScript
- **TypeScript** - Tipizzazione statica
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Libreria per animazioni
- **Lucide React** - Icone moderne
- **PostCSS** - Processore CSS

## 📦 Installazione

1. **Clona il repository**:
   ```bash
   git clone <repository-url>
   cd studiomobilitas-links
   ```

2. **Installa le dipendenze**:
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**:
   ```bash
   npm start
   ```

4. **Apri il browser** e vai su `http://localhost:3000`

## 🏗️ Script Disponibili

- `npm start` - Avvia il server di sviluppo
- `npm run build` - Crea la build di produzione
- `npm test` - Esegue i test
- `npm run eject` - Ejecta la configurazione (irreversibile)

## 📁 Struttura del Progetto

```
studiomobilitas-links/
├── public/
│   ├── index.html          # Template HTML principale
│   ├── manifest.json       # Configurazione PWA
│   └── favicon.ico         # Icona del sito
├── src/
│   ├── App.tsx            # Componente principale
│   ├── App.css            # Stili personalizzati
│   ├── index.tsx          # Entry point
│   └── index.css          # Stili globali
├── tailwind.config.js     # Configurazione Tailwind
├── postcss.config.js      # Configurazione PostCSS
└── package.json           # Dipendenze e script
```

## 🎨 Personalizzazione

### Modificare i Link

I link sono configurati nel file `src/App.tsx` nell'array `links`. Ogni link ha:

```typescript
{
  id: 'unique-id',
  title: 'Titolo del Link',
  url: 'https://example.com',
  icon: <IconComponent />,
  color: 'from-color-500 to-color-600'
}
```

### Modificare i Colori

I colori personalizzati sono definiti in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... altri colori
  }
}
```

### Modificare le Animazioni

Le animazioni sono configurate con Framer Motion in `src/App.tsx`:

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

## 🌐 Deployment

### Build di Produzione

```bash
npm run build
```

### Deploy su Vercel

1. Installa Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy su Netlify

1. Crea un account su Netlify
2. Collega il repository GitHub
3. Configura il build command: `npm run build`
4. Configura il publish directory: `build`

## 📱 PWA Features

- **Installabile**: Gli utenti possono installare l'app sul dispositivo
- **Offline**: Funziona anche senza connessione
- **Push Notifications**: Supporto per notifiche push (da implementare)

## 🔧 Configurazione Avanzata

### Aggiungere Nuove Icone

1. Importa l'icona da Lucide React:
   ```typescript
   import { NewIcon } from 'lucide-react';
   ```

2. Usala nel componente:
   ```typescript
   icon: <NewIcon className="w-5 h-5" />
   ```

### Aggiungere Nuove Animazioni

1. Definisci le varianti:
   ```typescript
   const newVariants = {
     hidden: { scale: 0 },
     visible: { scale: 1 }
   };
   ```

2. Applica al componente:
   ```typescript
   <motion.div variants={newVariants}>
   ```

## 🤝 Contribuire

1. Fork il progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## 📞 Contatti

- **Email**: info@studiomobilitas.com
- **Website**: https://studiomobilitas.com
- **LinkedIn**: https://linkedin.com/company/studiomobilitas

---

Sviluppato con ❤️ da Studio Mobilitas
