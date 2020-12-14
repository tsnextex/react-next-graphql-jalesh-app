import { gql, ApolloClient, InMemoryCache } from "@apollo/client";

export const GET_PROMOTIONS = gql`
  query {
    promotions {
      id
      startDate
      endDate
      shortTitle
      shortDescription
      longTitle
      inHomePage
      inAllPromotions
    }
  }
`;

export const GET_DESTINATIONS = gql`
  query Destinations($coordinates: [Float!]!) {
    destinations(
      location: { coordinates: $coordinates, type: "Point" }
      count: 10
    ) {
      id
      name
      country
      city
      code
      type
      location {
        coordinates
        type
      }
      destination {
        description1
        description2
        imageUrl
      }
    }
  }
`;

export const GET_DESTINATION = gql`
  query Destination($portID: String, $portCode: String) {
    destination(portOfCallID: $portID, portOfCallCode: $portCode) {
      id
      name
      country
      city
      code
      type
      location {
        coordinates
        type
      }
      destination {
        description1
        description2
        imageUrl
        details {
          slogan
          imageUrl
        }
        history {
          title
          subtitle
          description
          imageUrl
        }
        culture {
          title
          subtitle
          description
          imageUrl
        }
        foods {
          title
          description
          foods {
            title
            description
            imageUrl
          }
        }
      }
    }
  }
`;

export const GET_ITINERARIES = gql`
  query Itineraries($portID: String, $portCode: String) {
    itineraries(portOfCallID: $portID, portOfCallCode: $portCode) {
      id
      routeID
      name
      nightCount
      startTime
      endTime
      ports {
        id
        type
        seqNumber
        port {
          name
        }
      }
      ship {
        name
      }
    }
  }
`;

export const GET_ROUTES = gql`
  query Routes($portID: String, $portCode: String) {
    routes(portOfCallID: $portID, portOfCallCode: $portCode) {
      id
      name
      type
      ports {
        id
        port {
          id
          code
          name
        }
      }
    }
  }
`;

export const GET_ALL_ROUTES = gql`
  query Routes {
    routes {
      id
      name
      type
      ports {
        id
        port {
          id
          name
        }
      }
      itineraries {
        id
        routeID
        name
        nightCount
        startTime
        endTime
        ports {
          id
          type
          seqNumber
          port {
            name
          }
        }
        ship {
          name
        }
      }
    }
  }
`;

export const VERIFY_MEMBER = gql`
  query checkLoyaltyMember($input: CheckLoyaltyMemberInput!) {
    checkLoyaltyMember(input: $input) {
      id
    }
  }
`;

export const CHECK_AVAILABILITY = gql`
  query checkAvailability($input: CheckAvailabilityInput!) {
    checkAvailability(input: $input) {
      categories {
        priceKey
        name
        images {
          key
          src
          width
          height
        }
        price {
          total
          taxes {
            amount
            type
          }
          discounts {
            total
            description
          }
          individual {
            type
            total
            fare
            discount
            discountCategory
            portCharges
            gratuity
          }
        }
      }
    }
  }
`;

export const SEND_OTP = gql`
  mutation sendOTP($phone: String!) {
    sendOTP(phone: $phone)
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOTP($phone: String!, $code: String!) {
    verifyOTP(phone: $phone, code: $code)
  }
`;

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
  cache: new InMemoryCache(),
});

export const serverApolloClient = new ApolloClient({
  uri: `${process.env.BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default apolloClient;
