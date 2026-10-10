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
export const WorkPagePartsFragmentDoc = gql`
    fragment WorkPageParts on WorkPage {
  __typename
  seoTitle
  seoDescription
  headerTag
  heading
  description
  aspectBadge
  videoButtonLabel
  imageButtonLabel
  scrollIndicatorText
  archiveTag
  archiveHeading
  archiveDescription
  filterAllLabel
  closeModalLabel
}
    `;
export const ServicesPagePartsFragmentDoc = gql`
    fragment ServicesPageParts on ServicesPage {
  __typename
  seoTitle
  headerTag
  heading
  description
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
export const AboutPagePartsFragmentDoc = gql`
    fragment AboutPageParts on AboutPage {
  __typename
  seoTitle
  seoDescription
  headline
  manifestoLead
  manifestoQuote
  manifestoAuthor
  heroVideoPath
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
export const GradeSettingsPartsFragmentDoc = gql`
    fragment GradeSettingsParts on GradeSettings {
  __typename
  defaultTheme
  enableThemeSwitcher
  themeSwitcherTitle
  darkNoirAccentColor
  highKeyAccentColor
  highKeyBgColor
  supernovaAccentColor
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
    workPage(variables, options) {
      return requester(WorkPageDocument, variables, options);
    },
    workPageConnection(variables, options) {
      return requester(WorkPageConnectionDocument, variables, options);
    },
    servicesPage(variables, options) {
      return requester(ServicesPageDocument, variables, options);
    },
    servicesPageConnection(variables, options) {
      return requester(ServicesPageConnectionDocument, variables, options);
    },
    cambridgePage(variables, options) {
      return requester(CambridgePageDocument, variables, options);
    },
    cambridgePageConnection(variables, options) {
      return requester(CambridgePageConnectionDocument, variables, options);
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
    project(variables, options) {
      return requester(ProjectDocument, variables, options);
    },
    projectConnection(variables, options) {
      return requester(ProjectConnectionDocument, variables, options);
    },
    service(variables, options) {
      return requester(ServiceDocument, variables, options);
    },
    serviceConnection(variables, options) {
      return requester(ServiceConnectionDocument, variables, options);
    },
    siteSettings(variables, options) {
      return requester(SiteSettingsDocument, variables, options);
    },
    siteSettingsConnection(variables, options) {
      return requester(SiteSettingsConnectionDocument, variables, options);
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
