//@ts-check

export const schema = [
  {
    name: "Mill",
    properties: [
      {
        name: "Name"
      },
      {
        name: "Code"
      }
    ]
  },
  {
    name: "Area",
    properties: [
      {
        name: "Name"
      },
      {
        name: "Code"
      }
    ],
    relations: [
      {
        entity: "Mill"
      }
    ]
  },
  {
    name: "Subarea",
    properties: [
      {
        name: "Name"
      },
      {
        name: "Code"
      }
    ],
    relations: [
      {
        entity: "Area"
      }
    ]
  },
  {
    name: "Equipment",
    properties: [
      {
        name: "Name"
      },
      {
        name: "Code"
      }
    ],
    relations: [
      {
        entity: "Subarea"
      }
    ]
  }
];
