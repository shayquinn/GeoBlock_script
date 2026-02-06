# GeoBlock Search Results

**Version 4.6** - A powerful, secure Greasemonkey/Tampermonkey userscript that filters search results by country of origin using multiple detection methods including TLD parsing, geolocation APIs, DNS nameserver analysis, and WHOIS lookups.

## ✨ Key Features

- 🌍 **55 Countries Supported** - Comprehensive coverage with flag emojis
- 🔍 **Multi-Level TLD Detection** - Supports complex domains (e.g., .com.au, .co.uk, .gov.cn)
- 🚀 **4-Tier Fallback System** - TLD → Geolocation API → DNS Nameserver → WHOIS
- 💾 **Smart Caching** - 24h for geolocation, 7 days for WHOIS lookups
- ⚡ **Rate Limiting** - Queue-based API requests to avoid throttling
- 🎯 **60+ Known Domains** - Instant detection for popular sites (GitHub, StackOverflow, BBC, etc.)
- 🌐 **Multi-Engine Support** - Works on Google, DuckDuckGo, Bing, Yahoo, Brave, and more
- 🔒 **Security Hardened** - HTTPS APIs, request timeouts, input validation, sanitization
- 🐛 **Advanced Debugging** - Console analysis functions for troubleshooting failed lookups
- 🔔 **Privacy Notice** - First-run consent dialog with API disclosure

## 🔧 Detection Methods

The script uses a sophisticated 4-tier fallback system with security hardening:

1. **TLD Parsing** (Local, Instant)
   - Multi-level TLD support (.com.ar, .co.uk, .gov.cn, etc.)
   - 60+ hardcoded popular domains for instant recognition
   - Zero network requests for known domains

2. **Geolocation API** (ipapi.co - HTTPS)
   - 1,000 requests/day limit (free tier)
   - 5-second timeout protection
   - 24-hour cache for performance
   - Queue-based rate limiting with 1.5s delay
   - Response validation and sanitization

3. **DNS Nameserver Lookup** (Cloudflare DNS-over-HTTPS)
   - Analyzes nameserver patterns (chinanet→China, yandex→Russia, etc.)
   - Fast and reliable for major hosting providers
   - 5-second timeout protection
   - Secure HTTPS connection

4. **WHOIS Lookup** (whoisjsonapi.com - HTTPS)
   - Fallback for domains without clear TLD/DNS indicators
   - 7-day cache to minimize API usage
   - 500 requests/day limit
   - Input validation to prevent injection attacks
   - 5-second timeout protection

### 🔒 Security Features (v4.0+)

- ✅ **HTTPS Only** - All API calls use encrypted connections
- ✅ **Request Timeouts** - 5-second timeout on all external requests to prevent hanging
- ✅ **Input Validation** - Regex validation on all domain names and user input
- ✅ **Output Sanitization** - LocalStorage keys sanitized to prevent injection
- ✅ **Response Validation** - Type checking, length limits, HTML detection
- ✅ **Privacy Notice** - First-run consent dialog explaining data usage
- ✅ **CORS Protection** - Filters out search engine redirect URLs to prevent errors

## 🌐 Supported Search Engines

| Search Engine | Status |
|---------------|--------|
| **Google** | ✅ Fully Supported |
| **DuckDuckGo** | ✅ Fully Supported |
| **Bing** | ✅ Fully Supported |
| **Yahoo** | ✅ Fully Supported |
| **Brave Search** | ✅ Fully Supported |
| **Ecosia** | ✅ Fully Supported |
| **Startpage** | ✅ Fully Supported |
| **Yandex** | ✅ Fully Supported |
| **Qwant** | ✅ Fully Supported |

## Installation

### Step 1: Install a Userscript Manager

First, you need a userscript manager extension:

**For Firefox:**
- [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
- [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

**For Chrome/Edge/Brave:**
- [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/)

**For Safari:**
- [Tampermonkey](https://apps.apple.com/app/tampermonkey/id1482490089)

### Step 2: Install the GeoBlock Script

**Option A: Direct File Installation (Recommended)**
1. Download the `geoblock-search-results.user.js` file to your computer
2. **Double-click the file** to open it in your browser
3. Your userscript manager (Greasemonkey/Tampermonkey) will detect it and show an installation dialog
4. Click **"Install"** or **"Confirm installation"**

**Option B: Create New Script & Copy-Paste**
1. Click the **Greasemonkey/Tampermonkey icon** in your browser toolbar
2. Select **"Create a new script..."** or **"New user script"**
3. A new editor tab will open with default template code
4. **Delete all the existing code** in the editor
5. **Copy the entire GeoBlock script code** (from the .user.js file or this repository)
6. **Paste it** into the empty editor
7. Click **File → Save** or press **Ctrl+S** (Windows/Linux) / **Cmd+S** (Mac)

**Option C: Drag and Drop**
1. Open your browser to any webpage
2. **Drag the `geoblock-search-results.user.js` file** directly into your browser window
3. The installation dialog should appear automatically
4. Click **"Install"**

## 🐛 Debugging & Analysis (v4.4+)

GeoBlock includes powerful console analysis functions to help troubleshoot lookup failures and optimize performance.

### Console Commands

Open the browser console (F12) after performing a search and run:

```javascript
// View all failed lookups in a formatted table
geoBlockFailedLookups()

// Get detailed analysis with error breakdown
geoBlockAnalyzeFailed()

// Export failed domains as CSV (auto-copies to clipboard)
geoBlockExportFailed()

// Get list of domains needing manual mapping
geoBlockGetUnmappedDomains()

// Test geolocation lookup for a specific domain
await geoBlockTestDomain('example.com')

// View cache statistics (fresh vs stale entries)
geoBlockCacheStats()

// Clear the failed lookups log
geoBlockClearFailed()
```

### Example Output

After running `geoBlockAnalyzeFailed()`:

```
📈 Failed Lookup Analysis
Total failed domains: 8

🔸 Domains: weathergeeks.org, vedantu.com, wikiwand.com,
  cambridge.org, biolecta.com, sunlight.net, britannica.com

🔸 Error Types: {
  "TimeoutError": 3,
  "AbortError": 2,
  "NetworkError": 3
}

🔸 HTTP Status Codes: {
  "429": 2,  // Rate limited
  "503": 1   // Service unavailable
}
```

### Troubleshooting with Console Functions

1. **Rate Limiting Issues** - Use `geoBlockAnalyzeFailed()` to see if status code 429 appears frequently
2. **Network Problems** - Check error types for timeout/network issues
3. **Add Manual Mappings** - Use `geoBlockGetUnmappedDomains()` to get copy-paste code for your knownDomains
4. **Cache Performance** - Use `geoBlockCacheStats()` to see hit rates and identify stale entries
5. **Export for Analysis** - Use `geoBlockExportFailed()` to get CSV data for spreadsheet analysis

## Usage

### First Run - Privacy Notice

On your first search after installation, you'll see a privacy notice dialog:

> **GeoBlock Privacy Notice:**
> 
> This extension sends domain names from search results to external geolocation APIs (ipapi.co, cloudflare-dns.com, whoisjsonapi.com) to determine their country of origin. No personal data is sent.
> 
> Do you want to continue using GeoBlock?

- Click **OK** to accept and activate the script
- Click **Cancel** to decline (the script will not run)
- This dialog only appears once; your choice is saved in localStorage

### Basic Usage

1. **Visit any supported search engine** (Google, DuckDuckGo, Bing, etc.)
2. **Perform a search** as you normally would
3. **Look for the "🌍 GeoBlock" button** near the top of search results
4. **Flags will appear** next to each result showing the country of origin

### Toggle Country Blocking

There are **two ways** to block/unblock countries:

1. **Click any flag next to a search result** - Instantly toggles blocking for that country
2. **Click the "🌍 GeoBlock" button** - Opens configuration modal with all countries

### Configuration Modal Features

- Click **country flags** in the modal to toggle blocking
- Click **entire country rows** to toggle blocking
- See **real-time status** (✓ Blocked / ○ Allowed)
- **Manage custom domains** via the "Manage Custom Domains" button
- Search for countries using the search box

### Blocked Results Behavior

When a result is blocked:
- ✅ **Content is hidden** - Only shows flag and "🚫 Blocked" indicator
- ✅ **Minimal space** - Collapses to compact size
- ✅ **Flag remains clickable** - Click to unblock the country instantly
- ✅ **Visual feedback** - Shows notification when toggling
- ✅ **Persistent** - Settings saved automatically in localStorage

## 🧪 Testing & Verification

### Verify Script is Running

1. **Open browser console (F12)** before searching
2. Visit any supported search engine
3. Perform a search
4. Look for console message: `✅ GeoBlock Search Results v4.6 loaded`

### Check Detection Status

The console will show detection progress:
- ✅ `"✅ Country found: [Country] for [domain]"` - Successful detection
- ✅ `"Found X results with selector: ..."` - Results detected correctly
- ⚠️ `"❌ Failed to get country for [domain] (attempt X/3)"` - Lookup failed (will retry)
- ❌ `"No URL found for result"` - Selector issues (report as bug)

### Test Specific Domains

Use the console test function to verify geolocation:

```javascript
// Test a single domain
await geoBlockTestDomain('github.com')
// Output: 🔍 Testing: github.com
//         Result: United States

// Test multiple domains
await geoBlockTestDomain('bbc.co.uk')
await geoBlockTestDomain('yandex.ru')
await geoBlockTestDomain('taobao.com')
```

### Common Issues

**Console functions not defined (ReferenceError):**

If you get `ReferenceError: geoBlockFailedLookups is not defined`, the issue is that the console functions are being defined inside the userscript's IIFE (Immediately Invoked Function Expression) with isolated scope. The script currently uses `@grant none` to run in the page context, which should make functions accessible.

**Alternative solution if functions still aren't accessible:**

The script can be modified to use `unsafeWindow` instead:

1. Change the `@grant` directive at the top:
```javascript
// @grant        unsafeWindow
```
(Instead of `// @grant        none`)

2. Replace all `window.` assignments for console functions with `unsafeWindow.`:
```javascript
// Make config function accessible
unsafeWindow.geoBlockConfig = showConfig;

// View all failed lookups
unsafeWindow.geoBlockFailedLookups = function() { ... };

// Export failed domains as CSV
unsafeWindow.geoBlockExportFailed = function() { ... };

// And so on for all console functions...
```

This explicitly grants the script access to the page's window object, making the functions callable from the browser console.

**No flags appearing:**
1. Check console for `✅ GeoBlock Search Results v4.6 loaded`
2. Verify privacy notice was accepted (check localStorage: `geoblock_privacy_notice`)
3. Check for JavaScript errors in console
4. Try `geoBlockFailedLookups()` to see which domains failed

**CORS Errors:**
- Should be fixed in v4.6 (filters out search engine redirect URLs)
- If you still see them, report with the domain name

**Rate Limiting (429 errors):**
- ipapi.co has 1000 requests/day limit
- Use `geoBlockAnalyzeFailed()` to check status codes
- Consider adding frequently-accessed domains to `knownDomains` array

## Contributing to Other Search Engine Support

Want to help add support for additional search engines? You'll need to update three functions:

### 1. Update `getResultSelectors()`

Add CSS selectors for the new search engine's result containers:

```javascript
} else if (hostname.includes('newengine.com')) {
    return [
        '.result-selector-1',      // Primary result container
        '.result-selector-2',      // Alternative selector
        '[data-result]'            // Fallback attribute selector
    ];
}
```

### 2. Update `getDisplayURL()`

Add selectors to extract the display URL (visible URL text, not redirect):

```javascript
const selectors = [
    'cite',                        // Common for Google
    '.result__url',                // Common pattern
    '.your-engine-url-class',      // Add engine-specific class
    // ...
];
```

### 3. Update `addFlagIndicator()`

Specify where to insert the flag in the result layout:

```javascript
} else if (hostname.includes('newengine.com')) {
    // Find the title element
    const title = result.querySelector('.result-title');
    if (title && title.parentNode) {
        title.parentNode.insertBefore(flagElement, title);
    }
}
```

### Testing Your Changes

1. Enable verbose console logging in browser DevTools
2. Search for queries with known country domains (.co.uk, .de, .ru, etc.)
3. Verify flags appear in correct positions
4. Test blocking functionality
5. Check for console errors
6. Submit a pull request with your changes!

## 📋 Version History

### v4.6 (January 2026)
- **Fixed:** DuckDuckGo CORS errors by filtering search engine redirect URLs
- **Improved:** Enhanced domain extraction to skip tracking/redirect domains
- **Security:** Additional domain validation to prevent redirect lookups

### v4.5 (January 2026)
- **Added:** 7 comprehensive console analysis functions
- **Added:** `geoBlockFailedLookups()` - View failed lookups in formatted table
- **Added:** `geoBlockExportFailed()` - Export failures as CSV with clipboard copy
- **Added:** `geoBlockAnalyzeFailed()` - Error breakdown and statistics
- **Added:** `geoBlockGetUnmappedDomains()` - Generate manual mapping code
- **Added:** `geoBlockCacheStats()` - View cache performance metrics
- **Added:** `geoBlockTestDomain()` - Test individual domain lookups
- **Added:** Detailed usage documentation in script comments
- **Fixed:** Console function accessibility issues with proper window scope

### v4.4 (January 2026)
- **Added:** Failed lookup tracking with FAILED_LOOKUPS array (max 50 entries)
- **Added:** Detailed attempt logging in fetchDomainCountry()
- **Added:** Console emoji indicators (✅/❌) for lookup status
- **Added:** window.geoBlockDebug object for basic debugging
- **Improved:** Error tracking with timestamps and attempt counts

### v4.3 (January 2026)
- **Changed:** Migrated from ip-api.com to ipapi.co (1000 req/day)
- **Fixed:** API now accepts domain names directly (no IP conversion needed)
- **Improved:** Simplified geolocation API calls
- **Updated:** Response parsing for ipapi.co JSON format

### v4.0-4.2 (January 2026)
- **Security:** Migrated all APIs to HTTPS
- **Security:** Added 5-second timeout protection on all fetch requests
- **Security:** Input validation with regex patterns
- **Security:** Output sanitization for localStorage keys
- **Security:** Response validation (type checking, length limits, HTML detection)
- **Added:** Privacy notice dialog on first run
- **Added:** User consent tracking in localStorage
- **Added:** @connect directives for CORS compatibility

### v3.x (Earlier)
- Multi-engine support (Google, Bing, Yahoo, Brave, Ecosia, etc.)
- 4-tier fallback detection system
- Smart caching (24h geolocation, 7d WHOIS)
- Rate limiting with queue system
- 55 countries with multi-level TLD support
- 60+ known domains for instant detection
- Interactive configuration modal
- Custom domain blocking

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Areas that need help:

- Additional search engine support
- More known domain mappings
- UI/UX improvements
- Bug reports and fixes
- Documentation improvements

## ⚠️ Disclaimer

This script uses third-party APIs with rate limits:
- **ipapi.co**: 1,000 requests/day (free tier)
- **whoisjsonapi.com**: 500 requests/day (with API key)
- **Cloudflare DNS**: Public service, reasonable use expected

Excessive use may result in temporary rate limiting. The script includes caching and rate limiting to minimize API usage.

---

**Made with ❤️ for privacy-conscious searchers**
