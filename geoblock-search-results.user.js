// ==UserScript==
// @name         GeoBlock Search Results
// @namespace    http://tampermonkey.net/
// @version      4.2
// @description  Block search results from specific countries with geolocation checking
// @author       You
// @match        https://www.google.com/search*
// @match        https://www.google.co.uk/search*
// @match        https://www.google.ca/search*
// @match        https://www.google.de/search*
// @match        https://www.google.fr/search*
// @match        https://www.google.com.au/search*
// @match        https://www.google.co.in/search*
// @match        https://www.google.it/search*
// @match        https://www.google.es/search*
// @match        https://www.google.com.br/search*
// @match        https://www.google.co.jp/search*
// @match        https://www.google.nl/search*
// @match        https://www.google.com.mx/search*
// @match        https://duckduckgo.com/*
// @match        https://www.bing.com/search*
// @match        https://search.yahoo.com/search*
// @match        https://search.brave.com/search*
// @match        https://www.ecosia.org/search*
// @match        https://www.startpage.com/sp/search*
// @match        https://yandex.com/search/*
// @match        https://www.qwant.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsUlEQVQ4T42TSWxNYRTHf9+99937+gaUBDWkNTQ1hUYNFYKFpIawQIghkSCREBsxJYYNXViwYmPcGGJMRIhgo6YQDeKFqJopQvva9/qG++7wyf1eTJHgvzvT//zP+c4nyg8ktyHYIpAWQDQEeRc8GVh/QhfFmETYSOpF+cFkXhfSWjHcYvkIi95RHduTHH1qs/NuThXFQrBmVJg5g0zKohquD8+SHocSti02NXTKqf1DTK8wOd9sc+m1w6Iqkyn9Qow53qHITs2K09zucf29S6ogGdZdZ3V1GFMDkbI9GTc1Tj6z2XwzqzpuHV/CkiEWo4+1YwiIm4Jgov3TYsw+n1Y5uyZFWFBlIbKOL4Mk24MXHZ4qGFyqs/12llNNBZX8vaC2zGDK6ZSyd0+OMLfSQkgp5Zkmm/p7OSVN1yDx1SNp/9xiiQGNi7txq8XhTdqnpqfB0B46d1qcIsHGhgynn//sVtFF43XK/2FP7WdwpC7OnsYciVZXNQpGDKAIVl3r5MobRzkmlBkcnRFj/oU0D754yre+Jsya6hKWXU7T8MFVvrXVFutqIkWC3fez7H1kq8DqkRYbxkbYeivDtbcO8ytNhvcwmDHApO5sB03tRWVLh5jsmBgtEmQdyYHHeb7kfFaOCFPRVWfV1U7Wjwnj+MFxCcq76NSeaOdzVqrnO1wXY2KfEOJsU17OHmQS0gQFTyIE6iU+ZXyetHmce15ge22EXlGNp60uLRlfKeod1fiY8RAVB9tkVanG9HKTvnGNeZUmORelaN/DPK4sEk7oYzCul6GIAsWJVo9LrwqI5qQrB3bVeJf2lYqymPbbsv4F8T7tyoUX03S3NI7NjNGWl0w7k1Kd/wci8dWxq0p1UxPQ+Nll840sL3+5gb8h+JEi+M5xky0grc7iKfwnhC0l9d8A20QtWcYaJmoAAAAASUVORK5CYII=
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Country to flag emoji mapping
    const countryFlags = {
        'Argentina': '🇦🇷',
        'Australia': '🇦🇺',
        'Brazil': '🇧🇷',
        'Canada': '🇨🇦',
        'China': '🇨🇳',
        'France': '🇫🇷',
        'Germany': '🇩🇪',
        'India': '🇮🇳',
        'Iran': '🇮🇷',
        'Italy': '🇮🇹',
        'Japan': '🇯🇵',
        'Mexico': '🇲🇽',
        'Netherlands': '🇳🇱',
        'North Korea': '🇰🇵',
        'Poland': '🇵🇱',
        'Russia': '🇷🇺',
        'South Korea': '🇰🇷',
        'Spain': '🇪🇸',
        'Turkey': '🇹🇷',
        'United Kingdom': '🇬🇧',
        'United States': '🇺🇸'
    };

    // Country TLD mapping
    const countryTLDs = {
        'Argentina': { tlds: ['ar'], detection: 'tld' },
        'Australia': { tlds: ['au'], detection: 'tld' },
        'Brazil': { tlds: ['br'], detection: 'tld' },
        'Canada': { tlds: ['ca'], detection: 'tld' },
        'China': { tlds: ['cn'], detection: 'tld' },
        'France': { tlds: ['fr'], detection: 'tld' },
        'Germany': { tlds: ['de'], detection: 'tld' },
        'India': { tlds: ['in'], detection: 'tld' },
        'Iran': { tlds: ['ir'], detection: 'tld' },
        'Italy': { tlds: ['it'], detection: 'tld' },
        'Japan': { tlds: ['jp'], detection: 'tld' },
        'Mexico': { tlds: ['mx'], detection: 'tld' },
        'Netherlands': { tlds: ['nl'], detection: 'tld' },
        'North Korea': { tlds: ['kp'], detection: 'tld' },
        'Poland': { tlds: ['pl'], detection: 'tld' },
        'Russia': { tlds: ['ru'], detection: 'tld' },
        'South Korea': { tlds: ['kr'], detection: 'tld' },
        'Spain': { tlds: ['es'], detection: 'tld' },
        'Turkey': { tlds: ['tr'], detection: 'tld' },
        'United Kingdom': { tlds: ['uk', 'co.uk', 'ac.uk', 'gov.uk'], detection: 'tld' },
        'United States': { tlds: ['us', 'edu', 'gov', 'mil'], detection: 'tld' }
    };

    // Well-known domains with known countries
    const knownDomains = {
        'github.com': 'United States',
        'dev.to': 'United States',
        'geeksforgeeks.org': 'India',
        'hackernoon.com': 'United States',
        'upgrad.com': 'India',
        'stackoverflow.com': 'United States',
        'wikipedia.org': 'United States',
        'youtube.com': 'United States',
        'facebook.com': 'United States',
        'twitter.com': 'United States',
        'reddit.com': 'United States',
        'linkedin.com': 'United States',
        'instagram.com': 'United States',
        'medium.com': 'United States',
        'quora.com': 'United States',
        'microsoft.com': 'United States',
        'apple.com': 'United States',
        'amazon.com': 'United States',
        'google.com': 'United States',
        'baidu.com': 'China',
        'qq.com': 'China',
        'taobao.com': 'China',
        'tmall.com': 'China',
        'yandex.ru': 'Russia',
        'mail.ru': 'Russia',
        'vk.com': 'Russia',
        'naver.com': 'South Korea',
        'daum.net': 'South Korea',
        'rakuten.co.jp': 'Japan',
        'yahoo.co.jp': 'Japan'
    };

    // Check if a country is blocked
    function isCountryBlocked(country) {
        try {
            const stored = localStorage.getItem('geoblock_' + country);
            return stored === 'true';
        } catch (e) {
            return false;
        }
    }

    // Toggle country blocking
    function toggleCountry(country) {
        const currentState = isCountryBlocked(country);
        try {
            localStorage.setItem('geoblock_' + country, String(!currentState));
        } catch (e) {
            alert('Error saving settings');
            return;
        }
        
        // Update all flags on the page to reflect new state
        updateAllFlags();
        
        // Show feedback
        showNotification(!currentState ? `Blocked ${country}` : `Unblocked ${country}`);
    }

    // Update all flags on the page
    function updateAllFlags() {
        const flags = document.querySelectorAll('.geoblock-flag');
        flags.forEach(flag => {
            const country = flag.dataset.country;
            if (country) {
                const isBlocked = isCountryBlocked(country);
                // Update flag appearance based on blocked state
                flag.style.opacity = isBlocked ? '0.6' : '1';
                
                // Update the result display
                const result = flag.closest('[data-geoblock-checked]');
                if (result) {
                    if (isBlocked) {
                        blockResult(result, country);
                    } else {
                        unblockResult(result, country);
                    }
                }
            }
        });
    }

    // Show notification
    function showNotification(message) {
        // Remove existing notification
        const existing = document.getElementById('geoblock-notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.id = 'geoblock-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1a73e8;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Extract domain from URL or display text
    function extractDomain(input) {
        if (!input) return null;
        
        try {
            // If it's already a valid URL
            if (input.includes('://')) {
                try {
                    const url = new URL(input);
                    return url.hostname.toLowerCase().replace(/^www\./, '');
                } catch (e) {
                    // Not a valid URL, try to extract domain
                }
            }
            
            // Remove any › symbols and clean up
            const cleaned = input
                .replace(/›/g, '/')
                .replace(/\s+/g, '')
                .replace(/\/+/g, '/')
                .trim();
            
            // Try to find domain pattern
            const domainPatterns = [
                /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,})(?:\/|$)/,
                /(?:https?:\/\/)?([a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,})/,
                /([a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,})/
            ];
            
            for (const pattern of domainPatterns) {
                const match = cleaned.match(pattern);
                if (match && match[1]) {
                    const domain = match[1].toLowerCase();
                    // Validate domain format
                    if (domain.includes('.') && !domain.startsWith('.') && !domain.endsWith('.')) {
                        return domain;
                    }
                }
            }
            
            // Last attempt: split by spaces and look for something that looks like a domain
            const parts = input.split(/\s+/);
            for (const part of parts) {
                if (part.includes('.') && !part.startsWith('.')) {
                    const simpleMatch = part.match(/([a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z]{2,})/);
                    if (simpleMatch && simpleMatch[1]) {
                        return simpleMatch[1].toLowerCase();
                    }
                }
            }
            
        } catch (e) {
            console.error('Error extracting domain:', e);
        }
        
        return null;
    }

    // Get country for a domain
    function getDomainCountry(domain) {
        if (!domain) return null;
        
        // Check known domains first
        if (knownDomains[domain]) {
            return knownDomains[domain];
        }
        
        // Check country TLDs
        const tld = domain.split('.').pop();
        for (const country in countryTLDs) {
            const countryData = countryTLDs[country];
            if (countryData.tlds.includes(tld)) {
                return country;
            }
        }
        
        // Check custom domain blocklist
        const blocklist = getCustomBlocklist();
        for (const blockedDomain of blocklist) {
            if (domain === blockedDomain || domain.endsWith('.' + blockedDomain)) {
                return 'Custom Blocked';
            }
        }
        
        return null;
    }

    // Get custom blocked domains
    function getCustomBlocklist() {
        try {
            const stored = localStorage.getItem('geoblock_custom_domains') || '[]';
            return JSON.parse(stored);
        } catch (e) {
            return [];
        }
    }

    // Save custom blocked domains
    function saveCustomBlocklist(domains) {
        try {
            localStorage.setItem('geoblock_custom_domains', JSON.stringify(domains));
        } catch (e) {
            alert('Error saving custom domains');
        }
    }

    // Manage custom domain blocklist
    function manageCustomDomains() {
        const blocklist = getCustomBlocklist();
        let message = 'Custom Domain Blocklist\n\n';
        message += 'Currently blocked domains:\n';
        
        if (blocklist.length === 0) {
            message += '(none)\n';
        } else {
            blocklist.forEach((domain, index) => {
                message += `${index + 1}. ${domain}\n`;
            });
        }
        
        message += '\n\nOptions:\n';
        message += 'ADD domain.com - Add a domain\n';
        message += 'REMOVE 1,2,3 - Remove domains by number\n';
        message += 'CLEAR - Remove all custom domains\n';
        
        const input = prompt(message);
        
        if (!input) return;
        
        const cmd = input.trim().toUpperCase();
        
        if (cmd.startsWith('ADD ')) {
            const domain = input.substring(4).trim().toLowerCase();
            if (domain && !blocklist.includes(domain)) {
                blocklist.push(domain);
                saveCustomBlocklist(blocklist);
                alert(`Added: ${domain}`);
                location.reload();
            }
        } else if (cmd.startsWith('REMOVE ')) {
            const numbers = input.substring(7).split(',').map(n => parseInt(n.trim()));
            const toRemove = numbers.map(n => blocklist[n - 1]).filter(d => d);
            
            const newList = blocklist.filter(d => !toRemove.includes(d));
            saveCustomBlocklist(newList);
            alert(`Removed ${toRemove.length} domain(s)`);
            location.reload();
        } else if (cmd === 'CLEAR') {
            saveCustomBlocklist([]);
            alert('Cleared all custom domains');
            location.reload();
        }
    }

    // Get search result selectors
    function getResultSelectors() {
        const hostname = window.location.hostname.toLowerCase();
        
        if (hostname.includes('google')) {
            return ['div.g', 'div[data-hveid]', 'div.tF2Cxc'];
        } else if (hostname.includes('duckduckgo')) {
            return [
                'li[data-layout="organic"]',
                'article[data-testid="result"]'
            ];
        } else if (hostname.includes('bing')) {
            return ['li.b_algo'];
        } else if (hostname.includes('yahoo')) {
            return ['.algo'];
        } else if (hostname.includes('brave')) {
            return ['.snippet'];
        } else if (hostname.includes('ecosia')) {
            return ['.result'];
        } else if (hostname.includes('startpage')) {
            return ['.w-gl__result'];
        } else if (hostname.includes('yandex')) {
            return ['.serp-item'];
        } else if (hostname.includes('qwant')) {
            return ['.result'];
        } else {
            return ['a[href]'];
        }
    }

    // Get the display URL from a search result
    function getDisplayURL(result) {
        const hostname = window.location.hostname.toLowerCase();
        
        if (hostname.includes('duckduckgo')) {
            // Look for URL display in DuckDuckGo
            const urlElement = result.querySelector('[data-testid="result-extras-url-link"], .result__url');
            if (urlElement && urlElement.textContent) {
                return urlElement.textContent.trim();
            }
            
            // Also check link titles
            const links = result.querySelectorAll('a[href]');
            for (const link of links) {
                if (link.textContent && (link.textContent.includes('.com') || link.textContent.includes('.org') || 
                    link.textContent.includes('.net') || link.textContent.includes('.io'))) {
                    return link.textContent.trim();
                }
            }
        }
        
        // For Google and others, get the cite element
        const cite = result.querySelector('cite, .VuuXrf, .TbwUpd, .result-url');
        if (cite && cite.textContent) {
            return cite.textContent.trim();
        }
        
        // Fallback: get first link text
        const firstLink = result.querySelector('a[href]');
        if (firstLink && firstLink.textContent) {
            return firstLink.textContent.trim();
        }
        
        return null;
    }

    // Filter search results
    function filterResults() {
        const selectors = getResultSelectors();
        
        for (const selector of selectors) {
            const results = document.querySelectorAll(selector);
            
            for (const result of results) {
                if (result.hasAttribute('data-geoblock-checked')) continue;
                result.setAttribute('data-geoblock-checked', 'true');

                // Get display URL
                const displayURL = getDisplayURL(result);
                
                if (displayURL) {
                    // Extract domain
                    const domain = extractDomain(displayURL);
                    
                    if (domain) {
                        // Get country
                        const country = getDomainCountry(domain);
                        
                        // Add flag indicator with country name
                        if (country && countryFlags[country]) {
                            addFlagIndicator(result, country);
                            
                            // Check if blocked
                            if (isCountryBlocked(country)) {
                                blockResult(result, country);
                            }
                        } else if (country === 'Custom Blocked') {
                            // Handle custom blocked domains
                            blockResult(result, 'Custom Blocked Domain');
                        }
                    }
                }
            }
        }
    }

    // Create flag element with country name (only for search results)
    function createFlagElement(country, showCountryName = false) {
        const flag = countryFlags[country];
        const isBlocked = isCountryBlocked(country);
        const flagElement = document.createElement('span');
        flagElement.className = 'geoblock-flag';
        flagElement.dataset.country = country;
        flagElement.style.cssText = `
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
            cursor: pointer !important;
            opacity: ${isBlocked ? '0.6' : '1'} !important;
            transition: opacity 0.3s, transform 0.2s, background 0.2s !important;
            padding: 2px 6px !important;
            border-radius: 4px !important;
            margin-right: 8px !important;
        `;
        
        // Add flag emoji
        const flagEmoji = document.createElement('span');
        flagEmoji.textContent = flag;
        flagEmoji.style.cssText = 'font-size: 16px !important;';
        flagElement.appendChild(flagEmoji);
        
        // Add country name if requested (for search results only)
        if (showCountryName) {
            const countryName = document.createElement('span');
            countryName.textContent = country;
            countryName.style.cssText = `
                font-size: 12px !important;
                font-weight: normal !important;
                margin-left: 2px !important;
                color: currentColor !important;
            `;
            flagElement.appendChild(countryName);
        }
        
        // Add hover effect
        flagElement.addEventListener('mouseenter', () => {
            flagElement.style.transform = 'scale(1.05)';
            flagElement.style.background = 'rgba(0, 0, 0, 0.05)';
        });
        
        flagElement.addEventListener('mouseleave', () => {
            flagElement.style.transform = 'scale(1)';
            flagElement.style.background = 'transparent';
        });
        
        // Make flag clickable
        flagElement.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleCountry(country);
        });
        
        return flagElement;
    }

    // Create flag element for configuration menu (no country name)
    function createConfigFlagElement(country) {
        const flag = countryFlags[country];
        const isBlocked = isCountryBlocked(country);
        const flagElement = document.createElement('span');
        flagElement.className = 'geoblock-config-flag';
        flagElement.dataset.country = country;
        flagElement.textContent = flag;
        flagElement.style.cssText = `
            display: inline-block !important;
            cursor: pointer !important;
            opacity: ${isBlocked ? '0.6' : '1'} !important;
            transition: opacity 0.3s, transform 0.2s, background 0.2s !important;
            padding: 4px 10px !important;
            border-radius: 4px !important;
            margin-right: 12px !important;
            font-size: 16px !important;
        `;
        
        // Add hover effect
        flagElement.addEventListener('mouseenter', () => {
            flagElement.style.transform = 'scale(1.05)';
            flagElement.style.background = 'rgba(0, 0, 0, 0.05)';
        });
        
        flagElement.addEventListener('mouseleave', () => {
            flagElement.style.transform = 'scale(1)';
            flagElement.style.background = 'transparent';
        });
        
        // Make flag clickable
        flagElement.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleCountry(country);
        });
        
        return flagElement;
    }

    // Add flag indicator to search result (with country name)
    function addFlagIndicator(result, country) {
        // Don't add duplicate flags
        if (result.querySelector('.geoblock-flag[data-country="' + country + '"]')) return;
        
        // Create flag WITH country name for search results
        const flagElement = createFlagElement(country, true);
        
        // Find the best place to insert the flag
        const hostname = window.location.hostname.toLowerCase();
        
        if (hostname.includes('duckduckgo')) {
            // DuckDuckGo: insert before title
            const title = result.querySelector('a[data-testid="result-title-a"], h2, .result__title');
            if (title) {
                title.insertBefore(flagElement, title.firstChild);
                return;
            }
        }
        
        if (hostname.includes('google')) {
            // Google: insert before h3 title
            const title = result.querySelector('h3');
            if (title) {
                title.insertBefore(flagElement, title.firstChild);
                return;
            }
        }
        
        // Generic placement
        const title = result.querySelector('h1, h2, h3, h4, .title');
        if (title) {
            title.insertBefore(flagElement, title.firstChild);
        } else {
            result.insertBefore(flagElement, result.firstChild);
        }
    }

    // Block a result
    function blockResult(result, country) {
        // Hide all content except the flag and blocked indicator
        const flag = result.querySelector('.geoblock-flag');
        const children = result.children;
        
        // First, make sure the flag is visible
        if (flag) {
            flag.style.display = 'inline-flex';
            flag.style.pointerEvents = 'auto'; // Keep flag clickable
        }
        
        // Hide all other children
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (!child.classList.contains('geoblock-flag') && 
                !child.classList.contains('geoblock-blocked-indicator')) {
                child.style.display = 'none';
            }
        }
        
        // Reduce height and add visual styling
        result.style.opacity = '0.7';
        result.style.minHeight = 'auto';
        result.style.padding = '8px 12px';
        result.style.margin = '4px 0';
        result.style.background = 'rgba(0, 0, 0, 0.02)';
        result.style.borderRadius = '6px';
        result.style.border = '1px solid rgba(0, 0, 0, 0.02)';
        result.style.pointerEvents = 'none';
        
        // Add blocked indicator if not already present
        if (!result.querySelector('.geoblock-blocked-indicator')) {
            const blockedIndicator = document.createElement('span');
            blockedIndicator.className = 'geoblock-blocked-indicator';
            blockedIndicator.textContent = ' 🚫 Blocked';
            blockedIndicator.className = 'geoblock-blocked-indicator';
            blockedIndicator.title = `Blocked content from ${country} - Click flag to unblock`;
            
            // Add indicator next to flag
            if (flag) {
                flag.parentNode.insertBefore(blockedIndicator, flag.nextSibling);
            }
        }
        
        // Also add a tooltip to the entire result
        result.title = `Blocked: Content from ${country} - Click flag to unblock`;
    }

    // Unblock a result
    function unblockResult(result, country) {
        // Show all children
        const children = result.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            child.style.display = '';
        }
        
        // Reset styling
        result.style.opacity = '1';
        result.style.minHeight = '';
        result.style.padding = '';
        result.style.margin = '';
        result.style.background = '';
        result.style.borderRadius = '';
        result.style.border = '';
        result.style.pointerEvents = '';
        result.title = '';
        
        // Remove blocked indicator
        const blockedIndicator = result.querySelector('.geoblock-blocked-indicator');
        if (blockedIndicator) {
            blockedIndicator.remove();
        }
    }

    // Show interactive configuration dialog
    function showConfig() {
        // Create modal dialog
        const modal = document.createElement('div');
        modal.id = 'geoblock-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 100000;
            animation: fadeIn 0.3s;
        `;
        
        const dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Header
        const header = document.createElement('div');
        header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;';
        
        const title = document.createElement('h2');
        title.textContent = '🌍 GeoBlock Configuration';
        title.style.cssText = 'margin: 0; font-size: 20px; color: #1a1a1a;';
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '✕';
        closeButton.style.cssText = `
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #666;
            padding: 5px 10px;
            border-radius: 4px;
        `;
        closeButton.addEventListener('click', () => {
            modal.remove();
        });
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.background = '#f0f0f0';
        });
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.background = 'none';
        });
        
        header.appendChild(title);
        header.appendChild(closeButton);
        
        // Countries list
        const countriesList = document.createElement('div');
        countriesList.style.cssText = 'margin-bottom: 20px;';
        
        const countries = Object.keys(countryTLDs).sort();
        countries.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.style.cssText = `
                display: flex;
                align-items: center;
                padding: 10px 12px;
                margin-bottom: 8px;
                border-radius: 8px;
                background: #f8f9fa;
                transition: background 0.2s;
                cursor: pointer;
            `;
            
            // Add hover effect
            countryItem.addEventListener('mouseenter', () => {
                countryItem.style.background = '#e9ecef';
            });
            countryItem.addEventListener('mouseleave', () => {
                countryItem.style.background = '#f8f9fa';
            });
            
            // Create clickable flag WITHOUT country name for config menu
            const flagElement = createConfigFlagElement(country);
            flagElement.style.marginRight = '12px';
            flagElement.style.marginLeft = '0';
            
            // Add country info (country name in separate element)
            const countryInfo = document.createElement('div');
            countryInfo.style.cssText = 'flex: 1;';
            
            const countryName = document.createElement('span');
            countryName.textContent = country;
            countryName.style.cssText = 'font-weight: 500; font-size: 14px; color: #1a1a1a;';
            
            const tldInfo = document.createElement('div');
            tldInfo.textContent = '.' + countryTLDs[country].tlds[0];
            tldInfo.style.cssText = 'font-size: 12px; color: #666; margin-top: 2px;';
            
            countryInfo.appendChild(countryName);
            countryInfo.appendChild(tldInfo);
            
            // Status indicator
            const status = document.createElement('span');
            status.textContent = isCountryBlocked(country) ? '✓ Blocked' : '○ Allowed';
            status.style.cssText = `
                font-size: 12px;
                color: ${isCountryBlocked(country) ? '#dc3545' : '#28a745'};
                font-weight: 500;
                padding: 4px 8px;
                border-radius: 4px;
                background: ${isCountryBlocked(country) ? 'rgba(220, 53, 69, 0.1)' : 'rgba(40, 167, 69, 0.1)'};
            `;
            
            countryItem.appendChild(flagElement);
            countryItem.appendChild(countryInfo);
            countryItem.appendChild(status);
            
            // Make entire item clickable
            countryItem.addEventListener('click', (e) => {
                if (!e.target.closest('.geoblock-config-flag')) {
                    toggleCountry(country);
                    // Update status in real-time
                    status.textContent = isCountryBlocked(country) ? '✓ Blocked' : '○ Allowed';
                    status.style.color = isCountryBlocked(country) ? '#dc3545' : '#28a745';
                    status.style.background = isCountryBlocked(country) ? 'rgba(220, 53, 69, 0.1)' : 'rgba(40, 167, 69, 0.1)';
                }
            });
            
            countriesList.appendChild(countryItem);
        });
        
        // Controls
        const controls = document.createElement('div');
        controls.style.cssText = 'display: flex; gap: 10px; margin-top: 20px;';
        
        const domainsButton = document.createElement('button');
        domainsButton.textContent = 'Manage Custom Domains';
        domainsButton.style.cssText = `
            flex: 1;
            background: #6c757d;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
        `;
        domainsButton.addEventListener('click', () => {
            modal.remove();
            setTimeout(manageCustomDomains, 100);
        });
        domainsButton.addEventListener('mouseenter', () => {
            domainsButton.style.background = '#5a6268';
        });
        domainsButton.addEventListener('mouseleave', () => {
            domainsButton.style.background = '#6c757d';
        });
        
        const closeDialogButton = document.createElement('button');
        closeDialogButton.textContent = 'Close';
        closeDialogButton.style.cssText = `
            flex: 1;
            background: #1a73e8;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background 0.2s;
        `;
        closeDialogButton.addEventListener('click', () => {
            modal.remove();
        });
        closeDialogButton.addEventListener('mouseenter', () => {
            closeDialogButton.style.background = '#1557b0';
        });
        closeDialogButton.addEventListener('mouseleave', () => {
            closeDialogButton.style.background = '#1a73e8';
        });
        
        controls.appendChild(domainsButton);
        controls.appendChild(closeDialogButton);
        
        // Assemble dialog
        dialog.appendChild(header);
        dialog.appendChild(countriesList);
        dialog.appendChild(controls);
        modal.appendChild(dialog);
        
        // Add to page
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Create button
    function createButton() {
        if (document.getElementById('geoblock-btn')) return;

        const button = document.createElement('button');
        button.id = 'geoblock-btn';
        button.innerHTML = '🌍 GeoBlock';
        button.style.cssText = `
            background: #1a73e8 !important;
            color: white !important;
            border: none !important;
            padding: 8px 16px !important;
            border-radius: 20px !important;
            cursor: pointer !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            margin: 8px !important;
            transition: background 0.2s !important;
            z-index: 10000 !important;
            position: relative !important;
        `;
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showConfig();
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.background = '#1557b0 !important';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.background = '#1a73e8 !important';
        });

        // Place button
        const header = document.querySelector('header, .header, #header');
        if (header) {
            header.appendChild(button);
        } else {
            const searchContainer = document.querySelector('form, .search-form, #search_form');
            if (searchContainer) {
                const container = document.createElement('div');
                container.style.cssText = 'text-align: center; margin: 10px 0;';
                container.appendChild(button);
                searchContainer.parentNode.insertBefore(container, searchContainer.nextSibling);
            } else {
                document.body.insertBefore(button, document.body.firstChild);
            }
        }
    }

    // Initialize
    function init() {
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .geoblock-flag {
                display: inline-flex !important;
                align-items: center !important;
                gap: 4px !important;
                cursor: pointer !important;
                transition: opacity 0.3s, transform 0.2s, background 0.2s !important;
                padding: 2px 6px !important;
                border-radius: 4px !important;
                margin-right: 8px !important;
            }
            .geoblock-flag span {
                color: currentColor !important;
            }
            .geoblock-flag:hover {
                transform: scale(1.05) !important;
                background: rgba(0, 0, 0, 0.05) !important;
            }
            .geoblock-config-flag {
                display: inline-block !important;
                cursor: pointer !important;
                transition: opacity 0.3s, transform 0.2s, background 0.2s !important;
                padding: 4px 10px !important;
                border-radius: 4px !important;
                margin-right: 12px !important;
                font-size: 16px !important;
            }
            .geoblock-config-flag:hover {
                transform: scale(1.05) !important;
                background: rgba(0, 0, 0, 0.05) !important;
            }
            [data-geoblock-checked] {
                position: relative !important;
                transition: opacity 0.3s, filter 0.3s !important;
            }

            .geoblock-blocked-indicator {
                color: #dc3545 !important;
                margin-left: 8px !important;
                font-size: 12px !important;
                font-weight: 500 !important;
                padding: 2px 6px !important;
                background: rgba(220, 53, 69, 0.1) !important;
                border-radius: 4px !important;
            }

            #geoblock-btn {
                background: #1a73e8 !important;
                color: white !important;
                border: none !important;
                padding: 8px 16px !important;
                border-radius: 20px !important;
                cursor: pointer !important;
                font-size: 13px !important;
                font-weight: 500 !important;
                margin: 8px !important;
            }
            #geoblock-btn:hover {
                background: #1557b0 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Create button
        setTimeout(createButton, 1000);
        
        // Initial filter
        setTimeout(() => {
            filterResults();
            // Run again to catch any late-loading results
            setTimeout(filterResults, 1000);
            setTimeout(filterResults, 3000);
        }, 1500);
        
        // Watch for new results
        const observer = new MutationObserver((mutations) => {
            let hasNewResults = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    hasNewResults = true;
                    break;
                }
            }
            if (hasNewResults) {
                setTimeout(filterResults, 300);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Filter on scroll
        window.addEventListener('scroll', () => {
            setTimeout(filterResults, 200);
        }, { passive: true });
    }

    // Start when page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Make config function accessible
    window.geoBlockConfig = showConfig;
})();