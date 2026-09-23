export const networkingData = {
  id: "networking",
  title: "Networking & CLI Tools — Complete Reference",
  subtitle: "Master essential CLI utilities for DNS diagnostics, HTTP testing, port connectivity, network path tracing, Active Directory inspection, and system network configuration.",
  usefulLinks: [
    { label: "DNS Lookup Tool (Online)", url: "https://www.nslookup.io/" },
    { label: "curl Documentation", url: "https://curl.se/docs/manpage.html" },
    { label: "HTTP Status Codes Reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" },
    { label: "IANA Port Number Registry", url: "https://www.iana.org/assignments/service-names-port-numbers" },
    { label: "Wireshark Network Analyzer", url: "https://www.wireshark.org/" },
    { label: "What Is My IP", url: "https://whatismyipaddress.com/" },
    { label: "SSL Labs Server Test", url: "https://www.ssllabs.com/ssltest/" },
    { label: "Cloudflare Learning Center", url: "https://www.cloudflare.com/learning/" }
  ],
  items: [
    {
      id: "nslookup",
      name: "nslookup",
      category: "DNS Diagnostics",
      summary: "Queries Domain Name System (DNS) servers to find IP addresses corresponding to domain names or vice versa. Can query A, AAAA, MX, TXT, CNAME, NS, SOA, and PTR record types.",
      why: "To verify if DNS resolution is working correctly, identify canonical server names, troubleshoot domain name errors, audit MX (Mail Exchange) and TXT records, or check DNS propagation after changing nameservers.",
      outcome: "Returns the authoritative DNS server address, resolved IP addresses (A/AAAA records), TTL (Time to Live), CNAME aliasing details, MX mail exchange priorities, and TXT verification records.",
      syntax: "nslookup [options] <domain-name> [dns-server]",
      examples: [
        {
          title: "Basic Domain Lookup",
          command: "nslookup google.com",
          explanation: "Resolves google.com into IPv4 and IPv6 addresses using your default DNS server."
        },
        {
          title: "Query Specific Record Type (MX Mail Servers)",
          command: "nslookup -type=MX github.com",
          explanation: "Finds the mail servers responsible for accepting emails for github.com. Useful for verifying SPF/DKIM email authentication."
        },
        {
          title: "Query Using Custom DNS Server (Cloudflare 1.1.1.1)",
          command: "nslookup dev.to 1.1.1.1",
          explanation: "Queries Cloudflare's public DNS instead of local router/ISP DNS to test if a DNS record has propagated globally."
        },
        {
          title: "Query TXT Records (SPF/DKIM Verification)",
          command: "nslookup -type=TXT google.com",
          explanation: "Shows TXT records used for domain ownership verification, SPF email authentication, and DKIM signing."
        },
        {
          title: "Reverse DNS Lookup (IP → Hostname)",
          command: "nslookup 8.8.8.8",
          explanation: "Reverse lookup converts an IP address back to its hostname (e.g., dns.google)."
        }
      ],
      sampleOutput: `Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
Name:    google.com
Addresses:  2607:f8b0:4004:839::200e
          142.250.190.46`,
      useCases: [
        "Troubleshooting 'Server Not Found' or 'DNS_PROBE_FINISHED_NXDOMAIN' browser errors.",
        "Verifying newly configured custom domain DNS A/CNAME records on Netlify, Vercel, or GitHub Pages.",
        "Checking SPF/DKIM TXT records for email domain authentication.",
        "Testing DNS propagation after migrating nameservers to Cloudflare or Route 53.",
        "Diagnosing split-horizon DNS in corporate VPN environments."
      ]
    },
    {
      id: "curl",
      name: "curl",
      category: "HTTP & Data Transfer",
      summary: "Transfer data to or from a server using protocols such as HTTP, HTTPS, FTP, SFTP, and REST APIs. Supports custom headers, authentication, cookies, SSL/TLS, file uploads, and proxies.",
      why: "Essential for testing web endpoints, inspecting HTTP response headers and status codes, downloading files, sending API payloads, debugging authentication, testing SSL certificates, and automating API calls in scripts.",
      outcome: "Prints response headers, HTTP status code (200, 301, 404, 500), raw JSON/HTML response body, SSL certificate details, and timing metrics.",
      syntax: "curl [options] <url>",
      examples: [
        {
          title: "Inspect Response Headers & Status Code",
          command: "curl -I https://api.github.com",
          explanation: "-I fetches only the HTTP headers without downloading the body. Shows status code, content-type, rate limits, and cache headers."
        },
        {
          title: "Send JSON POST Request with Headers",
          command: `curl -X POST https://httpbin.org/post \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \\
  -d '{"username":"dev", "role":"admin", "active": true}'`,
          explanation: "Sends a JSON body payload via POST request with Bearer token authentication."
        },
        {
          title: "Follow HTTP Redirects & Download File",
          command: "curl -L -O https://github.com/cli/cli/releases/download/v2.40.0/gh_2.40.0_linux_amd64.tar.gz",
          explanation: "-L follows 301/302 redirects, -O saves the file locally using the remote filename."
        },
        {
          title: "Verbose Mode (Debug TLS Handshake & Connection)",
          command: "curl -v https://api.github.com 2>&1 | head -30",
          explanation: "-v shows the full TCP connection, TLS handshake, certificate chain, and HTTP negotiation details."
        },
        {
          title: "Measure Request Timing (DNS, Connect, TTFB)",
          command: `curl -o /dev/null -s -w "DNS: %{time_namelookup}s\\nConnect: %{time_connect}s\\nTTFB: %{time_starttransfer}s\\nTotal: %{time_total}s\\n" https://api.github.com`,
          explanation: "Measures DNS resolution time, TCP connection time, Time-To-First-Byte, and total request duration."
        }
      ],
      sampleOutput: `HTTP/2 200 
server: GitHub.com
date: Wed, 23 Sep 2026 19:20:00 GMT
content-type: application/json; charset=utf-8
cache-control: public, max-age=60
x-ratelimit-limit: 60
x-ratelimit-remaining: 58
x-ratelimit-reset: 1695496800`,
      useCases: [
        "Testing REST API endpoints during backend development and debugging.",
        "Automating file downloads in CI/CD pipeline shell scripts.",
        "Testing SSL/TLS certificates and verifying HTTPS configuration.",
        "Sending webhook payloads to test GitHub/Slack/Stripe integrations.",
        "Performance benchmarking HTTP endpoint response times."
      ]
    },
    {
      id: "telnet",
      name: "telnet",
      category: "TCP Port Connectivity",
      summary: "Establishes a bidirectional interactive text-oriented communication channel over a raw TCP port. Primarily used to test if a specific TCP port is open and accessible through firewalls and security groups.",
      why: "When you need to verify TCP-level connectivity between servers (e.g., can my app server reach the database on port 5432?). telnet tests the raw TCP handshake without any application protocol overhead.",
      outcome: "A successful connection shows a blank screen or server banner (port is OPEN). 'Connection refused' means service is not listening. 'Timed out' means a firewall or security group is BLOCKING the port.",
      syntax: "telnet <hostname-or-ip> <port-number>",
      examples: [
        {
          title: "Test Database Port Connectivity",
          command: "telnet db.internal-network.com 5432",
          explanation: "Tests if your application server can reach PostgreSQL on TCP port 5432 through network firewalls."
        },
        {
          title: "Test Web Server HTTP Port",
          command: "telnet example.com 80",
          explanation: "Tests TCP handshake on port 80. Once connected, typing 'GET / HTTP/1.1\\nHost: example.com\\n\\n' returns the web page."
        },
        {
          title: "Test SMTP Email Server Port",
          command: "telnet smtp.gmail.com 587",
          explanation: "Verifies if your server can reach Gmail's SMTP relay on port 587 for sending transactional emails."
        },
        {
          title: "Test Redis Cache Port",
          command: "telnet redis-primary.internal 6379",
          explanation: "Checks if the Redis cache server is reachable on port 6379 from the application tier."
        }
      ],
      sampleOutput: `Trying 93.184.216.34...
Connected to example.com.
Escape character is '^]'.`,
      useCases: [
        "Verifying cloud security group / VPC firewall rules between web app servers and database instances.",
        "Troubleshooting SMTP email port connectivity (port 25, 465, or 587).",
        "Confirming service listeners are running on custom ports after deployment.",
        "Diagnosing connectivity issues between Kubernetes pods and external services.",
        "Testing if corporate proxy/firewall blocks specific outbound ports."
      ]
    },
    {
      id: "net-group-domain",
      name: "net group /domain",
      category: "Windows Active Directory",
      summary: "Windows command-line tool that lists or modifies domain groups in an Active Directory (AD) enterprise domain. Shows security groups, distribution groups, and their members on the Domain Controller.",
      why: "Used by system administrators and security auditors to view active security groups, audit privileged admin access (Domain Admins, Enterprise Admins), verify user group membership during onboarding, and identify stale accounts.",
      outcome: "Outputs a list of all domain groups or the members of a specific group created on the Active Directory Domain Controller (DC).",
      syntax: 'net group [groupname] [/domain]  |  net group "Group Name" /domain',
      examples: [
        {
          title: "List All Groups in Active Directory Domain",
          command: "net group /domain",
          explanation: "Queries the Active Directory DC for all group names in the corporate domain."
        },
        {
          title: "List Members of Domain Admins Group",
          command: 'net group "Domain Admins" /domain',
          explanation: "Displays all user accounts that hold the highest Domain Admin privileges."
        },
        {
          title: "List Members of Enterprise Admins",
          command: 'net group "Enterprise Admins" /domain',
          explanation: "Enterprise Admins have forest-wide control — critical for security auditing."
        },
        {
          title: "View Your Own Group Memberships",
          command: "whoami /groups",
          explanation: "Shows all AD security groups that your currently logged-in user account belongs to."
        },
        {
          title: "List All Domain Users",
          command: "net user /domain",
          explanation: "Lists all user accounts in the Active Directory domain."
        }
      ],
      sampleOutput: `The request will be processed at a domain controller for domain CORP.COMPANY.COM.

Group name     Domain Admins
Comment        Designated administrators of the domain

Members:
-------------------------------------------------------------------------------
Administrator            sec_audit_admin          srv_backup_acc
jsmith_admin             cloud_ops_sa
The command completed successfully.`,
      useCases: [
        "Auditing privileged accounts (Domain Admins, Enterprise Admins) for security compliance.",
        "Verifying user group membership during onboarding or access request tickets.",
        "Identifying stale or orphaned service accounts in Active Directory.",
        "Supporting SOX/HIPAA/PCI-DSS compliance audits with group membership reports.",
        "Troubleshooting Windows GPO (Group Policy Object) application issues."
      ]
    },
    {
      id: "ping",
      name: "ping",
      category: "Network Reachability",
      summary: "Sends ICMP (Internet Control Message Protocol) Echo Request packets to a target IP or hostname to test basic network connectivity, measure round-trip time (RTT latency), and detect packet loss.",
      why: "The first-line diagnostic tool when investigating connectivity issues. Determines if a host is online, measures network latency in milliseconds, and identifies packet loss that causes application timeouts.",
      outcome: "Displays ICMP response times in milliseconds, TTL (Time to Live), and percentage of lost packets.",
      syntax: "ping [-c count] [-t timeout] <ip-or-domain>",
      examples: [
        {
          title: "Ping Target 4 Times (Linux/macOS)",
          command: "ping -c 4 8.8.8.8",
          explanation: "Sends 4 ICMP requests to Google Public DNS. On Windows, use 'ping -n 4 8.8.8.8'."
        },
        {
          title: "Continuous Ping Until Stopped",
          command: "ping google.com",
          explanation: "On Windows, pings continuously until Ctrl+C. On Linux/macOS, use 'ping google.com' (also continuous by default)."
        },
        {
          title: "Ping with Timestamp",
          command: "ping -D 8.8.8.8",
          explanation: "-D prints Unix timestamp before each reply — useful for correlating with log files during outage investigation."
        }
      ],
      sampleOutput: `PING 8.8.8.8 (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=117 time=14.2 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=13.8 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=14.1 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=13.9 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 13.8/14.0/14.2/0.2 ms`,
      useCases: [
        "First diagnostic step when Internet connectivity or server access fails.",
        "Measuring network latency spikes between regional data centers or cloud regions.",
        "Monitoring server uptime with continuous ping and alerting on packet loss.",
        "Verifying VPN tunnel connectivity after establishing site-to-site connections.",
        "Testing DNS resolution by pinging domain names vs IP addresses."
      ]
    },
    {
      id: "traceroute",
      name: "traceroute / tracert",
      category: "Network Path & Route Mapping",
      summary: "Traces the path that network packets take from your machine to a destination host, listing every intermediate router (hop) along the route with its IP address, hostname, and round-trip latency.",
      why: "Identifies exactly which router, ISP gateway, or network hop is causing packet drops, high latency, or routing loops. Essential for diagnosing 'slow connection' issues that ping alone cannot explain.",
      outcome: "Sequential list of each hop number, router IP/hostname, and three latency measurements (in ms). Asterisks (*) indicate packet loss or firewall-filtered hops.",
      syntax: "traceroute <target>  (Linux/macOS)  |  tracert <target> (Windows)",
      examples: [
        {
          title: "Trace Route to Cloudflare DNS",
          command: "traceroute 1.1.1.1",
          explanation: "Shows all intermediate routers between your device and Cloudflare's 1.1.1.1 DNS resolver."
        },
        {
          title: "Trace Route Using TCP Instead of ICMP",
          command: "traceroute -T -p 443 google.com",
          explanation: "-T uses TCP SYN packets on port 443 instead of UDP/ICMP. Useful when ICMP is blocked by firewalls."
        }
      ],
      sampleOutput: `traceroute to 1.1.1.1 (1.1.1.1), 30 hops max, 60 byte packets
 1  gateway (192.168.1.1)           1.234 ms  1.102 ms  1.098 ms
 2  isp-router (10.250.0.1)         8.412 ms  8.301 ms  8.256 ms
 3  core-router (172.16.4.12)      12.105 ms 12.042 ms 11.998 ms
 4  cloudflare (1.1.1.1)           14.501 ms 14.389 ms 14.321 ms`,
      useCases: [
        "Pinpointing ISP or VPN routing congestion causing slow connections.",
        "Diagnosing BGP routing issues and asymmetric paths between cloud regions.",
        "Identifying firewall-blocked hops (shown as * * * timeouts).",
        "Verifying traffic path through corporate proxy or VPN tunnels.",
        "Troubleshooting cloud interconnect and peering link problems."
      ]
    }
  ]
};
