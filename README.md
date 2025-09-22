# Project Structure
src/
├── app/api/         → 🎯 CONTROLLERS + ROUTES
├── Services/        → 🎯 APPLICATION LAYER (Use Cases)
├── Models/          → 🎯 DOMAIN LAYER (Entities)
├── Lib/            → 🎯 INFRASTRUCTURE (Repositories)
└── Types/          → 🎯 DOMAIN (Interfaces)



**Parser.ts**
RSSParser class : This file contains the main parser class to get RSS feed from a given URL. 

**rss-parser library**
It transforms the XML data into an easily manageable JavaScript object.

```typescript
import Parser from 'rss-parser';
```

Declare the RSSParser class with a constructor to initialize the parser with custom options :

```typescript
  private parser: Parser;

    constructor() {
        this.parser = new Parser({
      timeout: 10000,
      headers: {
        'User-Agent': 'daily-games/1.0.0',
      },
    });
    }
```

Then into a try/catch block, fetch the RSS feed from the provided URL using the parseURL method of the rss-parser library. 

```typescript
      const feed = await this.parser.parseURL(url);
```


