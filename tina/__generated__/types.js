export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomepagePartsFragmentDoc = gql`
    fragment HomepageParts on Homepage {
  __typename
  seoTitle
  seoDescription
  locations
  heroHeadingPrefix
  heroHeadingHighlight
  tagline
  heroVideoPath
  heroPosterPath
  primaryCtaLabel
  primaryCtaLink
  secondaryCtaLabel
  secondaryCtaLink
  brandName
  expertiseList
  introHeading
  introBody
  introPrimaryLinkLabel
  introPrimaryLinkHref
  introSecondaryLinkLabel
  introSecondaryLinkHref
}
    `;
export const CambridgePagePartsFragmentDoc = gql`
    fragment CambridgePageParts on CambridgePage {
  __typename
  seoTitle
  seoDescription
  canonicalURL
  heroTag
  heroHeadingPrefix
  heroHeadingHighlight
  heroSubtitle
  heroCtaLabel
  heroCtaLink
  displayAs
  localVideoPath
  cloudVideoUrl
  imagePath
  expertiseTag
  expertiseHeading
  expertiseDescription
  expertiseBullets
  cardTitle
  cardBody
  cardLinkLabel
  cardLinkHref
  faqHeading
  faqs {
    __typename
    question
    answer
  }
  bottomCtaHeading
  bottomCtaBody
  bottomCtaLabel
  bottomCtaLink
}
    `;
export const LondonPagePartsFragmentDoc = gql`
    fragment LondonPageParts on LondonPage {
  __typename
  seoTitle
  seoDescription
  canonicalURL
  heroTag
  heroHeadingPrefix
  heroHeadingHighlight
  heroSubtitle
  heroCtaLabel
  heroCtaLink
  displayAs
  localVideoPath
  cloudVideoUrl
  imagePath
  expertiseTag
  expertiseHeading
  expertiseDescription
  expertiseBullets
  cardTitle
  cardBody
  cardLinkLabel
  cardLinkHref
  faqHeading
  faqs {
    __typename
    question
    answer
  }
  bottomCtaHeading
  bottomCtaBody
  bottomCtaLabel
  bottomCtaLink
}
    `;
export const CustomPagesPartsFragmentDoc = gql`
    fragment CustomPagesParts on CustomPages {
  __typename
  slug
  seoTitle
  seoDescription
  canonicalURL
  heroTag
  heroHeadingPrefix
  heroHeadingHighlight
  heroSubtitle
  heroCtaLabel
  heroCtaLink
  displayAs
  localVideoPath
  cloudVideoUrl
  imagePath
  heroGradientDirection
  heroGradientColor1
  heroGradientColor2
  section1Tag
  section1Heading
  section1Description
  section1Bullets
  section1RightType
  section1CardTitle
  section1CardBody
  section1CardLinkLabel
  section1CardLinkHref
  section1CardImage
  section1CardImageCaption
  section2Tag
  section2Heading
  section2Description
  section2Bullets
  section2LeftType
  section2CardTitle
  section2CardBody
  section2CardLinkLabel
  section2CardLinkHref
  section2CardImage
  section2CardImageCaption
  bottomCtaHeading
  bottomCtaBody
  bottomCtaLabel
  bottomCtaLink
}
    `;
export const SiteSettingsPartsFragmentDoc = gql`
    fragment SiteSettingsParts on SiteSettings {
  __typename
  siteName
  logoText
  useImageLogo
  logoImagePath
  navLinks {
    __typename
    label
    href
  }
}
    `;
export const ServicesPagePartsFragmentDoc = gql`
    fragment ServicesPageParts on ServicesPage {
  __typename
  seoTitle
  headerTag
  heading
  description
  processTag
  processHeading
  processDescription
  processSteps {
    __typename
    step
    title
    tag
    description
  }
  ctaTag
  ctaHeading
  ctaText
  ctaButtonLabel
  ctaButtonLink
}
    `;
export const ServicePartsFragmentDoc = gql`
    fragment ServiceParts on Service {
  __typename
  order
  title
  tag
  description
  slug
  link
  seoTitle
  seoDescription
  heroTag
  heroHeading
  heroLead
  breakdownHeading
  breakdownBody
  displayAs
  localVideoPath
  cloudVideoUrl
  imagePath
  heroGradientDirection
  heroGradientColor1
  heroGradientColor2
  deliverables {
    __typename
    tag
    title
    description
  }
  ctaHeading
  ctaDescription
  ctaButtonLabel
}
    `;
export const WorkPagePartsFragmentDoc = gql`
    fragment WorkPageParts on WorkPage {
  __typename
  seoTitle
  seoDescription
  headerTag
  heading
  description
  heroVideoPath
  heroPosterPath
  aspectBadge
  videoButtonLabel
  imageButtonLabel
  scrollIndicatorText
  showArchive
  archiveTag
  archiveHeading
  archiveDescription
  filterAllLabel
  closeModalLabel
}
    `;
export const ProjectPartsFragmentDoc = gql`
    fragment ProjectParts on Project {
  __typename
  order
  title
  client
  category
  runtime
  description
  backgroundStyle
  videoUrl
  thumbnail
  brightnessStyle
}
    `;
export const AboutPagePartsFragmentDoc = gql`
    fragment AboutPageParts on AboutPage {
  __typename
  seoTitle
  seoDescription
  headline
  manifestoLead
  manifestoQuote
  manifestoAuthor
  heroBackgroundType
  heroVideoPath
  heroImagePath
  heroGradientDirection
  heroGradientColor1
  heroGradientColor2
  heroFrostedGlass
  btsHeading
  btsTag
  btsDescription
  btsItems {
    __typename
    title
    category
    image
    caption
    aspectRatio
  }
  timelineHeading
  timelineTag
  timelineDescription
  milestones {
    __typename
    year
    draftLabel
    takeNumber
    title
    description
    badge
  }
  ctaHeading
  ctaText
  ctaButtonLabel
  ctaButtonLink
}
    `;
export const AboutSliderPartsFragmentDoc = gql`
    fragment AboutSliderParts on AboutSlider {
  __typename
  heading
  tag
  description
  slides {
    __typename
    name
    bio
    avatar
    videoLoop
    badge
  }
}
    `;
export const ContactPagePartsFragmentDoc = gql`
    fragment ContactPageParts on ContactPage {
  __typename
  seoTitle
  seoDescription
  formEndpoint
  redirectUrl
  enableTurnstile
  turnstileSiteKey
  step1Tag
  step1Title
  step1Placeholder
  step2Tag
  step2Title
  serviceOptions {
    __typename
    label
    value
  }
  step3Tag
  step3Title
  step3Placeholder
  step4Tag
  step4Title
  step4Placeholder
  step4HelpText
  step5Tag
  step5Title
  gdprText
  submitButtonLabel
}
    `;
export const ThankYouPagePartsFragmentDoc = gql`
    fragment ThankYouPageParts on ThankYouPage {
  __typename
  seoTitle
  seoDescription
  statusBadge
  heading
  highlight
  description
  phase1Tag
  phase1Title
  phase1Desc
  phase2Tag
  phase2Title
  phase2Desc
  phase3Tag
  phase3Title
  phase3Desc
  primaryBtnLabel
  primaryBtnLink
  secondaryBtnLabel
  secondaryBtnLink
}
    `;
export const PrivacyPagePartsFragmentDoc = gql`
    fragment PrivacyPageParts on PrivacyPage {
  __typename
  seoTitle
  seoDescription
  heroTag
  heading
  lastUpdated
  introText
  sections {
    __typename
    id
    number
    title
    content
  }
  deskTag
  deskTitle
  deskDescription
  deskEmailLabel
  deskCustomEmail
  deskCustomPhone
}
    `;
export const SeoSettingsPartsFragmentDoc = gql`
    fragment SeoSettingsParts on SeoSettings {
  __typename
  legalName
  telephone
  email
  priceRange
  addressLocality
  addressRegion
  postalCode
  addressCountry
  googleMapsUrl
  geoLatitude
  geoLongitude
  backlinkProfiles {
    __typename
    name
    url
    badgeText
    showInFooter
  }
}
    `;
export const GradeSettingsPartsFragmentDoc = gql`
    fragment GradeSettingsParts on GradeSettings {
  __typename
  defaultTheme
  enableThemeSwitcher
  themeSwitcherTitle
  darkNoirTitle
  darkNoirAccentColor
  highKeyTitle
  highKeyAccentColor
  highKeyBgColor
  supernovaTitle
  supernovaAccentColor
  supernovaSecondaryColor
}
    `;
export const FooterSettingsPartsFragmentDoc = gql`
    fragment FooterSettingsParts on FooterSettings {
  __typename
  studioTagline
  commissionButtonLabel
  commissionButtonLink
  capabilitiesHeading
  servicesLinkLabel
  servicesLinkUrl
  studioHeading
  studioLinks {
    __typename
    label
    href
  }
  presenceHeading
  cambridgeTitle
  cambridgeSubtitle
  cambridgeLink
  londonTitle
  londonSubtitle
  londonLink
  worldwideTitle
  worldwideSubtitle
  directHeading
  inquiriesLabel
  inquiriesActionText
  inquiriesActionLink
  productionHubLabel
  productionHub
  capturePipelineLabel
  capturePipeline
  studioStatusLabel
  studioStatus
  copyrightTagline
  backToTopLabel
}
    `;
export const HomepageDocument = gql`
    query homepage($relativePath: String!) {
  homepage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomepageParts
  }
}
    ${HomepagePartsFragmentDoc}`;
export const HomepageConnectionDocument = gql`
    query homepageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomepageFilter) {
  homepageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomepageParts
      }
    }
  }
}
    ${HomepagePartsFragmentDoc}`;
export const CambridgePageDocument = gql`
    query cambridgePage($relativePath: String!) {
  cambridgePage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CambridgePageParts
  }
}
    ${CambridgePagePartsFragmentDoc}`;
export const CambridgePageConnectionDocument = gql`
    query cambridgePageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CambridgePageFilter) {
  cambridgePageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CambridgePageParts
      }
    }
  }
}
    ${CambridgePagePartsFragmentDoc}`;
export const LondonPageDocument = gql`
    query londonPage($relativePath: String!) {
  londonPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...LondonPageParts
  }
}
    ${LondonPagePartsFragmentDoc}`;
export const LondonPageConnectionDocument = gql`
    query londonPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LondonPageFilter) {
  londonPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...LondonPageParts
      }
    }
  }
}
    ${LondonPagePartsFragmentDoc}`;
export const CustomPagesDocument = gql`
    query customPages($relativePath: String!) {
  customPages(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CustomPagesParts
  }
}
    ${CustomPagesPartsFragmentDoc}`;
export const CustomPagesConnectionDocument = gql`
    query customPagesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CustomPagesFilter) {
  customPagesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CustomPagesParts
      }
    }
  }
}
    ${CustomPagesPartsFragmentDoc}`;
export const SiteSettingsDocument = gql`
    query siteSettings($relativePath: String!) {
  siteSettings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteSettingsParts
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const SiteSettingsConnectionDocument = gql`
    query siteSettingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteSettingsFilter) {
  siteSettingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteSettingsParts
      }
    }
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const ServicesPageDocument = gql`
    query servicesPage($relativePath: String!) {
  servicesPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServicesPageParts
  }
}
    ${ServicesPagePartsFragmentDoc}`;
export const ServicesPageConnectionDocument = gql`
    query servicesPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesPageFilter) {
  servicesPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServicesPageParts
      }
    }
  }
}
    ${ServicesPagePartsFragmentDoc}`;
export const ServiceDocument = gql`
    query service($relativePath: String!) {
  service(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServiceParts
  }
}
    ${ServicePartsFragmentDoc}`;
export const ServiceConnectionDocument = gql`
    query serviceConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServiceFilter) {
  serviceConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServiceParts
      }
    }
  }
}
    ${ServicePartsFragmentDoc}`;
export const WorkPageDocument = gql`
    query workPage($relativePath: String!) {
  workPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...WorkPageParts
  }
}
    ${WorkPagePartsFragmentDoc}`;
export const WorkPageConnectionDocument = gql`
    query workPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: WorkPageFilter) {
  workPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...WorkPageParts
      }
    }
  }
}
    ${WorkPagePartsFragmentDoc}`;
export const ProjectDocument = gql`
    query project($relativePath: String!) {
  project(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProjectParts
  }
}
    ${ProjectPartsFragmentDoc}`;
export const ProjectConnectionDocument = gql`
    query projectConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProjectFilter) {
  projectConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProjectParts
      }
    }
  }
}
    ${ProjectPartsFragmentDoc}`;
export const AboutPageDocument = gql`
    query aboutPage($relativePath: String!) {
  aboutPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutPageParts
  }
}
    ${AboutPagePartsFragmentDoc}`;
export const AboutPageConnectionDocument = gql`
    query aboutPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutPageFilter) {
  aboutPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutPageParts
      }
    }
  }
}
    ${AboutPagePartsFragmentDoc}`;
export const AboutSliderDocument = gql`
    query aboutSlider($relativePath: String!) {
  aboutSlider(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutSliderParts
  }
}
    ${AboutSliderPartsFragmentDoc}`;
export const AboutSliderConnectionDocument = gql`
    query aboutSliderConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutSliderFilter) {
  aboutSliderConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutSliderParts
      }
    }
  }
}
    ${AboutSliderPartsFragmentDoc}`;
export const ContactPageDocument = gql`
    query contactPage($relativePath: String!) {
  contactPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactPageParts
  }
}
    ${ContactPagePartsFragmentDoc}`;
export const ContactPageConnectionDocument = gql`
    query contactPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactPageFilter) {
  contactPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactPageParts
      }
    }
  }
}
    ${ContactPagePartsFragmentDoc}`;
export const ThankYouPageDocument = gql`
    query thankYouPage($relativePath: String!) {
  thankYouPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ThankYouPageParts
  }
}
    ${ThankYouPagePartsFragmentDoc}`;
export const ThankYouPageConnectionDocument = gql`
    query thankYouPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ThankYouPageFilter) {
  thankYouPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ThankYouPageParts
      }
    }
  }
}
    ${ThankYouPagePartsFragmentDoc}`;
export const PrivacyPageDocument = gql`
    query privacyPage($relativePath: String!) {
  privacyPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PrivacyPageParts
  }
}
    ${PrivacyPagePartsFragmentDoc}`;
export const PrivacyPageConnectionDocument = gql`
    query privacyPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PrivacyPageFilter) {
  privacyPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PrivacyPageParts
      }
    }
  }
}
    ${PrivacyPagePartsFragmentDoc}`;
export const SeoSettingsDocument = gql`
    query seoSettings($relativePath: String!) {
  seoSettings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SeoSettingsParts
  }
}
    ${SeoSettingsPartsFragmentDoc}`;
export const SeoSettingsConnectionDocument = gql`
    query seoSettingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SeoSettingsFilter) {
  seoSettingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SeoSettingsParts
      }
    }
  }
}
    ${SeoSettingsPartsFragmentDoc}`;
export const GradeSettingsDocument = gql`
    query gradeSettings($relativePath: String!) {
  gradeSettings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GradeSettingsParts
  }
}
    ${GradeSettingsPartsFragmentDoc}`;
export const GradeSettingsConnectionDocument = gql`
    query gradeSettingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GradeSettingsFilter) {
  gradeSettingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GradeSettingsParts
      }
    }
  }
}
    ${GradeSettingsPartsFragmentDoc}`;
export const FooterSettingsDocument = gql`
    query footerSettings($relativePath: String!) {
  footerSettings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FooterSettingsParts
  }
}
    ${FooterSettingsPartsFragmentDoc}`;
export const FooterSettingsConnectionDocument = gql`
    query footerSettingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FooterSettingsFilter) {
  footerSettingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FooterSettingsParts
      }
    }
  }
}
    ${FooterSettingsPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    homepage(variables, options) {
      return requester(HomepageDocument, variables, options);
    },
    homepageConnection(variables, options) {
      return requester(HomepageConnectionDocument, variables, options);
    },
    cambridgePage(variables, options) {
      return requester(CambridgePageDocument, variables, options);
    },
    cambridgePageConnection(variables, options) {
      return requester(CambridgePageConnectionDocument, variables, options);
    },
    londonPage(variables, options) {
      return requester(LondonPageDocument, variables, options);
    },
    londonPageConnection(variables, options) {
      return requester(LondonPageConnectionDocument, variables, options);
    },
    customPages(variables, options) {
      return requester(CustomPagesDocument, variables, options);
    },
    customPagesConnection(variables, options) {
      return requester(CustomPagesConnectionDocument, variables, options);
    },
    siteSettings(variables, options) {
      return requester(SiteSettingsDocument, variables, options);
    },
    siteSettingsConnection(variables, options) {
      return requester(SiteSettingsConnectionDocument, variables, options);
    },
    servicesPage(variables, options) {
      return requester(ServicesPageDocument, variables, options);
    },
    servicesPageConnection(variables, options) {
      return requester(ServicesPageConnectionDocument, variables, options);
    },
    service(variables, options) {
      return requester(ServiceDocument, variables, options);
    },
    serviceConnection(variables, options) {
      return requester(ServiceConnectionDocument, variables, options);
    },
    workPage(variables, options) {
      return requester(WorkPageDocument, variables, options);
    },
    workPageConnection(variables, options) {
      return requester(WorkPageConnectionDocument, variables, options);
    },
    project(variables, options) {
      return requester(ProjectDocument, variables, options);
    },
    projectConnection(variables, options) {
      return requester(ProjectConnectionDocument, variables, options);
    },
    aboutPage(variables, options) {
      return requester(AboutPageDocument, variables, options);
    },
    aboutPageConnection(variables, options) {
      return requester(AboutPageConnectionDocument, variables, options);
    },
    aboutSlider(variables, options) {
      return requester(AboutSliderDocument, variables, options);
    },
    aboutSliderConnection(variables, options) {
      return requester(AboutSliderConnectionDocument, variables, options);
    },
    contactPage(variables, options) {
      return requester(ContactPageDocument, variables, options);
    },
    contactPageConnection(variables, options) {
      return requester(ContactPageConnectionDocument, variables, options);
    },
    thankYouPage(variables, options) {
      return requester(ThankYouPageDocument, variables, options);
    },
    thankYouPageConnection(variables, options) {
      return requester(ThankYouPageConnectionDocument, variables, options);
    },
    privacyPage(variables, options) {
      return requester(PrivacyPageDocument, variables, options);
    },
    privacyPageConnection(variables, options) {
      return requester(PrivacyPageConnectionDocument, variables, options);
    },
    seoSettings(variables, options) {
      return requester(SeoSettingsDocument, variables, options);
    },
    seoSettingsConnection(variables, options) {
      return requester(SeoSettingsConnectionDocument, variables, options);
    },
    gradeSettings(variables, options) {
      return requester(GradeSettingsDocument, variables, options);
    },
    gradeSettingsConnection(variables, options) {
      return requester(GradeSettingsConnectionDocument, variables, options);
    },
    footerSettings(variables, options) {
      return requester(FooterSettingsDocument, variables, options);
    },
    footerSettingsConnection(variables, options) {
      return requester(FooterSettingsConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
