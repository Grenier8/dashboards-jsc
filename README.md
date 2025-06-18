# Dashboards JSC Project

This project uses Tailwind CSS for styling via CDN.

## Tailwind CSS Setup

The project is configured to use Tailwind CSS via CDN. This is the simplest approach and requires no build process.

**Pros:**
- No build step required
- No Node.js installation needed
- Works immediately
- Good for development and prototyping
- Perfect for static HTML projects

**Cons:**
- Larger file size
- Requires internet connection
- Not optimized for production

## Usage

### Current Setup
Tailwind CSS is already included in all HTML files via CDN:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Using Tailwind Classes
You can start using Tailwind classes immediately in your HTML:

```html
<!-- Example: Replace custom CSS classes with Tailwind utilities -->
<div class="bg-white shadow-lg rounded-xl p-6">
  <h1 class="text-2xl font-bold text-gray-800">Title</h1>
  <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
    Apply
  </button>
</div>
```

### Migration from Custom CSS
You can gradually replace your custom CSS classes with Tailwind utilities:

**Current CSS Classes → Tailwind Equivalents:**
- `.font-inter` → `font-inter` (keep as custom class)
- `.card` → `bg-white shadow-lg rounded-xl`
- `.apply-button button` → `bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600`
- `.container` → `p-4`
- `.card-group` → `flex gap-5 justify-between mb-5`

### Common Tailwind Classes for Your Project

**Layout:**
- `flex` - display: flex
- `grid` - display: grid
- `gap-5` - gap: 1.25rem
- `p-4` - padding: 1rem
- `m-4` - margin: 1rem

**Colors:**
- `bg-white` - background: white
- `text-gray-800` - color: rgb(31 41 55)
- `bg-blue-500` - background: rgb(59 130 246)

**Typography:**
- `text-2xl` - font-size: 1.5rem
- `font-bold` - font-weight: 700
- `text-center` - text-align: center

**Shadows & Borders:**
- `shadow-lg` - box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1)
- `rounded-xl` - border-radius: 0.75rem
- `border` - border: 1px solid

## Custom CSS Integration
Your existing `css/styles.css` file remains unchanged and will work alongside Tailwind CSS. You can:
1. Keep using your custom classes
2. Gradually replace them with Tailwind utilities
3. Use both approaches together

## Browser Support
Tailwind CSS via CDN works in all modern browsers and requires no additional setup. 