## Digital Certificates
The asymmetric-key cryptography can be a very good solution to the key-exchange problem. But it also has one unresolved issue, which is how the parties/correspondents (i.e. the sender and the receiver of a message) exchange their public keys with each other. Obviously,they cannot exchange them openly—this can very easily lead to a man-in-the-middle attack on the public key itself!

This problem was resolved with a revolutionary idea of using digital certificates.

A digital certificate is simply a small computer file which simply signifies the association between a subject and its public key. Hence, a digital certificate must contain the user name and the user’s public key. A Certification Authority (CA) is a trusted agency that can issue digital certificates.

### Certificate Creation Steps

The creation of a digital certificate consists of several steps.

- The subject (i.e. the user/organization) who wants to obtain a certificate, can create a private key and public key. The subject must keep the private key thus generated, secret.

- The subject then sends the public key along with other information and evidences about herself to the authority over the network. The format for the certificate requests has been standardized, and is called Certificate Signing Request (CSR).

- To verify the user’s credentials, the authority needs to verify 

  - the user’s credentials such as the evidences provided are correct.

  - the user who is requesting for the certificate does indeed possess the private key corresponding to the public key that is sent as a part of the certificate request. For this, the authority can demand that the user must digitally sign his/her Certificate Signing Request (CSR) using his/her private key. If the authority can verify the signature (i.e. de-sign the CSR) correctly using the public key of the user, the RA can believe that the user indeed possesses the private key.

- Assuming that all the steps so far have been successful, the authority signs a digital certificate with its private key for the user and sends it.

## TLS Handshake Process (Based on TLS 1.2)
The Transport Layer Security (TLS) handshake is a crucial part of the HTTPS protocol, designed to encrypt data transmitted between a browser (client) and a server, making it unreadable if intercepted.

- **Step 1: Establishing the TCP Connection**

  Just like in the case of HTTP, the process begins when the browser establishes a **TCP connection** with the server.

- **Step 2: The Hello Phase**

  This step marks the beginning of the TLS handshake.

  **Client Hello**  
  The browser sends a **Client Hello** message to the server, detailing its capabilities:
  1.  **TLS Version:** The specific TLS version(s) it can support (e.g., TLS 1.2, TLS 1.3).
  2.  **Cipher Suite:** The set of encryption algorithms (Cipher Suites) it supports for encrypting data.

  **Server Response (Server Hello and Certificate)**  
  Upon receiving the Client Hello, the server selects the appropriate **TLS version** and **Cipher Suite** to use, based on the options provided by the client. The server then sends back:
  1.  **Server Hello:** Containing the chosen TLS version and Cipher Suite.
  2.  **Certificate:** This certificate includes, among other things, the server’s **public key**.

  The client and server both have a trusted authority they could rely on for authenticating each other. The client verifies the server's SSL certificate with the certificate authority that issued it. This confirms that the server is who it says it is, and that the client is interacting with the actual owner of the domain.

  At this point, the client possesses the server's certificate, and both parties have agreed on the TLS version and Cipher Suite.

- **Step 3: Key Exchange (Generating the Shared Key)**

  The goal of this step is for the client and server to securely establish a **shared encryption key** (also called a session key).

  The client uses the server's public key to encrypt the session key. Since data encrypted by the client using the server's public key can only be decrypted by the server's private key, this method allows the client to send the encryption key safely over the open internet. This transfer occurs within the **Client Key Exchange message**.

- **Step 4: Secure Data Transmission**

  At the conclusion of Step 3, **both the client and the server hold the session key**.

  They now transition to using this shared **session key** and the agreed-upon **Cipher Suite** to encrypt and decrypt data. The communication then proceeds in a **secure bi-directional channel**. The switch from asymmetric encryption (used for key exchange) to symmetric encryption (using the session key for data transfer) is necessary because asymmetric encryption is computationally expensive and unsuitable for the transmission of bulk data.

## Important Parameters for Certificate Validation
Proper validation of a website's certificate by the client is crucial to ensure the client is communicating with the correct server and to prevent a Man-in-the-Middle attack, where an attacker could impersonate the web server and read encrypted data.

The client examines several parameters within the Digital certificate (which is typically written in the **X.509 standard** format) to determine its validity and trustworthiness:

1.  **Target Address Validation (Subject Alternative Names)**
    * The browser compares the URL the user is accessing against the **Subject Alternative Names (SANs)** described in the certificate's details.
    * The accessed URL must match **at least one** of these Subject Alternative Names. These names can include the main domain, or a wildcard that makes the certificate valid for all sub-domains.

2.  **Expiry Date Check**
    *   All certificates are valid for only a specific time period; they are not valid forever for security reasons.
    *   The client checks the defined **valid from** and **valid to** dates.

3.  **The Certificate Chain and Issuer Trust**
    *   The client relies heavily on the **certificate chain** to establish trust.
    *   The browser checks if the Digital certificate was issued by a **Certificate Authority (CA)** that is included in the **root store** of the device.

        Trust is established because the certificates of all major **public CAs** (such as DigiCert, GlobalSign, GoDaddy, and Let's Encrypt) containing their public key are stored on every device in every browser by default. These trusted public CAs might issue and sign the intermediate CAs, which then issue the certificates used by public websites.

> We can only issue Digital Certificates from CA for the domain owned by us.

## Self-Signed Certificates
A self-signed certificate functions by establishing an internal trust relationship, allowing secure connections within a private network where obtaining a certificate from a public Certificate Authority (CA) is either challenging or impossible.

Instead of relying on public CAs (like DigiCert or Let's Encrypt), self-signed certificates operate using a **private Certificate Authority (CA)** established by the user.

Self-signed certificates are commonly used in scenarios such as home labs or internal networks where applications run on private IP addresses or internal domain names. Using internal IP addresses prevents the user from obtaining an automatically trusted SSL certificate from a public CA, as public CAs require verification of domain ownership (a public domain).

### Steps to create Self-Signed Certificates

#### Generate CA
1. The process of creating a functional self-signed certificate involves generating a CA that signs the underlying server certificate.
   - **CA Key Generation:** A new RSA private key is generated for the private CA. Because whoever controls this private key can generate new trusted certificates, the key is highly sensitive.
     ```bash
     openssl genrsa -aes256 -out ca-key.pem 4096
     ```
   - **CA Certificate Creation:** A new,self-signed CA certificate is generated from the private key in the **X.509 standard** format.
     ```bash
     openssl req -x509 -sha256 -days 3650 -key ca-key.pem -out ca.crt
     ```
     This self-signed certificate (CA certificate) contains:
     - The CA’s public key
     - The CA’s identity (like Organization, Country, Common Name, etc.)
     - The signature created using the CA’s private key

1. View certificate's content using any of the following commands:
   ```bash
   openssl x509 -in ca.pem -text # displays certificate details.
   openssl x509 -in ca.pem -purpose -noout -text # displays certificate details and its valid usage purposes.
   ```
#### Generate Certificate for Server using CA

1. A new RSA private key is generated for the server.
   ```bash
   openssl genrsa -out cert-key.pem 4096
   ```

1. Create a Certificate Signing Request (CSR). The CSR will contain the public key derived from this private key, the identity info and the digital signature encrypted with this private key.
   ```bash
   openssl req -new -sha256 -subj "/CN=example.com" -key cert-key.pem -out cert.csr
   ```
   - `/CN` refers to Common Name. We can add more fields like:
     ```
     -subj "/C=IN/ST=Karnataka/L=Bangalore/O=ExampleOrg/CN=myapp.example.com"
     ```
   - `-new` flag means "generate a new request".
   - `-sha256`is the hash algorithm used when creating the CSR’s signature. 

1. Create a `extfile` with all the Subject Alternative Name (SAN). SAN lists all valid domain names or IP addresses that the certificate should be trusted for and verified by browsers and modern clients.

   ```bash
   echo "subjectAltName=DNS:your-dns.record,DNS:myapp.example.com,IP:257.10.10.1" >> extfile.cnf
   ```

1. Generate the certificate using the CSR. It will be signed by the CA's private key. `-CAcreateserial` creates a new serial number file (by default called ca.srl) to keep track of issued certificates.
   ```bash
   openssl x509 -req -sha256 -days 365 -in cert.csr -CA ca.crt -CAkey ca-key.pem -out cert.crt -extfile extfile.cnf -CAcreateserial
   ```
   - `-req` tells OpenSSL we’re taking in a certificate signing request (CSR) as input — i.e. we’re issuing a certificate based on that request.

Now, this certificate can be added to the server configuration.

### Installing the CA as a Trusted Root CA on Client
Since the self-signed certificate is issued by a private, custom-generated CA, the client device initially does not trust the issuer, resulting in a browser warning.

To establish trust, the private CA certificate must be manually uploaded and imported into the **trusted root CA store** of *every client* (PC, laptop, smartphone) that needs to access the web server's web UI.

#### On Windows

Assuming the path to our generated CA certificate as `C:\ca.crt`, run:

```powershell
Import-Certificate -FilePath "C:\ca.csr" -CertStoreLocation Cert:\LocalMachine\Root
```

- Set `-CertStoreLocation` to `Cert:\CurrentUser\Root` in case we want to trust certificates only for the logged in user.



