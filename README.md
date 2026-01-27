# GeoBlock Search Results

A powerful Greasemonkey/Tampermonkey userscript that filters search results by country of origin using multiple detection methods including TLD parsing, geolocation APIs, DNS nameserver analysis, and WHOIS lookups.

## ✨ Key Features

- 🌍 **55 Countries Supported** - Comprehensive coverage with flag emojis
- 🔍 **Multi-Level TLD Detection** - Supports complex domains (e.g., .com.au, .co.uk, .gov.cn)
- 🚀 **4-Tier Fallback System** - TLD → Geolocation API → DNS Nameserver → WHOIS
- 💾 **Smart Caching** - 24h for geolocation, 7 days for WHOIS lookups
- ⚡ **Rate Limiting** - Queue-based API requests to avoid throttling
- 🎯 **60+ Known Domains** - Instant detection for popular sites (GitHub, StackOverflow, BBC, etc.)
- 🌐 **Multi-Engine Support** - Works on Google, DuckDuckGo, Bing, Yahoo, Brave, and more

## 🔧 Detection Methods

The script uses a sophisticated 4-tier fallback system:

1. **TLD Parsing** (Local, Instant)
   - Multi-level TLD support (.com.ar, .co.uk, .gov.cn, etc.)
   - 60+ hardcoded popular domains for instant recognition

2. **Geolocation API** (ip-api.com)
   - 45 requests/minute limit
   - 24-hour cache for performance
   - Queue-based rate limiting

3. **DNS Nameserver Lookup** (Cloudflare DNS-over-HTTPS)
   - Analyzes nameserver patterns (chinanet→China, yandex→Russia, etc.)
   - Fast and reliable for major hosting providers

4. **WHOIS Lookup** (whoisjsonapi.com)
   - Fallback for domains without clear TLD/DNS indicators
   - 7-day cache to minimize API usage
   - 500 requests/day limit

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

## 🎨 User Interface Features

- 🏴‍☠️ **Clickable Flag Interface** - Click any flag next to search results to toggle blocking
- ⚙️ **Interactive Configuration** - Modern modal dialog with all countries and status indicators
- 💾 **Persistent Settings** - Preferences saved in browser localStorage
- 🎯 **Real-Time Filtering** - Automatically hides results from blocked countries as they load
- 🎨 **Clean UI** - Compact blocked results with minimal space usage
- ⚡ **Dynamic Updates** - Works with dynamically loaded search results (infinite scroll)
- 🚫 **Visual Feedback** - Blocked results collapse to show only flag + "Blocked" indicator
- 🔧 **Custom Domain Blocking** - Add any domain to your personal blocklist

## 🗺️ Supported Countries (55)

The script includes 55 countries with comprehensive multi-level TLD support:

<details>
<summary><b>View Full Country List (Click to expand)</b></summary>

| Country | Primary TLD | Additional TLDs | Flag |
|---------|-------------|-----------------|------|
| Argentina | .ar | .com.ar, .org.ar, .net.ar, .gov.ar, .edu.ar, .mil.ar | 🇦🇷 |
| Australia | .au | .com.au, .org.au, .net.au, .edu.au, .gov.au, .asn.au, .id.au | 🇦🇺 |
| Austria | .at | .co.at, .or.at, .ac.at, .gv.at | 🇦🇹 |
| Bangladesh | .bd | .com.bd, .org.bd, .net.bd, .gov.bd, .edu.bd, .ac.bd | 🇧🇩 |
| Belgium | .be | .com.be, .org.be, .net.be, .ac.be, .gov.be | 🇧🇪 |
| Brazil | .br | .com.br, .org.br, .net.br, .gov.br, .edu.br, .mil.br | 🇧🇷 |
| Canada | .ca | .com.ca, .org.ca, .net.ca, .gc.ca | 🇨🇦 |
| China | .cn | .com.cn, .org.cn, .net.cn, .gov.cn, .edu.cn, .ac.cn | 🇨🇳 |
| Czech Republic | .cz | .co.cz | 🇨🇿 |
| Denmark | .dk | .co.dk | 🇩🇰 |
| Egypt | .eg | .com.eg, .org.eg, .net.eg, .gov.eg, .edu.eg | 🇪🇬 |
| Finland | .fi | .com.fi, .org.fi, .net.fi, .gov.fi, .edu.fi | 🇫🇮 |
| France | .fr | .com.fr, .org.fr, .net.fr, .gouv.fr, .asso.fr | 🇫🇷 |
| Germany | .de | .com.de, .org.de, .net.de | 🇩🇪 |
| Greece | .gr | .com.gr, .org.gr, .net.gr, .gov.gr, .edu.gr | 🇬🇷 |
| Hong Kong | .hk | .com.hk, .org.hk, .net.hk, .gov.hk, .edu.hk | 🇭🇰 |
| Hungary | .hu | .co.hu, .org.hu, .gov.hu, .edu.hu | 🇭🇺 |
| India | .in | .co.in, .org.in, .net.in, .gov.in, .edu.in, .ac.in, .nic.in | 🇮🇳 |
| Indonesia | .id | .co.id, .or.id, .net.id, .go.id, .ac.id, .web.id | 🇮🇩 |
| Iran | .ir | .com.ir, .org.ir, .net.ir, .gov.ir, .ac.ir, .co.ir | 🇮🇷 |
| Ireland | .ie | .com.ie, .org.ie, .net.ie, .gov.ie | 🇮🇪 |
| Israel | .il | .co.il, .org.il, .net.il, .gov.il, .ac.il | 🇮🇱 |
| Italy | .it | .com.it, .org.it, .net.it, .gov.it, .edu.it | 🇮🇹 |
| Japan | .jp | .co.jp, .or.jp, .ne.jp, .go.jp, .ac.jp, .ed.jp, .lg.jp | 🇯🇵 |
| Kenya | .ke | .co.ke, .or.ke, .ne.ke, .go.ke, .ac.ke | 🇰🇪 |
| Malaysia | .my | .com.my, .org.my, .net.my, .gov.my, .edu.my | 🇲🇾 |
| Mexico | .mx | .com.mx, .org.mx, .net.mx, .gob.mx, .edu.mx | 🇲🇽 |
| Netherlands | .nl | .com.nl, .org.nl, .net.nl, .co.nl | 🇳🇱 |
| New Zealand | .nz | .co.nz, .org.nz, .net.nz, .govt.nz, .ac.nz | 🇳🇿 |
| Nigeria | .ng | .com.ng, .org.ng, .net.ng, .gov.ng, .edu.ng | 🇳🇬 |
| North Korea | .kp | .com.kp, .org.kp, .net.kp, .gov.kp, .edu.kp | 🇰🇵 |
| Norway | .no | .co.no, .org.no, .net.no, .gov.no | 🇳🇴 |
| Pakistan | .pk | .com.pk, .org.pk, .net.pk, .gov.pk, .edu.pk | 🇵🇰 |
| Philippines | .ph | .com.ph, .org.ph, .net.ph, .gov.ph, .edu.ph | 🇵🇭 |
| Poland | .pl | .com.pl, .org.pl, .net.pl, .gov.pl, .edu.pl, .co.pl | 🇵🇱 |
| Portugal | .pt | .com.pt, .org.pt, .net.pt, .gov.pt, .edu.pt | 🇵🇹 |
| Romania | .ro | .com.ro, .org.ro, .net.ro, .gov.ro, .edu.ro | 🇷🇴 |
| Russia | .ru | .com.ru, .org.ru, .net.ru, .gov.ru, .edu.ru, .mil.ru | 🇷🇺 |
| Saudi Arabia | .sa | .com.sa, .org.sa, .net.sa, .gov.sa, .edu.sa | 🇸🇦 |
| Singapore | .sg | .com.sg, .org.sg, .net.sg, .gov.sg, .edu.sg | 🇸🇬 |
| South Africa | .za | .co.za, .org.za, .net.za, .gov.za, .ac.za | 🇿🇦 |
| South Korea | .kr | .co.kr, .or.kr, .ne.kr, .go.kr, .ac.kr, .re.kr, .pe.kr | 🇰🇷 |
| Spain | .es | .com.es, .org.es, .net.es, .gob.es, .edu.es | 🇪🇸 |
| Sweden | .se | .com.se, .org.se, .net.se | 🇸🇪 |
| Switzerland | .ch | .com.ch, .org.ch, .net.ch, .gov.ch | 🇨🇭 |
| Taiwan | .tw | .com.tw, .org.tw, .net.tw, .gov.tw, .edu.tw | 🇹🇼 |
| Thailand | .th | .co.th, .or.th, .net.th, .go.th, .ac.th | 🇹🇭 |
| Turkey | .tr | .com.tr, .org.tr, .net.tr, .gov.tr, .edu.tr, .biz.tr | 🇹🇷 |
| Ukraine | .ua | .com.ua, .org.ua, .net.ua, .gov.ua, .edu.ua | 🇺🇦 |
| United Arab Emirates | .ae | .co.ae, .org.ae, .net.ae, .gov.ae, .ac.ae | 🇦🇪 |
| United Kingdom | .uk | .co.uk, .ac.uk, .gov.uk, .org.uk, .net.uk, .sch.uk, .nhs.uk, .police.uk | 🇬🇧 |
| United States | .us | .com.us, .org.us, .net.us, .edu, .gov, .mil | 🇺🇸 |
| Vietnam | .vn | .com.vn, .org.vn, .net.vn, .gov.vn, .edu.vn, .ac.vn | 🇻🇳 |

</details>

### 🌟 60+ Known Domains (Instant Detection)

Popular domains are recognized instantly without API calls:
- **Tech**: GitHub, StackOverflow, npm, PyPI, RubyGems, Crates.io
- **Learning**: W3Schools, freeCodeCamp, Codecademy, Coursera, Khan Academy, Udemy
- **News**: BBC, The Guardian
- **Social**: YouTube, Facebook, Twitter, Reddit, LinkedIn, Instagram
- **Chinese**: Baidu, QQ, Taobao, Tmall
- **Russian**: Yandex, Mail.ru, VK
- **Korean**: Naver, Daum
- **Japanese**: Rakuten, Yahoo Japan
- And many more...

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

## Usage on DuckDuckGo

### Basic Usage
1. **Go to [duckduckgo.com](https://duckduckgo.com)**
2. **Perform a search** as you normally would
3. **Look for the "🌍 GeoBlock" button** near the top of the page
4. **Flags will appear** next to each search result showing the country of origin

### Toggle Country Blocking
There are **two ways** to block/unblock countries:

1. **Click any flag next to a search result** - Instantly toggles blocking for that country
2. **Click the "🌍 GeoBlock" button** - Opens configuration modal with all countries

### Configuration Modal Features
- Click **country flags** in the modal to toggle blocking
- Click **entire country rows** to toggle blocking
- See **real-time status** (✓ Blocked / ○ Allowed)
- **Manage custom domains** via the "Manage Custom Domains" button

### Blocked Results Behavior
When a result is blocked on DuckDuckGo:
- ✅ **Content is hidden** - Only shows flag and "🚫 Blocked" indicator
- ✅ **Minimal space** - Collapses to compact size
- ✅ **Flag remains clickable** - Click to unblock the country
- ✅ **Visual feedback** - Shows notification when toggling

## Testing on Other Search Engines

If you want to test the script on other search engines:

1. **Open browser console (F12)** before testing
2. Visit the search engine (e.g., Google, Bing)
3. Perform a search
4. Check console for messages:
   - ✅ `"GeoBlock initializing..."` - Script loaded
   - ✅ `"Found X results with selector: ..."` - Results detected
   - ✅ `"Country found: ..."` - Country detection working
   - ❌ `"No URL found for result"` - Selector issues
   - ❌ `"No country found for domain: ..."` - Detection issues

## Contributing to Other Search Engine Support

Want to help add support for other search engines? You'll need to:

1. **Update the `getResultSelectors()` function** with correct CSS selectors
2. **Update the `getDisplayURL()` function** to extract URLs from that engine's HTML
3. **Update the `addFlagIndicator()` function** for proper flag placement
4. **Test thoroughly** with various search queries

Example for a new search engine:
```javascript
if (hostname.includes('newengine.com')) {
    return [
        '.result-selector-1',
        '.result-selector-2',
        '[data-result]'
    ];
}