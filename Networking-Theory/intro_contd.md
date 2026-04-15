## Ports

Port numbers are of 16 bits, therefore 2^16 ~ 65000 ports are available. 
- 0 - 1023 ports (aka system ports or well-known ports) are reserved, e.g. http uses port 80 . To use these ports we might require our app to be run with root privileges (i.e. using **sudo**). Not recommended to be used.

- 1024 - 49151 ports are known as User Ports. They are registered for specific applications, e.g. MongoDB uses 27017, SQL uses 1433

- Remaining ones are dynamic/private/ephemeral ports. They are often used for temporary purposes, and applications can dynamically choose an available port from this range.

- We can listen to multiple applications on a single port if each of those uses different transport layer protocol, e.g. we can run a TCP and UDP app simultaneously on port 8000 .

## Mode of Connection

- Physical: Optical fibre cable, Coaxial Cable
- Wireless: Bluetooth, Wifi, 3G, 4G, 5G etc.

## Important Terms:
Google for more info.

- LAN
- MAN
- WAN

Internet can be defined as a collection of these three.

- SONET : Synchronous Optical Networking, carries data using Optical fibre cables, hence can cover larger distances.

- Frame Relay: It is a way to connect LAN to Internet.
- MODEM
- Tier 1 ISP: In India, Tata
- Tier 2 ISP: In India, Airtel, JIO

- Bus Topology
- Ring Topology
- Star Topology
- Tree Topology : Combination of Bus and Star topologies
- Mesh Topology

Read important CCNA articles [here](https://www.ccnablog.com/lessons/)

## Layered Network Architecture
In developing the layered architecture, the designers broken down the process of transmitting data to its most fundamental elements. They identified and collected related networking functions into discrete groups that became the layers. 

Each layer defines a family of functions unique from those of the other layers. As a result, the designers created architecture that is both comprehensive and flexible. Most importantly, the OSI model allows complete interoperability between otherwise incompatible systems. 

Within a single machine, each layer calls upon the services of the layer just below it. This communication is governed by an agreed-upon series of rules and conventions called protocols. The layered models that are used in modern computer networks are two; the OSI model (Open Systems Interconnection) and the TCP/IP model (Transmission Control Protocol/ Internet Protocol)

### OSI Model

The OSI model is a layered framework for the design of network systems that allows communication between all types of computer systems. It consists of seven separate but related layers, each of which defines a part of the process of moving information across a network.

It has 7 layers, they can be remembered as **Please Do Not Throw Sausage Pizza Away** (in bottom-up manner)

The upper OSI layers are almost always implemented in software; lower layers are a combination of hardware and software, except for the physical layer, which is mostly hardware.

As the data unit moves from one layer to the next, at each layer, a header and possibly a trailer, can be added to the data unit. Commonly, the trailer is added only at datalink layer.

- Application Layer : It contains the software like web browsers, email clients and messaging apps which the user directly communicates with. Protocols like HTTP, HTTPS,FTP, SMTP, DNS etc. are used by this layer. It serves as the interface between the end-user and the network services. 

- Presentation Layer : 
  - It converts the data into a format understandable by the receiving system. E.g. A Windows system sending text using UTF-16 might need translation for a Linux system expecting UTF-8.
  - Reduces file size to optimize bandwidth usage.
  - Ensures secure data transfer by encrypting information before transmission.

- Session Layer : It establishes, maintains, and synchronizes
the interaction among communicating systems.

  - Initiates, maintains, and gracefully closes communication sessions between applications.
  - Dialog control: The session layer allows the communication between two processes to take place in either half duplex (one way at a time) or full-duplex (two ways at a time) mode.
  - Synchronization: The session layer allows a process to add checkpoints, or synchronization points, to a stream of data. 
  - It performs authentication, authorization before establishing the session.
  - Recovers lost data due to network failures and resumes communication.

- Transport Layer :  It is responsible for process-to-process delivery. Uses UDP, TCP, SCTP. The header attached by this layer contains info about the source and destination port number and protocol used (UDP or TCP). It takes care of the following:

  - Segmentation: Data received is divided into small parts aka segments. Each segment contains a sequence number (for reassembling the segments in correct order)

  - Connection Control: The transport layer can be either connectionless (UDP) or connection-oriented (TCP)

  - Flow Control: Like the data link layer, the transport layer is responsible for flow control. 

  - Error Control: Like the data link layer, the transport layer is responsible for error control. 

- Network Layer: The network layer is responsible for the source-to-destination delivery of a packet. Router is present at this layer. IP addressing done in this layer is called logical addressing. It adds a header containing source and destination IP address (4 bytes each), protocol etc. to every segment and forms IP packets (64 kB).

- Datalink Layer: Converts incoming data in manageable data units aka frame. The frame contains header, destination and source MAC address (6-byte each), data, CRC (in the trailer) etc. Switch or hub is present at this layer. It also performs

  - Access Control: Determining which device among multiple connected devices has control over link at any given time. Protocols used are ALOHA, CSMA, CSMA/CA, CSMA/CD.

  - Flow Control: When the buffer, containing incoming data until they are processed, begins to fill up, the receiver must be able to tell the sender to halt transmission until it is once again able to receive. This uses Acknowledgement frames.
  
  - Error Control: Error control is both error detection and error correction. It allows the receiver to inform the sender of any frames lost or damaged in transmission. It is implemented by Automatic Repeat Request (ARQ)

  Some protocols for Flow and Error control are Stop-and-Wait ARQ, Go-Back-N ARQ, Selective Repeat ARQ.

  Some techniques to detect and/or correct errors are Parity Check, Hamming Code, Cyclic Redundancy Check, Checksum. Among these, only Hamming Code can be used for error correction.
  
  - It performs hop-to-hop delivery.

  - Difference b/w Switch & Hub :
  
    - A Hub is not intelligent. When a data frame arrives at any of its port, it basically rebroadcasts that to all the devices connected to it. It works at physical level.

    - However, a Switch is an intelligent device. It can learn and store the physical addresses of the devices that are connected to it. Whenever a data packet arrives, it is only sent to the intended device.
    For more details, checkout [Difference b/w Switch and Hub](https://youtu.be/1z0ULvg_pW8?si=xpCqHKTsz3nkRuQI) and [What is Switch](https://youtu.be/9eH16Fxeb9o?si=pFlWXhD9abzx0ztf)

- Physical Layer: This layer mostly contains hardwares, e.g. cables etc. It converts the frames into signals (electrical, light or radio) for transporting over a physical medium or vice-versa. It is concerned with:
  - the transmission rate (the number of bits sent each second) is defined by the physical layer.
  - physical topology of the network.
  - encoding of bits into electrical or optical signals
  - the mode of transmission e.g. simplex, half-duplex, full-duplex


For detailed explanation, checkout [OSI & TCP/IP Models](https://youtu.be/Pje0l5r7_lk?si=aPpHofugwzi2ZHfZ) and [OSI Model](https://youtu.be/0Rb8AkTEASw?si=UIzr34D5jHXC0w7H) .

Also, checkout [Encapsulation](https://youtu.be/g_-vbdv-wT4?si=843wgQrDQ4D2EZQS)

>The IP address and a port number is collectively called socket address.


### TCP/IP Model
The TCPIIP protocol suite was developed prior to the OSI model. Therefore, the layers in the TCP/IP protocol suite do not exactly match those in the OSI model. The original TCP/IP protocol suite was defined as having four layers:

- host-to-network (equivalent to physical + data-link layers in OSI)
- internet  (equivalent to network layer in OSI)
- transport
- application (equivalent to session + presentation + application in OSI)

TCP/IP is a protocol made up of interactive modules, each of which provides a specific functionality; however, the modules are not necessarily interdependent. Whereas the OSI model specifies which functions belong to each of its layers, the layers of the TCP/IP protocol suite contain relatively independent protocols that can be mixed and matched depending on the needs of the system.

OSI model is not used in the real world. Applications use TCP/IP model for communication. 

## Protocols in TCP/IP

- Physical and Data Link Layer
  At the physical and data link layers, TCPI/IP does not define any specific protocol. It supports all the standard and proprietary protocols.

- Network Layer
  At the network layer (or, more accurately, the internetwork layer), TCP/IP supports the Internetworking Protocol. IP, in turn, uses four supporting protocols: ARP, RARP, ICMP, and IGMP.
  - Internetworking Protocol: The Internetworking Protocol (IP) is the transmission mechanism used by the TCP/IP protocols. It is an unreliable and connectionless protocol- a best-effort delivery service. *Best effort* means that IP provides no error checking or tracking. There is no relation between any two packets. It relies on a higher-level protocol to take care of all these problems. It supports two versions: IPv4 and IPv6

  - ARP: The Address Resolution Protocol (ARP) is used to associate a logical address with a physical address.

  - RARP: The Reverse Address Resolution Protocol (RARP) allows a host to discover its Internet address when it knows only its physical address.

- Transport Layer: Traditionally the transport layer was represented in TCP/IP by two protocols: TCP and UDP. UDP and TCP are transport level protocols responsible for delivery of a message from a process (running program) to another process.

  - UDP: The User Datagram Protocol (UDP) is a simple,connectionless, unreliable transport protocol. In a connectionless service, the packets are sent from one party to another with no need for connection establishment or connection release. The packets may be delayed or lost or may arrive out of sequence. There is no acknowledgment either. Basically, it adds nothing to the to the services of IP except providing process-toprocess communication.

  - TCP: TCP is a connection-oriented protocol; it creates a virtual connection between two TCPs to send data. In addition TCP uses flow and error control mechanisms at the transport level. It uses acknowledgement mechanism to check the safe and sound arrival of data.

  - SCTP: It combines the best features of UDP and TCP. It is a reliable, message-oriented protocol. It allows multi-stream service in each connection. However, TCP uses a single stream. SCTP is used in mobile networks and for streaming media etc.

- Application Layer:
Application layer protocols under TCP/IP are:

  - HTTP : HTTP uses port 80 and TCP in Transport layer. It is the main protocol used to access data on the World Wide Web (WWW). It is a stateless protocol i.e. server will not store any information about the client by default.
    - Different http methods e.g. GET,POST,PUT etc. tell the server what to do with a particular request.

  - DHCP: Dynamic Host Configuration Protocol (DHCP) is a network management protocol that automatically assigns IP addresses and other network configuration settings to devices on a network. It uses UDP as transport layer protocol.

  - FTP : It is the standard mechanism provided by TCP/IP for copying a file from one host to another. It establishes two connections between the hosts. One connection is used for data transfer, the other for control. FTP uses the services of TCP. It needs two TCP connections. The well-known port 21 is used for the control connection and the well-known port 20 for the data connection.

  - HTTPS: HTTPS uses SSL (Secure Sockets Layer) or TLS (Transport Layer Security) to encrypt the data being transmitted. When a browser connects to an HTTPS website, it verifies the server’s SSL/TLS certificate, issued by a trusted Certificate Authority (CA). It ensures that the data exchanged between the client and server is not altered during transmission.
  
  - SMTP - It is used to send emails.
  - POP3 & IMAC - They are used to receive emails.
  - SSH
  - VNC - Virtual Network Control
  - TelNet : It enables users to connect to remote host or device using TelNet client. It uses port 23. 

## Important Terms

- Socket : It can be defined as an interface between a process and the internet.

- Ephemeral Ports: If multiple instances of a process are in use, they will be assigned random port numbers till they are alive.

- Status Codes: When we send request to the server, we need Status Codes to know whether the request was successful or not. Click [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) to read more about it.

- Cookie : It is a unique string stored in the client's browser. When we visit a website for the first time, cookie is set. Thereafter, the browser itself sends the associated cookie with every request to a particular server.

  - Third-Party Cookies: Cookies that are set for urls that we may not have visited yet (due to misuse of cookies by websites we visit).


## How Email Works

To send and receive emails, we use SMTP and POP3  protocols at the Application level. But at the Transport level we use TCP.

- If the sender and receiver are using different clients (e.g. Yahoo and Gmail respectively) for sending emails, in that case
  - Email is first sent to the sender's SMTP server (i.e. Yahoo's SMTP server) first.

  - Then the email is sent to the receiver's SMTP server (i.e. Googles's SMTP server) .

  - Now, the receiver can access the email using his client .

- If sender and receiver are on the same client (e.g. Gmail), the mail is sent directly.

We can use the **Name Server Lookup** command to get the name and IP addresses of the SMTP servers for various domains such as google, yahoo etc. E.g.,

```
PS C:\Users\Sayan> nslookup -type=mx gmail.com 

Server:  dns.google
Address:  8.8.8.8

Non-authoritative answer:
gmail.com       MX preference = 10, mail exchanger = alt1.gmail-smtp-in.l.google.com
gmail.com       MX preference = 20, mail exchanger = alt2.gmail-smtp-in.l.google.com
gmail.com       MX preference = 40, mail exchanger = alt4.gmail-smtp-in.l.google.com
gmail.com       MX preference = 30, mail exchanger = alt3.gmail-smtp-in.l.google.com
gmail.com       MX preference = 5, mail exchanger = gmail-smtp-in.l.google.com

```
here, `-type=mx` indicates **mail exchange** i.e. the SMTP servers, `gmail.com` is the **domain name**

- For downloading emails, we use POP3 protocol. 

  - First the client connects to the POP server and performs authorization.
  - After that, the client can get his emails and perform other activities such as deletion etc.
  - While using POP, folders like **Sent Items** , **Draft** are not in sync.

- For downloading emails, we also use Internet Message Acess Protocol i.e. IMAP .

  - It allows accessing emails from multiple devices.
  - Multiple directories can be synced.

## Domain Name System

Our phone contains numerous phone numbers each having a name associated with it. While calling, we use the names to find a particular number.

Similarly, every server with an IP address also has a name associated with it. But to map between the name and the IP address, we need DNS.

When we enter **google.com** , DNS is used by HTTP protocol to find the IP address of Google's server. DNS is basically similar to a directory/database that stores IP addresses for domain names.

- We have a large number of IP addresses, hence, storing all those with their domain names in a single database is neither possible nor efficient. 

- Hence, domain names are divided into various classes. e.g. `mail.google.com` here, **mail** is the sub-domain, **google** is the second-level domain, **com** is the top-level domain. There are multiple databases for each of these categories.

- At the top, we have Root DNS servers. Checkout [this](https://root-servers.org) to know, who maintain these Root DNS servers. They provide the IP addresses of the TLD servers.

- Below that, we have Top-level Domain Servers, maintained by ICANN . Examples of TLD are **com**, **org**, **net**, **edu** etc. TLD server provide the IP addresses of the actual server.

- When we visit any website for the first time, its IP address is stored in local cache in our computer.

- When we enter an url in the browser,

  - the local cache is checked for the IP address.
  - if not found, the local DNS server is checked. Our ISPs can be our local DNS server, where all the info about our visited websites are stored.
  - If not found, the Root DNS server is requested. In response, we get IP address of a TLD server. Then the TLD server is requested to get the IP address of the domain’s nameserver, example.com.
  - Finally, the nameserver is queried and the IP address of the domain is received. The DNS resolver then responds to the web browser with that IP address.

  - Learn more about [How DNS works](https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/)

- We can use `dig` command for interrogating DNS name servers. e.g. `dig facebook.com` to query facebook DNS servers.

## Theoretical Topics
- HTTPS


