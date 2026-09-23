export const networkingData = {
  id: "networking",
  title: "Networking & CLI Tools",
  subtitle: "Essential CLI utilities for network diagnostics, DNS queries, HTTP requests, remote connectivity, and Active Directory inspection.",
  items: [
    {
      id: "nslookup",
      name: "nslookup",
      category: "DNS Diagnostics",
      summary: "Queries Domain Name System (DNS) servers to find IP addresses corresponding to domain names or vice versa.",
      why: "To verify if DNS resolution is working correctly, identify canonical server names, troubleshoot domain name errors, or audit MX (Mail Exchange) and TXT records.",
      outcome: "Returns the authoritative DNS server address, resolved IP addresses (A/AAAA records), TTL (Time to Live), and CNAME aliasing details.",
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
          explanation: "Finds the mail servers responsible for accepting emails for github.com."
        },
        {
          title: "Query Using Custom DNS Server (e.g. Cloudflare 1.1.1.1)",
          command: "nslookup dev.to 1.1.1.1",
          explanation: "Queries Cloudflare's public DNS server instead of local router/ISP DNS to test propagation."
        }
      ],
      sampleOutput: `; Non-authoritative answer:
Name:    google.com
Addresses:  2607:f8b0:4004:839::200e
          142.250.190.46`,
      useCases: [
        "Troubleshooting 'Server Not Found' or 'DNS_PROBE_FINISHED_NXDOMAIN' browser errors.",
        "Verifying newly configured custom domain DNS A/CNAME records on Netlify or Vercel.",
        "Checking SPF/DKIM TXT records for email domain authentication."
      ]
    },
    {
      id: "curl",
      name: "curl",
      category: "HTTP & Transfer Utility",
      summary: "Transfer data to or from a server using protocols such as HTTP, HTTPS, FTP, SFTP, and REST APIs.",
      why: "Essential for testing web endpoints, inspecting HTTP response headers, downloading files, sending API payloads, and debugging authentication without opening a browser.",
      outcome: "Prints response headers, HTTP status code (200, 404, 500), raw JSON/HTML payload response body, or saves output to a file.",
      syntax: "curl [options] <url>",
      examples: [
        {
          title: "Inspect Response Headers & Status Code",
          command: "curl -I https://api.github.com",
          explanation: "-I fetches only the HTTP headers without downloading the body content."
        },
        {
          title: "Send JSON POST Request with Headers",
          command: `curl -X POST https://httpbin.org/post -H "Content-Type: application/json" -d '{"username":"dev", "role":"admin"}'`,
          explanation: "Sends a JSON body payload via POST request."
        },
        {
          title: "Follow HTTP Redirects & Download File",
          command: "curl -L -O https://github.com/cli/cli/releases/download/v2.40.0/gh_2.40.0_linux_amd64.tar.gz",
          explanation: "-L follows 301/302 redirects, -O saves the file locally using the remote name."
        }
      ],
      sampleOutput: `HTTP/2 200 
server: GitHub.com
date: Wed, 23 Sep 2026 19:20:00 GMT
content-type: application/json; charset=utf-8
x-ratelimit-limit: 60
x-ratelimit-remaining: 58`,
      useCases: [
        "Testing REST API endpoints during backend microservice development.",
        "Automating file downloads in CI/CD pipeline shell scripts.",
        "Testing SSL/TLS certificates and TLS negotiation issues."
      ]
    },
    {
      id: "telnet",
      name: "telnet",
      category: "Port Connectivity Test",
      summary: "Establishes a bidirectional interactive text-oriented communication channel over a TCP port.",
      why: "Primarily used by engineers to test if a specific TCP port (e.g. 80, 443, 22, 3306, 5432) is open and accessible through firewalls.",
      outcome: "A successful connection shows a blank screen or server banner (indicating port is OPEN). A failure displays 'Connection refused' or 'Timed out' (indicating BLOCKED or CLOSED port).",
      syntax: "telnet <hostname-or-ip> <port-number>",
      examples: [
        {
          title: "Test Database Port Connection",
          command: "telnet db.internal-network.com 5432",
          explanation: "Checks if your application server can reach the PostgreSQL database on TCP port 5432."
        },
        {
          title: "Test Web Server HTTP Port",
          command: "telnet example.com 80",
          explanation: "Tests TCP handshake on port 80. Once connected, typing 'GET / HTTP/1.1' followed by Enter will return the web page."
        }
      ],
      sampleOutput: `Trying 93.184.216.34...
Connected to example.com.
Escape character is '^]'.`,
      useCases: [
        "Verifying cloud security group / firewall rules between web app servers and database instances.",
        "Troubleshooting SMTP email port connectivity (port 25 or 587).",
        "Confirming service listeners are running on custom ports."
      ]
    },
    {
      id: "net-group-domain",
      name: "net group /domain",
      category: "Windows Active Directory",
      summary: "Windows command-line tool that lists or modifies domain groups in an Active Directory (AD) enterprise domain.",
      why: "Used by system administrators and security auditors to view active security groups, audit admin access, or list members of domain user groups.",
      outcome: "Outputs a list of all domain groups created on the Active Directory Domain Controller (DC).",
      syntax: "net group [groupname] [/domain]",
      examples: [
        {
          title: "List All Groups in Active Directory Domain",
          command: "net group /domain",
          explanation: "Queries the Active Directory DC for all group names in the enterprise."
        },
        {
          title: "List Members of Domain Admins Group",
          command: 'net group "Domain Admins" /domain',
          explanation: "Displays all user accounts that hold privileged Domain Admin permissions."
        }
      ],
      sampleOutput: `Group name     Domain Admins
Comment        Designated administrators of the domain

Members:
-------------------------------------------------------------------------------
Administrator            sec_audit_admin          srv_backup_acc
The command completed successfully.`,
      useCases: [
        "Auditing user privileges and privileged accounts in corporate Windows AD environments.",
        "Verifying user group membership during onboarding or security compliance checks."
      ]
    },
    {
      id: "ping",
      name: "ping",
      category: "Network Reachability",
      summary: "Sends ICMP (Internet Control Message Protocol) Echo Request packets to a target IP host to test connectivity.",
      why: "To determine if a remote host is online, measure round-trip time (RTT latency in milliseconds), and check packet loss.",
      outcome: "Displays ICMP response time in ms and percentage of lost packets.",
      syntax: "ping [options] <ip-or-domain>",
      examples: [
        {
          title: "Ping Target 4 Times",
          command: "ping -c 4 8.8.8.8",
          explanation: "Sends 4 ICMP requests to Google Public DNS to test connectivity."
        }
      ],
      sampleOutput: `64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=13.8 ms
--- 8.8.8.8 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss`,
      useCases: [
        "First step diagnostic when Internet connectivity or server access fails.",
        "Measuring network latency spikes between regional data centers."
      ]
    },
    {
      id: "traceroute",
      name: "traceroute / tracert",
      category: "Path & Route Mapping",
      summary: "Traces the path that network packets take from your machine to a destination host, listing every intermediate router (hop).",
      why: "Identifies exactly which router, ISP gateway, or network hop is causing packet drops, high latency, or routing loops.",
      outcome: "Lists each hop number, router IP/hostname, and latency response times.",
      syntax: "traceroute <target-domain>  (Linux/macOS)  |  tracert <target-domain> (Windows)",
      examples: [
        {
          title: "Trace Route to Remote Server",
          command: "traceroute 1.1.1.1",
          explanation: "Shows all intermediate routers between your device and Cloudflare's 1.1.1.1 DNS."
        }
      ],
      sampleOutput: `1  192.168.1.1 (192.168.1.1)  1.234 ms
2  10.250.0.1 (10.250.0.1)  8.412 ms
3  172.16.4.12 (172.16.4.12)  12.105 ms
4  1.1.1.1 (1.1.1.1)  14.501 ms`,
      useCases: [
        "Pinpointing ISP or VPN routing congestion.",
        "Diagnosing BGP routing issues and cloud interconnect drops."
      ]
    }
  ]
};
