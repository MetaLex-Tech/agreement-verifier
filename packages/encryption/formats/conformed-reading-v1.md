# Reproduce a conformed agreement

## Standard secondary sale

A completed standard secondary sale PDF includes three attachments for its agreement parties. Save the registered original PDF, the private agreement-reading.json evidence file and the standalone HTML verifier. In a trusted copy of the verifier, choose **Conformed copy**, select the original and the evidence, and choose **Check attached evidence**. All three files work offline. The evidence contains names, notice contacts and other terms already visible in this party copy. Store and share it with the same care as the agreement.

The verifier checks the original against the published SHA-256 for the registered sale PDF. It checks the content-derived template ID, literal IPFS URI, title and ordered field names. It computes the offer ID and the purchase ID for this buyer and fill index. It then uses the standard sale’s annotated text to reproduce the body, any additional terms, the signature page and settlement information. Page layout and the completed PDF file bytes are outside the reading fingerprint.

The evidence records the chain, company, registry, manager, finalized block number and hash, the posting, acceptance and settlement transactions and their blocks, the original offer salt, acceptance index, raw quantities and payment decimals. The seller’s posting and purchaser’s acceptance have separate dates. The recorded registry and receipts were checked when the party download was created. Verifying the source of the records independently requires a trusted chain read. Someone who changes the evidence can compute another fingerprint. Keep a separately trusted verifier when the origin of a download is in question.

Each disclosed party value records its source. A public string is marked `recorded`. A value obtained through the agreement-party decryption is marked `agreement-party-decryption` with a SHA-256 fingerprint of the UTF-8 ciphertext. A value resolved from a commitment is marked `agreement-party-disclosure` with the recorded commitment. The public offer salt is part of the offer ID. The evidence file contains no decryption key or private commitment salt. The **Name or field** check can verify a commitment when the holder separately supplies the matching opening. The reading itself does not authenticate privately supplied plaintext.

After reproducing a standard sale, issued stock round or settled stock ticket, you can expand **Check the registered agreement onchain** and choose **Check registered terms**. Use a trusted archive RPC endpoint for the recorded network. The verifier compares the template, general terms, signing wallets and each party’s recorded fields at the finalized block named in the copy. For a confidential field, it compares the stored commitment or the fingerprint of the encrypted value. A separate opening can establish the plaintext behind a commitment. Payment, certificate terms and settlement need their own evidence. The endpoint receives public lookup references. The PDF, disclosed wording and openings stay in the browser.

## Version 1 encoding

The JSON envelope has two members, `evidence` and `readingSha256`. Its format is `metalex-agreement-reading-v1`. This edition uses the renderer `standard-secondary-sale-v1`, the stage `completed`, and the disclosure scope `agreement-party`. The renderer fingerprint covers the versioned reading, annotation, source, formatting and ID logic. Use a trusted verifier matching the revision saved with the party copy. The source digest is SHA-256 of the exact original PDF, and the annotation digest is SHA-256 of the UTF-8 compact JSON array of ordered registered text spans. The two verified IPFS encodings of the original identify the same bytes. Each registration still has its own recomputed ID.

The reading digest is SHA-256 of the UTF-8 domain string `MetaLeX/reading/v1` followed by one LF byte and the encoding of an object with two properties, `evidence` and `nodes`. Nodes appear in reading order, each with a `kind` of `heading` or `paragraph` and the complete `text`. Strings retain their exact Unicode code points, including embedded newlines. Unpaired surrogates are invalid. Transaction quantities and timestamps are unsigned decimal strings in base units and Unix seconds, respectively. Dates in the reading are UTC.

| Value | Encoding |
| --- | --- |
| String | ASCII `s`, UTF-8 byte length as unsigned decimal, ASCII colon, then the UTF-8 bytes |
| Integer | ASCII `i`, the signed safe integer in decimal with no redundant zeroes, then an ASCII semicolon |
| Array | ASCII `a`, decimal member count, ASCII colon, then each encoded member in order |
| Object | ASCII `o`, decimal property count, ASCII colon, then each encoded key and value, with keys sorted by ascending UTF-16 code units. The v1 schema uses only ASCII keys. |

The independent encoding vector uses the object `{"z":"e\u0301","a":["👩‍⚖️","x:y",7,""]}` as the domain-prefixed input. Its SHA-256 is `bac55af6632fcc290cc3d04739d384fc71435ace364da93f7e87f945aa9c055e`. Reversing the object properties preserves the digest. Replacing the decomposed accented letter with a precomposed one changes it.

## Issued standard stock round

Save the original from the completed agreement’s registered-template link, or use the “Registered agreement.pdf” attachment when present. Select that exact 197-page PDF and the agreement-reading.json from the confidential party copy. The stock renderer checks the full original PDF against its published SHA-256, verifies the stock edition and ordered field names, and reconstructs the approved terms, signed purchase particulars, optional provisions, share exhibit and signature page. The charter, bylaws and transaction agreements occupy pages 41 through 197 of the verified original. The reading fingerprint includes their page range and the original PDF digest at their position in the completed agreement.

The renderer identifier is `issued-standard-stock-round-v1`. The evidence includes the purchase price, settled amount and currency precision, certificate ID and issued quantity, recorded legends, and the resolved class, series and certificate data as a canonical ABI encoding of the share extension’s resolveCert output. It identifies the original, annotation and renderer revisions. The two five-value party rows distinguish recorded values, agreement-party decryption and commitment disclosures. The receipt references identify the round approval, investor signature and allocation. Checking those receipts with an archive endpoint authenticates the listed events. The offline fingerprint checks reproducibility from the supplied facts. It does not authenticate a private opening or independently verify the certificate facts at issuance.

## Settled standard stock ticket

The `settled-standard-stock-ticket-v1` reading uses the same registered stock purchase PDF as the issued stock round. Each signer’s block uses the date and transaction of that signer’s registry event. The settlement reference identifies the transaction that delivered the certificates, including when the investor signed in an earlier transaction.

The evidence records the two party rows, five global values, conditions, registry and escrow deadlines, payment amount and precision, and the recorded certificates in order. Each certificate identifies its printer, token ID, share count, effective share terms, officer, additional provisions and restrictive legends when available. An externally created ticket can contain inaccessible values. The evidence records the commitment or a ciphertext fingerprint for each withheld value and reproduces the party copy’s disclosure of the missing details. A party may independently check the public transaction events using the receipt verifier. The offline comparison checks the wording against the disclosed facts and the exact registered PDF.
