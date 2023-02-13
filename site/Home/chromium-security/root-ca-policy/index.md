---
breadcrumbs:
- - /Home
  - Chromium
- - /Home/chromium-security
  - Chromium Security
page_name: root-ca-policy
title: Chrome Root Program Policy, Version 1.4
---

## Last updated: 2023-02-28
Bookmark this page as <https://g.co/chrome/root-policy>

## Introduction

Google Chrome relies on Certification Authority systems (herein referred to as “CAs”) to issue certificates to websites. Chrome uses these certificates to help ensure the connections it makes on behalf of its users are properly secured. Chrome accomplishes this by verifying that a website’s certificate was issued by a recognized CA, while also performing additional evaluations of the HTTPS connection's security properties. Certificates not issued by a CA recognized by Chrome or a user’s local settings can cause users to see warnings and error pages.

When making HTTPS connections, Chrome refers to a list of root certificates from CAs that have demonstrated why continued trust in them is justified. This list is known as a “Root Store.” CA certificates included in the [Chrome Root Store](https://g.co/chrome/root-store) are selected on the basis of publicly available and verified information, such as that within the Common CA Database ([CCADB](https://ccadb.org/)), and ongoing reviews by the Chrome Root Program. CCADB is a datastore run by Mozilla and used by various operating systems, browser vendors, and CA owners to share and disclose information regarding the ownership, historical operation, and audit history of CAs and corresponding certificates and key material.

Historically, Chrome has integrated with the Root Store provided by the platform on which it is running. In Chrome 105, Chrome began a platform-by-platform transition from relying on the host operating system’s Root Store to its own on Windows, macOS, ChromeOS, Linux, and Android. This change makes Chrome more secure and promotes consistent user and developer experiences across platforms. Apple policies prevent the Chrome Root Store and corresponding Chrome Certificate Verifier from being used on Chrome for iOS. 

The Chrome Root Program Policy below establishes the minimum requirements for root CA certificates to be included as trusted in a default installation of Chrome. 


### Apply for Inclusion

CA owners that satisfy the requirements defined in the policy below may apply for self-signed root CA certificate inclusion in the Chrome Root Store using [these](/Home/chromium-security/root-ca-policy/apply-for-inclusion/) instructions.


### Moving Forward, Together

The June 2022 release (Version 1.1) of the Chrome Root Program Policy introduced the Chrome Root Program’s “Moving Forward, Together” initiative that set out to share our vision of the future that includes modern, reliable, highly agile, purpose-driven PKIs with a focus on automation, simplicity, and security.

Learn more about priorities and initiatives that may influence future versions of this policy [here](/Home/chromium-security/root-ca-policy/moving-forward-together/). 


### [Additional Information](https://www.chromium.org/Home/chromium-security/root-ca-policy/#additional-information)

If you’re a Chrome user experiencing a certificate error and need help, please see [this support article](https://support.google.com/chrome/answer/6098869?hl=en).

If you’re a website operator, you can learn more about [why HTTPS matters](https://web.dev/why-https-matters/) and how to [secure your site with HTTPS](https://support.google.com/webmasters/answer/6073543). If you’ve got a question about a certificate you’ve been issued, please contact the CA that issued it.

If you're responsible for a CA that only issues certificates to your enterprise organization, sometimes called a "private" or "locally trusted" CA, the Chrome Root Program Policy does not apply to or impact your organization’s use cases. Enterprise CAs are intended for use cases exclusively internal to an organization (e.g., a TLS server authentication certificate issued to a corporate intranet site).

Though uncommon, websites can also use certificates to identify clients (e.g., users) connecting to them. Besides ensuring it is well-formed, Chrome passes this type of certificate to the server, which then evaluates and enforces its chosen policy. The policies on this page do not apply to client authentication certificates.


## Change History

<table>
  <tr>
   <td><strong>Version</strong>
   </td>
   <td><strong>Date</strong>
   </td>
   <td><strong>Note</strong>
   </td>
  </tr>
  <tr>
   <td><a href=/Home/chromium-security/root-ca-policy/policy-archive/version-1-0/>1.0</a>
      </td>
   <td>2020-12-20
   </td>
   <td>Initial release
   </td>
  </tr>
  <tr>
   <td><a href=/Home/chromium-security/root-ca-policy/policy-archive/version-1-1/>1.1</a>
   </td>
   <td>2022-06-01
   </td>
   <td>Updated in anticipation of the future Chrome Root Program launch. 
<p>
Updates include, but are not limited to:<ul>

<li>future-dated applicant requirements for dedicated TLS-hierarchies and key-pair freshness
<li>clarification of audit expectations 
<li>requirements for cross-certificate issuance notification
<li>description of and requirements related to an annual self-assessment process
<li>an outline of priority Chrome Root Program initiatives </li></ul>

   </td>
  </tr>
  <tr>
   <td><a href=/Home/chromium-security/root-ca-policy/policy-archive/version-1-2/>1.2</a>
   </td>
   <td>2022-09-01
   </td>
   <td>Updated to reflect the launch of the Chrome Root Program.
<p>
Updates include, but are not limited to:<ul>

<li>removal of pre-launch discussion
<li>clarifications resulting from the June 2022 Chrome CCADB survey
<li>minor reorganization of normative and non-normative requirements</li></ul>

   </td>
  </tr>
  <tr>
   <td><a href=/Home/chromium-security/root-ca-policy/policy-archive/version-1-3/>1.3</a>
   </td>
   <td>2023-01-06
   </td>
   <td>Updated to include the CCADB Self-Assessment
   </td>
  </tr>
  <tr>
   <td>1.4
   </td>
   <td>2023-02-27
   </td>
   <td>Updates include, but are not limited to:<ul>

<li>alignment with CCADB Policy Version 1.2 and the Baseline Requirements
<li>clarify requirements related to the submission of annual self assessments
<li>clarify requirements to better align with program intent (e.g., CA owner policy document freshness)
<li>updated audit and incident reporting requirements to promote increased transparency
<li>require subordinate CA disclosures in CCADB
<li>clarify CA certificate issuance notification requirements</li></ul>

   </td>
  </tr>
</table>

## Table of Contents
- [Introduction](#introduction)
     - [Apply for Inclusion](#apply-for-inclusion)
     - [Moving Forward, Together](#moving-forward-together)
     - [Additional Information](#additional-information)
- [Change History](#change-history)
- [Minimum Requirements for CAs](#minimum-requirements-for-cas)
     - [1. Baseline Requirements](#1-baseline-requirements)
     - [2. Chrome Root Program Participant Policies](#2-chrome-root-program-participant-policies)
     - [3. Modern Infrastructures](#3-modern-infrastructures)
     - [4. Dedicated TLS Server Authentication PKI Hierarchies](#4-dedicated-tls-server-authentication-pki-hierarchies)
     - [5. Audits](#5-audits)
     - [6. Annual Self Assessments](#6-annual-self-assessments)
     - [7. Responding to Incidents](#7-responding-to-incidents)
     - [8. Common CA Database](#8-common-ca-database)
     - [9. Timely and Transparent Communications](#9-timely-and-transparent-communications)

## Minimum Requirements for CAs

### 1. Baseline Requirements


### 2. Chrome Root Program Participant Policies


### 3. Modern Infrastructures


### 4. Dedicated TLS Server Authentication PKI Hierarchies


### 5. Audits


### 6. Annual Self Assessments


### 7. Responding to Incidents


### 8. Common CA Database


### 9. Timely and Transparent Communications


