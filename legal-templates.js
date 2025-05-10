export const legalTemplates = {
  "Contract": {
    "description": "Standard contract template for agreements.",
    "fields": [
      "Party A Name",
      "Party B Name",
      "Effective Date",
      "Terms and Conditions",
      "Signatures"
    ],
    "template": `
      CONTRACT AGREEMENT

      This Contract Agreement ("Agreement") is made effective as of {{Effective Date}}, by and between {{Party A Name}} and {{Party B Name}}.

      TERMS AND CONDITIONS:
      {{Terms and Conditions}}

      IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

      ___________________________          ___________________________
      {{Party A Name}}                     {{Party B Name}}
    `
  },
  "Motion": {
    "description": "Legal motion template for court filings.",
    "fields": [
      "Court Name",
      "Case Number",
      "Plaintiff Name",
      "Defendant Name",
      "Motion Title",
      "Motion Content",
      "Date",
      "Signature"
    ],
    "template": `
      IN THE {{Court Name}}

      Case No: {{Case Number}}

      {{Plaintiff Name}}, Plaintiff,
      vs.
      {{Defendant Name}}, Defendant.

      MOTION FOR {{Motion Title}}

      {{Motion Content}}

      Date: {{Date}}

      ___________________________
      {{Signature}}
    `
  },
  "Financial Audit Analysis": {
    "description": "Template for financial audit analysis reports.",
    "fields": [
      "Company Name",
      "Audit Period",
      "Summary",
      "Findings",
      "Recommendations",
      "Auditor Name",
      "Date"
    ],
    "template": `
      FINANCIAL AUDIT ANALYSIS REPORT

      Company: {{Company Name}}
      Audit Period: {{Audit Period}}

      SUMMARY:
      {{Summary}}

      FINDINGS:
      {{Findings}}

      RECOMMENDATIONS:
      {{Recommendations}}

      Auditor: {{Auditor Name}}
      Date: {{Date}}
    `
  },
  "IRS Audit Response": {
    "description": "Template for responding to IRS audit notices.",
    "fields": [
      "Taxpayer Name",
      "Tax Year",
      "IRS Notice Number",
      "Response Content",
      "Date",
      "Signature"
    ],
    "template": `
      IRS AUDIT RESPONSE LETTER

      Taxpayer: {{Taxpayer Name}}
      Tax Year: {{Tax Year}}
      IRS Notice Number: {{IRS Notice Number}}

      RESPONSE:
      {{Response Content}}

      Date: {{Date}}

      ___________________________
      {{Signature}}
    `
  },
  "Family Court": {
    "description": "Template for family court petitions and orders.",
    "fields": [
      "Court Name",
      "Case Number",
      "Petitioner Name",
      "Respondent Name",
      "Petition Title",
      "Petition Content",
      "Date",
      "Signature"
    ],
    "template": `
      IN THE {{Court Name}}

      Case No: {{Case Number}}

      {{Petitioner Name}}, Petitioner,
      vs.
      {{Respondent Name}}, Respondent.

      PETITION FOR {{Petition Title}}

      {{Petition Content}}

      Date: {{Date}}

      ___________________________
      {{Signature}}
    `
  },
  "Lawsuit": {
    "description": "Template for filing lawsuits and complaints.",
    "fields": [
      "Court Name",
      "Case Number",
      "Plaintiff Name",
      "Defendant Name",
      "Complaint Title",
      "Complaint Content",
      "Date",
      "Signature"
    ],
    "template": `
      IN THE {{Court Name}}

      Case No: {{Case Number}}

      {{Plaintiff Name}}, Plaintiff,
      vs.
      {{Defendant Name}}, Defendant.

      COMPLAINT FOR {{Complaint Title}}

      {{Complaint Content}}

      Date: {{Date}}

      ___________________________
      {{Signature}}
    `
  }
};
