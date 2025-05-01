import { useLocation } from "react-router-dom"
import { WebsiteLayout } from "../components/common/WebsiteLayout"
import { Wrapper } from "../components/common/Wrapper"
import usePageTitle from "../hook/usePageTitle"

const links = [
  "introduction",
  "data-collection",
  "how-personal-data-is-collected",
  "use-of-your-personal-data",
  "how-you-can-withdraw-consent",
  "purpose-of-this-policy",
  "third-party-links",
  "cookies",
  "data-sharing",
  "data-security",
  "data-retention",
  "user-legal-rights",
  "what-we-may-need-from-you",
  "online-payment-methods",
  "marketing-opt-out",
  "child-privacy",
  "google-analytics",
  "changes-to-privacy-policy",
  "scope",
];

export const LegalPrivacy = () => {
  usePageTitle("Legal & Privacy | Amaraé");
  const { hash } = useLocation();
  console.log("hash", hash);

  return (
		<WebsiteLayout>
			<section className='py-5'>
				<Wrapper className='flex flex-col lg:gap-4'>
					<h1 className='text-xl font-abril font-bold'>Legal & Privacy</h1>

					<div className='md:grid md:grid-cols-3 flex flex-col gap-4'>
						<div className='md:col-span-1 text-white h-fit hidden md:flex flex-col gap-4 sticky top-2 left-0 bg-rebel-ruby-100 p-8 rounded'>
							<p className='font-medium'>Table of Contents</p>

							<ul className='pl-4 text-sm flex flex-col gap-3 py-1 border-l border-l-[#D45B7A]'>
								{links.map(link => (
									<li
										key={link}
										className={`capitalize relative ${
											hash === `#${link}`
												? 'font-bold after:w-[3px] after:h-full after:bg-white after:absolute after:-left-[18px] after:top-0'
												: ''
										}`}>
										<a href={`#${link}`}>{link.replaceAll('-', '  ')}</a>
									</li>
								))}
							</ul>
						</div>

						<article className='md:col-span-2 flex flex-col leading-relaxed gap-4 lg:px-8'>
							<p>
								When you visit or use AMARAÉ, you trust us with your personal data.
								We are committed to keeping that trust and protecting the privacy of
								our visitors. That starts with helping you understand our privacy
								practices. This Privacy Policy provides our visitors with an
								overview of the measures we have taken to show our commitment to
								this policy. It describes how we collect, use, store, share, and
								protect your information whenever you use our services, and it is
								important that you read that information to understand our practices
								regarding your personal data and how we will treat it.
							</p>

							<p>
								Reference in this policy to “AMARAÉ”, “we”, “us”, “our” or any
								similar term is Bespoke by AMARAÉ Limited with RC 7025693 who is the
								data controller.
							</p>

							<ol className='list-decimal flex flex-col gap-2 list-inside'>
								<li id='introduction'>
									<strong>Introduction</strong>

									<ul className='list-disc list-outside pl-8'>
										<li>
											<span>
												This Privacy Policy (Policy) and any additional
												terms of use incorporated by reference into this
												Policy, together our Terms of Use applies to:
											</span>

											<ul className='list-disc list-outside pl-8'>
												<li>
													your use of AMARAÉ mobile application software
													(App) or use of the AMARAÉ website [WEBSITE]
													(AMARAÉ Site)
												</li>
												<li>
													Any of the services accessible through the App
													or that are available on the AMARAÉ Site or
													other sites of ours (together the Services Sites
													or Sites) (AMARAÉ Services).
												</li>
											</ul>
										</li>
									</ul>
								</li>

								<li id='data-collections'>
									<strong>Data collections</strong>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											Under this Policy, personal data, or personal
											information, means any information about an individual
											from which that person can be identified.
										</li>

										<li>
											<span>
												We may collect, use, store and transfer different
												kinds of personal data which we have grouped
												together as follows:
											</span>

											<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
												<li>
													<strong>Identity Data</strong> includes your
													name, first name, maiden name, last name,
													username or similar identifier, marital status,
													title, date of birth and gender.
												</li>
												<li>
													<strong>Contact Data</strong> includes your
													contact address, email address and telephone
													numbers.
												</li>
												<li>
													<strong>Financial Data</strong> includes your
													bank account and payment card details that you
													input when you use the AMARAÉ Services. If you
													do not use AMARAÉ, you may opt out of providing
													this information.
												</li>
												<li>
													<strong>Transaction Data</strong> includes
													details about payments to and from you and other
													details of products and services you have
													purchased from and through us.
												</li>
												<li>
													<strong>Technical Data</strong> includes your
													internet protocol (IP) address, your login data,
													browser type and version, time zone setting and
													location, browser plug-in types and versions,
													operating system and platform, and other
													technology on the devices you use to access this
													website.{' '}
												</li>
												<li>
													<strong>Profile Data</strong> includes your
													username and password, purchases or orders made
													by you, your interests, preferences, feedback
													and survey responses.
												</li>
												<li>
													<strong>Usage Data</strong> includes information
													about how you use the App, website, products and
													services.
												</li>
												<li>
													<strong>
														Marketing and Communications Data
													</strong>{' '}
													includes your preferences for receiving
													marketing from us and our third parties and your
													communication preferences.
												</li>
												<li>Location Data.</li>
											</ul>
										</li>

										<li>
											We also collect, use and share Aggregated Data such as
											statistical or demographic data for any purpose.
											Aggregated Data could be derived from your personal data
											but is not considered personal data in law as this data
											will not directly or indirectly reveal your identity.
											For example, we may aggregate your Usage Data to
											calculate the percentage of users accessing a specific
											website feature. However, if we combine or connect
											Aggregated Data with your personal data so that it can
											directly or indirectly identify you, we treat the
											combined data as personal data which will be used in
											accordance with this Policy.
										</li>
									</ul>
								</li>

								<li id='how-personal-data-is-collected'>
									<strong>How Personal Data Is Collected</strong>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											We are required to provide you with certain information
											about who we are, how we process your personal data and
											for what purposes, and your rights in relation to your
											personal data. When we open and operate an account for
											you, provide you with our products and services, or
											communicate with you, we may collect your personal data.
											This may be done in several ways including:
										</li>

										<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
											<li>
												<strong>Information you give us:</strong> This is
												information including identity, contact and other
												personal data you consent to giving us about you by
												signing up for an AMARAÉ account or filling in forms
												on the App, AMARAÉ Site and the Services Sites, or
												by corresponding with us either by email or chat. It
												includes but is not limited to information you
												provide when you register to use the App or Services
												Sites, download or register to the App, subscribe to
												any of our Services, search for a Service on the
												AMARAÉ Site, share data via social media functions,
												promotion or survey, or other activities commonly
												carried out in connection with the App, AMARAÉ Sites
												or Services Sites, and when you report a problem
												with the App, our Services, or any of our Sites. If
												you contact us, we will keep a record of that
												correspondence.{' '}
											</li>
											<li>
												<strong>
													Information we collect about you and your
													device.
												</strong>{' '}
												Each time you visit our Services Sites or use our
												App, we will automatically collect personal data
												including device, content and usage data. We collect
												this data using Cookies and other similar
												technologies.{' '}
											</li>
											<li>
												<strong>Location Data.</strong> We also use GPS
												technology or other technology to determine your
												current location. Some of our location-enabled
												Services require your personal data for the feature
												to work. If you wish to use this particular feature,
												you will be asked to consent to your data being used
												for this purpose. You can withdraw your consent at
												any time by disabling Location Data in your settings
												or any other way in which consent can be withdrawn.
											</li>
											<li>
												<strong>Transaction information:</strong> We collect
												transaction information related to the use of our
												Services, including the type of services requested
												or provided, order details, delivery information,
												date and time the Service was provided, amount
												charged, distance travelled, and payment method.
												Additionally, if someone uses your promotion code,
												we may associate your name with that person.
											</li>
											<li>
												<strong>Device data:</strong> We may collect data
												about the devices used to access our Services,
												including the hardware models, device IP address,
												operating systems and versions, software, preferred
												languages, unique device identifiers, advertising
												identifiers, serial numbers, device motion data, and
												mobile network data.
											</li>
											<li>
												<strong>Unique application numbers.</strong> When
												you want to install or uninstall a Service
												containing a unique application number or when such
												a Service searches for automatic updates, that
												number and information about your installation, for
												example, the type of operating system, may be sent
												to us.
											</li>
											<li>
												<strong>
													Information we receive from other sources
													including third parties and publicly available
													sources.
												</strong>{' '}
												We will receive personal data about you from various
												third parties and public sources such as:{' '}
											</li>
										</ul>

										<li>User feedback, ratings, or compliments.</li>
										<li>
											Users participating in our referral programs. For
											example, when a user refers to another person, we
											receive the referred person’s personal data from that
											user.
										</li>
										<li>
											Users who request services for or on behalf of other
											users, or who enable such users to request or receive
											services through their accounts.
										</li>
										<li>
											Users or others providing information in connection with
											claims or disputes.{' '}
										</li>
										<li>
											Publicly available sources (for example, telephone
											directory, social media, internet, news articles) and
											organisations to assist in prevention and detection of
											crime, police and law enforcement agencies.
										</li>
										<li>
											Marketing service providers.
											<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
												<li>
													When you use the AMARAÉ Services, we collect
													information provided to us through your
													computer, mobile phone, or other access device.
													This includes personal data that you volunteer
													on forms which you submit to us and in emails
													that you send to us. In addition, we
													automatically gather details of browser types
													and IP addresses of the users who visit our
													site. We do not release this information to any
													outside party, except in suspected fraud cases.
												</li>
												<li>
													When you use AMARAÉ, we collect information
													about your transactions and/or your other
													activities on our website and we may
													continuously collect information about your
													computer, mobile device, or other access device
													for fraud prevention purposes, to monitor for
													possible breach of your AMARAÉ Account, and to
													identify any malicious software or other
													activity that may harm AMARAÉ or its users.
												</li>
												<li>
													You may choose to provide us with access to
													certain personal information stored by third
													parties such as social media sites (such as
													Facebook and Twitter). The information we have
													access to varies by site and is controlled by
													your privacy settings on that site and your
													authorisation. By associating an account managed
													by a third party with your AMARAÉ account and
													authorising AMARAÉ to have access to this
													information, you agree that AMARAÉ may collect,
													store, and use this information in accordance
													with this Privacy Policy.
												</li>
												<li>
													Finally, we may collect additional information
													you may disclose to our customer support team.
													When you use AMARAÉ Services, we collect
													information sent to us through your computer,
													mobile phone, or other access device. This
													includes personal data that you volunteer on
													forms which you submit to us and in emails that
													you send to us. In addition, we automatically
													gather details of browser types and IP addresses
													of the users who visit our site. We do not
													release this information to any outside party,
													except in suspected fraud cases.
												</li>
											</ul>
										</li>
									</ul>
								</li>

								<li id='use-of-your-personal-data'>
									<strong>Use of your personal data</strong>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											We need all the personal data listed above primarily to
											allow us to comply with our legal obligations.
										</li>
										<li>
											We process your personal data for a number of purposes,
											including:
											<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
												<li>
													Provide services including generating a QR Code,
													initiate payment, authenticate access to account
													and communicate users to accounts.
												</li>
												<li>
													sing device, location, profile, usage, and other
													data to prevent, detect, and combat fraud or
													unsafe activities.
												</li>
												<li>
													Perform internal operations necessary to provide
													our Services, including to troubleshoot software
													bugs and operational problems.{' '}
												</li>
												<li>
													To conduct data analysis, testing, and research;
													and to monitor and analyse usage and activity
													trends.
												</li>
												<li>
													Enabling accessibility features that make it
													easier for users with disabilities to use our
													services.
												</li>
												<li>
													Testing, research, analysis, product
													development, and machine learning to improve the
													user experience.{' '}
												</li>
												<li>
													To improve and enhance the safety and security
													of our services.
												</li>
												<li>
													To improve our capacity to prevent the use of
													our services for illegal or improper purposes,
													develop new features and products, and
													facilitate insurance and finance solutions in
													connection with our services.
												</li>
												<li>Enabling communications between users.</li>
												<li>
													Legal proceedings and requirements. We may use
													the personal data we collect to investigate or
													address claims or disputes relating to use of
													AMARAÉ Services, or as otherwise allowed by
													applicable law, or as requested by regulators,
													government entities, and official inquiries.
												</li>
												<li>
													Resolving disputes and troubleshooting problems.
												</li>
												<li>
													Deactivating users who are identified as having
													engaged in fraud or activities that may
													otherwise harm AMARAÉ.
												</li>
												<li>
													Managing risk, fraud and abuse of our services
													and you from fraud by verifying your identity.{' '}
												</li>
											</ul>
										</li>
									</ul>
								</li>

								<li id='how-you-can-withdraw-consent'>
									<strong>HOW YOU CAN WITHDRAW CONSENT</strong>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											Once you provide consent by selecting "YES" or “ACCEPT”,
											you may change your mind and withdraw consent at any
											time by contacting us but that will not affect the
											lawfulness of any processing carried out before you
											withdraw your consent.{' '}
										</li>
										<li>
											We are committed to protecting your personal data and
											respecting your privacy.
										</li>
									</ul>
								</li>

								<li id='purpose-of-this-policy'>
									<strong>Purpose of this policy</strong>
									<p>
										This Policy sets out the basis on which any personal data we
										collect from you, or that you provide to us, will be
										processed by us and tells you about your privacy rights and
										how the law protects you. The App is not intended for
										children or minors (individuals below 18 years old) and we
										do not knowingly collect data relating to children or minors
										(individuals below 18 years old).
									</p>
								</li>

								<li id='third-party-links'>
									<strong>Third party links</strong>
									<p>
										Our Site may, from time to time, contain links to and from
										websites of our partner networks, advertisers and
										affiliates. Please note that these websites and any services
										that may be accessible through them have their own privacy
										policies and we do not accept any responsibility or
										liability for these policies or for any personal data that
										may be collected through these websites or services, such as
										contact and location data. Please check these policies
										before you submit any personal data to these websites or use
										these services.
									</p>
								</li>

								<li id='cookies'>
									<strong>Cookies and How we Use Cookies</strong>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											As is common practice with almost all professional
											websites, the App and our Sites uses cookies, which are
											tiny files that are downloaded to your computer which
											allow us to remember your actions or preferences over
											time thereby helping us to improve your experience with
											using our Site. We intend to use cookies for a variety
											of reasons detailed below:
											<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
												<li>To track site usage and browsing behaviour;</li>
												<li>
													To allow you to sign in to your account and
													navigate through the website;
												</li>
												<li>
													To tailor our website’s functionality to you
													personally by letting us remember your
													preferences;
												</li>
												<li>To improve how our website performs;</li>
												<li>
													To allow third parties to provide services to
													our website;
												</li>
												<li>
													To monitor the effectiveness of our promotions
													and advertising; and
												</li>
												<li>
													To mitigate risk, enhance security and help
													prevent fraud.
												</li>
											</ul>
										</li>

										<li>
											We use both session and persistent cookies. Session
											cookies are deleted when you close your browser, while
											persistent cookies remain on your device until they
											expire or you delete them. Persistent cookies allow us
											to remember things about you when you visit our website
											again.
										</li>
										<li>
											When you submit data through a form, cookies may be set
											to remember your user details for future correspondence.
											In order to provide you with a great experience on the
											Sites, we provide the functionality to set your
											preferences for how the Sites run when you use it. In
											order to remember your preferences, we may need to set
											cookies so that this information can be called whenever
											you interact with a page that is affected by your
											preferences.
										</li>
										<li>
											We may also use local shared objects, commonly referred
											to as "Flash Cookies," to help ensure that your account
											security is not compromised, to spot irregularities in
											behaviour to help prevent fraud, and to support our
											sites and services. We may use cookies to collect
											information about your computer or other access device
											to mitigate risk, help prevent fraud, and promote trust
											and safety.
										</li>
										<li>
											We shall encode our cookies so that only we can
											interpret the information stored in them. You are free
											to decline our cookies if your browser or browser add-on
											permits, but doing so may interfere with your use of
											AMARAÉ Services. Disabling cookies will usually result
											in also disabling certain functionality and features of
											the AMARAÉ Site. The help section of most browsers or
											browser add-ons provides instructions on blocking,
											deleting, or disabling cookies.
										</li>
										<li>
											We use both Session and Persistent Cookies for the
											purposes set out below:
											<p>
												Necessary / Essential Cookies Type: Session Cookies
												Administered by: Us Purpose: These Cookies are
												essential to provide You with services available
												through the Website and to enable You to use some of
												its features. They help to authenticate users and
												prevent fraudulent use of user accounts. Without
												these Cookies, the services that You have asked for
												cannot be provided, and We only use these Cookies to
												provide You with those services. Cookies Policy /
												Notice Acceptance Cookies Type: Persistent Cookies
												Administered by: Us Purpose: These Cookies identify
												if users have accepted the use of cookies on the
												Website.
											</p>
											<p>
												Functionality Cookies Type: Persistent Cookies
												Administered by: Us Purpose: These Cookies allow us
												to remember choices You make when You use the
												Website, such as remembering your login details or
												language preference. The purpose of these Cookies is
												to provide You with a more personal experience and
												to avoid You having to re-enter your preferences
												every time You use the Website.
											</p>
										</li>

										<li>
											THIRD PARTY COOKIES
											<ul>
												<li>
													In some special cases, we also use cookies
													provided by trusted third parties. We may use
													authorised third-party providers to help us with
													various aspects of our business, such as website
													operations, services, applications, advertising,
													support tools and to serve you relevant content.
												</li>
												<li>
													These service providers may place cookies on
													your device (third-party cookies) or make use of
													similar tracking technologies such as web
													beacons. No personally identifiable information
													is stored in third-party cookies. The
													information reported to us is aggregated and
													anonymous. We use this information to
													understand, for example, the effectiveness of
													our advertising and marketing. Web beacons are
													small graphic images (also known as “pixel tags”
													or “clear GIFs”) which may be used to collect
													and store information about visits to our
													website (such as which pages you viewed and how
													long you spent on the website) and communication
													efficiency (such as the email delivery and open
													rates). Where necessary, the information
													gathered by web beacons may be tied to your
													personal data strictly for the purposes set out
													herein.
												</li>
												<li>
													The AMARAÉ Site may contain links to third-party
													websites and applications of interest, including
													advertisements and external services, that are
													not affiliated with us. Once you have used these
													links to leave the AMARAÉ Site, any information
													you provide to these third parties is not
													covered by this Policy, and we cannot guarantee
													the safety and privacy of your information.
												</li>
												<li>
													Before visiting and providing any information to
													any third-party websites, you should inform
													yourself of the privacy policies and practices
													(if any) of the third party responsible for that
													website, and should take those steps necessary
													to, in your discretion, protect the privacy of
													your information. We are not responsible for the
													content or privacy and security practices and
													policies of any third parties, including other
													sites, services or applications that may be
													linked to or from the AMARAÉ Site.
												</li>
												<li>
													Cookies in no way gives us access to your
													computer or any information about you, other
													than the data you choose to share with us.
													Certain aspects and features of our services are
													only available through the use of cookies. By
													signing up for an account with AMARAÉ, or
													continuing to use our website, you agree to our
													use of cookies as set out in this policy. You
													may decline our cookies if your browser or
													browser add-on permits, but doing so may
													interfere with your use of AMARAÉ services. For
													information on how to delete or reject cookies,
													you can consult the "Help" function within your
													browser, or visit www.allaboutcookies.org, where
													you will also find more information data about
													cookies generally.
												</li>
											</ul>
										</li>
									</ul>
								</li>

								<li id='data-sharing'>
									<strong>Data sharing and disclosure</strong>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											Some of our products, Services, and features require
											that we share your data with other users or at a user’s
											request. We may also share your data with our
											affiliates, subsidiaries, and partners, for legal
											reasons or in connection with claims or disputes.{' '}
										</li>

										<li>
											We may share your data:
											<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
												<li>
													With other companies that provide services to
													us: We may share personal data with third-party
													service providers that perform services and
													functions at our direction and on our behalf.
													These third-party service providers may, for
													example, provide you with services, verify your
													identity, assist in processing transactions,
													send you advertisements for our products and
													services, or provide customer support.
												</li>
												<li>
													With other financial institutions: We may share
													personal data with other financial institutions
													that we have partnered with to only offer AMARAÉ
													services, unless you have given consent for
													other uses. We may also share personal data to
													process transactions and keep your financial
													information up to date.
												</li>
												<li>
													With the other parties to transactions when you
													use the services, such as other users and their
													service providers: The information might
													include:
													<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
														<li>
															Personal Data and account information
															necessary to facilitate a transaction;
															and
														</li>
														<li>
															Personal Data to help other
															participant(s) resolve disputes and
															detect and prevent fraud.
														</li>
													</ul>
												</li>
												<li>
													At the user’s request: This includes sharing
													data with:
													<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
														<li>other people at the user’s request.</li>
														<li>
															with the general public: Questions or
															comments from users submitted through
															public forums such as AMARAÉ website and
															social media pages may be viewable by
															the public, including any personal data
															included in the questions or comments
															submitted by a user.
														</li>
													</ul>
												</li>
												<li>
													With our professional advisers, consultants and
													other similar services.
												</li>
												<li>
													For business transfers: We may share or transfer
													user’s personal information in connection with,
													or during negotiations of, any merger, sale of
													company assets, financing, or acquisition of all
													or a portion of our business to another company.
												</li>
												<li>
													With Affiliates: We may share user’s information
													with our affiliates, in which case we will
													require those affiliates to any subsidiaries,
													joint venture partners or other companies that
													we control or that are under common control with
													us.
												</li>
												<li>
													With business partners: We may share user’s
													information with any business partners to offer
													you certain products, services or promotions.
												</li>
												<li>
													For legal reasons or in the event of a dispute:
													We may share your personal data if we believe it
													is required by applicable law, regulation,
													operating license or agreement, legal process or
													governmental request, or where the disclosure is
													otherwise appropriate due to safety or similar
													concerns. This includes sharing personal data
													with law enforcement officials, public health
													officials, other government authorities, or
													other third parties as necessary to enforce our
													Terms of Service, user agreements, or other
													policies; to protect our rights or property or
													the rights, safety, or property of others; or in
													the event of a claim or dispute relating to the
													use of our services. If you use another person’s
													credit card, we may be required by law to share
													your personal data, including trip or order
													information, with the owner of that credit card.
													This also includes sharing personal data with
													others in connection with, or during
													negotiations of, any merger, sale of company
													assets, consolidation or restructuring,
													financing, or acquisition of all or a portion of
													our business by or into another company.
												</li>
												<li>
													With user’s consent: We may share a user’s
													personal data other than as described in this
													Policy if we notify the user and they consent to
													the sharing.
												</li>
											</ul>
										</li>
									</ul>
								</li>

								<li id='data-security'>
									<strong>Data Security </strong>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											AMARAÉ places great importance on ensuring the security
											of your personal data. All information you provide to us
											is stored on our secure servers. Where we have given
											you/or where you have chosen a password that enables you
											to access our app or certain parts of our Sites, you are
											responsible for keeping this password confidential. We
											ask you not to share your password with anyone.
										</li>
										<li>
											Once we have received your information, we will use
											strict procedures and security features to try to
											prevent your personal data from being accidentally lost,
											used or accessed in an unauthorised way.{' '}
										</li>
										<li>
											We have put in place procedures to deal with any
											suspected personal data breach and will notify you and
											any applicable regulator when we are legally required to
											do so.
										</li>
									</ul>
								</li>

								<li id='data-retention'>
									<strong>Data retention and deletion </strong>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											We retain your personal information as long as it is
											necessary and relevant for our operations. In addition,
											we may retain personal information from closed accounts
											to comply with national laws, prevent fraud, collect any
											fees owed, resolve disputes, troubleshoot problems,
											assist with any investigation, enforce our Terms of Use
											and take other actions permitted or required by
											applicable national laws.
										</li>
										<li>
											To determine the appropriate retention period for
											personal data, we consider the amount, nature and
											sensitivity of the personal data, the potential risk of
											harm from unauthorised use or disclosure of your
											personal data, the purposes for which we process your
											personal data and whether we can achieve those purposes
											through other means, and the applicable legal,
											regulatory, tax, accounting or other requirements.
										</li>
									</ul>
								</li>

								<li id='user-legal-rights'>
									<strong>User legal rights</strong>
									<p>
										Under certain circumstances, you have the following rights
										in relation to your personal data:
									</p>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											Request access to your personal data (commonly known as
											a "data subject access request"). This enables you to
											receive a copy of the personal data we hold about you
											and to check that we are lawfully processing it.
										</li>
										<li>
											Request correction of the personal data that we hold
											about you. This enables you to have any incomplete or
											inaccurate data we hold about you corrected, though we
											may need to verify the accuracy of the new data you
											provide to us.
										</li>
										<li>
											Request erasure of your personal data. This enables you
											to ask us to delete or remove personal data where there
											is no good reason for us to continue to process it. You
											also have the right to ask us to delete or remove your
											personal data where you have successfully exercised your
											right to object to processing (see below), where we may
											have processed your data unlawfully or where we are
											required to erase your personal data to comply with
											local law. Note, however, that we may not always be able
											to comply with your request of erasure for specific
											legal reasons which will be notified to you, if
											applicable, at the time of your request.
										</li>
										<li>
											Object to processing of your personal data where we are
											relying on a legitimate interest (or those of a third
											party) and there is something about your particular
											situation which makes you want to object to processing
											on this ground as you feel it impacts on your
											fundamental rights and freedoms. You also have the right
											to object where we are processing your personal data for
											direct marketing purposes. In some cases, we may
											demonstrate that we have compelling legitimate grounds
											to process your information which override your rights
											and freedoms.
										</li>

										<li>
											Request restriction of processing of your personal data.
											This enables you to ask us to suspend the processing of
											your personal data in the following scenarios:
											<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
												<li>
													if you want us to establish the data's accuracy;
												</li>
												<li>
													where our use of the data is unlawful, but you
													do not want us to erase it;
												</li>
												<li>
													where you need us to hold the data even if we no
													longer require it as you need it to establish,
													exercise or defend legal claims; or
												</li>
												<li>
													you have objected to our use of your data, but
													we need to verify whether we have overriding
													legitimate grounds to use it.
												</li>
											</ul>
										</li>
										<li>
											Request the transfer of your personal data to you or to
											a third party. We will provide to you, or a third party
											you have chosen, your personal data in a structured,
											commonly used, machine-readable format. Note that this
											right only applies to automated information which you
											initially provided consent for us to use or we used the
											information to perform a contract with you.
										</li>
										<li>
											Withdraw consent at any time where we are relying on
											consent to process your personal data. However, this
											will not affect the lawfulness of any processing carried
											out before you withdraw your consent. If you withdraw
											your consent, we may not be able to provide certain
											products or services to you. We will advise you if this
											is the case at the time you withdraw your consent.
										</li>
										<li>
											File a complaint with appropriate authorities on how we
											have handled your personal data.
										</li>
									</ul>
								</li>

								<li id='what-we-may-need-from-you'>
									<strong>What we may need from you </strong>

									<ul className='list-disc flex flex-col gap-2 list-outside pl-8'>
										<li>
											We may need to request specific information from you to
											help us confirm your identity and ensure your right to
											access your personal data or to exercise any of your
											other rights. This is a security measure to ensure that
											personal data is not disclosed to any person who has no
											right to receive it. We may also contact you to ask you
											for further information in relation to your request to
											speed up our response.
										</li>
										<li>
											You may request that we amend any personal data that we
											are holding about you which is factually inaccurate. You
											can contact Customer Support stating your wishes.
										</li>
									</ul>
								</li>

								<li id='online-payment-methods'>
									<strong>Online Payment methods</strong>
									<p>
										AMARAÉ is not associated with any of the trademarks which
										might appear visible in the online payment method lists or
										payment gateways such as [TYPES]. AMARAÉ does not itself
										support these payment methods, or claim to be in partnership
										with them. Also, services provided by AMARAÉ are not
										authorised, approved, endorsed or sponsored by any of the
										payment methods we use or their respective trademark owners.
										Payment method listings are visible on the AMARAÉ website
										for informative purposes only. Trademarks which might appear
										visible on the AMARAÉ website, belong to the respective
										trademark owners alone.
									</p>
								</li>

								<li id='marketing-opt-out'>
									<strong>Marketing Opt-Out</strong>
									<p>
										You may also opt out of promotional emails or receiving
										emails and other messages from AMARAÉ by following the
										unsubscribe instructions in those messages. We may still
										send users who have opted out non-promotional
										communications, such as receipts or information about their
										account.
									</p>
								</li>

								<li id='children-privacy'>
									<strong>Children’s Privacy</strong>
									<p>
										AMARAÉ Service does not address anyone under the age of 16.
										We do not knowingly collect personally identifiable
										information from anyone under the age of 16. If You are a
										parent or guardian and you are aware that your child has
										provided us with Personal Data, please contact Us. If We
										become aware that We have collected Personal Data from
										anyone under the age of 16 without verification of parental
										consent, We take steps to remove that information from Our
										servers.
									</p>
								</li>

								<li id='google-analytics'>
									<strong>Google Analytics</strong>
									<p>
										Google Analytics is a web analytics service offered by
										Google that tracks and reports website traffic. Google uses
										the data collected to track and monitor the use of our
										Services. This data is shared with other Google services.
										Google may use the collected data to contextualise and
										personalise the ads of its own advertising network. For more
										information on Google’s privacy practices, please visit the
										Google privacy terms web page:{' '}
										<a
											className='hover:text-rebel-ruby-100 underline transition-colors'
											href='https://policies.google.com/privacy?hl=en'>
											https://policies.google.com/privacy?hl=en
										</a>
										. We also encourage you to review Google's policy for
										safeguarding your data:{' '}
										<a
											className='hover:text-rebel-ruby-100 underline transition-colors'
											href='https://support.google.com/analytics/answer/6004245'>
											https://support.google.com/analytics/answer/6004245
										</a>
										.
									</p>
								</li>

								<li id='changes-to-privacy-policy'>
									<strong>Changes to this Privacy Policy</strong>
									<p>
										We may update Our Privacy Policy from time to time. We will
										notify you of any changes by posting the new Privacy Policy
										on this page. We will let you know via email and/or a
										prominent notice on Our Service, prior to the change
										becoming effective and update the "Last updated" date at the
										top of this Privacy Policy. You are advised to review this
										Privacy Policy periodically for any changes. Changes to this
										Privacy Policy are effective when they are posted on this
										page
									</p>
								</li>

								<li id='scope'>
									<strong>Scope</strong>
									<p>
										This Policy applies to individuals who request or receive
										services and products using the AMARAÉ Site or App..
									</p>
								</li>
							</ol>

							<p>
								If you have any questions about this Privacy Policy, the practices,
								or your dealing with our Sites, please contact us at{' '}
								<a
									className='hover:text-rebel-ruby-100 underline transition-colors'
									href='mailto:support@amarae.io'>
									support@amarae.io
								</a>{' '}
								and your inquiry will be dealt with as soon as possible.{' '}
							</p>
						</article>
					</div>
				</Wrapper>
			</section>
		</WebsiteLayout>
  )
};
