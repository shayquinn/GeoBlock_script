# GeoBlock Search Results

> ⚠️ **Current Status**: This script is **currently optimized for DuckDuckGo** and may not work correctly with Google or other search engines due to differences in HTML structure.

A Greasemonkey/Tampermonkey userscript that allows you to block search results from specific countries based on their domain TLDs (top-level domains).

## ⚠️ Current Compatibility Status

| Search Engine | Status | Notes |
|---------------|--------|-------|
| **DuckDuckGo** | ✅ **Fully Working** | Primary development target |
| **Google** | ⚠️ **Limited/Partial** | May not show flags or block correctly |
| **Bing** | ❓ **Untested** | May require selector updates |
| **Yahoo** | ❓ **Untested** | May require selector updates |
| **Brave Search** | ❓ **Untested** | May require selector updates |
| **Other engines** | ❓ **Untested** | Will likely need updates |

**Note**: The script is actively developed with DuckDuckGo as the primary target. Other search engines may work but require specific selector updates for their HTML structure.

## Features

- 🌍 **DuckDuckGo Optimized** - Fully tested and working on DuckDuckGo search
- 🏴‍☠️ **Clickable Flag Interface** - Click any flag next to search results to toggle blocking for that country
- ⚙️ **Interactive Configuration** - Modern modal dialog with clickable country flags and status indicators
- 💾 **Persistent Settings** - Your preferences are saved in browser localStorage
- 🎯 **Real-Time Filtering** - Automatically hides results from blocked countries as they load
- 🎨 **Clean UI** - Compact blocked results with minimal space usage
- ⚡ **Dynamic Updates** - Works with dynamically loaded search results (infinite scroll)
- 🚫 **Visual Feedback** - Blocked results collapse to show only flag + "Blocked" indicator

## Currently Supported Search Engines

### ✅ **Primary Support**
- **DuckDuckGo** - Full functionality, tested and working

### ⚠️ **Limited/Partial Support**
- **Google** - Basic detection may work, but flag placement and blocking may be unreliable
- **Bing, Yahoo, Brave, Ecosia, Startpage, Yandex, Qwant** - Code exists but requires testing and selector updates

## How to Test on Other Search Engines

If you want to try the script on other search engines:

1. Install the script as directed below
2. Visit the search engine and perform a search
3. **Open browser console (F12)** to see debug messages
4. Look for messages like:
   - `"Found X results with selector: ..."`
   - `"Display URL: ..."`
   - `"Country found: ..."`
5. If no flags appear, the selectors likely need updating for that search engine

## Pre-configured Countries

The script includes 21 countries by default with their TLDs:

| Country | TLDs | Flag |
|---------|------|------|
| Argentina | .ar | 🇦🇷 |
| Australia | .au | 🇦🇺 |
| Brazil | .br | 🇧🇷 |
| Canada | .ca | 🇨🇦 |
| China | .cn | 🇨🇳 |
| France | .fr | 🇫🇷 |
| Germany | .de | 🇩🇪 |
| India | .in | 🇮🇳 |
| Iran | .ir | 🇮🇷 |
| Italy | .it | 🇮🇹 |
| Japan | .jp | 🇯🇵 |
| Mexico | .mx | 🇲🇽 |
| Netherlands | .nl | 🇳🇱 |
| North Korea | .kp | 🇰🇵 |
| Poland | .pl | 🇵🇱 |
| Russia | .ru | 🇷🇺 |
| South Korea | .kr | 🇰🇷 |
| Spain | .es | 🇪🇸 |
| Turkey | .tr | 🇹🇷 |
| United Kingdom | .uk, .co.uk, .ac.uk, .gov.uk | 🇬🇧 |
| United States | .us, .edu, .gov, .mil | 🇺🇸 |

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