import Link from "next/link";
import { getSEOTags } from "@/utils/seo";
import config from "@/utils/config";

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="bg-grid-small-white/[0.4]">
      <div className="max-w-xl mx-auto p-5">
        <div className="flex justify-end">
          <Link
            href="/home"
            className="flex relative bg-black border text-sm font-medium border-white/[0.2] text-white px-4 py-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                clipRule="evenodd"
              />
            </svg>{" "}
            <span>Back</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px" />
          </Link>
        </div>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: 2024-06-03

These 'Software as a Service' Terms and Conditions (“SaaS Terms”) apply to and are incorporated by reference into the ordering document (the “Quote”) made by and between the Service Provider (as identified on the Quote) and the Customer (as identified on the Quote) and set forth the terms and conditions under which Service Provider will provide the Customer with access to certain applications as set forth on the Quote (“Application(s)”) and user documentation that Service Provider makes generally available in hard copy or electronic form to its general customer base in conjunction with the licensing of such Applications ("Documentation"). The Applications and the Documentation will hereinafter collectively be referred to as the “Software.”

Service Provider and Customer hereby agree as follows:

1. LICENSE GRANT AND RIGHT OF USE

    1.1. License Grant. Subject to all limitations and restrictions contained herein and the Quote, Service Provider grants Customer a term subscription, software as a service ('SaaS'), nonexclusive, and nontransferable right to access and operate the object code form of Applications (and use its Documentation) as hosted by Service Provider as described in the Quote (“Use”) and solely to perform those functions described in the Documentation. For clarity, an “Application” means Service Provider's proprietary software that is specifically licensed to Customer pursuant to a Quote.

    1.2. Customer will have a limited right and license to Use the Application solely for its internal business purposes, to perform the functions described in the Documentation. Customer shall not allow any website that is not fully owned by Customer to frame, syndicate, distribute, replicate, or copy any portion of Customer's web site that provides direct or indirect access to the Application. Customer shall not allow any website, that is not fully owned by Customer, to frame, syndicate, distribute, replicate, or copy any portion of Customer's web site that provides direct or indirect access to the Software. Unless otherwise expressly permitted in the Quote and subject to Section 1.5, Customer shall not permit any subsidiaries, affiliated companies, or third parties to access the Software.

    1.3. License Type. Unless otherwise specifically stated in the Quote, the type of license granted is a per Staff User Account. Customer shall ensure that the number of the active Staff User Accounts is equal to or less than the number of Staff User Accounts for which the Customer has subscribed. Customer is responsible for ensuring that access to a Staff User Account is not shared. Only one individual may authenticate to one Staff User Account. Hardware or software Customer uses to pool connections, reroute information, or reduce the number of users that directly access or use the Software (sometimes referred to as "multiplexing" or "pooling"), does not reduce the number of licenses or active Staff User Accounts Customer needs. A “Staff User Account” subscription license means that the Application licensed pursuant to the Quote may be Used by a limited number of individual users, each identified by a unique user id the maximum number of which is specified in the Quote. Customer may designate different Staff User Accounts at any time without notice to Service Provider so long as the permitted number of Staff User Account is not exceeded.

    1.4. Additional Restrictions. In no event will Customer disassemble, decompile, or reverse engineer the Application or Confidential Information (as defined herein) or permit others to do so. Disassembling, decompiling, and reverse engineering include, without limitation: (i) converting the Application from a machine-readable form into a human-readable form; (ii) disassembling or decompiling the Application by using any means or methods to translate machine-dependent or machine-independent object code into the original human-readable source code or any approximation thereof; (iii) examining the machine-readable object code that controls the Application's operation and creating the original source code or any approximation thereof by, for example, studying the Application's behavior in response to a variety of inputs; or (iv) performing any other activity related to the Application that could be construed to be reverse engineering, disassembling, or decompiling. To the extent any such activity may be permitted pursuant to written agreement, the results thereof will be deemed Confidential Information subject to the requirements of these SaaS Terms. Customer may use Service Provider's Confidential Information solely in connection with the Application and pursuant to the terms of these SaaS Terms.

    1.5. Authorized Users. Unless otherwise specifically provided in the Quote, “Authorized Users” will only consist of: (i) employees of Customer, and (ii) subject to Section 5 (Confidentiality), third party contractors of Customer who do not compete with Service Provider (“Permitted Contractors”). Permitted Contractors may Use the Software only at Customer's place of business or in the presence of Customer personnel. Customer is fully liable for the acts and omissions of Permitted Contractors under these SaaS Terms and applicable Quote.

    1.6. Customer License Grant. Customer grants to Service Provider a non-exclusive, royalty-free license to access, use, reproduce, modify, perform, display and distribute Customer data as is reasonable or necessary for Service Provider to perform or provide the Application.

    1.7. Third Party Software. The Services may contain third party software that requires notices and/or additional terms and conditions. Such required third party software notices and/or additional terms and conditions may be requested from Service Provider and are made a part of and incorporated by reference into these SaaS Terms. By accepting these SaaS Terms, Customer is also accepting the additional terms and conditions, if any, set forth therein.

2. PAYMENT

    2.1. Fees. Customer shall pay Service Provider the fees indicated on the Quote. Unless otherwise provided in a Quote, all fees are to be paid to Service Provider within Fifteen (15) days of the date of invoice. Any late payment will be subject to any costs of collection (including reasonable legal fees) and will bear interest at the rate of one and one-half percent (1.5%) per month (prorated for partial periods) or at the maximum rate permitted by law, whichever is less. If Customer has set up a direct debit, Service Provider will not debit Customer's designated account before seven (7) days have elapsed from the date of the invoice. If Customer is delinquent on a payment of fees for fifteen (15) days or more, Service Provider may suspend access to the Application. Complaints concerning invoices must be made in writing within thirty (30) days from the date of the invoice. Invoices will be sent by electronic delivery unless requested otherwise by Customer, additional fees will apply. Any Saas pricing changes will only be applicable to fresh agreements. All ongoing agreements and their renewals shall be not affected. They may only be revised subject to inflation.

    2.2. Taxes. The license, service fees, and other amounts required to be paid hereunder do not include any amount for taxes or levy (including interest and penalties). Customer shall reimburse Service Provider and hold Service Provider harmless for all sales, use, VAT, excise, property or other taxes or levies which Service Provider is required to collect or remit to applicable tax authorities. This provision does not apply to Service Provider's income or franchise taxes, or any taxes for which Customer is exempt, provided Customer has furnished Service Provider with a valid tax exemption certificate. The Customer shall make the payment of the fees indicated on the Quote without any deduction or withholding any taxes. In case any taxes are required to be deducted or withheld under any law or regulation by the Customer, then Service Provider shall reimburse the Customer the amount in respect of such taxes paid only upon presentation of certificate of deduction of taxes.

3. HOSTING

    3.1. Service Availability. Service Provider will use reasonable efforts to achieve Service Provider's availability goals described in the 'Service Level Agreement for SaaS.'

    3.2. Support Services. Upon payment of the relevant fees on the applicable Quote, Customer may receive certain support services for the Application pursuant to the 'Support Agreement for SaaS.'

4. OWNERSHIP

    4.1. Reservation of Rights. By signing the Quote, Customer irrevocably acknowledges that, subject to the licenses granted herein, Customer has no ownership interest in the Software or Service Provider materials provided to Customer. Service Provider will own all right, title, and interest in such Software and Service Provider materials, subject to any limitations associated with intellectual property rights of third parties. Service Provider reserves all rights not specifically granted herein.

    4.2. Marks and Publicity. Service Provider and Customer trademarks, trade names, service marks, and logos, whether or not registered (“Marks”), are the sole and exclusive property of the respective owning party, which owns all right, title and interest therein. Service Provider may: (i) use the Customer's name and/or logo within product literature, press release(s), social media, and other marketing materials; (ii) quote the Customer's statements in one or more press releases; and/or (iii) make such other use of the Customer's name and/or logo as may be agreed between the parties. Additionally, Service Provider may include Customer's name and/or logo within its list of customers for general promotional purposes. Service Provider shall comply with Customer's trademark use guidelines as such are communicated to the Service Provider in writing and Service Provider shall use the Customer's Marks in a manner which is consistent with industry practice. Neither party grants to the other any title, interest or other right in any Marks except as provided in this Section.

5. CONFIDENTIALITY

    5.1. Definition. “Confidential Information” includes all information marked pursuant to this Section and disclosed by either party, before or after the Quote Term Start Date (as identified on the Quote), and generally not publicly known, whether tangible or intangible and in whatever form or medium provided, as well as any information generated by a party that contains, reflects, or is derived from such information. For clarity, the term 'Confidential Information' does not include any personally identifiable information. Obligations with respect to personally identifiable information (if any) are set forth in the 'Data Processing Agreement.'

    5.2. Confidentiality of Software. All Confidential Information in tangible form will be marked as “Confidential” or the like or, if intangible (e.g., orally disclosed), will be designated as being confidential at the time of disclosure and will be confirmed as such in writing within thirty (30) days of the initial disclosure. Notwithstanding the foregoing, the following is deemed Service Provider Confidential Information with or without such marking or written confirmation: (i) the Software and other related materials furnished by Service Provider; (ii) the oral and visual information relating to the Application; and (iii) these SaaS Terms.

    5.3. Exceptions. Without granting any right or license, the obligations of the parties hereunder will not apply to any material or information that: (i) is or becomes a part of the public domain through no act or omission by the receiving party; (ii) is independently developed by the other party without use of the disclosing party's Confidential Information; (iii) is rightfully obtained from a third party without any obligation of confidentiality; or (iv) is already known by the receiving party without any obligation of confidentiality prior to obtaining the Confidential Information from the disclosing party. In addition, neither party will be liable for disclosure of Confidential Information if made in response to a valid order of a court or authorized agency of government, provided that notice is promptly given to the disclosing party so that the disclosing party may seek a protective order and engage in other efforts to minimize the required disclosure. The parties shall cooperate fully in seeking such protective order and in engaging in such other efforts.

    5.4. Ownership of Confidential Information. Nothing in these SaaS Terms will be construed to convey any title or ownership rights to the Software or other Confidential Information to Customer or to any patent, copyright, trademark, or trade secret embodied therein, or to grant any other right, title, or ownership interest to the Service Provider's Confidential Information. Neither party shall, in whole or in part, sell, lease, license, assign, transfer, or disclose the Confidential Information to any third party and shall not copy, reproduce or distribute the Confidential Information except as expressly permitted in these SaaS Terms. Each party shall take every reasonable precaution, but no less than those precautions used to protect its own Confidential Information, to prevent the theft, disclosure, and the unauthorized copying, reproduction or distribution of the Confidential Information.

    5.5. Non-Disclosure. Each party agrees at all times to use all reasonable efforts, but in any case no less than the efforts that each party uses in the protection of its own Confidential Information of like value, to protect Confidential Information belonging to the other party. Each party agrees to restrict access to the other party's Confidential Information only to those employees or Subcontractors who: (i) require access in the course of their assigned duties and responsibilities; and (ii) have agreed in writing to be bound by provisions no less restrictive than those set forth in this Section.

    5.6. Injunctive Relief. Each party acknowledges that any unauthorized disclosure or use of the Confidential Information would cause the other party imminent irreparable injury and that such party will be entitled to, in addition to any other remedies available at law or in equity, temporary, preliminary, and permanent injunctive relief in the event the other party does not fulfill its obligations under this Section.

    5.7. Suggestions/Improvements to Software. Notwithstanding this Section, unless otherwise expressly agreed in writing, all suggestions, solutions, improvements, corrections, and other contributions provided by Customer regarding the Software or other Service Provider materials provided to Customer will be owned by Service Provider, and Customer hereby agrees to assign any such rights to Service Provider. Nothing in these SaaS Terms will preclude Service Provider from using in any manner or for any purpose it deems necessary, the know-how, techniques, or procedures acquired or used by Service Provider in the performance of services hereunder.

6. WARRANTY

    6.1. No Malicious Code. To the knowledge of Service Provider, the Application does not contain any malicious code, program, or other internal component (e.g. computer virus, computer worm, computer time bomb, or similar component), which could damage, destroy, or alter the Application, or which could reveal, damage, destroy, or alter any data or other information accessed through or processed by the Application in any manner. This warranty will be considered part of and covered under the provisions of these SaaS Terms. Customer must: (i) notify Service Provider promptly in writing of any nonconformance under this warranty; (ii) provide Service Provider with reasonable opportunity to remedy any nonconformance under the provisions of these SaaS Terms; and (iii) provide reasonable assistance in identifying and remedying any nonconformance.

    6.2. Authorized Representative. Customer and Service Provider warrant that each has the right to enter into these SaaS Terms and that these SaaS Terms and the Quotes executed hereunder will be executed by an authorized representative of each entity.

    6.3. Services Warranty. Service Provider warrants that all services performed hereunder shall be performed in a workmanlike and professional manner.

    6.4. Disclaimer of Warranties. Any and all of SOFTWARE, SERVICES, CONFIDENTIAL INFORMATION and any other technology or materials provided by SERVICE PROVIDER to the CUSTOMER are provided “as is” and without warranty of any kind. EXCEPT AS OTHERWISE EXPRESSLY STATED IN SECTION 6 OF THESE SAAS TERMS. SERVICE PROVIDER MAKES NO OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING EXPRESS OR IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. NEITHER SERVICE PROVIDER (NOR ANY OF ITS SUBSIDIARIES, AFFILIATES, SUPPLIERS OR LICENSORS) WARRANTS OR REPRESENTS THAT THE SOFTWARE OR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. CUSTOMER ACKNOWLEDGES THAT THERE ARE RISKS INHERENT IN INTERNET CONNECTIVITY THAT COULD RESULT IN THE LOSS OF CUSTOMER'S PRIVACY, DATA, CONFIDENTIAL INFORMATION, AND PROPERTY.

    6.5. Modifications. Notwithstanding anything to the contrary in this Section, any and all warranties under these SaaS Terms are VOID if Customer has made changes to the Software or has permitted any changes to be made other than by or with the express, written approval of Service Provider.

7. INDEMNIFICATION

    7.1. Service Provider Indemnity. Service Provider will defend at its expense any cause of action brought against Customer, to the extent that such cause of action is based on a claim that the Application, as hosted by Service Provider to Customer, infringes a United States patent, copyright, or trade secret of a third party. Service Provider will pay those costs and damages finally awarded against Customer pursuant to any such claim or paid in settlement of any such claim if such settlement was approved in advance by Service Provider. Customer may retain its own counsel at Customer's own expense.

    7.2. No Liability. Service Provider will have no liability for any claim of infringement based on: (i) Software which has been modified by parties other than Service Provider where the infringement claim would not have occurred in the absence of such modification; (ii) Customer's use of the Software in conjunction with data where use with such data gave rise to the infringement claim; or (iii) Customer's use of the Software outside the permited scope of these SaaS Terms.

    7.3. Remedies. Should the Software become, or in Service Provider's opinion is likely to become, the subject of a claim of infringement, Service Provider may, at its option, (i) obtain the right for Customer to continue using the Software, (ii) replace or modify the Software so it is no longer infringing or reduces the likelihood that it will be determined to be infringing, or (iii) if neither of the foregoing options is commercially reasonable, terminate the access and Use of the Software. Upon such termination, Customer shall cease accessing the Software and Service Provider will refund to Customer, as Customer's sole remedy for such license termination, the subscription fees paid by Customer for the terminated license for the past twelve (12) months. THIS SECTION 7 STATES THE ENTIRE LIABILITY OF SERVICE PROVIDER WITH RESPECT TO ANY CLAIM OF INFRINGEMENT REGARDING THE APPLICATION.

    7.4. Customer Indemnity. Customer agrees to defend, indemnify, and hold Service Provider and its officers, directors, employees, consultants, and agents harmless from and against any and all damages, costs, liabilities, expenses (including, without limitation, reasonable attorneys' fees), and settlement amounts incurred in connection with any claim arising from or relating to Customer's: (i) breach of any of its obligations set forth in Section 10 (Customer Obligations); (ii) Customer's gross negligence or willful misconduct; (iii) actual or alleged use of the Application in violation of these SaaS Terms or applicable law by Customer or any Authorized Users; (iv) any actual or alleged infringement or misappropriation of third party intellectual property rights arising from data provided to Service Provider by the Customer or otherwise inputted into the Application, whether by the Customer, an Authorized User or otherwise including Customer Work Product (as defined below); and/or (v) any violation by Customer or its Authorized Users, of any terms, conditions, agreements or policies of any third party service provider. “Customer Work Product” means that data and those forms developed or acquired by Customer for internal business purposes independent from Service Provider or the Application.

    7.5. Indemnification Procedures. Each indemnifying party's obligations as set forth in this Section are subject to the other party: (i) giving the indemnifying party prompt written notice of any such claim or the possibility thereof; (ii) giving the indemnifying party sole control over the defense and settlement of any such claim; and (iii) providing full cooperation in good faith in the defense of any such claim.

8. LIMITATION OF LIABILITY

    8.1. Liability Cap. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL SERVICE PROVIDER BE LIABLE UNDER ANY THEORY OF LIABILITY, WHETHER IN AN EQUITABLE, LEGAL, OR COMMON LAW ACTION ARISING HEREUNDER FOR CONTRACT, STRICT LIABILITY, INDEMNITY, TORT (INCLUDING NEGLIGENCE), ATTORNEYS FEES AND COSTS, OR OTHERWISE, FOR DAMAGES WHICH, IN THE AGGREGATE, EXCEED THE AMOUNT OF THE FEES PAID BY CUSTOMER FOR THE SERVICES WHICH GAVE RISE TO SUCH DAMAGES.

    8.2. Disclaimer of Damages. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL SERVICE PROVIDER BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES OF ANY KIND AND HOWEVER CAUSED INCLUDING, BUT NOT LIMITED TO, ATTORNEYS FEES AND COSTS, BUSINESS INTERRUPTION OR LOSS OF PROFITS, BUSINESS OPPORTUNITIES, OR GOODWILL.

    8.3. THE FOREGOING LIMITATIONS APPLY EVEN IF NOTIFIED OF THE POSSIBILITY OF SUCH DAMAGE AND NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY REMEDY.

9. TERM AND TERMINATION

    9.1. Subscription Term. The term of these SaaS Terms will continue until the termination of the last Quote.

    9.2. Termination by Service Provider. These SaaS Terms and any license created hereunder may be terminated by Service Provider: (i) if Customer fails to make any payments due hereunder within fifteen (15) days of the due date; (ii) on thirty (30) days written notice to Customer if Customer fails to perform any other material obligation required of it hereunder, and such failure is not cured within such thirty (30) day period; or (iii) Customer files a petition for bankruptcy or insolvency, has an involuntary petition filed against it, commences an action providing for relief under bankruptcy laws, files for the appointment of a receiver, or is adjudicated a bankrupt concern.

    9.3. Termination by Customer. These SaaS Terms may be terminated by Customer on ninety (90) days written notice to Service Provider if Service Provider fails to perform any material obligation required of it hereunder, and such failure is not cured within ninety (90) days from Service Provider's receipt of Customer's notice or a longer period if Service Provider is working diligently towards a cure.

    9.4. Effect of Termination. Upon termination of these SaaS Terms, Customer shall no longer access the Software and Customer shall not circumvent any security mechanisms contained therein.

    9.5. Other Remedies. Termination of SaaS Terms will not limit either party from pursuing other remedies available to it, including injunctive relief, nor will such termination relieve Customer's obligation to pay all fees that have accrued or are otherwise owed by Customer under these SaaS Terms.

10. CUSTOMER OBLIGATIONS

    10.1. Customer agrees that no employees of Service Provider will be required to individually sign any agreement in order to perform any services hereunder including, but not limited to, access agreements, security agreements, facilities agreements or individual confidentiality agreements.

    10.2. Customer agrees to comply with all applicable laws, regulations, and ordinances relating to these SaaS Terms. Customer shall ensure that each Web site for which the Application is engaged contains or is linked to a privacy policy that governs its data collection and use practices.

    10.3. The Customer shall be obliged to inform its Authrorized Users before the beginning of use of the Software about the rights and obligations set forth in these SaaS Terms. The Customer will be liable for any violation of obligations by its Authrorized Users or by other third parties who violate obligations within the Customer's control.

    10.4. The Customer shall be obliged to keep the login names and the passwords required for the use of the Application confidential, to keep it in a safe place, and to protect it against unauthorized access by third parties with appropriate precautions, and to instruct its Authourized Users to observe copyright regulations. Personal access data must be changed at regular intervals.

    10.5. Before entering its data and information, the Customer shall be obliged to check the same for viruses or other harmful components and to use state of the art anti-virus programs for this purpose. In addition, the Customer itself shall be responsible for the entry and the maintenance of its data.

    10.6. Service Provider has the right (but not the obligation) to suspend access to the Application or remove any data or content transmitted via the Application without liability (i) if Service Provider reasonably believes that the Application is being used in violation of these SaaS Terms or applicable law, (ii) if requested by a law enforcement or government agency or otherwise to comply with applicable law, provided that Service Provider shall use commercially reasonable efforts to notify Customer prior to suspending the access to the Application as permitted under these SaaS Terms, or (iii) as otherwise specified in these SaaS Terms. Information on Service Provider's servers may be unavailable to Customer during a suspension of access to the Software. Service Provider will use commercially reasonable efforts to give Customer at least twelve (12) hours' notice of a suspension unless Service Provider determines in its commercially reasonable judgment that a suspension on shorter or contemporaneous notice is necessary to protect Service Provider or its customers.

11. MISCELLANEOUS

    11.1. Assignment. Customer may not assign these SaaS Terms or otherwise transfer any license created hereunder whether by operation of law, change of control, or in any other manner, without the prior written consent of Service Provider. Any purported assignment of these SaaS Terms, or any license or rights in violation of this Section will be deemed void. The Service Provider may assign, in whole or in part, its rights, interests, and obligations hereunder without limitation.

    11.2. Third Parties. Service Provider will have the right to use third parties, including, but not limited to, employees of Service Provider's affiliates and subsidiaries (“Subcontractors”) in performance of its obligations and services hereunder and, for purposes of these SaaS Terms, all references to Service Provider or its employees will be deemed to include such Subcontractors.

    11.4. Compliance with Laws. Both parties agree to comply with all applicable laws, regulations, and ordinances relating to such party's performance under these SaaS Terms.

    11.5. Survival. The provisions set forth in Sections 2, 4, 5, 6.4, 8, 9.3, 9.4 and 11 of these SaaS Terms will survive termination or expiration of these SaaS Terms and any applicable license hereunder.

    11.6. Notices. Any notice required under these SaaS Terms shall be given in writing and will be deemed effective upon delivery to the party to whom addressed. All notices shall be sent to the applicable address specified on the Quote or to such other address as the parties may designate in writing. Any notice of material breach will clearly define the breach including the specific contractual obligation that has been breached.

    11.7. Force Majeure. Service Provider will not be liable to Customer for any delay or failure of Service Provider to perform its obligations hereunder if such delay or failure arises from any cause or causes beyond the reasonable control of Service Provider. Such causes will include, but are not limited to, acts of God, floods, fires, loss of electricity or other utilities, or delays by Customer in providing required resources or support or performing any other requirements hereunder.

    11.9. Entire Agreement. These SaaS Terms together with the documents listed in the applicable Quote constitute the entire agreement between the parties regarding the subject matter hereof and supersedes all proposals and prior discussions and writings between the parties with respect to the subject matter contained herein. Any signed copy of these SaaS Terms made by reliable means will be considered an original.

    11.10. Modifications. The parties agree that these SaaS Terms cannot be altered, amended or modified, except by a writing signed by an authorized representative of each party.

    11.11. Non-solicitation. During the term of these SaaS Terms and for a period of two (2) years thereafter, Customer agrees not to hire, solicit, nor attempt to solicit, the services of any employee or Subcontractor of Service Provider without the prior written consent of Service Provider. Customer further agrees not to hire, solicit, nor attempt to solicit, the services of any former employee or Subcontractor of Service Provider for a period of one (1) year from such former employee's or Subcontractor's last date of service with Service Provider. Violation of this provision will entitle Service Provider to liquidated damages against Customer equal to two hundred percent (200%) of the solicited person's gross annual compensation.

    11.12. Headings. Headings are for reference purposes only, have no substantive effect, and will not enter into the interpretation hereof.

    11.13. No Waiver. No failure or delay in enforcing any right or exercising any remedy will be deemed a waiver of any right or remedy.

    11.14. Severability and Reformation. Each provision of these SaaS Terms is a separately enforceable provision. If any provision of these SaaS Terms is determined to be or becomes unenforceable or illegal, such provision will be reformed to the minimum extent necessary in order for these SaaS Terms to remain in effect in accordance with its terms as modified by such reformation.

    11.15. Independent Contractor. Service Provider is an independent contractor and nothing in these SaaS Terms will be deemed to make Service Provider an agent, employee, partner, or joint venturer of Customer. Neither party will have authority to bind, commit, or otherwise obligate the other party in any manner whatsoever.

    11.16. Governing Law; Venue. The laws of the State of Haryana, India govern the interpretation of these SaaS Terms, regardless of conflict of laws principles. The United Nations Convention on Contracts for the International Sale of Goods (1980) and the Uniform Computer Information Transactions Act (UCITA) are hereby excluded in their entirety from application to these SaaS Terms. The parties agree that the federal and state courts located in Mumbai, Haryana, India will have exclusive jurisdiction for any dispute arising under, out of, or relating to these SaaS Terms. Mediation will be held in Yamunanagar, Haryana, India.

    11.17. Dispute Resolution. Negotiations. Where there is a dispute, controversy, or claim arising under, out of, or relating to these SaaS Terms, the aggrieved party shall notify the other party in writing of the nature of such dispute with as much detail as possible about the alleged deficient performance of the other party. A representative from senior management of each of the parties shall meet in person or communicate by telephone within five (5) business days of the date of the written notification in order to reach an agreement about the nature of the alleged deficiency and the corrective action to be taken by the respective parties. Mediation. Any dispute, controversy, or claim arising under, out of, or relating to these SaaS Terms and any subsequent amendments of these SaaS Terms, including, without limitation, its formation, validity, binding effect, interpretation, performance, breach, or termination, as well as non-contractual claims, and any claims with respect to the validity of this mediation agreement (hereinafter the “Dispute”), shall be submitted to mediation in accordance with the then-current WIPO Mediation Rules. The language to be used in the mediation will be English. Opportunity to Cure. Notwithstanding anything contained hereunder, Customer agrees and acknowledges that no dispute resolution or litigation will be pursued by Customer for any breach of these SaaS Terms until and unless Service Provider has had an opportunity to cure any alleged breach. Customer agrees to provide Service Provider with a detailed description of any alleged failure and a description of the steps that Customer understands must be taken by Service Provider to resolve the failure. Service Provider shall have sixty (60) days from Service Provider's receipt of Customer's notice to complete the cure. Injunctive Relief. The parties agree that it will not be inconsistent with their duty to mediate to seek injunctive or other interim relief from a competent court. The parties, in addition to all other available remedies, shall each have the right to initiate an action in any court of competent jurisdiction in order to request injunctive or other interim relief with respect to a violation of intellectual property rights or confidentiality obligations. The choice of venue does not prevent a party from seeking injunctive or any interim relief in any appropriate jurisdiction.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
