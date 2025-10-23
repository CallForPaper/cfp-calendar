const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
const year = new Date().getFullYear();
// Config: Customize these for your SEO needs
const metaTags = [
  { name: 'description', content: 'Discover upcoming calls for papers with our interactive Call for Papers Calendar & Mindmap. Explore deadlines, conferences, and journal submission opportunities across all disciplines' },
  { name: 'keywords', content: `call for papers, CFP calendar, research conferences ${year}, academic journals, paper submission deadlines, CFP mindmap, conference schedule, research publication, academic events, scholarly conferences`},
  { name: 'author', content: 'Your Name or Site' },
  { name: 'robots', content: 'index, follow' },
  {name: 'title', content: `Call for Papers Calendar & Mindmap ${year} | Research Conferences & Journals` },
  // Open Graph for social sharing
  { property: 'og:title', content: `Call for Papers Calendar & Mindmap ${year} | Research Conferences & Journals` },
  { property: 'og:description', content: 'Discover upcoming calls for papers with our interactive Call for Papers Calendar & Mindmap. Explore deadlines, conferences, and journal submission opportunities across all disciplines' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: 'https://calendar.callforpaper.org' }, 
  { property: 'og:image', content: 'https://cdn.callforpaper.org/callforpaper.webp' }, 
  // Twitter Card
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: `Call for Papers Calendar & Mindmap ${year} | Research Conferences & Journals` },
  { name: 'twitter:description', content: 'Discover upcoming calls for papers with our interactive Call for Papers Calendar & Mindmap. Explore deadlines, conferences, and journal submission opportunities across all disciplines' },
  { name: 'twitter:image', content: 'https://cdn.callforpaper.org/callforpaper.webp' }
];

const inputFile = './web/index.html';
const outputFile = './web/index.html';

try {
  if (!fs.existsSync(inputFile)) {
    throw new Error(`Input file not found: ${inputFile}. Run 'markmap' first.`);
  }

  const html = fs.readFileSync(inputFile, 'utf8');
  const $ = cheerio.load(html);

  metaTags.forEach(tag => {
    if (tag.property) {
      $('head').append(`<meta property="${tag.property}" content="${tag.content}">`);
    } else {
      $('head').append(`<meta name="${tag.name}" content="${tag.content}">`);
    }
  });

  $('title').text(`Call for Papers Calendar & Mindmap ${year} | Research Conferences & Journals`);

  fs.writeFileSync(outputFile, $.html(), 'utf8');
  console.log('✅ SEO meta tags added to web/index.html');
} catch (err) {
  console.error('❌ Error processing HTML:', err.message);
  process.exit(1);
}