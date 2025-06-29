# Academic Website for Qian Li (李倩)

A modern, responsive academic website built with Jekyll that follows the **content-presentation separation** principle. This website is designed for researchers and academics who want a professional online presence with easy content management.

## 🎯 Features

- **Content-Presentation Separation**: All content is stored in YAML/Markdown files, completely separate from HTML templates
- **Modern Design**: Professional and visually appealing layout inspired by top academic websites
- **Responsive**: Perfect experience on desktop, tablet, and mobile devices
- **Dark Mode**: Built-in dark/light theme toggle
- **Fast Loading**: Optimized for performance with lazy loading and minification
- **SEO Optimized**: Built-in SEO tags and sitemap generation
- **GitHub Pages Compatible**: Deploy directly to GitHub Pages

## 📁 Project Structure

```
├── _data/                      # Content data files (YAML)
│   ├── author.yml             # Personal information
│   ├── openings.yml           # Recruitment information
│   ├── research.yml           # Research projects
│   └── awards.yml             # Awards and honors
├── _layouts/                   # HTML templates
│   └── default.html           # Main layout template
├── _posts/                     # News posts (Markdown)
│   ├── 2025-01-15-ijcai-papers-accepted.md
│   └── 2024-12-20-acm-mm-presentation.md
├── assets/                     # Static assets
│   ├── css/main.css           # Main stylesheet
│   ├── js/main.js             # JavaScript functionality
│   ├── images/                # Images and photos
│   └── publications.bib       # BibTeX file for publications
├── _config.yml                 # Jekyll configuration
├── index.html                  # Homepage template
├── Gemfile                     # Ruby dependencies
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- Ruby 2.7 or higher
- Bundler gem

### Installation

1. **Clone this repository:**
   ```bash
   git clone <your-repo-url>
   cd personal_page
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Run the development server:**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Open your browser** and visit `http://localhost:4000`

## ✏️ Content Management

The beauty of this website is that you **never need to edit HTML code** to update content. All information is managed through simple YAML and Markdown files.

### Updating Personal Information

Edit `_data/author.yml`:

```yaml
# Basic information
name: "Your Name"
name_chinese: "你的中文名"
title: "Your Title"
affiliation: "Your Institution"
email: "your.email@university.edu"

# Research interests
research_interests:
  - "Your Research Area 1"
  - "Your Research Area 2"

# Biography
bio: |
  Your detailed biography here...
```

### Managing Recruitment Status

Edit `_data/openings.yml`:

```yaml
# Turn recruiting on/off
recruiting: true  # Set to false to hide the recruitment section

# Available positions
positions:
  - type: "Ph.D. Students"
    available: 2
    description: "Your requirements..."
```

### Adding Research Projects

Edit `_data/research.yml`:

```yaml
projects:
  - title: "Your Project Title"
    icon: "🔬"  # Emoji or icon
    description: "Project description..."
    featured: true  # Show on homepage
    technologies: ["Tech1", "Tech2"]
```

### Adding News

Create a new Markdown file in `_posts/`:

```markdown
---
layout: post
title: "Your News Title"
date: 2025-01-15
categories: [news, publications]
featured: true
---

Your news content here...
```

### Managing Publications

**Option 1: BibTeX (Recommended)**
Add your publications to `assets/publications.bib` and they will be automatically formatted.

**Option 2: Manual Entry**
Edit the publications section in `index.html` (for custom formatting).

### Adding Awards

Edit `_data/awards.yml`:

```yaml
awards:
  - title: "Award Name"
    organization: "Awarding Organization"
    year: 2024
    featured: true  # Show prominently
```

## 🎨 Customization

### Colors and Styling

Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --primary-color: #2563eb;    /* Your brand color */
  --secondary-color: #f59e0b;  /* Accent color */
  /* ... more variables */
}
```

### Adding New Sections

1. Create data file in `_data/` (if needed)
2. Add HTML section to `index.html`
3. Add corresponding CSS in `assets/css/main.css`

### Dark Mode

The website automatically supports dark mode. Users can toggle it with the moon/sun icon in the navigation.

## 📱 Responsive Design

The website is fully responsive and includes:

- **Mobile-first design**
- **Touch-friendly navigation**
- **Optimized typography** for all screen sizes
- **Fast loading** on mobile connections

## 🔧 Advanced Features

### BibTeX Integration

Install the `jekyll-scholar` plugin for automatic BibTeX processing:

```bash
bundle add jekyll-scholar
```

Then configure in `_config.yml`:

```yaml
scholar:
  source: assets
  bibliography: publications.bib
  style: apa
```

### Performance Optimization

The website includes:
- **Lazy loading** for images
- **CSS/JS minification**
- **Font optimization**
- **Caching headers**

### SEO Features

- **Automatic sitemap** generation
- **Meta tags** for social sharing
- **Structured data** for search engines
- **Fast loading** (Google ranking factor)

## 🚢 Deployment

### GitHub Pages (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages** in repository settings
3. **Your site** will be live at `https://yourusername.github.io`

### Other Hosting

The website generates static files that can be hosted anywhere:

```bash
bundle exec jekyll build
# Upload _site/ folder to your hosting provider
```

## 🔄 Regular Maintenance

### Adding New Publications

1. **Update BibTeX** file: `assets/publications.bib`
2. **Add news post** about the publication
3. **Update research stats** in `_data/research.yml`

### Updating Contact Information

1. **Edit** `_data/author.yml`
2. **Update** `_config.yml` if needed
3. **Test locally** before deploying

### Managing Students (Recruitment)

1. **Update** `_data/openings.yml`
2. **Set** `recruiting: false` when not accepting students
3. **Add testimonials** from current students (optional)

## 🆘 Troubleshooting

### Common Issues

**Site not building?**
- Check Jekyll version compatibility
- Verify YAML syntax in data files
- Run `bundle update` to update gems

**Images not showing?**
- Ensure images are in `assets/images/`
- Check file paths in YAML files
- Verify image file extensions

**Styling broken?**
- Clear browser cache
- Check CSS syntax
- Verify CSS variable names

### Getting Help

1. **Check the logs** when building locally
2. **Validate YAML** files using online validators
3. **Test changes** locally before deploying

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to:
- **Report bugs** via GitHub issues
- **Suggest improvements**
- **Submit pull requests**

---

**Built with ❤️ for the academic community**

For questions or support, please open an issue on GitHub. 