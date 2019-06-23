//@ts-check

export const schema = [
  {
    name: "Entity1",
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
    name: "Entity2",
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
        entity: "Entity1"
      }
    ]
  },
  {
    name: "Entity3",
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
        entity: "Entity2"
      },
      {
        entity: "Entity1"
      }
    ]
  },
  {
    name: "Entity4",
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
        entity: "Entity3"
      }
    ]
  }
];
