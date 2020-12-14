# Jalesh.com frontend project

## Getting Started

Before anything else, install all dependencies

```bash
# Install all dependencies
npm install
```

Create a `.env.local` and set the destination server for the API

```bash
# .env.local
BACKEND_URL=https://staging.jalesh.com
```

Running the development server locally:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploying

In order to set the backend endpoint url, set the environment
variable `BACKEND_URL` to the desired graphql URL.

Alternatively you can copy `.env` to `.env.local` and adjust accordingly.

Afterwards, build and start the project server like this:

```bash
# Build the deployable package
npm run build

# Start the built artefact on port 3000
npm run start

# Or any other port:
npm run start -- --port 12345
```

## Technical notes

### Sample Backend requests

```
query {
 reverseGeocoding(location: {coordinates:[90.4143895,23.7349662], type: "Point"}) {
    id
    address
    coordinates {
      coordinates
      type
    }
  }

  ipLocation(ip: "103.58.74.170") {
    address,
    coordinates {
      coordinates,
      type,
    }
  }

  geocoding(address: {id:"", address:"Paltan,Dhaka,Bangladesh"}) {
    address
    coordinates {
      coordinates
      type
    }
  }

  autocompleteAddress(address: "Narayan", location: {coordinates:[90.4143895,23.7349662], type: "Point"}) {
    sessionToken
    addresses {
      id
      address
    }
  }

  destinations(location: {coordinates: [90.4124984741211,23.810300827026367], type: "Point"}, count: 10) {
    id,
    name,
    country,
    city,
    code,
    type,
    location {
      coordinates
      type
    }
  }

  itineraries(portOfCallID: "f261c3cf-0547-4f24-ba1d-a4a5d23136c2") {
    id
    name
    type
    ports {
      id
      name
      type
      seqNumber
    }
  }
}

input ContactInput {
    name: String!
    email: String!
    phone: String!
    message: String!
}

type Mutation {
    storeContact(contact: ContactInput!): ID!
}
```
