import { agreementNodes } from "./agreementReferences";

type OperationOrFieldLabel = { label: string };

// Source paragraphs from the registered CyberStock Reg D v1.0 PDF.
// Each reference is anchored before any party-supplied text is rendered.
export const stockAdoptionParagraphs = {
  restrictedSecurities: agreementNodes<OperationOrFieldLabel>(
    "(d) Restricted Securities; Restrictive Legends. The Investor understands that the Stock, the corresponding Stock Ledger Entry Tokens and any Scrip Tokens derived therefrom have not been, and will not be, registered under the Securities Act, by reason of a specific exemption from the registration provisions of the Securities Act which depends upon, among other things, the bona fide nature of the investment intent and the accuracy of the Investor’s representations as expressed herein. The Investor understands that the Stock, the corresponding Stock Ledger Entry Tokens and any Scrip Tokens derived therefrom are “restricted securities” under applicable U.S. federal and state securities laws and that, pursuant to these laws, the Investor must hold the Stock indefinitely unless they are registered with the Securities and Exchange Commission and qualified by state authorities, or an exemption from such registration and qualification requirements is available. The Investor acknowledges and agrees that the restrictive legends set forth in Part 3 of Exhibit A may be inscribed in the “Legends” metadata field of the Stock Ledger Entry Token(s) issued to the Investor hereunder, that such legends may be modified, removed or added from time to time in accordance with the COI, the Bylaws and applicable law, and that the Investor will be deemed on notice of, and bound by, the legends as so reflected in such metadata field from time to time.",
    [
      {
        start: 1090,
        registered: "“Legends” metadata field",
        reference: { label: "record of restrictive legends" },
      },
      {
        start: 1409,
        registered: "such metadata field",
        reference: { label: "that record" },
      },
    ],
  ),
  notices: agreementNodes<OperationOrFieldLabel>(
    "5.3 Notices. All notices and other communications required or permitted pursuant to this Agreement shall be in writing and shall be deemed effectively given upon the earlier of: (i) personal delivery to the Party to be notified; or (ii) on the third business day after being sent, if sent in accordance with the contactDetails (set during the Adoption Procedures) of the Party to be notified and the sending Party preserves clear and convincing evidence (such as certified mail receipts, if the contactDetails included a physical mailing address that was used for the notice, or timestamped data records if the contactDetails included an email or digital messaging address that was used for the notice). For the avoidance of doubt, any notice required to be delivered to a holder of uncertificated shares under the DGCL or the Bylaws may, with respect to Tokenized Shares represented by Stock Ledger Entry Tokens, be delivered by recording the required information in the metadata uniquely associated with the relevant Stock Ledger Entry Token in the Tokenized Stock Ledger System, in accordance with the Bylaws.",
    [
      {
        start: 312,
        registered: "contactDetails",
        reference: { label: "notice contact details" },
      },
      {
        start: 495,
        registered: "contactDetails",
        reference: { label: "notice contact details" },
      },
      {
        start: 611,
        registered: "contactDetails",
        reference: { label: "notice contact details" },
      },
    ],
  ),
  proposal: agreementNodes<OperationOrFieldLabel>(
    "(i) the Company, by calling or causing to be called the proposeAndSignDeal() or proposeDeal() function of the Deal Manager Smart Contract, in each case, with reference to the Agreement Template, has created or caused to be created a data structure representing and setting forth the details of this Agreement (the “Registered Deal Data”) in the Agreement Registry Smart Contract, and the Agreement Registry Smart Contract has stored a unique agreementId associated with that data structure (such uniquely identifiable data structure, the “Registered Deal”); or",
    [
      {
        start: 56,
        registered: "proposeAndSignDeal()",
        reference: { label: "operation to propose and sign the deal" },
      },
      {
        start: 80,
        registered: "proposeDeal() function",
        reference: { label: "operation to propose the deal" },
      },
      {
        start: 442,
        registered: "agreementId",
        reference: { label: "agreement identifier" },
      },
    ],
  ),
  round: agreementNodes<OperationOrFieldLabel>(
    "(ii) the Company, by calling or causing to be called the createRound() function of the Round Manager Smart Contract, with reference to the Agreement Template, has caused a Round to be created on the Round Manager Smart Contract with the parameters and escrowed Company signature pursuant to which the Investor's call to the submitEOI() function of the Round Manager Smart Contract described in Section 6.1(c) will cause to be created in the Agreement Registry Smart Contract a data structure representing and setting forth the details of this Agreement (the “Registered Deal Data”), and will cause the Agreement Registry Smart Contract to store a unique agreementId associated with that data structure (such uniquely identifiable data structure, the “Registered Deal”);",
    [
      {
        start: 57,
        registered: "createRound() function",
        reference: { label: "round creation operation" },
      },
      {
        start: 324,
        registered: "submitEOI() function",
        reference: {
          label: "operation for submitting an expression of interest",
        },
      },
      {
        start: 654,
        registered: "agreementId",
        reference: { label: "agreement identifier" },
      },
    ],
  ),
  companyDealSignature: agreementNodes<OperationOrFieldLabel>(
    "(i) in the case of the procedure described in the preceding clause ‘(a)(i),’ the Company has electronically signed this Agreement with the Company's private key by calling or causing to be called the signContractFor() function of the Agreement Registry Smart Contract (whether in the same transaction as the proposeAndSignDeal() call described in the preceding clause ‘(a)(i),’ or in a separate transaction following a proposeDeal() call), in each case with reference to the Agreement Template, Registered Deal, and Registered Deal Data; or",
    [
      {
        start: 200,
        registered:
          "signContractFor() function of the Agreement Registry Smart Contract",
        reference: {
          label:
            "Agreement Registry Smart Contract’s operation for recording a party’s signature",
        },
      },
      {
        start: 308,
        registered: "proposeAndSignDeal() call",
        reference: { label: "call to propose and sign" },
      },
      {
        start: 419,
        registered: "proposeDeal() call",
        reference: { label: "call to propose" },
      },
    ],
  ),
  companyRoundSignature: agreementNodes<OperationOrFieldLabel>(
    "(ii) in the case of the procedure described in the preceding clause’ (a)(ii),’ the Company has electronically signed this Agreement with the Company's private key by having previously supplied, as part of the createRound() call described in the preceding clause ‘(a)(ii),’ the Company's escrowed signature for the Agreement Template, which escrowed signature has been applied to the Registered Deal through the signContractWithEscrow() function of the Agreement Registry Smart Contract upon the Investor's call to the submitEOI() function described in clause ‘(c)’ below, in each case with reference to the Agreement Template, Registered Deal, and Registered Deal Data;",
    [
      {
        start: 209,
        registered: "createRound() call",
        reference: { label: "round creation call" },
      },
      {
        start: 411,
        registered:
          "signContractWithEscrow() function of the Agreement Registry Smart Contract",
        reference: {
          label:
            "Agreement Registry Smart Contract’s operation for applying an escrowed signature",
        },
      },
      {
        start: 518,
        registered: "submitEOI() function",
        reference: {
          label: "operation for submitting an expression of interest",
        },
      },
    ],
  ),
  investorSubmission: agreementNodes<OperationOrFieldLabel>(
    "(c) the Investor, by calling or causing to be called the signAndFinalizeDeal() function of the Deal Manager Smart Contract or the submitEOI() function of the Round Manager Smart Contract, has supplied or caused to be supplied as part of the Registered Deal Data any necessary details regarding the Investor that are required by the Agreement Template that were not previously supplied by the Company;",
    [
      {
        start: 57,
        registered: "signAndFinalizeDeal() function",
        reference: { label: "operation for signing and finalizing the deal" },
      },
      {
        start: 130,
        registered: "submitEOI() function",
        reference: {
          label: "operation for submitting an expression of interest",
        },
      },
    ],
  ),
  investorSignature: agreementNodes<OperationOrFieldLabel>(
    "(d) the Investor has electronically signed this Agreement with the Investor's private key, which signature has been applied to the Registered Deal through the signContractFor() function of the Agreement Registry Smart Contract (whether as part of the same transaction as the call described in clause (c) above or through a separate call), in each case with reference to the Agreement Template, Registered Deal, and Registered Deal Data; and",
    [
      {
        start: 159,
        registered:
          "signContractFor() function of the Agreement Registry Smart Contract",
        reference: {
          label:
            "Agreement Registry Smart Contract’s operation for recording a party’s signature",
        },
      },
    ],
  ),
  templateDefinition: agreementNodes<OperationOrFieldLabel>(
    "“Agreement Template” means a data structure stored in the Agreement Registry Smart Contract setting forth (as its legalContractUri string variable) an IPFS URI of this Agreement (the “Legal Template”), a template ID for unique identification of the Legal Template, and (as its globalFields variable and partyFields variables) a specification of the types of data (such as party names) needed to fill in the details of the Legal Template in order to create a legal agreement between particular parties.",
    [
      {
        start: 114,
        registered: "legalContractUri string variable",
        reference: { label: "registered document link" },
      },
      {
        start: 277,
        registered: "globalFields variable and partyFields variables",
        reference: {
          label: "descriptions of the purchase terms and party details",
        },
      },
    ],
  ),
};
