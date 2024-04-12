import React from "react";
const columns = [
    {name: "ROOM", uid: "name"},
  {name: "ExternalRoomId", uid: "externalRoomId"},
  {name: "ACTIONS", uid: "actions"},
];

const rooms = [
  {
    externalRoomId: 0,
    name: "Kids pool",

  },
  {
    externalRoomId: 1,
    name: "Adult Pool",

  },
  {
    externalRoomId: 2,
    name: "Spa",

  },
  {
    externalRoomId: 3,
    name: "Basketball court",

  },
  {
    externalRoomId: 4,
    name: "Outdoor playground",

  },
  {
  externalRoomId: 5,
    name: "Sky lounge",

  },
  {
  externalRoomId: 6,
    name: "Restaurant",

  },

];

export {columns, rooms};