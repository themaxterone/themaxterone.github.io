---
layout: single
title: Script-IpAbuseIP
excerpt: "Python Script to use AbuseIP via API"
date: 2026-10-18
classes: wide
header:
  icon: /assets/images/scripts/script.webp
  teaser_home_page: true
  teaser: /assets/images/scripts/script.png
categories:
  - Scripts
tags:
  - Script
  - Python

---



[Repository](https://github.com/themaxterone/AbuseIP-Search-Script)

[ipsaercher.py bash script](https://github.com/themaxterone/AbuseIP-Search-Script/blob/main/ipsaercher.py) 


A comprehensive Python utility to inspect single IP addresses or process bulk IP lists against the **AbuseIPDB API v2**. It displays detailed information and color-coded risk bars directly in the terminal and automatically generates an interactive HTML dashboard with client-side searching and risk-based filtering.

1. **Query Engine**: Connects via HTTPS to the official AbuseIPDB endpoint (`https://api.abuseipdb.com/api/v2/check`) using your private API key.
2. **Category Normalization**: Parses numerical attack category IDs returned by the API (e.g., SSH, Port Scan, Brute-Force, Bad Web Bot) and translates them into human-readable labels.
3. **Regex Extraction**: When given a text file, a regular expression extracts valid IPv4 addresses and discards duplicates while preserving order.
4. **Interactive Dashboard**: The generated `.html` file is completely standalone (no external CSS/JS frameworks required) and can be opened in any web browser.

Example of result:

```
=================================================================
 AbuseIPDB Lookup Result: 8.8.8.8
=================================================================
 Location     : US
 ISP          : Google LLC
 Domain       : google.com
 Total Reports: 0 (Last 90 days)
 Last Reported: Never

 Malicious Score (Abuse Confidence):
 [------------------------------] 0%

 Reported Attack Categories:
  - None (IP clean / No reports)
=================================================================
```
