import PolicyPage from '../components/legal/PolicyPage'

const sections = [
  {
    title: 'Our Company',
    body: 'Our Company complies with reasonable security practices and procedures to protect the sensitive and personal information collected by us. Regular audits are conducted to ensure that reasonable security practices and procedures are in place.',
  },
  {
    title: 'User Privacy',
    body: [
      'The user’s right to privacy is of paramount importance to us. Any information provided by the user will not be shared with any third party. We do everything we reasonably can to protect your rights of privacy on systems and the website controlled by us, but we are not liable for any unauthorized or unlawful disclosures of your personal and confidential information made by third parties who are not subject to our control, for example, courier agencies and intermediaries that have links to our order processing system.',
      'You should take note that the information and privacy practices of our business partners, advertisers, sponsors or other sites to which we provide hyperlinks, may be different from ours. Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.',
      'We collect email address, name, phone number when you use our services or products. This information is used to send you personalized offers, product & service updates and health information based on your interests.',
    ],
  },
  {
    title: 'Personal Information',
    body: [
      'Sensitive personal data or any personal information (name including first and last name, email address, mobile phone number and contact details, age, date of birth, area ZIP/Postal Code, password); financial information such as bank account or credit card or debit card or other payment instrument details; physical, physiological and mental health condition; medical history; sexual orientation; medical records and history; biometric information (such as DNA, fingerprints, voice patterns, etc. that are used for authentication purposes); user interests, will be considered sensitive personal data or information under the Rule 3 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and any such information collected will be available for view by the user on the Website.',
      'Any personal/sensitive information will not be disclosed by Falcon Ayurveda to any third party without prior permission.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Falcon Ayurveda uses "cookies" to track usage patterns, traffic trends, and user behavior, as well as to record other information from the website. For certain services provided on this website, cookies allow Falcon Ayurveda and/or its group companies/affiliates to save information locally so that you will not have to re-enter it the next time you visit. Many content adjustments and customer service improvements are made based on the data derived from cookies. The information we collect from cookies will not be used to create profiles of users and will only be used in aggregate form.',
      'The User may set his/her/its browser to refuse cookies. If the User so chooses, the User may still gain access to most of the Website, but the User may not be able to conduct certain types of transactions (such as shopping) or take advantage of some of the interactive elements offered.',
      'If the User uses any of the sharing features that may be offered by the digital assets, the User’s friend’s email address will not be retained on Falcon Ayurveda Website or used in any way by Falcon Ayurveda or its group companies/affiliates.',
    ],
  },
]

function PrivacyPolicy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="Your right to privacy is of paramount importance to us. This policy explains how Falcon Ayurveda collects, uses and protects your information."
      updated="12 August 2026"
      sections={sections}
    />
  )
}

export default PrivacyPolicy
