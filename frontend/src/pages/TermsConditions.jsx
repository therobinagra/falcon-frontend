import PolicyPage from '../components/legal/PolicyPage'

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'The following terms and conditions will be deemed to have been accepted by the user on the usage of the website www.falconayurveda.com. You are requested to read them carefully before you use the services of the Falcon Ayurveda website, referred to as \u2018digital assets\u2019.',
  },
  {
    title: 'About Falcon Ayurveda',
    body: 'The digital assets are owned and maintained by Falcon Ayurveda, having its registered office at Shanti nagar, Professor colony kamla nagar Agra-283205. Falcon Ayurveda reserves the right to make changes to the digital assets and the terms, conditions, and disclaimers at any time and without prior information to the customers of the services.',
  },
  {
    title: 'Intellectual Property Rights',
    body: 'Unless otherwise indicated or anything contained to the contrary or any proprietary material owned by a third party or manufacturer or brand owner and so expressly mentioned, Falcon Ayurveda owns all Intellectual Property Rights to and into the digital assets, including, without limitation, any and all rights, title and interest in and to copyright, related rights, patents, trademarks, trade names, service marks, designs, trade secrets and inventions (whether patentable or not), goodwill, source code, meta tags, databases, text, content, graphics, icons, and hyperlinks. You acknowledge and agree that you shall not use, reproduce or distribute any content from this Website without obtaining authorization from Falcon Ayurveda.',
  },
  {
    title: 'User Security',
    body: 'By registering with the digital assets you can access or view the prices, product details, and submit purchase orders electronically. You are responsible for using digital assets in a private and secure manner. We will not be liable for any damage or loss caused by any unauthorized account access resulting from your actions, such as not logging out of the account or sharing your account password. We reserve the right to refuse registration or cancel an account at any time.',
  },
  {
    title: 'Warranties',
    body: [
      'Falcon Ayurveda makes no warranty for any damage suffered by customers from the use of the services on this site. Furthermore, it makes NO warranty that:',
      '• The information on the digital assets is a substitute for proper consultation and treatment from a Falcon Ayurveda Doctor or other registered medical practitioners;',
      '• The digital assets will be available on an uninterrupted, timely, secure, or error-free basis;',
      '• The results that may be obtained from the use of the digital assets or any services offered through the digital assets will treat any disease.',
    ],
  },
  {
    title: 'Usage',
    body: 'Falcon Ayurveda Website and other Digital or Print Informations are not a substitution for a face to face consultation with a qualified Falcon Ayurveda doctor. Under no circumstances should any patient stop taking prescribed medicines without consulting the doctor who prescribed it. The information provided in the digital assets is for general information of the consumers. The information in no way suggests or prescribes self-medication by the consumer. Further, any information available on the digital assets is not intended to be taken as a replacement for medical advice and treatment. Therefore, consumers of the digital assets should avoid self-treatment and consult a Falcon Ayurveda doctor and take the treatment under his or her proper guidance and advice.',
  },
  {
    title: 'Policies',
    body: 'The Sale/Purchase of products shall be additionally governed by specific policies of sale like cancellation policy, return policy, etc. which is available at, and all of which are incorporated here by reference. In addition, these terms and policies may be further supplemented by Product specific conditions, which may be displayed on the webpage of that particular Product.',
  },
  {
    title: 'Changes',
    body: 'Falcon Ayurveda reserves the right to amend, update, or modify these terms and conditions at any time without prior notice. By continuing to use the digital assets, you agree to be bound by the updated terms. Please review these terms periodically to stay aware of any changes.',
  },
]

function TermsConditions() {
  return (
    <PolicyPage
      title="Terms and Conditions"
      intro="Please read these terms and conditions carefully before using the services of the Falcon Ayurveda website."
      updated="12 August 2026"
      sections={sections}
    />
  )
}

export default TermsConditions
