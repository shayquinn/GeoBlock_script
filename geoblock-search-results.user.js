// ==UserScript==
// @name         GeoBlock Search Results
// @namespace    http://tampermonkey.net/
// @version      4.6
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
// @connect      ipapi.co
// @connect      cloudflare-dns.com
// @connect      whoisjsonapi.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // Signal that the script has loaded
    console.log('✅ GeoBlock Search Results v4.6 loaded');

    // Country to flag emoji mapping
    const countryFlags = {
        'Argentina': '🇦🇷',
        'Australia': '🇦🇺',
        'Austria': '🇦🇹',
        'Bangladesh': '🇧🇩',
        'Belgium': '🇧🇪',
        'Brazil': '🇧🇷',
        'Canada': '🇨🇦',
        'China': '🇨🇳',
        'Czech Republic': '🇨🇿',
        'Denmark': '🇩🇰',
        'Egypt': '🇪🇬',
        'Finland': '🇫🇮',
        'France': '🇫🇷',
        'Germany': '🇩🇪',
        'Greece': '🇬🇷',
        'Hong Kong': '🇭🇰',
        'Hungary': '🇭🇺',
        'India': '🇮🇳',
        'Indonesia': '🇮🇩',
        'Iran': '🇮🇷',
        'Ireland': '🇮🇪',
        'Israel': '🇮🇱',
        'Italy': '🇮🇹',
        'Japan': '🇯🇵',
        'Kenya': '🇰🇪',
        'Malaysia': '🇲🇾',
        'Mexico': '🇲🇽',
        'Netherlands': '🇳🇱',
        'New Zealand': '🇳🇿',
        'Nigeria': '🇳🇬',
        'North Korea': '🇰🇵',
        'Norway': '🇳🇴',
        'Pakistan': '🇵🇰',
        'Philippines': '🇵🇭',
        'Poland': '🇵🇱',
        'Portugal': '🇵🇹',
        'Romania': '🇷🇴',
        'Russia': '🇷🇺',
        'Saudi Arabia': '🇸🇦',
        'Singapore': '🇸🇬',
        'South Africa': '🇿🇦',
        'South Korea': '🇰🇷',
        'Spain': '🇪🇸',
        'Sweden': '🇸🇪',
        'Switzerland': '🇨🇭',
        'Taiwan': '🇹🇼',
        'Thailand': '🇹🇭',
        'Turkey': '🇹🇷',
        'Ukraine': '🇺🇦',
        'United Arab Emirates': '🇦🇪',
        'United Kingdom': '🇬🇧',
        'United States': '🇺🇸',
        'Vietnam': '🇻🇳'
    };

    // Country TLD mapping
    const countryTLDs = {
        'Argentina': { tlds: ['ar', 'com.ar', 'org.ar', 'net.ar', 'gov.ar', 'edu.ar', 'mil.ar'], detection: 'tld' },
        'Australia': { tlds: ['au', 'com.au', 'org.au', 'net.au', 'edu.au', 'gov.au', 'asn.au', 'id.au'], detection: 'tld' },
        'Austria': { tlds: ['at', 'co.at', 'or.at', 'ac.at', 'gv.at'], detection: 'tld' },
        'Bangladesh': { tlds: ['bd', 'com.bd', 'org.bd', 'net.bd', 'gov.bd', 'edu.bd', 'ac.bd'], detection: 'tld' },
        'Belgium': { tlds: ['be', 'com.be', 'org.be', 'net.be', 'ac.be', 'gov.be'], detection: 'tld' },
        'Brazil': { tlds: ['br', 'com.br', 'org.br', 'net.br', 'gov.br', 'edu.br', 'mil.br'], detection: 'tld' },
        'Canada': { tlds: ['ca', 'com.ca', 'org.ca', 'net.ca', 'gc.ca'], detection: 'tld' },
        'China': { tlds: ['cn', 'com.cn', 'org.cn', 'net.cn', 'gov.cn', 'edu.cn', 'ac.cn'], detection: 'tld' },
        'Czech Republic': { tlds: ['cz', 'co.cz'], detection: 'tld' },
        'Denmark': { tlds: ['dk', 'co.dk'], detection: 'tld' },
        'Egypt': { tlds: ['eg', 'com.eg', 'org.eg', 'net.eg', 'gov.eg', 'edu.eg'], detection: 'tld' },
        'Finland': { tlds: ['fi', 'com.fi', 'org.fi', 'net.fi', 'gov.fi', 'edu.fi'], detection: 'tld' },
        'France': { tlds: ['fr', 'com.fr', 'org.fr', 'net.fr', 'gouv.fr', 'asso.fr'], detection: 'tld' },
        'Germany': { tlds: ['de', 'com.de', 'org.de', 'net.de'], detection: 'tld' },
        'Greece': { tlds: ['gr', 'com.gr', 'org.gr', 'net.gr', 'gov.gr', 'edu.gr'], detection: 'tld' },
        'Hong Kong': { tlds: ['hk', 'com.hk', 'org.hk', 'net.hk', 'gov.hk', 'edu.hk'], detection: 'tld' },
        'Hungary': { tlds: ['hu', 'co.hu', 'org.hu', 'gov.hu', 'edu.hu'], detection: 'tld' },
        'India': { tlds: ['in', 'co.in', 'org.in', 'net.in', 'gov.in', 'edu.in', 'ac.in', 'nic.in'], detection: 'tld' },
        'Indonesia': { tlds: ['id', 'co.id', 'or.id', 'net.id', 'go.id', 'ac.id', 'web.id'], detection: 'tld' },
        'Iran': { tlds: ['ir', 'com.ir', 'org.ir', 'net.ir', 'gov.ir', 'ac.ir', 'co.ir'], detection: 'tld' },
        'Ireland': { tlds: ['ie', 'com.ie', 'org.ie', 'net.ie', 'gov.ie'], detection: 'tld' },
        'Israel': { tlds: ['il', 'co.il', 'org.il', 'net.il', 'gov.il', 'ac.il'], detection: 'tld' },
        'Italy': { tlds: ['it', 'com.it', 'org.it', 'net.it', 'gov.it', 'edu.it'], detection: 'tld' },
        'Japan': { tlds: ['jp', 'co.jp', 'or.jp', 'ne.jp', 'go.jp', 'ac.jp', 'ed.jp', 'lg.jp'], detection: 'tld' },
        'Kenya': { tlds: ['ke', 'co.ke', 'or.ke', 'ne.ke', 'go.ke', 'ac.ke'], detection: 'tld' },
        'Malaysia': { tlds: ['my', 'com.my', 'org.my', 'net.my', 'gov.my', 'edu.my'], detection: 'tld' },
        'Mexico': { tlds: ['mx', 'com.mx', 'org.mx', 'net.mx', 'gob.mx', 'edu.mx'], detection: 'tld' },
        'Netherlands': { tlds: ['nl', 'com.nl', 'org.nl', 'net.nl', 'co.nl'], detection: 'tld' },
        'New Zealand': { tlds: ['nz', 'co.nz', 'org.nz', 'net.nz', 'govt.nz', 'ac.nz'], detection: 'tld' },
        'Nigeria': { tlds: ['ng', 'com.ng', 'org.ng', 'net.ng', 'gov.ng', 'edu.ng'], detection: 'tld' },
        'North Korea': { tlds: ['kp', 'com.kp', 'org.kp', 'net.kp', 'gov.kp', 'edu.kp'], detection: 'tld' },
        'Norway': { tlds: ['no', 'co.no', 'org.no', 'net.no', 'gov.no'], detection: 'tld' },
        'Pakistan': { tlds: ['pk', 'com.pk', 'org.pk', 'net.pk', 'gov.pk', 'edu.pk'], detection: 'tld' },
        'Philippines': { tlds: ['ph', 'com.ph', 'org.ph', 'net.ph', 'gov.ph', 'edu.ph'], detection: 'tld' },
        'Poland': { tlds: ['pl', 'com.pl', 'org.pl', 'net.pl', 'gov.pl', 'edu.pl', 'co.pl'], detection: 'tld' },
        'Portugal': { tlds: ['pt', 'com.pt', 'org.pt', 'net.pt', 'gov.pt', 'edu.pt'], detection: 'tld' },
        'Romania': { tlds: ['ro', 'com.ro', 'org.ro', 'net.ro', 'gov.ro', 'edu.ro'], detection: 'tld' },
        'Russia': { tlds: ['ru', 'com.ru', 'org.ru', 'net.ru', 'gov.ru', 'edu.ru', 'mil.ru'], detection: 'tld' },
        'Saudi Arabia': { tlds: ['sa', 'com.sa', 'org.sa', 'net.sa', 'gov.sa', 'edu.sa'], detection: 'tld' },
        'Singapore': { tlds: ['sg', 'com.sg', 'org.sg', 'net.sg', 'gov.sg', 'edu.sg'], detection: 'tld' },
        'South Africa': { tlds: ['za', 'co.za', 'org.za', 'net.za', 'gov.za', 'ac.za'], detection: 'tld' },
        'South Korea': { tlds: ['kr', 'co.kr', 'or.kr', 'ne.kr', 'go.kr', 'ac.kr', 're.kr', 'pe.kr'], detection: 'tld' },
        'Spain': { tlds: ['es', 'com.es', 'org.es', 'net.es', 'gob.es', 'edu.es'], detection: 'tld' },
        'Sweden': { tlds: ['se', 'com.se', 'org.se', 'net.se'], detection: 'tld' },
        'Switzerland': { tlds: ['ch', 'com.ch', 'org.ch', 'net.ch', 'gov.ch'], detection: 'tld' },
        'Taiwan': { tlds: ['tw', 'com.tw', 'org.tw', 'net.tw', 'gov.tw', 'edu.tw'], detection: 'tld' },
        'Thailand': { tlds: ['th', 'co.th', 'or.th', 'net.th', 'go.th', 'ac.th'], detection: 'tld' },
        'Turkey': { tlds: ['tr', 'com.tr', 'org.tr', 'net.tr', 'gov.tr', 'edu.tr', 'biz.tr'], detection: 'tld' },
        'Ukraine': { tlds: ['ua', 'com.ua', 'org.ua', 'net.ua', 'gov.ua', 'edu.ua'], detection: 'tld' },
        'United Arab Emirates': { tlds: ['ae', 'co.ae', 'org.ae', 'net.ae', 'gov.ae', 'ac.ae'], detection: 'tld' },
        'United Kingdom': { tlds: ['uk', 'co.uk', 'ac.uk', 'gov.uk', 'org.uk', 'net.uk', 'sch.uk', 'nhs.uk', 'police.uk'], detection: 'tld' },
        'United States': { tlds: ['us', 'com.us', 'org.us', 'net.us', 'edu', 'gov', 'mil'], detection: 'tld' },
        'Vietnam': { tlds: ['vn', 'com.vn', 'org.vn', 'net.vn', 'gov.vn', 'edu.vn', 'ac.vn'], detection: 'tld' }

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
        'yahoo.co.jp': 'Japan',
        // News & Media
        'bbc.co.uk': 'United Kingdom',
        'bbc.com': 'United Kingdom',
        'theguardian.com': 'United Kingdom',
        // Learning & Education
        'w3schools.com': 'Norway',
        'tutorialspoint.com': 'India',
        'javatpoint.com': 'India',
        'programiz.com': 'Nepal',
        'freecodecamp.org': 'United States',
        'codecademy.com': 'United States',
        'udemy.com': 'United States',
        'coursera.org': 'United States',
        'edx.org': 'United States',
        'khanacademy.org': 'United States',
        // Package Managers
        'npmjs.com': 'United States',
        'pypi.org': 'United States',
        'rubygems.org': 'United States',
        'packagist.org': 'United Kingdom',
        'crates.io': 'United States',
        // Documentation
        'docs.oracle.com': 'United States',
        'docs.microsoft.com': 'United States',
        'developer.mozilla.org': 'United States',
        'php.net': 'United States',
        'python.org': 'United States',
        'ruby-lang.org': 'Japan',
        'golang.org': 'United States',
        'rust-lang.org': 'United States'
    };

    // Add after the knownDomains object
    const GEOLOCATION_CACHE = new Map();
    const GEOLOCATION_CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours
    const WHOIS_CACHE = new Map();
    const WHOIS_CACHE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

    // Failed lookups logging
    const FAILED_LOOKUPS = [];
    const MAX_FAILED_LOGS = 50; // Limit storage

    // API rate limiting
    const API_QUEUE = [];
    let API_PROCESSING = false;
    const API_DELAY = 1500; // 1.5 seconds between requests (safe for ipapi.co rate limits)

    async function fetchDomainCountry(domain) {
        // Check cache first
        const cached = GEOLOCATION_CACHE.get(domain);
        if (cached && Date.now() - cached.timestamp < GEOLOCATION_CACHE_TIME) {
            return cached.country;
        }

        const lookupAttempt = {
            domain: domain,
            timestamp: new Date().toISOString(),
            attempts: []
        };

        try {
            // Use ipapi.co (1000 req/day, accepts domains)
            const response = await fetch(`https://ipapi.co/${domain}/country_name/`, {
                headers: { 'User-Agent': 'GeoBlockScript/4.6' },
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });
            
            lookupAttempt.attempts.push({
                api: 'ipapi.co',
                status: response.status,
                ok: response.ok
            });
            
            if (response.ok) {
                const country = await response.text();
                const cleanCountry = country.trim();
                
                // Validate response
                if (cleanCountry && cleanCountry.length < 50 && !cleanCountry.includes('<')) {
                    GEOLOCATION_CACHE.set(domain, {
                        country: cleanCountry,
                        timestamp: Date.now()
                    });
                    console.log(`✅ Found ${domain} → ${cleanCountry}`);
                    return cleanCountry;
                } else {
                    lookupAttempt.attempts[0].invalidResponse = cleanCountry;
                }
            }
        } catch (e) {
            lookupAttempt.attempts.push({
                api: 'ipapi.co',
                error: e.message,
                errorType: e.name
            });
            console.log('❌ ipapi.co failed for', domain, ':', e.message);
        }

        // Log the failed attempt
        FAILED_LOOKUPS.push(lookupAttempt);
        if (FAILED_LOOKUPS.length > MAX_FAILED_LOGS) {
            FAILED_LOOKUPS.shift(); // Remove oldest
        }

        return null;
    }

    async function processAPIQueue() {
        if (API_PROCESSING || API_QUEUE.length === 0) return;
        
        API_PROCESSING = true;
        
        while (API_QUEUE.length > 0) {
            const { domain, resolve } = API_QUEUE.shift();
            const country = await fetchDomainCountry(domain);
            resolve(country);
            
            if (API_QUEUE.length > 0) {
                await new Promise(r => setTimeout(r, API_DELAY));
            }
        }
        
        API_PROCESSING = false;
    }

    async function fetchDomainCountryQueued(domain) {
        return new Promise((resolve) => {
            API_QUEUE.push({ domain, resolve });
            processAPIQueue();
        });
    }

    // Convert ISO country codes to full names
    function convertCountryCode(code) {
        const codes = {
            'US': 'United States',
            'GB': 'United Kingdom',
            'UK': 'United Kingdom',
            'DE': 'Germany',
            'FR': 'France',
            'CA': 'Canada',
            'AU': 'Australia',
            'JP': 'Japan',
            'CN': 'China',
            'IN': 'India',
            'BR': 'Brazil',
            'RU': 'Russia',
            'KR': 'South Korea',
            'MX': 'Mexico',
            'ES': 'Spain',
            'IT': 'Italy',
            'NL': 'Netherlands',
            'TR': 'Turkey',
            'AR': 'Argentina',
            'PL': 'Poland',
            'IR': 'Iran',
            'KP': 'North Korea',
            'NO': 'Norway',
            'SE': 'Sweden',
            'CH': 'Switzerland',
            'AT': 'Austria',
            'BE': 'Belgium',
            'DK': 'Denmark',
            'FI': 'Finland',
            'GR': 'Greece',
            'IE': 'Ireland',
            'PT': 'Portugal',
            'CZ': 'Czech Republic',
            'HU': 'Hungary',
            'RO': 'Romania',
            'UA': 'Ukraine',
            'EG': 'Egypt',
            'IL': 'Israel',
            'SA': 'Saudi Arabia',
            'AE': 'United Arab Emirates',
            'ZA': 'South Africa',
            'NG': 'Nigeria',
            'KE': 'Kenya',
            'BD': 'Bangladesh',
            'PK': 'Pakistan',
            'ID': 'Indonesia',
            'PH': 'Philippines',
            'VN': 'Vietnam',
            'TH': 'Thailand',
            'MY': 'Malaysia',
            'SG': 'Singapore',
            'HK': 'Hong Kong',
            'TW': 'Taiwan',
            'NZ': 'New Zealand'
        };
        
        return codes[code.toUpperCase()] || code;
    }

    async function fetchWhoisCountry(domain) {
        // Check cache
        const cached = WHOIS_CACHE.get(domain);
        if (cached && Date.now() - cached.timestamp < WHOIS_CACHE_TIME) {
            return cached.country;
        }
        
        try {
            // Using whoisjsonapi.com (free tier: 500 requests/day) with timeout
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(`https://whoisjsonapi.com/v1/${domain}`, {
                signal: controller.signal
            });
            clearTimeout(timeout);
            
            const data = await response.json();
            
            // Try multiple country fields
            let country = data.registrant_country || 
                         data.admin_country || 
                         data.tech_country ||
                         data.country;
            
            // Validate country value
            if (country && (typeof country !== 'string' || country.length > 100)) {
                throw new Error('Invalid country value');
            }
            
            if (country) {
                // Convert country code to full name if needed
                country = convertCountryCode(country);
                
                WHOIS_CACHE.set(domain, {
                    country: country,
                    timestamp: Date.now()
                });
                return country;
            }
        } catch (e) {
            // Silently fail - WHOIS lookups may not work for all domains
        }
        
        return null;
    }

    async function fetchDNSCountry(domain) {
        try {
            // Use DNS-over-HTTPS to get nameserver info with timeout
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(
                `https://cloudflare-dns.com/dns-query?name=${domain}&type=NS`,
                {
                    headers: {
                        'Accept': 'application/dns-json'
                    },
                    signal: controller.signal
                }
            );
            clearTimeout(timeout);
            
            const data = await response.json();
            
            // Validate response structure
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid DNS response');
            }
            
            if (data.Answer && Array.isArray(data.Answer) && data.Answer.length > 0) {
                const nameserver = data.Answer[0].data;
                
                // Validate nameserver data
                if (typeof nameserver !== 'string' || nameserver.length > 500) {
                    throw new Error('Invalid nameserver data');
                }
                
                // Common nameserver to country mapping
                const nsPatterns = {
                    'chinanet': 'China',
                    'dnspod': 'China',
                    'dns.cn': 'China',
                    'yandex.ru': 'Russia',
                    'dns.ru': 'Russia',
                    'cloudflare': 'United States',
                    'googledomains': 'United States',
                    'awsdns': 'United States',
                    'azure': 'United States',
                    'nsone': 'United States',
                    'dnsimple': 'United States',
                    'namecheap': 'United States',
                    'godaddy': 'United States'
                };
                
                for (const [pattern, country] of Object.entries(nsPatterns)) {
                    if (nameserver.toLowerCase().includes(pattern)) {
                        return country;
                    }
                }
            }
        } catch (e) {
            // Silently fail - DNS lookups may not work for all domains
        }
        
        return null;
    }

    // Check if a country is blocked
    function isCountryBlocked(country) {
        try {
            // Sanitize country name for localStorage key
            const safeCountry = country.replace(/[^a-zA-Z0-9 ]/g, '');
            const stored = localStorage.getItem('geoblock_' + safeCountry);
            return stored === 'true';
        } catch (e) {
            return false;
        }
    }

    // Toggle country blocking
    function toggleCountry(country) {
        const currentState = isCountryBlocked(country);
        try {
            // Sanitize country name for localStorage key
            const safeCountry = country.replace(/[^a-zA-Z0-9 ]/g, '');
            localStorage.setItem('geoblock_' + safeCountry, String(!currentState));
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
                    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
                    
                    // Skip search engine redirect/tracking domains
                    if (hostname.includes('duckduckgo.com') ||
                        hostname.includes('google.com') ||
                        hostname.includes('bing.com') ||
                        hostname.includes('yahoo.com') ||
                        hostname.includes('links.')) {
                        return null;
                    }
                    
                    return hostname;
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
                    
                    // Skip search engine domains
                    if (domain.includes('duckduckgo.com') ||
                        domain.includes('google.com') ||
                        domain.includes('bing.com') ||
                        domain.includes('yahoo.com') ||
                        domain.includes('links.')) {
                        continue;
                    }
                    
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
                        const domain = simpleMatch[1].toLowerCase();
                        // Skip search engine domains
                        if (domain.includes('duckduckgo') || 
                            domain.includes('google') || 
                            domain.includes('bing')) {
                            continue;
                        }
                        return domain;
                    }
                }
            }

        } catch (e) {
            console.error('Error extracting domain:', e);
        }

        return null;
    }

    

    
// Enhanced TLD checking
function getDomainCountry(domain) {
    if (!domain) return null;
    
    // Check known domains first
    if (knownDomains[domain]) {
        return knownDomains[domain];
    }
    
    // Check for multi-level TLDs (e.g., co.uk, com.au)
    const parts = domain.split('.');
    if (parts.length >= 3) {
        const multiTLD = parts.slice(-2).join('.');
        for (const country in countryTLDs) {
            if (countryTLDs[country].tlds.includes(multiTLD)) {
                return country;
            }
        }
    }
    
    // Check single TLD
    const tld = parts[parts.length - 1];
    for (const country in countryTLDs) {
        if (countryTLDs[country].tlds.includes(tld)) {
            return country;
        }
    }
    
    // Check custom blocklist
    const blocklist = getCustomBlocklist();
    for (const blockedDomain of blocklist) {
        if (domain === blockedDomain || domain.endsWith('.' + blockedDomain)) {
            return 'Custom Blocked';
        }
    }
    
    return null;
}

// Domain country detection with API fallback
async function getDomainCountryWithFallback(domain) {
    // Try local detection first (fast)
    let country = getDomainCountry(domain);
    
    if (country) {
        return country;
    }
    
    // Fallback to geolocation API with rate limiting (slower but more accurate)
    country = await fetchDomainCountryQueued(domain);
    
    if (country && countryFlags[country]) {
        knownDomains[domain] = country;
        return country;
    }
    
    // Third fallback: DNS nameserver lookup (fast and reliable)
    country = await fetchDNSCountry(domain);
    
    if (country && countryFlags[country]) {
        knownDomains[domain] = country;
        return country;
    }
    
    // Final fallback: WHOIS lookup (slowest but most comprehensive)
    country = await fetchWhoisCountry(domain);
    
    // If found via WHOIS, add to known domains for future
    if (country && countryFlags[country]) {
        knownDomains[domain] = country;
    }
    
    return country;
}

    // Get custom blocked domains
    function getCustomBlocklist() {
        try {
            const stored = localStorage.getItem('geoblock_custom_domains') || '[]';
            const parsed = JSON.parse(stored);
            // Validate array
            if (!Array.isArray(parsed)) {
                return [];
            }
            return parsed;
        } catch (e) {
            return [];
        }
    }

    // Save custom blocked domains
    function saveCustomBlocklist(domains) {
        try {
            // Validate and sanitize domains array
            if (!Array.isArray(domains)) {
                throw new Error('Invalid domains list');
            }
            // Sanitize each domain (basic validation)
            const safeDomains = domains.filter(d => 
                typeof d === 'string' && 
                d.length > 0 && 
                d.length < 255 &&
                /^[a-zA-Z0-9.-]+$/.test(d)
            );
            localStorage.setItem('geoblock_custom_domains', JSON.stringify(safeDomains));
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
        
        // Try multiple methods in order of reliability
        const selectors = [
            'cite', '.VuuXrf', '.TbwUpd', '.result-url', '.result__url',
            '[data-testid="result-extras-url-link"]',
            '.result__a span', // DuckDuckGo display URL
            'a[data-testid="result-title-a"] + div', // DuckDuckGo newer layout
            '.tdi', // Bing
            '.fz6Zhf', // Google newer
            'a[href] span.cite', // Generic
        ];
        
        for (const selector of selectors) {
            const element = result.querySelector(selector);
            if (element && element.textContent.trim()) {
                const text = element.textContent.trim();
                // Skip if it's clearly a redirect URL
                if (!text.includes('duckduckgo.com') && !text.includes('google.com') && !text.includes('bing.com')) {
                    return text;
                }
            }
        }
        
        // Fallback: get actual href and extract domain (but skip redirect domains)
        const link = result.querySelector('a[href]');
        if (link && link.href) {
            try {
                const url = new URL(link.href);
                const domain = url.hostname.toLowerCase();
                // Skip search engine redirect domains
                if (!domain.includes('duckduckgo.com') && 
                    !domain.includes('google.com') && 
                    !domain.includes('bing.com') &&
                    !domain.includes('yahoo.com')) {
                    return domain;
                }
            } catch (e) {
                // Invalid URL
            }
        }
        
        return null;
    }

    // Filter search results
    async function filterResults() {
        const selectors = getResultSelectors();
        
        for (const selector of selectors) {
            const results = document.querySelectorAll(selector);
            
            for (const result of results) {
                if (result.hasAttribute('data-geoblock-checked')) continue;
                result.setAttribute('data-geoblock-checked', 'true');

                const displayURL = getDisplayURL(result);
                
                if (displayURL) {
                    const domain = extractDomain(displayURL);
                    
                    if (domain) {
                        // Use async version with API fallback
                        const country = await getDomainCountryWithFallback(domain);
                        
                        if (country && countryFlags[country]) {
                            addFlagIndicator(result, country);
                            
                            if (isCountryBlocked(country)) {
                                blockResult(result, country);
                            }
                        } else if (country === 'Custom Blocked') {
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

    // ========================================
    // CONSOLE ANALYSIS FUNCTIONS
    // ========================================
    //
    // How to Use in Browser Console:
    // After a search, open the browser console (F12) and run:
    //
    // View all failed lookups in a nice table:
    //   geoBlockFailedLookups()
    //
    // Get detailed analysis with error breakdown:
    //   geoBlockAnalyzeFailed()
    //
    // Export failed domains as CSV:
    //   geoBlockExportFailed()
    //
    // Get list for manual mapping:
    //   geoBlockGetUnmappedDomains()
    //
    // Test a specific domain:
    //   await geoBlockTestDomain('weathergeeks.org')
    //
    // View cache stats:
    //   geoBlockCacheStats()
    //
    // Clear the failed lookups log:
    //   geoBlockClearFailed()
    //
    // ----------------------------------------
    // Example Console Output:
    // ----------------------------------------
    // After running geoBlockAnalyzeFailed()
    //
    // 📈 Failed Lookup Analysis
    // Total failed domains: 8
    //
    // 🔸 Domains: weathergeeks.org, vedantu.com, wikiwand.com,
    //   cambridge.org, biolecta.com, sunlight.net, britannica.com
    //
    // 🔸 Error Types: {
    //   "TimeoutError": 3,
    //   "AbortError": 2,
    //   "NetworkError": 3
    // }
    //
    // 🔸 HTTP Status Codes: {
    //   "429": 2,  // Rate limited
    //   "503": 1   // Service unavailable
    // }
    //
    // NOTE: All console functions are defined at the bottom of the script
    //       after init() to ensure they load properly.
    // ========================================

    // Initialize
    function init() {
        // Privacy notice on first run
        try {
            if (!localStorage.getItem('geoblock_privacy_notice')) {
                const userConsent = confirm(
                    'GeoBlock Privacy Notice:\n\n' +
                    'This extension sends domain names from search results to external geolocation APIs ' +
                    '(ipapi.co, cloudflare-dns.com, whoisjsonapi.com) to determine their country of origin. ' +
                    'No personal data is sent.\n\n' +
                    'Do you want to continue using GeoBlock?'
                );
                if (userConsent) {
                    localStorage.setItem('geoblock_privacy_notice', 'true');
                } else {
                    // User declined, don't run the script
                    return;
                }
            }
        } catch (e) {
            // If localStorage fails, continue anyway
        }

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
    
    // Console Analysis Functions - All defined here for guaranteed accessibility
    
    // View all failed lookups
    window.geoBlockFailedLookups = function() {
        console.group('🔴 Failed Geolocation Lookups');
        console.table(FAILED_LOOKUPS.map(f => ({
            Domain: f.domain,
            Time: new Date(f.timestamp).toLocaleTimeString(),
            Attempts: f.attempts.length,
            LastError: f.attempts[f.attempts.length - 1]?.error || f.attempts[f.attempts.length - 1]?.status || 'Unknown'
        })));
        console.groupEnd();
        return FAILED_LOOKUPS;
    };

    // Export failed domains as CSV
    window.geoBlockExportFailed = function() {
        const csv = ['Domain,Timestamp,Error'].concat(
            FAILED_LOOKUPS.map(f => 
                `${f.domain},${f.timestamp},${JSON.stringify(f.attempts).replace(/,/g, ';')}`
            )
        ).join('\n');
        
        console.log('📋 Copy this CSV data:\n\n' + csv);
        
        // Also copy to clipboard if possible
        if (navigator.clipboard) {
            navigator.clipboard.writeText(csv);
            console.log('✅ Copied to clipboard!');
        }
        
        return csv;
    };

    // View detailed error breakdown
    window.geoBlockAnalyzeFailed = function() {
        const errorTypes = {};
        const statusCodes = {};
        const domains = [];
        
        FAILED_LOOKUPS.forEach(lookup => {
            domains.push(lookup.domain);
            lookup.attempts.forEach(attempt => {
                if (attempt.error) {
                    errorTypes[attempt.errorType] = (errorTypes[attempt.errorType] || 0) + 1;
                }
                if (attempt.status) {
                    statusCodes[attempt.status] = (statusCodes[attempt.status] || 0) + 1;
                }
            });
        });
        
        console.group('📈 Failed Lookup Analysis');
        console.log('Total failed domains:', FAILED_LOOKUPS.length);
        console.log('\n🔸 Domains:', domains.join(', '));
        console.log('\n🔸 Error Types:', errorTypes);
        console.log('\n🔸 HTTP Status Codes:', statusCodes);
        console.groupEnd();
        
        return {
            total: FAILED_LOOKUPS.length,
            domains: domains,
            errorTypes: errorTypes,
            statusCodes: statusCodes
        };
    };

    // Get domains that need manual mapping
    window.geoBlockGetUnmappedDomains = function() {
        const domains = FAILED_LOOKUPS.map(f => f.domain);
        console.group('🌐 Domains Needing Manual Mapping');
        console.log('Add these to your knownDomains object:');
        console.log('\n// In knownDomains:');
        domains.forEach(domain => {
            console.log(`'${domain}': 'COUNTRY_NAME_HERE',`);
        });
        console.groupEnd();
        return domains;
    };

    // Clear failed lookups log
    window.geoBlockClearFailed = function() {
        const count = FAILED_LOOKUPS.length;
        FAILED_LOOKUPS.length = 0;
        console.log(`🗑️ Cleared ${count} failed lookups`);
    };

    // View cache statistics
    window.geoBlockCacheStats = function() {
        const now = Date.now();
        const geoStats = {
            total: GEOLOCATION_CACHE.size,
            fresh: 0,
            stale: 0
        };
        const whoisStats = {
            total: WHOIS_CACHE.size,
            fresh: 0,
            stale: 0
        };
        
        GEOLOCATION_CACHE.forEach((value, key) => {
            if (now - value.timestamp < GEOLOCATION_CACHE_TIME) {
                geoStats.fresh++;
            } else {
                geoStats.stale++;
            }
        });
        
        WHOIS_CACHE.forEach((value, key) => {
            if (now - value.timestamp < WHOIS_CACHE_TIME) {
                whoisStats.fresh++;
            } else {
                whoisStats.stale++;
            }
        });
        
        console.group('📦 Cache Statistics');
        console.log('Geolocation Cache:', geoStats);
        console.log('WHOIS Cache:', whoisStats);
        console.log('Known Domains:', Object.keys(knownDomains).length);
        console.groupEnd();
        
        return { geolocation: geoStats, whois: whoisStats, knownDomains: Object.keys(knownDomains).length };
    };

    // Test a specific domain
    window.geoBlockTestDomain = async function(domain) {
        console.log(`🔍 Testing: ${domain}`);
        const country = await getDomainCountryWithFallback(domain);
        console.log(`Result: ${country || '❌ Not found'}`);
        return country;
    };
    
    // Debugging functions for failed lookups (legacy compatibility)
    window.geoBlockDebug = {
        getFailedLookups: () => {
            console.table(FAILED_LOOKUPS);
            return FAILED_LOOKUPS;
        },
        clearFailedLookups: () => {
            FAILED_LOOKUPS.length = 0;
            console.log('✓ Cleared failed lookups log');
        },
        exportFailedLookups: () => {
            const data = JSON.stringify({
                exportTime: new Date().toISOString(),
                totalFailed: FAILED_LOOKUPS.length,
                lookups: FAILED_LOOKUPS
            }, null, 2);
            console.log(data);
            return data;
        }
    };
})();